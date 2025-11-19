<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Helper\Helper;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    const PHOTO_PATH = 'app/user-photo/';

    const BUYER_USER = 1;

    const SELLER_USER = 2;

    protected $appends = ['role', 'photo_url', 'id_proof_url'];

    protected $fillable = [
        'name',
        'email',
        'password',
        'mobile_number',
        'country_code',
        'country_code_text',
        'photo',
        'gender',
        'age',
        'social_login',
        'social_id',
        'social_platform',
        'type',
        'email_verified_at',
        'account_verified',
        'has_deletion_request',
        'deletion_reason',
        'admin_deletion_reason',
        'verification_status',
        'verification_reason',
        'id_proof',
        'fcm_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected static function booted()
    {
        parent::boot();

        static::deleted(function ($obj) {
            // if ($obj->photo) {
            //     Storage::delete(self::PHOTO_PATH.$obj->photo);
            // }
        });
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function scopeBuyer(Builder $query): void
    {
        $query->where('type', self::BUYER_USER);
    }

    public function scopeSeller(Builder $query): void
    {
        $query->where('type', self::SELLER_USER);
    }

    public function scopeDeleted(Builder $query): void
    {
        $query->whereNotNull('deleted_at')->withTrashed();
    }

    public function getRoleAttribute()
    {
        switch ($this->type) {
            case self::BUYER_USER:
                return 'Buyer';
                break;
            case self::SELLER_USER:
                return 'Seller';
                break;
        }
    }

    public function getPhotoUrlAttribute()
    {
        return Helper::getImageUrl(self::PHOTO_PATH.$this->photo, $this->photo);
    }

    public function getIdProofUrlAttribute()
    {
        return Helper::getImageUrl(self::PHOTO_PATH.$this->id_proof, $this->id_proof);
    }

    public function property()
    {
        return $this->hasMany(Property::class, 'user_id', 'id');
    }

    public function likedProperties()
    {
        return $this->belongsToMany(Property::class, 'likes')->withTimestamps();
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function reviews()
    {
        return $this->hasManyThrough(Review::class, Property::class);
    }

    public function averagePropertyRating()
    {
        return $this->reviews()->avg('rating');
    }

    public function totalPropertyReviews()
    {
        return $this->reviews()->count();
    }
}
