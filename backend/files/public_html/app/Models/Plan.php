<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Plan extends Model
{
    use HasFactory;

    public $table = 'plans';

    protected $fillable = [
        'id',
        'name',
        'amount',
        'plan_type',
        'validate',
        'validate_type',
        'leads_count',
    ];

//    protected $appends = [
//        'image_url',
//    ];

//    const IMAGE_PATH = 'app/plans/';

//    public function getImageUrlAttribute()
//    {
//        return Helper::getImageUrl(self::IMAGE_PATH.$this->image, $this->image);
//    }
//
//    protected static function booted()
//    {
//        parent::boot();
//
//        static::updating(function ($obj) {
//            if ($obj->image != $obj->getOriginal('image')) {
//                Storage::delete(self::IMAGE_PATH.$obj->getOriginal('image'));
//            }
//        });
//
//        static::deleted(function ($obj) {
//            if ($obj->image) {
//                Storage::delete(self::IMAGE_PATH.$obj->image);
//            }
//        });
//
//    }
}
