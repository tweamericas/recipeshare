<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
  public $timestamps = true;
  protected $fillable = ['hash', 'hashid', 'filter'];
}
