<!--Search Popup-->
<div id="search-popup" class="search-popup">
    <div class="popup-inner">
        <div class="upper-box">
            <figure class="logo-box"><a href="{{ route('web.home') }}"><img src="{{ $header->header_logo_url }}"
                        alt=""></a></figure>
            <div class="close-search"><span class="icon-27"></span></div>
        </div>
        <div class="overlay-layer"></div>
        <div class="auto-container">
            <div class="search-form">
                <form method="post" action="https://azim.hostlin.com/Jobaway/{{ route('web.home') }}">
                    <div class="form-group">
                        <fieldset>
                            <input type="search" class="form-control" name="search-input" value=""
                                placeholder="Type your keyword and hit" required>
                            <button type="submit"><i class="icon-1"></i></button>
                        </fieldset>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<header class="main-header header-style-two">
    <!-- header-top -->
    <!-- <div class="header-top">
        <div class="outer-container">
            <div class="top-inner">
                <ul class="info">
                    <li>
                        <img src="assets/images/icons/icon-6.png" alt="">
                        Call: <a href="tel:4402039837552">+44 (0)2039837552</a>
                    </li>
                    <li>
                        <img src="assets/images/icons/icon-7.png" alt="">
                        Mail: <a href="mailto:cv@connect-globalres.com">cv@connect-globalres.com</a>
                    </li>
                </ul>
                <div class="right-column">

                    <ul class="social-links">
                        <li><span>Share:</span></li>
                        <li><a href="#"><i class="fab fa-facebook-f"></i></li>
                        <li><a href="#"><i class="fab fa-linkedin-in"></i></li>
                        <li><a href="#"><i class="fab fa-instagram"></i></a></li>

                    </ul>
                </div>
            </div>
        </div>
    </div> -->
    <!-- header-lower -->
    <div class="header-lower">
        <div class="outer-container">
            <div class="outer-box">
                <figure class="logo-box"><a href="{{ route('web.home') }}"><img src="{{ $header->header_logo_url }}"
                            alt=""></a>
                </figure>
                <div class="menu-area">
                    <!--Mobile Navigation Toggler-->
                    <div class="mobile-nav-toggler">
                        <i class="icon-bar"></i>
                        <i class="icon-bar"></i>
                        <i class="icon-bar"></i>
                    </div>
                    <nav class="main-menu navbar-expand-md navbar-light clearfix">
                        <div class="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                            <ul class="navigation clearfix">
                                <li><a href="{{ route('web.home') }}"
                                        class="{{ request()->routeIs('web.home') ? 'active' : '' }}">Home</a></li>
                                <li><a href="{{ route('web.about.us') }}"
                                        class="{{ request()->routeIs('web.about.us') ? 'active' : '' }}"> About Us</a>
                                </li>
                                <li><a href="{{ route('web.talent.seeker') }}"
                                        class="{{ request()->routeIs('web.talent.seeker') ? 'active' : '' }}">Hiring
                                        Talent</a></li>
                                <li>
                                    <a href="{{ route('web.jobs.seeker') }}"
                                        class="{{ request()->routeIs('web.jobs.seeker') || request()->routeIs('web.apply.job') ? 'active' : '' }}">Jobs
                                        Seeker</a>
                                </li>
                                <li class="no_web_view">
                                    <a href="{{ route('web.submit.role') }}"
                                        class="{{ request()->routeIs('web.submit.role') || request()->routeIs('web.apply.job') ? 'active' : '' }}">
                                        Submit Role</a>
                                </li>
                                <li class="no_web_view">
                                    <a href="{{ route('web.contact.us') }}"
                                        class="{{ request()->routeIs('web.contact.us') || request()->routeIs('web.apply.job') ? 'active' : '' }}">
                                        Contact Us</a>
                                </li>
                                <!-- <li><a href="submit_role.html">Submit Role</a></li> -->
                                <!-- <li><a href="talent_seeker.html">Talent Seeker</a></li> -->
                                <!-- <li><a href="contact.html">Contact Us</a></li> -->
                            </ul>
                        </div>
                    </nav>
                </div>
                <div class="menu-right-content">
                    <div class="btn-box"><a href="{{ route('web.submit.role') }}" class="theme-btn btn-one">Submit
                            Role</a>
                    </div>
                    <div class="btn-box"><a href="{{ route('web.contact.us') }}" class="theme-btn btn-one">Contact
                            Us</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--sticky Header-->
    <div class="sticky-header">
        <div class="outer-container">
            <div class="outer-box">
                <figure class="logo-box"><a href="{{ route('web.home') }}"><img src="{{ $header->header_logo_url }}"
                            alt=""></a>
                </figure>
                <div class="menu-area">
                    <nav class="main-menu clearfix">
                        <!--Keep This Empty / Menu will come through Javascript-->
                    </nav>
                </div>
                <div class="menu-right-content">
                    <div class="btn-box"><a href="{{ route('web.submit.role') }}" class="theme-btn btn-one">Submit
                            Role</a>
                    </div>
                    <div class="btn-box"><a href="{{ route('web.contact.us') }}" class="theme-btn btn-one">Contact
                            Us</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
<!-- main-header end -->


<!-- Mobile Menu  -->
<div class="mobile-menu">
    <div class="menu-backdrop"></div>
    <div class="close-btn"><i class="fas fa-times"></i></div>
    <nav class="menu-box">
        <div class="nav-logo"><a href="{{ route('web.home') }}"><img src="{{ $header->header_logo_url }}"
                    alt="" title=""></a>
        </div>
        <div class="menu-outer">
        </div>
        <div class="contact-info">
            <h4>Contact Info</h4>
            <ul>
                <li>{{ $header->registered_address }}</li>
                <li><a href="tel:{{ $header->phone_number }}">{{ $header->phone_number }}</a></li>
                <li><a href="mailto:{{ $header->email }}">{{ $header->email }}</a></li>
            </ul>
        </div>
        <div class="social-links">
            <ul class="clearfix">
                @if ($socialLink->facebook_link)
                    <li><a href="{{ $socialLink->facebook_link }}" target="_blank"><span
                                class="fab fa-facebook-square"></span></a></li>
                @endif
                @if ($socialLink->linked_link)
                    <li><a href="{{ $socialLink->linked_link }}" target="_blank"><span
                                class="fab fa-linkedin"></span></a></li>
                @endif
                @if ($socialLink->instagram_link)
                    <li><a href="{{ $socialLink->instagram_link }}" target="_blank"><span
                                class="fab fa-instagram"></span></a></li>
                @endif
                @if ($socialLink->twitter_link)
                    <li><a href="{{ $socialLink->twitter_link }}" target="_blank"><span
                                class="fab fa-twitter"></span></a></li>
                @endif
            </ul>
        </div>
    </nav>
</div>
<!-- End Mobile Menu -->
