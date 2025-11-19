import './bootstrap';

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


require('../asset/admin/vendors/general/jquery-form/dist/jquery.form.min.js');
require('../asset/admin/vendors/general/jquery-validation/dist/jquery.validate.js');
require('../asset/admin/vendors/general/jquery-validation/dist/additional-methods.js');
require('../asset/admin/vendors/custom/js/vendors/jquery-validation.init.js');
require('../asset/admin/js/demo1/scripts.bundle.js');
require('../asset/admin/js/demo1/pages/login/login-general.js');
require('../asset/admin/vendors/general/chart.js/dist/Chart.js');

