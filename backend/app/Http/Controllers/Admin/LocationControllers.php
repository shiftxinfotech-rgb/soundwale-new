<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\Location;
use DataTables;
use Illuminate\Http\Request;

class LocationControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = Location::select('id', 'name', 'status');

            if (! $request->has('order')) {
                $query->orderBy('id', 'desc');
            }

            return DataTables::of($query)
                ->addColumn('action', function ($row) {
                    $viewRoute = "<a href='".route('admin.location.view', $row->id)."' class='btn btn-icon btn-outline-success btn-sm' title='View details'><i class='la la-eye'></i></a>&nbsp";
                    $editRoute = "<a href='".route('admin.location.edit', $row->id)."' class='btn btn-icon btn-outline-brand btn-sm' title='Edit details'><i class='la la-edit'></i></a>&nbsp";
                    $deleteRoute = "<a href='".route('admin.location.delete')."' data-id='".$row->id."' data-title='Delete ?' data-text='Are you sure you want to delete ?' class='delete-record btn btn-icon btn-outline-danger btn-sm' title='Delete'><i class='la la-trash'></i></a>&nbsp;";

                    return "{$editRoute}{$deleteRoute}";
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('admin.locations.list');
    }

    public function add($id = null)
    {
        $data = null;
        if ($id) {
            $data = Location::select('id','name','status')->findOrFail($id);
        }

        return view('admin.locations.add', compact('data'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => "required|string|max:150|unique:location,name,{$request->edit_id}",
        ], [
        ]);

        try {
            $validate = $request->only('name', 'status');

            $validate['status'] = $request->has('status') ? $request->get('status') : 1;
            $obj = ($request->edit_id) ? Location::where('id', $request->edit_id)->first() : new Location;
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
        $data = Location::findOrFail($id);

        return view('admin.locations.view', compact('data'));
    }

    public function statusChange(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }

        $request->validate([
            'id' => 'required|exists:location,id',
            'status' => 'required',
        ]);

        try {
            $obj = Location::where('id', request('id'))->limit(1)->first();
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
            $obj = Location::where('id', request('id'))->limit(1)->first();
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
