<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ImageComments extends Model
{
    public $table = 'image_comments';

    protected $fillable = [
        'user_id',
        'parent_id',
        'type',
        'type_id',
        'message',
        'status',
    ];
    
}
