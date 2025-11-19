<?php

namespace App\Http\Controllers\API;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\Advertisement;
use App\Models\Admin;
use App\Models\MailConfiguration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactUsMail;
use App\Mail\ContactUsMailAdmin;

class AdvertisementController extends Controller
{

    public function lists(Request $request) {
        $user = Auth::user();
        $data = Advertisement::select('advertisement.*')->where('user_id', $user->id)->orderBy('id', 'desc')->get();
        if ($data->isEmpty()) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $data], 200);
    }
    
    public function AdvertisementSave(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'image' => 'required',
            'name'   => 'required',
            'code'   => 'required',
            'code_sort'   => 'required',
            'mobile'   => 'required',
            'email'   => 'required',
        ],[
            'image.required' => 'The image field is required.',
            'name.required' => 'The name field is required.',
            'code.required' => 'The code field is required.',
            'code_sort.required' => 'The code_sort field is required.',
            'mobile.required' => 'The mobile field is required.',
            'email.required' => 'The email field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false,'message' => $validator->errors()], 400);
        }

        try {
            // Prepare data for saving and email
            $validate = $request->only('user_id','image','name','code','code_sort','mobile','email');
            if ($request->hasFile('image')) {
                $validate['image'] = Helper::uploadImage($request->image, Advertisement::IMAGE_PATH);
            }
            $validate['user_id'] = $user->id;
            $userAdvertisement = new Advertisement($validate);

            if ($userAdvertisement->save()) {

                return response()->json([
                    'status' => true,
                    'message' => 'Your request was sent successfully. We will contact you soon.'
                ], 200);
            }

            return response()->json(['status' => false,'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false,'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }


}
