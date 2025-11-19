<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Cities extends Model
{
    public $table = 'city';

    protected $fillable = [
        'city_name',
        'user_id',
        'id_country',
        'id_state',
    ];

    protected $appends = [
//        'image_url',
    ];

    const IMAGE_PATH = 'app/city/';

    public function getImageUrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->image, $this->image);
    }
    public function Categories()
    {
        return $this->belongsTo(Categories::class, 'categories_id', 'id');
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
