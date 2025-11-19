<?php

namespace App\Http\Controllers\API;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\ContactUs;
use App\Models\HomeList;
use App\Models\States;
use App\Models\Manufacturer;
use App\Models\SellerDetails;
use App\Models\SellerDetailsImages;
use App\Models\SellerDetailsLike;
use App\Models\BuyerRequirment;
use App\Models\ImageComments;
use App\Models\BuyerRequirmentImages;
use App\Models\BuyerRequirmentLike;
use App\Models\Catalogue;
use App\Models\CatalogueLike;
use App\Models\Role;
use App\Models\Admin;
use App\Models\MailConfiguration;
use App\Models\Register;
use App\Models\ImageLikesLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactUsMail;
use App\Mail\ContactUsMailAdmin;

class FavController extends Controller {

    public function get_by_type(Request $request) {
        $user = Auth::user();
        $validator = Validator::make($request->all(), [
                    'type' => 'required',
                        ], [
                    'type.required' => 'The type field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {

            $perPage = (int) $request->get('limit', config('app.API_PER_PAGE'));
            $page = (int) $request->get('page', 1);
            $offset = ($page - 1) * $perPage;
            if ($request->type == "home") {
                $query = HomeList::select('home_list.*', HomeList::raw("IF(home_list_likes.status = 1, 1, 0) as is_like"), HomeList::raw("IF(like_likes.status = 1, 1, 0) as is_user_liked"), 'manufacturer.name as manufacturer_name', 'register.name as user_name', 'register.personal_name as user_personal_name', 'role.name as user_role_name', 'register.image as user_image', 'role.slug as user_role_slug', 'register.code as user_code', 'register.mobile_number as user_mobile_number', 'register.marketing_code as user_marketing_code', 'register.marketing_mobile_number as user_marketing_mobile_number')
                        ->join('register', 'home_list.user_id', '=', 'register.id')
                        ->join('role', 'register.role_id', '=', 'role.id')
                        ->leftjoin('manufacturer', 'home_list.manufacturer_id', '=', 'manufacturer.id')
                        ->with('images')
                        ->withCount(['total_likes as total_likes' => function ($query) {
                                $query->where('type', 'home');
                            }])
                        ->withCount(['comments as total_comments' => function ($query) {
//                $query->where('status', 1); // Only count active likes
                            }])
                        ->leftJoin('home_list_likes', function ($join) use ($user) {
                            $join->on('home_list.id', '=', 'home_list_likes.home_list_id')
                            ->where('home_list_likes.user_id', '=', $user->id);
                        })
                        ->leftJoin('like_likes', function ($join) use ($user) {
                            $join->on('home_list.id', '=', 'like_likes.type_id')
                            ->where('like_likes.user_id', '=', $user->id)
                            ->where('like_likes.type', '=', "home");
                        })
                        ->where('home_list_likes.user_id', '=', $user->id);
                $data = $query->orderBy('home_list.id', 'desc')->get();
                $data->transform(function ($item) {
                    if ($item->user_image) {
                        $item->user_image = asset('storage/app/register/' . $item->user_image);
                    } else {
                        $item->user_image = asset('admin-asset/images/profile_default_image.png');
                    }
                    if ($item->images && count($item->images)) {
                        $item->images = $item->images->map(function ($image) {
                            $image->total_likes = ImageLikesLike::where('type', 'home')
                                    ->where('type_id', $image->id)
                                    ->count();
                            $image->total_comments = ImageComments::where('type', 'home')
                            ->where('type_id', $image->id)
                            ->count();
                            $image->is_like = ImageLikesLike::where('type', 'home')
                                            ->where('type_id', $image->id)
                                            ->where('user_id', auth()->id()) // Using auth()->id() here
                                            ->exists() ? 1 : 0;

                            return $image;
                        });
                    }
                    $state_Ids = explode(',', $item->state_id);
                    $statess = States::whereIn('id', $state_Ids)->get(['id', 'state_name']);
                    $statessNames = $statess->map(function ($statess1) {
                        return [
                            'id' => $statess1->id,
                            'value' => $statess1->state_name,
                        ];
                    });
                    $item['states'] = $statessNames;
                    $manufacturer_Ids = explode(',', $item->manufacturer_id);
                    $manufacturer = Manufacturer::whereIn('id', $manufacturer_Ids)->get(['id', 'name']);
                    $manufacturerNames = $manufacturer->map(function ($manufacturer1) {
                        return [
                            'id' => $manufacturer1->id,
                            'value' => $manufacturer1->name,
                        ];
                    });
                    $item['manufacturer'] = $manufacturerNames;
                    return $item;
                });
            } else if ($request->type == "buyer") {
                $query = BuyerRequirment::select('buyer_requirment.*', BuyerRequirment::raw("IF(buyer_requirment_likes.status = 1, 1, 0) as is_like"), BuyerRequirment::raw("IF(like_likes.status = 1, 1, 0) as is_user_liked"), 'manufacturer.name as manufacturer_name', 'category.name as product_name', 'register.name as user_name', 'register.personal_name as user_personal_name', 'role.name as user_role_name', 'register.image as user_image', 'role.slug as user_role_slug', 'register.code as user_code', 'register.mobile_number as user_mobile_number', 'register.marketing_code as user_marketing_code', 'register.marketing_mobile_number as user_marketing_mobile_number')
                        ->join('register', 'buyer_requirment.user_id', '=', 'register.id')
                        ->join('role', 'register.role_id', '=', 'role.id')
                        ->leftjoin('manufacturer', 'buyer_requirment.manufacturer_id', '=', 'manufacturer.id')
                        ->leftjoin('category', 'buyer_requirment.product_ids', '=', 'category.id')
                        ->with('images')
                        ->withCount(['total_likes as total_likes' => function ($query) {
                                $query->where('type', 'buyer');
                            }])
                        ->withCount(['comments as total_comments' => function ($query) {
//                $query->where('status', 1); // Only count active likes
                            }])
                        ->leftJoin('buyer_requirment_likes', function ($join) use ($user) {
                            $join->on('buyer_requirment.id', '=', 'buyer_requirment_likes.buyer_requirment_id')
                            ->where('buyer_requirment_likes.user_id', '=', $user->id);
                        })
                        ->leftJoin('like_likes', function ($join) use ($user) {
                            $join->on('buyer_requirment.id', '=', 'like_likes.type_id')
                            ->where('like_likes.user_id', '=', $user->id)
                            ->where('like_likes.type', '=', "buyer");
                        })
                        ->where('buyer_requirment_likes.user_id', '=', $user->id);
                $data = $query->orderBy('buyer_requirment.id', 'desc')->get();

                $data->transform(function ($item) {
                    if ($item->user_image) {
                        $item->user_image = asset('storage/app/register/' . $item->user_image);
                    } else {
                        $item->user_image = asset('admin-asset/images/profile_default_image.png');
                    }
                    if ($item->images && count($item->images)) {
                        $item->images = $item->images->map(function ($image) {
                            $image->total_likes = ImageLikesLike::where('type', 'buyer')
                                    ->where('type_id', $image->id)
                                    ->count();
                            $image->total_comments = ImageComments::where('type', 'buyer')
                            ->where('type_id', $image->id)
                            ->count();
                            $image->is_like = ImageLikesLike::where('type', 'buyer')
                                            ->where('type_id', $image->id)
                                            ->where('user_id', auth()->id()) // Using auth()->id() here
                                            ->exists() ? 1 : 0;

                            return $image;
                        });
                    }
                    $state_Ids = explode(',', $item->state_id);
                    $statess = States::whereIn('id', $state_Ids)->get(['id', 'state_name']);
                    $statessNames = $statess->map(function ($statess1) {
                        return [
                            'id' => $statess1->id,
                            'value' => $statess1->state_name,
                        ];
                    });
                    $item['states'] = $statessNames;
                    $manufacturer_Ids = explode(',', $item->manufacturer_id);
                    $manufacturer = Manufacturer::whereIn('id', $manufacturer_Ids)->get(['id', 'name']);
                    $manufacturerNames = $manufacturer->map(function ($manufacturer1) {
                        return [
                            'id' => $manufacturer1->id,
                            'value' => $manufacturer1->name,
                        ];
                    });
                    $item['manufacturer'] = $manufacturerNames;
                    return $item;
                });
            } else if ($request->type == "seller") {
                $query = SellerDetails::select('seller_details.*', SellerDetails::raw("IF(seller_details_likes.status = 1, 1, 0) as is_like"), SellerDetails::raw("IF(like_likes.status = 1, 1, 0) as is_user_liked"), 'manufacturer.name as manufacturer_name', 'category.name as product_name', 'register.name as user_name', 'register.personal_name as user_personal_name', 'role.name as user_role_name', 'register.image as user_image', 'role.slug as user_role_slug', 'register.code as user_code', 'register.mobile_number as user_mobile_number', 'register.marketing_code as user_marketing_code', 'register.marketing_mobile_number as user_marketing_mobile_number')
                        ->join('register', 'seller_details.user_id', '=', 'register.id')
                        ->join('role', 'register.role_id', '=', 'role.id')
                        ->leftjoin('manufacturer', 'seller_details.manufacturer_id', '=', 'manufacturer.id')
                        ->leftjoin('category', 'seller_details.product_ids', '=', 'category.id')
                        ->with('images')
                        ->withCount(['total_likes as total_likes' => function ($query) {
                                $query->where('type', 'seller');
                            }])
                        ->withCount(['comments as total_comments' => function ($query) {
//                $query->where('status', 1); // Only count active likes
                            }])
                        ->leftJoin('seller_details_likes', function ($join) use ($user) {
                            $join->on('seller_details.id', '=', 'seller_details_likes.seller_details_id')
                            ->where('seller_details_likes.user_id', '=', $user->id);
                        })
                        ->leftJoin('like_likes', function ($join) use ($user) {
                            $join->on('seller_details.id', '=', 'like_likes.type_id')
                            ->where('like_likes.user_id', '=', $user->id)
                            ->where('like_likes.type', '=', "seller");
                        })
                        ->where('seller_details_likes.user_id', '=', $user->id);
                $data = $query->orderBy('seller_details.id', 'desc')->get();

                $data->transform(function ($item) {
                    if ($item->user_image) {
                        $item->user_image = asset('storage/app/register/' . $item->user_image);
                    } else {
                        $item->user_image = asset('admin-asset/images/profile_default_image.png');
                    }
                    if ($item->images && count($item->images)) {
                        $item->images = $item->images->map(function ($image) {
                            $image->total_likes = ImageLikesLike::where('type', 'seller')
                                    ->where('type_id', $image->id)
                                    ->count();
                            $image->total_comments = ImageComments::where('type', 'seller')
                            ->where('type_id', $image->id)
                            ->count();
                            $image->is_like = ImageLikesLike::where('type', 'seller')
                                            ->where('type_id', $image->id)
                                            ->where('user_id', auth()->id()) // Using auth()->id() here
                                            ->exists() ? 1 : 0;

                            return $image;
                        });
                    }
                    $state_Ids = explode(',', $item->state_id);
                    $statess = States::whereIn('id', $state_Ids)->get(['id', 'state_name']);
                    $statessNames = $statess->map(function ($statess1) {
                        return [
                            'id' => $statess1->id,
                            'value' => $statess1->state_name,
                        ];
                    });
                    $item['states'] = $statessNames;
                    $manufacturer_Ids = explode(',', $item->manufacturer_id);
                    $manufacturer = Manufacturer::whereIn('id', $manufacturer_Ids)->get(['id', 'name']);
                    $manufacturerNames = $manufacturer->map(function ($manufacturer1) {
                        return [
                            'id' => $manufacturer1->id,
                            'value' => $manufacturer1->name,
                        ];
                    });
                    $item['manufacturer'] = $manufacturerNames;
                    return $item;
                });
            } else {
                return response()->json(['status' => false, 'message' => 'Invalid type'], 404);
            }

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

}
