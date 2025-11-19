<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Register;
use App\Models\Unit;
use App\Models\Grade;
use App\Models\Requirment;
use App\Models\Surface;
use App\Models\Leads;
use App\Models\Cities;
use DataTables;
use Illuminate\Http\Request;

class LeadsControllers extends Controller
{
    public function list(Request $request)
    {
        if($request->method() == 'POST'){
            $query = Leads::select('leads.id', 'leads.user_id','leads.city_id', 'leads.status', 'leads.created_at', 'categories.name as main_category_name', 'register.name as user_name', 'category.name as category_name', 'city.city_name as city_name')
            ->join('categories', 'leads.categories_id', '=', 'categories.id')
            ->join('category', 'leads.category_id', '=', 'category.id')
            ->join('register', 'leads.user_id', '=', 'register.id')
            ->join('city', 'leads.city_id', '=', 'city.id')
            ->latest();
            $query = $query->latest();

            return DataTables::of($query)

            ->addColumn('action', function($row){
                $viewRoute = "<a href='".route('admin.leads.view', $row->id)."' class='btn btn-icon btn-outline-brand btn-sm'  title='View details'><i class='flaticon-eye fa-lg'></i></a>&nbsp;";
                $editRoute   = "<a href='".route('admin.leads.edit',$row->id)."' class='btn btn-icon btn-outline-brand btn-sm' title='Edit details'><i class='la la-edit'></i></a>&nbsp;";
                $deleteRoute = "<a href='".route('admin.leads.delete')."' data-id='".$row->id."' class='delete-record btn btn-icon btn-outline-danger btn-sm' title='Delete'><i class='la la-trash'></i></a>&nbsp;";

                $viewRoute   = $viewRoute ? $viewRoute : null;
                $editRoute   = $editRoute ? $editRoute : null;
                $deleteRoute = $deleteRoute ? $deleteRoute : null;

                return "{$editRoute}{$viewRoute}{$deleteRoute}";
            })
            ->rawColumns(['action'])
            ->make(true);
        }

        return view('admin.leads.list');
    }

    public function add($id = null)
    {
        $data = null;
        $categories = Categories::select('id', 'name')->where('status', 1)->latest()->get();
        $users = Register::select('id', 'name')->where('status', 1)->latest()->get();
        $units = Unit::select('id', 'name')->where('status', 1)->latest()->get();
        $grade = Grade::select('id', 'name')->where('status', 1)->latest()->get();
        $surface = Surface::select('id', 'name')->where('status', 1)->latest()->get();
        $requirment = Requirment::select('id', 'name')->where('status', 1)->latest()->get();
        $cities = Cities::select('id', 'city_name')->where('id_state', 12)->latest()->get();
        if ($id) {
            $data = Leads::select('id','user_id','city_id','requirment_id','grade_id','unit_id','surface_id','categories_id','category_id','sub_category_id','quantity','description','image')->where('id',$id)->first();
        }

        return view('admin.leads.add', compact('data','categories','users','units','grade','requirment','surface','cities'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'categories_id' => 'required',
            'category_id' => 'required',
        ]);

        try {
            $validate = $request->only('user_id','city_id','requirment_id','grade_id','unit_id','surface_id','categories_id','category_id','sub_category_id','quantity','description','image','status');
            if ($request->hasFile('image')) {
                $validate['image'] = Helper::uploadImage($request->image, Leads::IMAGE_PATH);
            }
            $validate['status'] = 1;
            $leads = ( $request->edit_id ) ? Leads::where('id',$request->edit_id)->first()  : new Leads();
            $leads->fill( $validate );
            $leads->save();

            return response()->json(['message' => ($request->edit_id) ? 'Update successfully' : 'Added successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }

    public function view($id)
    {
        $data = Leads::with('categories','category', 'sub_category')->findOrFail($id);
//        $data = Leads::findOrFail($id);

        return view('admin.leads.view', compact('data'));
    }

    public function statusChange(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }

        $request->validate([
            'id' => 'required|exists:category,id',
            'status' => 'required',
        ]);

        try {
            $obj = Leads::where('id', request('id'))->limit(1)->first();
            if ($obj) {
                $obj->status = ($request->status == 'true') ? 1 : 0;
                $obj->save();
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
            $obj = Leads::where('id', request('id'))->limit(1)->first();
            if ($obj) {
                $delete = $obj->delete();
            }

            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }
    public function getCategory($categories_id)
    {
        $subcategories = Category::where('categories_id', $categories_id)->where('status', 1)->latest()->get();
        return response()->json($subcategories);
    }
    public function getsubcategory($category_id)
    {
        $subcategory = SubCategory::where('category_id', $category_id)->where('status', 1)->latest()->get();
        return response()->json($subcategory);
    }
}
