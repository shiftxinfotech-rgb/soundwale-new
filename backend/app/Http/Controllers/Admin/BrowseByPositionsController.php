<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\BrowseByPositions;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use Illuminate\Validation\Rule;

class BrowseByPositionsController extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = BrowseByPositions::select('id', 'title','sequence','image','description','status');

            if (! $request->has('order')) {
                $query->orderBy('sequence', 'asc');
            }

            return DataTables::of($query)
                ->addColumn('action', function ($row) {
                    $editRoute = "<a href='".route('admin.browse.by.positions.edit', $row->id)."' class='btn btn-sm btn-clean btn-icon' title='Edit details'><i class='flaticon2-pen'></i></a>";
                    $deleteRoute = "<a href='".route('admin.browse.by.positions.delete')."' data-id='".$row->id."'  data-title='Delete ?' data-text='Are you sure you want to delete ?' class='btn btn-sm btn-clean btn-icon delete-record' title='Delete'><i class='flaticon2-trash'></i></a>";

                    return "{$editRoute}{$deleteRoute}";
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('admin.browse-by-positions.list');
    }

    public function add($id = null)
    {
        $data = null;
        if ($id) {
            $data = BrowseByPositions::select('id', 'title', 'image','description', 'sequence','status')->findOrFail($id);
        }

        return view('admin.browse-by-positions.add', compact('data'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => "required|string|max:150|unique:browse_by_positions,title,{$request->edit_id}",
            'image' => 'required_without:edit_id|max:2048|'.Helper::mimesFileValidation('image'),
             'sequence' => [
                'required',
                'numeric',
                Rule::unique('browse_by_positions')->ignore($request->edit_id),
            ],
        ], [
            'image.max' => 'The image field must not be greater than 2MB.',
        ]);

        try {
            $validate = $request->only('title', 'sequence','description','status');

            if ($request->hasFile('image')) {
                $validate['image'] = Helper::uploadImage($request->image, BrowseByPositions::IMAGE_PATH);
            }

            $validate['status'] = $request->has('status') ? $request->get('status') : 0;
            $obj = ($request->edit_id) ? BrowseByPositions::where('id', $request->edit_id)->first() : new BrowseByPositions;
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
            'id' => 'required|exists:browse_by_positions,id',
            'status' => 'required',
        ]);

        try {
            $obj = BrowseByPositions::where('id', request('id'))->limit(1)->first();
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

            $obj = BrowseByPositions::where('id', request('id'))->limit(1)->first();
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
