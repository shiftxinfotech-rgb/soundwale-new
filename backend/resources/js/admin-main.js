import './bootstrap';
import './chart';

window.$ = window.jQuery = require('jquery');

window.KTAppOptions = {
    "colors": {
        "state": {
            "brand": "#5d78ff",
            "dark": "#282a3c",
            "light": "#ffffff",
            "primary": "#5867dd",
            "success": "#34bfa3",
            "info": "#36a3f7",
            "warning": "#ffb822",
            "danger": "#fd3995"
        },
        "base": {
            "label": ["#c5cbe3", "#a1a8c3", "#3d4465", "#3e4466"],
            "shape": ["#f0f3ff", "#d9dffa", "#afb4d4", "#646c9a"]
        }
    }
};

import Cookies from 'js-cookie';
window.Cookies = Cookies;

window.Sticky = require('sticky-js');

import 'datatables.net';
import 'datatables.net-autofill';
import 'datatables.net-bs4';
import 'datatables.net-buttons';
import 'datatables.net-responsive';
import 'popper.js';
import 'bootstrap';
import 'bootstrap-datepicker';
import 'tooltip-js';
import 'moment';
import 'jquery-validation';

import PerfectScrollbar from 'perfect-scrollbar';
window.PerfectScrollbar = PerfectScrollbar;

import intlTelInput from 'intl-tel-input';
window.intlTelInput = intlTelInput;

import swal from 'sweetalert2';
window.Swal = window.swal = swal;

var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

window.Toast = Toast;

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

require('../asset/admin/vendors/general/wnumb/wNumb.js');
require('../asset/admin/vendors/general/jquery-form/dist/jquery.form.min.js');
require('../asset/admin/vendors/general/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.js');
require('../asset/admin/vendors/general/bootstrap-maxlength/src/bootstrap-maxlength.js');
require('../asset/admin/vendors/custom/vendors/bootstrap-multiselectsplitter/bootstrap-multiselectsplitter.min.js');
require('../asset/admin/vendors/general/bootstrap-select/dist/js/bootstrap-select.js');
require('../asset/admin/vendors/general/typeahead.js/dist/typeahead.bundle.js');
require('../asset/admin/vendors/general/handlebars/dist/handlebars.js');
require('../asset/admin/vendors/general/nouislider/distribute/nouislider.js');
require('../asset/admin/vendors/general/autosize/dist/autosize.js');
// require('../asset/admin/vendors/general/bootstrap-switch/dist/js/bootstrap-switch.js');

// require('../asset/admin/vendors/general/jquery-validation/dist/jquery.validate.js');
// require('../asset/admin/vendors/general/jquery-validation/dist/additional-methods.js');
// require('../asset/admin/vendors/custom/js/vendors/jquery-validation.init.js');

require('../asset/admin/js/demo1/scripts.bundle.js');
require('../asset/admin/js/comman.js');
