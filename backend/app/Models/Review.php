<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Review extends Model
{
    public $table = 'review';

    protected $fillable = [
        'user_id',
        'relevant_id',
        'rating',
        'message',
        'type',
        'status',
    ];

    protected $appends = [
//        'video_url',
    ];

//    const IMAGE_PATH = 'app/register_video/';
//
//    public function getVideoUrlAttribute()
//    {
//        return Helper::getImageUrl(self::IMAGE_PATH.$this->video, $this->video);
//    }
//    protected static function booted()
//    {
//        parent::boot();
//// image 1
//        static::updating(function ($obj) {
//            if ($obj->video != $obj->getOriginal('video')) {
//                Storage::delete(self::IMAGE_PATH.$obj->getOriginal('video'));
//            }
//        });
//        static::deleted(function ($obj) {
//            if ($obj->video) {
//                Storage::delete(self::IMAGE_PATH.$obj->video);
//            }
//        });
//    }
    
    public function register()
    {
        return $this->hasOne(Register::class, 'id', 'user_id');
    }
    
}
