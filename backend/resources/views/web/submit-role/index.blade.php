@extends('web.layouts.default')
@section('title', 'Contact Us')
@section('content')
    <link href="{{ asset('web/assets/css/step.css') }}" rel="stylesheet">

    <!-- page-title -->
    <section class="page-title centred sub_banner">
        <div class="auto-container">
            <div class="content-box">
                <h1>Submit Role</h1>
                <ul class="bread-crumb clearfix">
                    <li><a href="{{ route('web.home') }}">Home</a></li>
                    <li>-</li>
                    <li>Submit Role</li>
                </ul>
            </div>
        </div>
    </section>
    <!-- page-title end -->


    <!-- contact-section -->
    <section class="contact-section recent_job_sec submit_role_main">
        <div class="auto-container">
            <div class="inner-container">
                <div class="row clearfix">
                    <div class="col-lg-4 col-md-12 col-sm-12 info-column">
                        <div class="info-box">
                            <h3>{!! nl2br($data['submit_role_title']) !!} </h3>
                            <p>
                                {!! nl2br($data['submit_role_description']) !!}
                            </p>
                            <div class="submit_role_icon">
                                <img src="{{ asset('web/assets/images/submit_role_icon.png') }}" alt="img">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8 col-md-12 col-sm-12 content-column">
                        <div class="form-inner">
                            <form action="{{ route('web.submit.role.save') }}" method="POST" enctype="multipart/form-data"
                                id="submit-role-form">
                                @csrf
                                <div class="progress_bar_main">
                                    <div class="progress-bar">
                                        <div class="progress" id="progress"></div>
                                        <div class="progress-step active" data-title="Job Details"></div>
                                        <div class="progress-step" data-title="Employment"></div>
                                        <div class="progress-step" data-title="Your Details"></div>
                                    </div>
                                </div>

                                <!-- Steps -->
                                <div class="form-step active">
                                    <h3>Job Details</h3>
                                    <div class="row">
                                        <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                            <label>Job Title<span class="text-danger">*</span></label>
                                            <input type="text" name="job" id="job" class="form-control"
                                                value="{{ old('job') }}" placeholder="Enter Job Title" required>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                            <label>Hires <span class="text-danger">*</span></label>
                                            <input type="number" name="hires" id="hires" class="form-control"
                                                value="{{ old('hires') }}" placeholder="Enter Number of Hires" required>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                            <label>Job Description <span class="text-danger">*</span></label>
                                            <textarea name="job_description" class="form-control" value="{{ old('job_description') }}" placeholder=" Enter Job Description"
                                                data-validation="required|job_description"></textarea>
                                        </div>
                                    </div>
                                    <div class="btn_space">
                                        <a class="btn btn-next theme-btn btn-one">Next</a>
                                    </div>
                                </div>
                                <div class="form-step ">
                                    <h3>Employment</h3>
                                    <div class="row">
                                        <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                            <label>Time <span class="text-danger">*</span></label>
                                            <select class="form-control" name="time" id="timeDropdown">
                                                <option value="">Select Time</option>
                                                <option value="Full-Time">Full Time</option>
                                                <option value="Part-Time">Part Time</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                            <label>Location <span class="text-danger">*</span></label>
                                            <input type="text" name="location" class="form-control"
                                                value="{{ old('location') }}" placeholder="Enter Location"
                                                data-validation="required|location">
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                            <label>Salary <span class="text-danger">*</span></label>
                                            <input type="text" name="salary" class="form-control"
                                                value="{{ old('salary') }}" placeholder="Enter Salary"
                                                data-validation="required|salary">
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                            <label>Start Date <span class="text-danger">*</span></label>
                                            <input type="date" name="start_date" class="form-control"
                                                value="{{ old('start_date') }}" placeholder="Enter Start Date"
                                                data-validation="required|start_date"  min="{{ \Carbon\Carbon::today()->toDateString() }}">
                                        </div>
                                    </div>
                                    <div class=" btn_space">
                                        <a class="btn btn-prev theme-btn btn-one">Previous</a>
                                        <a class="btn btn-next theme-btn btn-one">Next</a>
                                    </div>
                                </div>
                                <div class="form-step">
                                    <h3>Your Details</h3>
                                    <div class="row">
                                        <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                            <label>Name <span class="text-danger">*</span></label>
                                            <input type="text" name="name" class="form-control"
                                                value="{{ old('name') }}" placeholder="Enter Name"
                                                data-validation="required|name">
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                            <label>Business <span class="text-danger">*</span></label>
                                            <input type="text" name="business" class="form-control"
                                                value="{{ old('business') }}" placeholder="Enter Business"
                                                data-validation="required|business">
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                            <label>Email <span class="text-danger">*</span></label>
                                            <input type="email" name="email" id="email" class="form-control"
                                                data-val="true" data-val-required="please enter an email address"
                                                pattern="[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                                                data-validation="required|email" placeholder="Enter Email">
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                            <label>Phone Number <span class="text-danger">*</span> </label>
                                            <input type="tel" id="mobile_number" name="phone_number"
                                                data-validation="required|phone_number" class="form-control only-mobile"
                                                value="{{ old('phone_number') }}" placeholder="Enter Phone Number">
                                            <input type="hidden" id="country_code" name="country_code" value="">
                                        </div>
                                    </div>
                                    <div class="add-experience">
                                        <a class="add-exp-btn"></a>
                                    </div>

                                    <div class="btn_space btn_space_last">
                                        <a class="btn btn-prev theme-btn btn-one">Previous</a>
                                        <div class="submit_mail_btn">
                                            <input type="submit" value="Submit" name="Submit"
                                                class="btn btn-complete theme-btn btn-one submit_btn">
                                            <input type="submit" value="{{$home_settings->email}}"
                                                name="cv@connect-globalres.com"
                                                class="btn btn-complete theme-btn btn-one mail_btn">
                                        </div>
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
    {{-- <script src="{{ asset('web/assets/js/step.js') }}"></script> --}}

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            // Existing validation logic for custom methods
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

            // Handle input event to remove validation messages on typing
            function clearValidationMessages(input) {
                $(input).next('.error-message').remove();
            }

            $(document).ready(function() {
                var input = $("#mobile_number");

                var conf = {
                    rules: {
                        // job: {
                        //     required: true
                        // },
                        // hires: {
                        //     number: true,
                        //     required: true
                        // },
                        // job_description: {
                        //     required: true
                        // },
                        // time: {
                        //     required: true
                        // },
                        email: {
                            required: true,
                            validEmail: true,
                            notDisposableEmail: true
                        },
                        phone_number: {
                            number: true,
                            required: true,
                            ValidPhoneNumber: true
                        },
                        // location: {
                        //     required: true
                        // },
                        // salary: {
                        //     required: true
                        // },
                        // start_date: {
                        //     required: true
                        // },
                        name: {
                            required: true
                        },
                        business: {
                            required: true
                        },
                    }
                };

                // Initialize form validation
                $("#submit-role-form").validate(conf);

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
                    });
                }

                // Attach event listeners to input fields to clear validation messages
                const inputFields = document.querySelectorAll('input, select, textarea');
                inputFields.forEach(field => {
                    field.addEventListener('input', function() {
                        clearValidationMessages(this);
                    });

                    field.addEventListener('change', function() {
                        clearValidationMessages(this);
                    });
                });

                const prevBtns = document.querySelectorAll(".btn-prev");
                const nextBtns = document.querySelectorAll(".btn-next");
                const progress = document.getElementById("progress");
                const formSteps = document.querySelectorAll(".form-step");
                const progressSteps = document.querySelectorAll(".progress-step");

                let formStepsNum = 0;

                // Update form steps visibility
                function updateFormSteps() {
                    formSteps.forEach(formStep => {
                        formStep.classList.remove("active");
                    });
                    formSteps[formStepsNum].classList.add("active");
                }

                // Update progress bar
                function updateProgressBar() {
                    progressSteps.forEach((progressStep, idx) => {
                        if (idx < formStepsNum + 1) {
                            progressStep.classList.add("active");
                        } else {
                            progressStep.classList.remove("active");
                        }
                    });

                    const progressActive = document.querySelectorAll(".progress-step.active");
                    progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) *
                        100 + '%';
                }

                // Show validation message next to input
                function showValidationMessage(input, message) {
                    $(input).next('.error-message').remove(); // Clear any existing message
                    $(input).after(
                        `<span class="error-message" style="color: red; font-size: 12px;">${message}</span>`
                        );
                }

                // Handle next button click (validation check)
                nextBtns.forEach(btn => {
                    btn.addEventListener("click", function() {
                        let isValid = true;
                        clearValidationMessages(); // Clear all previous validation messages

                        // Step 1 validation
                        if (formStepsNum === 0) {
                            const jobInput = document.getElementById("job");
                            const hiresInput = document.getElementById("hires");
                            const jobDescriptionInput = document.querySelector(
                                "[name='job_description']");

                            if (!jobInput || jobInput.value.trim() === "") {
                                showValidationMessage(jobInput, " Job title is required");
                                isValid = false;
                            }

                            if (!hiresInput || hiresInput.value.trim() === "") {
                                showValidationMessage(hiresInput,
                                    "Number of hires is required");
                                isValid = false;
                            }

                            if (!jobDescriptionInput || jobDescriptionInput.value.trim() ===
                                "") {
                                showValidationMessage(jobDescriptionInput,
                                    "Job description is required");
                                isValid = false;
                            }
                        }

                        // Step 2 validation
                        if (formStepsNum === 1) {
                            const locationInput = document.querySelector(
                                "[name='location']");
                            const salaryInput = document.querySelector("[name='salary']");
                            const startDateInput = document.querySelector(
                                "[name='start_date']");
                            const dropdown = document.getElementById("timeDropdown");
                            const selectedText = dropdown.options[dropdown.selectedIndex]
                                .value;

                            if (!selectedText) {
                                showValidationMessage(dropdown, "Time is required");
                                isValid = false;
                            }

                            if (!locationInput || locationInput.value.trim() === "") {
                                showValidationMessage(locationInput,
                                "Location is required");
                                isValid = false;
                            }

                            if (!salaryInput || salaryInput.value.trim() === "") {
                                showValidationMessage(salaryInput, "Salary is required");
                                isValid = false;
                            }

                            if (!startDateInput || startDateInput.value.trim() === "") {
                                showValidationMessage(startDateInput,
                                    "Start Date is required");
                                isValid = false;
                            }
                        }

                        // Step 3 validation
                        if (formStepsNum === 2) {
                            const nameInput = document.querySelector("[name='name']");
                            const businessInput = document.querySelector(
                                "[name='business']");
                            const emailInput = document.querySelector("[name='email']");
                            const phoneInput = document.querySelector(
                                "[name='phone_number']");

                            if (!nameInput || nameInput.value.trim() === "") {
                                showValidationMessage(nameInput, "Name is required");
                                isValid = false;
                            }

                            if (!businessInput || businessInput.value.trim() === "") {
                                showValidationMessage(businessInput,
                                "Business is required");
                                isValid = false;
                            }

                            if (!emailInput || emailInput.value.trim() === "") {
                                showValidationMessage(emailInput, "Email is required");
                                isValid = false;
                            }

                            if (!phoneInput || phoneInput.value.trim() === "") {
                                showValidationMessage(phoneInput,
                                    "Phone number is required");
                                isValid = false;
                            }
                        }

                        // Move to next step if valid
                        if (isValid) {
                            formStepsNum++;
                            updateFormSteps();
                            updateProgressBar();
                        }
                    });
                });

                // Handle prev button click
                prevBtns.forEach(btn => {
                    btn.addEventListener("click", function() {
                        formStepsNum--;
                        clearValidationMessages();
                        updateFormSteps();
                        updateProgressBar();
                    });
                });
            });
        });
    </script>
@endpush
