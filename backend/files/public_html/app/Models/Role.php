<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Role extends Model {

    public $table = 'role';
    protected $fillable = [
        'name',
        'image',
        'selected_image',
        'description',
        'status',
    ];
    protected $appends = [
//        'selected_image_url',
//        'image_url',
    ];

    const IMAGE_PATH = 'app/role/';

    public function getImageUrlAttribute() {
        return Helper::getImageUrl(self::IMAGE_PATH . $this->image, $this->image);
    }
    public function getSelectedImageUrlAttribute() {
        return Helper::getImageUrl(self::IMAGE_PATH . $this->selected_image, $this->selected_image);
    }

    protected static function booted() {
        parent::boot();
// image 1
        static::updating(function ($obj) {
            if ($obj->image != $obj->getOriginal('image')) {
                Storage::delete(self::IMAGE_PATH . $obj->getOriginal('image'));
            }
        });
        static::deleted(function ($obj) {
            if ($obj->image) {
                Storage::delete(self::IMAGE_PATH . $obj->image);
            }
        });
    }

    public function register() {
        return $this->belongsToMany(Register::class);
    }

}
