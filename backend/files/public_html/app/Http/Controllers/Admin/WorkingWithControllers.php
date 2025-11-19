<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\RegisterWorkingWithApproval;

use DataTables;
use Illuminate\Http\Request;
use DB;

class WorkingWithControllers extends Controller
{
    public function list(Request $request)
    {
        if($request->method() == 'POST'){
            $query = RegisterWorkingWithApproval::select('register_working_with.*','register.name as user_name')
            ->join('register', 'register_working_with.user_id', '=', 'register.id')  
            ->latest();
            $query = $query->latest();
            
            $statusMap = [
                0 => 'Pending',
                1 => 'Approved',
                2 => 'Rejected',
            ];
            return DataTables::of($query)
            ->addColumn('status', function ($row) use ($statusMap) {
                return $statusMap[$row->status] ?? 'Unknown';
            })        
            ->addColumn('action', function($row){
                $actions = "";
    
                // Approve and Reject Buttons only when status = 0 and register_id = 0
                if ($row->status == 0 && $row->register_id == 0) {
                    $approveRoute = route('admin.working_with.approve', $row->id);
                    $rejectRoute = route('admin.working_with.reject', $row->id);

                    $approveButton = "<a href='{$approveRoute}' class='btn btn-sm btn-success approve-btn' data-id='{$row->id}' title='Approve'>Approve</a>&nbsp;";
                    $rejectButton = "<a href='{$rejectRoute}' class='btn btn-sm btn-danger reject-btn' data-id='{$row->id}' title='Reject'>Reject</a>&nbsp;";

                    $actions .= $approveButton . $rejectButton;
                }
                
                // Delete Button
                $deleteRoute = "<a href='".route('admin.working_with.delete')."' data-id='".$row->id."' class='delete-record btn btn-icon btn-outline-danger btn-sm' title='Delete'><i class='la la-trash'></i></a>&nbsp;";
                $actions .= $deleteRoute;
                
                return $actions;
            })
            ->rawColumns(['action'])
            ->make(true);
        }

        return view('admin.working_with.list');
    }
    
    public function approve($id)
    {
        $record = RegisterWorkingWithApproval::findOrFail($id);
        $record->status = 1; // Approved
        $record->save();

        return redirect()->back()->with('success', 'Record approved successfully.');
    }

    public function reject($id)
    {
        $record = RegisterWorkingWithApproval::findOrFail($id);
        $record->status = 2; // Rejected
        $record->save();

        return redirect()->back()->with('success', 'Record rejected successfully.');
    }

    public function statusChange(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }

        $request->validate([
            'id' => 'required|exists:home_list,id',
            'status' => 'required',
        ]);

        try {
            $obj = RegisterWorkingWithApproval::where('id', request('id'))->limit(1)->first();
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
            $obj = RegisterWorkingWithApproval::where('id', request('id'))->limit(1)->first();
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
