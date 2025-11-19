<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class RegisterWorkingWithApproval extends Model {

    public $table = 'register_working_with';
    protected $fillable = [
        'user_id',
        'register_id',
        'register_name',
        'status',
        'reject_reason',
    ];
    

}
