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
use App\Models\Directory;
use App\Models\Cities;
use App\Models\DirectorySlider;
use App\Models\DirectoryGallery;
use App\Models\DirectoryCataloguePdf;
use DataTables;
use Illuminate\Http\Request;

class DirectoryControllers extends Controller
{
    public function list(Request $request)
    {
        if($request->method() == 'POST'){
            $query = Directory::select('directory.id', 'directory.user_id','directory.city_id', 'directory.status', 'directory.created_at', 'categories.name as main_category_name', 'register.name as user_name', 'category.name as category_name', 'city.city_name as city_name')
            ->join('categories', 'directory.categories_id', '=', 'categories.id')
            ->join('category', 'directory.category_id', '=', 'category.id')
            ->join('register', 'directory.user_id', '=', 'register.id')
            ->join('city', 'directory.city_id', '=', 'city.id')
            ->latest();
            $query = $query->latest();

            return DataTables::of($query)

            ->addColumn('action', function($row){
                $viewRoute = "<a href='".route('admin.directory.view', $row->id)."' class='btn btn-icon btn-outline-brand btn-sm'  title='View details'><i class='flaticon-eye fa-lg'></i></a>&nbsp;";
                $editRoute   = "<a href='".route('admin.directory.edit',$row->id)."' class='btn btn-icon btn-outline-brand btn-sm' title='Edit details'><i class='la la-edit'></i></a>&nbsp;";
                $deleteRoute = "<a href='".route('admin.directory.delete')."' data-id='".$row->id."' class='delete-record btn btn-icon btn-outline-danger btn-sm' title='Delete'><i class='la la-trash'></i></a>&nbsp;";

                $viewRoute   = $viewRoute ? $viewRoute : null;
                $editRoute   = $editRoute ? $editRoute : null;
                $deleteRoute = $deleteRoute ? $deleteRoute : null;

                return "{$editRoute}{$viewRoute}{$deleteRoute}";
            })
            ->rawColumns(['action'])
            ->make(true);
        }

        return view('admin.directory.list');
    }

