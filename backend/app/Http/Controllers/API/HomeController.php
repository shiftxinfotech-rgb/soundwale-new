<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\BuyerRequirment;
use App\Models\BuyerRequirmentImages;
use App\Models\BuyerRequirmentLike;
use App\Models\Banner;
use App\Models\Categories;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Unit;
use App\Models\Grade;
use App\Models\Requirment;
use App\Models\Surface;
use App\Models\Country;
use App\Models\Cities;
use App\Models\States;
use App\Models\Role;
use App\Models\HomeSlider;
use App\Models\HomeFooterSlider;
use App\Models\Faq;
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

class HomeController extends Controller {

    public function get_home_data(Request $request) {

        $search = $request->name;

        $data['home_slider_data'] = HomeSlider::where('status', 1)->select('id', 'image', 'status')->orderBy('id', 'desc')->get();

        $trending_list_query = Categories::select('id', 'image', 'name', 'description')->where('look_who_s_trending', 1)->where('status', 1);
        if (isset($search)) {
            $trending_list_query->where('name', 'LIKE', "%{$search}%")->orWhere('description', 'LIKE', "%{$search}%");
        }
        $data['look_who_s_trending_data'] = $trending_list_query->limit(4)->orderBy('id', 'desc')->get();

        $our_top_query = Categories::select('id', 'image', 'name', 'description')->where('our_top_pick', 1)->where('status', 1);
        if (isset($search)) {
            $our_top_query->where('name', 'LIKE', "%{$search}%")->orWhere('description', 'LIKE', "%{$search}%");
        }
        $data['our_top_pick_data'] = $our_top_query->orderBy('id', 'desc')->get();

        $data['footer_slider_data'] = HomeFooterSlider::where('status', 1)->select('id', 'image', 'status')->orderBy('id', 'desc')->get();

        $recent_requirements_data = array();

        $query = BuyerRequirment::select('register.role_id', BuyerRequirment::raw("IF(buyer_requirment_likes.status = 1, 1, 0) as is_likes"), 'buyer_requirment.id', 'buyer_requirment.other_details', 'buyer_requirment.user_id', BuyerRequirment::raw("
            CASE 
                WHEN register.image IS NOT NULL AND register.image != '' 
                THEN CONCAT('https://soundwale.in/public/storage/app/register/', register.image)
                ELSE CONCAT('https://soundwale.in/public/admin-asset/images/profile_default_image.png') 
            END AS user_profile_url
        "), 'register.name as user_name', 'register.code as user_code', 'register.mobile_number as user_mobile_number', 'buyer_requirment.country_id', 'country.country_name as country_name', 'buyer_requirment.state_id', 'state.state_name as state_name', 'buyer_requirment.city_id', 'city.city_name as city_name', 'buyer_requirment.requirment_id', 'requirment.name as requirment_name', 'buyer_requirment.categories_id', 'categories.name as main_category_name', 'buyer_requirment.category_id', 'category.name as category_name', 'buyer_requirment.sub_category_id', 'sub_category.name as sub_category_name', 'buyer_requirment.price', 'buyer_requirment.description', 'buyer_requirment.image', 'buyer_requirment.created_at')
                ->join('register', 'buyer_requirment.user_id', '=', 'register.id')
                ->join('country', 'buyer_requirment.country_id', '=', 'country.id')
                ->join('state', 'buyer_requirment.state_id', '=', 'state.id')
                ->join('city', 'buyer_requirment.city_id', '=', 'city.id')
                ->join('requirment', 'buyer_requirment.requirment_id', '=', 'requirment.id')
                ->join('categories', 'buyer_requirment.categories_id', '=', 'categories.id')
                ->join('category', 'buyer_requirment.category_id', '=', 'category.id')
                ->join('sub_category', 'buyer_requirment.sub_category_id', '=', 'sub_category.id')
                ->leftjoin('buyer_requirment_likes', 'buyer_requirment.id', '=', 'buyer_requirment_likes.buyer_requirment_id');
        if (isset($search)) {
            $query->where('categories.name', 'LIKE', "%{$search}%")->orWhere('category.name', 'LIKE', "%{$search}%")->orWhere('sub_category.name', 'LIKE', "%{$search}%");
        }

        $recent_requirements_data = $query->get();
        $usersWithRoles = $recent_requirements_data->map(function ($recent_requirements_data) {
            $roleIds = explode(',', $recent_requirements_data->role_id);
            $roles = Role::whereIn('id', $roleIds)
                    ->get()
                    ->toArray();
            $recent_requirements_data->roles = $roles;

            $images = BuyerRequirmentImages::where('buyer_requirment_id', $recent_requirements_data->id)
                    ->get()
                    ->toArray();
            $recent_requirements_data->images = $images;
        });

        $data['recent_requirements_data'] = $recent_requirements_data;
        return response()->json(['status' => true, 'data' => $data], 200);
    }

    public function look_who_s_trending_list(Request $request) {

        $data = Categories::where('status', 1)->where('look_who_s_trending', 1)->select('id', 'image', 'name', 'description')->get();
        if ($data->isEmpty()) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $data], 200);
    }

    public function our_top_pick_list(Request $request) {

        $data = Categories::where('status', 1)->where('our_top_pick', 1)->select('id', 'image', 'name', 'description')->get();
        if ($data->isEmpty()) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $data], 200);
    }

}
