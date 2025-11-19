<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MailConfiguration;

class MailConfigurationController extends Controller
{
    public function index()
    {
        $data = MailConfiguration::first();
        return view('admin.mail-configuration.index',compact('data'));
    }

    public function update(Request $request)
        {
            // dd($request->edit_id);
            $request->validate([
                'mail_mailer' => 'required|string',
                'mail_host' => 'required|string',
                'mail_port' => 'required|integer',
                'mail_username' => 'nullable|string',
                'mail_password' => 'nullable|string',
                'mail_encryption' => 'nullable|string',
                'mail_from_address' => 'nullable|string',
                'mail_from_name' => 'nullable|string',
            ]);

            if ($request->edit_id) {
                $mailConfiguration = MailConfiguration::find($request->edit_id);
                if ($mailConfiguration) {
                    $mailConfiguration->update($request->all());
                    return response()->json(['message' => ($request->edit_id) ? 'Mail Configuration update successfully' : 'Mail configuration added successfully'], 200);
                  }
            } else {
                MailConfiguration::create($request->all());
                   return response()->json(['message' => ($request->edit_id) ? 'Mail Configuration update successfully' : 'Mail Configuration added successfully'], 200);
                }
                return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
            }

        }
