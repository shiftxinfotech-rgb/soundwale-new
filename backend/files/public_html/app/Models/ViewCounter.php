<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ViewCounter extends Model
{
    public $table = 'view_counter';

    protected $fillable = [
        'id',
        'type',
        'relation_id',
        'user_id',
    ];

}
