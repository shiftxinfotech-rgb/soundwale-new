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

class CategoriesControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = Categories::select('id', 'name','description',Categories::raw("IF(look_who_s_trending = 1, 'Yes', 'No') as look_who_s_trending"),Categories::raw("IF(our_top_pick = 1, 'Yes', 'No') as our_top_pick"),'image','status');

            if (! $request->has('order')) {
                $query->orderBy('id', 'desc');
            }

            if ($request->has('status')) {
                $status = $request->get('status');
                if ($status == 'deleted') {
                    $query->deleted();
                }
            }

            return DataTables::of($query)
                ->addColumn('action', function ($row) {
                    $viewRoute   = "<a href='".route('admin.categories.view',$row->id)."' class='btn btn-icon btn-outline-brand btn-sm' title='View details'><i class='flaticon-eye fa-lg'></i></a>&nbsp";
                    $editRoute   = "<a href='".route('admin.categories.edit',$row->id)."' class='btn btn-icon btn-outline-brand btn-sm' title='Edit details'><i class='la la-edit'></i></a>&nbsp";
                    $deleteRoute = "<a href='".route('admin.categories.delete')."' data-id='".$row->id."' class='delete-record btn btn-icon btn-outline-danger btn-sm' title='Delete'><i class='la la-trash'></i></a>&nbsp;";
                    return "{$editRoute}{$viewRoute}{$deleteRoute}";
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('admin.categories.list');
    }

    public function add($id = null)
    {
        $data = null;
        if ($id) {
            $data = Categories::select('id', 'image', 'name','description','look_who_s_trending','our_top_pick','status')->where('id',$id)->first();
        }

        return view('admin.categories.add', compact('data'));
    }

    public function store(Request $request)
    {
        
        
        $data = $request->all();
       
        $request->validate([
            'name' => [
                'required',
                Rule::unique('categories', 'name')->ignore($request->edit_id),
            ],
            'image' => 'max:2048|'.Helper::mimesFileValidation('image'),

        ], [
            'image.max' => 'The Icon field must not be greater than 2MB.',
        ]);

        try {
            $validate = $request->only('name','description','look_who_s_trending','our_top_pick','status');

            if ($request->hasFile('image')) {
                $validate['image'] = Helper::uploadImage($request->image, Categories::IMAGE_PATH);
            }
            $validate['status'] = $request->has('status') ? $request->get('status') : 0;
            $validate['look_who_s_trending'] = $request->has('look_who_s_trending') ? $request->get('look_who_s_trending') : 0;
            $validate['our_top_pick'] = $request->has('our_top_pick') ? $request->get('our_top_pick') : 0;
            $obj = ($request->edit_id) ? Categories::where('id', $request->edit_id)->first() : new Categories;
            $obj->fill($validate);
            $obj->save();

            return response()->json(['message' => ($request->edit_id) ? 'Update successfully' : 'Added successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }

    public function view($id)
    {
        $data = Categories::findOrFail($id);

        return view('admin.categories.view', compact('data'));
    }

    public function statusChange(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }

        $request->validate([
            'id' => 'required|exists:categories,id',
            'status' => 'required',
        ]);

        try {
            $obj = Categories::where('id', request('id'))->limit(1)->first();
            if ($obj) {
                $statuss = ($request->status == 'true') ? 1 : 0;
                if($statuss == 1){
                   $obj->user_id = 0; 
                }
                $obj->status = ($request->status == 'true') ? 1 : 0;
                $obj->save();
//                $objs1 = Category::where('categories_id', request('id'))->update(['status' => $statuss]);
//                $objs2 = SubCategory::where('categories_id', request('id'))->update(['status' => $statuss]);
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
            $obj = Categories::where('id', request('id'))->limit(1)->first();
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
