<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Auth;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  Request  $request
     * @return string|null
     */
    
    protected function redirectTo($request)
    {
//        if (! Auth::guard('api')->check()) {
//            return response()->json([
//                'success' => false,
//                'message' => 'Unauthenticated.',
//            ], 401);
//        }
        if (! $request->expectsJson()) {
            return route('admin.login.form');
        }
    }
}
