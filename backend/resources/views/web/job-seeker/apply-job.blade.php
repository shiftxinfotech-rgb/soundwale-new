@extends('web.layouts.default')
@section('title', 'Apply Job')
@section('content')
    <section class="page-title centred sub_banner">
        <div class="auto-container">
            <div class="content-box">
                <h1>Apply Job</h1>
                <ul class="bread-crumb clearfix">
                    <li><a href="{{ route('web.home') }}">Home</a></li>
                    <li>-</li>
                    <li>Apply Job</li>
                </ul>
            </div>
        </div>
    </section>
    <!-- page-title end -->

    <!-- contact-section -->
    <section class="contact-section recent_job_sec submit_role_main appy_dtl">
        <div class="auto-container">
            <div class="inner-container">
                <div class="row clearfix">

                    <div class="col-lg-8 col-md-12 col-sm-12 content-column">
                        <div class="job_details_main">
                            <div class="job_top_info">
                                <h2>{{ $JobPosting->title }}</h2>
                                <p><i class="fas fa-map-marker-alt"></i> {{ $JobPosting->location }}</p>
                                <ul>
                                    <li>
                                        <span>Salary:</span>
                                        {{ $JobPosting->salary }}
                                    </li>
                                    <li>
                                        <span>Experience Need:</span>
                                        {{ $JobPosting->sub_title }}
                                    </li>
                                </ul>
                            </div>
                            <div class="job-details-content">
                                <div class="text-box ">
                                    <h3>Job Description</h3>
                                    {!! $JobPosting->content !!}
                                </div>
                                <div class="text-box ">
                                    <h3>Responsibilities</h3>
                                    <ul class="list-item">
                                        {!! $JobPosting->short_content !!}
                                    </ul>
                                </div>
                                <div class="text-box ">
                                    <h3>Advantages</h3>
                                    {!! $JobPosting->work_type !!}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-12 col-sm-12 info-column apply_job_form">
                        <div class="info-box">
                            <h3>Apply for this job</h3>
                            <div class="contact-section">
                                <div class="form-inner">
                                    <form action="{{ route('web.apply.job.save') }}" method="POST"
                                        enctype="multipart/form-data" id="applyjob-form">
                                        @csrf
                                        <div class="row">
                                            <div class="col-sm-12 form-group">
                                                <label>Name <span>*</span></label>
                                                <input type="text" name="name" class="form-control"
                                                    placeholder="Your Full Name" value="{{ old('name') }}"
                                                    data-validation="required|name">
                                            </div>
                                            <div class="col-sm-12 form-group">
                                                <label>Email <span>*</span></label>
                                                <input type="email" name="email" id="email" class="form-control"
                                                    placeholder="Your Email Address" data-val="true"
                                                    data-val-required="please enter an email address"
                                                    pattern="[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                                                    data-validation="required|email">
                                            </div>
                                            <div class="col-md-12 col-sm-12 form-group">
                                                <label>Mobile No <span>*</span></label>
                                                <input type="tel" id="mobile_number" name="phone"
                                                    data-validation="required|number" class="form-control only-mobile"
                                                    placeholder="Enter Mobile Number" value="{{ old('mobile_number') }}">
                                                <input type="hidden" id="country_code" name="country_code" value="">
                                                <input type="hidden" name="job_name" value="{{ $JobPosting->title }}">
                                            </div>
                                            <div class="col-md-12 col-sm-12 form-group">
                                                <label>Resume <span>*</span></label>
                                                <div class="form-group file-placeholder">

                                                    <input type="file" name="resume" class="fileUpload"
                                                        accept="application/pdf" data-validation="required|mime size"
                                                        data-validation-allowing="pdf" data-validation-max-size="10M">

                                                    <div class="file-browse browse-btn">
                                                        <span class="file-browse-txt " id="file-name-display">Select Some
                                                            File </span>
                                                        <span class="browse">Upload CV</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-lg-12 w-100">
                                                <button id="submit" class="theme-btn btn-one w-100 white_btn"
                                                    type="submit">Apply Now</button>
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
    </section>
    <!-- contact-section end -->

@endsection
@push('script')
    <script>
        // JavaScript to handle file selection and update the text
        const fileInput = document.querySelector('.fileUpload');
        const browseBtn = document.querySelector('.browse-btn');
        const fileNameDisplay = document.getElementById('file-name-display');

        // Trigger the hidden file input when the browse button is clicked
        browseBtn.addEventListener('click', function() {
            fileInput.click();
        });

        // Update the file name display when a file is selected
        fileInput.addEventListener('change', function() {
            const fileName = this.files[0]?.name || "Select Some File";
            fileNameDisplay.textContent = fileName; // Update the display text
        });


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
    </script>

    <script>
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
                    phone: {
                        number: true,
                        required: true,
                        ValidPhoneNumber: true
                    },
                    service_id: {
                        required: true,
                    },
                    resume: {
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
                    phone: {
                        required: "Mobile number is required.",
                    },
                    service_id: {
                        required: "Services is required.",
                    },
                    resume: {
                        required: "Resume is required.",
                    },
                },
            };

            // Initialize form validation
            $("#applyjob-form").validate(conf);

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
@endpush
