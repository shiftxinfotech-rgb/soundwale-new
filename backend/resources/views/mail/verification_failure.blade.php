@component('mail::message')
# Account Verification Failed

Dear {{ $data['name'] }},

We regret to inform you that your account verification has failed. Please contact support for further assistance.

Reason: {{ $data['reason'] }}

Regards,  
{{ config('app.name') }}
@endcomponent
