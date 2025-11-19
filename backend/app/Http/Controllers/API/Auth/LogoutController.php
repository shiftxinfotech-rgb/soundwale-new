<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Register;

class LogoutController extends Controller
{
    public function logout(Request $request)
    {
        $user = auth()->user();

        if ($user) {
            // Delete the user's tokens
            $user->tokens()->delete();
			Register::where('id', $user->id)->update([
                    'fcm_token' => null,
                ]);
            return response()->json(['status' => true, 'message' => 'User logged out successfully'], 200);
        } else {
            // User is already logged out
            return response()->json(['status' => false, 'message' => 'User already logged out'], 400);
        }
    }
}
