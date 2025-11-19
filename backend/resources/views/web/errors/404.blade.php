@extends('web.layouts.default')
@section('title', '404 Page')
@section('content')
    <style>
        .classic-post {
            text-align: center;
            margin-top: 30px;
        }
        img {
            max-width: 50%;
            height: auto;
            margin: 0 auto;
            display: block;
        }
        .slider-btn {
            text-align: center;
        }
        .default-btn {
            padding: 10px 20px;
            font-size: 16px;
            text-transform: uppercase;
            display: inline-block;
            color: #fff;
            border-radius: 5px;
            text-decoration: none;
        }

    </style>

    <section class="page-header text-center" style="background-image: url('{{ $settings->image_url ?? asset('web/img/default-bg.jpg') }}')">
        <div class="container">
            <div class="page-header-info">
                <h4>404</h4>
                <h2>{!! nl2br($settings->title) !!}</h2>
                <p>{!! nl2br($settings->description) !!}</p>
            </div>
        </div>
    </section>

    <div class="classic-post">
        <img src="{{ asset('web/img/404.png') }}" alt="404 Image">
        <div class="slider-btn">
            <a href="{{ route('web.home') }}" class="default-btn" data-animation="fade-in-bottom" data-delay="0.9s"
                style="animation-delay: 0.9s;">Back to Home</a>
        </div>
    </div>
@endsection
