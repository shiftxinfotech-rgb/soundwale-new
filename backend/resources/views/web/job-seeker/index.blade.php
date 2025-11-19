@extends('web.layouts.default')
@section('title', 'Jobs Seeker')
@section('content')
    <!-- page-title -->
    <section class="page-title centred sub_banner">
        <div class="auto-container">
            <div class="content-box">
                <h1>Jobs Seeker</h1>
                <ul class="bread-crumb clearfix">
                    <li><a href="{{ route('web.home') }}">Home</a></li>
                    <li>-</li>
                    <li>Jobs Seeker</li>
                </ul>
            </div>
        </div>
    </section>
    <!-- page-title end -->
    <section class="recent_job_sec core_value_main">
        <div class="auto-container">
            <div class="row" id="blog-posts">
                @include('web.partials.job')
                @if ($services->hasMorePages())
                    <div class="col-lg-12 text-center" id="load-more-div">
                        <button id="load-more" class="theme-btn btn-one jobs_seeker_btn read_more_btn_about"
                            data-page="{{ $services->currentPage() }}">Load More</button>
                    </div>
                @endif
            </div>
        </div>
    </section>
    <!-- testimonial-section -->
    @if ($testimonials->isNotEmpty())

        <section class="testimonial-section testimonial_main">
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
                                        <span class="full-message" style="display: none;">{{ $testimonial->message }}</span>
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
@endsection

@push('script')
    <script>
        $(document).ready(function() {
            $('#load-more').click(function() {
                var page = $(this).data('page') + 1;
                var url = "{{ route('web.jobs.seeker') }}?page=" + page;

                $.ajax({
                    url: url,
                    type: 'GET',
                    beforeSend: function() {
                        $('#load-more').text('Loading...');
                    },
                    success: function(response) {
                        if (response.trim() === '') {
                            $('#load-more-div').hide();
                        } else {
                            $('#blog-posts').append(response);
                            $('#load-more').data('page', page);

                            if ($('#load-more').data('page') >= {{ $services->lastPage() }}) {
                                $('#load-more-div').hide();
                            } else {
                                $('#load-more').text('Load More');
                            }
                        }
                    },
                    error: function() {
                        $('#load-more').text('Error!');
                    }
                });
            });
        });
    </script>
@endpush
