<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class BrowseByPositions extends Model
{
    use HasFactory;

    public $table = 'browse_by_positions';

    protected $fillable = [
        'title',
        'image',
        'description',
        'sequence',
        'status',
    ];

    protected $appends = [
        'image_url',
    ];

    const IMAGE_PATH = 'app/browse_by_positions/';

    public function getImageUrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->image, $this->image);
    }

    protected static function booted()
    {
        parent::boot();

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
