<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Categories extends Model
{
    public $table = 'categories';

    protected $fillable = [
        'name',
        'user_id',
        'description',
        'look_who_s_trending',
        'our_top_pick',
        'image',
        'status',
    ];

    protected $appends = [
        'image_url',
    ];

    const IMAGE_PATH = 'app/categories/';

    public function getImageUrlAttribute()
    {
        return Helper::getImageUrlCategories(self::IMAGE_PATH.$this->image, $this->image);
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
    }
}
