<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\CmsPages;
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

class CmsController extends Controller {

    public function Privacy(Request $request) {
        
        $cms_data = CmsPages::where('id', 1)->select('title', 'slug', 'description')->first();
        if (!$cms_data) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $cms_data], 200);
    }
    
    public function Terms(Request $request) {
        
        $cms_data = CmsPages::where('id', 2)->select('title', 'slug', 'description')->first();
        if (!$cms_data) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $cms_data], 200);
    }
    
    public function short_terms(Request $request) {
        
        $cms_data = CmsPages::where('id', 6)->select('title', 'slug', 'description')->first();
        if (!$cms_data) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $cms_data], 200);
    }
    
    public function Refund(Request $request) {
        
        $cms_data = CmsPages::where('id', 3)->select('title', 'slug', 'description')->first();
        if (!$cms_data) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $cms_data], 200);
    }
    
    public function Need_help(Request $request) {
        
        $cms_data = CmsPages::where('id', 5)->select('title', 'slug', 'description')->first();
        if (!$cms_data) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $cms_data], 200);
    }
    

}
