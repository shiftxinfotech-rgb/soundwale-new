<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class JobPosting extends Model
{
    use HasFactory;

    public $table = 'job_posting';

    protected $fillable = [
        'title',
        'slug',
        'icon',
        'sub_title',
        'image',
        'content',
        'short_content',
        'location',
        'work_type',
        'salary',
        'sequence',
        'status',
        'coming_soon',
    ];

    protected $appends = [
        'image_url',
        'image_2_url',
    ];

    const IMAGE_PATH = 'app/job_posting/';

    public function getImageUrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->image, $this->image);
    }
    public function getImage2UrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->icon, $this->icon);
    }
    protected static function booted()
    {
        parent::boot();

        static::creating(function ($obj) {
            $slug = \Str::slug($obj->title);
            $count = static::whereRaw("slug RLIKE '^{$slug}(-[0-9]+)?$'")->count();
            $obj->slug = $count ? "{$slug}-{$count}" : $slug;
        });

        static::updating(function ($obj) {
            $slug = \Str::slug($obj->title);
            $count = static::whereRaw("slug RLIKE '^{$slug}(-[0-9]+)?$'")->where('id', '!=', $obj->id)->count();
            $obj->slug = $count ? "{$slug}-{$count}" : $slug;
        });

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

        static::updating(function ($obj) {
            if ($obj->icon != $obj->getOriginal('icon')) {
                Storage::delete(self::IMAGE_PATH.$obj->getOriginal('icon'));
            }
        });

        static::deleted(function ($obj) {
            if ($obj->icon) {
                Storage::delete(self::IMAGE_PATH.$obj->icon);
            }
        });
    }

}
