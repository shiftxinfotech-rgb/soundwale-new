@extends('web.layouts.default')
@section('title', 'Careers')
@section('content')

    <!-- page-title -->
    <section class="page-title centred sub_banner">
        <div class="auto-container">
            <div class="content-box">
                <h1>Testimonials</h1>
                <ul class="bread-crumb clearfix">
                    <li><a href="{{ route('web.home') }}">Home</a></li>
                    <li>-</li>
                    <li>Testimonials</li>
                </ul>
            </div>
        </div>
    </section>
    <!-- page-title end -->


    <section class="testimonial-section testimonial_main testimonial_main_ctm">
        @if ($testimonials->isNotEmpty())

            @if ($testimonials->where('type', 0)->isNotEmpty())
                <div class="auto-container">
                    <div class="row">
                        <div class="sec-title centred  sec-title-animation animation-style2">
                            <span class="sub-title mb_10 title-animation">Clients</span>
                        </div>
                        @foreach ($testimonials->where('type', 0) as $testimonial)
                            <div class="col-lg-4">
                                <div class="testimonial-block-one">
                                    <div class="inner-box">
                                        <div class="icon-box"><img src="{{ asset('web/assets/images/icons/icon-10.png') }}"
                                                alt=""></div>
                                        <div class="author-box">
                                            <figure class="thumb-box"><img src="{{ $testimonial->image_url }}"
                                                    alt="">
                                            </figure>
                                            <h4>{{ $testimonial->name }}</h4>
                                            <span class="designation">{{ $testimonial->designation }}</span>
                                        </div>
                                        <p>
                                            @if (strlen($testimonial->message) > 150)
                                                <span
                                                    class="short-message">{{ Str::limit($testimonial->message, 200) }}</span>
                                                <span class="full-message"
                                                    style="display: none;">{{ $testimonial->message }}</span>
                                                <a href="javascript:void(0);" class="read-more-toggle"
                                                    data-state="less">Read
                                                    More</a>
                                            @else
                                                {{ $testimonial->message }}
                                            @endif
                                        </p>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            @endif
            @if ($testimonials->where('type', 1)->isNotEmpty())
                <div class="auto-container">
                    <div class="row">
                        <div class="sec-title centred  sec-title-animation animation-style2">
                            <span class="sub-title mb_10 title-animation">Candidates</span>
                        </div>
                        @foreach ($testimonials->where('type', 1) as $testimonial)
                            <div class="col-lg-4">
                                <div class="testimonial-block-one">
                                    <div class="inner-box">
                                        <div class="icon-box"><img src="{{ asset('web/assets/images/icons/icon-10.png') }}"
                                                alt=""></div>
                                        <div class="author-box">
                                            <figure class="thumb-box"><img src="{{ $testimonial->image_url }}"
                                                    alt="">
                                            </figure>
                                            <h4>{{ $testimonial->name }}</h4>
                                            <span class="designation">{{ $testimonial->designation }}</span>
                                        </div>
                                        <p>
                                            @if (strlen($testimonial->message) > 150)
                                                <span
                                                    class="short-message">{{ Str::limit($testimonial->message, 200) }}</span>
                                                <span class="full-message"
                                                    style="display: none;">{{ $testimonial->message }}</span>
                                                <a href="javascript:void(0);" class="read-more-toggle"
                                                    data-state="less">Read
                                                    More</a>
                                            @else
                                                {{ $testimonial->message }}
                                            @endif
                                        </p>

                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            @endif
        @else
            <div class="auto-container">
                <div class="row">
                    <span class="sub-title mb_10 text-center">Record Not Found</span>
                </div>
            </div>
        @endif

    </section>

@endsection
@push('script')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.read-more-toggle').forEach(function(toggle) {
                toggle.addEventListener('click', function() {
                    const shortMessage = this.previousElementSibling.previousElementSibling;
                    const fullMessage = this.previousElementSibling;
                    const currentState = this.getAttribute('data-state');

                    if (currentState === 'less') {
                        shortMessage.style.display = 'none';
                        fullMessage.style.display = 'inline';
                        this.textContent = 'Read Less';
                        this.setAttribute('data-state', 'more');
                    } else {
                        shortMessage.style.display = 'inline';
                        fullMessage.style.display = 'none';
                        this.textContent = 'Read More';
                        this.setAttribute('data-state', 'less');
                    }
                });
            });
        });
    </script>
@endpush
