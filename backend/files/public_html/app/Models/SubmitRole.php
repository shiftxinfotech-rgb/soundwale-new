<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubmitRole extends Model
{
    protected $table = 'submit_role';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'job',
        'hires',
        'job_description',
        'time',
        'location',
        'salary',
        'start_date',
        'name',
        'business',
        'email',
        'phone_number',
    ];
}


