<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Categories;
use App\Models\SubCategory;
use DataTables;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CategoryControllers extends Controller
{
    public function list(Request $request)
    {
        if($request->method() == 'POST'){
            
            $query = Category::select('id', 'name','image','status');
            if (! $request->has('order')) {
                $query->orderBy('id', 'desc');
            }
            
            return DataTables::of($query)

            ->addColumn('action', function($row){
                $editRoute   = "<a href='".route('admin.category.edit',$row->id)."' class='btn btn-icon btn-outline-brand btn-sm' title='Edit details'><i class='la la-edit'></i></a>&nbsp";
                $deleteRoute = "<a href='".route('admin.category.delete')."' data-id='".$row->id."' class='delete-record btn btn-icon btn-outline-danger btn-sm' title='Delete'><i class='la la-trash'></i></a>&nbsp;";

                $editRoute   = $editRoute ? $editRoute : null;
                $deleteRoute = $deleteRoute ? $deleteRoute : null;

                return "{$editRoute}{$deleteRoute}";
            })
            ->rawColumns(['action'])
            ->make(true);
        }

        return view('admin.category.list');
    }

    public function add($id = null)
    {
        $data = null;
        if ($id) {
            $data = Category::select('id', 'image', 'name','status')->where('id',$id)->first();
        }

        return view('admin.category.add', compact('data'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => [
                'required',
                Rule::unique('category', 'name')->ignore($request->edit_id),
            ],
            'name1' => 'nullable|array',
            'name1.*' => [
                Rule::unique('category', 'name'),
            ],
        ], [
            'name1.*.unique'   => '":input" already exists in the category list.', // Dynamic value shown
        ]);

        try {
            $validate = $request->only('name');

            if(isset($request->edit_id)){
             
                $validate['status'] = $request->has('status') ? $request->get('status') : 0;
                $obj = ($request->edit_id) ? Category::where('id', $request->edit_id)->first() : new Category;
                $obj->fill($validate);
                $obj->save();
            }else{
                
                $validate['status'] = $request->has('status') ? $request->get('status') : 0;
                $obj = ($request->edit_id) ? Category::where('id', $request->edit_id)->first() : new Category;
                $obj->fill($validate);
                $obj->save();
                
                if(isset($request->name1)){
                    if (count($request->name1) > 0) {
                        foreach($request->name1 as $name_row){
                            if($name_row != ""){
                                $validate['name'] = $name_row;
                                $validate['status'] = $request->has('status') ? $request->get('status') : 0;
                                $obj = ($request->edit_id) ? Category::where('id', $request->edit_id)->first() : new Category;
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
        $data = Category::findOrFail($id);

        return view('admin.category.view', compact('data'));
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
            $obj = Category::where('id', request('id'))->limit(1)->first();
            if ($obj) {
                $statuss = ($request->status == 'true') ? 1 : 0;
                if($statuss == 1){
                   $obj->user_id = 0; 
                }
                $obj->status = ($request->status == 'true') ? 1 : 0;
                $obj->save();
                $objs1 = SubCategory::where('category_id', request('id'))->update(['status' => $statuss]);
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
            $obj = Category::where('id', request('id'))->limit(1)->first();
            if ($obj) {
                $delete = $obj->delete();
                Subcategory::where('category_id', request('id'))->delete();
            }

            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }
}
