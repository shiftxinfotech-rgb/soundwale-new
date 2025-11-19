<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class AboutUs extends Model
{
    use HasFactory;

    public $table = 'about_us';

    protected $fillable = [
        'id',
        'title_1',
        'title_2',
        'description',
        'image',
        'image_2',
        'lets_work_together_title',
        'our_value_title',
        'what_we_do_image',
        'what_we_do_description',
        'our_vision_image',
        'our_vision_description',
        'our_mission_image',
        'our_mission_description',
    ];

    protected $appends = [
        'image_url',
        'image_2_url',
        'image_3_url',
        'image_4_url',
        'image_5_url',

    ];

    const IMAGE_PATH = 'app/about_us/';

    public function getImageUrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->image, $this->image);
    }
    public function getImage2UrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->image_2, $this->image_2);
    }
    public function getImage3UrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->what_we_do_image, $this->what_we_do_image);
    }
    public function getImage4UrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->our_vision_image, $this->our_vision_image);
    }
    public function getImage5UrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->our_mission_image, $this->our_mission_image);
    }

    protected static function booted()
    {
        parent::boot();

        static::updating(function ($obj) {
            if ($obj->image != $obj->getOriginal('image')) {
                Storage::delete(self::IMAGE_PATH.$obj->getOriginal('image'));
            }
        });

        static::deleted(function ($obj) {
            if ($obj->image) {
                Storage::delete(self::IMAGE_PATH.$obj->image);
            }
        });

        static::updating(function ($obj) {
            if ($obj->image_2 != $obj->getOriginal('image_2')) {
                Storage::delete(self::IMAGE_PATH.$obj->getOriginal('image_2'));
            }
        });

        static::deleted(function ($obj) {
            if ($obj->image_2) {
                Storage::delete(self::IMAGE_PATH.$obj->image_2);
            }
        });

        // what we do

        static::updating(function ($obj) {
            if ($obj->what_we_do_image != $obj->getOriginal('what_we_do_image')) {
                Storage::delete(self::IMAGE_PATH.$obj->getOriginal('what_we_do_image'));
            }
        });

        static::deleted(function ($obj) {
            if ($obj->what_we_do_image) {
                Storage::delete(self::IMAGE_PATH.$obj->what_we_do_image);
            }
        });

        //Our Vision
        static::updating(function ($obj) {
            if ($obj->our_vision_image != $obj->getOriginal('our_vision_image')) {
                Storage::delete(self::IMAGE_PATH.$obj->getOriginal('our_vision_image'));
            }
        });

        static::deleted(function ($obj) {
            if ($obj->our_vision_image) {
                Storage::delete(self::IMAGE_PATH.$obj->our_vision_image);
            }
        });

        //Our Mission
        static::updating(function ($obj) {
            if ($obj->our_mission_image != $obj->getOriginal('our_mission_image')) {
                Storage::delete(self::IMAGE_PATH.$obj->getOriginal('our_mission_image'));
            }
        });

        static::deleted(function ($obj) {
            if ($obj->our_mission_image) {
                Storage::delete(self::IMAGE_PATH.$obj->our_mission_image);
            }
        });
    }
}
