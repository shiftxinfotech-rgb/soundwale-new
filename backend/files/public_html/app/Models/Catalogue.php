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

class Catalogue extends Authenticatable
{
    use HasApiTokens, Notifiable;

    use HasFactory;
    protected $table = 'catalogue';

     protected $fillable = [
        'id',
        'image',
        'user_id',
        'name',
        'other_details',
        'status',
    ];
    // protected $appends = [
    //     "image_full_path"
    // ];

    protected $appends = [
        'image_url',
    ];
    const IMAGE_PATH = 'app/catalogue/';
     
    public function getImageUrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->image, $this->image);
    }
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
        static::updating(function ($obj) {
            if ($obj->image != $obj->getOriginal('image')) {
                removeFile($obj->getOriginal('image'));
            }
        });
    }

    public function getImageFullPathAttribute()
    {
        return getImageUrl( $this->image );
    }
    public function register()
    {
        return $this->hasOne(Register::class, 'id', 'user_id');
    }
    public function category()
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }
    public function state()
    {
        return $this->hasOne(States::class, 'id', 'state_id');
    }

}
