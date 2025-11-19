<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class Notifications extends Authenticatable
{
    use HasApiTokens, Notifiable;

    use HasFactory;
    protected $table = 'notifications';

     protected $fillable = [
        'id',
        'title',
        'type',
        'modules_type',
        'read',
        'relation_id',
        'user_id',
        'categories_id',
        'return_data',
        'created_at',
        'updated_at',
        'body',
    ];
    // protected $appends = [
    //     "image_full_path"
    // ];

    protected $appends = [
//        'image_url',
    ];
    const IMAGE_PATH = 'app/notifications/';
     
//    public function getImageUrlAttribute()
//    {
//        return Helper::getImageUrl(self::IMAGE_PATH.$this->image, $this->image);
//    }
    public function isValidToken($token)
    {
        $tokenData = \DB::table('password_resets')->where('email', $this->email)->first();
        if (!$tokenData) {
            return false; // Token not found for this email
        }

        $expirationTime = Carbon::parse($tokenData->created_at)->addMinutes(config('auth.passwords.'.config('auth.defaults.passwords').'.expire'));
        if (Carbon::now()->gt($expirationTime)) {
            return false; // Token has expired
        }

        return Hash::check($token, $tokenData->token);

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
