<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<!-- begin::Head -->
	<head>
        @include('admin.includes.head')
		@stack('css')
	</head>
	<!-- end::Head -->
	<!-- begin::Body -->
	<body class="kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed kt-subheader--fixed kt-subheader--enabled kt-subheader--solid kt-aside--enabled kt-aside--fixed">
		<!-- begin:: Page -->
			<!-- begin:: Header Mobile -->
            @include('admin.includes.mobile-header')
			<!-- end:: Header Mobile -->
			<div class="kt-grid kt-grid--hor kt-grid--root">
				<div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">

					<!-- begin:: Aside -->
                    @include('admin.includes.aside')
					<!-- end:: Aside -->
					<div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">

						<!-- begin:: Header -->
                        @include('admin.includes.header')
						<!-- end:: Header -->

						<div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">

							<!-- begin:: Content  -->
                                @yield('content')
							<!-- end:: Content -->
						</div>

						<!-- begin:: Footer -->
                        @include('admin.includes.footer')
						<!-- end:: Footer -->
					</div>
				</div>
			</div>

		<!-- end:: Page -->

        <!-- begin: Footer js  -->
		@include('admin.includes.footer-js')
		@stack('script')
		<!-- end: Footer js  -->
	</body>

	<!-- end::Body -->
</html>