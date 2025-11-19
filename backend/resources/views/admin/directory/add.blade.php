@extends('admin.layouts.default')
@section('title', 'Directory')
@section('content')

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
</style>
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Directory</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
        <div class="kt-subheader__breadcrumbs">
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="{{ route('admin.directory.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="javascript:;" class="kt-subheader__breadcrumbs-link"
               title="Back">{{ $data ? 'Edit' : 'Add' }}</a>
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
                    {{ $data ? 'Edit' : 'Add New' }} Directory
                </h3>
            </div>
        </div>
        <!--begin::Portlet-->
        <!--begin::Form-->
        
<!--<div class="tab">
  <button class="tablinks active" onclick="openCity(event, 'Company Info')">Company Info</button>
  <button class="tablinks" onclick="openCity(event, 'Catalogue')">Catalogue</button>
</div>-->

<!--<div id="Company Info" class="tabcontent active" style="display: block;">-->
  <form class="kt-form" action="{{ route('admin.directory.store') }}" isReload="{{ route('admin.directory.list') }}" id="directory-add-from" method="post" enctype="multipart/form-data">

            <div class="kt-portlet__body">
                @csrf
                <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
                <div class="form-group row">
                    <div class="form-group col-lg-6">
                        <label>User: <span class="text-danger">*</span></label>
                        <select id="user_id" name="user_id" class="form-control">
                            <option value="">Select User</option>
                            @foreach($users as $users_row)
                            <option value="{{ $users_row->id }}"
                                    @if(isset($data) && $data->user_id == $users_row->id) selected @endif>
                                    {{ $users_row->name }}
                        </option>
                        @endforeach
                    </select>
                </div>
                    <div class="form-group col-lg-6">
                <label>Company Name <span class="text-danger">*</span></label>
                <input type="text" name="company_name" placeholder="Enter Company Name" value="{{ $data->company_name ?? null }}" class="form-control">
            </div>
                    <div class="col-lg-6">
                        <label>Mobile Number <span class="text-danger">*</span></label>
                        <input type="tel" id="mobile_number" name="mobile_number" data-validation="required|number" value="{{ $data->mobile_number ?? null }}" class="form-control only-mobile" placeholder="">
                    </div>
                    <input type="hidden" name="country_code" id="country_code">
                    
                    <div class="form-group col-lg-6">
                <label>Email <span class="text-danger">*</span></label>
                <input type="email" name="email" placeholder="Enter Email" value="{{ $data->email ?? null }}" class="form-control">
            </div>
                    <div class="form-group col-lg-6">
                        <label>Available on whatsApp with same number?</label>
                        <input type="checkbox" name="available_on_whatsapp_with_same_number"  id="available_on_whatsapp_with_same_number"  value="1" @if(isset($data) && $data->available_on_whatsapp_with_same_number == 0) unchecked @else checked @endif>
                    </div>
                    <div class="form-group col-lg-6" id="whatsapp_div" style="display: none;">
                        <label>WhatsApp</label>
                        <input type="tel" id="whatsapp" name="whatsapp" data-validation="required|number" value="{{ $data->whatsapp ?? null }}" class="form-control only-mobile" placeholder="">
                    </div>
                    <input type="hidden" name="whatsapp_country_code" id="whatsapp_country_code">
                <div class="form-group col-lg-6">
                    <label>Main Categories: <span class="text-danger">*</span></label>
                    <select id="categories_id" name="categories_id" class="form-control">
                        <option value="">Select Main Categories</option>
                        @foreach($categories as $category)
                        <option value="{{ $category->id }}"
                                @if(isset($data) && $data->categories_id == $category->id) selected @endif>
                                {{ $category->name }}
                    </option>
                    @endforeach
                </select>
            </div>
            <div class="form-group col-lg-6">
                <label>Category: <span class="text-danger">*</span></label>
                <select id="category_id" name="category_id" class="form-control">
                    <option value="">Select Category</option>
                </select>
            </div>
            <div class="form-group col-lg-6">
                <label>Sub Category: </label>
                <select id="sub_category_id" name="sub_category_id" class="form-control">
                    <option value="">Select Sub Category</option>
                </select>
            </div>
                    <div class="form-group col-lg-6">
                <label>Website <span class="text-danger">*</span></label>
                <input type="text" name="website" placeholder="Enter Website" value="{{ $data->website ?? null }}" class="form-control">
            </div>
                    <div class="form-group col-lg-6">
                <label>Location <span class="text-danger">*</span></label>
                <input type="text" name="location" placeholder="Enter Location" value="{{ $data->location ?? null }}" class="form-control">
            </div>
                    <div class="form-group col-lg-6">
                <label>Contact Person Name <span class="text-danger">*</span></label>
                <input type="text" name="contact_person_name" placeholder="Enter Contact Person Name" value="{{ $data->contact_person_name ?? null }}" class="form-control">
            </div>
                    <div class="form-group col-lg-6">
                    <label>Cities: <span class="text-danger">*</span></label>
                    <select id="city_id" name="city_id" class="form-control">
                        <option value="">Select Cities</option>
                        @foreach($cities as $cities_row)
                        <option value="{{ $cities_row->id }}"
                                @if(isset($data) && $data->city_id == $cities_row->id) selected @endif>
                                {{ $cities_row->city_name }}
                    </option>
                    @endforeach
                </select>
            </div>
            
              
            <div class="form-group col-lg-6">
                            <label>Logo {!! $data && $data->image ? '' : '<span class="text-danger">*</span>' !!} </label>
                            <div class="custom-file">
                                <input type="file" name="image" class="custom-file-input" id="userImage"
                                    accept="image/*">
                                <label class="custom-file-label text-truncate" for="userImage">Choose file</label>
                                <span class="form-text text-muted">The Image must not be greater than 2MB. and file type:
                                    jpg, jpeg, png.</span>
                                @if ($data && $data->image)
                                    <a href="{{ $data->image_url }}" target="_blank">View Image</a>
                                @endif
                            </div>
                        </div>        
                    <div class="form-group col-lg-12">
                        <label>About Us <span class="text-danger">*</span></label>
                        <textarea id="about_us" name="about_us" placeholder="Enter About Us" class="form-control" >{{ $data->about_us ?? null }}</textarea>
                    </div>
                <input type="hidden" name="status" value="1">

            </div>
                <div class="col-md-12">
                    <button type="button" class="btn btn-primary add-slider-image-btn"> + Add Slider Image </button>
                </div><hr/>
                
                <div class="row">
                    @if ($slider_data)
                        @foreach($slider_data as $slider_data_row)
                            <div class="col-lg-3 remove-slider-image">
                                <div class="">
                                    <a href="{{ $slider_data_row->image_url }}" target="_blank">
                                        <img src="{{ $slider_data_row->image_url }}" width="100" height="100" >
                                    </a>
                                </div>
                                <div class="image_remove_btn">
                                    <button type="button" data-id="{{ $slider_data_row->id }}" class="btn btn-danger remove-slider-more-image-btn"> X </button>            
                                </div>
                            </div>
                        @endforeach
                    @endif
                </div>
                
                <div class="row add-slider-image-content border_bottom"></div>
                
                <div class="col-md-12">
                    <button type="button" class="btn btn-primary add-gallery-image-btn"> + Add Gallery Image </button>
                </div><hr/>
                
                <div class="row">
                    @if ($gallery_data)
                        @foreach($gallery_data as $gallery_data_row)
                            <div class="col-lg-3 remove-gallery-image">
                                <div class="">
                                    <a href="{{ $gallery_data_row->image_url }}" target="_blank">
                                        <img src="{{ $gallery_data_row->image_url }}" width="100" height="100" >
                                    </a>
                                </div>
                                <div class="image_remove_btn">
                                    <button type="button" data-id="{{ $gallery_data_row->id }}" class="btn btn-danger remove-gallery-more-image-btn"> X </button>            
                                </div>
                            </div>
                        @endforeach
                    @endif
                </div>
                
                <div class="row add-gallery-image-content border_bottom"></div>
                
                <div class="col-md-12">
                    <button type="button" class="btn btn-primary add-catalogue-btn"> + Add Catalogue Pdf </button>
                </div><hr/>
                @if ($catalogue_data)
                    @foreach($catalogue_data as $catalogue_data_row)
                        <div class="wrapper_view">
                            <div class="box_view a">
                                {{ $catalogue_data_row->name }}
                            </div>
                            <div class="box_view b">
                                <a href="{{ $catalogue_data_row->image_url }}" target="_blank">View Pdf</a>
                            </div>
                            <div class="box_view c">
                                <button type="button" data-id="{{ $catalogue_data_row->id }}" class="btn btn-danger remove-catalogue-more-btn"> X </button>
                            </div>
                        </div>
                    @endforeach
                @endif
                
                <div class="row add-catalogue-content"></div>
                <hr>
                
    <div class="kt-portlet__foot">
        <div class="kt-form__actions">
            <button type="submit" class="btn btn-brand">Save</button>
            <button type="button" class="btn btn-secondary" onclick="window.history.back()">Cancel</button>
        </div>
    </div>
