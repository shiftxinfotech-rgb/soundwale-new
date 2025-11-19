@component('mail::message')
# Your OTP Code

Your OTP code is: **{{ $data['otp'] }}**

This OTP will expire in 10 minutes.

Thanks,
{{ config('app.name') }}
@endcomponent
