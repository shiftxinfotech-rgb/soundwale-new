<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SubmitRole;
use App\Models\AdminNotification;
use DataTables;
use Illuminate\Http\Request;
use App\Models\OtherPageData;

class SubmitRoleControllers extends Controller
{

    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = SubmitRole::select('*');

            if (!$request->has('order')) {
                $query->orderBy('id', 'desc');
            }

            return DataTables::of($query)

                ->addColumn('action', function ($row) {
                    $viewRoute = "<a href='" . route('admin.submit.role.view', $row->id) . "' class='btn btn-sm btn-clean btn-icon'  title='View details'><i class='flaticon-eye fa-lg' ></i></a>&nbsp;";
                    $deleteRoute = "<a href='" . route('admin.submit.role.delete') . "' data-id='" . $row->id . "' data-title='Delete Record?' data-text='Are you sure you want to delete record?' class='btn btn-sm btn-clean btn-icon delete-record' title='Delete'><i class='flaticon2-trash'></i></a>&nbsp;";

                    return "{$viewRoute}{$deleteRoute}";
                })
                ->rawColumns(['message', 'action'])
                ->make(true);
        }
        $data = OtherPageData::whereIn('key', ['submit_role_title', 'submit_role_description'])->pluck('value', 'key');

        return view('admin.submit-role.list',compact('data'));
    }


    public function view($id)
    {
        $data = SubmitRole::select('*')->findOrFail($id);
        $obj = AdminNotification::where('type','submit_role')->where('relation_id',$id)->update(['read' => true]);
        return view('admin.submit-role.view', compact('data'));
    }

    public function delete(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }
        try {
            $delete = SubmitRole::where('id', request('id'))->limit(1)->delete();
            $obj = AdminNotification::where('type','submit_role')->where('relation_id', request('id'))->limit(1)->delete();
            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }

    public function storeOther(Request $request)
    {
        $request->validate([
        ]);

        try {
            $validate = $request->only('submit_role_title','submit_role_description');
            foreach ($validate as $key => $value) {
                OtherPageData::updateOrCreate(
                    ['key' => $key],
                    ['value' => $value]
                );
            }
            return response()->json(['message' => 'Updated successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            return response()->json(['message' => 'Oops! something went wrong, please try again later'], 500);
        }
    }
}
