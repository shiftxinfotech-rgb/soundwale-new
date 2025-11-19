<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\TalentSeeker;
use App\Models\OtherPageData;
use App\Models\Solutions;
use App\Models\MailConfiguration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use App\Mail\TalentSeekerMail;
use App\Mail\TalentSeekerMailAdmin;
use App\Models\Admin;
use App\Helper\Helper;
use App\Models\Banner;
use Illuminate\Support\Facades\Route;
use Carbon\Carbon;
use App\Models\Setting;
use App\Models\Testimonials;

class TalentSeekerController extends Controller
{
    public function index(){

        $data = OtherPageData::whereIn('key', ['who_we_are_title', 'who_we_are_description', 'who_we_are_image','solution_text','hiring_needs_text','hiring_needs_description'])->pluck('value', 'key');
        $solutions = Solutions::orderBy('id', 'DESC')->select('id','image','title', 'description')->get();
        $testimonials = Testimonials::orderBy('created_at', 'DESC')->select('id', 'image', 'name', 'rating', 'designation', 'image', 'message', 'status')->where('type', 1)->where('status',1)->get();
        $home_settings = Setting::select('*')->first();

        return view('web.talent-seeker.index',compact('data','solutions','testimonials','home_settings'));
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
                'designation',
                'company_name',
                'work_email',
                'skype',
                'company_website',
                'city',
                'job_description',
            );
            $data['mobile_no'] = $request->country_code . ' ' . $request->mobile_no;
            $TalentSeeker = new TalentSeeker;
            $TalentSeeker->fill($data);


            if ($TalentSeeker->save()) {
                $emailData = [
                    'title'                 => env('MAIL_FROM_NAME'),
                    'subject'               => 'Hiring Talent From ' . env('APP_NAME'),
                    'to_name'               => $request->name ?? null,
                    'designation'           => $request->designation  ?? null,
                    'company_name'          => $request->company_name ?? null,
                    'to_email'              => $request->work_email ?? null,
                    'to_phone'              => $data['mobile_no'] ?? null,
                    'skype'                 => $request->skype ?? null,
                    'company_website'       => $request->company_website ?? null,
                    'city'                  => $request->city ?? null,
                    'job_description'       => $request->job_description ?? null,

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

                Mail::to($request->work_email)->send(new TalentSeekerMail($emailData));
                Mail::to($admin->email)->send(new TalentSeekerMailAdmin($emailData));
                Helper::notifyToAdmin(
                    'A new Hiring Talent has been listed by ' . $request->name . '. Please review the details.',
                    'talent_seeker',
                    $TalentSeeker->id
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
