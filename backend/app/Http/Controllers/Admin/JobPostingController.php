<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\JobPosting;
use App\Models\Booking;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class JobPostingController extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = JobPosting::select('id', 'title', 'icon', 'sub_title', 'sequence','image','status','coming_soon','location','work_type','salary','created_at');

            if (! $request->has('order')) {
                $query->orderBy('sequence', 'asc');
            }

            return DataTables::of($query)
                ->editColumn('created_at', function ($row) {
                    return Carbon::parse($row->created_at)->format('d M, Y H:i A'); // Format as desired
                })
                ->addColumn('action', function ($row) {

                    $editRoute = "<a href='".route('admin.job.posting.edit', $row->id)."' class='btn btn-sm btn-clean btn-icon' title='Edit details'><i class='flaticon2-pen'></i></a>";
                    $deleteRoute = "<a href='".route('admin.job.posting.delete')."' data-id='".$row->id."' data-title='Delete ?' data-text='Are you sure you want to delete ?' class='btn btn-sm btn-clean btn-icon delete-record' title='Delete'><i class='flaticon2-trash'></i></a>";
                    $viewRoute = "<a href='".route('admin.job.posting.view', $row->id)."'  class='btn btn-sm btn-clean btn-icon'  title='View details'><i class='flaticon-eye fa-lg'></i></a>";

                    return "{$editRoute}{$deleteRoute}";
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('admin.job-posting.list');
    }

    public function add($id = null)
    {
        $data = null;
        if ($id) {
            $data = JobPosting::select('id', 'title', 'icon', 'sub_title', 'image','content', 'sequence','status','coming_soon','location','work_type','salary','short_content',)->findOrFail($id);
        }

        return view('admin.job-posting.add', compact('data'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => "required|string|max:150,{$request->edit_id}",
            // 'image' => 'required_without:edit_id|max:2048|'.Helper::mimesFileValidation('image'),
            // 'icon' => 'required_without:edit_id|max:2048|'.Helper::mimesFileValidation('icon'),
             'sequence' => [
                'required',
                'numeric',
                Rule::unique('job_posting')->ignore($request->edit_id),
            ],
        ], [
            // 'image.max' => 'The details image field must not be greater than 2MB.',
            // 'icon.max' => 'The front image field must not be greater than 2MB.',
        ]);

        try {
            $validate = $request->only('title', 'sequence','sub_title','content','location','work_type','salary','short_content','status');

            if ($request->hasFile('image')) {
                $validate['image'] = Helper::uploadImage($request->image, JobPosting::IMAGE_PATH);
            }

            if ($request->hasFile('icon')) {
                $validate['icon'] = Helper::uploadImage($request->icon, JobPosting::IMAGE_PATH);
            }

            $validate['status'] = $request->has('status') ? $request->get('status') : 1;
            // $validate['coming_soon'] = $request->has('coming_soon') ? $request->get('coming_soon') : 0;
            $obj = ($request->edit_id) ? JobPosting::where('id', $request->edit_id)->first() : new JobPosting;
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
        $data = JobPosting::findOrFail($id);

        return view('admin.job-posting.view', compact('data'));
    }

    public function statusChange(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }

        $request->validate([
            'id' => 'required|exists:job_posting,id',
            'status' => 'required',
        ]);

        try {
            $obj = JobPosting::where('id', request('id'))->limit(1)->first();
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

            $obj = JobPosting::where('id', request('id'))->limit(1)->first();

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
