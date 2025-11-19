<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\SubmitRole;
use App\Models\MailConfiguration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use App\Mail\SubmitRoleMail;
use App\Mail\SubmitRoleMailAdmin;
use App\Models\Admin;
use App\Helper\Helper;
use App\Models\Banner;
use App\Models\Setting;
use App\Models\OtherPageData;
use Illuminate\Support\Facades\Route;
use Carbon\Carbon;

class SubmitRoleController extends Controller
{
    public function index()
    {

        $data = OtherPageData::whereIn('key', ['submit_role_title', 'submit_role_description'])->pluck('value', 'key');
        $home_settings = Setting::select('*')->first();

        return view('web.submit-role.index',compact('data','home_settings'));
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
                'job',
                'hires',
                'job_description',
                'location',
                'salary',
                'time',
                'name',
                'business',
                'email',
            );
            $data['phone_number'] = $request->country_code . ' ' . $request->phone_number;
            $data['start_date'] =  Carbon::parse($request->start_date)->format('d M, Y');

            $SubmitRole = new SubmitRole;
            $SubmitRole->fill($data);


            if ($SubmitRole->save()) {
                $emailData = [
                    'title'                 => env('MAIL_FROM_NAME'),
                    'subject'               => 'Talent Seeker From ' . env('APP_NAME'),
                    'to_name'               => $request->name ?? null,
                    'to_email'              => $request->email ?? null,
                    'to_phone'              => $data['phone_number'] ?? null,

                    'job'                   => $request->job  ?? null,
                    'hires'                 => $request->hires ?? null,
                    'job_description'       => $request->job_description ?? null,
                    'time'                  => $request->time ?? null,
                    'location'              => $request->location ?? null,
                    'salary'                => $request->salary ?? null,
                    'start_date'            => Carbon::parse($request->start_date)->format('d M, Y')  ?? null,
                    'business'              => $request->business ?? null,

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

                Mail::to($request->email)->send(new SubmitRoleMail($emailData));
                Mail::to($admin->email)->send(new SubmitRoleMailAdmin($emailData));
                Helper::notifyToAdmin(
                    'A new Submit Role has been listed by ' . $request->name . '. Please review the details.',
                    'submit_role',
                    $SubmitRole->id
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
