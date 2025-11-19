<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\UserVideo;
use DataTables;
use Illuminate\Http\Request;

class ShortsControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = UserVideo::select('register_video.id','register_video.description', 'register_video.created_at', 'register_video.status', 'register_video.user_id', 'register_video.video', 'register.name as user_name')
            ->join('register', 'register_video.user_id', '=', 'register.id')
            ->latest();
            $query = $query->latest();


            return DataTables::of($query)
                ->addColumn('action', function ($row) {
//                    $viewRoute = "<a href='".route('admin.shorts.view', $row->id)."' class='btn btn-sm btn-clean btn-icon'  title='View details'><i class='flaticon-eye fa-lg'></i></a>";
//                    $editRoute = "<a href='".route('admin.shorts.edit', $row->id)."' class='btn btn-sm btn-clean btn-icon' title='Edit details'><i class='flaticon2-pen'></i></a>";
                    $deleteRoute = "<a href='".route('admin.shorts.delete')."' data-id='".$row->id."' data-title='Delete ?' data-text='Are you sure you want to delete?' class='btn btn-sm btn-clean btn-icon delete-record' title='Delete'><i class='flaticon2-trash'></i></a>";

                    return "{$deleteRoute}";
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('admin.shorts.list');
    }


    public function statusChange(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }

        $request->validate([
            'id' => 'required|exists:register_video,id',
            'status' => 'required',
        ]);

        try {
            $obj = UserVideo::where('id', request('id'))->limit(1)->first();
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
            $obj = UserVideo::where('id', request('id'))->limit(1)->first();
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
