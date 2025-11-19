<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>Soundwale</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="Soundwale" name="author" />
    <!-- favicon -->
    <link rel="shortcut icon" href="{{ asset('web_html/images/favicon.png') }}">

    <link href="{{ asset('web_html/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('web_html/css/materialdesignicons.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('web_html/css/font-awesome.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('web_html/css/owl.carousel.css') }}" rel="stylesheet" type="text/css" />
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/css/intlTelInput.css'>
    <link href="{{ asset('web_html/css/style.css') }}" rel="stylesheet" type="text/css" />
    <!-- Slider -->
    <link rel="stylesheet" href="{{ asset('web_html/css/slick-theme.css') }}" />
    <link rel="stylesheet" href="{{ asset('web_html/css/slick.css') }}" />

</head>

<body>
    <!-- Navbar Start -->

    <nav class="navbar navbar-expand-lg fixed-top navbar-custom navbar-light sticky">
        <div class="container">
            <a class="navbar-brand" href="{{ route('web.home') }}">
                <img src="{{ asset('web_html/images/logo_scroll.png') }}" class="main_logo" alt="img">
                <img src="{{ asset('web_html/images/logo_scroll.png') }}" class="scroll_logo" alt="img">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="mdi mdi-menu"></span>
            </button><!--end button-->

            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="{{ route('web.home') }}">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('web.home') }}">About App</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('web.home') }}">Contact</a>
                    </li>
                </ul><!--end navbar nav-->
            </div><!--end collapse-->
        </div><!--end container-->
    </nav><!--end navbar-->
    <!-- Navbar End -->

    <!-- Hero Start -->
    <section class="bg-home sub_bg" style="background-image:url({{ asset('web_html/images/sub_bannere.jpg') }})" id="home">
        <div class="bg-overlay"></div>
        <div class="home-center">
            <div class="home-desc-center">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div class="title-heading text-center mt-5 pt-4">
                                <h1 class="heading text-white mb-3">Privacy Policy</h1>
                                <!-- <p class="para-desc mx-auto text-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p> -->
                            </div>
                        </div><!--end col-->
                    </div><!--end row-->
                </div><!--end container-->
            </div><!--end home desc center-->
        </div><!--end home center-->
    </section><!--end section-->
    <!-- Hero End -->


    <section class="conditions_blog_main">
        <div class="container">
            <div class="conditions_blog">
                <p>Welcome to <strong>Soundwale</strong>. Your privacy is important to us. This Privacy Policy explains
                    how we collect, use, and protect your information when you use our mobile application and services.
                </p>

                <div class="title_terms">1. Information We Collect</div>
                <p>We may collect the following information when you use the app:</p>
                <ul>
                    <li><strong>Personal Information:</strong> Name, email address, phone number (when voluntarily
                        submitted).</li>
                    <li><strong>Device Information:</strong> Device type, operating system, app version, and IP address.
                    </li>
                    <li><strong>User-Generated Content:</strong> Any content you post, such as ads or requirement
                        listings.</li>
                </ul>

                <div class="title_terms">2. How We Use Your Information</div>
                <ul>
                    <li>Enable you to post ads or requirements.</li>
                    <li>Improve app functionality and user experience.</li>
                    <li>Communicate with you about updates, support, or important changes.</li>
                    <li>Prevent fraudulent or harmful activities.</li>
                </ul>

                <div class="title_terms">3. Sharing of Information</div>
                <p>We do not sell or rent your personal information to third parties. We may share your information only
                    in the following cases:</p>
                <ul>
                    <li>With your consent.</li>
                    <li>With service providers who support our app operations.</li>
                    <li>When required by law or legal processes.</li>
                </ul>

                <div class="title_terms">4. Data Security</div>
                <p>We take reasonable steps to protect your information using technical and organizational measures.
                    However, no method of transmission or storage is 100% secure.</p>

                <div class="title_terms">5. User Control & Rights</div>
                <p>You may:</p>
                <ul>
                    <li>Edit or delete your posted content.</li>
                    <li>Request deletion of your account.</li>
                    <li>Contact us to access or update your personal data.</li>
                </ul>

                <div class="title_terms">6. Third-Party Links</div>
                <p>Soundwale may contain links to third-party websites. We are not responsible for their privacy
                    practices.</p>

                <div class="title_terms">7. Children's Privacy</div>
                <p>Our app is not intended for users under the age of 13. We do not knowingly collect personal
                    information from children.</p>

                <div class="title_terms">8. Changes to This Policy</div>
                <p>We may update this policy occasionally. Any changes will be posted in the app with the updated
                    effective date.</p>

                <div class="title_terms">9. Contact Us</div>
                <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
                <p>? Email: <a href="mailto:info@soundwale.com">info@soundwale.com</a></p>
            </div>
        </div>
    </section>

    <footer class="footer py-5 bg-dark">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="footer_blog_1">
                        <a href="{{ route('web.home') }}"><img src="{{ asset('web_html/images/footer_logo.png') }}" alt="img"></a>
                        <p>
                            Be a part of India’s fastest-growing music tech platform.
                            Whether you're creating, buying, or selling — Soundwale is the sound of your success.
                            <!--Unlock real estate opportunities with Soundwale today!-->
                        </p>
                        <div class="banner_btn">
                            <a href="https://apps.apple.com/us/app/soundwale/id6746194007" target="_blank"> <img src="{{ asset('web_html/images/app_btn_1.png') }}" class=""></a>
                            <a href="https://play.google.com/store/apps/details?id=com.soundwale" target="_blank" > <img src="{{ asset('web_html/images/app_btn_2.png') }}" class=""> </a>
                        </div>
                    </div>
                    <div class="footer_link">
                        <ul>
                            <li><span>P:</span><a href="#">+91 63571 52000</a></li>
                            <li><span>E:</span><a href="#">info@soundwale.com</a></li>
                        </ul>
                    </div>
                    <div class="footer_blog_1">
                      <p><strong>Parent Company :</strong> RUDRA CORPORATION  GST No :- 24AXRPJ3701D1ZS</p>
                   </div>
                </div>
            </div><!--end row-->
        </div><!--end container-->
    </footer><!--end footer-->
    <footer class="footer py-4 footer-bar bg-dark">
        <div class="container text-foot text-center">
            <div class="row align-items-center">
                <div class="col-sm-8">
                    <div class="text-sm-left">
                        <p class="mb-0">Copyright © 2025 Soundwale. All Rights Reserved</p>
                    </div>
                </div><!--end col-->

                <div class="col-sm-4 mt-4 mt-sm-0 pt-2 pt-sm-2">
                    <div class="text-sm-right">
                        <ul class="btm_link">
                            <li><a href="{{ route('privacy_policy') }}">Privacy Policy</a></li>
                            <li><a href="{{ route('terms_and_conditions') }}">Terms & Conditions</a></li>
                        </ul>
                        <a href="#" class="back-to-top rounded d-inline-block text-center" id="back-to-top">
                            <i class="mdi mdi-chevron-up d-block"> </i>
                        </a>
                    </div>
                </div><!--end col-->
            </div><!--end row-->
        </div><!--end container-->
    </footer>
    <!-- Footer End -->

    <!-- javascript -->
    <script src="{{ asset('web_html/js/jquery-3.5.1.min.js') }}"></script>
    <script src="{{ asset('web_html/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('web_html/js/jquery.easing.min.js') }}"></script>
    <script src="{{ asset('web_html/js/menu.js') }}"></script>
    <script src="{{ asset('web_html/js/slick.min.js') }}"></script>
    <script src="{{ asset('web_html/js/owl.carousel.js') }}"></script>
    <script src="{{ asset('web_html/js/app.js') }}"></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/intlTelInput-jquery.min.js'></script>

    <script>
        $(document).ready(function () {
            $('.screen_slider_carousel').owlCarousel({
                loop: true,
                margin: 10,
                responsiveClass: true,
                dots: true,
                nav: false,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: false,
                navText: ['<i class="far fa-angle-left"></i>', '<i class="far fa-angle-right"></i>'],
                responsive: {
                    0: {
                        items: 1,
                    },
                    600: {
                        items: 2,
                    },
                    1000: {
                        items: 5,
                    }
                }
            });
        });
    </script>
    <script type="text/javascript">
        // -----Country Code Selection
        $("#mobile_code").intlTelInput({
            initialCountry: "us",
            separateDialCode: true,
            // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
        });
    </script>
</body>


</html>