<?php

namespace App\Controllers;

use Hashids\Hashids;

use App\Models\Entry;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;

class ImageController extends Controller
{

  public function process($file)
  {

    $hashid = str_replace('.jpg', '', $file);

    $hashids = new Hashids();
    $id = $hashids->decodeHex($hashid);

    $image = Entry::find($id);

    if ($image === null) {
      abort(404);
    }
    
    $s3url = Storage::disk('s3')->url($image->hash.'-complete.jpg');

    return response(file_get_contents($s3url))->header('Content-type', 'image/jpeg');

  }


  public function processMeta($file)
  {

    $hashid = str_replace('.jpg', '', $file);

    $hashids = new Hashids();
    $id = $hashids->decodeHex($hashid);

    $image = Entry::find($id);

    if ($image === null) {
      abort(404);
    }

    $s3url = Storage::disk('s3')->url($image->hash.'-meta.jpg');

    return response(file_get_contents($s3url))->header('Content-type', 'image/jpeg');

  }

  public function download($file)
  {

    $hashid = str_replace('.jpg', '', $file);

    $hashids = new Hashids();
    $id = $hashids->decodeHex($hashid);

    $image = Entry::find($id);

    if ($image === null) {
      abort(404);
    }
    
    $s3url = Storage::disk('s3')->url($image->hash.'-complete.jpg');

    $tempEntry = tempnam(sys_get_temp_dir(), $file);
    copy($s3url, $tempEntry);

    $headers = [
      'Content-Description: File Transfer',
      'Content-Type: application/octet-stream',
      'Content-Disposition: attachment; filename="recipe.jpg"',
      'Content-length: ' . filesize($tempEntry),
    ];
    
    return response()->download($tempEntry, 'recipe.jpg', $headers);

  }


}
