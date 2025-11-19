<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class HomeListLike extends Model
{
    public $table = 'home_list_likes';

    protected $fillable = [
        'user_id',
        'home_list_id',
        'status',
    ];

    
    public function register()
    {
        return $this->hasOne(Register::class, 'id', 'user_id');
    }
    
}
