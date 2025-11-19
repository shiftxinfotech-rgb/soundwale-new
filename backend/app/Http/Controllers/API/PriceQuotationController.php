<?php

namespace App\Http\Controllers\API;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\ContactUs;
use App\Models\PriceQuotation;
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

class PriceQuotationController extends Controller
{

    public function lists(Request $request) {
        
        $data = PriceQuotation::select('user_id','city_id','requirment_id','grade_id','unit_id','surface_id')->get();
        if (!$data) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }

        return response()->json(['status' => true, 'data' => $data], 200);
    }
    
    public function PriceQuotationSave(Request $request)
    {
//        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'user_id'    => 'required',
            'city_id'    => 'required',
            'requirment_id'    => 'required',
            'grade_id'    => 'required',
            'unit_id'    => 'required',
            'surface_id'    => 'required',
            'categories_id'    => 'required',
            'category_id'    => 'required',
            'sub_category_id'    => 'required',
            'quantity'    => 'required',
            'description'    => 'required',
        ],[
            'user_id.required'    => 'The user id field is required.',
            'city_id.required'    => 'The city field is required.',
            'requirment_id.required'    => 'The requirment field is required.',
            'grade_id.required'    => 'The grade field is required.',
            'unit_id.required'    => 'The unit field is required.',
            'surface_id.required'    => 'The surface field is required.',
            'categories_id.required'    => 'The categories field is required.',
            'category_id.required'    => 'The category field is required.',
            'sub_category_id.required'    => 'The sub category field is required.',
            'quantity.required'    => 'The quantity field is required.',
            'description.required'    => 'The description field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false,'message' => $validator->errors()], 400);
        }

        try {
            $data = $request->only('user_id','city_id','requirment_id','grade_id','unit_id','surface_id','categories_id','category_id','sub_category_id','quantity','description','image','status');
            if ($request->hasFile('image')) {
                $data['image'] = Helper::uploadImage($request->image, PriceQuotation::IMAGE_PATH);
            }
            $data['status'] = 1;
            $price_quotation = new PriceQuotation($data);
            if ($price_quotation->save()) {
                return response()->json([
                    'status' => true,
                    'message' => 'Your request was sent successfully.'
                ], 201);
            }

            return response()->json(['status' => false,'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false,'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }


}
