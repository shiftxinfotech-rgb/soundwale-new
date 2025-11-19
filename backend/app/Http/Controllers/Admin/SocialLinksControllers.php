<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SocialLinks;
use Illuminate\Http\Request;

class SocialLinksControllers extends Controller
{
    public function index(Request $request)
    {
        $data = SocialLinks::select('id','facebook_link', 'twitter_link', 'instagram_link', 'linked_link')->first();

        return view('admin.social-link.index', compact('data'));
    }

    public function update(Request $request)
    {
        $request->validate([

        ]);

        try {
            SocialLinks::updateOrCreate(
                ['id' => $request->edit_id],
                [
                    'facebook_link' => $request->input('facebook_link'),
                    'twitter_link' => $request->input('twitter_link'),
                    'instagram_link' => $request->input('instagram_link'),
                    'linked_link' => $request->input('linked_link'),
                ]
            );

            return response()->json(['message' => 'SocialLinks updated successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());
        }

        return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
    }
}
