<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Testimonials;
use App\Models\Setting;
use Yajra\DataTables\DataTables;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use DB;
use Illuminate\Support\Facades\Route;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {

        $testimonials = Testimonials::orderBy('created_at', 'DESC')->select('id', 'image', 'name', 'rating', 'designation', 'image', 'message','type','status')->where('status',1)->get();
        return view('web.testimonials.index',compact('testimonials'));
    }

}
