@extends('web.layouts.default')
@section('title', 'Contact Us')
@section('content')

    <!-- page-title -->
    <section class="page-title centred sub_banner">
        <div class="auto-container">
            <div class="content-box">
                <h1>Contact Us</h1>
                <ul class="bread-crumb clearfix">
                    <li><a href="{{ route('web.home') }}">Home</a></li>
                    <li>-</li>
                    <li>Contact Us</li>
                </ul>
            </div>
        </div>
    </section>
    <!-- page-title end -->

    <!-- contact-section -->
    <section class="contact-section recent_job_sec contact_new_ctm">
        <div class="auto-container">
            <div class="inner-container">
                <div class="row clearfix">
                    <div class="col-lg-4 col-md-12 col-sm-12 info-column">
                        <div class="info-box">
                            <h3>Contact Information</h3>


                            {{-- <div class="single-item">
                                <div class="icon-box"><img src="assets/images/icons/icon-27.png" alt=""></div>
                                <h4>Main Warehouse</h4>
                                <p>10445 Brisbane Cir. Shiloh, Australia 81063</p>
                            </div> --}}
                            <div class="row">
                                <div class="col-lg-12 col-md-4">
                                    <div class="single-item">
                                        <div class="icon-box"><img src="{{ asset('web/assets/images/icons/icon-27.png') }}"
                                                alt=""></div>
                                        <h4>Address</h4>
                                        <p>{{ $footer->registered_address }}</p>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-4">
                                    <div class="single-item">
                                        <div class="icon-box"><img src="{{ asset('web/assets/images/icons/icon-28.png') }}"
                                                alt=""></div>
                                        <h4>Email Address</h4>
                                        <p><a href="mailto:{{ $footer->email }}">{{ $footer->email }}</a><br />
                                            {{-- <a href="mailto:contact@example.com">contact@example.com</a></p> --}}
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-4">
                                    <div class="single-item">
                                        <div class="icon-box"><img src="{{ asset('web/assets/images/icons/icon-29.png') }}"
                                                alt=""></div>
                                        <h4>Phone Number</h4>
                                        <p><a href="tel:{{ $footer->phone_number }}">{{ $footer->phone_number }}</a><br />
                                            {{-- <a href="tel:2085440142">+(208) 544
                                        -0142</a> --}}
                                        </p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div class="col-lg-8 col-md-12 col-sm-12 content-column">
                        <div class="form-inner">
                            <form action="{{ route('user.contact.us.save') }}" method="POST" enctype="multipart/form-data"
                                id="contactus-form">
                                @csrf
                                <div class="row clearfix">
                                    <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                        <label>Name <span class="text-danger">*</span></label>
                                        <input type="text" name="name" class="form-control"
                                            value="{{ old('name') }}" data-validation="required|name">
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                        <label>Phone Number<span class="text-danger">*</span></label>
                                        <input type="tel" id="mobile_number" name="mobile_number"
                                            data-validation="required|number" class="form-control only-mobile"
                                            value="{{ old('mobile_number') }}">
                                    </div>
                                    <input type="hidden" id="country_code" name="country_code" value="">

                                    <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                        <label>Email Address <span class="text-danger">*</span></label>
                                        <input type="email" name="email" id="email" class="form-control"
                                            data-val="true" data-val-required="please enter an email address"
                                            pattern="[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                                            data-validation="required|email">
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                        <label>Subject <span class="text-danger">*</span></label>
                                        <input type="text" name="subject" class="form-control"
                                            value="{{ old('subject') }}" data-validation="required|subject">
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                        <label>Write Message <span class="text-danger">*</span></label>
                                        <textarea name="message" class="form-control" rows="5" data-validation="required|message"></textarea>
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                                        <button type="submit" class="theme-btn btn-one" name="submit-form">Send
                                            Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- contact-section end -->


    <!-- google-map -->
    <section class="google-map">
        <div class="auto-container">
            <div class="inner-container">
                <iframe class="contact-map" src="{{ $footer->factory_address }}" style="border:0;" allowfullscreen=""
                    loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    </section>

@endsection
@push('script')
    <script>
        $.validator.addMethod("validEmail", function(value, element) {
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        }, "Please enter a valid email address");

        $.validator.addMethod("notDisposableEmail", function(value, element) {
            var disposableEmails = ['example.com', 'example.org', 'example.net'];
            var domain = value.split('@')[1];
            return disposableEmails.indexOf(domain) === -1;
        }, "Disposable email addresses are not allowed");

        $.validator.addMethod("ValidPhoneNumber", function(value, element) {
            var input = $("#mobile_number");
            return input.intlTelInput("isValidNumber");
        }, "Phone Number does not match the selected country code");

        $(document).ready(function() {
            var input = $("#mobile_number");

            var conf = {
                rules: {
                    name: {
                        required: true,
                    },
                    email: {
                        required: true,
                        validEmail: true,
                        notDisposableEmail: true,
                    },
                    mobile_number: {
                        number: true,
                        required: true,
                        ValidPhoneNumber: true
                    },
                    subject: {
                        required: true,
                    },
                    message: {
                        required: true,
                    },
                },
                messages: {
                    name: {
                        required: "Name is required.",
                    },
                    email: {
                        required: "Email is required.",
                    },
                    mobile_number: {
                        required: "Phone Number is required.",
                    },
                    subject: {
                        required: "Subject is required.",
                    },
                    message: {
                        required: "Message is required.",
                    },
                },
            };

            $("#contactus-form").validate(conf);

            if (input.length > 0) {
                input.intlTelInput({
                    initialCountry: "us",
                    separateDialCode: true,
                    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
                });

                input.on("countrychange keyup", function() {
                    var selectedCountryData = input.intlTelInput("getSelectedCountryData");
                    var countryCode = selectedCountryData.dialCode;
                    $("#country_code").val("+" + countryCode);
                    var mobileNumber = input.val();
                });
            }
        });
    </script>
@endpush
