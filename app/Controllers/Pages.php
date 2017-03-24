<?php

namespace App\Controllers;

use App\Models\Entry;
use Hashids\Hashids;

use Illuminate\Http\Request;

class Pages extends Controller
{
  public function index()
  {
    return view('pages.index');
  }

  public function share($id, Request $request)
  {

    $hashids = new Hashids();
    $mongoid = $hashids->decodeHex($id);

    if (count($mongoid) < 1) {
      abort(404);
    }

    $entry = Entry::find($mongoid);

    if ($entry === null) {
      abort(404);
    }

    $url = $request->root().'/'.$id;
    $image = $request->root().'/image/meta/'.$id.'.jpg';

    $title = str_replace('{{title}}', $entry->title, config('share')['title']);
    $pinterest_description = str_replace('{{title}}', $entry->title, config('share')['pinterest_description']);
    $description = str_replace('{{title}}', $entry->title, config('share')['description']);
    $twitter_description = str_replace('{{title}}', $entry->title, config('share')['twitter_description']);

    return view('pages.index', [
      'pinterest_description' => $twitter_description,
      'twitter_description' => $twitter_description,
      'description' => $description,
      'title' => $title,
      'image' => $image, 
      'url' => $url,
      'share' => config()->get('share'),
    ]);

  }
  public function dl($id)
  {
    return view('pages.dl', ['id' => $id]);
  }
  public function ig($id)
  {
    return view('pages.dl', ['id' => $id, 'ig' => true]);
  }
  public function guide()
  {
    return view('pages.guide');
  }
  public function tandc()
  {
    return view('pages.tandc');
  }


}
