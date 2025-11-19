<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\JobPosting;
use App\Models\Testimonials;
use App\Models\Setting;
use Yajra\DataTables\DataTables;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;use App\Mail\ApplyJobMail;
use App\Mail\ApplyJobMailAdmin;
use App\Models\Admin;
use App\Helper\Helper;
use App\Models\ApplyJobs;
use App\Models\MailConfiguration;

class JobSeekerController extends Controller
{
    public function index(Request $request)
    {
        $services = JobPosting::orderBy('sequence', 'DESC')->where('status',1)->paginate(12);
        if ($request->ajax()) {
            return view('web.partials.job', compact('services'));
        }
        $testimonials = Testimonials::orderBy('created_at', 'DESC')->select('id', 'image', 'name', 'rating', 'designation', 'image', 'message', 'status')->where('type', 0)->where('status',1)->get();
        $home_settings = Setting::select('*')->first();

        return view('web.job-seeker.index',compact('services','testimonials','home_settings'));
    }

    public function detail($slug)
    {
        $JobPosting = JobPosting::where('id', decrypt($slug))->first();
        $home_settings = Setting::select('*')->first();

        return view('web.job-seeker.apply-job', compact('JobPosting','home_settings'));
    }

    public function save(Request $request)
    {
        $request->validate([
            // 'name'                 => 'required',
            // 'email_address'        => 'required|email',
            // 'phone_number'         => 'required',
        ]);

        try {
            $data = $request->only(
                'name',
                'email',
                'job_name',
            );
            $data['phone_number'] = $request->country_code . ' ' . $request->phone;
            $resumePath = null;
            if ($request->hasFile('resume')) {
                $resumePath = Helper::uploadImage($request->resume, ApplyJobs::IMAGE_PATH);
                $data['resume'] = $resumePath;
            }
            $ApplyJob = new ApplyJobs;
            $ApplyJob->fill($data);

            if ($ApplyJob->save()) {
                $emailData = [
                    'title'                 => env('MAIL_FROM_NAME'),
                    'subject'               => 'Apply Job ' . env('APP_NAME'),
                    'to_name'               => $request->name ?? null,
                    'to_email'              => $request->email ?? null,
                    'to_phone'              => $data['phone_number'] ?? null,
                ];

                $mailConfig = MailConfiguration::first();
                $admin = Admin::first();

                if ($mailConfig) {
                    Config::set('mail.mailers.smtp', [
                        'transport' => $mailConfig->mail_mailer,
                        'host'      => $mailConfig->mail_host,
                        'port'      => $mailConfig->mail_port,
                        'encryption'=> $mailConfig->mail_encryption,
                        'username'  => $mailConfig->mail_username,
                        'password'  => $mailConfig->mail_password,
                    ]);

                    Config::set('mail.from.address', $mailConfig->mail_from_address);
                    Config::set('mail.from.name', $mailConfig->mail_from_name);
                }

                Mail::to($request->email)->send(new ApplyJobMail($emailData, $resumePath));
                Mail::to($admin->email)->send(new ApplyJobMailAdmin($emailData, $resumePath));
                Helper::notifyToAdmin(
                    'A new Apply Job been listed by ' . $request->name . '. Please review the details.',
                    'apply_job',
                    $ApplyJob->id
                );

                return redirect()->back()->with('success', 'Your request has been sent successfully. We will contact you soon.');
            }

            return back()->with('error', 'Oops! Something went wrong, please try again later.');
        } catch (\Throwable $th) {
            \Log::error('Error submitting careers form: ' . $th->getMessage());
            return back()->with('error', 'Oops! Something went wrong, please try again later.');
        }
    }
}
