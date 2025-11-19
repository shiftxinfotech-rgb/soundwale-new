<?php

namespace App\Http\Controllers\API;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\ContactUs;
use App\Models\UserVideo;
use App\Models\UserVideoLike;
use App\Models\UserVideoComments;
use App\Models\Admin;
use App\Models\MailConfiguration;
use App\Models\Register;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactUsMail;
use App\Mail\ContactUsMailAdmin;

class UserDetailsController extends Controller {

    public function UserDetailsSave(Request $request) {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
                    'user_id' => 'required',
                    'video' => 'required|file|mimes:mp4,mov|max:2048|' . Helper::mimesFileValidation('video'),
                    'description' => 'required',
                        ], [
                    'user_id.required' => 'The user id field is required.',
                    'video.max' => 'The image field must not be greater than 100MB.',
                    'description.required' => 'The description field is required.',        
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {
            $data = $request->only('user_id', 'video','description', 'status');
            if ($request->hasFile('video')) {
                $data['video'] = Helper::uploadImage($request->video, UserVideo::IMAGE_PATH);
            }
            $data['status'] = 1;
            $leads = new UserVideo($data);
            if ($leads->save()) {
                return response()->json([
                            'status' => true,
                            'message' => 'Your request was sent successfully.'
                                ], 200);
            }

            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function video_lists(Request $request) {

//        $data = UserVideo::select('register_video.id', 'register_video.user_id', 'register.name as user_name', 'register_video.video')
//                ->join('register', 'register_video.user_id', '=', 'register.id')
//                ->get();

        $data = DB::table('register_video as v')
    ->join('register_video_comments as c1', 'v.id', '=', 'c1.register_video_id')
    ->leftJoin('register_video_comments as c2', 'c1.id', '=', 'c2.parent_id')
    ->select(
        'v.id as id',
        'v.title as description',

        'c1.id as comment_id',
        'c1.comment_text as comment_text',
        'c1.created_at as comment_created_at',

        'c2.id as reply_id',
        'c2.comment_text as reply_text',
        'c2.created_at as reply_created_at'
    )
    ->whereNull('c1.parent_id') // Only fetch top-level comments
    ->orderBy('v.id')
    ->orderBy('c1.created_at')
    ->orderBy('c2.created_at')
    ->get();
        if (!$data) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $data], 200);
    }

    public function video_lists_by_user_id(Request $request) {
        $validator = Validator::make($request->all(), [
                    'user_id' => 'required',
                        ], [
                    'user_id.required' => 'The user id field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {
            $data = UserVideo::select('register_video.id', 'register_video.user_id', 'register.name as user_name', 'register_video.video')
                    ->join('register', 'register_video.user_id', '=', 'register.id')
                    ->where('register_video.user_id', $request->user_id)
                    ->get();
            if (!$data) {
                return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
            } else {
                return response()->json(['status' => true, 'data' => $data], 200);
            }
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function video_like_unlike(Request $request) {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
                    'user_id' => 'required',
                    'video_id' => 'required',
                        ], [
                    'user_id.required' => 'The user id field is required.',
                    'video_id.required' => 'The video id field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }
        try {
            $data = $request->only('user_id', 'register_video_id', 'status');
            $data['status'] = 1;
            $data['register_video_id'] = $request->video_id;

//            $data2 = UserVideoLike::select('id')->where('user_id', $request->user_id)->where('register_video_id', $request->video_id)->get();
//            if (!$data2) {
            $exists = UserVideoLike::where('user_id', $request->user_id)->where('register_video_id', $request->video_id)->exists();
            if ($exists) {
                $obj = UserVideoLike::where('user_id', $request->user_id)->where('register_video_id', $request->video_id);
                if ($obj) {
                    $delete = $obj->delete();
                }
                return response()->json([
                            'status' => true,
                            'message' => 'Like removed successfully'
                                ], 200);
            } else {
                $dataa = new UserVideoLike($data);
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

    public function video_comments(Request $request) {
//        $user = Auth::user();

        $validator = Validator::make($request->all(), [
                    'user_id' => 'required',
                    'video_id' => 'required',
                    'message' => 'required',
                        ], [
                    'user_id.required' => 'The user id field is required.',
                    'video_id.required' => 'The video id field is required.',
                    'message.required' => 'The message field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {
            $data = $request->only('user_id', 'register_video_id', 'message', 'parent_id', 'status');
            $data['status'] = 1;
            $data['register_video_id'] = $request->video_id;
            $data['parent_id'] = $request->parent_id ? $request->parent_id : NULL;
            $leads = new UserVideoComments($data);
            if ($leads->save()) {
                return response()->json([
                            'status' => true,
                            'message' => 'Message send successfully.'
                                ], 200);
            }

            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function video_comments_lists(Request $request) {

        $validator = Validator::make($request->all(), [
                    'video_id' => 'required',
                        ], [
                    'video_id.required' => 'The video id field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {
            $data = UserVideoComments::select('register_video_comments.id', 'register_video_comments.user_id', 'register.name as user_name', 'register_video_comments.register_video_id','register_video_comments.message')
                    ->join('register', 'register_video_comments.user_id', '=', 'register.id')
                    ->where('register_video_comments.register_video_id', $request->video_id)
                    ->get();
            if (!$data) {
                return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
            } else {
                return response()->json(['status' => true, 'data' => $data], 200);
            }
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

}
