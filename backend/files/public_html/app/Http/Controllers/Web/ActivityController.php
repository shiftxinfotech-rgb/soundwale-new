<?php

namespace App\Http\Controllers\Web;
use Illuminate\Http\Request;
use App\Models\Activity;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;

class ActivityController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'activity_type' => 'required|string',
            'description' => 'required|string',
        ]);

        // Store the activity in the database
        Activity::create([
            'user_id' => auth()->check() ? auth()->id() : null, // Track user if logged in, else null
            'activity_type' => $request->activity_type,
            'description' => $request->description,
            'url' => $request->url,
            'ip_address' => $request->ip(),
        ]);

        return response()->json(['message' => 'Activity tracked successfully.']);
    }
}
