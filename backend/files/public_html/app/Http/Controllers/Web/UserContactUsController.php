<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\ContactUs;
use App\Models\MailConfiguration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactUsMail;
use App\Mail\ContactUsMailAdmin;
use App\Models\Admin;
use App\Helper\Helper;

class UserContactUsController extends Controller
{
    public function save(Request $request)
    {
        // dd($request);
        $request->validate([
            'name'          => 'required',
            'email'         => 'required',
            'mobile_number'         => 'required',
            'message'         => 'required',
        ],[
            'name.required'         => 'The name field is required.',
            'email.required'        => 'The email field is required.',
            'mobile_number.required'        => 'The phone field is required.',
            'message.required'        => 'The message field is required.',
        ]);

        try {
            $validate = $request->only(
                'name',
                'email',
                'country_code',
                'mobile_number',
                'subject',
                'message',
            );

            // Combine the name and subject fields
            $validate['name'] = $request->name;
            $full_name = $request->name;
            $phoneWithCode = $request->country_code . '-' . $request->mobile_number;
            $userContactUs = new ContactUs;
            $userContactUs->fill($validate);


            $to_email = $request->email;
            $to_name =  $full_name;
            $to_subject = $request->subject;
            $to_message = $request->message;
            $to_phone = $phoneWithCode;

            if ($userContactUs->save()) {
                $usersMailData = [
                    'title' => env('MAIL_FROM_NAME'),
                    'subject' => 'Contact-Us From ' . env('APP_NAME'),
                    'to_name' => $to_name,
                    'to_email' => $to_email,
                    'to_message' => $to_message,
                    'to_subject' => $to_subject,
                    'to_phone' => $to_phone,
                ];
                // Retrieve mail configuration
                $mailConfig = MailConfiguration::first();
                $admin = Admin::first();

                if ($mailConfig) {
                    Config::set('mail.mailers.smtp', [
                        'transport' => $mailConfig->mail_mailer,
                        'host' => $mailConfig->mail_host,
                        'port' => $mailConfig->mail_port,
                        'encryption' => $mailConfig->mail_encryption,
                        'username' => $mailConfig->mail_username,
                        'password' => $mailConfig->mail_password,
                    ]);

                    Config::set('mail.from.address', $mailConfig->mail_from_address);
                    Config::set('mail.from.name', $mailConfig->mail_from_name);
                }

                // dd($usersMailData);
                Mail::to($to_email)->send(new ContactUsMail($usersMailData));
                Mail::to($admin->email)->send(new ContactUsMailAdmin($usersMailData));
                Helper::notifyToAdmin(
                    'A new contact us has been listed by '.$to_name.'. Please review the details',
                    'contact_us',
                    $userContactUs->id
                );
                return redirect()
                    ->back()
                    ->with('success', 'Your request sent successfully. We will contact you soon.');
            }

            return back()
                ->with('error', 'Oops! something went wrong, Please try again later');
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . json_encode($th));
            \Log::error('Error submitting contact form: ' . $th->getMessage());
            return back()->with('error', 'Oops! something went wrong, Please try again later');
        }


    }
}

