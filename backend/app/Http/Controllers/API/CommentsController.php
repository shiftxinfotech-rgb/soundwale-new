<?php

namespace App\Http\Controllers\API;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\BuyerRequirmentComments;
use App\Models\SellerDetailsComments;
use App\Models\HomeListComments;
use App\Models\CommentsLike;
use App\Models\LikesLike;
use App\Models\ImageLikesLike;
use App\Models\ImageCommentsLike;
use App\Models\ImageComments;
use App\Models\MailConfiguration;
use App\Models\Notifications;
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

class CommentsController extends Controller {

    public function add_update_comments(Request $request) {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
                    'type' => 'required',
                    'type_id' => 'required',
                    'message' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        $id = $request->id ?? null;

        if (isset($request->is_image) && $request->is_image == 1) {

            $data = [
                'user_id' => isset($user->id) ? $user->id : '',
                'parent_id' => isset($request->parent_id) ? $request->parent_id : 0,
                'type_id' => isset($request->type_id) ? $request->type_id : '',
                'type' => isset($request->type) ? $request->type : '',
                'message' => isset($request->message) ? $request->message : null,
                'status' => 1
            ];
            if ($id) {
                $list = ImageComments::find($id);
                if (!$list) {
                    return response()->json(['message' => 'Record not found for update.', 'status' => false], 404);
                }
                $list->fill($data);
                $list->save();
                $list_inserted_Id = $list->id;
            } else {
                // Insert new
                $list = new ImageComments($data);
                $list->save();
                $list_inserted_Id = $list->id;
            }
            $parent_id = isset($request->parent_id) ? $request->parent_id : $list_inserted_Id;
            $type_id = isset($request->type_id) ? $request->type_id : 0;



            $query = ImageComments::select('image_comments.*', 'register.name as user_name', 'register.image as user_image', \DB::raw('(SELECT COUNT(*) FROM image_comments_likes WHERE image_comments_likes.comments_id = image_comments.id AND image_comments_likes.status = 1 AND image_comments_likes.type = "' . $request->type . '") as like_count'))
                    ->join('register', 'image_comments.user_id', '=', 'register.id')
                    ->orWhere('image_comments.type', '=', $request->type)
                    ->orWhere('image_comments.parent_id', '=', $parent_id)
                    ->orWhere('image_comments.type_id', '=', $parent_id);
            $data = $query->orderBy('image_comments.id', 'desc')->get();
            $data->transform(function ($item) use ($user, $request) {
                if ($item->user_image) {
                    $item->user_image = asset('storage/app/register/' . $item->user_image);
                } else {
                    $item->user_image = asset('admin-asset/images/profile_default_image.png');
                }
                if ($item->images && count($item->images)) {
                    
                }
                // Check if current user liked this comment
                $isLiked = \DB::table('image_comments_likes')
                        ->where('comments_id', $item->id)
                        ->where('user_id', $user->id)
                        ->where('type', $request->type)
                        ->where('status', 1)
                        ->exists();
                $item->is_like = $isLiked ? 1 : 0;
                return $item;
            });
            $grouped = $data->groupBy('parent_id');
            $parentComments = $grouped[0] ?? collect();
            $data = $parentComments->map(function ($parent) use ($grouped) {
                // Add replies to each parent
                $parent->replies = $grouped[$parent->id] ?? collect();
                return $parent;
            });

            $message = $id ? 'Updated successfully' : 'Added successfully';
            return response()->json(['message' => $message, 'status' => true, 'data' => $data], 200);

            die;
        }

        if ($request->type == "home") {
            $data = [
                'user_id' => isset($user->id) ? $user->id : '',
                'parent_id' => isset($request->parent_id) ? $request->parent_id : 0,
                'home_list_id' => isset($request->type_id) ? $request->type_id : '',
                'message' => isset($request->message) ? $request->message : null,
                'status' => 1
            ];
            if ($id) {
                $homelist = HomeListComments::find($id);
                if (!$homelist) {
                    return response()->json(['message' => 'Record not found for update.', 'status' => false], 404);
                }
                $homelist->fill($data);
                $homelist->save();
                $homelist_inserted_Id = $homelist->id;
            } else {
                // Insert new
                $homelist = new HomeListComments($data);
                $homelist->save();
                $homelist_inserted_Id = $homelist->id;
            }
            $parent_id = isset($request->parent_id) ? $request->parent_id : $homelist_inserted_Id;
        } else if ($request->type == "buyer") {
            $data = [
                'user_id' => isset($user->id) ? $user->id : '',
                'parent_id' => isset($request->parent_id) ? $request->parent_id : 0,
                'buyer_requirment_id' => isset($request->type_id) ? $request->type_id : '',
                'message' => isset($request->message) ? $request->message : null,
                'status' => 1
            ];
            if ($id) {
                $buyerlist = BuyerRequirmentComments::find($id);
                if (!$buyerlist) {
                    return response()->json(['message' => 'Record not found for update.', 'status' => false], 404);
                }
                $buyerlist->fill($data);
                $buyerlist->save();
            } else {
                // Insert new
                $buyerlist = new BuyerRequirmentComments($data);
                $buyerlist->save();
            }
            $parent_id = isset($request->parent_id) ? $request->parent_id : $buyerlist->id;
        } else if ($request->type == "seller") {
            $data = [
                'user_id' => isset($user->id) ? $user->id : '',
                'parent_id' => isset($request->parent_id) ? $request->parent_id : 0,
                'seller_details_id' => isset($request->type_id) ? $request->type_id : '',
                'message' => isset($request->message) ? $request->message : null,
                'status' => 1
            ];
            if ($id) {
                $sellerlist = SellerDetailsComments::find($id);
                if (!$sellerlist) {
                    return response()->json(['message' => 'Record not found for update.', 'status' => false], 404);
                }
                $sellerlist->fill($data);
                $sellerlist->save();
            } else {
                // Insert new
                $sellerlist = new SellerDetailsComments($data);
                $sellerlist->save();
            }
            $parent_id = isset($request->parent_id) ? $request->parent_id : $sellerlist->id;
        }
        $type_id = isset($request->type_id) ? $request->type_id : 0;

        if ($request->type == "home") {

            $query = HomeListComments::select('home_list_comments.*', 'register.name as user_name', 'register.image as user_image', \DB::raw('(SELECT COUNT(*) FROM comments_likes WHERE comments_likes.comments_id = home_list_comments.id AND comments_likes.status = 1 AND comments_likes.type = "home") as like_count'))
                    ->join('register', 'home_list_comments.user_id', '=', 'register.id')
                    ->orWhere('home_list_comments.parent_id', '=', $parent_id)
                    ->orWhere('home_list_comments.id', '=', $parent_id);
            $data = $query->orderBy('home_list_comments.id', 'desc')->get();
            $data->transform(function ($item) use ($user) {
                if ($item->user_image) {
                    $item->user_image = asset('storage/app/register/' . $item->user_image);
                } else {
                    $item->user_image = asset('admin-asset/images/profile_default_image.png');
                }
                if ($item->images && count($item->images)) {
                    
                }
                // Check if current user liked this comment
                $isLiked = \DB::table('comments_likes')
                        ->where('comments_id', $item->id)
                        ->where('user_id', $user->id)
                        ->where('type', 'home')
                        ->where('status', 1)
                        ->exists();
                $item->is_like = $isLiked ? 1 : 0;
                return $item;
            });
            $grouped = $data->groupBy('parent_id');
            $parentComments = $grouped[0] ?? collect();
            $data = $parentComments->map(function ($parent) use ($grouped) {
                // Add replies to each parent
                $parent->replies = $grouped[$parent->id] ?? collect();
                return $parent;
            });
        } else if ($request->type == "buyer") {
            $query = BuyerRequirmentComments::select('buyer_requirment_comments.*', 'register.name as user_name', 'register.image as user_image', \DB::raw('(SELECT COUNT(*) FROM comments_likes WHERE comments_likes.comments_id = buyer_requirment_comments.id AND comments_likes.status = 1 AND comments_likes.type = "buyer") as like_count'))
                    ->join('register', 'buyer_requirment_comments.user_id', '=', 'register.id')
                    ->orWhere('buyer_requirment_comments.parent_id', '=', $parent_id)
                    ->orWhere('buyer_requirment_comments.id', '=', $parent_id);
            $data = $query->orderBy('buyer_requirment_comments.id', 'desc')->get();
            $data->transform(function ($item) use ($user) {
                if ($item->user_image) {
                    $item->user_image = asset('storage/app/register/' . $item->user_image);
                } else {
                    $item->user_image = asset('admin-asset/images/profile_default_image.png');
                }
                if ($item->images && count($item->images)) {
                    
                }
                // Check if current user liked this comment
                $isLiked = \DB::table('comments_likes')
                        ->where('comments_id', $item->id)
                        ->where('user_id', $user->id)
                        ->where('type', 'buyer')
                        ->where('status', 1)
                        ->exists();
                $item->is_like = $isLiked ? 1 : 0;
                return $item;
            });
            $grouped = $data->groupBy('parent_id');
            $parentComments = $grouped[0] ?? collect();
            $data = $parentComments->map(function ($parent) use ($grouped) {
                // Add replies to each parent
                $parent->replies = $grouped[$parent->id] ?? collect();
                return $parent;
            });
        } else if ($request->type == "seller") {
            $query = SellerDetailsComments::select('seller_details_comments.*', 'register.name as user_name', 'register.image as user_image', \DB::raw('(SELECT COUNT(*) FROM comments_likes WHERE comments_likes.comments_id = seller_details_comments.id AND comments_likes.status = 1 AND comments_likes.type = "seller") as like_count'))
                    ->join('register', 'seller_details_comments.user_id', '=', 'register.id')
                    ->orWhere('seller_details_comments.parent_id', '=', $parent_id)
                    ->orWhere('seller_details_comments.id', '=', $parent_id);
            $data = $query->orderBy('seller_details_comments.id', 'desc')->get();
            $data->transform(function ($item) use ($user) {
                if ($item->user_image) {
                    $item->user_image = asset('storage/app/register/' . $item->user_image);
                } else {
                    $item->user_image = asset('admin-asset/images/profile_default_image.png');
                }
                if ($item->images && count($item->images)) {
                    
                }
                // Check if current user liked this comment
                $isLiked = \DB::table('comments_likes')
                        ->where('comments_id', $item->id)
                        ->where('user_id', $user->id)
                        ->where('type', 'seller')
                        ->where('status', 1)
                        ->exists();
                $item->is_like = $isLiked ? 1 : 0;
                return $item;
            });
            $grouped = $data->groupBy('parent_id');
            $parentComments = $grouped[0] ?? collect();
            $data = $parentComments->map(function ($parent) use ($grouped) {
                // Add replies to each parent
                $parent->replies = $grouped[$parent->id] ?? collect();
                return $parent;
            });
        }

        $message = $id ? 'Updated successfully' : 'Added successfully';
        return response()->json(['message' => $message, 'status' => true, 'data' => $data], 200);
    }

