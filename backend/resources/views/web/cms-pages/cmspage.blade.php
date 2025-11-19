@extends('web.layouts.default')
@section('title', '{{ $cmsPage->title }}')
@section('content')
    <section class="page-title centred sub_banner">
        <div class="auto-container">
            <div class="content-box">
                <h1>{{ $cmsPage->title }}</h1>
                <ul class="bread-crumb clearfix">
                    <li><a href="{{ route('web.home') }}">Home</a></li>
                    <li>-</li>
                    <li>{{ $cmsPage->title }}</li>
                </ul>
            </div>
        </div>
    </section>
    <section class="privacy_main">
        <div class="container">
            {!! $cmsPage->description !!}
        </div>
    </section>

@endsection
@push('script')
    <script></script>
@endpush