</div>
</form>
<!--</div>

<div id="Catalogue" class="tabcontent">
  <h3>Catalogue</h3>
  <p>Paris is the capital of France.</p> 
</div>-->
        
        
<input type="hidden" id="sub_id" name="sub_id" value="{{ $data->category_id ?? null }}">
<input type="hidden" id="sub_sub_id" name="sub_sub_id" value="{{ $data->sub_category_id ?? null }}">
<!--end::Form-->
</div>
</div>
@endsection
@push('script')
<script>
    let count3 = 0;
    $(document).on('click', '.add-catalogue-btn', function() {
            let html = `<div class="wrapper remove-catalogue">
                            <div class="box a">
                                <input type="text" name="catalogue_name[${count3}]" placeholder="Enter Catalogue Name" value="" class="form-control">
                            </div>
                            <div class="box b">
                                <input type="file" name="catalogue_pdf[${count3}]" class="form-control" accept="application/pdf" data-validation-allowing="pdf" >
                            </div>
                            <div class="box c">
                                <button type="button" class="btn btn-danger remove-catalogue-more-btn"> X </button>
                            </div>
                        </div>`;

            $('.add-catalogue-content').append(html);

            count3++;
        });
        $(document).on('click', '.remove-catalogue-more-btn', function() {
            let id3 = $(this).data('id');
            if (id3) {
                $.ajax({
                            url: "{{ route('admin.directory.delete.catalogue.pdf') }}",
                            type: "post",
                            data: {
                                "_token": "{{ csrf_token() }}",
                                imageID: id3
                            },
                            success: function(response) {
                                $status = 'error';

                                Toast.fire({
                                    icon: $status,
                                    title: response.message
                                })
                                location.reload();
                                $(this).closest('.remove-catalogue').remove();
                            }
                        });
//                Swal.fire({
//                    title: 'Are you sure? you want to delete!',
//                    icon: 'warning',
//                    showCancelButton: true,
//                    confirmButtonColor: '#3085d6',
//                    cancelButtonColor: '#d33',
//                    confirmButtonText: 'Yes',
//                    cancelButtonText: 'No',
//                    reverseButtons: true
//                }).then((result) => {
//                    if (result.isConfirmed) {
//                        
//                    }
//                })
            } else {
                $(this).closest('.remove-catalogue').remove();
            }
        });
