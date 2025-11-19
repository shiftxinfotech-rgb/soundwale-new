<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ApplyJobMailAdmin extends Mailable
{
    use Queueable, SerializesModels;

    public $usersMailData;
    public $resumePath;

    public function __construct($usersMailData, $resumePath = null)
    {
        $this->usersMailData = $usersMailData;
        $this->resumePath = $resumePath;
    }

    public function build()
    {
        $email = $this->subject($this->usersMailData['subject'])
                      ->view('mail.apply-job-mail-admin')
                      ->with('data', $this->usersMailData);

        if ($this->resumePath) {
            $email->attach(asset('/storage/app/apply_jobs/' . $this->resumePath));
        }

        return $email;
    }
}
