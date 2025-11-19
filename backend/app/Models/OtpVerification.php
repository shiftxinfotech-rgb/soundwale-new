<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OtpVerification extends Model
{
    use HasFactory;

    const UPDATED_AT = null;

    protected $fillable = [
        'email',
        'otp',
        'expires_at',
    ];

    protected $dates = [
        'expires_at',
    ];
}
