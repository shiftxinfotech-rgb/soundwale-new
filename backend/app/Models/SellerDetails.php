<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class SellerDetails extends Model {

    public $table = 'seller_details';
    protected $fillable = [
        'user_id',
        'role_id',
        'manufacturer_id',
        'state_id',
        'product_ids',
        'requirment_id',
        'description',
        'status',
    ];

    public function register() {
        return $this->hasOne(Register::class, 'id', 'user_id');
    }

    public function states() {
        return $this->hasOne(States::class, 'id', 'state_id');
    }

    public function role() {
        return $this->hasOne(Role::class, 'id', 'role_id');
    }
    
    public function images() {
        return $this->hasMany(SellerDetailsImages::class, 'seller_details_id', 'id');
    }
    
    public function likes() {
        return $this->hasMany(SellerDetailsLike::class);
    }
    
    public function comments() {
        return $this->hasMany(SellerDetailsComments::class);
    }
    public function total_likes() {
        return $this->hasMany(LikesLike::class, 'type_id', 'id');
    }

}
