
const mix = require('laravel-mix');
const path = require('path');

// Admin assets
mix.setPublicPath('public/admin-asset')
   .js('resources/js/admin-login.js', 'public/admin-asset/js/admin-login.js')
   .js('resources/js/admin-main.js', 'public/admin-asset/js/admin-main.js')
   .postCss('resources/css/admin-login.css', 'public/admin-asset/css/admin-login.css', [])
   .postCss('resources/css/admin-main.css', 'public/admin-asset/css/admin-main.css', []);

// Web assets
// mix.setPublicPath('public/web-asset')
//    .copy('resources/asset/web/fonts', 'public/fonts')
//    .js('resources/js/web-font.js', 'public/web-asset/js/web-font.js')
//    .js('resources/js/web-main.js', 'public/web-asset/js/web-main.js')
//    .postCss('resources/css/app.css', 'public/web-asset/css/app.css', [])
//    .options({
//       processCssUrls: false // This disables URL processing if needed
//     });
