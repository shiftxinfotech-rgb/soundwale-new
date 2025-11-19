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
									<div class="kt-login__head">
										<h3 class="kt-login__title">Reset password</h3>
									</div>
									<div class="kt-login__form">
										<form class="kt-form" action="{{ route('api.password.reset',['token'=>$token]) }}" method="POST">
											<div class="form-group">
												<div class="kt-input-icon kt-input-icon--right">
													<input class="form-control" type="password" placeholder="Password" name="password" required>
													<span class="kt-input-icon__icon kt-input-icon__icon--right show-hide">
														<span><i class="la la-eye"></i></span>
													</span>
												</div>
											</div>
											@csrf
											<input type="hidden" name="token" value="{{ $token }}">
											<div class="form-group">
												<div class="kt-input-icon kt-input-icon--right">
													<input class="form-control form-control-last" type="password" placeholder="Confirm Password" name="password_confirmation" required>
													<span class="kt-input-icon__icon kt-input-icon__icon--right show-hide">
														<span><i class="la la-eye"></i></span>
													</span>
												</div>
											</div>
											<div class="kt-login__actions">
												<button id="kt_login_signin_submit" class="btn btn-brand btn-pill btn-elevate">Submit</button>
											</div>
											<input type="hidden" name="email" value="{{ request()->get('email') }}">
										</form>
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
@push('script')
<script>
		$('span.show-hide').on('click', function () {
			if ($(this).find('span').find('i').hasClass('la-eye')) {
				$(this).parents('div.kt-input-icon--right').find('input[type=password]').attr('type', 'text');
				$(this).find('span').find('i').removeClass('la-eye').addClass('la-eye-slash');
			} else {
				$(this).parents('div.kt-input-icon--right').find('input[type=text]').attr('type', 'password');
				$(this).find('span').find('i').addClass('la-eye').removeClass('la-eye-slash');
			}
		});
</script>
	
@endpush
@endsection