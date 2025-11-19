<?php

namespace App\Http\Controllers\API;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\Register;
use App\Models\Notifications;
use App\Models\Admin;
use App\Models\MailConfiguration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactUsMail;
use App\Mail\ContactUsMailAdmin;
use App\Traits\ApiPaginationTrait;
use Carbon\Carbon;

class NotificationController extends Controller {

    public function Update_Fcm_Token(Request $request) {
        $user = Auth::user();
        $validator = Validator::make($request->all(), [
                    'fcm_token' => 'required',
                        ], [
                    'fcm_token.required' => 'The fcm token field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {
            $exists = Register::where('id', $user->id)->select('id')->first();
            if ($exists) {
                Register::where('id', $exists->id)->update(['fcm_token' => $request->fcm_token]);

                return response()->json(['status' => true, 'message' => 'FCM token updated successfully.'], 200);
            } else {
                return response()->json(['status' => false, 'message' => 'ID does not exist'], 404);
            }
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    private function getPaginationInformation($currentPage, $recordPerPage) {
        return [
            'page' => (int) ($currentPage ?? 1),
            'limit' => (int) ($recordPerPage ?? 15),
        ];
    }

    public function Get_All(Request $request) {
        $user = Auth::user();


        $query = Notifications::select('id', 'title', 'body', 'type', 'modules_type', 'relation_id','categories_id', 'read', 'created_at')
                ->where('user_id', $user->id)
                ->orderByDesc('id');
        $transformedData = $query->get()
                ->map(function ($notification) {
                    $notification->created_at_human = Carbon::parse($notification->created_at)->diffForHumans();
                    $notification->date_group = Carbon::parse($notification->created_at)->toDateString();
                    return $notification;
                })
                ->groupBy('date_group')
                ->map(function ($group, $date) {
                    return [
                        'date' => $date,
                        'notifications' => $group->values(),
                    ];
                })
                ->values()
                ->toArray();
        if (!empty($transformedData)) {
            return response()->json(['status' => true, 'data' => $transformedData], 200);
        } else {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }
    }

    public function Unread_Count(Request $request) {
        $user = Auth::user();

        try {
            $data['unread_count'] = Notifications::where('user_id', $user->id)->where('read', 0)->count();
            return response()->json(['status' => true, 'data' => $data], 200);
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function Mark_All_Read(Request $request) {
        $user = Auth::user();

        try {
            Notifications::where('user_id', $user->id)->where('read', 0)->update(['read' => 1]);
            return response()->json(['status' => true, 'data' => null, 'message' => "Updated successfully."], 200);
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function Delete_By_Id(Request $request) {
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
            Notifications::where('id', $request->id)->where('user_id', $user->id)->delete();

            return response()->json(['status' => true, 'data' => null, 'message' => "Notifications deleted successfully."], 200);
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function Mark_Read_By_Id(Request $request) {
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
            Notifications::where('id', $request->id)->where('read', 0)->update(['read' => 1]);

            return response()->json(['status' => true, 'data' => null, 'message' => "Notifications updated successfully."], 200);
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function Send_Notification(Request $request) {
        $user = Auth::user();
        $validator = Validator::make($request->all(), [
                    'user_id' => 'required',
                    'title' => 'required',
                    'message' => 'required',
					'type' => 'required',
					'modules_type' => 'required',
					'relation_id' => 'required',
                        ], [
                    'user_id.required' => 'The user id field is required.',
                    'title.required' => 'The title field is required.',
                    'message.required' => 'The message field is required.',
					'type.required' => 'The message field is required.',
					'modules_type.required' => 'The message field is required.',
					'relation_id.required' => 'The message field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

//        try {
        
            $notification_title = $request->title;
            $notification_body = $request->message;
            $notification_type = $request->type;
            $notification_modules_type = $request->modules_type;
            $notification_relation_id = $request->relation_id;
            $notification_user_id = $request->user_id;
            $notification_token_user_id = $request->user_id;
            Helper::notifyToUser(
                    $notification_title,$notification_body,$notification_type,$notification_modules_type,$notification_relation_id,$notification_user_id,$notification_token_user_id
            );
            
            return response()->json(['status' => true, 'data' => null, 'message' => "Notifications send successfully."], 200);
//        } catch (\Throwable $th) {
//            \Log::error(request()->path() . "\n" . $th->getMessage());
//            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
//        }
    }

	public function send_chat_notification(Request $request) {
        $user = Auth::user();
        $validator = Validator::make($request->all(), [
                    'receiver_user_id' => 'required',
                    'sender_user_id' => 'required',
                    'title' => 'required',
                    'message' => 'required',
                    'type' => 'required',
                    'modules_type' => 'required',
                        ], [
                    'receiver_user_id.required' => 'The user id field is required.',
                    'sender_user_id.required' => 'The message field is required.',
                    'title.required' => 'The title field is required.',
                    'message.required' => 'The message field is required.',
                    'type.required' => 'The message field is required.',
                    'modules_type.required' => 'The message field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {
        
            $notification_title = $request->title;
            $notification_body = $request->message;
            $notification_type = $request->type;
            $notification_modules_type = $request->modules_type;
            $notification_relation_id = $request->sender_user_id;
            $notification_user_id = $request->receiver_user_id;
            $notification_token_user_id = $request->receiver_user_id;
            Helper::notifyToUser(
                    $notification_title,$notification_body,$notification_type,$notification_modules_type,$notification_relation_id,$notification_user_id,$notification_token_user_id
            );
            
            return response()->json(['status' => true, 'data' => null, 'message' => "Notifications send successfully."], 200);
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

}
