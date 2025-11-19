<?php

namespace App\Http\Controllers\API;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\MailConfiguration;
use App\Models\Register;
use App\Models\Business;
use App\Models\Categories;
use App\Models\ViewCounter;
use App\Models\BusinessVideo;
use App\Models\BusinessCompany;
use App\Models\RegisterWorkingWithApproval;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\BusinessImages;
use App\Models\Catalogue;
use App\Models\Review;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactUsMail;
use App\Mail\ContactUsMailAdmin;
use DB;

class DirectoryController extends Controller {

    public function lists(Request $request) {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
                    'role_id' => 'required',
                        ], [
                    'role_id.required' => 'The role id field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {

            $perPage = (int) $request->get('limit', config('app.API_PER_PAGE'));
            $page = (int) $request->get('page', 1);
            $offset = ($page - 1) * $perPage;

            $search = $request->search;
            $role_id = $request->role_id;
            $state_id = $request->city_id;
            $product_id = $request->product_id;
            $company_id = $request->company_id;
            $model_id = $request->model_id;
            

            $query = Register::select('register.*', 'country.country_name as country_name', 'state.state_name as state_name', 'city.city_name as city_name')
                    ->join('country', 'register.country_id', '=', 'country.id')
                    ->join('state', 'register.state_id', '=', 'state.id')
                    ->join('city', 'register.city_id', '=', 'city.id')
                    ->withAvg(['review_directory as review_avg_rating' => function ($query) use ($user) {
//                            $query->where('user_id', '!=', $user->id);
                        }], 'rating')
                    ->withCount(['review_directory as review_count' => function ($query) use ($user) {
                    $query->where('type', 'directory');
//                            $query->where('user_id', '!=', $user->id);
                }])
                ->where('register.id', '!=', $user->id);
            if (isset($search) && $search != "") {
                $query->where(function ($q) use ($search) {
                    $q->orWhere('register.name', 'LIKE', "%{$search}%")
                            ->orWhere('register.personal_name', 'LIKE', "%{$search}%")
                            ->orWhere('register.company_about', 'LIKE', "%{$search}%"); // add more as needed
                });
            }
            if (!empty($role_id)) {
                $roles_id = array_filter(explode(",", $role_id)); // remove empty values
                if (!empty($roles_id)) {
                    $query->where(function ($q) use ($roles_id) {
                        foreach ($roles_id as $roles_idd) {
                            $q->orWhereRaw("FIND_IN_SET(?, register.role_id) > 0", [$roles_idd]);
                        }
                    });
                }
            }
            if (!empty($state_id)) {
                $states_id = array_filter(explode(",", $state_id));
                if (!empty($states_id)) {
                    $query->where(function ($q) use ($states_id) {
                        foreach ($states_id as $stateId) {
                            $q->orWhereRaw("FIND_IN_SET(?, register.state_id) > 0", [$stateId]);
                        }
                    });
                }
            }else{
                $query->whereRaw('FIND_IN_SET(?, register.state_id)', [$user->state_id]);
            }
            if (isset($product_id)) {
                $query->where(function ($query2) use ($product_id) {
                    $product_id = explode(",", $product_id);
                    foreach ($product_id as $id2) {
                        $query2->orWhere('register.manufacturing_product_info', 'LIKE', '%"product_id":"' . $id2 . '%');
                        $query2->orWhere('register.category_info', 'LIKE', '%"category_id":"' . $id2 . '%');
                    }
                });
            }
            if (isset($company_id)) {
                $query->where(function ($query3) use ($company_id) {
                    $company_id = explode(",", $company_id);
                    foreach ($company_id as $id3) {
                        $query3->orWhere('register.dealer_of_company', 'LIKE', '%"company_id":"' . $id3 . '%');
                        $query3->orWhere('register.distributor_of_company', 'LIKE', '%"company_id":"' . $id3 . '%');
                        $query3->orWhere('register.importer_of_company', 'LIKE', '%"company_id":"' . $id3 . '%');
                        $query3->orWhere('register.spare_part_info', 'LIKE', '%"company_id":"' . $id3 . '%');
                        $query3->orWhere('register.service_center_info', 'LIKE', '%"company_id":"' . $id3 . '%');
                        $query3->orWhere('register.companies_info', 'LIKE', '%"companies_id":"' . $id3 . '%');
                        $query3->orWhere('register.mixer_names_info', 'LIKE', '%"company_id":"' . $id3 . '%');
                    }
                });
            }
            if (isset($model_id)) {
                $query->where(function ($query4) use ($model_id) {
                    $model_id = explode(",", $model_id);
                    foreach ($model_id as $id4) {
                        $query4->orWhere('register.mixer_names_info', 'LIKE', '%"model_id":"' . $id4 . '%');
                    }
                });
            }
            
            $latitude = $request->latitude;
            $longitude = $request->longitude;
            $radius = $request->radius ?? 5; // Default to 5 km if not provided
            if (!empty($latitude) && !empty($longitude)) {
                $haversine = "(6371 * acos(cos(radians(?)) * cos(radians(register.latitude)) * cos(radians(register.longitude) - radians(?)) + sin(radians(?)) * sin(radians(register.latitude))))";
                $query->whereRaw("$haversine <= ?", [$latitude, $longitude, $latitude, $radius]);
            }

            $data = $query->orderBy('register.name', 'asc')->get();

            $usersWithRoles = $data->map(function ($data) {
                $roleIds = explode(',', $data->role_id);
                $roles = Role::whereIn('id', $roleIds)
                        ->get()
                        ->toArray();
                $data->roles = $roles;

                return $data;
            });
            if ($data->isEmpty()) {
                return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
            } else {

                $total = $data->count();
                $data = $data->slice($offset, $perPage)->values();

                $meta = array();
                $meta['current_page'] = $page;
                $meta['per_page'] = $perPage;
                $meta['next_page_url'] = $total > ($offset + $perPage) ? url()->current() . '?page=' . ($page + 1) . '&limit=' . $perPage : null;
                $meta['have_more_records'] = $total > ($offset + $perPage);
                $meta['total'] = $total;
                return response()->json(['status' => true, 'data' => ['data' => $data, 'meta' => $meta]], 200);
            }
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function get_by_id(Request $request) {

        $user = auth()->user();

        $validator = Validator::make($request->all(), [
                    'id' => 'required',
                        ], [
                    'id.required' => 'The user id field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

//        try {

        $data = Register::select('register.*', 'country.country_name as country_name', 'state.state_name as state_name', 'city.city_name as city_name')
                ->join('country', 'register.country_id', '=', 'country.id')
                ->join('state', 'register.state_id', '=', 'state.id')
                ->join('city', 'register.city_id', '=', 'city.id')
                ->where('register.id', '=', $request->id)
                ->first();
        if (!empty($data)) {
            $roleIds = explode(',', $data->role_id);
            $roles = Role::whereIn('id', $roleIds)
                    ->get()
                    ->toArray();
            $data->roles = $roles;
        }
        if (!$data) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }
        $business_company_pdf_data = array();
        $business_company_pdf_data = BusinessCompany::select('*')->where('user_id', $request->id)->get();
        $data['company_pdf_data'] = $business_company_pdf_data;
        $working_with_data = array();
        $working_with_data = RegisterWorkingWithApproval::select('register_working_with.*', 'register.name as user_name', 'role.name as role_name', 'register.image as user_image')
                ->leftjoin('register', 'register_working_with.register_id', '=', 'register.id')
                ->leftjoin('role', 'register.role_id', '=', 'role.id')
                ->where('register_working_with.status', '=', 1)
                ->where('register_working_with.user_id', $request->id)
                ->get();
        $working_with_data->transform(function ($items) {
            if ($items->user_image) {
                $items->user_image = asset('storage/app/register/' . $items->user_image);
            } else {
                $items->user_image = "https://soundwale.in/demo/public/admin-asset/images/profile_default_image.png";
            }
            return $items;
        });
        $data['working_with_data'] = $working_with_data;

        $review_data = array();
        $review_avg_rating = 0;
        $review_count = 0;

        if (isset($data)) {
            $review_data = Review::select('review.*', 'register.role_id', 'register.name as user_name', Review::raw("
            CASE 
                WHEN register.image IS NOT NULL AND register.image != '' 
                THEN CONCAT('https://soundwale.in/demo/public/storage/app/register/', register.image)
                ELSE CONCAT('https://soundwale.in/demo/public/admin-asset/images/profile_default_image.png') 
            END AS user_profile_url
        "))
                    ->join('register', 'review.user_id', '=', 'register.id')
                    ->where('review.type', '=', "directory")
                    ->where('review.user_id', '!=', $request->id)
                    ->where('review.relevant_id', '=', $request->id)
                    ->get();
            $usersWithRoles = $review_data->map(function ($review_data) {
                $roleIds = explode(',', $review_data->role_id);
                $roles1 = Role::whereIn('id', $roleIds)
                        ->get()
                        ->toArray();
                $review_data->roles = $roles1;
            });
            $review_avg_rating = $review_data->avg('rating');
            $review_count = $review_data->count();
        }
        
        $data['review_data'] = $review_data;
        $data['review_avg_rating'] = $review_avg_rating;
        $data['review_count'] = $review_count;
        
        if (!empty($data)) {
//                if (!ViewCounter::where('relation_id', $request->id)->where('user_id', $user->id)->where('type', 'directory')->exists()) {
//                    ViewCounter::create(['relation_id' => $request->id, 'user_id' => $user->id, 'type' => 'directory']);
//                    Register::find($request->id)->increment('view_counter');
//                }
            return response()->json(['status' => true, 'data' => $data], 200);
        } else {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }
//        } catch (\Throwable $th) {
//            \Log::error(request()->path() . "\n" . $th->getMessage());
//            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
//        }
    }

}
