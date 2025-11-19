<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Rules\PasswordComplexity;
use Hash;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AdminForgotPasswordController extends Controller
{
    // send forget password link
    public function forgetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email:rfc,dns|exists:admin,email', // Ensure this matches your table structure
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
            ]);
        }
        try {
            $status = Password::broker('authority')->sendResetLink($request->only('email'));

            if ($status === Password::RESET_LINK_SENT) {
                return response()->json([
                    'status' => true,
                    'message' => 'Cool! Password recovery instruction has been sent to your email.',
                ]);
            }
        } catch (\Throwable $th) {
            \Log::error('Password reset link sending failed: ' . $th->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Oops! something went wrong, Please try again later',
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Oops! something went wrong, Please try again later',
        ]);
    }


    // reset password form
    public function ResetPasswordForm(Request $request, $token)
    {
        $admin = Admin::query()->where('email', $request->email)->first();
        // Check if the token is valid
        if ($admin && Password::tokenExists($admin, $token)) {
            return view('admin.auth.reset-password', compact('token', 'admin'));
        } else {
            return redirect()->route('admin.login.form')->with(['error' => 'The password reset link is invalid or has expired. Please request a new one.']);
        }
    }

    // submit reset password form
    public function resetPasswordStore(Request $request)
    {
        $request->validate([
            'email' => 'required|email:rfc,dns',
            'token' => 'required',
            'password_confirmation' => 'required',
            'password' => [
                'required',
                'confirmed',
                new PasswordComplexity,
            ],
        ]);

        $admin = Admin::query()->where('email', $request->email)->first();

        $status = Password::broker('authority')->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'status' => true,
                'message' => 'Your password has been changed!',
                'redirect_url' => route('admin.login.form'),
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Oops! something went wrong, Please try again later',
        ]);
    }
}
