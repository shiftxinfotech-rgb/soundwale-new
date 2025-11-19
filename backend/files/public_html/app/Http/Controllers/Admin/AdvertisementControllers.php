<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\Advertisement;
use DataTables;
use Illuminate\Http\Request;

class AdvertisementControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = Advertisement::select('*')->latest();
            $query = $query->latest();


            return DataTables::of($query)
                ->addColumn('mobile_code', function ($row) {
                    return $row->code . ' ' . $row->mobile;
                })
                ->filterColumn('mobile_code', function($query, $keyword) {
                    // search both code and mobile
                    $query->whereRaw("CONCAT(code, '', mobile) like ?", ["%{$keyword}%"]);
                })    
                ->addColumn('action', function ($row) {
//                    $viewRoute = "<a href='".route('admin.advertisement.view', $row->id)."' class='btn btn-sm btn-clean btn-icon'  title='View details'><i class='flaticon-eye fa-lg'></i></a>";
//                    $editRoute = "<a href='".route('admin.advertisement.edit', $row->id)."' class='btn btn-sm btn-clean btn-icon' title='Edit details'><i class='flaticon2-pen'></i></a>";
                    $deleteRoute = "<a href='".route('admin.advertisement.delete')."' data-id='".$row->id."' data-title='Delete ?' data-text='Are you sure you want to delete?' class='btn btn-sm btn-clean btn-icon delete-record' title='Delete'><i class='flaticon2-trash'></i></a>";

                    return "{$deleteRoute}";
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('admin.advertisement.list');
    }

    public function add($id = null)
    {
        $data = null;
        if ($id) {
            $data = Advertisement::select('id', 'image', 'name','description','look_who_s_trending','our_top_pick','status')->where('id',$id)->first();
        }

        return view('admin.advertisement.add', compact('data'));
    }

    public function store(Request $request)
    {
        
        
        $data = $request->all();
       
        $request->validate([
            'image' => 'required_without:edit_id|max:2048|'.Helper::mimesFileValidation('image'),

        ], [
            'image.max' => 'The Icon field must not be greater than 2MB.',
        ]);

        try {
            $validate = $request->only('name','description','look_who_s_trending','our_top_pick','status');

            if ($request->hasFile('image')) {
                $validate['image'] = Helper::uploadImage($request->image, Advertisement::IMAGE_PATH);
            }
            $validate['status'] = $request->has('status') ? $request->get('status') : 0;
            $validate['look_who_s_trending'] = $request->has('look_who_s_trending') ? $request->get('look_who_s_trending') : 0;
            $validate['our_top_pick'] = $request->has('our_top_pick') ? $request->get('our_top_pick') : 0;
            $obj = ($request->edit_id) ? Advertisement::where('id', $request->edit_id)->first() : new Advertisement;
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
        $data = Advertisement::findOrFail($id);

        return view('admin.advertisement.view', compact('data'));
    }

    public function statusChange(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }

        $request->validate([
            'id' => 'required|exists:advertisement,id',
            'status' => 'required',
        ]);

        try {
            $obj = Advertisement::where('id', request('id'))->limit(1)->first();
            if ($obj) {
                $statuss = ($request->status == 'true') ? 1 : 0;
                $obj->status = ($request->status == 'true') ? 1 : 0;
                $obj->save();
//                $objs1 = Category::where('categories_id', request('id'))->update(['status' => $statuss]);
//                $objs2 = SubCategory::where('categories_id', request('id'))->update(['status' => $statuss]);
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
            $obj = Advertisement::where('id', request('id'))->limit(1)->first();
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
