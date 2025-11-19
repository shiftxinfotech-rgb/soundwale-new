<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialLinks extends Model
{
    public $table = 'social_links';

    protected $fillable = [
        'facebook_link',
        'twitter_link',
        'instagram_link',
        'linked_link',
    ];
}
