<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\HomeSlider;
use DataTables;
use Illuminate\Http\Request;

class HomeSliderControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = HomeSlider::select('id', 'name','image','status');

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
                    $editRoute   = "<a href='".route('admin.home_slider.edit',$row->id)."' class='btn btn-icon btn-outline-brand btn-sm' title='Edit details'><i class='la la-edit'></i></a>&nbsp";
                    $deleteRoute = "<a href='".route('admin.home_slider.delete')."' data-id='".$row->id."' class='delete-record btn btn-icon btn-outline-danger btn-sm' title='Delete'><i class='la la-trash'></i></a>&nbsp;";

                    return "{$editRoute}{$deleteRoute}";
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('admin.home-slider.list');
    }

    public function add($id = null)
    {
        $data = null;
        if ($id) {
            $data = HomeSlider::select('id', 'image','status')->where('id',$id)->first();
        }

        return view('admin.home-slider.add', compact('data'));
    }

    public function store(Request $request)
    {
       

        try {
            $validate = $request->only('image','status');

            if(isset($request->edit_id)){
             
                $validate['status'] = $request->has('status') ? $request->get('status') : 0;
                if ($request->hasFile('image')) {
                    $validate['image'] = Helper::uploadImage($request->image, HomeSlider::IMAGE_PATH);
                }
                $obj = ($request->edit_id) ? HomeSlider::where('id', $request->edit_id)->first() : new HomeSlider;
                $obj->fill($validate);
                $obj->save();
            }else{
                
                $validate['status'] = $request->has('status') ? $request->get('status') : 0;
                if ($request->hasFile('image')) {
                    $validate['image'] = Helper::uploadImage($request->image, HomeSlider::IMAGE_PATH);
                }
                $obj = new HomeSlider;
                $obj->fill($validate);
                $obj->save();
                
                
                if (null !== $request->file('image1')) {
                   foreach ($request->file('image1') as $image) {
                        if($image != "" && $image != NULL){
                            $validate['status'] = $request->has('status') ? $request->get('status') : 0;
                            $validate['image'] = Helper::uploadImage($image, HomeSlider::IMAGE_PATH);
                            $obj = new HomeSlider;
                            $obj->fill($validate);
                            $obj->save();
                        }
                    } 
                }
            }
            
            return response()->json(['message' => ($request->edit_id) ? 'Update successfully' : 'Added successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }

    public function view($id)
    {
        $data = HomeSlider::findOrFail($id);

        return view('admin.home-slider.view', compact('data'));
    }

    public function statusChange(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }

        $request->validate([
            'id' => 'required|exists:home_slider,id',
            'status' => 'required',
        ]);

        try {
            $obj = HomeSlider::where('id', request('id'))->limit(1)->first();
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
            $obj = HomeSlider::where('id', request('id'))->limit(1)->first();
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
