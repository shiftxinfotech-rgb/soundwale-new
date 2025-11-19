<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutUs;
use Illuminate\Http\Request;
use App\Helper\Helper;
use Illuminate\Support\Facades\Cache;

class AboutUsControllers extends Controller
{
    public function index(Request $request)
    {
        $data = AboutUs::select('id', 'title_1', 'title_2', 'description', 'image','image_2','lets_work_together_title', 'our_value_title', 'what_we_do_image', 'what_we_do_description', 'our_vision_image', 'our_vision_description', 'our_mission_image', 'our_mission_description')->first();

        return view('admin.about-us.index', compact('data'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'title_1' => 'nullable',
            'title_2' => 'nullable',
            'description' => 'nullable',
            'lets_work_together_title' => 'nullable',
            'our_value_title' => 'nullable',
            'image' => 'required_without:edit_id|max:2060|'.Helper::mimesFileValidation('image'),
            'image_2' => 'required_without:edit_id|max:2060|'.Helper::mimesFileValidation('image_2'),
            'what_we_do_image' => 'required_without:edit_id|max:2060|'.Helper::mimesFileValidation('what_we_do_image'),
            'our_vision_image' => 'required_without:edit_id|max:2060|'.Helper::mimesFileValidation('our_vision_image'),
            'our_mission_image' => 'required_without:edit_id|max:2060|'.Helper::mimesFileValidation('our_mission_image'),
        ], [
            'image.max' => 'The image field must not be greater than 2MB.',
            'image_2.max' => 'The image field must not be greater than 2MB.',
            'what_we_do_image.max' => 'The image field must not be greater than 2MB.',
            'our_vision_image.max' => 'The image field must not be greater than 2MB.',
            'our_mission_image.max' => 'The image field must not be greater than 2MB.',
        ]);

        $data = $request->only(['title_1', 'title_2', 'description', 'lets_work_together_title', 'our_value_title','what_we_do_description','our_vision_description','our_mission_description']);

        if ($request->hasFile('image')) {
            $data['image'] = Helper::uploadImage($request->file('image'), AboutUs::IMAGE_PATH);
        }
        if ($request->hasFile('image_2')) {
            $data['image_2'] = Helper::uploadImage($request->file('image_2'), AboutUs::IMAGE_PATH);
        }
        if ($request->hasFile('what_we_do_image')) {
            $data['what_we_do_image'] = Helper::uploadImage($request->file('what_we_do_image'), AboutUs::IMAGE_PATH);
        }
        if ($request->hasFile('our_vision_image')) {
            $data['our_vision_image'] = Helper::uploadImage($request->file('our_vision_image'), AboutUs::IMAGE_PATH);
        }
        if ($request->hasFile('our_mission_image')) {
            $data['our_mission_image'] = Helper::uploadImage($request->file('our_mission_image'), AboutUs::IMAGE_PATH);
        }
        try {
            AboutUs::updateOrCreate(
                ['id' => $request->input('edit_id')],
                $data
            );

            return response()->json(['message' => 'About us updated successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            return response()->json(['message' => 'Oops! Something went wrong, please try again later'], 500);
        }
    }
}
