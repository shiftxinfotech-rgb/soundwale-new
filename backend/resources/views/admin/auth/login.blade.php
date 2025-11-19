@extends('admin.auth.layouts.auth')
@section('title' ,'Login')
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
									<a href="javascript:;">
										<img src="{{ asset('admin-asset/images/logo.png')}}" class="img-fluid">
									</a>
								</div>
								<div class="kt-login__signin">
									<div class="kt-login__head">
										<h3 class="kt-login__title">Sign In To Admin</h3>
									</div>
									<div class="kt-login__form">
										@include('admin.layouts.flash-message')
										<form class="kt-form" action="{{ route('admin.login.post') }}" method="POST">
											<div class="form-group">
												<input class="form-control" type="text" placeholder="Email address" name="email" autocomplete="off">
											</div>
											@csrf
											<div class="form-group">
												<div class="kt-input-icon kt-input-icon--right">
													<input class="form-control form-control-last" type="password" placeholder="Password" name="password"  style="border: 0;border-bottom: 1px solid rgba(235, 237, 242, 0.8)">
													<span class="kt-input-icon__icon kt-input-icon__icon--right show-hide">
														<span><i class="la la-eye-slash"></i></span>
													</span>
												</div>
											</div>
											<div class="kt-login__extra">
												<label class="kt-checkbox">
													{{-- <input type="checkbox" name="remember"> Remember me
													<span></span> --}}
												</label>
												<a href="javascript:;" id="kt_login_forgot">Forgot Password ?</a>
											</div>
											<div class="kt-login__actions">
												<button id="kt_login_signin_submit" class="btn btn-brand btn-pill btn-elevate">Sign In</button>
											</div>
										</form>
									</div>
								</div>

								<div class="kt-login__forgot">
									<div class="kt-login__head">
										<h3 class="kt-login__title">Forgot Your Password ?</h3>
										<div class="kt-login__desc">Enter your email to reset your password:</div>
									</div>
									<div class="kt-login__form">
										<form class="kt-form" method="POST" action="{{ route('admin.sendForgetPasswordLink') }}">
											@csrf
											<div class="form-group">
												<input class="form-control" type="text" placeholder="Email" name="email" id="kt_email" autocomplete="off">
											</div>
											<div class="kt-login__actions">
												<button id="kt_login_forgot_submit" class="btn btn-brand btn-pill btn-elevate">Request</button>
												<button id="kt_login_forgot_cancel" class="btn btn-outline-brand btn-pill">Cancel</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="kt-grid__item kt-grid__item--fluid kt-grid__item--center kt-grid kt-grid--ver kt-login__content" style="background-image: url({{asset('admin-asset/images/media/bg/s5.jpg')}});">
					<div class="kt-login__section">
						<div class="kt-login__block">
							<!--							<h3 class="kt-login__title">{{config('app.name')}}</h3>
							<div class="kt-login__desc" >
								Find Your Next Career Here Our Open Positions
							</div>-->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- end:: Page -->
@push('script')
<script>
    $('span.show-hide').on('click', function () {
        if ($(this).find('i').hasClass('la-eye-slash')) {
            $(this).parents('div.kt-input-icon--right').find('input[type=password]').attr('type', 'text');
            $(this).find('i').removeClass('la-eye-slash').addClass('la-eye');
        } else {
            $(this).parents('div.kt-input-icon--right').find('input[type=text]').attr('type', 'password');
            $(this).find('i').removeClass('la-eye').addClass('la-eye-slash');
        }
    });


    $(document).ready(function () {
        $('.alert').delay(4000).slideUp('slow');
    });
</script>
@endpush
@endsection
