<div id="kt_header" class="kt-header kt-grid__item  kt-header--fixed ">

    <!-- begin:: Header Menu -->
    <button class="kt-header-menu-wrapper-close" id="kt_header_menu_mobile_close_btn"><i class="la la-close"></i></button>
    <div class="kt-header-menu-wrapper" id="kt_header_menu_wrapper">
        <div id="kt_header_menu" class="kt-header-menu kt-header-menu-mobile  kt-header-menu--layout-default ">
            {{-- @if ( config('app.debug') == true )
                <ul class="kt-menu__nav ">
                    <li class="kt-menu__item kt-menu__item--open kt-menu__item--here kt-menu__item--submenu kt-menu__item--rel kt-menu__item--active kt-menu__item--open-dropdown" data-ktmenu-submenu-toggle="click" aria-haspopup="true">
                        <a href="{{ url('log-viewer') }}" class="btn btn-outline-brand" target="_blank"><span class="kt-menu__link-text"><i class="fa fa-code"></i> Log viewer</span></a>
                        </li>
                    </ul>
                    @endif --}}
                    </div>
                    </div>
                    <!-- end:: Header Menu -->

                    <!-- begin:: Header Topbar -->
                    <div class="kt-header__topbar">
                        <!--begin: Notification -->
                        <!--        <div class="kt-header__topbar-item dropdown">
                                    <div class="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="30px,0px" aria-expanded="true">
                                        <span class="kt-header__topbar-icon kt-pulse kt-pulse--brand">
                                            <i class="fa fa-bell"></i>
                                            <span class="kt-badge kt-badge--notify kt-badge--sm kt-badge--danger" id="notificationBadgeCount">{{ $unreadCount }}</span>
                                        </span>
                                    </div>
                                    <div class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-lg">
                                        <form>
                                             Begin: Head 
                                            <div class="kt-head kt-head--skin-dark kt-head--fit-x kt-head--fit-b" style="background-image: url({{ asset('admin-asset/images/media/bg/400.jpg') }})">
                                                <h3 class="kt-head__title">
                                                    Notifications
                                                </h3>
                                                <ul class="nav nav-tabs nav-tabs-line nav-tabs-bold nav-tabs-line-3x nav-tabs-line-success kt-notification-item-padding-x" role="tablist">
                                                     Optional tabs for different notification types 
                                                     Uncomment if you need multiple tabs
                                                    <li class="nav-item">
                                                        <a class="nav-link active show" data-toggle="tab" href="#topbar_notifications_notifications" role="tab" aria-selected="true">Alerts</a>
                                                    </li>
                                                    
                                                </ul>
                                            </div>
                                             End: Head 
                                            <div class="tab-content">
                                                <div class="tab-pane active show" id="topbar_notifications_notifications" role="tabpanel">
                                                    <div class="kt-notification custom_notify kt-margin-t-10 kt-margin-b-10 kt-scroll ps" data-scroll="true" style=" overflow: hidden;">
                                                         Notifications will be dynamically injected here 
                                                    </div>
                                                     Display a message if no notifications are available 
                                                    <div class="no-notifications-message" style="display: none;">
                                                        <div class="kt-grid kt-grid--ver" style="min-height: 200px;">
                                                            <div class="kt-grid kt-grid--hor kt-grid__item kt-grid__item--fluid kt-grid__item--middle">
                                                                <div class="kt-grid__item kt-grid__item--middle kt-align-center">
                                                                    All caught up!
                                                                    <br>No new notifications.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>-->

                        <!--end: Notification -->
                        <div class="kt-header__topbar-item kt-header__topbar-item--user">
                            <div class="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="0px,0px">
                                <div class="kt-header__topbar-user">
                                    <span class="kt-header__topbar-welcome kt-hidden-mobile">Hi,</span>
                                    <span class="kt-header__topbar-username kt-hidden-mobile">{{ Auth::user()->name }}</span>
                                    {{-- <img class="kt-hidden" alt="Pic" src="{{ asset('assets/admin/media/users/300_25.jpg')}}" /> --}}

                                    <!--use below badge element instead the user avatar to display username's first letter(remove kt-hidden class to display it) -->
                                    <span class="kt-badge kt-badge--username kt-badge--unified-dark kt-badge--lg kt-badge--rounded kt-badge--bold">{!! substr(Auth::user()->name, 0, 1) !!}</span>
                                </div>
                            </div>
                            <div class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
                                <!--begin: Head -->
                                <!--                <div class="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x" style="background-image: url({{ asset('admin-asset/images/media/bg/400.jpg')}})">
                                                    <div class="kt-user-card__avatar">
                                                        {{-- <img class="kt-hidden" alt="Pic" src="{{ asset('assets/admin/media/users/300_25.jpg')}}" /> --}}
                                                        use below badge element instead the user avatar to display username's first letter(remove kt-hidden class to display it) 
                                                        <span class="kt-badge kt-badge--lg kt-badge--rounded kt-badge--bold kt-font-dark" style="color:white;">{!! substr(Auth::user()->name, 0, 1) !!}</span>
                                                    </div>
                                                    <div class="kt-user-card__name">
                                                        {{ Auth::user()->name }}
                                                    </div>
                                                </div>-->
                                <!--end: Head -->
                                <!--begin: Navigation -->
                                <div class="kt-notification">
                                    <a href="{{ route('admin.profile.edit') }}" class="kt-notification__item">
                                        <!--                        <div class="kt-notification__item-icon">
                                                                    <i class="flaticon2-calendar-3 kt-font-dark"></i>
                                                                </div>-->
                                        <div class="kt-notification__item-details">
                                            <div class="kt-notification__item-title kt-font-bold">
                                                My Profile
                                            </div>
                                            <!--                            <div class="kt-notification__item-time">
                                                                            Account settings and more
                                                                        </div>-->
                                        </div>
                                    </a>
                                    <a href="javascript::void(0);" onclick="event.preventDefault();document.getElementById('logout-form').submit();" class="kt-notification__item">
                                        <div class="kt-notification__item-details">
                                            <div class="kt-notification__item-title kt-font-bold">
                                                Logout
                                            </div>
                                        </div>
                                    </a>
                                    <form id="logout-form" action="{{ route('admin.logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>

                                    <!--                    <div class="kt-notification__custom kt-space-between">
                                                            <a href="{{ route('admin.logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();" class="btn btn-label btn-label-brand btn-sm btn-bold">Sign Out</a>
                                                            <form id="logout-form" action="{{ route('admin.logout') }}" method="POST" style="display: none;">
                                                                @csrf
                                                            </form>
                                                        </div>-->
                                </div>
                                <!--end: Navigation -->
                            </div>
                        </div>
                        <!--end: User Bar -->
                    </div>
                    <!-- end:: Header Topbar -->
                    </div>
