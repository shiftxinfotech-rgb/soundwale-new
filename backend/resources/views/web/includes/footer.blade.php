<footer class="main-footer home-2 footer_ctm">
    <div class="pattern_layer">
    </div>
    <div class="widget-section p_relative footer_top">
        <div class="container">
            <div class="row clearfix">
                <div class="col-lg-4 col-md-12 col-sm-12 footer-column">
                    <div class="footer-widget logo-widget mr_30">
                        <figure class="footer-logo mb_20"><a href="{{ route('web.home') }}"><img
                                    src="{{ $footer->footer_logo_url }}" alt=""></a></figure>
                        <p>{{ $footer->content }}</p>

                        <div class="footer_media">
                            <ul>
                                @if ($socialLink->facebook_link)
                                    <li class="">
                                        <a href="{{ $socialLink->facebook_link }}" target="_blank">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                viewBox="0 0 25 25" style="enable-background:new 0 0 25 25;"
                                                xml:space="preserve">
                                                <g>
                                                    <path
                                                        d="M15,24H9.4v-9.1H5.8V9.5h3.6v-2c0-2.3,0.6-4,1.9-5.1c1.5-1.3,3.9-1.7,7.3-1.2l0.6,0.1v4.9h-3c-0.8,0-1.1,0.2-1.1,1.3v2h4.1  l-0.7,5.4H15V24z M10.7,22.7h3v-9.1h3.6l0.3-2.8h-3.9V7.5c0-1.7,0.8-2.6,2.4-2.6h1.7V2.4c-2.7-0.4-4.6,0-5.7,0.9  c-1,0.8-1.5,2.2-1.5,4.1v3.3H7.1v2.8h3.6V22.7z">
                                                    </path>
                                                </g>
                                            </svg>
                                        </a>
                                    </li>
                                @endif
                                @if ($socialLink->linked_link)
                                    <li class="">

                                        <a href="{{ $socialLink->linked_link }}" target="_blank">
                                            <svg id="fi_3800073" enable-background="new 0 0 512 512"
                                                viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                                <g>
                                                    <path
                                                        d="m7.813 509.935h132.571v-348.613h-132.571zm30-318.613h72.571v288.612h-72.571z">
                                                    </path>
                                                    <path
                                                        d="m74.099 2.065c-40.859 0-74.099 33.241-74.099 74.099s33.24 74.1 74.099 74.1 74.1-33.241 74.1-74.1-33.242-74.099-74.1-74.099zm-44.099 74.099c0-24.316 19.782-44.099 44.099-44.099s44.1 19.782 44.1 44.099-19.783 44.1-44.1 44.1-44.099-19.784-44.099-44.1z">
                                                    </path>
                                                    <path
                                                        d="m511.679 270.79c-4.718-67.855-61.318-120.144-131.489-120.144-31.387 0-61.016 10.912-84.361 30.274v-19.6h-127.03v348.613h132.572v-190.664c0-21.488 17.481-38.97 38.97-38.97 21.487 0 38.969 17.482 38.969 38.979l.128 190.656h132.562v-238.822zm-240.308 209.145h-72.572v-288.614h67.029v42.847l24.005.138 4.46-6.924c18.85-29.265 50.961-46.735 85.897-46.735 55.836 0 100.543 42.602 101.78 96.985l.03 202.303h-72.582l-.108-160.666c0-38.03-30.94-68.97-68.969-68.97-38.03 0-68.97 30.94-68.97 68.97z">
                                                    </path>
                                                </g>
                                            </svg>
                                        </a>
                                    </li>
                                @endif
                                @if ($socialLink->instagram_link)
                                    <li class="">
                                        <a href="{{ $socialLink->instagram_link }}" target="_blank">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                viewBox="0 0 25 25" style="enable-background:new 0 0 25 25;"
                                                xml:space="preserve">
                                                <g>
                                                    <g>
                                                        <path
                                                            d="M16.7,23H8.3C4.8,23,2,20.2,2,16.7V8.3C2,4.8,4.8,2,8.3,2h8.4C20.2,2,23,4.8,23,8.3v8.4C23,20.2,20.2,23,16.7,23z    M8.3,3.2c-2.8,0-5.1,2.3-5.1,5.1v8.4c0,2.8,2.3,5.1,5.1,5.1h8.4c2.8,0,5.1-2.3,5.1-5.1V8.3c0-2.8-2.3-5.1-5.1-5.1H8.3z">
                                                        </path>
                                                    </g>
                                                    <g>
                                                        <path
                                                            d="M12.5,17.5c-2.8,0-5-2.3-5-5s2.3-5,5-5h0c2.8,0,5,2.3,5,5C17.6,15.3,15.3,17.5,12.5,17.5z M12.5,8.6   c-2.1,0-3.9,1.7-3.9,3.9s1.7,3.9,3.9,3.9s3.9-1.7,3.9-3.9C16.4,10.4,14.6,8.6,12.5,8.6L12.5,8.6z">
                                                        </path>
                                                    </g>
                                                    <g>
                                                        <path
                                                            d="M18.3,7.8c-0.6,0-1-0.5-1-1s0.5-1,1-1s1,0.5,1,1S18.9,7.8,18.3,7.8z M18.3,6.6c-0.1,0-0.1,0.1-0.1,0.1   c0,0.2,0.3,0.2,0.3,0C18.5,6.7,18.4,6.6,18.3,6.6z">
                                                        </path>
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                    </li>
                                @endif
                                @if ($socialLink->twitter_link)
                                    <li class="">
                                        <a href="{{ $socialLink->twitter_link }}" target="_blank">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                                height="24">
                                                <path
                                                    d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.44 8.44 0 0 1-2.71 1.04A4.22 4.22 0 0 0 16.07 4c-2.37 0-4.28 1.92-4.28 4.29 0 .34.04.67.11.99A12 12 0 0 1 3 5.08a4.28 4.28 0 0 0 1.33 5.72 4.21 4.21 0 0 1-1.94-.54v.05c0 2.06 1.47 3.78 3.42 4.18a4.3 4.3 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.97A8.5 8.5 0 0 1 2 19.55a12 12 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.69 0-.18 0-.37-.01-.55a8.36 8.36 0 0 0 2.05-2.14z" />
                                            </svg>

                                        </a>
                                    </li>
                                @endif
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-12 footer-column">
                    <div class="footer-widget links-widget ">
                        <div class="widget-title">
                            <h4>Quick Links</h4>
                        </div>
                        <div class="widget-content">
                            <ul class="links-list clearfix">
                                <li><a href="{{ route('web.about.us') }}"> About Us</a></li>
                                <li><a href="{{ route('web.jobs.seeker') }}">Jobs Seeker</a></li>
                                <li><a href="{{ route('web.submit.role') }}">Submit Role</a></li>
                                <!-- <li><a href="talent_seeker.html">Talent Seeker</a></li> -->
                                <li><a href="{{ route('web.testimonial') }}">Testimonials</a></li>
                                <li><a href="{{ route('web.contact.us') }}">Contact Us</a></li>
                                <li><a href="{{ route('web.cms.page', ['slug' => 'privacy-policy']) }}">Privacy
                                        Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-12 footer-column">
                    <div class="footer-widget links-widget pad_left50">
                        <div class="widget-title">
                            <h4>Industries</h4>
                        </div>
                        <div class="widget-content">
                            <ul class="links-list clearfix">
                                @foreach ($BrowseByPositions as $BrowseByPosition)
                                    <li><a href="javascript:;">{{ $BrowseByPosition->title }}</a></li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 footer-column">
                    <div class="footer-widget links-widget pad_left40">
                        <div class="widget-title">
                            <h4>Quick Contact</h4>
                        </div>
                        <div class="footer_time_info">
                            <div class="icon">
                                <i class="fa  fa-phone-square"></i>
                            </div>
                            <div class="content">
                                <strong>PHONE</strong>
                                <a href="tel:{{ $footer->phone_number }}">{{ $footer->phone_number }}</a>
                            </div>
                        </div>
                        <div class="footer_time_info">
                            <div class="icon">
                                <i class="fa  fa-envelope"></i>
                            </div>
                            <div class="content">
                                <strong>Email</strong>
                                <a href="mailto:{{ $footer->email }}">{{ $footer->email }}</a>
                            </div>
                        </div>
                        <div class="footer_time_info">
                            <div class="icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div class="content">
                                <strong>Location</strong>
                                <p>
                                    {{ $footer->registered_address }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <div class="auto-container">
            <div class="bottom-inner">
                <div class="copyright">
                    <p>Copyright © {{ date('Y') }} {{ config('app.name') }} All Rights Reserved.</p>
                </div>
            </div>
        </div>
    </div>
</footer>
<!-- main-footer end -->
<!--Scroll to top-->
<div class="scroll-to-top">
    <svg class="scroll-top-inner" viewBox="-1 -1 102 102">
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
    </svg>
</div>
<script>
    //     document.addEventListener('DOMContentLoaded', function() {
    //     // Track page view with a detailed description
    //     trackUserActivity('page_view', `User visited: ${window.location.pathname}, Title: ${document.title}`);

    //     // Track button clicks with button name, page, and action description
    //     const buttons = document.querySelectorAll('button, a, .track-click');
    //     buttons.forEach(function(button) {
    //         button.addEventListener('click', function() {
    //             trackUserActivity('button_click', `User clicked button: ${button.innerText || button.id} on Page: ${window.location.pathname}, Action: ${button.dataset.action || 'No action defined'}`);
    //         });
    //     });

    //     // Track form submissions with form name and additional context
    //     const forms = document.querySelectorAll('form');
    //     forms.forEach(function(form) {
    //         form.addEventListener('submit', function() {
    //             trackUserActivity('form_submission', `User submitted form: ${form.id || form.name} on Page: ${window.location.pathname}, Action: ${form.dataset.action || 'No action defined'}`);
    //         });
    //     });
    // });

    // // Function to send the activity data to the server
    // function trackUserActivity(activityType, description) {
    //     const csrfMetaTag = document.querySelector('meta[name="csrf-token"]');
    //     const csrfToken = csrfMetaTag ? csrfMetaTag.getAttribute('content') : null;

    //     if (!csrfToken) {
    //         console.error('CSRF token is missing!');
    //         return; // Prevent sending data without a CSRF token
    //     }

    //     const data = {
    //         activity_type: activityType,
    //         description: description,
    //         url: window.location.href,
    //         _token: csrfToken, // CSRF token for Laravel
    //     };

    //     // Send the data to the Laravel backend
    //     fetch('http://localhost/cgr/public/track-activity', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data)
    //     }).catch((error) => console.error('Error tracking activity:', error));
    // }
</script>
