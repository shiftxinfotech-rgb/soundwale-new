<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class BuyerRequirment extends Model {

    public $table = 'buyer_requirment';
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
        return $this->hasMany(BuyerRequirmentImages::class, 'buyer_requirment_id', 'id');
    }
    
    public function likes() {
        return $this->hasMany(BuyerRequirmentLike::class);
    }
    
    public function comments() {
        return $this->hasMany(BuyerRequirmentComments::class);
    }
    
    public function total_likes() {
        return $this->hasMany(LikesLike::class, 'type_id', 'id');
    }

}
