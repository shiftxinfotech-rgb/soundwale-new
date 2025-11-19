<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MailSend extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public $mailFormate;

    public $subject;

    public $attach_file;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data, $mailFormate, $subject = 'Subject', $attach_file = [])
    {
        $this->data = $data;
        $this->mailFormate = $mailFormate;
        $this->subject = $subject;
        $this->attach_file = $attach_file;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $mail = $this->subject($this->subject)->markdown($this->mailFormate);
        if (! empty($this->attach_file)) {
            foreach ($this->attach_file as $filePath) {
                $mail->attach($filePath['filePath']);
            }
        }

        return $mail;
    }
}
