<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class TalentSeeker  extends Model
{
    protected $table = 'talent_seeker';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'designation',
        'company_name',
        'mobile_no',
        'work_email',
        'skype',
        'company_website',
        'city',
        'job_description',
    ];
}
