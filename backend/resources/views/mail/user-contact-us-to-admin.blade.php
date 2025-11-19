@component('mail::message')

You have received a new message from the contact form on your app. Here are the details:

- **Name:** {{ $data['name'] }}
- **Email:** {{ $data['email'] }}
- **Mobile Number:** {{ $data['mobile_number'] }}
- **Message:** {{ $data['message'] }}

Please follow up with the user as soon as possible.

Best regards,
## {{ config('app.name') }} Notification System
@endcomponent