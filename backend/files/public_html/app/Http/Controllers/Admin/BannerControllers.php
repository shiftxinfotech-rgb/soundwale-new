<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Yajra\DataTables\DataTables;
use Illuminate\Validation\Rule;
use App\Helper\Helper;

class BannerControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = Banner::select('id','page','title','image','description');

            if (! $request->has('order')) {
                $query->orderBy('id', 'asc');
            }

            return DataTables::of($query)
                ->editColumn('page', function ($row) {
                    return ucwords(str_replace('_', ' ', strtolower($row->page)));
                })
                ->addColumn('action', function ($row) {
                    $editRoute = "<a href='".route('admin.banners.edit', $row->id)."' class='btn btn-icon btn-outline-brand btn-sm' title='Edit details'><i class='la la-edit'></i></a>&nbsp";
                    $deleteRoute = "<a href='".route('admin.banners.delete')."' data-id='".$row->id."' data-title='Delete?' data-text='Are you sure you want to delete?' class='delete-record btn btn-icon btn-outline-danger btn-sm' title='Delete'><i class='la la-trash'></i></a>&nbsp;";

                    return "{$editRoute}{$deleteRoute}";
                })
                ->rawColumns(['action', 'image'])
                ->make(true);
        }

        return view('admin.banner.list');
    }

    public function add($id = null)
    {
        $data = null;
        if ($id) {
            $data = Banner::select('id','page','title','image','description')->findOrFail($id);
        }

        return view('admin.banner.add', compact('data'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required_without:edit_id|max:2048|'.Helper::mimesFileValidation('image'),
            'page' => 'required',
            'title' => 'required',
        ], [
            'image.max' => 'The image field must not be greater than 2MB.',
        ]);
        try {
            $validate = $request->only('page','title','description');

            if ($request->hasFile('image')) {
                $validate['image'] = Helper::uploadImage($request->image, Banner::IMAGE_PATH);
            }

            $validate['status'] = $request->has('status') ? $request->get('status') : 0;
            $obj = ($request->edit_id) ? Banner::where('id', $request->edit_id)->first() : new Banner;
            $obj->fill($validate);
            $obj->save();

            Cache::forget('banner');

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
            'id' => 'required|exists:banners,id',
            'status' => 'required',
        ]);

        try {
            $obj = Banner::where('id', request('id'))->limit(1)->first();
            if ($obj) {
                $obj->status = ($request->status == 'true') ? 1 : 0;
                $obj->save();
            }
            Cache::forget('banner');

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
            $obj = Banner::where('id', request('id'))->limit(1)->first();
            if ($obj) {
                $delete = $obj->delete();
            }
            Cache::forget('banner');

            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }
}
