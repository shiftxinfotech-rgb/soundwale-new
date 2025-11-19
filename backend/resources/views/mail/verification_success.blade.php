@component('mail::message')
# Account Verification Success

Dear {{ $data['name'] }},

Your account has been successfully verified.

Thank you for using our platform!

Regards,  
{{ config('app.name') }}
@endcomponent
