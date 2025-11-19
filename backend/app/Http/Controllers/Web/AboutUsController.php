<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\AboutUs;
use App\Models\Banner;
use App\Models\Teams;
use App\Models\OurValues;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class AboutUsController extends Controller
{
    public function index(){
        $aboutUs = AboutUs::select('id', 'title_1', 'title_2', 'description', 'image','image_2','lets_work_together_title', 'our_value_title', 'what_we_do_image', 'what_we_do_description', 'our_vision_image', 'our_vision_description', 'our_mission_image', 'our_mission_description')->first();
        $teams = Teams::orderBy('sequence', 'ASC')->select('id', 'image', 'name', 'country_code', 'designation', 'image', 'message', 'status')->where('status',1)->get();
        $ourValues = OurValues::orderBy('id', 'DESC')->select('id','image','title', 'description')->get();
// dd($ourValues);
        return view('web.about-us.index',compact('aboutUs','teams','ourValues'));
    }
}
