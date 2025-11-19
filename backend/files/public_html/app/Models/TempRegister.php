<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class TempRegister extends Model
{
    public $table = 'temp_register';

    protected $fillable = [
        'email',
        'code',
        'mobile_number',
        'verification_code',
        'send_count',
        'last_sent_at',
        'blocked_until',
    ];
    
    protected $casts = [
        'last_sent_at' => 'datetime',
        'blocked_until' => 'datetime',
    ];

    protected static function booted()
    {
        parent::boot();
    }
}
