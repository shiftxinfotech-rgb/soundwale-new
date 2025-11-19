<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Rules\PasswordComplexity;
use Auth;
use Hash;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Helper\Helper;

class AdminProfileController extends Controller
{
    // edit profile
    public function profileEdit()
    {
        $user = auth()->user();

        return view('admin.admin-profile', compact('user'));
    }

    // profile update
    public function profileUpdate(Request $request)
    {
        $user = auth()->user();

        // Validation rules
        $request->validate([
            'name' => 'required|max:150',
            'email' => 'required|email:rfc,dns|unique:admin,email,' . $user->id,
            'password' => [
                'nullable',
                'confirmed',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/'
            ],
            'password_confirmation' => 'nullable',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048' // image validation
        ], [
            'password.regex' => 'The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.',
            'image.max' => 'The image field must not be greater than 2MB.'
        ]);

        // Update user data
        $user->name = $request->name;
        $user->email = $request->email;
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->phone = $request->phone;

        if ($request->hasFile('image')) {
            $user->image = Helper::uploadImage($request->image, Admin::IMAGE_PATH);
        }

        // Handle password update
        if (!empty($request->password)) {
            $user->password = Hash::make($request->password);
        }

        // Save user data
        if ($user->save()) {
            return response()->json(['message' => 'Profile updated successfully'], 200);
        }

        return response()->json(['message' => 'Profile update failed'], 500);
    }

    public function adminPasswordChange()
    {
        $user = auth()->user();

        return view('admin.admin-change-password', compact('user'));
    }
    // password update
    public function passwordUpdate(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|different:current_password',
        ]);

        $user = auth()->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Current password does not match'], 500);
        }

        $user->password = Hash::make($request->new_password);

        if ($user->save()) {
            return response()->json(['message' => 'Password changed successfully'], 200);
        }

        return response()->json(['message' => 'An error occurred while updating the password. Please try again'], 500);
    }


}
