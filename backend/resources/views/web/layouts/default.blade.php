<!DOCTYPE html>
<noscript>
    <meta http-equiv="Refresh" content="1;url=no-script" />
    Sorry, your browser does not support JavaScript!
</noscript>
<html class="no-js" lang="en">

<head>
    @include('web.includes.head')
    @method('css')
</head>

<body>
    <div class="boxed_wrapper ltr">
        @include('web.includes.header')

        <!-- begin:: Content  -->
        @yield('content')
        <!-- end:: Content -->

        @include('web.includes.footer')
    </div>

    @include('web.includes.footer-js')
    @stack('script')
</body>

</html>
