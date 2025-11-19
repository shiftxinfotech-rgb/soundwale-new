<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\HomeSliders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;
use Yajra\DataTables\DataTables;

class HomeSlidersController extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = HomeSliders::select('id', 'image', 'title', 'sequence', 'status');

            if (! $request->has('order')) {
                $query->orderBy('sequence', 'asc');
            }

            return DataTables::of($query)
                ->addColumn('action', function ($row) {
                    $editRoute = "<a href='".route('admin.home.slider.edit', $row->id)."' class='btn btn-sm btn-clean btn-icon' data-toggle='kt-popover' title='' data-content='And here some amazing content. Its very engaging. Right?' data-original-title='Popover title'><i class='flaticon2-pen'></i></a>";
                    $deleteRoute = "<a href='".route('admin.home.slider.delete')."' data-id='".$row->id."' data-title='Delete ?' data-text='Are you sure you want to delete ?' class='btn btn-sm btn-clean btn-icon delete-record' title='Delete'><i class='flaticon2-trash'></i></a>&nbsp;";

                    return "{$editRoute}{$deleteRoute}";
                })
                ->rawColumns(['action', 'image'])
                ->make(true);
        }

        return view('admin.home-slider.list');
    }

    public function add($id = null)
    {
        $data = null;
        if ($id) {
            $data = HomeSliders::select('id', 'image', 'sequence','description','text', 'title', 'status')->findOrFail($id);
        }

        return view('admin.home-slider.add', compact('data'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required_without:edit_id|max:2060|'.Helper::mimesFileValidation('image'),
            'text' => 'required',
            'title' => 'required',
        ], [
            'image.max' => 'The image field must not be greater than 2MB.',
        ]);
        try {
            $validate = $request->only('sequence', 'title','description', 'text');

            if ($request->hasFile('image')) {
                $validate['image'] = Helper::uploadImage($request->image, HomeSliders::IMAGE_PATH);
            }

            $validate['status'] = $request->has('status') ? $request->get('status') : 0;
            $obj = ($request->edit_id) ? HomeSliders::where('id', $request->edit_id)->first() : new HomeSliders;
            $obj->fill($validate);
            $obj->save();

            Cache::forget('home-slider');

            return response()->json(['message' => ($request->edit_id) ? ' update successfully' : ' added successfully'], 200);
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
            'id' => 'required|exists:home_sliders,id',
            'status' => 'required',
        ]);

        try {
            $obj = HomeSliders::where('id', request('id'))->limit(1)->first();
            if ($obj) {
                $obj->status = ($request->status == 'true') ? 1 : 0;
                $obj->save();
            }
            Cache::forget('home-slider');

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
            $obj = HomeSliders::where('id', request('id'))->limit(1)->first();
            if ($obj) {
                $delete = $obj->delete();
            }
            Cache::forget('home-slider');

            return response()->json(['message' => ' Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }
}
