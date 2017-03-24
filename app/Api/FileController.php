<?php

namespace App\Api;

use Hashids\Hashids;

use App\Models\Entry;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class FileController extends MetApiController
{
  public function __construct(Request $request)
  {
    parent::__construct($request);
  }

  public function upload(Request $request)
  {

    $this->addOption('file', 'required|file');
    $this->addOption('title', 'required|string');

    if (!$query = $this->getQuery()) {
      return $this->error();
    }

    $hash = str_replace('.zip', '', $request->file->hashName());


    /* save to our s3 bucket */

    $s3benchmark = microtime(true);

    $complete = file_get_contents('zip://'.$request->file->path().'#complete.jpg');

    Storage::disk('s3')->getDriver()->put(
      $hash.'-complete.jpg',
      $complete,
      [
        'visibility' => 'public', 
        'ContentType' => 'image/jpeg',
      ]
    );

    $last = 1;

    for ($i = 1; $i != 4; $i++) {

      $step = @file_get_contents('zip://'.$request->file->path().'#step'.$i.'.jpg');

      if ($step) {
        $last = $i;
        Storage::disk('s3')->getDriver()->put(
          $hash.'-step'.$i.'.jpg',
          $step,
          [
            'visibility' => 'public', 
            'ContentType' => 'image/jpeg',
          ]
        );
      }

    }

    $metaWidth = 1200;
    $metaHeight = 630;
    #$metaWidth = 1000;
    #$metaHeight = 525;

    $first = new \Imagick('zip://'.$request->file->path().'#step'.$last.'.jpg');
    $second = new \Imagick('./image/metaheader.jpg');

    $height = floor($first->getImageHeight() * $metaWidth /  $first->getImageWidth());
    $first->resizeImage($metaWidth, floor($height), \Imagick::FILTER_SINC, 0);

    if ($height > $metaHeight) {
      $first->cropImage($metaWidth, $metaHeight, 0, 0);
    }

    $first->setImageColorspace($second->getImageColorspace());
    $first->compositeImage($second, $second->getImageCompose(), 0, 0);

    Storage::disk('s3')->getDriver()->put(
      $hash.'-meta.jpg',
      $first->__toString(),
      [
        'visibility' => 'public', 
        'ContentType' => 'image/jpeg',
      ]
    );

    $entry = new Entry();
    $entry->hash = $hash;
    $entry->title = $request->title;
    $entry->benchmark = microtime(true)-$s3benchmark;
    $entry->save();

    $hashids = new Hashids();
    $hashid = $hashids->encodeHex($entry->id);
    $entry->hashid = $hashid;
    $entry->save();

    return $this->render([
      'hash' => $hash,
      'hashid' => $hashid,
    ]);

  }

}
