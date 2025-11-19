<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\CmsPages;
use App\Models\ContactUs;
use App\Models\Register;
use App\Models\Categories;
use App\Models\City;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\HomeList;
use App\Models\Models;
use App\Models\Manufacturer;
use App\Models\BuyerRequirment;
use App\Models\SellerDetails;
use Illuminate\Http\Request;

class AdminHomeController extends Controller {

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index() {

        $data['user_count'] = Register::count();
        $data['company_count'] = Categories::count();
        $data['category_count'] = Category::count();
        $data['models_count'] = Models::count();
        $data['manufacturer_count'] = Manufacturer::count();
        $data['buyer_requirment_count'] = BuyerRequirment::select('buyer_requirment.*','role.name as role_name','register.name as user_name', 'register.email as user_email', 'register.mobile_number as user_mobile_number', 'register.code as user_mobile_code','state.state_name as state_name')
            ->join('register', 'buyer_requirment.user_id', '=', 'register.id')
            ->leftjoin('role', 'buyer_requirment.role_id', '=', 'role.id')
            ->leftjoin('state', 'buyer_requirment.state_id', '=', 'state.id')
            ->count();
        $data['seller_details_count'] = SellerDetails::select('seller_details.*','role.name as role_name','register.name as user_name', 'register.email as user_email', 'register.mobile_number as user_mobile_number', 'register.code as user_mobile_code','state.state_name as state_name')
            ->join('register', 'seller_details.user_id', '=', 'register.id')
            ->leftjoin('role', 'seller_details.role_id', '=', 'role.id')
            ->leftjoin('state', 'seller_details.state_id', '=', 'state.id')
            ->count();
        
        $data['home_requirment_count'] = HomeList::select('home_list.id', 'home_list.user_id','home_list.role_id', 'home_list.status', 'home_list.created_at','role.name as role_name','register.name as user_name', 'register.email as user_email', 'register.mobile_number as user_mobile_number', 'register.code as user_mobile_code')
            ->join('register', 'home_list.user_id', '=', 'register.id')
            ->leftjoin('role', 'home_list.role_id', '=', 'role.id')  
            ->count();
        $data['user_inquiry_count'] = ContactUs::count();
        $data['services_count'] = 0;
        $data['Career_count'] = 0;
        $data['SubmitRole_count'] = 0;
        return view('admin.dashboard', compact('data'));
    }

    public function storeImage(Request $request) {
        if ($request->hasFile('upload')) {

            $originName = $request->file('upload')->getClientOriginalName();
            $fileName = pathinfo($originName, PATHINFO_FILENAME);
            $upload = $request->file('upload')->store('upload');
            $url = Helper::getImageUrl($upload, $fileName);

            return response()->json(['fileName' => $fileName, 'uploaded' => 1, 'url' => $url]);
        }
        return false;
    }

}
