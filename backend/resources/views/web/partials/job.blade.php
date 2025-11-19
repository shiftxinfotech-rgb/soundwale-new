@if ($services->isNotEmpty())
    @foreach ($services as $service)
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 chooseus-block">
            <div class="chooseus-block-one text-center">
                <div class="inner-box">
                    <div class="icon-box"><i class="icon-4"></i></div>
                    <h3><a href="javascript:;">{{ $service->title }}</a></h3>
                    <p><i class="fas fa-map-marker-alt"></i> {{ $service->location }}</p>
                    <ul>
                        <li>
                            <span>Salary:</span>
                            {{ $service->salary }}
                        </li>
                        <li>
                            <span>Experience Need:</span>
                            {{ $service->sub_title }}
                        </li>
                    </ul>
                    <div class="apply_hover_btn">
                        <a href="{{ route('web.apply.job', ['slug' => encrypt($service->id)]) }}"
                            class="theme-btn btn-one app_btn">Apply Now</a>
                        <a href="{{ route('web.apply.job', ['slug' => encrypt($service->id)]) }}"
                            class="theme-btn btn-one emil_btn">{{ $home_settings->email }}</a>
                    </div>
                </div>
            </div>
        </div>
    @endforeach
@else
    <div class="col-lg-12 text-center">
        <p>No records found....</p>
    </div>
@endif
