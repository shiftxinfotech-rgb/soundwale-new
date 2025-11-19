<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Advertisement extends Model
{
    public $table = 'advertisement';

    protected $fillable = [
        'user_id',
        'your_requirement',
        'name',
        'company_id',
        'code',
        'code_sort',
        'mobile',
        'email',
        'image',
        'status',
    ];

    protected $hidden = ['your_requirement', 'company_id'];
    protected $appends = [
        'image_url',
    ];

    const IMAGE_PATH = 'app/advertisement/';

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
}
