@extends('web.layouts.default')
@section('title', 'Hiring Talent')
@section('content')
    <!-- page-title -->
    <section class="page-title centred sub_banner">
        <div class="auto-container">
            <div class="content-box">
                <h1>Hiring Talent</h1>
                <ul class="bread-crumb clearfix">
                    <li><a href="{{ route('web.home') }}">Home</a></li>
                    <li>-</li>
                    <li>Hiring Talent</li>
                </ul>
            </div>
        </div>
    </section>
    <!-- page-title end -->

    {{-- <section class="about-style-two about_home_main about_inner_main">
        <div class="auto-container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-12 col-sm-12 content-column">
                    <div class="content_block_one">
                        <div class="content-box">
                            <div class="sec-title pb_20 sec-title-animation animation-style2">
                                <span class="sub-title mb_10 title-animation">Who we are</span>
                                <h2 class="title-animation">
                                    {!! $data['who_we_are_title'] ?? '' !!} </h2>
                            </div>
                            <div class="text-box">
                                <p>
                                    {!! $data['who_we_are_description'] ?? '' !!}
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 video-column">
                    <div class="video_block_two video_block_talent">
                        <div class="video-box  z_1 p_relative  centred">
                            <img src="{{ asset('storage/app/other_page/' . $data['who_we_are_image']) }}" alt="img">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> --}}
    @if ($solutions->isNotEmpty())
        <section class="recent_job_sec core_value_main solutions_main">
            <div class="auto-container">
                <div class="sec-title centred pb_40 sec-title-animation animation-style2">
                    <span class="sub-title mb_10 title-animation">Solutions</span>
                    <h2 class="title-animation">{!! nl2br($data['solution_text'] ?? '') !!} </h2>
                </div>
                <div class="row">

                    @foreach ($solutions as $solution)
                        <div class="col-lg-3 col-md-6 col-sm-12 chooseus-block">
                            <div class="chooseus-block-one text-center">
                                <div class="inner-box">
                                    <div class="icon-box">
                                        <img src="{{ $solution->image_url }}" alt="">
                                    </div>
                                    <h3><a href="javascript:;">{{ $solution->title }}</a></h3>
                                    <p>
                                        @if (strlen($solution->description) > 200)
                                            <span
                                                class="short-description">{{ Str::limit($solution->description, 200) }}</span>
                                            <span class="full-description"
                                                style="display: none;">{{ $solution->description }}</span>
                                            <a href="javascript:void(0);" class="read-more-toggles">Read More</a>
                                        @else
                                            {{ $solution->description }}
                                        @endif
                                    </p>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>
    @endif
    @if ($testimonials->isNotEmpty())

        <section class="testimonial-section testimonial_main testimonial_main_talent">
            <div class="pattern-layer" style="background-image: url({{ asset('web/assets/images/shape/shape-3.png') }});">
            </div>
            <div class="auto-container">
                <div class="sec-title light centred pb_40 sec-title-animation animation-style2">
                    <span class="sub-title mb_10 title-animation">Testimonials</span>
                    <h2 class="title-animation">{!! $home_settings->testimonials_title !!}</h2>
                </div>
                <div class="three-item-carousel owl-carousel owl-theme owl-dots-none owl-nav-none">
                    @foreach ($testimonials as $testimonial)
                        <div class="testimonial-block-one">
                            <div class="inner-box">
                                <div class="shape"
                                    style="background-image: url( {{ asset('web/assets/images/shape/shape-7.png') }});">
                                </div>
                                <div class="icon-box"><img src="{{ asset('web/assets/images/icons/icon-10.png ') }}"
                                        alt=""></div>
                                <div class="author-box">
                                    <figure class="thumb-box"><img src="{{ $testimonial->image_url }}" alt="">
                                    </figure>
                                    <h4>{{ $testimonial->name }}</h4>
                                    <span class="designation">{{ $testimonial->designation }}</span>
                                </div>
                                <p>
                                    @if (strlen($testimonial->message) > 150)
                                        <span class="short-message">{{ Str::limit($testimonial->message, 200) }}</span>
                                        <span class="full-message"
                                            style="display: none;">{{ $testimonial->message }}</span>
                                        <a href="javascript:void(0);" class="read-more-toggle">Read
                                            More</a>
                                    @else
                                        {{ $testimonial->message }}
                                    @endif
                                </p>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>
    @endif

    <!-- contact-section -->
    <section class="contact-section recent_job_sec submit_role_main ">
        <div class="auto-container">
            <div class="inner-container">
                <div class="row clearfix">
                    <div class="col-lg-4 col-md-12 col-sm-12 info-column">
                        <div class="info-box">
                            <h3>{!! nl2br($data['hiring_needs_text']) !!} </h3>
                            <p>
                                {!! $data['hiring_needs_description'] ?? '' !!}
                            </p>
                            <div class="submit_role_icon">
                                <img src="{{ asset('web/assets/images/submit_role_icon.png') }}" alt="img">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8 col-md-12 col-sm-12 content-column">
                        <div class="form-inner">
                            <form action="{{ route('web.talent.seeker.save') }}" method="POST"
                                enctype="multipart/form-data" id="taletn-seeker-form">
                                @csrf
                                <div class="row clearfix">
                                    <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                        <label>Name <span class="text-danger">*</span></label>
                                        <input type="text" name="name" class="form-control"
                                            value="{{ old('name') }}" placeholder="Enter Name"
                                            data-validation="required|name">
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                        <label>Designation <span class="text-danger">*</span></label>
                                        <input type="text" name="designation" class="form-control"
                                            value="{{ old('designation') }}" placeholder="Enter Designation"
                                            data-validation="required|designation">
                                    </div>
                                    <div class="col-lg-6 col-md-6 form-group">
                                        <label>Company Name <span class="text-danger">*</span></label>
                                        <input type="text" name="company_name" class="form-control"
                                            value="{{ old('company_name') }}" placeholder="Enter Company Name"
                                            data-validation="required|company_name">
                                    </div>
                                    <div class="col-lg-6 col-md-6 form-group">
                                        <label>Mobile No <span class="text-danger">*</span></label>
                                        <input type="tel" id="mobile_number" name="mobile_no"
                                            data-validation="required|mobile_no" class="form-control only-mobile"
                                            value="{{ old('mobile_no') }}" placeholder="Enter Mobile No">
                                        <input type="hidden" id="country_code" name="country_code" value="">

                                    </div>
                                    <div class="col-lg-6 col-md-6 form-group">
                                        <label>Work Email <span class="text-danger">*</span></label>
                                        <input type="email" name="work_email" id="email" class="form-control"
                                            data-val="true" data-val-required="please enter an email address"
                                            pattern="[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                                            data-validation="required|email" placeholder="Enter Work Email">
                                    </div>
                                    <div class="col-lg-6 col-md-6 form-group">
                                        <label>Skype <span class="text-danger">*</span></label>
                                        <input type="text" name="skype" class="form-control"
                                            value="{{ old('skype') }}" placeholder="Enter Skype"
                                            data-validation="required|skype">
                                    </div>
                                    <div class="col-lg-6 col-md-6 form-group">
                                        <label>Company Website <span class="text-danger">*</span></label>
                                        <input type="url" name="company_website" class="form-control"
                                            value="{{ old('company_website') }}" placeholder="Enter Company Website"
                                            data-validation="required|company_website">
                                    </div>
                                    <div class="col-lg-6 col-md-6 form-group">
                                        <label>City <span class="text-danger">*</span></label>
                                        <input type="text" name="city" class="form-control"
                                            value="{{ old('city') }}" placeholder="Enter City"
                                            data-validation="required|city">
                                    </div>

                                    <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                        <label>Job Description <span class="text-danger">*</span></label>
                                        <textarea type="text" name="job_description" class="form-control" value="{{ old('job_description') }}"
                                            placeholder="Enter Job Description" data-validation="required|job_description"></textarea>
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                                        <button type="submit" class="theme-btn btn-one"
                                            name="submit-form">Submit</button>
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
        }, "Mobile Number does not match the selected country code");

        $(document).ready(function() {
            var input = $("#mobile_number");

            var conf = {
                rules: {
                    name: {
                        required: true,
                    },
                    work_email: {
                        required: true,
                        validEmail: true,
                        notDisposableEmail: true,
                    },
                    mobile_no: {
                        number: true,
                        required: true,
                        ValidPhoneNumber: true
                    },
                    designation: {
                        required: true,
                    },
                    company_name: {
                        required: true,
                    },
                    skype: {
                        required: true,
                    },
                    company_website: {
                        required: true,
                    },
                    city: {
                        required: true,
                    },
                    job_description: {
                        required: true,
                    },
                }
            };

            // Initialize form validation
            $("#taletn-seeker-form").validate(conf);

            // Initialize intlTelInput for mobile number input field
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
                    // console.log("Country Code: " + $("#country_code").val());
                    // console.log("Mobile Number: " + mobileNumber);
                });
            }
        });
    </script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const toggles = document.querySelectorAll('.read-more-toggles');

            toggles.forEach(function(toggle) {
                toggle.addEventListener('click', function() {
                    const shortDescription = this.previousElementSibling.previousElementSibling;
                    const fullDescription = this.previousElementSibling;

                    if (fullDescription.style.display === "none") {
                        fullDescription.style.display = "inline";
                        shortDescription.style.display = "none";
                        this.textContent = "Read Less";
                    } else {
                        fullDescription.style.display = "none";
                        shortDescription.style.display = "inline";
                        this.textContent = "Read More";
                    }
                });
            });
        });
    </script>
@endpush
