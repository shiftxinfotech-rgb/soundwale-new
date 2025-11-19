@extends('admin.layouts.default')
@section('title', 'Mail Configuration')
@section('content')
<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Mail Configuration</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
        <div class="kt-subheader__breadcrumbs">
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
                    <i class="kt-font-brand fa fa-envelope"></i>
                </span>
                <h3 class="kt-portlet__head-title">
                    {{ $data ? 'Edit' : 'Add' }} Mail Configuration
                </h3>
            </div>
            <div class="kt-portlet__head-toolbar">
                <div class="kt-portlet__head-wrapper">
                    <a href="{{route('admin.home')}}" class="btn btn-clean btn-icon-sm">
                        <i class="la la-long-arrow-left"></i>
                        Back
                    </a>

                </div>
            </div>
        </div>
        <!--begin::Portlet-->
        <!--begin::Form-->
        <form class="kt-form" action="{{ route('admin.mail.configuration.update') }}" isReload="{{ route('admin.mail.configuration.index') }}" id="seller-add-from" method="post">
            <div class="kt-portlet__body">
                <div class="form-group row">
                    <div class="col-lg-6">
                        <label>Mailer<span class="text-danger">*</span></label>
                        <input type="text" name="mail_mailer" placeholder="Enter Mailer" value="{{ $data->mail_mailer ?? null }}" class="form-control" >
                        @csrf
                    </div>
                    <div class="col-lg-6">
                        <label>Host <span class="text-danger">*</span></label>
                        <input type="text" name="mail_host" placeholder="Enter Host " value="{{ $data->mail_host ?? null }}" class="form-control" >
                    </div>
                </div>
                <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">

                <div class="form-group row">
                    <div class="col-lg-6">
                        <label>Port <span class="text-danger">*</span></label>
                        <input type="text" name="mail_port" placeholder="Enter Port " value="{{ $data->mail_port ?? null }}" class="form-control" >
                    </div>
                    <div class="col-lg-6">
                        <label>Username<span class="text-danger">*</span></label>
                        <input type="text" name="mail_username" placeholder="Enter Username" value="{{ $data->mail_username ?? null }}" class="form-control" >

                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-lg-6">
                        <label>Password:</label>
                        <div class="input-group">
                            <input type="password" name="mail_password" class="form-control pwd-hide-show" id="password" autocomplete="off"  value="{{ $data->mail_password ?? old('mail_password') }}"placeholder="Enter password">
                            <div class="input-group-append">
                                <span class="input-group-text show-hide">
                                    <i class="la la-eye"></i>
                                </span>
                            </div>
                        </div>
                        <label id="password-error" class="text-danger" for="password"></label>
                    </div>

                    <div class="col-lg-6">
                        <label>Encryption<span class="text-danger">*</span></label>
                        <input type="text" name="mail_encryption" placeholder="Enter Encryption" value="{{ $data->mail_encryption ?? null }}" class="form-control" >
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-lg-6">
                        <label>From Address <span class="text-danger">*</span></label>
                        <input type="text" name="mail_from_address" placeholder="Enter From Address " value="{{ $data->mail_from_address ?? null }}" class="form-control" >
                    </div>
                    <div class="col-lg-6">
                        <label>From Name<span class="text-danger">*</span></label>
                        <input type="text" name="mail_from_name" placeholder="Enter From Name" value="{{ $data->mail_from_name ?? null }}" class="form-control" >
                    </div>
                </div>
                <div class="kt-portlet__foot">
                    <div class="kt-form__actions">
                        <button type="submit" class="btn btn-brand">Save</button>
                    </div>
                </div>
            </div>
        </form>
        <!--end::Form-->
    </div>
</div>
<!-- end:: Content -->

@endsection

@push('script')
<script type="text/javascript">

let conf = {
        rules: {
            mail_mailer: {
                required: true,
            },
            mail_host: {
                required: true,
            },
            mail_port: {
                required: true,
            },
            mail_username: {
                required: true,
            },
            mail_password: {
                required: true,
            },
            mail_encryption: {
                required: true,
            },
            mail_from_address: {
                required: true,
            },
            mail_from_name: {
                required: true,
            },

        },
    };
    validationFormAndSubmit($('#seller-add-from'),conf);
</script>
@endpush
