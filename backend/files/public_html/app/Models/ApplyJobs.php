<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ApplyJobs extends Model
{
    use HasFactory;

    public $table = 'apply_jobs';

    protected $fillable = [
        'job_name',
        'name',
        'email',
        'phone_number',
        'resume',
    ];

    protected $appends = [
        'image_url',
    ];

    const IMAGE_PATH = 'app/apply_jobs/';

    public function getImageUrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->resume, $this->resume);
    }

    protected static function booted()
    {
        parent::boot();

        static::updating(function ($obj) {
            if ($obj->resume != $obj->getOriginal('resume')) {
                Storage::delete(self::IMAGE_PATH.$obj->getOriginal('resume'));
            }
        });

        static::deleted(function ($obj) {
            if ($obj->resume) {
                Storage::delete(self::IMAGE_PATH.$obj->resume);
            }
        });

    }

}
