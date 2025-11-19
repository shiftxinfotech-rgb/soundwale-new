<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Setting extends Model
{
    use HasFactory;

    public $table = 'settings';
    protected $fillable = [
        'header_logo',
        'footer_logo',
        'header_text',
        'content',
        'registered_address',
        'factory_address',
        'email',
        'phone_number',
        'website',
        'testimonials_title',
        'testimonial_description',
        'nemt_title',
        'nemt_description',
        'blog_title',
        'blog_description',
        't1',
        'c1',
        't2',
        'c2',
        't3',
        'c3',
        't4',
        'c4',
        'job_image',
        'leaders_title',
    ];

    protected $appends = [
        'header_logo_url',
        'footer_logo_url',
        'job_image_url',
    ];

    const IMAGE_PATH = 'app/logo/';

    public function getHeaderLogoUrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH . $this->header_logo, $this->header_logo);
    }

    public function getFooterLogoUrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH . $this->footer_logo, $this->footer_logo);
    }
    public function getJobImageUrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH . $this->job_image, $this->job_image);
    }
    protected static function booted()
    {
        parent::boot();

        static::updating(function ($obj) {
            if ($obj->header_logo != $obj->getOriginal('header_logo')) {
                Storage::delete(self::IMAGE_PATH.$obj->getOriginal('header_logo'));
            }
        });

        static::deleted(function ($obj) {
            if ($obj->header_logo) {
                Storage::delete(self::IMAGE_PATH.$obj->header_logo);
            }
        });
        static::updating(function ($obj) {
            if ($obj->footer_logo != $obj->getOriginal('footer_logo')) {
                Storage::delete(self::IMAGE_PATH.$obj->getOriginal('footer_logo'));
            }
        });

        static::deleted(function ($obj) {
            if ($obj->footer_logo) {
                Storage::delete(self::IMAGE_PATH.$obj->footer_logo);
            }
        });

        static::updating(function ($obj) {
            if ($obj->job_image != $obj->getOriginal('job_image')) {
                Storage::delete(self::IMAGE_PATH.$obj->getOriginal('job_image'));
            }
        });

        static::deleted(function ($obj) {
            if ($obj->job_image) {
                Storage::delete(self::IMAGE_PATH.$obj->job_image);
            }
        });
    }
}
