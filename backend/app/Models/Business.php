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

class Business extends Authenticatable
{
    use HasApiTokens, Notifiable;

    use HasFactory;
    protected $table = 'business';

     protected $fillable = [
        'id',
        'image',
        'user_id',
        'name',
        'address',
		'latitude',
        'longitude',
        'companies_id',
        'status',
        'company_website',
        'gst_number',
        'establishment_year',
        'annual_turnover',
        'proof',
        'product_info',
        'business_card_image',
        'facebook_link',
        'instagram_link',
        'web_link',
        'youtube_link',
        'category_id',
        'sub_category_id',
        'catalogue_type',
        'catalogue_website',
        'catalogue_pdf',
        'dealer_list_area_wise_type',
        'dealer_list_area_wise_website',
        'dealer_list_area_wise_pdf',
		'description',
		'working_with',
        'service_center_id',
        'service_center_address',
        'service_center_address_latitude',
        'service_center_address_longitude',
        'your_best_engineer',
        'spare_part_info',
    ];
    // protected $appends = [
    //     "image_full_path"
    // ];

    protected $appends = [
        'image_url',
        'business_card_image_url',
        'proof_url',
        'dealer_list_area_wise_pdf_url',
        'catalogue_pdf_url',
    ];
    const IMAGE_PATH = 'app/business/';
     
    public function getImageUrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->image, $this->image);
    }
    public function getBusinessCardImageUrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->business_card_image, $this->business_card_image);
    }
    public function getProofUrlAttribute()
    {
        return Helper::getImageUrl(self::IMAGE_PATH.$this->proof, $this->proof);
    }
    public function getDealerListAreaWisePdfUrlAttribute() {
        return Helper::getImageUrl(self::IMAGE_PATH . $this->dealer_list_area_wise_pdf, $this->dealer_list_area_wise_pdf);
    }
    public function getCataloguePdfUrlAttribute() {
        return Helper::getImageUrl(self::IMAGE_PATH . $this->catalogue_pdf, $this->catalogue_pdf);
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
