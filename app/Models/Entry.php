<?php

namespace App\Models;

class Entry extends \Moloquent
{
  public $timestamps = true;
  protected $fillable = ['hash', 'hashid', 'title', 'benchmark'];
}
