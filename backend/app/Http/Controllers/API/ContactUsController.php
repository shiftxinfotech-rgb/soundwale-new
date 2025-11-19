<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\DeleteAccountRequest;
use App\Models\Admin;
use App\Models\Register;
use App\Models\Business;
use App\Models\BusinessCompany;
use App\Models\BusinessVideo;
use App\Models\BusinessImages;
use App\Models\Categories;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Manufacturer;
use App\Models\Parts;
use App\Models\Models;
use App\Models\BuyerRequirment;
use App\Models\BuyerRequirmentImages;
use App\Models\BuyerRequirmentLike;
use App\Models\SellerDetails;
use App\Models\SellerDetailsImages;
use App\Models\SellerDetailsLike;
use App\Models\Review;
use App\Models\Notifications;
use App\Models\ContactUs;
use App\Models\RegisterVideo;
use App\Models\UserVideoLike;
use App\Models\UserVideoComments;
use App\Models\TempRegister;
use App\Models\ViewCounter;
use App\Models\MailConfiguration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactUsMail;
use App\Mail\ContactUsMailAdmin;

class ContactUsController extends Controller {

    public function lists(Request $request) {

        $data = ContactUs::select('name', 'email', 'country_code', 'mobile_number', 'subject', 'message')->get();
        if (!$data) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $data], 200);
    }

    public function Contacussave(Request $request) {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
                    'name' => 'required|string',
                    'email' => 'required|email',
                    'message' => 'required|string',
                    'mobile_number' => 'required|string',
                    'country_code' => 'required|string',
                        ], [
                    'name.required' => 'The name field is required.',
                    'email.required' => 'The email field is required.',
                    'message.required' => 'The message field is required.',
                    'mobile_number.required' => 'The mobile_number field is required.',
                    'country_code.required' => 'The country code field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {
            // Prepare data for saving and email
            $data = $request->only('name', 'email', 'country_code', 'mobile_number', 'subject', 'message');

            $userContactUs = new ContactUs($data);

            if ($userContactUs->save()) {
                // Prepare email data
//                $mailData = [
//                    'title'      => env('MAIL_FROM_NAME'),
//                    'subject'    => 'Contact-Us From ' . env('APP_NAME'),
//                    'to_name'    => $request->name,
//                    'user_type'  => $user->user_type,
//                    'to_email'   => $request->email,
//                    'to_message' => $request->message,
//                    'to_phone'   => $phoneWithCode,
//                ];
//
//                // Retrieve mail configuration
//                $mailConfig = MailConfiguration::first();
//                $admin = Admin::first();
//                if ($mailConfig) {
//                    Config::set('mail.mailers.smtp', [
//                        'transport'  => $mailConfig->mail_mailer,
//                        'host'       => $mailConfig->mail_host,
//                        'port'       => $mailConfig->mail_port,
//                        'encryption' => $mailConfig->mail_encryption,
//                        'username'   => $mailConfig->mail_username,
//                        'password'   => $mailConfig->mail_password,
//                    ]);
//
//                    Config::set('mail.from.address', $mailConfig->mail_from_address);
//                    Config::set('mail.from.name', $mailConfig->mail_from_name);
//                }
//
//                // Send emails
//                Mail::to($request->email)->send(new ContactUsMail($mailData));
//                Mail::to($admin->email)->send(new ContactUsMailAdmin($mailData));

                return response()->json([
                            'status' => true,
                            'message' => 'Your request was sent successfully. We will contact you soon.'
                                ], 200);
            }

            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function delete_account_request(Request $request) {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
                    'description' => 'required',
                        ], [
                    'description.required' => 'The description field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {
            $data = $request->only('user_id', 'description', 'status');
            $data['user_id'] = $user->id;

            $exist_user = Register::find($user->id);
            if ($exist_user) {
                $data['name'] = $exist_user->name;
                $data['email'] = $exist_user->email;
                $data['mobile_number'] = $exist_user->mobile_number;
                $dataa = new DeleteAccountRequest($data);
                if ($dataa->save()) {

                    Register::where('id', $exist_user->id)->delete();
                    Business::where('user_id', $exist_user->id)->delete();
                    BusinessCompany::where('user_id', $exist_user->id)->delete();
                    BusinessVideo::where('user_id', $exist_user->id)->delete();
                    BusinessImages::where('user_id', $exist_user->id)->delete();
                    Categories::where('user_id', $exist_user->id)->delete();
                    Category::where('user_id', $exist_user->id)->delete();
                    SubCategory::where('user_id', $exist_user->id)->delete();
                    Manufacturer::where('user_id', $exist_user->id)->delete();
                    Parts::where('user_id', $exist_user->id)->delete();
                    Models::where('user_id', $exist_user->id)->delete();
                    BuyerRequirment::where('user_id', $exist_user->id)->delete();
                    BuyerRequirmentImages::where('user_id', $exist_user->id)->delete();
                    BuyerRequirmentLike::where('user_id', $exist_user->id)->delete();
                    SellerDetails::where('user_id', $exist_user->id)->delete();
                    SellerDetailsImages::where('user_id', $exist_user->id)->delete();
                    SellerDetailsLike::where('user_id', $exist_user->id)->delete();
                    Review::where('user_id', $exist_user->id)->delete();
                    Notifications::where('user_id', $exist_user->id)->delete();
                    ContactUs::where('mobile_number', $exist_user->mobile_number)->delete();
                    RegisterVideo::where('user_id', $exist_user->id)->delete();
                    UserVideoLike::where('user_id', $exist_user->id)->delete();
                    UserVideoComments::where('user_id', $exist_user->id)->delete();
                    TempRegister::where('mobile_number', $exist_user->mobile_number)->delete();
                    ViewCounter::where('user_id', $exist_user->id)->delete();

                    return response()->json(['status' => true, 'message' => 'Your account deleted successfully.'], 200);
                }
            } else {
                return response()->json(['status' => false, 'message' => 'ID does not exist'], 404);
            }
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

}
