<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title> {{ config('app.name') }} | @yield('title') </title>
		<meta name="description" content="Login page">
        <meta name="csrf-token" content="{{ csrf_token() }}">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<!--begin::Fonts -->
		<script src="{{ asset('admin-asset/js/web-font.js') }}"></script>
		<!--end::Fonts -->
		<link rel="stylesheet" href="{{ asset('admin-asset/css/admin-login.css') }}">
		<link rel="shortcut icon" href="{{ asset('admin-asset/images/favicon.ico')}}" type="image/x-icon" />
	</head>
	<!-- end::Head -->
	<!-- begin::Body -->
	<body class="kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed kt-subheader--fixed kt-subheader--enabled kt-subheader--solid kt-aside--enabled kt-aside--fixed kt-page--loading">
		<!-- begin:: Page -->
        @yield('content')
		<!-- end:: Page -->
		<script src="{{ asset('admin-asset/js/admin-login.js') }}"></script>
		@stack('script')
	</body>
	<!-- end::Body -->
</html>
