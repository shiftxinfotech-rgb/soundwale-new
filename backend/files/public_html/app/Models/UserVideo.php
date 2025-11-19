<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class UserVideo extends Model {

    public $table = 'register_video';
    protected $fillable = [
        'user_id',
        'video',
        'description',
        'status',
    ];
    protected $appends = [
        'video_url',
    ];

    const IMAGE_PATH = 'app/register_video/';

    public function getVideoUrlAttribute() {
        return Helper::getImageUrl(self::IMAGE_PATH . $this->video, $this->video);
    }

    protected static function booted() {
        parent::boot();
// image 1
        static::updating(function ($obj) {
            if ($obj->video != $obj->getOriginal('video')) {
                Storage::delete(self::IMAGE_PATH . $obj->getOriginal('video'));
            }
        });
        static::deleted(function ($obj) {
            if ($obj->video) {
                Storage::delete(self::IMAGE_PATH . $obj->video);
            }
        });
    }

    public function register() {
        return $this->hasOne(Register::class, 'id', 'user_id');
    }

    public function country() {
        return $this->hasOne(Country::class, 'id', 'country_id');
    }

    public function states() {
        return $this->hasOne(States::class, 'id', 'state_id');
    }

    public function cities() {
        return $this->hasOne(Cities::class, 'id', 'city_id');
    }

    public function requirment() {
        return $this->hasOne(Requirment::class, 'id', 'requirment_id');
    }

    public function categories() {
        return $this->hasOne(Categories::class, 'id', 'categories_id');
    }

    public function category() {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }

    public function sub_category() {
        return $this->hasOne(SubCategory::class, 'id', 'sub_category_id');
    }
    public function uploader() { // relation to 'register' table
        return $this->belongsTo(Register::class, 'user_id');
    }

    public function comments() {
        return $this->hasMany(UserVideoComments::class)->whereNull('parent_id')->with(['replies', 'register']);
    }
    
    public function allComments() { // for counting all comments (including replies if needed)
        return $this->hasMany(UserVideoComments::class);
    }

    public function likes() {
        return $this->hasMany(UserVideoLike::class); // or your specific like model
    }

}
