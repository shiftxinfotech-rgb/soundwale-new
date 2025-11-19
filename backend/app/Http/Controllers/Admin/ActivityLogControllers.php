<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\AdminNotification;
use DataTables;
use Illuminate\Http\Request;

class ActivityLogControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            // Select the first record for each unique IP address
            $query = Activity::selectRaw('MIN(id) as id, ip_address, MAX(created_at) as latest_activity')
                            ->groupBy('ip_address')
                            ->orderBy('latest_activity', 'desc'); // Group by IP address and order by latest activity

            // If no order is specified, order by 'latest_activity' descending
            if (!$request->has('order')) {
                $query->orderBy('latest_activity', 'desc');
            }

            return DataTables::of($query)
                ->addColumn('action', function ($row) {
                    $viewRoute = "<a href='" . route('admin.activity.log.view', $row->ip_address) . "' class='btn btn-sm btn-clean btn-icon'  title='View details'><i class='flaticon-eye fa-lg' ></i></a>&nbsp;";
                    // $deleteRoute = "<a href='" . route('admin.activity.log.delete') . "' data-id='" . $row->id . "' data-title='Delete Record?' data-text='Are you sure you want to delete record?' class='btn btn-sm btn-clean btn-icon delete-record' title='Delete'><i class='flaticon2-trash'></i></a>&nbsp;";

                    return "{$viewRoute}";
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('admin.activity-log.list');
    }

    public function view($id)
    {
        $data =  Activity::where('ip_address', $id)
        ->orderBy('created_at', 'desc')
        ->get();
// dd( $data);
        return view('admin.activity-log.view', compact('data'));
    }

    public function delete(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }
        try {
            $delete = Career::where('id', request('id'))->limit(1)->delete();
            $obj = AdminNotification::where('type','careers')->where('relation_id', request('id'))->limit(1)->delete();
            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }
}
