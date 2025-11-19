<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use DataTables;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Helper\Helper;

class FaqControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = Faq::select('id', 'title', 'description','image');

            if (! $request->has('order')) {
                $query->orderBy('id', 'desc');
            }

            return DataTables::of($query)
                ->editColumn('description', function ($row) {
                    return mb_strimwidth(strip_tags($row->description), 0, 100, '...');
                })
                ->addColumn('action', function ($row) {
                    $editRoute   = "<a href='".route('admin.faq.edit',$row->id)."' class='btn btn-icon btn-outline-brand btn-sm' title='Edit details'><i class='la la-edit'></i></a>&nbsp";
                    $deleteRoute = "<a href='".route('admin.faq.delete')."' data-id='".$row->id."' class='delete-record btn btn-icon btn-outline-danger btn-sm' title='Delete'><i class='la la-trash'></i></a>&nbsp;";
                    
                    return "{$editRoute}{$deleteRoute}";
                })
                ->rawColumns(['description', 'action'])
                ->make(true);
        }

        return view('admin.faq.list');
    }

    public function add($id = null)
    {
        $data = null;
        if ($id) {
            $data = Faq::select('id','image', 'title', 'description')->findOrFail($id);
        }

        return view('admin.faq.add', compact('data'));
    }

    public function store(Request $request)
    {
        $request->validate([
             'title' => "required",
//            'image' => 'required_without:edit_id|max:2060|'.Helper::mimesFileValidation('image'),
            'description' => 'required|string',
        ],[
//            'image.max' => 'The image field must not be greater than 2MB.',
        ]);

        try {
            $validate = $request->only('title', 'description');

//            if ($request->hasFile('image')) {
//                $validate['image'] = Helper::uploadImage($request->image, Faq::IMAGE_PATH);
//            }

            $obj = ($request->edit_id) ? Faq::where('id', $request->edit_id)->first() : new Faq;
            $obj->fill($validate);
            $obj->save();

            Cache::forget('faq');

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
            $delete = Faq::where('id', request('id'))->limit(1)->delete();
            Cache::forget('faq');

            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }
}
