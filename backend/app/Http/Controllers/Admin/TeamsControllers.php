<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\Teams;
use DataTables;
use Illuminate\Http\Request;

class TeamsControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = Teams::select('id', 'name', 'country_code', 'designation', 'image', 'image_2','sequence','status','home_status');

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
                    $viewRoute = "<a href='".route('admin.teams.view', $row->id)."' class='btn btn-sm btn-clean btn-icon'  title='View details'><i class='flaticon-eye fa-lg'></i></a>";
                    $editRoute = "<a href='".route('admin.teams.edit', $row->id)."' class='btn btn-sm btn-clean btn-icon' title='Edit details'><i class='flaticon2-pen'></i></a>";
                    $deleteRoute = "<a href='".route('admin.teams.delete')."' data-id='".$row->id."' data-title='Delete ?' data-text='Are you sure you want to delete?' class='btn btn-sm btn-clean btn-icon delete-record' title='Delete'><i class='flaticon2-trash'></i></a>";

                    return "{$editRoute}{$viewRoute}{$deleteRoute}";
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('admin.teams.list');
    }

    public function add($id = null)
    {
        $data = null;
        if ($id) {
            $data = Teams::select('id', 'image', 'name', 'country_code', 'designation', 'image_2', 'message', 'sequence','status')->where('id',$id)->first();
        }

        return view('admin.teams.add', compact('data'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required_without:edit_id|max:2048|'.Helper::mimesFileValidation('image'),

        ], [
            'image.max' => 'The Icon field must not be greater than 2MB.',
        ]);

        try {
            $validate = $request->only('name', 'country_code', 'designation', 'message', 'sequence','status');

            if ($request->hasFile('image')) {
                $validate['image'] = Helper::uploadImage($request->image, Teams::IMAGE_PATH);
            }
            if ($request->hasFile('image_2')) {
                $validate['image_2'] = Helper::uploadImage($request->image_2, Teams::IMAGE_PATH);
            }
            $validate['status'] = $request->has('status') ? $request->get('status') : 0;
            $obj = ($request->edit_id) ? Teams::where('id', $request->edit_id)->first() : new Teams;
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
        $data = Teams::findOrFail($id);

        return view('admin.teams.view', compact('data'));
    }

    public function statusChange(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }

        $request->validate([
            'id' => 'required|exists:teams,id',
            'status' => 'required',
        ]);

        try {
            $obj = Teams::where('id', request('id'))->limit(1)->first();
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
    public function HomeStatusChange(Request $request)
    {
        if (!$request->ajax()) {
            return abort(404);
        }

        $request->validate([
            'id' => 'required|exists:teams,id',
            'home_status' => 'required',
        ]);

        try {
            $service = Teams::find($request->id);
            $currentStatus = $service->home_status;

            $currentHomeCount = Teams::where('home_status', 1)->count();

            if ($request->home_status && $currentStatus == 0) {
                // Check if adding this service would exceed the limit of 6
                if ($currentHomeCount >= 3) {
                    return response()->json(['message' => 'Only 3 Why Choose Us can be set to show on the home page.'], 500);
                }
            }

            // Update the home_page status
            $service->home_status = $request->home_status == 'true' ? 1 : 0;
            $service->save();

            return response()->json(['message' => 'Status updated successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! Something went wrong, please try again later'], 500);
        }
    }
    public function delete(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }
        try {
            $obj = Teams::where('id', request('id'))->limit(1)->first();
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
