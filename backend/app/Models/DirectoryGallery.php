<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class DirectoryGallery extends Model
{
    public $table = 'directory_gallery';

    protected $fillable = [
        'directory_id',
        'image',
        'status',
    ];

    protected $appends = [
        'image_url',
    ];

    const IMAGE_PATH = 'app/directory_gallery/';

    public function getImageUrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->image, $this->image);
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
    public function cities()
    {
        return $this->hasOne(Cities::class, 'id', 'city_id');
    }
    public function register()
    {
        return $this->hasOne(register::class, 'id', 'user_id');
    }
    public function categories()
    {
        return $this->hasOne(Categories::class, 'id', 'categories_id');
    }
    public function category()
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }
    public function sub_category()
    {
        return $this->hasOne(SubCategory::class, 'id', 'sub_category_id');
    }
    public function unit()
    {
        return $this->hasOne(Unit::class, 'id', 'unit_id');
    }
    public function grade()
    {
        return $this->hasOne(Grade::class, 'id', 'grade_id');
    }
    public function requirment()
    {
        return $this->hasOne(Requirment::class, 'id', 'requirment_id');
    }
    public function surface()
    {
        return $this->hasOne(Surface::class, 'id', 'surface_id');
    }
}
