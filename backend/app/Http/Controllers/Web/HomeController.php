<?php

namespace App\Http\Controllers\Web;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Config;
use Session;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        
        return view('web.home');
    }
    public function privacy_policy(Request $request)
    {
        
        return view('web.privacy_policy');
    }
    public function terms_and_conditions(Request $request)
    {
        
        return view('web.terms_and_conditions');
    }

}
