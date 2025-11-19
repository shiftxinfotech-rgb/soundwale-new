<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class SeoManagers extends Model
{
    public $table = 'seo_managers';

    protected $fillable = [
        'id',
        'menu',
        'seo_title',
        'meta_keyword',
        'meta_description',
        'created_at',
        'updated_at',
    ];

}