    public function delete_comments(Request $request) {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
                    'type' => 'required',
                    'type_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        if (isset($request->is_image) && $request->is_image == 1) {

            $obj = ImageComments::where('id', $request->type_id);
            if ($obj) {
                $delete = $obj->delete();
                $obj1 = ImageComments::where('parent_id', $request->type_id);
                if ($obj1) {
                    $delete = $obj1->delete();
                }
            }

            return response()->json(['status' => true, 'message' => 'Removed successfully'], 200);
            die;
        }

        if ($request->type == "home") {
            $obj = HomeListComments::where('id', $request->type_id);
            if ($obj) {
                $delete = $obj->delete();
                $obj1 = HomeListComments::where('parent_id', $request->type_id);
                if ($obj1) {
                    $delete = $obj1->delete();
                }
            }
        } else if ($request->type == "buyer") {
            $obj = BuyerRequirmentComments::where('id', $request->type_id);
            if ($obj) {
                $delete = $obj->delete();
                $obj1 = BuyerRequirmentComments::where('parent_id', $request->type_id);
                if ($obj1) {
                    $delete = $obj1->delete();
                }
            }
        } else if ($request->type == "seller") {
            $obj = SellerDetailsComments::where('id', $request->type_id);
            if ($obj) {
                $delete = $obj->delete();
                $obj1 = SellerDetailsComments::where('parent_id', $request->type_id);
                if ($obj1) {
                    $delete = $obj1->delete();
                }
            }
        } else {
            return response()->json(['status' => false, 'message' => 'Invalid type'], 404);
        }

