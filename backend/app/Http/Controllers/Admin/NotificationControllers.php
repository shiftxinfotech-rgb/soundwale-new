<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminNotification;
use DataTables;
use Illuminate\Http\Request;

class NotificationControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = AdminNotification::query();

            if (! $request->has('order')) {
                $query->orderBy('id', 'desc');
            }

            return DataTables::of($query)
                ->editColumn('created_at', function ($row) {
                    return $row->created_at->diffForHumans();
                })
                ->addColumn('action', function ($row) {
                    $deleteRoute = "<a href='".route('admin.notification.delete')."' data-id='".$row->id."'  data-title='Delete notification?' data-text='Are you sure you want to delete notification?' class='delete-record btn btn-icon btn-outline-danger btn-sm' title='Delete'><i class='la la-trash'></i></a>&nbsp;";

                    return "{$deleteRoute}";
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('admin.notification.list');
    }

    public function delete(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }
        try {
            $obj = AdminNotification::where('id', request('id'))->limit(1)->first();
            if ($obj) {
                $delete = $obj->delete();
            }

            return response()->json(['message' => 'Notification Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }

    public function readAllNotification(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }
        try {
            $obj = AdminNotification::where('read', false)->update(['read' => true]);

            return response()->json(['message' => 'All notification read successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }

    public function notificationRedirect($id)
    {
        $notification = AdminNotification::FindOrFail($id);
        if ($notification) {
            $notification->read = 1;
            $notification->save();

            switch ($notification->type) {
                case 'contact_us':
                    return redirect()->route('admin.contact.us.view', $notification->relation_id);
                    break;
                case 'talent_seeker':
                    return redirect()->route('admin.talent.seeker.view', $notification->relation_id);
                    break;

                case 'submit_role':
                    return redirect()->route('admin.submit.role.view', $notification->relation_id);
                    break;

                case 'apply_job':
                    return redirect()->route('admin.apply.job.view', $notification->relation_id);
                    break;
                default:
                    return redirect()->route('admin.notification.list');
                    break;
            }
        }

        return abort(404);
    }

    public function getUnreadNotifications()
    {
        $unreadList = AdminNotification::where('read', false)->latest()->get();
        $unreadCount = $unreadList->count();

        return response()->json([
            'unreadCount' => $unreadCount,
            'unreadList' => $unreadList
        ]);
    }
}
