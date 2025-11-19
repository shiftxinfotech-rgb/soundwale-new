@extends('admin.layouts.default')
@section('title', 'Users & Directory')
@section('content')
<script src="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCv-uB5dpDKCHhXsCaXcmHtI5TYhB2wlSA&sensor=false&libraries=geometry,places&ext=.js"></script>
<style>

    .wrapper {
        display: grid;
        grid-template-columns: 300px 300px 100px;
        grid-gap: 7px;
        background-color: #fff;
        color: #444;
        padding-top: 1%;
    }

    .box {
        border-radius: 5px;
        padding: 2px;
        font-size: 150%;
    }

    .wrapper_view {
        display: grid;
        grid-template-columns: 300px 300px 100px;
        background-color: #fff;
        color: #444;
    }

    .box_view {
        border-radius: 5px;
        padding: 5px;
        font-size: 150%;
    }
    .select2-container--default .select2-selection--multiple {
        min-width: 250px !important; /* Set a default height */
        padding: 4px 8px;
        border: 1px solid #ced4da;
        border-radius: 4px;
    }
</style>
<style>
    table {
        width: 80%;
        border-collapse: collapse;
        margin: 20px auto;
        font-family: Arial, sans-serif;
    }
    h1 {
        text-align: center;
        font-family: Arial, sans-serif;
    }
    th, td {
        border: 1px solid #999;
        padding: 10px;
        text-align: left;
    }
    th {
        background-color: #eee;
    }
    .no-records {
        text-align: center;
        font-style: italic;
        color: #555;
    }
</style>
<style>
    .pac-container{
        z-index: 999999;
    }
</style>
<style>
    select.form-control {
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
    }
</style>
<!-- begin:: Subheader -->
<div class="kt-subheader kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Users & Directory</h3>
        <div class="kt-subheader__breadcrumbs">
            <a href="javascript:history.back()" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="javascript:;" class="kt-subheader__breadcrumbs-link" title="Back">View</a>
        </div>
    </div>
