<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\Register;
use App\Models\RegisterWorkingWithApproval;
use App\Models\Role;
use App\Models\Categories;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\BusinessImages;
use App\Models\Business;
use App\Models\Models;
use App\Models\Review;
use App\Models\Country;
use App\Models\Parts;
use App\Models\States;
use App\Models\Cities;
use App\Models\BusinessCompany;
use App\Models\Manufacturer;
use App\Models\DirectoryCataloguePdf;
use App\Models\DeleteAccountRequest;
use App\Models\BusinessVideo;
use App\Models\BuyerRequirment;
use App\Models\BuyerRequirmentImages;
use App\Models\BuyerRequirmentLike;
use App\Models\SellerDetails;
use App\Models\SellerDetailsImages;
use App\Models\SellerDetailsLike;
use App\Models\Notifications;
use App\Models\ContactUs;
use App\Models\RegisterVideo;
use App\Models\UserVideoLike;
use App\Models\UserVideoComments;
use App\Models\TempRegister;
use App\Models\ViewCounter;
use DataTables;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use DB;
                    
class RegisterControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = Register::select('register.*','role.name as role_name','city.city_name as city_name')
            ->join('role', 'register.role_id', '=', 'role.id')
            ->leftjoin('city', 'register.city_id', '=', 'city.id')        
            ->latest();
            $query = $query->latest();
            
            if ($request->has('role_id') && !empty($request->role_id)) {
                $query->where('register.role_id', $request->role_id);
            }
            if (! $request->has('order')) {
                $query->orderBy('register.id', 'desc');
            }
            
            
