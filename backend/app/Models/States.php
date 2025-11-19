<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class States extends Model
{
    public $table = 'state';

    protected $fillable = [
        'id_country',
        'user_id',
        'state_name',
        'is_enable',
    ];

    protected $appends = [
//        'image_url',
    ];

    const IMAGE_PATH = 'app/states/';

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
    public function country()
    {
        return $this->belongsTo(Country::class);
    }
}
