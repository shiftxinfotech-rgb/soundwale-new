<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Register;
use App\Models\Role;
use App\Models\Catalogue;
use App\Models\Business;
use App\Models\BusinessCompany;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\BusinessVideo;
use App\Models\UserVideo;
use App\Models\SellerDetails;
use App\Models\SellerDetailsLike;
use App\Models\SellerDetailsImages;
use App\Models\Review;
use App\Models\BusinessImages;
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
use DB;

class UserController extends Controller {

    public function Profile(Request $request) {
        $user = auth()->user();

//        try {

        $user = Register::select(
                        'register.*', 'country.country_name as country_name', 'state.state_name as state_name', 'city.city_name as city_name', 'categories.name as main_category_name'
                )
                ->leftJoin('categories', 'register.categories_id', '=', 'categories.id')
                ->join('country', 'register.country_id', '=', 'country.id')
                ->join('state', 'register.state_id', '=', 'state.id')
                ->join('city', 'register.city_id', '=', 'city.id')
                ->withAvg('reviewSeller as review_avg_rating', 'rating')
                ->withCount('reviewSeller as review_count')
                ->where('register.id', $request->user_id)
                ->first();

//                $user = Register::select('register.*', 'country.country_name as country_name', 'state.state_name as state_name', 'city.city_name as city_name', 'categories.name as main_category_name')
//                        ->leftjoin('categories', 'register.categories_id', '=', 'categories.id')
//                        ->join('country', 'register.country_id', '=', 'country.id')
//                        ->join('state', 'register.state_id', '=', 'state.id')
//                        ->join('city', 'register.city_id', '=', 'city.id')
//                        ->withAvg(['review_seller as review_avg_rating' => function ($query) {
//                            $query->where('type', '=', "seller");
//                        }], 'rating')->withCount(['review_seller as review_count' => function ($query) {
//                            $query->where('type', '=', "seller");
//                        }])
//                        ->where('register.id', $request->user_id);
//                $user = $user->first();
//            }

        $role_data = array();
        $catalogue_data = array();
        $shorts_data = array();
        $seller_data = array();
        $business_data = array();
        $business_shop_images_data = array();
        $business_shop_video_data = array();
        $business_company_pdf_data = array();
        $review_data = array();
        if (isset($user)) {
            if (isset($request->relevant_id) && $request->type != "") {
                $review_data = Review::select('review.*', 'register.role_id', 'register.name as user_name', Review::raw("
            CASE 
                WHEN register.image IS NOT NULL AND register.image != '' 
                THEN CONCAT('https://soundwale.in/public/storage/app/register/', register.image)
                ELSE CONCAT('https://soundwale.in/public/admin-asset/images/profile_default_image.png') 
            END AS user_profile_url
        "))
                        ->leftJoin('seller_details', function ($join) use ($user) {
                            $join->on('review.relevant_id', '=', 'seller_details.id')
                            ->where('review.type', '=', 'seller')
                            ->where('seller_details.user_id', '=', $user->id);
                        })
                        ->leftJoin('buyer_requirment', function ($join) use ($user) {
                            $join->on('review.relevant_id', '=', 'buyer_requirment.id')
                            ->where('review.type', '=', 'buyer')
                            ->where('buyer_requirment.user_id', '=', $user->id);
                        })
                        ->join('register', 'review.user_id', '=', 'register.id')
                        ->where('review.user_id', '!=', $user->id)
                        ->where('review.type', '!=', 'directory')
                        ->get();
                $usersWithRoles = $review_data->map(function ($review_data) {
                    $roleIds = explode(',', $review_data->role_id);
                    $roles1 = Role::whereIn('id', $roleIds)
                            ->get()
                            ->toArray();
                    $review_data->roles = $roles1;
                });
            }

            $role_data = Role::select('*')->whereIn('id', explode(',', $user->role_id))->get();
            $catalogue_data = Catalogue::select('catalogue.*', Catalogue::raw("IF(catalogue_likes.status = 1, 1, 0) as is_likes"))
                    ->leftJoin('catalogue_likes', function($join) use ($user) {
                        $join->on('catalogue.id', '=', 'catalogue_likes.catalogue_id')
                        ->where('catalogue_likes.user_id', '=', $user->id);
                    })
//                    ->leftjoin('catalogue_likes', 'catalogue.user_id', '=', 'catalogue_likes.user_id')
                    ->where('catalogue.user_id', '=', $user->id)
                    ->orderBy('catalogue.id', 'desc')
                    ->get();
            $shorts_data = UserVideo::select('*')->where('user_id', $user->id)->get();
//            $business_data = Business::select('*')->where('user_id', $user->id)->get();

            $business_data = Business::select('*')->where('user_id', $user->id)->get();
            $business_data = $business_data->map(function ($business_data) {
                // Explode comma-separated IDs
                $categoryIds = explode(',', $business_data->category_id);
                $subCategoryIds = explode(',', $business_data->sub_category_id);

                // Fetch categories with id and name
                $categories = Category::whereIn('id', $categoryIds)->get(['id', 'name']);
                $subCategories = SubCategory::whereIn('id', $subCategoryIds)->get(['id', 'name']);

                // Map to desired format
                $categoryNames = $categories->map(function ($category) {
                    return [
                        'id' => $category->id,
                        'value' => $category->name,
                    ];
                });

                $subCategoryNames = $subCategories->map(function ($subCategory) {
                    return [
                        'id' => $subCategory->id,
                        'value' => $subCategory->name,
                    ];
                });

                // Add new keys
                $business_data['category_names'] = $categoryNames;
                $business_data['sub_category_names'] = $subCategoryNames;

                return $business_data;
            });
//            $business_data = $business_data->map(function ($business_data) {
//                // Explode comma-separated IDs
//                $categoryIds = explode(',', $business_data->category_id);
//                $subCategoryIds = explode(',', $business_data->sub_category_id);
//
//                // Fetch category names
//                $categoryNames = Category::whereIn('id', $categoryIds)->pluck('name')->toArray();
//                $subCategoryNames = SubCategory::whereIn('id', $subCategoryIds)->pluck('name')->toArray();
//
//                // Add new keys
//                $business_data['category_names'] = implode(',', $categoryNames);
//                $business_data['sub_category_names'] = implode(',', $subCategoryNames);
//
//                return $business_data;
//            });

            $business_shop_images_data = BusinessImages::select('*')->where('user_id', $user->id)->get();
            $business_shop_video_data = BusinessVideo::select('*')->where('user_id', $user->id)->get();
            $business_company_pdf_data = BusinessCompany::select('*')->where('user_id', $user->id)->get();

            $seller_data = SellerDetails::select(SellerDetails::raw("IF(seller_details_likes.status = 1, 1, 0) as is_likes"), 'seller_details.id', 'seller_details.other_details', 'seller_details.user_id', 'register.name as user_name', 'seller_details.country_id', 'country.country_name as country_name', 'seller_details.state_id', 'state.state_name as state_name', 'seller_details.city_id', 'city.city_name as city_name', 'seller_details.requirment_id', 'requirment.name as requirment_name', 'seller_details.categories_id', 'categories.name as main_category_name', 'seller_details.category_id', 'category.name as category_name', 'seller_details.sub_category_id', 'sub_category.name as sub_category_name', 'seller_details.price', 'seller_details.description', 'seller_details.created_at')
                    ->join('register', 'seller_details.user_id', '=', 'register.id')
                    ->join('country', 'seller_details.country_id', '=', 'country.id')
                    ->join('state', 'seller_details.state_id', '=', 'state.id')
                    ->join('city', 'seller_details.city_id', '=', 'city.id')
                    ->join('requirment', 'seller_details.requirment_id', '=', 'requirment.id')
                    ->join('categories', 'seller_details.categories_id', '=', 'categories.id')
                    ->join('category', 'seller_details.category_id', '=', 'category.id')
                    ->leftjoin('sub_category', 'seller_details.sub_category_id', '=', 'sub_category.id')
                    ->leftjoin('seller_details_likes', 'seller_details.id', '=', 'seller_details_likes.seller_details_id')
                    ->withAvg(['review' => function ($query) {
                            $query->where('type', 'seller');
                        }], 'rating')->withCount('review')
                    ->where('seller_details.user_id', $user->id)
                    ->get();
            $usersWithRoles = $seller_data->map(function ($seller_data) {
                $images = SellerDetailsImages::where('seller_details_id', $seller_data->id)
                        ->get()
                        ->toArray();
                $seller_data->images = $images;

                return $seller_data;
            });
        }
        $user['roles'] = $role_data;
        $user['catalogue_data'] = $catalogue_data;
        $user['shorts_data'] = $shorts_data;
        $user['seller_data'] = $seller_data;
        $user['business_data'] = $business_data;
        $user['business_company_pdf_data'] = $business_company_pdf_data;
        $user['business_shop_images_data'] = $business_shop_images_data;
        $user['business_shop_video_data'] = $business_shop_video_data;
        $user['review_data'] = $review_data;

//            $user = Register::select('register.*')
//                    ->join('country', 'register.country_id', '=', 'country.id')
//                    ->join('state', 'register.state_id', '=', 'state.id')
//                    ->join('city', 'register.city_id', '=', 'city.id')
//                    ->where('register.id', '=', $request->id)
//                    ->first();
        if (!$user) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        } else {
            return response()->json(['status' => true, 'user' => $user], 200);
        }
//        } catch (\Throwable $th) {
//            \Log::error(request()->path() . "\n" . $th->getMessage());
//            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
//        }
    }

    public function hide_profile_in_directory(Request $request) {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
                    'status' => 'required',
                        ], [
                    'status.required' => 'The status field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {
            $register = Register::where('id', $user->id)->first();
            $register->hide_profile_in_directory = $request->status;
            $register->save();

            return response()->json(['status' => true, 'message' => 'Status updated successfully.'], 200);
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

}
