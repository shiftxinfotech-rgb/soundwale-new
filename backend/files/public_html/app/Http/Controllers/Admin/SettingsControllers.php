<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use App\Helper\Helper;
use Illuminate\Support\Facades\Storage;

class SettingsControllers extends Controller
{
    public function index(Request $request)
    {
        $data = Setting::select('*')->first();
        return view('admin.settings.index', compact('data'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'header_logo' => 'required_without:edit_id|max:2060|'.Helper::mimesFileValidation('header_logo'),
            'footer_logo' => 'required_without:edit_id|max:2060|'.Helper::mimesFileValidation('footer_logo'),
            'job_image' => 'required_without:edit_id|max:2060|'.Helper::mimesFileValidation('job_image'),
        ], [
            'header_logo.max' => 'The image field must not be greater than 2MB.',
            'footer_logo.max' => 'The image field must not be greater than 2MB.',
            'job_image.max' => 'The image field must not be greater than 2MB.',
        ]);
        try {
            $validate = $request->only(
            'content',
            'registered_address',
            'header_text',
            'factory_address',
            'email',
            'phone_number',
            'website',
            'testimonials_title',
            'testimonial_description',
            'nemt_title',
            'nemt_description',
            'blog_title',
            'blog_description',
            't1',
            'c1',
            't2',
            'c2',
            't3',
            'c3',
            't4',
            'c4',
            'leaders_title',
            );

            if ($request->hasFile('header_logo')) {
                $validate['header_logo'] = Helper::uploadImage($request->header_logo, Setting::IMAGE_PATH);
            }
            if ($request->hasFile('footer_logo')) {
                $validate['footer_logo'] = Helper::uploadImage($request->footer_logo, Setting::IMAGE_PATH);
            }
            if ($request->hasFile('job_image')) {
                $validate['job_image'] = Helper::uploadImage($request->job_image, Setting::IMAGE_PATH);
            }
            $setting = $request->edit_id ? Setting::find($request->edit_id) : new Setting;
            $setting->fill($validate);
            $setting->save();

            return response()->json(['message' => ($request->edit_id) ? 'Settings updated successfully' : 'Settings added successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());
        }

        return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
    }
}