    public function add($id = null)
    {
        $data = null;
        $slider_data = null;
        $gallery_data = null;
        $catalogue_data = null;
        $categories = Categories::select('id', 'name')->where('status', 1)->latest()->get();
        $users = Register::select('id', 'name')->where('status', 1)->latest()->get();
        $units = Unit::select('id', 'name')->where('status', 1)->latest()->get();
        $grade = Grade::select('id', 'name')->where('status', 1)->latest()->get();
        $surface = Surface::select('id', 'name')->where('status', 1)->latest()->get();
        $requirment = Requirment::select('id', 'name')->where('status', 1)->latest()->get();
        $cities = Cities::select('id', 'city_name')->where('id_state', 12)->latest()->get();
        if ($id) {
            $data = Directory::select('id','company_name','user_id','city_id','categories_id','category_id','sub_category_id','mobile_number','country_code','email','available_on_whatsapp_with_same_number','whatsapp','whatsapp_country_code','website','location','contact_person_name','image','about_us','image')->where('id',$id)->first();
            $slider_data = DirectorySlider::select('id','directory_id','image')->where('directory_id',$id)->latest()->get();
            $gallery_data = DirectoryGallery::select('id','directory_id','image')->where('directory_id',$id)->latest()->get();
            $catalogue_data = DirectoryCataloguePdf::select('id','name','directory_id','image')->where('directory_id',$id)->latest()->get();
        }

        return view('admin.directory.add', compact('data','slider_data','gallery_data','catalogue_data','categories','users','units','grade','requirment','surface','cities'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'categories_id' => 'required',
            'category_id' => 'required',
        ]);

        try {
            $validate = $request->only('company_name','user_id','city_id','categories_id','category_id','sub_category_id','mobile_number','country_code','email','available_on_whatsapp_with_same_number','whatsapp','whatsapp_country_code','website','location','contact_person_name','image','about_us','image','status');
            if ($request->hasFile('image')) {
                $validate['image'] = Helper::uploadImage($request->image, Directory::IMAGE_PATH);
            }
            $validate['status'] = 1;
            $leads = ( $request->edit_id ) ? Directory::where('id',$request->edit_id)->first()  : new Directory();
            $leads->fill( $validate );
            $leads->save();
            
            if ($request->edit_id) {
                $lastInsertedId = $request->edit_id;
            }else{
                $lastInsertedId = $leads->id;
            }
            
            if ($request->hasFile('slider_image')) {
                foreach ($request->file('slider_image') as $key => $file) {
                    $validate1['directory_id'] = $lastInsertedId;
                    $validate1['image'] = Helper::uploadImage($file, DirectorySlider::IMAGE_PATH);
                    $slider_image_data = new DirectorySlider();
                    $slider_image_data->fill( $validate1 );
                    $slider_image_data->save();
                }
            }
            
            if ($request->hasFile('gallery_image')) {
                foreach ($request->file('gallery_image') as $key1 => $file1) {
                    $validate2['directory_id'] = $lastInsertedId;
                    $validate2['image'] = Helper::uploadImage($file1, DirectoryGallery::IMAGE_PATH);
                    $gallery_image_data = new DirectoryGallery();
                    $gallery_image_data->fill( $validate2 );
                    $gallery_image_data->save();
                }
            }
            
            if ($request->hasFile('catalogue_pdf')) {
                $names_array = $request->input('catalogue_name');
                foreach ($request->file('catalogue_pdf') as $key3 => $file1) {
                    $validate3['directory_id'] = $lastInsertedId;
                    $validate3['name'] = $names_array[$key3];
                    $validate3['image'] = Helper::uploadImage($file1, DirectoryCataloguePdf::IMAGE_PATH);
                    $catalogue_data = new DirectoryCataloguePdf();
                    $catalogue_data->fill( $validate3 );
                    $catalogue_data->save();
                }
            }
            
//            if ($request->edit_id) {
//                return response()->json(['isReload' => 'edit/'.$lastInsertedId.'','message' => ($request->edit_id) ? 'Update successfully' : 'Added successfully'], 200);
//            }else{
//                return response()->json(['isReload' => 'directory/edit/'.$lastInsertedId.'','message' => ($request->edit_id) ? 'Update successfully' : 'Added successfully'], 200);
//            }
//            isReload
//            return redirect()->route();
            
//            return redirect()->route('admin.directory.edit',$lastInsertedId);
//            return redirect()->route('edit/1')->with('message', 'Your action was successful!');
//            Session::flash('message', 'Update successfully');
//            return response()->json(['isReload' => 'admin.directory.list','message' => ($request->edit_id) ? 'Update successfully' : 'Added successfully'], 200);
    
//            return response()->json(['message' => ($request->edit_id) ? 'Update successfully' : 'Added successfully'], 200)->header('Location', route('directory/edit/1'));
//            return redirect()->route('admin.directory.edit',$lastInsertedId)->with(['message' => ($request->edit_id) ? 'Update successfully' : 'Added successfully'], 200);
            
            return response()->json(['message' => ($request->edit_id) ? 'Update successfully' : 'Added successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }

    public function view($id)
    {
        $data = Directory::with('categories','category', 'sub_category')->findOrFail($id);
//        $data = Directory::findOrFail($id);

        return view('admin.directory.view', compact('data'));
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
            $obj = Directory::where('id', request('id'))->limit(1)->first();
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
            $obj = Directory::where('id', request('id'))->limit(1)->first();
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
    public function delete_slider_image(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }
        try {
            $obj = DirectorySlider::where('id', request('imageID'))->limit(1)->first();
            if ($obj) {
                $delete = $obj->delete();
            }

            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }
    public function delete_gallery_image(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }
        try {
            $obj = DirectoryGallery::where('id', request('imageID'))->limit(1)->first();
            if ($obj) {
                $delete = $obj->delete();
            }

            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }
    public function delete_catalogue_pdf(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }
        try {
            $obj = DirectoryCataloguePdf::where('id', request('imageID'))->limit(1)->first();
            if ($obj) {
                $delete = $obj->delete();
            }

            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }
}
