<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class BusinessCompany extends Model
{
    public $table = 'business_company';

    protected $fillable = [
        'user_id',
        'name',
        'business_id',
        'file_name',
        'image',
        'status',
    ];
    protected $hidden = ['status'];
    protected $appends = [
        'image_url',
    ];

    const IMAGE_PATH = 'app/business_company_pdf/';

    public function getImageUrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->image,$this->image);
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