        return response()->json(['status' => true, 'message' => 'Removed successfully'], 200);
    }

    public function get_comments(Request $request) {
        $user = Auth::user();
        $validator = Validator::make($request->all(), [
                    'type' => 'required',
                    'type_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {
            $perPage = (int) $request->get('limit', config('app.API_PER_PAGE'));
            $page = (int) $request->get('page', 1);
            $offset = ($page - 1) * $perPage;

            if (isset($request->is_image) && $request->is_image == 1) {

                $query = ImageComments::select('image_comments.*', 'register.name as user_name', 'register.image as user_image', \DB::raw('(SELECT COUNT(*) FROM image_comments_likes WHERE image_comments_likes.comments_id = image_comments.id AND image_comments_likes.status = 1 AND image_comments_likes.type = "' . $request->type . '") as like_count'))
                        ->join('register', 'image_comments.user_id', '=', 'register.id')
                        ->where('image_comments.type', '=', $request->type)
                        ->where('image_comments.type_id', '=', $request->type_id);
                $data = $query->orderBy('image_comments.id', 'desc')->get();
                $data->transform(function ($item) use ($user, $request) {
                    if ($item->user_image) {
                        $item->user_image = asset('storage/app/register/' . $item->user_image);
                    } else {
                        $item->user_image = asset('admin-asset/images/profile_default_image.png');
                    }
                    if ($item->images && count($item->images)) {
                        
                    }
                    // Check if current user liked this comment
                    $isLiked = \DB::table('image_comments_likes')
                            ->where('comments_id', $item->id)
                            ->where('user_id', $user->id)
                            ->where('type', $request->type)
                            ->where('status', 1)
                            ->exists();
                    $item->is_like = $isLiked ? 1 : 0;
                    return $item;
                });
                $grouped = $data->groupBy('parent_id');
                $parentComments = $grouped[0] ?? collect();
                $data = $parentComments->map(function ($parent) use ($grouped) {
                    // Add replies to each parent
                    $parent->replies = $grouped[$parent->id] ?? collect();
                    return $parent;
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

                die;
            }

            if ($request->type == "home") {
                $query = HomeListComments::select('home_list_comments.*', 'register.name as user_name', 'register.image as user_image', \DB::raw('(SELECT COUNT(*) FROM comments_likes WHERE comments_likes.comments_id = home_list_comments.id AND comments_likes.status = 1 AND comments_likes.type = "home") as like_count'))
                        ->join('register', 'home_list_comments.user_id', '=', 'register.id')
                        ->where('home_list_comments.home_list_id', '=', $request->type_id);
                $data = $query->orderBy('home_list_comments.id', 'desc')->get();
                $data->transform(function ($item) use ($user) {
                    if ($item->user_image) {
                        $item->user_image = asset('storage/app/register/' . $item->user_image);
                    } else {
                        $item->user_image = asset('admin-asset/images/profile_default_image.png');
                    }
                    if ($item->images && count($item->images)) {
                        
                    }
                    // Check if current user liked this comment
                    $isLiked = \DB::table('comments_likes')
                            ->where('comments_id', $item->id)
                            ->where('user_id', $user->id)
                            ->where('type', 'home')
                            ->where('status', 1)
                            ->exists();
                    $item->is_like = $isLiked ? 1 : 0;
                    return $item;
                });
                $grouped = $data->groupBy('parent_id');
                $parentComments = $grouped[0] ?? collect();
                $data = $parentComments->map(function ($parent) use ($grouped) {
                    // Add replies to each parent
                    $parent->replies = $grouped[$parent->id] ?? collect();
                    return $parent;
                });
            } else if ($request->type == "buyer") {
                $query = BuyerRequirmentComments::select('buyer_requirment_comments.*', 'register.name as user_name', 'register.image as user_image', \DB::raw('(SELECT COUNT(*) FROM comments_likes WHERE comments_likes.comments_id = buyer_requirment_comments.id AND comments_likes.status = 1 AND comments_likes.type = "buyer") as like_count'))
                        ->join('register', 'buyer_requirment_comments.user_id', '=', 'register.id')
                        ->where('buyer_requirment_comments.buyer_requirment_id', '=', $request->type_id);
                $data = $query->orderBy('buyer_requirment_comments.id', 'desc')->get();
                $data->transform(function ($item) use ($user) {
                    if ($item->user_image) {
                        $item->user_image = asset('storage/app/register/' . $item->user_image);
                    } else {
                        $item->user_image = asset('admin-asset/images/profile_default_image.png');
                    }
                    if ($item->images && count($item->images)) {
                        
                    }
                    // Check if current user liked this comment
                    $isLiked = \DB::table('comments_likes')
                            ->where('comments_id', $item->id)
                            ->where('user_id', $user->id)
                            ->where('type', 'buyer')
                            ->where('status', 1)
                            ->exists();
                    $item->is_like = $isLiked ? 1 : 0;
                    return $item;
                });
                $grouped = $data->groupBy('parent_id');
                $parentComments = $grouped[0] ?? collect();
                $data = $parentComments->map(function ($parent) use ($grouped) {
                    // Add replies to each parent
                    $parent->replies = $grouped[$parent->id] ?? collect();
                    return $parent;
                });
            } else if ($request->type == "seller") {
                $query = SellerDetailsComments::select('seller_details_comments.*', 'register.name as user_name', 'register.image as user_image', \DB::raw('(SELECT COUNT(*) FROM comments_likes WHERE comments_likes.comments_id = seller_details_comments.id AND comments_likes.status = 1 AND comments_likes.type = "seller") as like_count'))
                        ->join('register', 'seller_details_comments.user_id', '=', 'register.id')
                        ->where('seller_details_comments.seller_details_id', '=', $request->type_id);
                $data = $query->orderBy('seller_details_comments.id', 'desc')->get();
                $data->transform(function ($item) use ($user) {
                    if ($item->user_image) {
                        $item->user_image = asset('storage/app/register/' . $item->user_image);
                    } else {
                        $item->user_image = asset('admin-asset/images/profile_default_image.png');
                    }
                    if ($item->images && count($item->images)) {
                        
                    }
                    // Check if current user liked this comment
                    $isLiked = \DB::table('comments_likes')
                            ->where('comments_id', $item->id)
                            ->where('user_id', $user->id)
                            ->where('type', 'seller')
                            ->where('status', 1)
                            ->exists();
                    $item->is_like = $isLiked ? 1 : 0;
                    return $item;
                });
                $grouped = $data->groupBy('parent_id');
                $parentComments = $grouped[0] ?? collect();
                $data = $parentComments->map(function ($parent) use ($grouped) {
                    // Add replies to each parent
                    $parent->replies = $grouped[$parent->id] ?? collect();
                    return $parent;
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

    public function like_unlike_comments(Request $request) {

        $user = auth()->user();

        $validator = Validator::make($request->all(), [
                    'type' => 'required',
                    'type_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }
        try {

            if (isset($request->is_image) && $request->is_image == 1) {

                $data = $request->only('user_id', 'comments_id', 'type', 'status');
                $data['status'] = 1;
                $data['user_id'] = $user->id;
                $data['comments_id'] = $request->type_id;
                $data['type'] = $request->type;
                $exists = ImageCommentsLike::where('user_id', $user->id)->where('comments_id', $request->type_id)->where('type', $request->type)->exists();
                if ($exists) {
                    $obj = ImageCommentsLike::where('user_id', $user->id)->where('comments_id', $request->type_id)->where('type', $request->type);
                    if ($obj) {
                        $delete = $obj->delete();
                    }
                    return response()->json([
                                'status' => true,
                                'message' => 'Like removed successfully'
                                    ], 200);
                } else {
                    $dataa = new ImageCommentsLike($data);
                    if ($dataa->save()) {
                        return response()->json([
                                    'status' => true,
                                    'message' => 'Like added successfully'
                                        ], 200);
                    }
                }

                die;
            }

            $data = $request->only('user_id', 'comments_id', 'type', 'status');
            $data['status'] = 1;
            $data['user_id'] = $user->id;
            $data['comments_id'] = $request->type_id;
            $data['type'] = $request->type;
            $exists = CommentsLike::where('user_id', $user->id)->where('comments_id', $request->type_id)->where('type', $request->type)->exists();
            if ($exists) {
                $obj = CommentsLike::where('user_id', $user->id)->where('comments_id', $request->type_id)->where('type', $request->type);
                if ($obj) {
                    $delete = $obj->delete();
                }
                return response()->json([
                            'status' => true,
                            'message' => 'Like removed successfully'
                                ], 200);
            } else {
                $dataa = new CommentsLike($data);
                if ($dataa->save()) {
                    return response()->json([
                                'status' => true,
                                'message' => 'Like added successfully'
                                    ], 200);
                }
            }
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function like_unlike_likes(Request $request) {

        $user = auth()->user();

        $validator = Validator::make($request->all(), [
                    'type' => 'required',
                    'type_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }
        try {

            if (isset($request->is_image) && $request->is_image == 1) {

                $data = $request->only('user_id', 'type_id', 'type', 'status');
                $data['status'] = 1;
                $data['user_id'] = $user->id;
                $data['type_id'] = $request->type_id;
                $data['type'] = $request->type;
                $exists = ImageLikesLike::where('user_id', $user->id)->where('type_id', $request->type_id)->where('type', $request->type)->exists();
                if ($exists) {
                    $obj = ImageLikesLike::where('user_id', $user->id)->where('type_id', $request->type_id)->where('type', $request->type);
                    if ($obj) {
                        $delete = $obj->delete();
                    }
                    return response()->json(['status' => true, 'message' => 'Like removed successfully'], 200);
                } else {
                    $dataa = new ImageLikesLike($data);
                    if ($dataa->save()) {
                        return response()->json(['status' => true, 'message' => 'Like added successfully'], 200);
                    }
                }
                die;
            }

            $data = $request->only('user_id', 'type_id', 'type', 'status');
            $data['status'] = 1;
            $data['user_id'] = $user->id;
            $data['type_id'] = $request->type_id;
            $data['type'] = $request->type;
            $exists = LikesLike::where('user_id', $user->id)->where('type_id', $request->type_id)->where('type', $request->type)->exists();
            if ($exists) {
                $obj = LikesLike::where('user_id', $user->id)->where('type_id', $request->type_id)->where('type', $request->type);
                if ($obj) {
                    $delete = $obj->delete();
                }
                return response()->json(['status' => true, 'message' => 'Like removed successfully'], 200);
            } else {
                $dataa = new LikesLike($data);
                if ($dataa->save()) {
                    return response()->json(['status' => true, 'message' => 'Like added successfully'], 200);
                }
            }
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

}
