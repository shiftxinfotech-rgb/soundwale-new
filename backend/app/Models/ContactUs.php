<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactUs extends Model
{
    public $table = 'contact_us';

    protected $fillable = [
        'name',
        'email',
        'country_code',
        'mobile_number',
        'subject',
        'message',
    ];
}
