<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\Register;
use App\Models\Catalogue;
use App\Models\Category;
use App\Jobs\ProcessPdfUpload;
use DataTables;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CatalogueControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = Catalogue::select('catalogue.id', 'catalogue.image', 'catalogue.other_details','catalogue.status','catalogue.created_at', 'register.name as user_name')
            ->join('register', 'catalogue.user_id', '=', 'register.id')
            ->latest();
            $query = $query->latest();
            
            return DataTables::of($query)
                ->addColumn('action', function ($row) {
                    $editRoute = "<a href='".route('admin.catalogue.edit', $row->id)."'class='btn btn-sm btn-clean btn-icon' title='Edit details'><i class='flaticon2-pen'></i></a>";
                    $deleteRoute = "<a href='".route('admin.catalogue.delete')."' data-id='".$row->id."' data-title='Delete ?' data-text='Are you sure you want to delete ?' class='btn btn-sm btn-clean btn-icon delete-record' title='Delete'><i class='flaticon2-trash'></i></a>";

                    return "{$editRoute}{$deleteRoute}";
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('admin.catalogue.list');
    }

    public function add($id = null)
    {
        $data = null;
        $register = Register::select('id', 'name')->where('status', 1)->latest()->get();
        if ($id) {
            $data = Catalogue::select('id','image','name','user_id','other_details','status')->findOrFail($id);
        }

        return view('admin.catalogue.add', compact('data','register'));
    }

    public function store(Request $request)
    {
        $request->validate([], []);

        try {
            $validate = $request->only('image','name','user_id','other_details','status');
            if ($request->hasFile('image')) {
                $validate['image'] = Helper::uploadImage($request->image, Catalogue::IMAGE_PATH);
            }
            $validate['status'] = $request->has('status') ? $request->get('status') : 1;
            $obj = ($request->edit_id) ? Catalogue::where('id', $request->edit_id)->first() : new Catalogue;
            $obj->fill($validate);
            $obj->save();

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
            'id' => 'required|exists:catalogue,id',
            'status' => 'required',
        ]);

        try {
            $obj = Catalogue::where('id', request('id'))->limit(1)->first();
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
            $obj = Catalogue::where('id', request('id'))->limit(1)->first();
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
