<?php

namespace App\Http\Controllers\API\Auth;

use App\Helper\Helper;
use App\Mail\MailSend;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Register;
use App\Models\Categories;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Role;
use App\Models\Catalogue;
use App\Models\Business;
use App\Models\UserVideo;
use App\Models\SellerDetails;
use App\Models\SellerDetailsLike;
use App\Models\Review;
use App\Models\TempRegister;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Config;
use Carbon\Carbon;

class LoginController extends Controller {

    public function send_otp(Request $request) {
        $validator = Validator::make($request->all(), [
                    'code' => 'required',
                    'mobile_number' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {

            $user1 = Register::where('code', $request->code)->where('mobile_number', $request->mobile_number)->select('id', 'status')->first();
            if (optional($user1)->status === 0) {
                return response()->json(['status' => false, 'message' => 'Your account has been disabled. Please contact support for assistance.'], 404);
            }

            if ($request->mobile_number == 8000999001) {
                $otp = 123456;
                $user = TempRegister::where('code', $request->code)->where('mobile_number', $request->mobile_number)->select('id')->first();
                if (!$user) {
                    $data = $request->only('code', 'mobile_number', 'verification_code');
                    $data['verification_code'] = $otp;

                    $temp_register = new TempRegister($data);
                    $temp_register->save();
                } else {
                    $user->update([
                        'verification_code' => $otp,
                    ]);
                }
                return response()->json(['message' => 'Otp send successfully', 'status' => true, 'otp' => $otp], 200);
            } else {

                $now = Carbon::now();
                $otp = 123456;
                $otpRequest = TempRegister::where('code', $request->code)->where('mobile_number', $request->mobile_number)->first();
                if ($otpRequest) {
                    if ($otpRequest->blocked_until && $now->lt($otpRequest->blocked_until)) {
                        return response()->json([
                                    'message' => 'Try again after 2 hours',
                                        ], 404);
                    }

                    if ($otpRequest->last_sent_at && $otpRequest->last_sent_at->diffInHours($now) >= 2) {
                        // Reset counter after 2 hours
                        $otpRequest->update([
                            'send_count' => 1,
                            'verification_code' => $otp,
                            'last_sent_at' => $now,
                            'blocked_until' => null,
                        ]);
                    } elseif ($otpRequest->send_count < 3) {
                        $otpRequest->update([
                            'verification_code' => $otp,
                            'send_count' => $otpRequest->send_count + 1,
                            'last_sent_at' => $now,
                        ]);
                    } else {
                        // Block for 2 hours
                        $otpRequest->update([
                            'blocked_until' => $now->copy()->addHours(2),
                        ]);

                        return response()->json([
                                    'message' => 'Try again after 2 hours',
                                        ], 404);
                    }
                } else {
                    // First time user
                    $data = $request->only('code', 'mobile_number', 'verification_code');
                    $data['verification_code'] = $otp;
                    $data['send_count'] = 1;
                    $data['last_sent_at'] = $now;

                    $temp_register = new TempRegister($data);
                    $temp_register->save();
                }

                return response()->json(['message' => 'Otp send successfully', 'status' => true, 'otp' => $otp], 200);
            }
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function verify_otp(Request $request) {
        $validator = Validator::make($request->all(), [
                    'code' => 'required',
                    'mobile_number' => 'required',
                    'otp' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        // Attempt to find the user in the register table
        $temp_register = TempRegister::where('code', $request->code)->where('mobile_number', $request->mobile_number)->where('verification_code', $request->otp)->select('*')->first();

        // If user is not found
        if (!$temp_register) {
            return response()->json(['message' => 'Invalid Otp.', 'status' => false], 404);
        }

        // $user = Register::where('code', $request->code)->where('mobile_number', $request->mobile_number)->select('*')->first();
        $user = Register::select('register.*')->where('register.mobile_number', $request->mobile_number)->first();

        
        
        $token = "";
        if (isset($user)) {
            if ($user->status == 0) {
                return response()->json(['message' => 'Your account has been disabled. Please contact support for assistance.', 'status' => false], 401);
            }
            // Invalidate existing tokens
            $user->tokens()->delete();

            // Generate a new token
            $token = $user->createToken('auth_token')->plainTextToken;
            
            $user = Register::select('register.*', 'country.country_name as country_name', 'state.state_name as state_name', 'city.city_name as city_name')
                    ->leftJoin('country', 'register.country_id', '=', 'country.id')
                    ->leftJoin('state', 'register.state_id', '=', 'state.id')
                    ->leftJoin('city', 'register.city_id', '=', 'city.id')
                    ->where('register.id', $user->id)
                    ->first();
            $role_data = array();
            if (isset($user)) {
                $role_data = Role::select('*')->whereIn('id', explode(',', $user->role_id))->get();
            }
            $user['roles'] = $role_data;
            $appToken = Helper::app_token_msg($user->mobile_number);
            $user['firebase_custom_token'] = $appToken;
            return response()->json(['message' => 'Otp verify successful', 'status' => true, 'token' => $token, 'user' => $user], 200);
        } else {
            unset($user['roles']);
            return response()->json(['message' => 'Otp verify successful', 'status' => true, 'token' => $token, 'user' => $user], 200);
        }

        
        

        return response()->json(['message' => 'Otp verify successful', 'status' => true, 'token' => $token, 'user' => $user], 200);
    }

}
