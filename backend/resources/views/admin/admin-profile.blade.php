@extends('admin.layouts.default')
@section('title', 'My Profile')
@section('content')


<!-- begin:: Subheader -->
<div class="kt-subheader kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Personal Information</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
    </div>
</div>
<!-- end:: Subheader -->
<div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">

    <div class="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">

        <!--Begin::App-->
        <div class="kt-grid kt-grid--desktop kt-grid--ver kt-grid--ver-desktop kt-app">
            <button class="kt-app__aside-close" id="kt_user_profile_aside_close">
                <i class="la la-close"></i>
            </button>

            <div class="kt-grid__item kt-app__toggle kt-app__aside" id="kt_user_profile_aside">

                <div class="kt-portlet ">
                    <div class="kt-portlet__head  kt-portlet__head--noborder">
                        <div class="kt-portlet__head-label">
                            <h3 class="kt-portlet__head-title">
                            </h3>
                        </div>
                    </div>
                    <div class="kt-portlet__body kt-portlet__body--fit-y">

                        <!--begin::Widget -->
                        <div class="kt-widget kt-widget--user-profile-1">
                            <div class="kt-widget__head">
                                <div class="kt-widget__media">
                                    <img src="{{ $user->image_url }}" alt="image">
                                </div>
                                <div class="kt-widget__content">
                                    <div class="kt-widget__section">
                                        <a href="javascript:;" class="kt-widget__username">
                                            {{ $user->first_name }} {{ $user->last_name }}
                                        </a>
                                        <span class="kt-widget__subtitle">
                                            Admin
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="kt-widget__body">
                                <div class="kt-widget__content">
                                    <div class="kt-widget__info widget_ctm">
                                        <span class="kt-widget__label">Email :</span>
                                        <a href="mailto:{{ $user->email }}" class="kt-widget__data">
                                            {{ $user->email }} </a>
                                    </div>
                                    @if(!empty($user->phone))
                                    <div class="kt-widget__info widget_ctm">
                                        <span class="kt-widget__label">Phone :</span>
                                        <a href="tel:+{{ $user->phone }}"
                                           class="kt-widget__data">{{ $user->phone }}</a>
                                    </div>
                                    @endif
                                </div>
                                <div class="kt-widget__items">
                                    <a href="{{ route('admin.profile.edit') }}"
                                       class="kt-widget__item kt-widget__item--active">
                                        <span class="kt-widget__section">
                                            <span class="kt-widget__icon">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                                                     height="24px" viewBox="0 0 24 24" version="1.1"
                                                     class="kt-svg-icon">
                                                <g stroke="none" stroke-width="1" fill="none"
                                                   fill-rule="evenodd">
                                                <polygon id="Shape" points="0 0 24 0 24 24 0 24" />
                                                <path
                                                    d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
                                                    id="Mask" fill="#000000" fill-rule="nonzero"
                                                    opacity="0.3" />
                                                <path
                                                    d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
                                                    id="Mask-Copy" fill="#000000" fill-rule="nonzero" />
                                                </g>
                                                </svg> </span>
                                            <span class="kt-widget__desc">
                                                Personal Information
                                            </span>
                                        </span>
                                    </a>

                                    <a href="{{ route('admin.profile.change.password') }}" class="kt-widget__item ">
                                        <span class="kt-widget__section">
                                            <span class="kt-widget__icon">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                                                     height="24px" viewBox="0 0 24 24" version="1.1"
                                                     class="kt-svg-icon">
                                                <g stroke="none" stroke-width="1" fill="none"
                                                   fill-rule="evenodd">
                                                <rect id="bound" x="0" y="0" width="24"
                                                      height="24" />
                                                <path
                                                    d="M4,4 L11.6314229,2.5691082 C11.8750185,2.52343403 12.1249815,2.52343403 12.3685771,2.5691082 L20,4 L20,13.2830094 C20,16.2173861 18.4883464,18.9447835 16,20.5 L12.5299989,22.6687507 C12.2057287,22.8714196 11.7942713,22.8714196 11.4700011,22.6687507 L8,20.5 C5.51165358,18.9447835 4,16.2173861 4,13.2830094 L4,4 Z"
                                                    id="Path-50" fill="#000000" opacity="0.3" />
                                                <path
                                                    d="M12,11 C10.8954305,11 10,10.1045695 10,9 C10,7.8954305 10.8954305,7 12,7 C13.1045695,7 14,7.8954305 14,9 C14,10.1045695 13.1045695,11 12,11 Z"
                                                    id="Mask" fill="#000000" opacity="0.3" />
                                                <path
                                                    d="M7.00036205,16.4995035 C7.21569918,13.5165724 9.36772908,12 11.9907452,12 C14.6506758,12 16.8360465,13.4332455 16.9988413,16.5 C17.0053266,16.6221713 16.9988413,17 16.5815,17 C14.5228466,17 11.463736,17 7.4041679,17 C7.26484009,17 6.98863236,16.6619875 7.00036205,16.4995035 Z"
                                                    id="Mask-Copy" fill="#000000" opacity="0.3" />
                                                </g>
                                                </svg> </span>
                                            <span class="kt-widget__desc">
                                                Change Password
                                            </span>
                                        </span>
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!--End:: App Aside-->

            <!--Begin:: App Content-->
            <div class="kt-grid__item kt-grid__item--fluid kt-app__content">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="kt-portlet">
                            <div class="kt-portlet__head">
                                <div class="kt-portlet__head-label">
                                    <h3 class="kt-portlet__head-title">Personal Information <small>update your personal
                                            information</small></h3>
                                </div>
                                <div class="kt-portlet__head-toolbar">

                                </div>
                            </div>
                            <form class="kt-form kt-form--label-right" action="{{ route('admin.profile.update') }}"
                                  enctype="multipart/form-data" isReload="{{ route('admin.profile.edit') }}"
                                  id="admin-profile-form" method="post">
                                @csrf
                                <div class="kt-portlet__body">
                                    <div class="kt-section kt-section--first">
                                        <div class="kt-section__body">
                                            <div class="row">
                                                <label class="col-xl-3"></label>
                                                <div class="col-lg-9 col-xl-6">
                                                    <h3 class="kt-section__title kt-section__title-sm">Admin Info:
                                                    </h3>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-xl-3 col-lg-3 col-form-label">Avatar</label>
                                                <div class="col-lg-9 col-xl-6">
                                                    <div class="kt-avatar kt-avatar--outline kt-avatar--circle"
                                                         id="kt_apps_user_add_avatar">
                                                        <div class="kt-avatar__holder" id="avatarHolder"
                                                             style="background-image: url('{{ $user->image_url ? $user->image_url : asset('assets/media/users/default.jpg') }}');">
                                                        </div>
                                                        <label class="kt-avatar__upload" data-toggle="kt-tooltip"
                                                               title="Change avatar" data-original-title="Change avatar">
                                                            <i class="fa fa-pen"></i>
                                                            <input type="file" name="image"
                                                                   accept=".png, .jpg, .jpeg" id="profileAvatarInput">
                                                        </label>
                                                        <span class="kt-avatar__cancel" data-toggle="kt-tooltip"
                                                              title="Cancel avatar" data-original-title="Cancel avatar">
                                                            <i class="fa fa-times"></i>
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="form-group row">
                                                <label class="col-xl-3 col-lg-3 col-form-label">First Name</label>
                                                <div class="col-lg-9 col-xl-6">
                                                    <input class="form-control" type="text" name="first_name"
                                                           placeholder="Enter First Name"
                                                           value="{{ $user->first_name ?? '' }}">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-xl-3 col-lg-3 col-form-label">Last Name</label>
                                                <div class="col-lg-9 col-xl-6">
                                                    <input class="form-control" type="text" name="last_name"
                                                           placeholder="Enter Last Name"
                                                           value="{{ $user->last_name ?? '' }}">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-xl-3 col-lg-3 col-form-label">Company Name <span
                                                        class="text-danger">*</span> </label>
                                                <div class="col-lg-9 col-xl-6">
                                                    <input class="form-control" type="text" name="name"
                                                           placeholder="Enter Company Name"
                                                           value="{{ $user->name ?? '' }}" class="form-control">
                                                </div>
                                            </div>
                                            <div class="row">
                                                <label class="col-xl-3"></label>
                                                <div class="col-lg-9 col-xl-6">
                                                    <h3 class="kt-section__title kt-section__title-sm">Contact Info:
                                                    </h3>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-xl-3 col-lg-3 col-form-label">Phone Number</label>
                                                <div class="col-lg-9 col-xl-6">
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="la la-phone"></i></span>
                                                        </div>
                                                        <input type="text" class="form-control" name="phone" placeholder="Enter Phone Number" value="{{ $user->phone ?? '' }}" aria-describedby="basic-addon1">
                                                    </div>
                                                </div>
                                            </div>
                                            <!--                                                <div class="form-group row">
                                                                                                <label class="col-xl-3 col-lg-3 col-form-label">Company Name <span class="text-danger">*</span> </label>
                                                                                                <div class="col-lg-9 col-xl-6">
                                                                                                    <input class="form-control" type="text" name="name" placeholder="Enter Company Name" value="{{ $user->name ?? '' }}" class="form-control">
                                                                                                </div>
                                                                                            </div>-->


                                            <div class="form-group row">
                                                <label class="col-xl-3 col-lg-3 col-form-label">Email Address <span class="text-danger">*</span> </label>
                                                <div class="col-lg-9 col-xl-6">
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="la la-envelope"></i></span>
                                                        </div>
                                                        <input class="form-control" type="email" name="email" placeholder="Enter email" value="{{ $user->email ?? '' }}" aria-describedby="basic-addon1">
                                                    </div>
                                                    <span class="form-text text-muted">We'll never share your email
                                                        with anyone else.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="kt-portlet__foot">
                                    <div class="kt-form__actions">
                                        <div class="row">
                                            <div class="col-lg-3 col-xl-3">
                                            </div>
                                            <div class="col-lg-9 col-xl-9">
                                                <button type="submit" class="btn btn-brand">Save</button>
                                                <a href="{{ route('admin.home') }}"
                                                   class="btn btn-secondary">Cancel</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@push('script')
<script type="text/javascript">
    // Avatar Image Change Handling
    document.getElementById('profileAvatarInput').addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file && file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('avatarHolder').style.backgroundImage = `url(${e.target.result})`;
            };
            reader.readAsDataURL(file);
        }
    });

    // Custom Validator for International Phone Number
    $.validator.addMethod("internationalPhoneNumber", function (value, element) {
        return this.optional(element) || /^[+]?(\d{1,4})?(\s?\(?\d{1,3}\)?\s?)?(\d{7,15})$/.test(value);
    }, "Please enter a valid phone number (e.g., +45215115 or 452-151-15).");

    // Validation Configuration
    let conf = {
        rules: {
            name: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                // required: true,
                internationalPhoneNumber: true,
            },
        }, errorPlacement: function (error, element) {
            // If inside an input group, place error after the group
            if (element.attr("name") === "image") {
                // Insert error after the whole avatar container
                error.insertAfter("#kt_apps_user_add_avatar");
            } else if (element.closest('.input-group').length) {
                error.insertAfter(element.closest('.input-group'));
            } else {
                error.insertAfter(element);
            }
        }

    };

    validationFormAndSubmit($('#admin-profile-form'), conf);
</script>
@endpush