</script>
<script>
    let count = 0;
    $(document).on('click', '.add-slider-image-btn', function() {
            let html = `<div class="col-lg-6 remove-slider-image">
                        <div class="">
                                <input type="file" name="slider_image[${count}]" class="form-control" accept="image/*" data-validation="mime size" data-validation-allowing="jpg,png, jpeg" >         
                        </div>
                        <div class="">
                                <button type="button" class="btn btn-danger remove-slider-more-image-btn"> X </button>            
                        </div></div>`;

            $('.add-slider-image-content').append(html);

            count++;
        });
        $(document).on('click', '.remove-slider-more-image-btn', function() {
            let id = $(this).data('id');
            if (id) {
                $.ajax({
                            url: "{{ route('admin.directory.delete.slider.images') }}",
                            type: "post",
                            data: {
                                "_token": "{{ csrf_token() }}",
                                imageID: id
                            },
                            success: function(response) {
                                $status = 'error';

                                Toast.fire({
                                    icon: $status,
                                    title: response.message
                                })
                                location.reload();
                                $(this).closest('.remove-slider-image').remove();
                            }
                        });
//                Swal.fire({
//                    title: 'Are you sure? you want to delete!',
//                    icon: 'warning',
//                    showCancelButton: true,
//                    confirmButtonColor: '#3085d6',
//                    cancelButtonColor: '#d33',
//                    confirmButtonText: 'Yes',
//                    cancelButtonText: 'No',
//                    reverseButtons: true
//                }).then((result) => {
//                    if (result.isConfirmed) {
//                        
//                    }
//                })
            } else {
                $(this).closest('.remove-slider-image').remove();
            }
        });
