<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\Leaders;
use DataTables;
use Illuminate\Http\Request;

class LeadersControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = Leaders::select('id', 'image','title','status');

            if (! $request->has('order')) {
                $query->orderBy('id', 'desc');
            }
            return DataTables::of($query)
                ->addColumn('action', function ($row) {
                    $editRoute = "<a href='".route('admin.leaders.edit', $row->id)."'class='btn btn-sm btn-clean btn-icon' title='Edit details'><i class='flaticon2-pen'></i></a>";
                    $deleteRoute = "<a href='".route('admin.leaders.delete')."' data-id='".$row->id."' data-title='Delete ?' data-text='Are you sure you want to delete ?' class='btn btn-sm btn-clean btn-icon delete-record' title='Delete'><i class='flaticon2-trash'></i></a>";

                    return "{$editRoute}{$deleteRoute}";
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('admin.leaders.list');
    }

    public function add($id = null)
    {
        $data = null;
        if ($id) {
            $data = Leaders::select('id','image','title','description','status')->findOrFail($id);
        }

        return view('admin.leaders.add', compact('data'));
    }

    public function store(Request $request)
    {
        $request->validate([
        ], [
        ]);

        try {
            $validate = $request->only('status','title','description');
            if ($request->hasFile('image')) {
                $validate['image'] = Helper::uploadImage($request->image, Leaders::IMAGE_PATH);
            }
            $validate['status'] = $request->has('status') ? $request->get('status') : 1;
            $obj = ($request->edit_id) ? Leaders::where('id', $request->edit_id)->first() : new Leaders;
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
            'id' => 'required|exists:leaders,id',
            'status' => 'required',
        ]);

        try {
            $obj = Leaders::where('id', request('id'))->limit(1)->first();
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
            $obj = Leaders::where('id', request('id'))->limit(1)->first();
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
