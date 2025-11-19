<?php

namespace App\Http\Controllers\API;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\ContactUs;
use App\Models\Leads;
use App\Models\Business;
use App\Models\Register;
use App\Models\BusinessImages;
use App\Models\BusinessVideo;
use App\Models\BusinessCompany;
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
use Illuminate\Validation\Rule;

class BusinessController extends Controller {

    public function lists(Request $request) {

        $data = Leads::select('user_id', 'city_id', 'requirment_id', 'grade_id', 'unit_id', 'surface_id')->get();
        if (!$data) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $data], 200);
    }

    public function BusinessSave(Request $request) {
//        $user = Auth::user();
//         'user_id'    => 'required|unique:business,user_id',
        $validator = Validator::make($request->all(), [
                    'user_id' => 'required',
                    'name' => 'required',
                    'address' => 'required',
                    'company_website' => 'required',
                    'establishment_year' => 'required',
                    'annual_turnover' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {
            $validate = $request->only('user_id', 'product_info', 'name', 'address', 'company_website', 'establishment_year', 'annual_turnover', 'gst_number', 'image', 'status');
            if ($request->hasFile('image')) {
                $validate['image'] = Helper::uploadImage($request->image, Business::IMAGE_PATH);
            }
            $validate['status'] = 1;
            $business = ( $request->id ) ? Business::where('id', $request->id)->first() : new Business();
            $business->fill($validate);
            $business->save();

            return response()->json(['status' => true, 'message' => ($request->id) ? 'Update successfully.' : 'Added successfully.'], 200);
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function add_business_shop_images(Request $request) {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
                    'user_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        $imageRecords = [];
        if ($request->hasFile('shop_images')) {
            foreach ($request->file('shop_images') as $file) {
                $path = Helper::uploadImage($file, BusinessImages::IMAGE_PATH);
                $imageRecords[] = [
                    'user_id' => $request->user_id,
                    'image' => $path,
                ];
            }
            if (!empty($imageRecords)) {
                BusinessImages::insert($imageRecords);
            }
        }
        return response()->json(['message' => 'Added successfully.', 'status' => true], 200);
    }

    public function add_business_shop_video(Request $request) {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
                    'video' => 'required|file|mimes:mp4,mov|max:102400|',
                    'user_id' => 'required',
                        ], [
                    'video.max' => 'The video field must not be greater than 100MB.',
                    'user_id.required' => 'The user id field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {
            $data = $request->only('user_id', 'video', 'status');
            if ($request->hasFile('video')) {
                $data['video'] = Helper::uploadImage($request->video, BusinessVideo::IMAGE_PATH);
            }
            $data['user_id'] = $request->user_id;
            $data['status'] = 1;
            $leads = new BusinessVideo($data);
            if ($leads->save()) {

                return response()->json([
                            'status' => true,
                            'message' => 'Video upload successfully.'
                                ], 200);
            }

            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function add_business_shop_image_video(Request $request) {
        $user = auth()->user();

        $rules = [
            'user_id' => 'required',
        ];

//        if ($request->type === 'image') {
//            $rules['shop_images'] = 'required';
//        }
//
//        if ($request->type === 'video') {
//            $rules['video'] = 'required|file|mimes:mp4,mov|max:102400|';
//        }

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        $imageRecords = [];
        if ($request->hasFile('shop_images')) {
            foreach ($request->file('shop_images') as $file) {
                $path = Helper::uploadImage($file, BusinessImages::IMAGE_PATH);
                $imageRecords[] = [
                    'user_id' => $request->user_id,
                    'image' => $path,
                ];
            }
            if (!empty($imageRecords)) {
                BusinessImages::insert($imageRecords);
            }
        }

        $data = $request->only('user_id', 'video', 'status');
        if ($request->hasFile('video')) {
            $data['video'] = Helper::uploadImage($request->video, BusinessVideo::IMAGE_PATH);
            $data['user_id'] = $request->user_id;
            $data['status'] = 1;
            $videos = new BusinessVideo($data);
            $videos->save();
        }

        return response()->json(['message' => 'Added successfully.', 'status' => true], 200);
    }

//    public function add_business_shop_image_video(Request $request) {
//        $user = auth()->user();
//
//        $validator = Validator::make($request->all(), [
//                    'user_id' => 'required',
//                    'type' => 'required',
//        ]);
//        $validator->sometimes('shop_images', 'required', function ($input) {
//            return $input->type === 'image';
//        });
//        $validator->sometimes('video', 'required', function ($input) {
//            return $input->type === 'video';
//        });
//
//        if ($validator->fails()) {
//            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
//        }
//
//        if ($request->type == "image") {
//            $imageRecords = [];
//            if ($request->hasFile('shop_images')) {
//                foreach ($request->file('shop_images') as $file) {
//                    $path = Helper::uploadImage($file, BusinessImages::IMAGE_PATH);
//                    $imageRecords[] = [
//                        'user_id' => $request->user_id,
//                        'image' => $path,
//                    ];
//                }
//                if (!empty($imageRecords)) {
//                    BusinessImages::insert($imageRecords);
//                }
//            }
//        } else if ($request->type == "video") {
//            $data = $request->only('user_id', 'video', 'status');
//            if ($request->hasFile('video')) {
//                $data['video'] = Helper::uploadImage($request->video, BusinessVideo::IMAGE_PATH);
//            }
//            $data['user_id'] = $request->user_id;
//            $data['status'] = 1;
//            $videos = new BusinessVideo($data);
//            if ($videos->save());
////            $videoRecords = [];
////            if ($request->hasFile('shop_videos')) {
////                foreach ($request->file('shop_videos') as $file) {
////                    $path = Helper::uploadImage($file, BusinessVideo::IMAGE_PATH);
////                    $videoRecords[] = [
////                        'user_id' => $request->user_id,
////                        'video' => $path,
////                    ];
////                }
////                if (!empty($videoRecords)) {
////                    BusinessVideo::insert($videoRecords);
////                }
////            }
//        } else {
//            return response()->json(['status' => false, 'message' => 'Invalid type'], 404);
//        }
//
//
//        return response()->json(['message' => 'Added successfully.', 'status' => true], 200);
//    }

    public function remove_business_shop_image_video(Request $request) {
        $user = auth()->user();
        $validator = Validator::make($request->all(), [
                    'id' => 'required',
                    'type' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        if ($request->type == "image") {
            $obj = BusinessImages::where('id', $request->id);
            if ($obj) {
                $delete = $obj->delete();
            }
        } else if ($request->type == "video") {
            $obj = BusinessVideo::where('id', $request->id);
            if ($obj) {
                $delete = $obj->delete();
            }
        } else {
            return response()->json(['status' => false, 'message' => 'Invalid type'], 404);
        }

        return response()->json([
                    'status' => true,
                    'message' => 'Removed successfully'
                        ], 200);
    }

    public function get_business_image_video_list(Request $request) {

        $user = auth()->user();

        try {

            $user = Register::select('id')->where('id', '=', $user->id)->first();
            if (!$user) {
                return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
            }

            $business_shop_images_data = array();
            $business_shop_video_data = array();

            $business_shop_images_data = BusinessImages::select('*')->where('user_id', $user->id)->get();
            $business_shop_video_data = BusinessVideo::select('*')->where('user_id', $user->id)->get();

            $data['business_shop_images_data'] = $business_shop_images_data;
            $data['business_shop_video_data'] = $business_shop_video_data;


            if (!empty($data)) {
                return response()->json(['status' => true, 'data' => $data], 200);
            } else {
                return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
            }
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function add_business_pdf_and_names(Request $request) {
        $user = auth()->user();

        $rules = [
            'user_id' => 'required',
            'company_names_pdf' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

//        $exists = Business::where('user_id', $user->id)->first();
//        if ($exists) {
//            
//        }

        $companypdfRecords = [];
        if ($request->hasFile('company_names_pdf')) {
            $companyNames = $request->input('company_names');
            foreach ($request->file('company_names_pdf') as $index => $file1) {
                $path = Helper::uploadImage($file1, BusinessCompany::IMAGE_PATH);
                $companypdfRecords[] = [
                    'user_id' => $user->id,
                    'name' => $companyNames[$index] ?? null,
                    'business_id' => $business_inserted_Id ?? null,
                    'file_name' => $file1->getClientOriginalName(),
                    'image' => $path,
                ];
            }
            if (!empty($companypdfRecords)) {
                BusinessCompany::insert($companypdfRecords);
            }
        }

        return response()->json(['message' => 'Added successfully.', 'status' => true], 200);
    }

    public function delete_business_pdf_and_names(Request $request) {
        $user = auth()->user();
        $validator = Validator::make($request->all(), [
                    'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        $obj = BusinessCompany::where('id', $request->id);
        if ($obj) {
            $delete = $obj->delete();
        }

        return response()->json([
                    'status' => true,
                    'message' => 'Removed successfully'
                        ], 200);
    }
    
    public function get_business_pdf_and_names(Request $request) {

        $user = auth()->user();

        try {
            
            $data = BusinessCompany::select('*')->where('user_id', '=', $user->id)->get();
            if ($data->isEmpty()) {
                return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
            } else {
                return response()->json(['status' => true, 'data' => $data], 200);
            }
            
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

}