</script>
<script>
    let count2 = 0;
    $(document).on('click', '.add-gallery-image-btn', function() {
            let html2 = `<div class="col-lg-6 remove-gallery-image">
                        <div class="">
                                <input type="file" name="gallery_image[${count2}]" class="form-control" accept="image/*" data-validation="mime size" data-validation-allowing="jpg,png, jpeg" >      
                        </div>
                        <div class="">
                                <button type="button" class="btn btn-danger remove-gallery-more-image-btn"> X </button>            
                        </div></div>`;

            $('.add-gallery-image-content').append(html2);

            count2++;
        });
        $(document).on('click', '.remove-gallery-more-image-btn', function() {
            let id2 = $(this).data('id');
            if (id2) {
                $.ajax({
                            url: "{{ route('admin.directory.delete.gallery.images') }}",
                            type: "post",
                            data: {
                                "_token": "{{ csrf_token() }}",
                                imageID: id2
                            },
                            success: function(response) {
                                $status = response.status ? 'success' : 'error';

                                Toast.fire({
                                    title: response.message
                                })
                                location.reload();
                                $(this).closest('.remove-gallery-image').remove();
                            }
                        });
//                Swal.fire({
//                    title: 'Are you sure? you want to delete!',
//                    icon: 'warning',
//                    showCancelButton: true,
//                    confirmButtonColor: '#3085d6',
//                    cancelButtonColor: '#d33',
//                    confirmButtonText: 'Yes',
//                    cancelButtonText: 'No',
//                    reverseButtons: true
//                }).then((result) => {
//                    if (result.isConfirmed) {
//                        
//                    }
//                })
            } else {
                $(this).closest('.remove-gallery-image').remove();
            }
        });
</script>
<script>
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
</script>
<script type="text/javascript">
    let conf = {
        rules: {
            user_id: {
                required: true,
            },
            categories_id: {
                required: true,
            },
            category_id: {
                required: true,
            },
            company_name: {
                required: true,
            },
            mobile_number: {
                required: true,
            },
            email: {
                required: true,
            },
            website: {
                required: true,
            },
            location: {
                required: true,
            },
            contact_person_name: {
                required: true,
            },
            city_id: {
                required: true,
            },
            image: {
                    required: {{ $data && $data->image ? 'false' : true }},
            },
            about_us: {
                required: true,
            },
        },
        messages: {
        },
    };
    validationFormAndSubmit($('#directory-add-from'), conf);
    document.getElementById('userImage').addEventListener('change', function () {
        let fileName = this.files[0] ? this.files[0].name : 'Choose file';
        let nextSibling = this.nextElementSibling;
        if (nextSibling && nextSibling.classList.contains('custom-file-label')) {
            nextSibling.textContent = fileName;
        }
        $(this).valid();
    });
</script>
<script>
    $(document).ready(function () {
        var sub_id = $("#sub_id").val();
        var sub_sub_id = $("#sub_sub_id").val();
        $('#categories_id').on('change', function () {
            var categories_id = $(this).val();

            var url = "{{ route('admin.directory.get', ':categories_id') }}";
            url = url.replace(':categories_id', categories_id);

            if (categories_id === '') {
                $('#category_id').empty().append('<option value="">Select Category</option>');
                return;
            }

            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    $('#category_id').empty().append(
                            '<option value="">Select Category</option>');
                    $.each(data, function (key, value) {
                        if (sub_id == value.id) {
                            $('#category_id').append('<option selected value="' + value.id +
                                    '">' + value.name + '</option>');
                        } else {
                            $('#category_id').append('<option value="' + value.id +
                                    '">' + value.name + '</option>');
                        }

                    });
                    $('#category_id').trigger('change');
                }
            });
        });

        $('#category_id').on('change', function () {
            var category_id = $(this).val();
            var url = "{{ route('admin.directory.getsubcategory', ':category_id') }}";
            url = url.replace(':category_id', category_id);

            if (category_id === '') {
                $('#sub_category_id').empty().append('<option value="">Select Sub Category</option>');
                return;
            }

            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    $('#sub_category_id').empty().append(
                            '<option value="">Select Sub Category</option>');
                    $.each(data, function (key, value) {
                        if (sub_sub_id == value.id) {
                            $('#sub_category_id').append('<option selected value="' + value.id +
                                    '">' + value.name + '</option>');
                        } else {
                            $('#sub_category_id').append('<option value="' + value.id +
                                    '">' + value.name + '</option>');
                        }

                    });
                }
            });
        });
    });
