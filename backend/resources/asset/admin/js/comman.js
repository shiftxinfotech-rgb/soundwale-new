if ($('.phone-no').length > 0) {
    var phone_number = window.intlTelInput(document.querySelector(".phone-no"), {
        separateDialCode: true,
        // preferredCountries: ["us"],
        hiddenInput: "phone_no",
        formatOnDisplay: false,
        utilsScript: "//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js"
    });

    $("form").submit(function() {
        var full_number = phone_number.getNumber(intlTelInputUtils.numberFormat.E164);
        $("input[name='phone_no'").val($("input[name='phone_no'").val().replace(/ +?/g, ''));
        $(this).append('<input type="hidden" name="country_code" value="' + phone_number.getSelectedCountryData().dialCode + '" /> ');
        // $("input[name='country_code]'").val(phone_number.getSelectedCountryData().dialCode);
        return true;
    });
}

var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

 // only number
 $(".only-digits").keypress(function (e) {
   
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
    }
});

// only character
$('.txt-only').bind('keypress', function (event) {
    var inputValue = event.which;
    if (!(inputValue >= 58 && inputValue <= 127) && (inputValue < 10 || inputValue > 47) && inputValue != 8 && inputValue != 0) {
        event.preventDefault();
    }
});

$('span.show-hide').on('click', function () {
    if ($(this).find('i').hasClass('la-eye')) {
        $(this).parents('div.input-group').find('input[type=password]').attr('type', 'text');
        $(this).find('i').removeClass('la-eye').addClass('la-eye-slash');
    } else {
        $(this).parents('div.input-group').find('input[type=text]').attr('type', 'password');
        $(this).find('i').addClass('la-eye').removeClass('la-eye-slash');
    }
});

window.validationFormAndSubmit = (formObj,rules = null) => {

    let isReload = formObj.attr('isReload');
    var btn = formObj.find('button[type="submit"]');

    let defaultConfig = {
        focusInvalid: true,
        errorClass:'text-danger',
        ignore:['.v-ignore'],
        ...rules
    }

    let formValidation = formObj.validate({
        ...defaultConfig,
        //display error alert on form submit  
        invalidHandler: function(event, validator) {     
            KTUtil.scrollTop();
        },
        highlight: function(element) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function(element) {
            $(element).removeClass("is-invalid");
        },
        submitHandler: function(form) {
            var form = form;
            var formData = new FormData($('#'+form.id)[0]);

            $.ajax({
                url       : form.action,
                type      : form.method,
                data      : formData,
                processData: false,
				contentType: false,
                beforeSend: function() {
                    btn?.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);
                },
                success : function(res, status, xhr, $form) {
                    btn?.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);
                    Toast.fire({
                        type: 'success',
                        title: res.message
                    })
                    if(res.isReload){
                        setTimeout(() => {
                            window.location.href = res.isReload;    
                        }, 3000);
                    }
                    if(isReload){
                        setTimeout(() => {
                            window.location.href = isReload;    
                        }, 3000);
                    }
                },
                complete: function() {
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                },
                error: function(errorData) {
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                    printErrorMsg(errorData, formValidation);
                }
            });
        }
    });

    // return validation;
}

/**
 * print error msgs
 * @param Object errorObject
 */
function printErrorMsg(errorObject, validator) {
    var errors = JSON.parse(errorObject.responseText);
    if (errorObject.status == 422) {
        if ( validator ) {
            // Loop through the error messages in the response
            $.each(errors.errors, function(field, messages) {
                var element = $('[name="' + field + '"]');
                if( element.length > 0 ){
                    validator.showErrors({
                        [element.attr('name')]: messages[0] // Assuming you want to display the first error message only
                    });
                }else{
                    Toast.fire({
                        type: 'error',
                        title: errors.message,
                    })
                }
            });
        }else{
            Toast.fire({
                type: 'error',
                title: errors.message,
            })
        }
    } else if (errorObject.status == 500) {
        Swal.fire({
            text: errors.message,
            type: 'error',
            allowOutsideClick: false,
            confirmButtonText: 'Ok',
        });
    } else if (errorObject.status == 401) {
        localStorage.clear();
        location.href = APP_URL;
    } else if (errorObject.status == 403) {
        location.href = APP_URL + '/403';
    } else if (errorObject.status == 404) {
        location.href = APP_URL + '/404';
    } else {
        Swal.fire({
            title: errorObject.statusText,
            text: errors.message,
            type: 'error',
            allowOutsideClick: false,
            confirmButtonText: 'Ok',
        });

    }
}


$('table').on('click','a.delete-record', function () {
    event.preventDefault();
    let self = $(this);
    let data = $(this).data();
    var tag_id = self.attr('data-id');
    
    if(tag_id == ''){
        swal.fire({
            title: 'Something went wrong, try again later',
            type: 'error',
            animation: false,
            customClass: 'animated tada'
        })
        return false;
    }
    swal.fire({
        title: data?.title ? data?.title : 'Are you sure?',
        text: data?.text ? data?.text : "Are you sure you want to proceed ? ",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes'
        
    }).then(function(result) { 
        if (result.value) {
            $.ajax({
                url : self.attr('href'),
                type : 'POST',
                data : {id:tag_id },
                dataType:'json',
                beforeSend: function() {
                    swal.fire({
                        title: 'Please Wait..!',
                        text: 'Is working..',
                        onOpen: function() {
                            swal.showLoading()
                        }
                    })
                },
                success : function(data) { 
                    // console.log(data);
                    swal.fire(
                        'Success!',
                        data.message,
                        'success'
                    )
                    // $('.check-all').prop("checked", false).change();    
                    $(self).closest('table').trigger('reload-table');
                },
                complete: function() {
                    swal.hideLoading();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    swal.hideLoading();
                    swal.fire("!Opps ", "Something went wrong, try again later", "error");
                }
            });
        }
    });
});


window.validationAndSubmitModalForm = (formObj,rules = null,modalObj = null, dataTable) => {

    let isReload = formObj.attr('isReload');
    var btn = formObj.find('button[type="submit"]');

    let defaultConfig = {
        focusInvalid: true,
        errorClass:'text-danger',
        ignore:['.v-ignore'],
        ...rules
    }

    let formValidation = formObj.validate({
        ...defaultConfig,
        //display error alert on form submit  
        invalidHandler: function(event, validator) {     
            KTUtil.scrollTop();
        },
        highlight: function(element) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function(element) {
            $(element).removeClass("is-invalid");
        },
        submitHandler: function(form) {
            var form = form;
            var formData = new FormData($('#'+form.id)[0]);

            $.ajax({
                url       : form.action,
                type      : form.method,
                data      : formData,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    btn?.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);
                },
                success : function(res, status, xhr, $form) {
                    btn?.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);
                    Toast.fire({
                        type: 'success',
                        title: res.message
                    })

                    modalObj?.modal('hide');
                    dataTable?.draw();

                },
                complete: function() {
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                },
                error: function(errorData) {
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                    printErrorMsg(errorData, formValidation);
                }
            });
        }
    });
}