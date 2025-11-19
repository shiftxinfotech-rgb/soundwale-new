<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\Role;
use DataTables;
use Illuminate\Http\Request;

class RoleControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = Role::select('id', 'name','image','selected_image','description','status');

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
                    $editRoute   = "<a href='".route('admin.role.edit',$row->id)."' class='btn btn-icon btn-outline-brand btn-sm' title='Edit details'><i class='la la-edit'></i></a>&nbsp";
                    $deleteRoute = "<a href='".route('admin.role.delete')."' data-id='".$row->id."' data-title='Delete ?' data-text='Are you sure you want to delete?' class='btn btn-sm btn-clean btn-icon delete-record' title='Delete'><i class='flaticon2-trash'></i></a>";

                    return "{$editRoute}";
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('admin.role.list');
    }

    public function add($id = null)
    {
        $data = null;
        if ($id) {
            $data = Role::select('id', 'image','selected_image', 'name','description','status')->where('id',$id)->first();
        }

        return view('admin.role.add', compact('data'));
    }

    public function store(Request $request)
    {
       

        try {
            $validate = $request->only('name','description','image','selected_image','status');

            if(isset($request->edit_id)){
             
//                $validate['status'] = $request->has('status') ? $request->get('status') : 0;
                
                if ($request->hasFile('image')) {
                    $validate['image'] = Helper::uploadImage($request->image, Role::IMAGE_PATH);
                }
                if ($request->hasFile('selected_image')) {
                    $validate['selected_image'] = Helper::uploadImage($request->selected_image, Role::IMAGE_PATH);
                }
                $obj = ($request->edit_id) ? Role::where('id', $request->edit_id)->first() : new Role;
                $obj->fill($validate);
                $obj->save();
            }else{
                
                $validate['status'] = $request->has('status') ? $request->get('status') : 0;
                $obj = ($request->edit_id) ? Role::where('id', $request->edit_id)->first() : new Role;
                $obj->fill($validate);
                $obj->save();
                
                if(isset($request->name1)){
                    if (count($request->name1) > 0) {
                        foreach($request->name1 as $name_row){
                            if($name_row != ""){
                                $validate['name'] = $name_row;
                                $validate['status'] = $request->has('status') ? $request->get('status') : 0;
                                $obj = ($request->edit_id) ? Role::where('id', $request->edit_id)->first() : new Role;
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
        $data = Role::findOrFail($id);

        return view('admin.role.view', compact('data'));
    }

    public function statusChange(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }

        $request->validate([
            'id' => 'required|exists:role,id',
            'status' => 'required',
        ]);

        try {
            $obj = Role::where('id', request('id'))->limit(1)->first();
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
            $obj = Role::where('id', request('id'))->limit(1)->first();
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
