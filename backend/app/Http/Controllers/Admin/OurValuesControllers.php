<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OurValues;
use DataTables;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Helper\Helper;

class OurValuesControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = OurValues::select('id', 'title', 'description','image');

            if (! $request->has('order')) {
                $query->orderBy('id', 'desc');
            }

            return DataTables::of($query)
                ->editColumn('description', function ($row) {
                    return mb_strimwidth(strip_tags($row->description), 0, 100, '...');
                })
                ->addColumn('action', function ($row) {
                    $editRoute = "<a href='".route('admin.our.values.edit', $row->id)."' class='btn btn-sm btn-clean btn-icon' title='Edit details'><i class='flaticon2-pen'></i></a>";
                    $deleteRoute = "<a href='".route('admin.our.values.delete')."' data-id='".$row->id."' data-title='Delete Our Values?' data-text='Are you sure you want to delete Our Values?' class='btn btn-sm btn-clean btn-icon delete-record' title='Delete'><i class='flaticon2-trash'></i></a>&nbsp;";

                    return "{$editRoute}{$deleteRoute}";
                })
                ->rawColumns(['description', 'action'])
                ->make(true);
        }

        return view('admin.our-values.list');
    }

    public function add($id = null)
    {
        $data = null;
        if ($id) {
            $data = OurValues::select('id', 'title', 'description','image')->findOrFail($id);
        }

        return view('admin.our-values.add', compact('data'));
    }

    public function store(Request $request)
    {
        $request->validate([
            // 'title' => "required",
            'image' => 'required_without:edit_id|max:2048|'.Helper::mimesFileValidation('image'),
            'description' => 'required|string',
        ],[
            'image.max' => 'The image field must not be greater than 2MB.',
        ]);

        try {
            $validate = $request->only('title', 'description');

            if ($request->hasFile('image')) {
                $validate['image'] = Helper::uploadImage($request->image, OurValues::IMAGE_PATH);
            }

            $obj = ($request->edit_id) ? OurValues::where('id', $request->edit_id)->first() : new OurValues;
            $obj->fill($validate);
            $obj->save();

            Cache::forget('our_values');

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
            $delete = OurValues::where('id', request('id'))->limit(1)->delete();
            Cache::forget('our_values');

            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }
}
