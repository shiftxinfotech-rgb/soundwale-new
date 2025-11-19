<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactUs;
use App\Models\AdminNotification;
use DataTables;
use Illuminate\Http\Request;

class ContactUsControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = ContactUs::select('*');

            if (! $request->has('order')) {
                $query->orderBy('id', 'desc');
            }

            return DataTables::of($query)
                ->editColumn('message', function ($row) {
                    return mb_strimwidth(strip_tags($row->message), 0, 100, '...');
                })
                ->addColumn('action', function ($row) {
                    $viewRoute   = "<a href='".route('admin.contact.us.view',$row->id)."' class='btn btn-icon btn-outline-brand btn-sm' title='View details'><i class='flaticon-eye fa-lg'></i></a>&nbsp";
                    $deleteRoute = "<a href='".route('admin.contact.us.delete')."' data-id='".$row->id."' class='delete-record btn btn-icon btn-outline-danger btn-sm' title='Delete'><i class='la la-trash'></i></a>&nbsp;";
                    
                    return "{$viewRoute}{$deleteRoute}";
                })
                ->rawColumns(['message', 'action'])
                ->make(true);
        }

        return view('admin.contact-us.list');
    }

    public function view($id)
    {
        $data = ContactUs::findOrFail($id);
        $obj = AdminNotification::where('type','contact_us')->where('relation_id',$id)->update(['read' => true]);

        return view('admin.contact-us.view', compact('data'));
    }

    public function delete(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }
        try {
            $delete = ContactUs::where('id', request('id'))->limit(1)->delete();
            $obj = AdminNotification::where('type','contact_us')->where('relation_id', request('id'))->limit(1)->delete();
            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }
}
