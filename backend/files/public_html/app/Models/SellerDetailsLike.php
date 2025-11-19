<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class SellerDetailsLike extends Model
{
    public $table = 'seller_details_likes';

    protected $fillable = [
        'user_id',
        'seller_details_id',
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
