<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class HomeListComments extends Model
{
    public $table = 'home_list_comments';

    protected $fillable = [
        'user_id',
        'parent_id',
        'home_list_id',
        'message',
        'status',
    ];

    
    public function register()
    {
        return $this->hasOne(Register::class, 'id', 'user_id');
    }
    
}