//            $query = Register::select('id', 'image','email','status','role.name as role_name');
//            if ($request->has('role_id') && !empty($request->role_id)) {
//                $query->where('register.role_id', $request->role_id);
//            }
//            if (! $request->has('order')) {
//                $query->orderBy('id', 'desc');
//            }
            return DataTables::of($query)
                ->addColumn('action', function ($row) {
                    $viewRoute   = "<a href='".route('admin.register.view',$row->id)."' class='btn btn-icon btn-outline-brand btn-sm' title='View details'><i class='flaticon-eye fa-lg'></i></a>&nbsp";
                    $deleteRoute = "<a href='".route('admin.register.delete')."' data-id='".$row->id."' class='delete-record btn btn-icon btn-outline-danger btn-sm' title='Delete'><i class='la la-trash'></i></a>&nbsp;";
                    
                    return "{$viewRoute}{$deleteRoute}";
                })
                ->addColumn('full_mobile', function ($row) {
                    return ($row->code ? $row->code . ' ' : '') . $row->mobile_number;
                })
                ->filterColumn('full_mobile', function ($query, $keyword) {
                    $query->whereRaw("CONCAT(code, ' ', mobile_number) LIKE ?", ["%{$keyword}%"]);
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        $role = Role::select('*')->where('status', 1)->latest()->get();
        return view('admin.register.list', compact('role'));
    }

    public function add($id = null)
    {
        $data = null;
        $catalogue_data = null;
        $role = Role::select('id', 'name')->where('status', 1)->orderBy('id', 'asc')->get();
        $country = Country::select('id', 'country_name')->orderBy('country_name', 'asc')->where('is_enable', 1)->latest()->get();
        $company = Categories::select('id', 'name')->where('status', 1)->orderBy('name', 'asc')->latest()->get();
        $manufacturer = Category::select('id', 'name')->where('status', 1)->orderBy('name', 'asc')->latest()->get();
        if ($id) {
            $data = Register::select('*')->findOrFail($id);
        }
        
        return view('admin.register.add', compact('data','role','country','catalogue_data','company','manufacturer'));
    }

    public function view($id)
    {
        $catalogue_data = null;
        if ($id) {
        } 
        $data = Register::with('country','state', 'city','category')->findOrFail($id);
        $working_with = RegisterWorkingWithApproval::select('*')->orderBy('id', 'asc')->where('user_id', $id)->where('status', 1)->get();
        $business_company_data = BusinessCompany::select('*')->orderBy('id', 'desc')->where('user_id', $id)->get();
//        $review_data = DB::table('review')->join('register', 'review.relevant_id', '=', 'register.id')->where('review.user_id', $id)->orderBy('review.id', 'desc')->select('review.*', 'register.name as register_name','register.email as register_email', 'register.code', 'register.mobile_number')->get();
        
        $review_data = Review::select('review.*', 'register.name as register_name','register.email as register_email', 'register.code', 'register.mobile_number','role.name as role_name')
                    ->join('register', 'review.user_id', '=', 'register.id')
                    ->leftjoin('role', 'register.role_id', '=', 'role.id')
                    ->where('review.type', '=', "directory")
                    ->where('review.user_id', '!=', $id)
                    ->where('review.relevant_id', '=', $id)
                    ->get();
        return view('admin.register.view', compact('data','working_with','business_company_data','review_data'));
    }
    
    
    public function store(Request $request)
    {
        $request->validate([
            'role_id' => 'required',
        ]);

        try {
            $data = [];
            if ($request->role_id) {
                $data['role_id'] = $request->role_id;
            }
            if ($request->gender) {
                $data['gender'] = $request->gender;
            }
            if ($request->name) {
                $data['name'] = $request->name;
            }
            if ($request->categories_id) {
                $data['categories_id'] = $request->categories_id;
            }
            if ($request->personal_name) {
                $data['personal_name'] = $request->personal_name;
            }
            if ($request->country_id) {
                $data['country_id'] = $request->country_id;
            }
            if ($request->state_id) {
                $data['state_id'] = $request->state_id;
            }
            if ($request->city_id) {
                $data['city_id'] = $request->city_id;
            }
            if ($request->village) {
                $data['village'] = $request->village;
            }
            if ($request->facebook_link) {
                $data['facebook_link'] = $request->facebook_link;
            }
            if ($request->instagram_link) {
                $data['instagram_link'] = $request->instagram_link;
            }
            if ($request->web_link) {
                $data['web_link'] = $request->web_link;
            }
            if ($request->youtube_link) {
                $data['youtube_link'] = $request->youtube_link;
            }
            if ($request->description) {
                $data['description'] = $request->description;
            }
            if ($request->location) {
                $data['location'] = $request->location;
            }
            if ($request->latitude) {
                $data['latitude'] = $request->latitude;
            }
            if ($request->longitude) {
                $data['longitude'] = $request->longitude;
            }
            if ($request->hasFile('visiting_card_image')) {
                $data['visiting_card_image'] = Helper::uploadImage($request->visiting_card_image, Register::IMAGE_PATH);
            }
            if($request->role_id == "2" || $request->role_id == "3" || $request->role_id == "7"){
                $extra_mobile_number_data = [];
                // Get input arrays
                $names = $request->input('names');
                $mobile_numbers = $request->input('mobile_numbers');
                $emails = $request->input('emails');
                $types = $request->input('type');
                $codes = $request->input('codes');
                $code_sorts = $request->input('code_sorts');
                
                $ex_mobile_number = "";
                $ex_code = "";
                $ex_code_sort = "";
                $ex_email = "";
                
                $count = count($names);
                for ($i = 0; $i < $count; $i++) {
                    
                    if($names[$i] != ""){
                        if($types[$i] == "Owner"){
                            $ex_mobile_number = str_replace(' ', '', $mobile_numbers[$i]);
                            $ex_code = $codes[$i];
                            $ex_code_sort = $code_sorts[$i];
                            $ex_email = $emails[$i];
                        }
                        $extra_mobile_number_data[] = [
                            'name' => $names[$i],
                            'mobile_number' => str_replace(' ', '', $mobile_numbers[$i]),
                            'code' => $codes[$i],
                            'code_sort' => $code_sorts[$i],
                            'email' => $emails[$i],
                            'type' => $types[$i],
                        ];
                    }
                    
                }
                $data['email'] = $ex_email;
                $data['code_sort'] = $ex_code_sort;
                $data['code'] = $ex_code;
                $data['mobile_number'] = $ex_mobile_number;
                
                $data['extra_mobile_number'] = json_encode($extra_mobile_number_data);
            }else{
                if ($request->email) {
                    $data['email'] = $request->email;
                }
                if ($request->mobile_number) {
                    $data['mobile_number'] = $request->mobile_number;
                }
                if ($request->code) {
                    $data['code'] = $request->code;
                }
                if ($request->code_sort) {
                    $data['code_sort'] = $request->code_sort;
                }
            }

            
            $user = Register::updateOrCreate(
                ['id' => $request->edit_id],
                $data
            );
            
            return response()->json(['message' => ($request->edit_id) ? 'Update successfully' : 'Added successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }

    public function statusChange(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }

        $request->validate([
            'id' => 'required|exists:register,id',
            'status' => 'required',
        ]);

        try {
            $obj = Register::where('id', request('id'))->limit(1)->first();
            if ($obj) {
                $obj->status = ($request->status == 'true') ? 1 : 0;
                $obj->save();
                if($obj->status == 0){
                    $obj->tokens()->delete();
                }
                
            }

            return response()->json(['message' => 'Status update successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }

    public function delete(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }
        try {
            $exist_user = Register::find(request('id'));
            if ($exist_user) {
                
                    $data['name'] = $exist_user->name;
                    $data['email'] = $exist_user->email;
                    $data['mobile_number'] = $exist_user->mobile_number;
                    $dataa = new DeleteAccountRequest($data);
                    $dataa->save();
                    
                    Register::where('id', $exist_user->id)->delete();
                    Business::where('user_id', $exist_user->id)->delete();
                    BusinessCompany::where('user_id', $exist_user->id)->delete();
                    BusinessVideo::where('user_id', $exist_user->id)->delete();
                    BusinessImages::where('user_id', $exist_user->id)->delete();
                    Categories::where('user_id', $exist_user->id)->delete();
                    Category::where('user_id', $exist_user->id)->delete();
                    SubCategory::where('user_id', $exist_user->id)->delete();
                    Manufacturer::where('user_id', $exist_user->id)->delete();
                    Parts::where('user_id', $exist_user->id)->delete();
                    Models::where('user_id', $exist_user->id)->delete();
                    BuyerRequirment::where('user_id', $exist_user->id)->delete();
                    BuyerRequirmentImages::where('user_id', $exist_user->id)->delete();
                    BuyerRequirmentLike::where('user_id', $exist_user->id)->delete();
                    SellerDetails::where('user_id', $exist_user->id)->delete();
                    SellerDetailsImages::where('user_id', $exist_user->id)->delete();
                    SellerDetailsLike::where('user_id', $exist_user->id)->delete();
                    Review::where('user_id', $exist_user->id)->delete();
                    Notifications::where('user_id', $exist_user->id)->delete();
                    ContactUs::where('mobile_number', $exist_user->mobile_number)->delete();
                    RegisterVideo::where('user_id', $exist_user->id)->delete();
                    UserVideoLike::where('user_id', $exist_user->id)->delete();
                    UserVideoComments::where('user_id', $exist_user->id)->delete();
                    TempRegister::where('mobile_number', $exist_user->mobile_number)->delete();
                    ViewCounter::where('user_id', $exist_user->id)->delete();
                    
            }

            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }
    
    public function getState($country_id)
    {
        $states = States::where('id_country', $country_id)->where('is_enable', 1)->orderBy('state_name', 'asc')->latest()->get();
        return response()->json($states);
    }
    public function getCity($state_id)
    {
        $city = Cities::where('id_state', $state_id)->where('is_enable', 1)->orderBy('city_name', 'asc')->latest()->get();
        return response()->json($city);
    }
    public function getSubCategory(Request $request)
    {
        $categoryIds = $request->input('category_ids'); // Expecting an array

        if (!is_array($categoryIds)) {
            return response()->json(['error' => 'Invalid input'], 400);
        }

//        $subCategories = SubCategory::whereIn('category_id', $categoryIds)->orderBy('name', 'asc')->get();
        $subCategories = SubCategory::orderBy('name', 'asc')->get();

        return response()->json($subCategories);
    }
    public function store_view(Request $request)
    {
        $request->validate([
            'edit_id' => 'required',
            'form_type' => 'required',
        ]);

//        try {
            $UserId = $request->edit_id;
            if($request->form_type == "Gallery"){
            $imageRecords = [];
                if ($request->hasFile('shop_images')) {
                    $path = Helper::uploadImage($request->shop_images, BusinessImages::IMAGE_PATH);
                    $imageRecords[] = [
                            'user_id' => $UserId,
                            'image' => $path,
                        ];
                     BusinessImages::insert($imageRecords);
                }
                return redirect()->route('admin.register.view', ['id' => $UserId])->with('message', 'Added successfully.');
//            return response()->json(['message' => ($UserId) ? 'Update successfully' : 'Added successfully'], 200);
            }
            if($request->form_type == "ProfilePdf"){
            $companypdfRecords = [];
            if ($request->hasFile('company_names_pdf')) {
                $companyNames = $request->input('company_names');
                foreach ($request->file('company_names_pdf') as $index => $file1) {
                    $path = Helper::uploadImage($file1, BusinessCompany::IMAGE_PATH);
                    $companypdfRecords[] = [
                        'user_id' => $UserId,
                        'name' => $companyNames ?? null,
                        'business_id' => null,
                        'file_name' => $file1->getClientOriginalName(),
                        'image' => $path,
                    ];
                }
                if (!empty($companypdfRecords)) {
                    BusinessCompany::insert($companypdfRecords);
                }
                
            }
            return redirect()->route('admin.register.view', ['id' => $UserId])->with('message', 'Added successfully.');
//            return response()->json(['message' => ($UserId) ? 'Update successfully' : 'Added successfully'], 200);
            }
            
            if($request->form_type == "ProductInformation"){
                
                $selections = $request->input('selections', []);
                $FinalProductInfoData = [];
                foreach ($selections as $selection) {
                    // Find related records from DB
                    $product = Category::find($selection['product_id']);
                    $company = Categories::find($selection['company_id']);
                    $model = Models::find($selection['model_id']);
                    $FinalProductInfoData[] = [
                        'product_id' => $selection['product_id'],
                        'company_id' => $selection['company_id'],
                        'model_id'   => $selection['model_id'],
                        'product_name' => optional($product)->name,
                        'company_name' => optional($company)->name,
                        'model_name'   => optional($model)->name,
                    ];
                }
                // Convert to JSON
                $ProductInfoData = json_encode($FinalProductInfoData);
                
                Business::updateOrCreate(
                    ['user_id' => $UserId], // condition
                    ['product_info' => $ProductInfoData] // data to update or insert
                );
            return redirect()->route('admin.register.view', ['id' => $request->edit_id])->with('message', 'Added successfully.');
            }
            
            if($request->form_type == "WorkingWith"){
                
                
                $WorkingWithData = json_encode($request->working_with);
                if ($WorkingWithData == "null") {
                    $WorkingWithData = null;
                }
                $output = [];
                if($WorkingWithData != null){
                    
                    foreach ($request->working_with as $value) {
                        $output[] = [
                            'id' => strval(mt_rand(1000000000000, 9999999999999)), // 13-digit random number
                            'value' => $value
                        ];
                    }
                    $WorkingWithData = json_encode($output);
                }
                
                Business::updateOrCreate(
                    ['user_id' => $UserId], // condition
                    ['working_with' => $WorkingWithData] // data to update or insert
                );
            return redirect()->route('admin.register.view', ['id' => $request->edit_id])->with('message', 'Added successfully.');
            }
            
            if($request->form_type == "PartInfo"){
                
                $selections_part = $request->input('selections_part', []);
                $FinalPartInfoData = [];
                foreach ($selections_part as $selection_part) {
                    // Find related records from DB
                    if(isset($selection_part['parts_id'])){
                        $parts = Parts::find($selection_part['parts_id']);
                        $company = Categories::find($selection_part['company_id']);
                        $FinalPartInfoData[] = [
                            'parts_id' => $selection_part['parts_id'],
                            'company_id' => $selection_part['company_id'],
                            'details'   => $selection_part['details'],
                            'parts_name' => optional($parts)->name,
                            'company_name' => optional($company)->name,
                        ];
                    }
                }
                // Convert to JSON
                $PartInfoData = json_encode($FinalPartInfoData);
                
                Business::updateOrCreate(
                    ['user_id' => $UserId], // condition
                    ['spare_part_info' => $PartInfoData] // data to update or insert
                );
            return redirect()->route('admin.register.view', ['id' => $request->edit_id])->with('message', 'Added successfully.');
            }
            
            if($request->form_type == "ServiceCenterInformation"){
                
                $selections_service = $request->input('selections_service', []);
                $FinalServiceInfoData = [];
                foreach ($selections_service as $selection_service) {
                    // Find related records from DB
                    $company = Categories::find($selection_service['company_id']);
                    $FinalServiceInfoData[] = [
                        'company_id' => $selection_service['company_id'],
                        'company_name' => optional($company)->name,
                        'center_name'   => $selection_service['center_name'],
                        'mobile_number'   => $selection_service['mobile_number'],
                        'code_sort'   => $selection_service['code_sort'],
                        'code'   => $selection_service['code'],
                        'location'   => $selection_service['location'],
                        'latitude'   => $selection_service['latitude'],
                        'longitude'   => $selection_service['longitude'],
                        
                    ];
                }
                // Convert to JSON
                $ServiceInfoData = json_encode($FinalServiceInfoData);
                
                Register::updateOrCreate(
                    ['id' => $UserId], // condition
                    ['service_center_info' => $ServiceInfoData] // data to update or insert
                );
            return redirect()->route('admin.register.view', ['id' => $request->edit_id])->with('message', 'Added successfully.');
            }
            
            if($request->form_type == "ProductInformationMulti"){
                
                
                Business::updateOrCreate(
                    ['user_id' => $UserId], // condition
                    [
                        'companies_id'     => is_array($request->companies_id) ? implode(',', $request->companies_id) : $request->companies_id,
                        'category_id'      => is_array($request->category_id) ? implode(',', $request->category_id) : $request->category_id,
                        'sub_category_id'  => is_array($request->sub_category_id) ? implode(',', $request->sub_category_id) : $request->sub_category_id,
                    ]
                );
                
                return redirect()->route('admin.register.view', ['id' => $request->edit_id])->with('message', 'Added successfully.');
            }
            
//        } catch (\Throwable $th) {
//            logger($th->getMessage());
//
//            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
//        }
    }
    public function gallery_image_delete(Request $request)
    {
        $path = $request->input('path');
        
            $obj = BusinessImages::where('id', $request->id)->limit(1)->first();
            if ($obj) {
                $delete = $obj->delete();
            }

            return response()->json(['success' => true], 200);

//        if (Storage::disk('public')->exists($path)) {
//            Storage::disk('public')->delete($path);
//
//            BusinessImages::where('id', $request->id)->delete();
//
//            return response()->json(['success' => true]);
//        }
//
//        return response()->json(['success' => false, 'message' => 'File not found']);
    }
    public function common_business_delete(Request $request)
    {
        
        if($request->type == "BusinessCompanyPdf"){
            $path = $request->input('path');
            $obj = BusinessCompany::where('id', $request->id)->limit(1)->first();
            if ($obj) {
                $delete = $obj->delete();
            }
            return response()->json(['success' => true], 200);
        }
        
    }
    
//    public function store_view(Request $request)
//    {
//        $request->validate([
//            'edit_id' => 'required',
//            'form_type' => 'required',
//        ]);
//
//        try {
//            $data = [];
//            $business_inserted_Id = $request->edit_id;
//            $imageRecords = [];
//            if ($request->hasFile('shop_images')) {
//                foreach ($request->file('shop_images') as $file) {
//                    $path = Helper::uploadImage($file, BusinessImages::IMAGE_PATH);
//                    $imageRecords[] = [
//                        'user_id' => $request->edit_id,
//                        'image' => $path,
//                    ];
//                }
//                if (!empty($imageRecords)) {
//                    BusinessImages::insert($imageRecords);
//                }
//            }
////            if ($request->hasFile('visiting_card_image')) {
////                $data['visiting_card_image'] = Helper::uploadImage($request->visiting_card_image, Register::IMAGE_PATH);
////            }
//
//            
////            $user = Register::updateOrCreate(
////                ['id' => $request->edit_id],
////                $data
////            );
//            
//            return response()->json(['message' => ($request->edit_id) ? 'Update successfully' : 'Added successfully'], 200);
//        } catch (\Throwable $th) {
//            logger($th->getMessage());
//
//            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
//        }
//    }
    public function delete_visiting_card(Request $request)
    {
            $register = Register::findOrFail($request->id);
            $register->visiting_card_image = null;
            $register->save();

            return response()->json(['success' => true], 200);
    }
    public function delete_user_profile(Request $request)
    {
            $register = Register::findOrFail($request->id);
            $register->image = null;
            $register->save();

            return response()->json(['success' => true], 200);
    }
    public function delete_review(Request $request)
    {
            Review::where('id', $request->id)->delete();

            return response()->json(['success' => true], 200);
    }
    public function json_object_remove(Request $request)
    {
            $user_id = $request->user_id;
            if($request->type == "RemoveParts"){
                $resultData = Business::where('user_id', $user_id)->limit(1)->first();
                if ($resultData) {
                    $spare_part_info = $resultData->spare_part_info;
                    $delete_object = json_decode($request->delete_object_json, true);
                    
                    // Convert JSON string to PHP array
                    $array = json_decode($spare_part_info, true);
                    // Filter the array to remove the matching object
                    $filtered = array_filter($array, function ($item) use ($delete_object) {
                        return $item != $delete_object;
                    });
                    $filtered = array_values($filtered);
                    $finalResult = json_encode($filtered);
                    
                    Business::updateOrCreate(
                        ['user_id' => $user_id],
                        ['spare_part_info' => $finalResult]
                    );
                }
            }else if($request->type == "RemoveServiceCenter"){
                $resultData = Register::where('id', $user_id)->limit(1)->first();
                if ($resultData) {
                    $all_info = $resultData->service_center_info;
                    $delete_object = json_decode($request->delete_object_json, true);
                    
                    // Convert JSON string to PHP array
                    $array = json_decode($all_info, true);
                    // Filter the array to remove the matching object
                    $filtered = array_filter($array, function ($item) use ($delete_object) {
                        return $item != $delete_object;
                    });
                    $filtered = array_values($filtered);
                    $finalResult = json_encode($filtered);
                    
                    Register::updateOrCreate(
                        ['id' => $user_id],
                        ['service_center_info' => $finalResult]
                    );
                }
            }else if($request->type == "RemoveProduct"){
                $resultData = Business::where('user_id', $user_id)->limit(1)->first();
                if ($resultData) {
                    $all_info = $resultData->product_info;
                    $delete_object = json_decode($request->delete_object_json, true);
                    
                    // Convert JSON string to PHP array
                    $array = json_decode($all_info, true);
                    // Filter the array to remove the matching object
                    $filtered = array_filter($array, function ($item) use ($delete_object) {
                        return $item != $delete_object;
                    });
                    $filtered = array_values($filtered);
                    $finalResult = json_encode($filtered);
                    
                    Business::updateOrCreate(
                        ['user_id' => $user_id],
                        ['product_info' => $finalResult]
                    );
                }
            }else if($request->type == "RemoveWorkingWith"){
                $resultData = Business::where('user_id', $user_id)->limit(1)->first();
                if ($resultData) {
                    $all_info = $resultData->working_with;
                    $delete_object = json_decode($request->delete_object_json, true);
                    
                    // Convert JSON string to PHP array
                    $array = json_decode($all_info, true);
                    // Filter the array to remove the matching object
                    $filtered = array_filter($array, function ($item) use ($delete_object) {
                        return $item != $delete_object;
                    });
                    $filtered = array_values($filtered);
                    $finalResult = json_encode($filtered);
                    
                    Business::updateOrCreate(
                        ['user_id' => $user_id],
                        ['working_with' => $finalResult]
                    );
                }
            }else if($request->type == "RemoveStudent"){
                $resultData = Business::where('user_id', $user_id)->limit(1)->first();
                if ($resultData) { 
                    $all_info = $resultData->your_best_engineer;
                    $delete_object = json_decode($request->delete_object_json, true);
                    
                    // Convert JSON string to PHP array
                    $array = json_decode($all_info, true);
                    // Filter the array to remove the matching object
                    $filtered = array_filter($array, function ($item) use ($delete_object) {
                        return $item != $delete_object;
                    });
                    $filtered = array_values($filtered);
                    $finalResult = json_encode($filtered);
                    
                    Business::updateOrCreate(
                        ['user_id' => $user_id],
                        ['your_best_engineer' => $finalResult]
                    );
                }
            }

            return response()->json(['success' => true], 200);
    }
    
}
