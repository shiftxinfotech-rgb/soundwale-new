<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Faq extends Model
{
    public $table = 'faq';

    protected $fillable = [
        'title',
        'image',
        'slug',
        'description',
    ];

    protected $appends = [
//        'image_url',
    ];

    const IMAGE_PATH = 'app/faq/';

    public function getImageUrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->image, $this->image);
    }

    protected static function booted()
    {
        parent::boot();

//        static::creating(function ($obj) {
//            $slug = \Str::slug($obj->title);
//            $count = static::whereRaw("slug RLIKE '^{$slug}(-[0-9]+)?$'")->count();
//            $obj->slug = $count ? "{$slug}-{$count}" : $slug;
//        });
//
//        static::updating(function ($obj) {
//            $slug = \Str::slug($obj->title);
//            $count = static::whereRaw("slug RLIKE '^{$slug}(-[0-9]+)?$'")->where('id', '!=', $obj->id)->count();
//            $obj->slug = $count ? "{$slug}-{$count}" : $slug;
//        });

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
