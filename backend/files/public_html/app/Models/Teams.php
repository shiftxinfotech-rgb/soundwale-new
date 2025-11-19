<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Teams extends Model
{
    public $table = 'teams';

    protected $fillable = [
        'name',
        'image',
        'image_2',
        'designation',
        'country_code',
        'message',
        'sequence',
        'status',
    ];

    protected $appends = [
        'image_url',
        'image_2_url',
    ];

    const IMAGE_PATH = 'app/teams/';

    public function getImageUrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->image, $this->image);
    }
    public function getImage2UrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->image_2, $this->image_2);
    }
    protected static function booted()
    {
        parent::boot();
// image 1
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

        // image 2
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
    }
}
