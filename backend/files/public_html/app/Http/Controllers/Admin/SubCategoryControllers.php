<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\Category;
use App\Models\SubCategory;
use DataTables;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SubCategoryControllers extends Controller
{
    public function list(Request $request)
    {
        if($request->method() == 'POST'){
            $query = SubCategory::select('sub_category.id', 'sub_category.name', 'sub_category.status', 'sub_category.created_at', 'category.name as category_name')
            ->join('category', 'sub_category.category_id', '=', 'category.id')
            ->latest();
            $query = $query->latest();

            return DataTables::of($query)

            ->addColumn('action', function($row){
                $editRoute   = "<a href='".route('admin.sub.category.edit',$row->id)."' class='btn btn-icon btn-outline-brand btn-sm' title='Edit details'><i class='la la-edit'></i></a>&nbsp";
                $deleteRoute = "<a href='".route('admin.sub.category.delete')."' data-id='".$row->id."' class='delete-record btn btn-icon btn-outline-danger btn-sm' title='Delete'><i class='la la-trash'></i></a>&nbsp;";

                $editRoute   = $editRoute ? $editRoute : null;
                $deleteRoute = $deleteRoute ? $deleteRoute : null;

                return "{$editRoute}{$deleteRoute}";
            })
            ->rawColumns(['action'])
            ->make(true);
        }

        return view('admin.sub-category.list');
    }

    public function add($id = null)
    {
        $data = null;
        $category = Category::select('id', 'name')->where('status', 1)->latest()->get();
        if ($id) {
            $data = SubCategory::select('id', 'image', 'name','status','category_id')->where('id',$id)->first();
        }

        return view('admin.sub-category.add', compact('data','category'));
    }

    public function store(Request $request)
    {
//        $request->validate([
//            'category_id' => 'required|exists:category,id',
//            'name' => [
//                'required',
//                Rule::unique('sub_category')
//                    ->where(fn ($query) => $query->where('category_id', $request->category_id))
//                    ->ignore($request->edit_id),
//            ],
//        ]);
        $request->validate([
            'category_id' => 'required|exists:category,id',
            'name' => [
                'required',
                Rule::unique('sub_category','name')
                ->where(fn ($query) => $query->where('category_id', $request->category_id))
                ->ignore($request->edit_id),
            ],
            'name1' => 'nullable|array',
            'name1.*' => [
                Rule::unique('sub_category','name')
                ->where(fn ($query) => $query->where('category_id', $request->category_id))
                ->ignore($request->edit_id),
            ],
        ], [
            'name1.*.unique'   => '":input" already exists in the sub category list.', // Dynamic value shown
        ]);
        try {
            $validate = $request->only('name','category_id');

            if(isset($request->edit_id)){
             
                $validate['status'] = $request->has('status') ? $request->get('status') : 0;
                $obj = ($request->edit_id) ? SubCategory::where('id', $request->edit_id)->first() : new SubCategory;
                $obj->fill($validate);
                $obj->save();
            }else{
                
                $validate['status'] = $request->has('status') ? $request->get('status') : 0;
                $obj = ($request->edit_id) ? SubCategory::where('id', $request->edit_id)->first() : new SubCategory;
                $obj->fill($validate);
                $obj->save();
                
                if(isset($request->name1)){
                    if (count($request->name1) > 0) {
                        foreach($request->name1 as $name_row){
                            if($name_row != ""){
                                $validate['name'] = $name_row;
                                $validate['status'] = $request->has('status') ? $request->get('status') : 0;
                                $obj = ($request->edit_id) ? SubCategory::where('id', $request->edit_id)->first() : new SubCategory;
                                $obj->fill($validate);
                                $obj->save();
                            }
                        }
                    }
                }
            }
            
            return response()->json(['message' => ($request->edit_id) ? 'Update successfully' : 'Added successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }

    public function view($id)
    {
        $data = SubCategory::findOrFail($id);

        return view('admin.sub-category.view', compact('data'));
    }

    public function statusChange(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }

        $request->validate([
            'id' => 'required',
            'status' => 'required',
        ]);

        try {
            $obj = SubCategory::where('id', request('id'))->limit(1)->first();
            if ($obj) {
                $statuss = ($request->status == 'true') ? 1 : 0;
                if($statuss == 1){
                   $obj->user_id = 0; 
                }
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
            $obj = SubCategory::where('id', request('id'))->limit(1)->first();
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