</script>
<script>
    $(document).ready(function () {
        $('#categories_id').trigger('change');
        var input = document.querySelector("#country");
        var countryCodeInput = document.querySelector("#countryCode");
//        var iti = window.intlTelInput(input, {
//            separateDialCode: false,
//            initialCountry: "{{ $data->country_code ?? 'ae' }}",
//            geoIpLookup: function (callback) {
//                $.get('https://ipinfo.io', function () {}, "jsonp").always(function (resp) {
//                    var countryCode = (resp && resp.country) ? resp.country : "ae";
//                    callback(countryCode);
//                });
//            },
//            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
//        });
        // Update #country and #countryCode on initialization
        var initialCountryData = iti.getSelectedCountryData();
        var initialCountryName = initialCountryData.name;
        var initialCountryCode = initialCountryData.iso2;
        $("#country").val(initialCountryName);
        $("#countryCode").val(initialCountryCode);
        // Update #country and #countryCode when the country is changed
        input.addEventListener("countrychange", function () {
            var countryData = iti.getSelectedCountryData();
            var countryName = countryData.name;
            var countryCode = countryData.iso2;
            $("#country").val(countryName);
            $("#countryCode").val(countryCode);
        });
        // Allow user to edit the country code directly in the input field
        $("#countryCode").on("input", function () {
            var code = $(this).val();
            iti.setCountry(code);
            var countryData = iti.getSelectedCountryData();
            var countryName = countryData.name;
            $("#country").val(countryName);
        });
    });
</script>
<script>
    $(document).ready(function() {
        $("#available_on_whatsapp_with_same_number").change(function() {
            var isChecked = $(this).prop('checked');  // Get checkbox state (true or false)
            if(isChecked == true){
                $("#whatsapp_div").css("display","none");
            }else{
                $("#whatsapp_div").css("display","block");
            }
        });
    });
</script>
<script>
        $.validator.addMethod("validEmail", function(value, element) {
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        }, "Please enter a valid company email");

        $.validator.addMethod("notDisposableEmail", function(value, element) {
            var disposableEmails = ['example.com', 'example.org', 'example.net'];
            var domain = value.split('@')[1];
            return disposableEmails.indexOf(domain) === -1;
        }, "Disposable company email addresses are not allowed");

        $.validator.addMethod("ValidPhoneNumber", function(value, element) {
            var input = $("#mobile_number");
            return input.intlTelInput("isValidNumber"); // Check if the number is valid based on the country
        }, "Phone Number does not match the selected country code");

        var input = $("#mobile_number");
        
        if (input.length > 0) {
            input.intlTelInput({
                initialCountry: "gb",
                separateDialCode: true,
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
            });

            input.on("countrychange keyup", function() {
                var selectedCountryData = input.intlTelInput("getSelectedCountryData");
                var countryCode = selectedCountryData.dialCode;
                $("#country_code").val("+" + countryCode);
            });
        }
    </script>
    <script>
        $.validator.addMethod("validEmail", function(value, element) {
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        }, "Please enter a valid company email");

        $.validator.addMethod("notDisposableEmail", function(value, element) {
            var disposableEmails = ['example.com', 'example.org', 'example.net'];
            var domain = value.split('@')[1];
            return disposableEmails.indexOf(domain) === -1;
        }, "Disposable company email addresses are not allowed");

        $.validator.addMethod("ValidPhoneNumber", function(value, element) {
            var input = $("#whatsapp");
            return input.intlTelInput("isValidNumber"); // Check if the number is valid based on the country
        }, "Phone Number does not match the selected country code");

        var input = $("#whatsapp");
        
        if (input.length > 0) {
            input.intlTelInput({
                initialCountry: "gb",
                separateDialCode: true,
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
            });

            input.on("countrychange keyup", function() {
                var selectedCountryData = input.intlTelInput("getSelectedCountryData");
                var countryCode = selectedCountryData.dialCode;
                $("#whatsapp_country_code").val("+" + countryCode);
            });
        }
    </script>
@endpush
