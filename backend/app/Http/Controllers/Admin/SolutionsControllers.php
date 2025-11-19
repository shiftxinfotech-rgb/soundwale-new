<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Solutions;
use DataTables;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Helper\Helper;

class SolutionsControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = Solutions::select('id', 'title', 'description','image');

            if (! $request->has('order')) {
                $query->orderBy('id', 'desc');
            }

            return DataTables::of($query)
                ->editColumn('description', function ($row) {
                    return mb_strimwidth(strip_tags($row->description), 0, 100, '...');
                })
                ->addColumn('action', function ($row) {
                    $editRoute = "<a href='".route('admin.solutions.edit', $row->id)."' class='btn btn-sm btn-clean btn-icon' title='Edit details'><i class='flaticon2-pen'></i></a>";
                    $deleteRoute = "<a href='".route('admin.solutions.delete')."' data-id='".$row->id."' data-title='Delete ?' data-text='Are you sure you want to delete ?' class='btn btn-sm btn-clean btn-icon delete-record' title='Delete'><i class='flaticon2-trash'></i></a>&nbsp;";

                    return "{$editRoute}{$deleteRoute}";
                })
                ->rawColumns(['description', 'action'])
                ->make(true);
        }

        return view('admin.solutions.list');
    }

    public function add($id = null)
    {
        $data = null;
        if ($id) {
            $data = Solutions::select('id','image', 'title', 'description')->findOrFail($id);
        }

        return view('admin.solutions.add', compact('data'));
    }

    public function store(Request $request)
    {
        $request->validate([
            // 'title' => "required",
            'image' => 'required_without:edit_id|max:2060|'.Helper::mimesFileValidation('image'),
            'description' => 'required|string',
        ],[
            'image.max' => 'The image field must not be greater than 2MB.',
        ]);

        try {
            $validate = $request->only('title', 'description');

            if ($request->hasFile('image')) {
                $validate['image'] = Helper::uploadImage($request->image, Solutions::IMAGE_PATH);
            }

            $obj = ($request->edit_id) ? Solutions::where('id', $request->edit_id)->first() : new Solutions;
            $obj->fill($validate);
            $obj->save();

            Cache::forget('solutions');

            return response()->json(['message' => ($request->edit_id) ? 'Update successfully' : 'Added successfully'], 200);
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
            $delete = Solutions::where('id', request('id'))->limit(1)->delete();
            Cache::forget('solutions');

            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }
}
