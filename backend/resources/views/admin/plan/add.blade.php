@extends('admin.layouts.default')
@section('title', 'Plans')
@section('content')
<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Plans</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
        <div class="kt-subheader__breadcrumbs">
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="{{ route('admin.plans.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="javascript:;" class="kt-subheader__breadcrumbs-link" title="Back">{{ $data ? 'Edit' : 'Add' }}</a>
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
                    {{ $data ? 'Edit' : 'Add' }} Plans
                </h3>
            </div>
        </div>
        <!--begin::Portlet-->
        <!--begin::Form-->
        <form class="kt-form" action="{{ route('admin.plans.store') }}" id="faq-add-from" method="post" isReload="{{ route('admin.plans.list') }}" enctype="multipart/form-data">
            @csrf
            <div class="kt-portlet__body">
                <div class="form-group row">
                    <div class="col-lg-6">
                        <label>Name <span class="text-danger">*</span></label>
                        <input type="text" name="name" id="name" placeholder="Enter Name" value="{{ $data->name ?? null }}" class="form-control" >
                    </div>
                    <div class="col-lg-6">
                        <label>Amount <span class="text-danger">*</span></label>
                        <input type="text" name="amount" id="amount" placeholder="Enter Amount" value="{{ $data->amount ?? null }}" class="form-control only-digits" >
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-md-6">
                        <label>Plan Type <span class="text-danger">*</span></label>
                        <select name="plan_type" class="form-control">
                            <option value="">Select Plan Type</option>
                            @php
                            $plan_type = [
                            '1_month' => '1 Month',
                            '3_month' => '3 Month',
                            '6_month' => '6 Month',
                            '1_year' => '1 Year',
                            '3_year' => '3 Year',
                            '6_year' => '6 Year',
                            ];
                            @endphp

                            @foreach ($plan_type as $key => $value)
                            <option value="{{ $key }}" {{ isset($data) && $data->plan_type == $key ? 'selected' : '' }}>
                                    {{ $value }}
                            </option>
                            @endforeach
                    </select>
                </div>
                    <div class="col-lg-6">
                        <label>Leads Count <span class="text-danger">*</span></label>
                        <input type="text" name="leads_count" id="leads_count" placeholder="Enter Leads Count" value="{{ $data->leads_count ?? null }}" class="form-control only-digits" >
                    </div>

            </div>
            <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">


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
@endsection
@push('script')

<script type="text/javascript">

    let conf = {
    rules: {
    image: {
    required: {{ ($data) ? 'false' : true }},
    },
            name: {
            required: true,
            },
            amount: {
            required: true,
            },
            plan_type: {
            required: true,
            },
            leads_count: {
            required: true,
            },
    },
    };
    validationFormAndSubmit($('#faq-add-from'), conf);

</script>
@endpush

