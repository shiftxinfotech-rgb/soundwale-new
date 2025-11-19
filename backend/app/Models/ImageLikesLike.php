<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ImageLikesLike extends Model
{
    public $table = 'image_like_likes';

    protected $fillable = [
        'user_id',
        'type_id',
        'type',
        'status',
    ];
    
}
