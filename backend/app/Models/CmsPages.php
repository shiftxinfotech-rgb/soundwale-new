<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CmsPages extends Model
{
    use SoftDeletes;

    public $table = 'cms_pages';

    protected $fillable = [
        'title',
        'slug',
        'description',
    ];

    protected static function booted()
    {
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
    }
}
