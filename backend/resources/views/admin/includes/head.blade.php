<!--begin::Base Path (base relative path for assets of this page) -->
<base href="../">
<!--end::Base Path -->
<meta charset="utf-8" />
<title>{{ config('app.name') }} | @yield('title')</title>
<meta name="csrf-token" content="{{ csrf_token() }}">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<!--begin::Fonts -->
<script src="{{ asset('admin-asset/js/web-font.js') }}"></script>
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/css/intlTelInput.css'>
<link rel="stylesheet" href="{{ asset('admin-asset/css/admin-main.css') }}">
<link rel="stylesheet" href="{{ asset('admin-asset/css/developer.css') }}">
<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css" rel="stylesheet" />
<link rel="shortcut icon" href="{{ asset('admin-asset/images/favicon.ico')}}" />


