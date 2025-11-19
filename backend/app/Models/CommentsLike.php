<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CommentsLike extends Model
{
    public $table = 'comments_likes';

    protected $fillable = [
        'user_id',
        'comments_id',
        'type',
        'status',
    ];
    
}
