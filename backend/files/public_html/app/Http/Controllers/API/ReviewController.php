<?php

namespace App\Http\Controllers\API;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Admin;
use App\Models\Register;
use App\Models\SellerDetails;
use App\Models\BuyerRequirment;
use App\Models\MailConfiguration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactUsMail;
use App\Mail\ContactUsMailAdmin;

class ReviewController extends Controller {

    public function get_by_user_id(Request $request) {
        $user = Auth::user();

        try {

            $data = Review::select('review.*', 'register.name as user_name')
                    ->join('register', 'review.user_id', '=', 'register.id')
                    ->where('review.user_id', '=', $user->id)
                    ->get();
            if ($data->isEmpty()) {
                return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
            } else {
                return response()->json(['status' => true, 'data' => $data], 200);
            }
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function ReviewAdd(Request $request) {
        $user = Auth::user();
        $validator = Validator::make($request->all(), [
                    'relevant_id' => 'required',
                    'rating' => 'required|integer|min:1|max:5',
                    'type' => 'required',
                        ], [
                    'relevant_id.required' => 'The relevant id field is required.',
                    'rating.required' => 'The rating field is required.',
                    'type.required' => 'The type field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {
            // Prepare data for saving and email
            $data = $request->only('category_id', 'user_id', 'relevant_id', 'rating', 'message', 'subject', 'type', 'status');
            $data['user_id'] = $user->id;
            $exists = Review::where('user_id', $user->id)->where('relevant_id', $request->relevant_id)->where('type', $request->type)->exists();
            if ($exists) {
                return response()->json([
                            'status' => false,
                            'message' => 'Review already added.'
                                ], 404);
            } else {
                $userReview = new Review($data);
                if ($request->type == "directory") {
                    $register_data = Register::select('name')->where('id', $user->id)->first();
                    if (!$register_data) {
                        return response()->json(['status' => false, 'message' => 'Relevant id not exist in our database.'], 404);
                    }
                } else if ($request->type == "seller") {
                    $seller_data = SellerDetails::select('user_id')->where('id', $request->relevant_id)->first();
                    if (!$seller_data) {
                        return response()->json(['status' => false, 'message' => 'Relevant id not exist in our database.'], 404);
                    }
                    $register_data = Register::select('name')->where('id', $seller_data->user_id)->first();
                    if (!$register_data) {
                        return response()->json(['status' => false, 'message' => 'invalid seller user'], 404);
                    }
                } else if ($request->type == "buyer") {
                    $buyer_data = BuyerRequirment::select('user_id')->where('id', $request->relevant_id)->first();
                    if (!$buyer_data) {
                        return response()->json(['status' => false, 'message' => 'Relevant id not exist in our database.'], 404);
                    }
                    $register_data = Register::select('name')->where('id', $buyer_data->user_id)->first();
                    if (!$register_data) {
                        return response()->json(['status' => false, 'message' => 'invalid buyer user'], 404);
                    }
                } else {
                    return response()->json(['status' => false, 'message' => 'wrong type'], 404);
                }
                if ($userReview->save()) {
                    $categories_id = NULL;
                    if ($request->type == "directory") {
                        $register_data = Register::select('name')->where('id', $user->id)->first();
                        $u_name = $register_data->name;

                        $notification_title = "New Rating Received";
                        $notification_body = "$u_name rated you [$request->rating]/5. ";
                        $notification_type = "add_review";
                        $notification_modules_type = "directory";
                        $notification_relation_id = $request->relevant_id;
                        $notification_user_id = $request->relevant_id;
                        $notification_token_user_id = $request->relevant_id;
                    } else if ($request->type == "seller") {
                        $seller_data = SellerDetails::select('categories_id', 'user_id')->where('id', $request->relevant_id)->first();
                        $register_data = Register::select('name')->where('id', $seller_data->user_id)->first();
                        $u_name = $register_data->name;

                        $categories_id = $seller_data->categories_id;
                        $notification_title = "New Rating Received";
                        $notification_body = "$u_name rated you [$request->rating]/5. ";
                        $notification_type = "add_review";
                        $notification_modules_type = "seller";
                        $notification_relation_id = $request->relevant_id;
                        $notification_user_id = $seller_data->user_id;
                        $notification_token_user_id = $seller_data->user_id;
                    } else if ($request->type == "buyer") {
                        $buyer_data = BuyerRequirment::select('user_id')->where('id', $request->relevant_id)->first();
                        $register_data = Register::select('name')->where('id', $buyer_data->user_id)->first();
                        $u_name = $register_data->name;

                        $notification_title = "New Rating Received";
                        $notification_body = "$u_name rated you [$request->rating]/5. ";
                        $notification_type = "add_review";
                        $notification_modules_type = "buyer";
                        $notification_relation_id = $request->relevant_id;
                        $notification_user_id = $buyer_data->user_id;
                        $notification_token_user_id = $buyer_data->user_id;
                    }

                    try {
                        //        Notification Code Start
                        Helper::notifyToUser(
                                $notification_title, $notification_body, $notification_type, $notification_modules_type, $notification_relation_id, $notification_user_id, $notification_token_user_id, $categories_id
                        );
                        //        Notification Code End
                    } catch (\Throwable $th) {
                        
                    }
                    return response()->json([
                                'status' => true,
                                'message' => 'Review added successfully.'
                                    ], 200);
                }
            }
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

}