</div>
<!-- end:: Subheader -->
<!-- begin:: Content -->
<div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
    @include('admin.layouts.flash-message')
    <div class="kt-portlet kt-portlet--mobile">
        <div class="kt-portlet__head kt-portlet__head--lg">
            <div class="kt-portlet__head-label">
                <span class="kt-portlet__head-icon">
                    <i class="kt-font-brand flaticon-user-settings"></i>
                </span>
                <h3 class="kt-portlet__head-title">
                    Users & Directory
                </h3>
            </div>
            <div class="kt-portlet__head-toolbar">
                <div class="kt-portlet__head-wrapper">
                    <a onclick="window.history.back()"class="btn btn-clean btn-icon-sm">
                        <i class="la la-long-arrow-left"></i>
                        Back
                    </a>

                </div>
            </div>
        </div>
        <!--begin::Portlet-->

        <div class="kt-portlet__body">
            <div class="row">
                <div class="col-lg-6">
                    <label><strong>Business Type:</strong></label>
                    <p>{{ $data->role->name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>Business Name:</strong></label>
                    <p>{{ $data->name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong >Personal Name:</strong></label>
                    <p>{{ !empty($data->personal_name) ? $data->personal_name : 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>Mobile Number:</strong></label>
                    <p>{{ !empty($data->mobile_number) ? ($data->code ?? '') . ' ' . $data->mobile_number : 'N/A' }}</p>
                </div>
                @if(!empty($data->marketing_person_name))
                <div class="col-lg-6">
                    <label><strong>Marketing Person Name:</strong></label>
                    <p>{{ $data->marketing_person_name ?? 'N/A' }}</p>
                </div>
                @endif
                @if(!empty($data->marketing_mobile_number))
                <div class="col-lg-6">
                    <label><strong>Marketing Person Mobile Number:</strong></label>
                    <p>{{ !empty($data->marketing_mobile_number) ? ($data->marketing_code ?? '') . ' ' . $data->marketing_mobile_number : 'N/A' }}</p>
                </div>
                @endif
                @if(!empty($data->email))
                <div class="col-lg-6">
                    <label><strong>Email:</strong></label>
                    <p>{{ $data->email ?? 'N/A' }}</p>
                </div>
                @endif
                @if(!empty($data->location))
                <div class="col-lg-6">
                    <label><strong>Location:</strong></label>
                    <p>{{ $data->location ?? 'N/A' }}</p>
                </div>
                @endif
                @if(!empty($data->country->country_name))
                <div class="col-lg-6">
                    <label><strong>Country:</strong></label>
                    <p>{{ $data->country->country_name ?? 'N/A' }}</p>
                </div>
                @endif
                @if(!empty($data->state->state_name))
                <div class="col-lg-6">
                    <label><strong>State:</strong></label>
                    <p>{{ $data->state->state_name ?? 'N/A' }}</p>
                </div>
                @endif
                @if(!empty($data->city->city_name))
                <div class="col-lg-6">
                    <label><strong>City:</strong></label>
                    <p>{{ $data->city->city_name ?? 'N/A' }}</p>
                </div>
                @endif
                @if(!empty($data->village))
                <div class="col-lg-6">
                    <label><strong>Village:</strong></label>
                    <p>{{ $data->village ?? 'N/A' }}</p>
                </div>
                @endif
                @if(!empty($data->gst_number))
                <div class="col-lg-6">
                    <label><strong>GST :</strong></label>
                    <p>{{ $data->gst_number ?? 'N/A' }}</p>
                </div>
                @endif
                
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6">
                <div class="kt-form kt-form--label-right">
                    <div class="kt-portlet__body">
                        <div class="kt-widget kt-widget--user-profile-3">
                            <div class="kt-widget__top">
                                <div class="kt-widget__media">
                                    <div class="media-item" id="delete_user_profile_div">
                                        @if ($data->image)
                                        <label><strong>Profile Image:</strong></label>
                                        <div>
                                            <a href="{{ $data->image_url }}" target="_blank">
                                                <img src="{{ $data->image_url }}" alt="Image">
                                            </a><br/>
                                            <button class="delete-user-profile" data-id="{{ $data->id }}">Delete</button>
                                        </div>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="kt-form kt-form--label-right">
                    <div class="kt-portlet__body">
                        <div class="kt-widget kt-widget--user-profile-3">
                            <div class="kt-widget__top">
                                <div class="kt-widget__media">
                                    <div class="media-item" id="delete_user_profile_div">
                                        @if ($data->visiting_card_image)
                                        <label><strong>Visiting Card Image:</strong></label>
                                        <div>
                                            <a href="{{ $data->visiting_card_image_url }}" target="_blank">
                                                <img src="{{ $data->visiting_card_image_url }}" alt="Image">
                                            </a><br/>
                                            <button class="delete-visiting-card" data-id="{{ $data->id }}">Delete</button>
                                        </div>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        @php
            $service_center_info = json_decode($data->service_center_info ?? '[]', true);
            $manufacturing_product_info = json_decode($data->manufacturing_product_info ?? '[]', true);
            $spare_part_info = json_decode($data->spare_part_info ?? '[]', true);
            $sound_inventory = json_decode($data->sound_inventory ?? '[]', true);
            $mixer_names_info = json_decode($data->mixer_names_info ?? '[]', true);
            $category_info = json_decode($data->category_info ?? '[]', true);
            $companies_info = json_decode($data->companies_info ?? '[]', true);
            $distributor_of_company = json_decode($data->distributor_of_company ?? '[]', true);
            $dealer_of_company = json_decode($data->dealer_of_company ?? '[]', true);
            $importer_of_company = json_decode($data->importer_of_company ?? '[]', true);
        @endphp

        <div class="row">
            <div class="kt-form kt-form--label-right">
                <div class="kt-portlet__body">
                    <div class="kt-widget kt-widget--user-profile-3">
                        <div class="kt-widget__top">
                            <div class="kt-widget__media">
                                <div class="media-item" id="delete_user_profile_div">
                                    <!-- Tabs Navigation -->
                                    <ul class="nav nav-tabs" id="profileTabs" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="tab1-tab" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">About Us</a>
                                        </li>
                                        @if(!empty($service_center_info))
                                        <li class="nav-item">
                                            <a class="nav-link" id="tab2-tab" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">Service Center</a>
                                        </li>
                                        @endif
                                        @if(!empty($manufacturing_product_info))
                                        <li class="nav-item">
                                            <a class="nav-link" id="tab3-tab" data-toggle="tab" href="#tab3" role="tab" aria-controls="tab3" aria-selected="false">Manufacturer Product</a>
                                        </li>
                                        @endif
                                        @if(!empty($spare_part_info))
                                        <li class="nav-item">
                                            <a class="nav-link" id="tab4-tab" data-toggle="tab" href="#tab4" role="tab" aria-controls="tab4" aria-selected="false">Spare Part Info</a>
                                        </li>
                                        @endif
                                        @if(!empty($business_company_data) && count($business_company_data) > 0)
                                        <li class="nav-item">
                                            <a class="nav-link" id="tab5-tab" data-toggle="tab" href="#tab5" role="tab" aria-controls="tab5" aria-selected="false">Company Info</a>
                                        </li>
                                        @endif
                                        @if(!empty($sound_inventory))
                                        <li class="nav-item">
                                            <a class="nav-link" id="tab6-tab" data-toggle="tab" href="#tab6" role="tab" aria-controls="tab6" aria-selected="false">Sound Inventory</a>
                                        </li>
                                        @endif
                                        @if(!empty($working_with) && count($working_with) > 0)
                                        <li class="nav-item">
                                            <a class="nav-link" id="tab7-tab" data-toggle="tab" href="#tab7" role="tab" aria-controls="tab7" aria-selected="false">Working With</a>
                                        </li>
                                        @endif
                                        @if(!empty($mixer_names_info))
                                        <li class="nav-item">
                                            <a class="nav-link" id="tab8-tab" data-toggle="tab" href="#tab8" role="tab" aria-controls="tab8" aria-selected="false">Operationg Mixer</a>
                                        </li>
                                        @endif
                                        @if($data->role_id == '6' || $data->role_id == '9')
                                        <li class="nav-item">
                                            <a class="nav-link" id="tab9-tab" data-toggle="tab" href="#tab9" role="tab" aria-controls="tab9" aria-selected="false">Product Info</a>
                                        </li>
                                        @endif
                                        <li class="nav-item">
                                            <a class="nav-link" id="tab10-tab" data-toggle="tab" href="#tab10" role="tab" aria-controls="tab10" aria-selected="false">Rating & Review</a>
                                        </li>
                                    </ul>

                                    <!-- Tabs Content -->
                                    <div class="tab-content mt-3" id="profileTabsContent">
                                        <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                                            @if(!empty($data->company_about))
                                            <p>{{ $data->company_about ?? 'N/A' }}</p>
                                            @else
                                            <p>No information found</p>
                                            @endif
                                        </div>
                                        @if(!empty($service_center_info))
                                        <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                                            @foreach($service_center_info as $key => $service_center_info_row)
                                            <div class="col-lg-12">
                                                <label><strong>Name : </strong>{{ $service_center_info_row['center_name'] }}</label>
                                            </div>
                                            <div class="col-lg-12">
                                                <label><strong>Company : </strong>{{ $service_center_info_row['company_name'] }}</label>
                                            </div>
                                            <div class="col-lg-12">
                                                <label><strong>Location : </strong>{{ $service_center_info_row['location'] }}</label>
                                            </div>
                                            <div class="col-lg-12">
                                                <label><strong>Phone No : </strong>{{ $service_center_info_row['code'] }} {{ $service_center_info_row['mobile_number'] }}</label>
                                            </div>
                                            <hr>
                                            @endforeach
                                        </div>
                                        @endif
                                        @if(!empty($manufacturing_product_info))
                                        <div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                                            @foreach($manufacturing_product_info as $key => $manufacturing_product_info_row)
                                            <div class="col-lg-12">
                                                <label><strong>{{ $manufacturing_product_info_row['product_name'] }}</strong></label>
                                            </div>
                                            <hr>
                                            @endforeach
                                        </div>
                                        @endif
                                        @if(!empty($spare_part_info))
                                        <div class="tab-pane fade" id="tab4" role="tabpanel" aria-labelledby="tab4-tab">
                                            @foreach($spare_part_info as $key => $spare_part_info_row)
                                            <div class="col-lg-12">
                                                <label><strong>Part Name : </strong>{{ $spare_part_info_row['parts_name'] }}</label>
                                            </div>
                                            <div class="col-lg-12">
                                                <label><strong>Company : </strong>{{ $spare_part_info_row['company_name'] }}</label>
                                            </div>
                                            <div class="col-lg-12">
                                                <label><strong>Part Detail : </strong>{{ $spare_part_info_row['details'] }}</label>
                                            </div>
                                            <hr>
                                            @endforeach
                                        </div>
                                        @endif
                                        @if(!empty($business_company_data) && count($business_company_data) > 0)
                                        <div class="tab-pane fade" id="tab5" role="tabpanel" aria-labelledby="tab5-tab">
                                            @foreach($business_company_data as $key => $business_company_data_row)
                                            <div class="col-lg-12">
                                                <label><strong>{{ $business_company_data_row['name'] }} : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><a target="_blank" href="{{ $business_company_data_row['image_url']  }}" class="btn-brand btn-elevate btn-icon-sm" >View PDF</a></label>
                                            </div>
                                            <hr>
                                            @endforeach
                                        </div>
                                        @endif
                                        @if(!empty($sound_inventory))
                                        <div class="tab-pane fade" id="tab6" role="tabpanel" aria-labelledby="tab6-tab">
                                            @foreach($sound_inventory as $key => $sound_inventory_row)
                                            <div class="col-lg-12">
                                                <label><strong>{{ $sound_inventory_row['name'] }}</strong></label>
                                            </div>
                                            <hr>
                                            @endforeach
                                        </div>
                                        @endif
                                        @if(!empty($working_with) && count($working_with) > 0)
                                        <div class="tab-pane fade" id="tab7" role="tabpanel" aria-labelledby="tab7-tab">
                                            @foreach($working_with as $key => $working_with_row)
                                            <div class="col-lg-12">
                                                <label><strong>UserName : </strong>{{ $working_with_row['register_name'] }}</label>
                                            </div>
                                            <!--                                            <div class="col-lg-12">
                                                                                            <label><strong>Business Type : </strong>{{ $working_with_row['register_name'] }}</label>
                                                                                        </div>-->
                                            <hr>
                                            @endforeach
                                        </div>
                                        @endif
                                        @if(!empty($mixer_names_info))
                                        <div class="tab-pane fade" id="tab8" role="tabpanel" aria-labelledby="tab8-tab">
                                            @foreach($mixer_names_info as $key => $mixer_names_info_row)
                                            <div class="col-lg-12">
                                                <label><strong>Company : </strong>{{ $mixer_names_info_row['company_name'] }}</label>
                                            </div>
                                            <div class="col-lg-12">
                                                <label><strong>Model : </strong>{{ $mixer_names_info_row['model_name'] }}</label>
                                            </div>
                                            <hr>
                                            @endforeach
                                        </div>
                                        @endif
                                        @if($data->role_id == '6' || $data->role_id == '9')
                                        <div class="tab-pane fade" id="tab9" role="tabpanel" aria-labelledby="tab9-tab">
                                            @if(!empty($category_info))
                                            <h5>Product</h5>
                                            @foreach($category_info as $key => $category_info_row)
                                            <div class="col-lg-12">
                                                <label>{{ $category_info_row['category_name'] }}</label>
                                            </div>
                                            @endforeach
                                            <hr>
                                            @endif

                                            @if(!empty($companies_info))
                                            <h5>Company</h5>
                                            @foreach($companies_info as $key => $companies_info_row)
                                            <div class="col-lg-12">
                                                <label>{{ $companies_info_row['companies_name'] }}</label>
                                            </div>
                                            @endforeach
                                            <hr>
                                            @endif

                                            @if(!empty($distributor_of_company))
                                            <h5>Distributor Of Company</h5>
                                            @foreach($distributor_of_company as $key => $distributor_of_company_row)
                                            <div class="col-lg-12">
                                                <label>{{ $distributor_of_company_row['company_name'] }}</label>
                                            </div>
                                            @endforeach
                                            <hr>
                                            @endif

                                            @if(!empty($dealer_of_company))
                                            <h5>Dealer Of Company</h5>
                                            @foreach($dealer_of_company as $key => $dealer_of_company_row)
                                            <div class="col-lg-12">
                                                <label>{{ $dealer_of_company_row['company_name'] }}</label>
                                            </div>
                                            @endforeach
                                            <hr>
                                            @endif

                                            @if(!empty($importer_of_company))
                                            <h5>Importer Of Company</h5>
                                            @foreach($importer_of_company as $key => $importer_of_company_row)
                                            <div class="col-lg-12">
                                                <label>{{ $importer_of_company_row['company_name'] }}</label>
                                            </div>
                                            @endforeach
                                            <hr>
                                            @endif
                                        </div>
                                        @endif
                                        <div class="tab-pane fade show" id="tab10" role="tabpanel" aria-labelledby="tab10-tab">
                                            @if(!empty($review_data) && count($review_data) > 0)
                                            <table style="width: 100% !important;">
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Business Type</th>
                                                    <th>Mobile Number</th>
                                                    <th>Rating</th>
                                                    <th>Message</th>
                                                    <th>Action</th>
                                                </tr>
                                                @foreach($review_data as $review_data_row)
                                                <tr id="delete_review_div_{{ $review_data_row->id }}">
                                                    <td>{{ $review_data_row->register_name ?? 'N/A' }}</td>
                                                    <td>{{ $review_data_row->role_name ?? 'N/A' }}</td>
                                                    <td>{{ $review_data_row->code .' '.$review_data_row->mobile_number ?? 'N/A' }}</td>
                                                    <td>{{ $review_data_row->rating }}</td>
                                                    <td>{{ $review_data_row->message }}</td>
                                                    <td><button class="delete-review" data-id="{{ $review_data_row->id }}">Delete</button></td>
                                                </tr>
                                                @endforeach
                                            </table>
                                            @else
                                            <p>No information found</p>
                                            @endif
                                        </div>
                                    </div>
                                </div> <!-- /#delete_user_profile_div -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<input type="hidden" id="user_id" name="user_id" value="{{ $data->id ?? null }}">

@endsection
@push('script')
<script>
    $('.delete-review').on('click', function () {
    let imageId = $(this).data('id');
    if (confirm("Are you sure you want to remove this?")) {
    $.ajax({
    url: "{{ route('admin.register.delete_review') }}",
            type: 'POST',
            data: {
            _token: '{{ csrf_token() }}',
                    id: imageId
            },
            success: function (response) {
            if (response.success) {
            $('#delete_review_div_' + imageId).remove(); // remove image from DOM
            } else {
            alert('Failed to delete image.');
            }
            }
    });
    }
    });
</script>
@endpush
