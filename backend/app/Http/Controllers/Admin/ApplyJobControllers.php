<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ApplyJobs;
use App\Models\AdminNotification;
use DataTables;
use Illuminate\Http\Request;

class ApplyJobControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = ApplyJobs::select('*');

            if (! $request->has('order')) {
                $query->orderBy('id', 'desc');
            }

            return DataTables::of($query)

                ->addColumn('action', function ($row) {
                    $viewRoute = "<a href='".route('admin.apply.job.view', $row->id)."' class='btn btn-sm btn-clean btn-icon'  title='View details'><i class='flaticon-eye fa-lg'></i></a>&nbsp";
                    $deleteRoute = "<a href='".route('admin.apply.job.delete')."' data-id='".$row->id."' data-title='Delete Record?' data-text='Are you sure you want to delete record?' class='btn btn-sm btn-clean btn-icon delete-record' title='Delete'><i class='flaticon2-trash'></i></a>&nbsp;";

                    return "{$viewRoute}{$deleteRoute}";
                })
                ->rawColumns(['message', 'action'])
                ->make(true);
        }

        return view('admin.apply-job.list');
    }

    public function view($id)
    {
        $data = ApplyJobs::findOrFail($id);
        $obj = AdminNotification::where('type','apply_job')->where('relation_id',$id)->update(['read' => true]);

        return view('admin.apply-job.view', compact('data'));
    }

    public function delete(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }
        try {
            $delete = ApplyJobs::where('id', request('id'))->limit(1)->delete();
            $obj = AdminNotification::where('type','apply_job')->where('relation_id', request('id'))->limit(1)->delete();
            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }
}
