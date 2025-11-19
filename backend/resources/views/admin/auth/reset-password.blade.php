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
                                    <a href="javascript:;">
										<img src="{{ asset('admin-asset/images/logo.png')}}" class="img-fluid">
                                    </a>
                                </div>
                                <div class="kt-login__signin">
                                    <div class="kt-login__head">
                                        <h3 class="kt-login__title">Reset password</h3>
                                    </div>
                                    <div class="kt-login__form">
                                        <form class="kt-form" action="{{ route('admin.password.reset',['token'=>$token]) }}" method="POST">
                                            <div class="form-group">
                                                <div class="kt-input-icon kt-input-icon--right">
                                                    <input class="form-control pwd-hide-show" type="password" placeholder="Password" name="password" id="password">
                                                    <span class="kt-input-icon__icon kt-input-icon__icon--right show-hide ">
                                                        <i class="la la-eye-slash"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            @csrf
                                            <input type="hidden" name="token" value="{{ $token }}">
                                            <div class="form-group">
                                                <div class="kt-input-icon kt-input-icon--right">
                                                    <input class="form-control  pwd-hide-show" type="password" placeholder="Confirm Password" name="password_confirmation">
                                                    <span class="kt-input-icon__icon kt-input-icon__icon--right show-hide">
                                                        <i class="la la-eye-slash"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="kt-login__actions">
                                                <button id="kt_login_signup_submit" class="btn btn-brand btn-pill btn-elevate">Submit</button>
                                            </div>
                                            <input type="hidden" name="email" value="{{ request()->get('email') }}">
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="kt-grid__item kt-grid__item--fluid kt-grid__item--center kt-grid kt-grid--ver kt-login__content" style="background-image: url({{asset('admin-asset/images/media/bg/s1.jpg')}});">
                    <div class="kt-login__section">
                        <div class="kt-login__block">
                            <h3 class="kt-login__title">{{config('app.name')}}</h3>
                            <div class="kt-login__desc" >
								Find Your Next Career Here Our Open Positions
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
    $(document).ready(function() {
        $(".show-hide").click(function() {
            let input = $(this).siblings('input.pwd-hide-show');
            let icon = $(this).find('i');

            if (input.attr("type") === "password") {
                input.attr("type", "text");
                icon.removeClass("la-eye-slash").addClass("la-eye");
            } else {
                input.attr("type", "password");
                icon.removeClass("la-eye").addClass("la-eye-slash");
            }
        });
    });
</script>
@endpush
@endsection
