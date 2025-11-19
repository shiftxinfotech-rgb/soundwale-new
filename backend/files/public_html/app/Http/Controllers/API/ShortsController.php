<?php

namespace App\Http\Controllers\API;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\ContactUs;
use App\Models\UserVideo;
use App\Models\Role;
use App\Models\RegisterVideo;
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
use DB;

class ShortsController extends Controller {

    public function Add(Request $request) {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
                    'video' => 'required|file|mimes:mp4,mov|max:102400|' . Helper::mimesFileValidation('video'),
                    'description' => 'required',
                        ], [
                    'video.max' => 'The video field must not be greater than 100MB.',
                    'description.required' => 'The description field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {
            $data = $request->only('user_id', 'video', 'description', 'status');
            if ($request->hasFile('video')) {
                $data['video'] = Helper::uploadImage($request->video, UserVideo::IMAGE_PATH);
            }
            $data['user_id'] = $user->id;
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

    public function AddCommentsAndReply(Request $request) {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
                    'video_id' => 'required',
                    'message' => 'required',
                        ], [
                    'video_id.required' => 'The video id field is required.',
                    'message.required' => 'The message field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {
            $data = $request->only('user_id', 'register_video_id', 'message', 'parent_id', 'status');
            $data['status'] = 1;
            $data['user_id'] = $user->id;
            $data['register_video_id'] = $request->video_id;
            $data['parent_id'] = $request->parent_id ? $request->parent_id : NULL;
            $leads = new UserVideoComments($data);
            if ($leads->save()) {

                $video_data = RegisterVideo::select('user_id')->where('id', $request->video_id)->first();
                $register_data = Register::select('name')->where('id', $video_data->user_id)->first();
                $u_name = $register_data->name;

                //        Notification Code Start
                $notification_title = "New Comment on Your Video";
                $notification_body = "$u_name left a comment: Great content!";
                $notification_type = "add_comment";
                $notification_modules_type = "short";
                $notification_relation_id = $request->video_id;
                $notification_user_id = $video_data->user_id;
                $notification_token_user_id = $video_data->user_id;

                Helper::notifyToUser(
                        $notification_title, $notification_body, $notification_type, $notification_modules_type, $notification_relation_id, $notification_user_id, $notification_token_user_id
                );
                //        Notification Code End
                
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

    public function all_shorts_lists(Request $request) {

        $user = Auth::user();

        $userId = $user->id;
        $videos = RegisterVideo::select('register_video.*', RegisterVideo::raw("IF(register_video_likes.status = 1, 1, 0) as is_likes"))
//                ->leftjoin('register_video_likes', 'register_video.id', '=', 'register_video_likes.register_video_id')
                ->leftJoin('register_video_likes', function($join) use ($userId) {
                    $join->on('register_video_likes.register_video_id', '=', 'register_video.id')
                    ->where('register_video_likes.user_id', '=', $userId);
                })
                ->withCount(['likes', 'allComments as comments_count'])
                ->with(['uploader', 'comments.register', 'comments.replies.register', 'comments.replies'])
                ->get();

        $data = $videos->map(function ($video) {
            $roles_array = array();
            $roleIds = explode(',', $video->uploader->role_id);
            $roles_array = Role::whereIn('id', $roleIds)
                    ->get()
                    ->toArray();
            return [
                'id' => $video->id,
                'user_id' => $video->user_id,
                'video_url' => $video->video_url,
                'description' => $video->description,
                'uploaded_by' => [
                    'id' => $video->uploader->id,
                    'name' => $video->uploader->name,
                    'email' => $video->uploader->email,
                    'image_url' => $video->uploader->image_url,
                ],
                'is_likes' => $video->is_likes,
                'likes_count' => $video->likes_count,
                'comments_count' => $video->comments_count,
                'roles' => $roles_array,
                'comments' => $video->comments->map(function ($comment) {
                            return [
                                'comment_id' => $comment->id,
                                'user_id' => $comment->user_id,
                                'message' => $comment->message,
                                'created_at' => $comment->created_at->toDateTimeString(),
                                'user' => [
                                    'id' => $comment->register->id,
                                    'name' => $comment->register->name,
                                    'email' => $comment->register->email,
                                    'image_url' => $comment->register->image_url,
                                ],
                                'replies' => $comment->replies->map(function ($reply) {
                                            return [
                                                'reply_id' => $reply->id,
                                                'user_id' => $reply->user_id,
                                                'message' => $reply->message,
                                                'created_at' => $reply->created_at->toDateTimeString(),
                                                'user' => [
                                                    'id' => $reply->register->id,
                                                    'name' => $reply->register->name,
                                                    'email' => $reply->register->email,
                                                    'image_url' => $reply->register->image_url,
                                                ],
                                            ];
                                        })
                            ];
                        })
            ];
        });

        if ($data->isEmpty()) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => false, 'data' => $data], 200);
    }

    public function get_shorts_by_video_id(Request $request) {

        $user = Auth::user();
        $userId = $user->id;

        $validator = Validator::make($request->all(), [
                    'id' => 'required',
                        ], [
                    'id.required' => 'The id field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {
//        $video = RegisterVideo::select('register_video.*')->with(['uploader', 'comments.register', 'comments.replies.register', 'comments.replies'])->withCount(['likes', 'allComments as comments_count'])->where('register_video.id', $request->id)->first();

            $video = RegisterVideo::select('register_video.*', RegisterVideo::raw("IF(register_video_likes.status = 1, 1, 0) as is_likes"))
                            ->leftJoin('register_video_likes', function($join) use ($userId) {
                                $join->on('register_video_likes.register_video_id', '=', 'register_video.id')
                                ->where('register_video_likes.user_id', '=', $userId);
                            })
                            ->withCount(['likes', 'allComments as comments_count'])
                            ->with(['uploader', 'comments.register', 'comments.replies.register', 'comments.replies'])
                            ->where('register_video.id', $request->id)->first();
            if (!$video) {
                return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
            }

            $data = [
                'id' => $video->id,
                'comments' => $video->comments->map(function ($comment) {
                            return [
                                'comment_id' => $comment->id,
                                'user_id' => $comment->user_id,
                                'message' => $comment->message,
                                'created_at' => $comment->created_at->toDateTimeString(),
                                'user' => [
                                    'id' => $comment->register->id,
                                    'name' => $comment->register->name,
                                    'email' => $comment->register->email,
                                    'image_url' => $comment->register->image_url,
                                ],
                                'replies' => $comment->replies->map(function ($reply) {
                                            return [
                                                'reply_id' => $reply->id,
                                                'user_id' => $reply->user_id,
                                                'message' => $reply->message,
                                                'created_at' => $reply->created_at->toDateTimeString(),
                                                'user' => [
                                                    'id' => $reply->register->id,
                                                    'name' => $reply->register->name,
                                                    'email' => $reply->register->email,
                                                    'image_url' => $reply->register->image_url,
                                                ],
                                            ];
                                        })
                            ];
                        })
            ];

            if (!$data) {
                return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
            }
            return response()->json(['status' => true, 'data' => $data], 200);
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function delete_video_by_id(Request $request) {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
                    'id' => 'required',
                        ], [
                    'id.required' => 'The id field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {

            $exist_video = UserVideo::find($request->id);
            if ($exist_video) {
                $exist_video->delete();
                UserVideoComments::where('register_video_id', $request->id)->delete();
                UserVideoLike::where('register_video_id', $request->id)->delete();
                return response()->json([
                            'status' => true,
                            'message' => 'Deleted successfully'
                                ], 200);
            } else {
                return response()->json(['status' => false, 'message' => 'ID does not exist'], 404);
            }
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function shorts_like_unlike(Request $request) {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
                    'video_id' => 'required',
                        ], [
                    'video_id.required' => 'The video id field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }
        try {
            $data = $request->only('user_id', 'register_video_id', 'status');
            $data['user_id'] = $user->id;
            $data['status'] = 1;
            $data['register_video_id'] = $request->video_id;

//            $data2 = UserVideoLike::select('id')->where('user_id', $request->user_id)->where('register_video_id', $request->video_id)->get();
//            if (!$data2) {
            $exists = UserVideoLike::where('user_id', $user->id)->where('register_video_id', $request->video_id)->exists();
            if ($exists) {
                $obj = UserVideoLike::where('user_id', $user->id)->where('register_video_id', $request->video_id);
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

                    $video_data = RegisterVideo::select('user_id')->where('id', $request->video_id)->first();
                    $register_data = Register::select('name')->where('id', $video_data->user_id)->first();
                    $u_name = $register_data->name;

                    //        Notification Code Start
                    $notification_title = "New Like on Your Video!";
                    $notification_body = "$u_name just liked your video";
                    $notification_type = "like";
                    $notification_modules_type = "short";
                    $notification_relation_id = $request->video_id;
                    $notification_user_id = $video_data->user_id;
                    $notification_token_user_id = $video_data->user_id;

                    Helper::notifyToUser(
                            $notification_title, $notification_body, $notification_type, $notification_modules_type, $notification_relation_id, $notification_user_id, $notification_token_user_id
                    );
                    //        Notification Code End
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

}
