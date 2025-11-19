<?php

namespace App\Http\Controllers\API;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\BuyerRequirmentComments;
use App\Models\SellerDetailsComments;
use App\Models\HomeListComments;
use App\Models\CommentsLike;
use App\Models\LikesLike;
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

        if ($request->type == "home") {
            $data = [
                'user_id' => isset($user->id) ? $user->id : '',
                'parent_id' => isset($request->parent_id) ? $request->parent_id : '',
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
        } else if ($request->type == "buyer") {
            $data = [
                'user_id' => isset($user->id) ? $user->id : '',
                'parent_id' => isset($request->parent_id) ? $request->parent_id : '',
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
        } else if ($request->type == "seller") {
            $data = [
                'user_id' => isset($user->id) ? $user->id : '',
                'parent_id' => isset($request->parent_id) ? $request->parent_id : '',
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
        }

        $message = $id ? 'Updated successfully' : 'Added successfully';
        return response()->json(['message' => $message, 'status' => true], 200);
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

        if ($request->type == "home") {
            $obj = HomeListComments::where('id', $request->type_id);
            if ($obj) {
                $delete = $obj->delete();
            }
        } else if ($request->type == "buyer") {
            $obj = BuyerRequirmentComments::where('id', $request->type_id);
            if ($obj) {
                $delete = $obj->delete();
            }
        } else if ($request->type == "seller") {
            $obj = SellerDetailsComments::where('id', $request->type_id);
            if ($obj) {
                $delete = $obj->delete();
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
            if ($request->type == "home") {
                $query = HomeListComments::select('home_list_comments.*', 'register.name as user_name', 'register.image as user_image', \DB::raw('(SELECT COUNT(*) FROM comments_likes WHERE comments_likes.comments_id = home_list_comments.id AND comments_likes.status = 1 AND comments_likes.type = "home") as like_count'))
                        ->join('register', 'home_list_comments.user_id', '=', 'register.id')
                        ->where('home_list_comments.home_list_id', '=', $request->type_id);
                $data = $query->orderBy('home_list_comments.id', 'desc')->get();
                $data->transform(function ($item) {
                    if ($item->user_image) {
                        $item->user_image = asset('storage/app/register/' . $item->user_image);
                    } else {
                        $item->user_image = "https://soundwale.in/demo/public/admin-asset/images/profile_default_image.png";
                    }
                    if ($item->images && count($item->images)) {
                        
                    }
                    $item->is_like = 0;
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
                $data->transform(function ($item) {
                    if ($item->user_image) {
                        $item->user_image = asset('storage/app/register/' . $item->user_image);
                    } else {
                        $item->user_image = "https://soundwale.in/demo/public/admin-asset/images/profile_default_image.png";
                    }
                    if ($item->images && count($item->images)) {
                        
                    }
                    $item->is_like = 0;
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
                $data->transform(function ($item) {
                    if ($item->user_image) {
                        $item->user_image = asset('storage/app/register/' . $item->user_image);
                    } else {
                        $item->user_image = "https://soundwale.in/demo/public/admin-asset/images/profile_default_image.png";
                    }
                    if ($item->images && count($item->images)) {
                        
                    }
                    $item->is_like = 0;
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
