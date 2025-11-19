<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class SubCategory extends Model
{
    public $table = 'sub_category';

    protected $fillable = [
        'user_id',
        'name',
        'category_id',
        'image',
        'status',
    ];

    protected $appends = [
//        'image_url',
    ];

    const IMAGE_PATH = 'app/sub_category/';

    public function getImageUrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->image, $this->image);
    }
    public function Category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
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
