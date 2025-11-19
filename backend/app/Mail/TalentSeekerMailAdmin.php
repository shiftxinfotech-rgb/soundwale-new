<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TalentSeekerMailAdmin extends Mailable
{
    use Queueable, SerializesModels;

    public $usersMailData;

    public function __construct($usersMailData)
    {
        $this->usersMailData = $usersMailData;
    }

    public function build()
    {
        return $this->subject($this->usersMailData['subject'])->view('mail.talent-seeker-mail-admin');
    }
}
