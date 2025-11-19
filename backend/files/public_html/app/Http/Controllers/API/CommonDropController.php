<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Banner;
use App\Models\Manufacturer;
use App\Models\Categories;
use App\Models\Register;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Models;
use App\Models\Unit;
use App\Models\Grade;
use App\Models\Requirment;
use App\Models\Surface;
use App\Models\Country;
use App\Models\Cities;
use App\Models\States;
use App\Models\Role;
use App\Models\Parts;
use App\Models\HomeList;
use App\Models\HomeSlider;
use App\Models\HomeFooterSlider;
use App\Models\Faq;
use App\Models\BuyerRequirment;
use App\Models\SellerDetails;
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

class CommonDropController extends Controller {

    public function role_lists(Request $request) {

        $data = Role::where('status', 1)->select('id', 'name', 'slug')->get();
        if ($data->isEmpty()) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $data], 200);
    }

    public function country_lists(Request $request) {

        $data = Country::where('is_enable', 1)->select('id', 'country_name')->get();
        if ($data->isEmpty()) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }
        return response()->json(['status' => true, 'data' => $data], 200);
    }

    public function main_categories_lists(Request $request) {

        $user = Auth::user();

        if ($request->filled('user_id')) {
            $data = Categories::where('status', 1)->orWhere('user_id', $request->user_id)->orderBy('name', 'asc')->select('id', 'name')->get();
        } else {
            $data = Categories::where('status', 1)->orderBy('name', 'asc')->select('id', 'name')->get();
        }
        if ($data->isEmpty()) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $data], 200);
    }

    public function states_lists(Request $request) {

        if ($request->filled('id_country') && $request->filled('id_country')) {
            $data = States::where('is_enable', 1)->where('id_country', $request->id_country)->select('id', 'state_name', 'id_country')->get();
        } else {
            $data = States::where('is_enable', 1)->select('id', 'state_name', 'id_country')->get();
        }
        if ($data->isEmpty()) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }
        return response()->json(['status' => true, 'data' => $data], 200);
    }

    public function cities_lists(Request $request) {

        if ($request->filled('id_state') && $request->filled('id_state')) {
            $data = Cities::where('is_enable', 1)->where('id_state', $request->id_state)->select('id', 'city_name', 'id_state', 'id_country')->get();
        } else {
            $data = Cities::where('is_enable', 1)->select('id', 'city_name', 'id_state', 'id_country')->get();
        }
        if ($data->isEmpty()) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }
        return response()->json(['status' => true, 'data' => $data], 200);
    }

    public function category_lists(Request $request) {

        if ($request->filled('user_id')) {
            $data = Category::where('status', 1)->orWhere('user_id', $request->user_id)->orderBy('name', 'asc')->select('id', 'name', 'status')->get();
        } else {
            $data = Category::where('status', 1)->orderBy('name', 'asc')->select('id', 'name', 'status')->get();
        }
        if ($data->isEmpty()) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $data], 200);
    }

    public function model_lists(Request $request) {

        if ($request->filled('user_id')) {
            $data = $data = Models::where('status', 1)->orWhere('user_id', $request->user_id)->orderBy('name', 'asc')->select('id', 'name')->get();
        } else {
            $data = Models::where('status', 1)->orderBy('name', 'asc')->select('id', 'name')->get();
        }
        if ($data->isEmpty()) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $data], 200);
    }

    public function manufacturer_lists(Request $request) {

        if ($request->filled('user_id')) {
            $data = $data = Manufacturer::where('status', 1)->orWhere('user_id', $request->user_id)->orderBy('name', 'asc')->select('id', 'name')->get();
        } else {
            $data = Manufacturer::where('status', 1)->orderBy('name', 'asc')->select('id', 'name')->get();
        }
        if ($data->isEmpty()) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $data], 200);
    }

    public function requirment_lists(Request $request) {

        $data = Requirment::where('status', 1)->orderBy('name', 'asc')->select('id', 'name')->get();

        if ($data->isEmpty()) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $data], 200);
    }
    
    public function faq_list(Request $request) {

        $data = Faq::select('id', 'title', 'description')->get();
        if ($data->isEmpty()) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $data], 200);
    }
    
    public function parts_lists(Request $request) {

        if ($request->filled('user_id')) {
            $data = $data = Parts::where('status', 1)->orWhere('user_id', $request->user_id)->orderBy('name', 'asc')->select('id', 'name')->get();
        } else {
            $data = Parts::where('status', 1)->orderBy('name', 'asc')->select('id', 'name')->get();
        }
        if ($data->isEmpty()) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $data], 200);
    }

    public function get_filter_data(Request $request) {
        $type = $request->type;
        
        if ($type == "home") {
            $data['states'] = HomeList::select('state.id', 'state.state_name')
                    ->join('state', 'home_list.state_id', '=', 'state.id')
                    ->distinct()
                    ->get();
            
        }else if ($type == "buyer") {
            $data['states'] = BuyerRequirment::select('state.id', 'state.state_name')
                    ->join('state', 'buyer_requirment.state_id', '=', 'state.id')
                    ->distinct()
                    ->get();
            $data['category'] = Category::where('status', 1)->select('id', 'name', 'status')->get();
            $data['requirement_type'] = Requirment::where('status', 1)->select('id', 'name', 'status')->get();
        }else if ($type == "seller") {
            $data['states'] = SellerDetails::select('state.id', 'state.state_name')
                    ->join('state', 'seller_details.state_id', '=', 'state.id')
                    ->distinct()
                    ->get();
            $data['category'] = Category::where('status', 1)->select('id', 'name', 'status')->get();
            $data['requirement_type'] = Requirment::where('status', 1)->select('id', 'name', 'status')->get();
        }else if ($type == "directory") {
            $data['states'] = Register::select('state.id', 'state.state_name')
                    ->join('state', 'register.state_id', '=', 'state.id')
                    ->distinct()
                    ->get();
            $data['main_category'] = Categories::where('status', 1)->select('id', 'name')->get();
            $data['category'] = Category::where('status', 1)->select('id', 'name', 'status')->get();
            $data['requirement_type'] = Requirment::where('status', 1)->select('id', 'name', 'status')->get();
            $data['model'] = Models::where('status', 1)->orderBy('name', 'asc')->select('id', 'name')->get();
        }else{
            
            $data = array();
        }

        $data['roles'] = Role::where('status', 1)->select('id', 'name', 'slug')->get();
        
        return response()->json(['status' => true, 'data' => $data], 200);
    }

}
