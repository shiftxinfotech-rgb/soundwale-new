import './bootstrap.js';

window.$ = window.jQuery = require('jquery');

import Cookies from 'js-cookie';
window.Cookies = Cookies;
import 'popper.js';
import 'bootstrap';

import 'jquery-validation';

import WOW from 'wow.js';

export function wowActive() {
    new WOW().init();
}
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

require('../asset/web/js/vendor/jquery.min.js');
require('../asset/web/js/vendor/jqueryui.js');
require('../asset/web/js/plugins/swiper.js');
require('../asset/web/js/plugins/counterup.js');
require('../asset/web/js/plugins/sal.min.js');
require('../asset/web/js/vendor/bootstrap.min.js');
require('../asset/web/js/vendor/waw.js');
require('../asset/web/js/plugins/contact.form.js');
require('../asset/web/js/main.js');
