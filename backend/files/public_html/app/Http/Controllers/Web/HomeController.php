<?php

namespace App\Http\Controllers\Web;


use App\Models\HomeSliders;
use App\Models\CmsPages;
use App\Models\Admin;
use App\Models\AboutUs;
use App\Models\JobPosting;
use App\Models\Leaders;
use App\Models\Teams;
use App\Models\OurValues;
use App\Models\Testimonials;
use App\Models\BrowseByPositions;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Models\ContactUs;
use App\Models\Setting;
use App\Models\SocialLinks;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Config;
use Session;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $home_sliders = HomeSliders::orderBy('sequence', 'ASC')->select('id', 'title', 'text', 'image','description')->where('status',1)->first();
        $aboutUs = AboutUs::select('id', 'title_1', 'title_2', 'description', 'lets_work_together_title', 'image','image_2','our_value_title')->first();
        $services = JobPosting::orderBy('sequence', 'ASC')->select('id', 'title', 'icon', 'sub_title', 'image','content','status','slug','coming_soon','location','salary')->where('status',1)->paginate(8);
        $footer = Setting::select('registered_address','factory_address','email','phone_number')->first();
        $testimonials = Testimonials::orderBy('created_at', 'DESC')->select('id', 'image', 'name', 'rating', 'designation', 'image', 'message', 'status','type')->where('status',1)->get();
        $teams = Teams::orderBy('sequence', 'ASC')->select('id', 'image', 'name', 'country_code', 'designation', 'image', 'message', 'status','home_status','image_2')->where('home_status',1)->paginate(3);
        $home_settings = Setting::select('*')->first();
        $cmsPage = CmsPages::orderBy('id', 'DESC')->get();
        $OurValues = OurValues::orderBy('id', 'ASC')->get();
        $advantages = BrowseByPositions::orderBy('sequence', 'ASC')->select('id', 'title','image','description','status')->where('status',1)->get();
        $socialLink = SocialLinks::select('facebook_link','twitter_link','instagram_link','linked_link')->first(); // Adjust this to select social link fields
        $leader = Leaders::select('id','image','title','description','status')->orderBy('id', 'DESC')->where('status',1)->get();

        return view('web.home',compact(
        'home_sliders',
        'cmsPage',
        'aboutUs',
        'services',
        'footer',
        'testimonials',
        'teams',
        'home_settings',
        'OurValues',
        'advantages',
        'socialLink',
        'leader'
    ));
    }

}
