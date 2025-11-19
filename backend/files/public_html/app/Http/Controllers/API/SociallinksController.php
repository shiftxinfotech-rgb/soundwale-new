<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\SocialLinks;
use App\Models\MailConfiguration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use App\Mail\AccountDeletedMail;
use Illuminate\Validation\Rule;

class SociallinksController extends Controller {

    public function lists(Request $request) {
        
        $data = SocialLinks::where('id', 1)->select('facebook_link', 'twitter_link', 'instagram_link', 'linked_link')->first();
        if (!$data) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $data], 200);
    }

}
