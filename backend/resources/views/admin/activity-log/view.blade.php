@extends('admin.layouts.default')
@section('title', 'Recent Activities')
@section('content')
<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Recent Activities</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
        <div class="kt-subheader__breadcrumbs">
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="{{ route('admin.careers.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="javascript:;" class="kt-subheader__breadcrumbs-link" title="Back">View</a>
        </div>
    </div>

</div>

<!-- end:: Subheader -->

<!-- begin:: Content -->
<div class="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
    <div class="col-xl-4">
        <!--Begin::Portlet-->
        <div class="kt-portlet kt-portlet--height-fluid">
            <div class="kt-portlet__head">
                <div class="kt-portlet__head-label">
                    <h3 class="kt-portlet__head-title">
                        Recent Activities
                    </h3>
                </div>
            </div>
            <div class="kt-portlet__body">
                <!--Begin::Timeline 3 -->
                <div class="kt-timeline-v2">
                    <div class="kt-timeline-v2__items kt-padding-top-25 kt-padding-bottom-30">
                    {{-- @php
                        dd($data);
                    @endphp --}}
                        @foreach($data as $activity)
                            <div class="kt-timeline-v2__item">
                                <span class="kt-timeline-v2__item-time">{{ $activity->created_at->format('H:i') }}</span>
                                <div class="kt-timeline-v2__item-cricle">
                                    @if($activity->activity_type == 'page_view')
                                        <i class="fa fa-genderless kt-font-success"></i>
                                    @elseif($activity->activity_type == 'button_click')
                                        <i class="fa fa-genderless kt-font-danger"></i>
                                    @else
                                        <i class="fa fa-genderless kt-font-info"></i>
                                    @endif
                                </div>
                                <div class="kt-timeline-v2__item-text kt-padding-top-5">
                                    {{ $activity->created_at->format('d M,Y') }}</br>
                                    {{ $activity->description }}
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
                <!--End::Timeline 3 -->
            </div>
        </div>
        <!--End::Portlet-->
    </div>
</div>
@endsection
