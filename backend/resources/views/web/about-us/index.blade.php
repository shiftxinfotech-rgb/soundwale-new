@extends('web.layouts.default')
@section('title', 'About Us')
@section('content')
    <link href="{{ asset('web/assets/css/module-css/team.css') }}" rel="stylesheet">

    <!-- page-title -->
    <section class="page-title centred sub_banner">
        <div class="auto-container">
            <div class="content-box">
                <h1>About Us</h1>
                <ul class="bread-crumb clearfix">
                    <li><a href="{{ route('web.home') }}">Home</a></li>
                    <li>-</li>
                    <li>About Us</li>
                </ul>
            </div>
        </div>
    </section>
    <!-- page-title end -->

    <section class="about-style-two about_home_main about_inner_main">
        <div class="auto-container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-12 col-sm-12 content-column">
                    <div class="content_block_one">
                        <div class="content-box">
                            <div class="sec-title pb_20 sec-title-animation animation-style2">
                                <span class="sub-title mb_10 title-animation">About Us</span>
                                <h2 class="title-animation">
                                    {!! $aboutUs->title_2 !!}
                                </h2>
                            </div>
                            <div class="text-box">
                                <ul class="list-style-one clearfix">
                                    {!! $aboutUs->description !!}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 video-column">
                    <div class="video_block_two">
                        <div class="video-box  z_1 p_relative  centred">
                            <div class="video-inner" style="background-image: url({{ $aboutUs->image_url }});">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    @if ($ourValues->isNotEmpty())
        <section class="recent_job_sec core_value_main">
            <div class="auto-container">
                <div class="sec-title centred pb_40 sec-title-animation animation-style2">
                    <span class="sub-title mb_10 title-animation">Our Core Values</span>
                    <h2 class="title-animation"> {!! $aboutUs->our_value_title !!}</h2>
                </div>
                <div class="row">
                    @foreach ($ourValues as $ourValue)
                        <div class="col-lg-3 col-md-6 col-sm-12 chooseus-block">
                            <div class="chooseus-block-one text-center">
                                <div class="inner-box">
                                    <div class="icon-box">
                                        <img src="{{ $ourValue->image_url }}" alt="">
                                    </div>
                                    <h3><a href="javascript:;"> {{ $ourValue->title }}</a></h3>
                                    <p>
                                        @if (strlen($ourValue->description) > 200)
                                            <span
                                                class="short-description">{{ Str::limit($ourValue->description, 200) }}</span>
                                            <span class="full-description"
                                                style="display: none;">{{ $ourValue->description }}</span>
                                            <a href="javascript:void(0);" class="read-more-toggles">Read More</a>
                                        @else
                                            {{ $ourValue->description }}
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

    <section class="download-section  submit_role_home_main work_with_main">
        <div class="auto-container">
            <div class="inner-container">
                <div class="pattern-layer"
                    style="background-image: url({{ asset('web/assets/images/shape/shape-6.png') }});"></div>
                <div class="row align-items-center">
                    <div class="col-lg-4 col-md-12 col-sm-12 image-column">
                        <div class="image-box">
                            <figure class="image"><img src="{{ $aboutUs->image_2_url }}" alt=""></figure>
                        </div>
                    </div>
                    <div class="col-lg-8 col-md-12 col-sm-12 content-column">
                        <div class="content-box">
                            <h2>Work With Us </h2>
                            <ul class="list-item mb_30">
                                {!! $aboutUs->lets_work_together_title !!}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- team-section -->
    @if ($teams->isNotEmpty())
        <section class="team-section z_1 centred pt_0 pb_0">
            <div class="auto-container">
                <div class="sec-title pb_60 sec-title-animation animation-style2">
                    <span class="sub-title mb_10 title-animation">Our Team</span>
                    <h2 class="title-animation">Meet The Team</h2>
                </div>
                <div class="row clearfix">
                    @foreach ($teams as $team)
                        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 team-block">
                            <div class="team-block-one wow fadeInUp animated" data-wow-delay="00ms"
                                data-wow-duration="1500ms">
                                <div class="inner-box">
                                    <div class="image-box">
                                        <figure class="image"><img src="{{ $team->image_url }}" alt="">
                                        </figure>
                                        <figure class="overlay-image"><img src="{{ $team->image_url }}" alt="">
                                        </figure>
                                    </div>
                                    <div class="lower-content">
                                        <h3><a href="javascript:;">{{ $team->name }}</a></h3>
                                        <span class="designation"> {{ $team->designation }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>
        <!-- team-section end -->
    @endif

@endsection
@push('script')
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
