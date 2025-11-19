@extends('admin.auth.layouts.auth')
@section('title' ,'Reset Password')
@section('content')
    <!-- begin:: Page -->
	<div class="kt-grid kt-grid--ver kt-grid--root">
		<div class="kt-grid kt-grid--hor kt-grid--root  kt-login kt-login--v6 kt-login--signin" id="kt_login">
			<div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--desktop kt-grid--ver-desktop kt-grid--hor-tablet-and-mobile">
				<div class="kt-grid__item  kt-grid__item--order-tablet-and-mobile-2  kt-grid kt-grid--hor kt-login__aside">
					<div class="kt-login__wrapper">
						<div class="kt-login__container">
							<div class="kt-login__body">
								<div class="kt-login__logo">
									<a href="#">
										<img src="{{ asset('admin-asset/images/logo.png')}}" class="img-fluid">
									</a>
								</div>
								<div class="kt-login__signin">
									<div class="alert alert-info" role="alert">
										<div class="alert-icon"><i class="flaticon-questions-circular-button"></i></div>
										<div class="alert-text">{{ $message }}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="kt-grid__item kt-grid__item--fluid kt-grid__item--center kt-grid kt-grid--ver kt-login__content" style="background-image: url({{asset('admin-asset/images/media/bg/bg-6.jpg')}});">
					<div class="kt-login__section">
						<div class="kt-login__block">
							<h3 class="kt-login__title">{{config('app.name')}}</h3>
							<div class="kt-login__desc">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- end:: Page -->    
@endsection