<?php

namespace App\Http\Controllers\API\Auth;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Register;
use App\Models\Role;
use App\Models\Categories;
use App\Models\Category;
use App\Models\Country;
use App\Models\States;
use App\Models\Cities;
use App\Models\SubCategory;
use App\Models\Models;
use App\Models\Parts;
use App\Models\BusinessCompany;
use App\Models\BusinessVideo;
use App\Models\Catalogue;
use App\Models\UserVideo;
use App\Models\SellerDetails;
use App\Models\SellerDetailsLike;
use App\Models\Business;
use App\Models\BusinessImages;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\RegisterMail;
use App\Mail\RegisterMailAdmin;
use Illuminate\Support\Facades\Config;
use App\Models\MailConfiguration;
use Illuminate\Validation\Rule;

class RegisterController extends Controller {

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
                    'role_id' => 'required',
                    'name' => 'required',
                    'personal_name' => 'required',
                    'code' => 'required',
                    'code_sort' => 'required',
                    'mobile_number' => 'required|string|max:15|unique:register,mobile_number',
                    'location' => 'required',
                    'latitude' => 'required',
                    'longitude' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }
        $country_name = isset($request->country_name) ? $request->country_name : '';
        if ($country_name != "") {
            $CountryExists = Country::where('country_name', $country_name)->first();
            if ($CountryExists) {
                $country_id = $CountryExists->id;
            } else {
                $Country = Country::create([
                            'country_name' => $country_name,
                            'user_id' => 0,
                ]);
                $country_id = $Country->id;
            }
        }
        $state_name = isset($request->state_name) ? $request->state_name : '';
        if ($state_name != "") {
            $StateExists = States::where('state_name', $state_name)->where('id_country', $country_id)->first();
            if ($StateExists) {
                $state_id = $StateExists->id;
            } else {
                $State = States::create([
                            'id_country' => $country_id,
                            'state_name' => $state_name,
                            'user_id' => 0,
                ]);
                $state_id = $State->id;
            }
        }
        $city_name = isset($request->city_name) ? $request->city_name : '';
        if ($city_name != "") {
            $CityExists = Cities::where('city_name', $city_name)->where('id_state', $state_id)->where('id_country', $country_id)->first();
            if ($CityExists) {
                $city_id = $CityExists->id;
            } else {
                $City = Cities::create([
                            'id_country' => $country_id,
                            'id_state' => $state_id,
                            'city_name' => $city_name,
                            'user_id' => 0,
                ]);
                $city_id = $City->id;
            }
        }



        $user = Register::create([
                    'name' => isset($request->name) ? $request->name : '',
                    'personal_name' => isset($request->personal_name) ? $request->personal_name : '',
                    'role_id' => isset($request->role_id) ? $request->role_id : '',
                    'code' => isset($request->code) ? $request->code : '',
                    'code_sort' => isset($request->code_sort) ? $request->code_sort : '',
                    'mobile_number' => isset($request->mobile_number) ? $request->mobile_number : '',
                    'fcm_token' => isset($request->fcm_token) ? $request->fcm_token : '',
                    'location' => isset($request->location) ? $request->location : '',
                    'latitude' => isset($request->latitude) ? $request->latitude : '',
                    'longitude' => isset($request->longitude) ? $request->longitude : '',
                    'country_id' => isset($country_id) ? $country_id : '',
                    'state_id' => isset($state_id) ? $state_id : '',
                    'city_id' => isset($city_id) ? $city_id : '',
                    'status' => 1
        ]);

        $user = Register::select('*')
                ->where('code', $request->code)
                ->where('mobile_number', $request->mobile_number);
        $user = $user->first();
        if (isset($user)) {
            //        Notification Code Start
            $notification_title = "Welcome to Soundwale!";
            $notification_body = "Congratulations, $user->name Your account has been successfully created. Explore and enjoy our services!";
            $notification_type = "welcome_register";
            $notification_modules_type = "register";
            $notification_relation_id = $user->id;
            $notification_user_id = $user->id;
            $notification_token_user_id = $user->id;
            Helper::notifyToUser(
                    $notification_title, $notification_body, $notification_type, $notification_modules_type, $notification_relation_id, $notification_user_id, $notification_token_user_id
            );
            //        Notification Code End
        }
        // Invalidate existing tokens
        $user->tokens()->delete();
        // Generate a new token
        $token = $user->createToken('auth_token')->plainTextToken;

        $user = Register::select('register.*', 'country.country_name as country_name', 'state.state_name as state_name', 'city.city_name as city_name')
                ->leftJoin('country', 'register.country_id', '=', 'country.id')
                ->leftJoin('state', 'register.state_id', '=', 'state.id')
                ->leftJoin('city', 'register.city_id', '=', 'city.id')
                ->where('register.id', $user->id)
                ->first();
        $role_data = array();
        if (isset($user)) {
            $role_data = Role::select('*')->whereIn('id', explode(',', $user->role_id))->get();
        }
        $user['roles'] = $role_data;
        $appToken = Helper::app_token_msg($user->mobile_number);
        $user['firebase_custom_token'] = $appToken;
        return response()->json(['message' => 'Registered successfully', 'status' => true, 'token' => $token, 'user' => $user], 200);
    }

    public function update_profile(Request $request) {
        $user = auth()->user();

//        $validator = Validator::make($request->all(), [
////                    'name' => 'required',
////                    'role_id' => 'required',
////                    'mobile_number' => ['required', Rule::unique('register', 'mobile_number')->ignore($user->id)],
//        ]);
//
//        if ($validator->fails()) {
//            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
//        }

        $exists = Register::where('id', $user->id)->first();
        if ($exists) {
            $updateData = array();

            if ($request->has('name')) {
                $updateData['name'] = $request->name;
            }
            if ($request->has('gender')) {
                $updateData['gender'] = $request->gender;
            }
            if ($request->has('personal_name')) {
                $updateData['personal_name'] = $request->personal_name;
            }
            if ($request->has('email')) {
                $updateData['email'] = $request->email;
            }
            if ($request->has('role_id')) {
                $updateData['role_id'] = $request->role_id;
            }
            if ($request->has('code')) {
                $updateData['code'] = $request->code;
            }
            if ($request->has('code_sort')) {
                $updateData['code_sort'] = $request->code_sort;
            }
            if ($request->has('mobile_number')) {
                $updateData['mobile_number'] = $request->mobile_number;
            }
            if ($request->has('marketing_person_name')) {
                $updateData['marketing_person_name'] = $request->marketing_person_name;
            }
            if ($request->has('marketing_code_sort')) {
                $updateData['marketing_code_sort'] = $request->marketing_code_sort;
            }
            if ($request->has('marketing_code')) {
                $updateData['marketing_code'] = $request->marketing_code;
            }
            if ($request->has('marketing_mobile_number')) {
                $updateData['marketing_mobile_number'] = $request->marketing_mobile_number;
            }
            if ($request->hasFile('image')) {
                $updateData['image'] = Helper::uploadImage($request->image, Register::IMAGE_PATH);
            }
            if ($request->hasFile('visiting_card_image')) {
                $updateData['visiting_card_image'] = Helper::uploadImage($request->visiting_card_image, Register::IMAGE_PATH);
            }
//            if ($request->has('product_ids')) {
//                $updateData['product_ids'] = $request->product_ids;
//            }
            if ($request->has('location')) {
                $updateData['location'] = $request->location;
            }
            if ($request->has('latitude')) {
                $updateData['latitude'] = $request->latitude;
            }
            if ($request->has('longitude')) {
                $updateData['longitude'] = $request->longitude;
            }
            if ($request->has('country_id')) {
                $updateData['country_id'] = $request->country_id;
            }
            if ($request->has('state_id')) {
                $updateData['state_id'] = $request->state_id;
            }
            if ($request->has('city_id')) {
                $updateData['city_id'] = $request->city_id;
            }
            if ($request->has('village')) {
                $updateData['village'] = $request->village;
            }
            if ($request->has('gst_number')) {
                $updateData['gst_number'] = $request->gst_number;
            }
            if ($request->has('company_about')) {
                $updateData['company_about'] = $request->company_about;
            }

            if ($request->has('product_ids')) {
                $product_ids_info = json_decode($request->product_ids, true);
                $product_ids_info_new = array();
                if ($request->product_ids == "") {
                    $updateData['product_ids'] = NULL;
                } else if ($request->product_ids != "" && $request->product_ids != "[]") {
                    $category_id = "";
                    foreach ($product_ids_info as $product_ids_info_row) {
                        if ($product_ids_info_row['category_id'] == 0) {
                            $category_data = Category::firstOrCreate([
                                        'name' => $product_ids_info_row['category_name'],
                                        'user_id' => $user->id,
                                        'status' => 0,
                            ]);
                            $category_id = $category_data->id;
                        } else {
                            $category_id = $product_ids_info_row['category_id'];
                        }
                        $product_ids_info_new[] = [
                            'category_id' => (string) $category_id,
                            'category_name' => (string) $product_ids_info_row['category_name'],
                        ];
                    }
                    $updateData['product_ids'] = json_encode($product_ids_info_new);
                }
            }

            $exists->update($updateData);
        }

        $user = Register::select('register.*', 'country.country_name as country_name', 'state.state_name as state_name', 'city.city_name as city_name')
                ->leftJoin('country', 'register.country_id', '=', 'country.id')
                ->leftJoin('state', 'register.state_id', '=', 'state.id')
                ->leftJoin('city', 'register.city_id', '=', 'city.id')
                ->where('register.id', $user->id)
                ->first();
        $role_data = array();
        if (isset($user)) {
            $role_data = Role::select('*')->whereIn('id', explode(',', $user->role_id))->get();
        }
        $user['roles'] = $role_data;

        return response()->json(['message' => 'Updated successfully.', 'status' => true, 'user' => $user], 200);
    }

}
