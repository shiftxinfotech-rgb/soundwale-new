@extends('admin.layouts.default')
@section('title', 'Show Role')
@section('content')
<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Show roles</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
        <div class="kt-subheader__breadcrumbs">
            <a href="{{ route('admin.roles.index') }}" class="kt-subheader__breadcrumbs-home"><i class="fa fa-arrow-left"></i></a>
        </div>
    </div>
</div>
<!-- end:: Subheader -->

<!-- begin:: Content -->
<div class="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
    @include('admin.layouts.flash-message')
    <div class="kt-portlet kt-portlet--mobile">
        <div class="kt-portlet__head kt-portlet__head--lg">
            <div class="kt-portlet__head-label">
                <span class="kt-portlet__head-icon">
                    <i class="kt-font-brand flaticon-user-settings"></i>
                </span>
                <h3 class="kt-portlet__head-title">
                    Show Roles
                </h3>
            </div>
        </div>
        <!--begin::Portlet-->
        <!--begin::Form-->
            <div class="kt-portlet__body">
                <div class="form-group row">
                    <div class="col-lg-12">
                        <label>Name:</label>
                        {{ $role->name }}
                        @csrf
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-lg-12">
                        <label>Permission:</label>
                        @if(!empty($rolePermissions))
                            @foreach($rolePermissions as $permission)
                                <label class="kt-badge kt-badge--brand kt-badge--inline">{{ $permission->name }}</label>
                            @endforeach
                        @endif
                    </div>
                </div>
            </div>
        <!--end::Form-->
    </div>
</div>
@endsection