/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/asset/admin/js/demo1/pages/login/login-general.js":
/*!*********************************************************************!*\
  !*** ./resources/asset/admin/js/demo1/pages/login/login-general.js ***!
  \*********************************************************************/
/***/ (() => {

"use strict";


// Class Definition
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var KTLoginGeneral = function () {
  var login = $('#kt_login');
  var showErrorMsg = function showErrorMsg(form, type, msg) {
    var alert = $('<div class="kt-alert kt-alert--outline alert alert-' + type + ' alert-dismissible" role="alert">\
			<button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>\
			<span></span>\
		</div>');
    form.find('.alert').remove();
    alert.prependTo(form);
    //alert.animateClass('fadeIn animated');
    KTUtil.animateClass(alert[0], 'fadeIn animated');
    alert.find('span').html(msg);
    alert.delay(4000).slideUp('slow');
  };

  // Private Functions
  var displaySignUpForm = function displaySignUpForm() {
    login.removeClass('kt-login--forgot');
    login.removeClass('kt-login--signin');
    login.addClass('kt-login--signup');
    KTUtil.animateClass(login.find('.kt-login__signup')[0], 'flipInX animated');
  };
  var displaySignInForm = function displaySignInForm() {
    login.removeClass('kt-login--forgot');
    login.removeClass('kt-login--signup');
    login.addClass('kt-login--signin');
    KTUtil.animateClass(login.find('.kt-login__signin')[0], 'flipInX animated');
    //login.find('.kt-login__signin').animateClass('flipInX animated');
  };
  var displayForgotForm = function displayForgotForm() {
    login.removeClass('kt-login--signin');
    login.removeClass('kt-login--signup');
    login.addClass('kt-login--forgot');
    //login.find('.kt-login--forgot').animateClass('flipInX animated');
    KTUtil.animateClass(login.find('.kt-login__forgot')[0], 'flipInX animated');
  };
  var handleFormSwitch = function handleFormSwitch() {
    $('#kt_login_forgot').click(function (e) {
      e.preventDefault();
      displayForgotForm();
    });
    $('#kt_login_forgot_cancel').click(function (e) {
      e.preventDefault();
      displaySignInForm();
    });
    $('#kt_login_signup').click(function (e) {
      e.preventDefault();
      displaySignUpForm();
    });
    $('#kt_login_signup_cancel').click(function (e) {
      e.preventDefault();
      displaySignInForm();
    });
  };
  var handleSignInFormSubmit = function handleSignInFormSubmit() {
    $('#kt_login_signin_submit').click(function (e) {
      e.preventDefault();
      var btn = $(this);
      var form = $(this).closest('form');
      form.validate({
        errorClass: 'text-danger',
        rules: {
          email: {
            required: true,
            email: true
          },
          password: {
            required: true
          }
        }
      });
      if (!form.valid()) {
        return;
      }
      btn.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);
      form.ajaxSubmit({
        url: '',
        success: function success(response, status, xhr, $form) {
          // similate 2s delay
          setTimeout(function () {
            // console.log(response);
            if (response.status) {
              showErrorMsg(form, 'success', response.message);
              btn.text('Redirecting..');
              setTimeout(function () {
                window.location = response.redirect_url;
              }, 2000);
            } else {
              showErrorMsg(form, 'danger', response.message);
              btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
            }
          }, 1000);
        },
        error: function error(xhr) {
          // if error occured
          btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
          showErrorMsg(form, 'danger', xhr.responseJSON.message);
        }
      });
    });
  };
  var handleSignUpFormSubmit = function handleSignUpFormSubmit() {
    $('#kt_login_signup_submit').click(function (e) {
      e.preventDefault();
      var btn = $(this);
      var form = $(this).closest('form');
      form.validate({
        errorClass: 'text-danger',
        rules: {
          password: {
            required: true
          },
          password_confirmation: {
            required: true,
            equalTo: "#password"
          }
        }
      });
      if (!form.valid()) {
        return;
      }
      btn.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);
      form.ajaxSubmit({
        url: '',
        success: function success(response, status, xhr, $form) {
          // similate 2s delay
          setTimeout(function () {
            // console.log(response);
            if (response.status) {
              showErrorMsg(form, 'success', response.message);
              btn.text('Redirecting..');
              setTimeout(function () {
                window.location = response.redirect_url;
              }, 2000);
            } else {
              showErrorMsg(form, 'danger', response.message);
              btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
            }
          }, 1000);
        },
        error: function error(xhr) {
          // if error occured
          btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
          showErrorMsg(form, 'danger', xhr.responseJSON.message);
        }
      });
    });
  };
  var handleForgotFormSubmit = function handleForgotFormSubmit() {
    $('#kt_login_forgot_submit').click(function (e) {
      e.preventDefault();
      var btn = $(this);
      var form = $(this).closest('form');
      form.validate({
        errorClass: 'text-danger',
        rules: {
          email: {
            required: true,
            email: true
          }
        }
      });
      if (!form.valid()) {
        return;
      }
      btn.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);
      form.ajaxSubmit({
        url: form.attr('action'),
        success: function success(response, status, xhr, $form) {
          // similate 2s delay
          setTimeout(function () {
            var _console;
            /* eslint-disable */(_console = console).log.apply(_console, _toConsumableArray(oo_oo("1111717725_203_24_203_45_4", response)));
            if (response.status) {
              btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
              form.clearForm(); // clear form
              form.validate().resetForm(); // reset validation states

              // display signup form
              displaySignInForm();
              var signInForm = login.find('.kt-login__signin form');
              signInForm.clearForm();
              signInForm.validate().resetForm();
              showErrorMsg(signInForm, 'success', 'Cool! Password recovery instruction has been sent to your email.');
            } else {
              showErrorMsg(form, 'danger', response.message);
              btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
            }
          }, 2000);
        },
        error: function error(xhr) {
          // if error occured
          btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false); // remove
          showErrorMsg(form, 'danger', xhr.responseJSON.message);
        }
      });
    });
  };

  // Public Functions
  return {
    // public functions
    init: function init() {
      handleFormSwitch();
      handleSignInFormSubmit();
      handleSignUpFormSubmit();
      handleForgotFormSubmit();
    }
  };
}();

// Class Initialization
jQuery(document).ready(function () {
  KTLoginGeneral.init();
});
/* istanbul ignore next */ /* c8 ignore start */ /* eslint-disable */
;
function oo_cm() {
  try {
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';function _0x4e05(_0x132df1,_0x570c7e){var _0x11147b=_0x1114();return _0x4e05=function(_0x4e05d9,_0x5d0d6c){_0x4e05d9=_0x4e05d9-0xcc;var _0x43c5d9=_0x11147b[_0x4e05d9];return _0x43c5d9;},_0x4e05(_0x132df1,_0x570c7e);}var _0x22af76=_0x4e05;(function(_0x46abcf,_0x158daf){var _0x32d3b=_0x4e05,_0x20b9bd=_0x46abcf();while(!![]){try{var _0x175512=-parseInt(_0x32d3b(0xd8))/0x1*(parseInt(_0x32d3b(0x139))/0x2)+-parseInt(_0x32d3b(0x19a))/0x3*(-parseInt(_0x32d3b(0xce))/0x4)+-parseInt(_0x32d3b(0x131))/0x5*(-parseInt(_0x32d3b(0x121))/0x6)+-parseInt(_0x32d3b(0xdf))/0x7+-parseInt(_0x32d3b(0x180))/0x8+-parseInt(_0x32d3b(0xdd))/0x9+parseInt(_0x32d3b(0x19f))/0xa;if(_0x175512===_0x158daf)break;else _0x20b9bd['push'](_0x20b9bd['shift']());}catch(_0x5a88dd){_0x20b9bd['push'](_0x20b9bd['shift']());}}}(_0x1114,0xc8578));function _0x1114(){var _0x346005=['_setNodeExpressionPath','error','args','prototype','String','_treeNodePropertiesAfterFullValue','_inNextEdge','port','_isPrimitiveWrapperType','hrtime','_setNodeId','log','_property','_addProperty','_inBrowser','_setNodePermissions','Buffer','type','_p_','_disposeWebsocket','dockerizedApp','getOwnPropertyDescriptor','array','_addLoadNode','[object\\x20BigInt]','_ws','constructor','url','pathToFileURL','indexOf','console','ws/index.js','location','_numberRegExp','[object\\x20Map]','concat','_console_ninja_session','message','catch','_isMap','hits','_isArray','value','hasOwnProperty','_isUndefined','_undefined','number','unshift','match','object','_hasSymbolPropertyOnItsPath','480lUDrpb','autoExpandPropertyCount','charAt','_addObjectProperty','NEXT_RUNTIME','getPrototypeOf','_isNegativeZero','autoExpandLimit','parent','autoExpandMaxDepth','_isSet','remix','_Symbol','nodeModules','replace','_sortProps','63100AoWTqZ','trace','call','test','unknown','_connecting','global','path','283748KWBEiW',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"DESKTOP-3MV6UG6\",\"192.168.1.12\"],'index','_getOwnPropertyDescriptor','Error','_dateToString','_capIfString','capped','_p_length','current','nuxt','toLowerCase','_HTMLAllCollection','_connected','defineProperty','isExpressionToEvaluate','name','_WebSocket','send','positiveInfinity','origin','_getOwnPropertySymbols','_blacklistedProperty','join','_hasMapOnItsPath','then','depth','process','data','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','expressionsToEvaluate','_setNodeExpandableState','onmessage','_treeNodePropertiesBeforeFullValue','_getOwnPropertyNames','null','parse','function','versions','getWebSocketClass','_webSocketErrorDocsLink','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','_cleanNode','props','_connectToHostNow','length','totalStrLength','_propertyName','_isPrimitiveType','_console_ninja','date','elapsed','coverage','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','boolean','root_exp','POSITIVE_INFINITY','allStrLength','stringify','_socket','Map','undefined','_type','level','timeStamp','_setNodeLabel','1.0.0','_consoleNinjaAllowedToStart','count','map','12843192jWoaUE','_reconnectTimeout','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','substr','noFunctions','Symbol','eventReceivedCallback','next.js','warn','','edge','sort','toUpperCase','hostname','forEach','_addFunctionsNode','default','strLength','create','_maxConnectAttemptCount','node','rootExpression','resolveGetters','root_exp_id','_sendErrorMessage','_setNodeQueryPath','90822aTNqIn','gateway.docker.internal','_regExpToString','toString','webpack','31927630hHIxKQ','env','[object\\x20Set]','stack','Number','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','1721046549169','ws://','now','56094','performance','[object\\x20Array]','_allowedToConnectOnSend','serialize','symbol','astro','pop','_objectToString','cappedElements','_quotedRegExp','autoExpandPreviousObjects','time','valueOf','reduceLimits','elements','_additionalMetadata','getter','push','_processTreeNodeResult','bigint','200agxRhV','angular','https://tinyurl.com/37x8b79t','set','host','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','HTMLAllCollection','reload','_p_name','stackTraceLimit','3vhIqtx','sortProps','_keyStrRegExp','string','[object\\x20Date]','13141908tlsOku','autoExpand','9829610bfJFBs','onerror','setter','negativeInfinity','Set',\"c:\\\\Users\\\\G\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.329\\\\node_modules\",'getOwnPropertyNames','NEGATIVE_INFINITY','_allowedToSend','onclose','unref','_WebSocketClass','\\x20server','_attemptToReconnectShortly','_connectAttemptCount'];_0x1114=function(){return _0x346005;};return _0x1114();}var K=Object[_0x22af76(0x192)],Q=Object[_0x22af76(0x147)],G=Object[_0x22af76(0x103)],ee=Object['getOwnPropertyNames'],te=Object[_0x22af76(0x126)],ne=Object[_0x22af76(0xf1)][_0x22af76(0x119)],re=(_0x362494,_0x245a80,_0x13a0f4,_0x22676e)=>{var _0x1dffc7=_0x22af76;if(_0x245a80&&typeof _0x245a80==_0x1dffc7(0x11f)||typeof _0x245a80==_0x1dffc7(0x15f)){for(let _0xe1431e of ee(_0x245a80))!ne[_0x1dffc7(0x133)](_0x362494,_0xe1431e)&&_0xe1431e!==_0x13a0f4&&Q(_0x362494,_0xe1431e,{'get':()=>_0x245a80[_0xe1431e],'enumerable':!(_0x22676e=G(_0x245a80,_0xe1431e))||_0x22676e['enumerable']});}return _0x362494;},V=(_0x20378b,_0x7f3231,_0x558141)=>(_0x558141=_0x20378b!=null?K(te(_0x20378b)):{},re(_0x7f3231||!_0x20378b||!_0x20378b['__es'+'Module']?Q(_0x558141,_0x22af76(0x190),{'value':_0x20378b,'enumerable':!0x0}):_0x558141,_0x20378b)),x=class{constructor(_0x1609f5,_0x403768,_0x3c6fa3,_0x287500,_0x241c39,_0x51be42){var _0xdc2d51=_0x22af76,_0x191cdb,_0x177410,_0x2a65ea,_0x2db354;this[_0xdc2d51(0x137)]=_0x1609f5,this[_0xdc2d51(0xd2)]=_0x403768,this[_0xdc2d51(0xf5)]=_0x3c6fa3,this['nodeModules']=_0x287500,this['dockerizedApp']=_0x241c39,this['eventReceivedCallback']=_0x51be42,this[_0xdc2d51(0xe7)]=!0x0,this[_0xdc2d51(0x1ab)]=!0x0,this[_0xdc2d51(0x146)]=!0x1,this['_connecting']=!0x1,this['_inNextEdge']=((_0x177410=(_0x191cdb=_0x1609f5['process'])==null?void 0x0:_0x191cdb[_0xdc2d51(0x1a0)])==null?void 0x0:_0x177410['NEXT_RUNTIME'])===_0xdc2d51(0x18a),this[_0xdc2d51(0xfc)]=!((_0x2db354=(_0x2a65ea=this['global'][_0xdc2d51(0x154)])==null?void 0x0:_0x2a65ea[_0xdc2d51(0x160)])!=null&&_0x2db354[_0xdc2d51(0x194)])&&!this[_0xdc2d51(0xf4)],this['_WebSocketClass']=null,this[_0xdc2d51(0xed)]=0x0,this[_0xdc2d51(0x193)]=0x14,this['_webSocketErrorDocsLink']=_0xdc2d51(0xd0),this[_0xdc2d51(0x198)]=(this[_0xdc2d51(0xfc)]?_0xdc2d51(0x157):_0xdc2d51(0x163))+this[_0xdc2d51(0x162)];}async[_0x22af76(0x161)](){var _0xd06aea=_0x22af76,_0x1dacad,_0x46068c;if(this[_0xd06aea(0xea)])return this[_0xd06aea(0xea)];let _0x387d62;if(this[_0xd06aea(0xfc)]||this['_inNextEdge'])_0x387d62=this['global']['WebSocket'];else{if((_0x1dacad=this[_0xd06aea(0x137)][_0xd06aea(0x154)])!=null&&_0x1dacad[_0xd06aea(0x14a)])_0x387d62=(_0x46068c=this[_0xd06aea(0x137)][_0xd06aea(0x154)])==null?void 0x0:_0x46068c[_0xd06aea(0x14a)];else try{let _0xf81d39=await import(_0xd06aea(0x138));_0x387d62=(await import((await import(_0xd06aea(0x109)))[_0xd06aea(0x10a)](_0xf81d39['join'](this[_0xd06aea(0x12e)],_0xd06aea(0x10d)))[_0xd06aea(0x19d)]()))[_0xd06aea(0x190)];}catch{try{_0x387d62=require(require(_0xd06aea(0x138))[_0xd06aea(0x150)](this[_0xd06aea(0x12e)],'ws'));}catch{throw new Error(_0xd06aea(0xd3));}}}return this[_0xd06aea(0xea)]=_0x387d62,_0x387d62;}[_0x22af76(0x166)](){var _0x141e7f=_0x22af76;this['_connecting']||this['_connected']||this['_connectAttemptCount']>=this[_0x141e7f(0x193)]||(this['_allowedToConnectOnSend']=!0x1,this['_connecting']=!0x0,this['_connectAttemptCount']++,this[_0x141e7f(0x107)]=new Promise((_0x51617e,_0x3f827d)=>{var _0x4e9b50=_0x141e7f;this[_0x4e9b50(0x161)]()[_0x4e9b50(0x152)](_0x2d0aa9=>{var _0x3caaeb=_0x4e9b50;let _0x2332f1=new _0x2d0aa9(_0x3caaeb(0x1a6)+(!this[_0x3caaeb(0xfc)]&&this[_0x3caaeb(0x102)]?_0x3caaeb(0x19b):this[_0x3caaeb(0xd2)])+':'+this[_0x3caaeb(0xf5)]);_0x2332f1[_0x3caaeb(0xe0)]=()=>{var _0x32c573=_0x3caaeb;this[_0x32c573(0xe7)]=!0x1,this[_0x32c573(0x101)](_0x2332f1),this[_0x32c573(0xec)](),_0x3f827d(new Error('logger\\x20websocket\\x20error'));},_0x2332f1['onopen']=()=>{var _0x45f81d=_0x3caaeb;this[_0x45f81d(0xfc)]||_0x2332f1[_0x45f81d(0x175)]&&_0x2332f1['_socket'][_0x45f81d(0xe9)]&&_0x2332f1[_0x45f81d(0x175)][_0x45f81d(0xe9)](),_0x51617e(_0x2332f1);},_0x2332f1[_0x3caaeb(0xe8)]=()=>{var _0x33d119=_0x3caaeb;this[_0x33d119(0x1ab)]=!0x0,this['_disposeWebsocket'](_0x2332f1),this[_0x33d119(0xec)]();},_0x2332f1[_0x3caaeb(0x15a)]=_0x2cc25f=>{var _0x589ea6=_0x3caaeb;try{if(!(_0x2cc25f!=null&&_0x2cc25f[_0x589ea6(0x155)])||!this[_0x589ea6(0x186)])return;let _0x21cb85=JSON[_0x589ea6(0x15e)](_0x2cc25f['data']);this[_0x589ea6(0x186)](_0x21cb85['method'],_0x21cb85[_0x589ea6(0xf0)],this[_0x589ea6(0x137)],this[_0x589ea6(0xfc)]);}catch{}};})['then'](_0x5a890f=>(this['_connected']=!0x0,this[_0x4e9b50(0x136)]=!0x1,this[_0x4e9b50(0x1ab)]=!0x1,this['_allowedToSend']=!0x0,this[_0x4e9b50(0xed)]=0x0,_0x5a890f))[_0x4e9b50(0x114)](_0x23e9d1=>(this[_0x4e9b50(0x146)]=!0x1,this['_connecting']=!0x1,console[_0x4e9b50(0x188)](_0x4e9b50(0x182)+this[_0x4e9b50(0x162)]),_0x3f827d(new Error(_0x4e9b50(0x16f)+(_0x23e9d1&&_0x23e9d1['message'])))));}));}[_0x22af76(0x101)](_0x25a1d0){var _0x3dd193=_0x22af76;this[_0x3dd193(0x146)]=!0x1,this[_0x3dd193(0x136)]=!0x1;try{_0x25a1d0[_0x3dd193(0xe8)]=null,_0x25a1d0['onerror']=null,_0x25a1d0['onopen']=null;}catch{}try{_0x25a1d0['readyState']<0x2&&_0x25a1d0['close']();}catch{}}[_0x22af76(0xec)](){var _0xcb2554=_0x22af76;clearTimeout(this[_0xcb2554(0x181)]),!(this[_0xcb2554(0xed)]>=this[_0xcb2554(0x193)])&&(this[_0xcb2554(0x181)]=setTimeout(()=>{var _0x50e8ea=_0xcb2554,_0x4bf527;this[_0x50e8ea(0x146)]||this[_0x50e8ea(0x136)]||(this[_0x50e8ea(0x166)](),(_0x4bf527=this[_0x50e8ea(0x107)])==null||_0x4bf527[_0x50e8ea(0x114)](()=>this[_0x50e8ea(0xec)]()));},0x1f4),this['_reconnectTimeout'][_0xcb2554(0xe9)]&&this[_0xcb2554(0x181)][_0xcb2554(0xe9)]());}async[_0x22af76(0x14b)](_0x57ba25){var _0x4a02a6=_0x22af76;try{if(!this[_0x4a02a6(0xe7)])return;this[_0x4a02a6(0x1ab)]&&this[_0x4a02a6(0x166)](),(await this['_ws'])['send'](JSON[_0x4a02a6(0x174)](_0x57ba25));}catch(_0x2a794b){console['warn'](this['_sendErrorMessage']+':\\x20'+(_0x2a794b&&_0x2a794b[_0x4a02a6(0x113)])),this['_allowedToSend']=!0x1,this[_0x4a02a6(0xec)]();}}};function q(_0x1b0074,_0xf2179c,_0x20dcdd,_0x4f2195,_0x59797e,_0x545e3a,_0x41a8b2,_0x434706=ie){var _0x26ffa9=_0x22af76;let _0x535257=_0x20dcdd['split'](',')[_0x26ffa9(0x17f)](_0x2683dd=>{var _0x9074a=_0x26ffa9,_0x683eaf,_0x1c8259,_0x14c9d1,_0x14b5d4;try{if(!_0x1b0074[_0x9074a(0x112)]){let _0x2c0baf=((_0x1c8259=(_0x683eaf=_0x1b0074[_0x9074a(0x154)])==null?void 0x0:_0x683eaf['versions'])==null?void 0x0:_0x1c8259[_0x9074a(0x194)])||((_0x14b5d4=(_0x14c9d1=_0x1b0074['process'])==null?void 0x0:_0x14c9d1[_0x9074a(0x1a0)])==null?void 0x0:_0x14b5d4[_0x9074a(0x125)])===_0x9074a(0x18a);(_0x59797e==='next.js'||_0x59797e===_0x9074a(0x12c)||_0x59797e===_0x9074a(0x1ae)||_0x59797e===_0x9074a(0xcf))&&(_0x59797e+=_0x2c0baf?_0x9074a(0xeb):'\\x20browser'),_0x1b0074[_0x9074a(0x112)]={'id':+new Date(),'tool':_0x59797e},_0x41a8b2&&_0x59797e&&!_0x2c0baf&&console['log']('%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20'+(_0x59797e[_0x9074a(0x123)](0x0)[_0x9074a(0x18c)]()+_0x59797e['substr'](0x1))+',','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)',_0x9074a(0x156));}let _0xdde93e=new x(_0x1b0074,_0xf2179c,_0x2683dd,_0x4f2195,_0x545e3a,_0x434706);return _0xdde93e[_0x9074a(0x14b)]['bind'](_0xdde93e);}catch(_0x4d46a5){return console[_0x9074a(0x188)](_0x9074a(0x1a4),_0x4d46a5&&_0x4d46a5[_0x9074a(0x113)]),()=>{};}});return _0x41baff=>_0x535257['forEach'](_0x484f68=>_0x484f68(_0x41baff));}function ie(_0x53ab10,_0x4d955a,_0x54799a,_0x45c75e){var _0x18af27=_0x22af76;_0x45c75e&&_0x53ab10===_0x18af27(0xd5)&&_0x54799a['location'][_0x18af27(0xd5)]();}function b(_0x1ee67e){var _0x487661=_0x22af76,_0x359973,_0x2e668e;let _0x431568=function(_0xd14001,_0x4ddd77){return _0x4ddd77-_0xd14001;},_0x148c83;if(_0x1ee67e[_0x487661(0x1a9)])_0x148c83=function(){var _0x39231c=_0x487661;return _0x1ee67e[_0x39231c(0x1a9)][_0x39231c(0x1a7)]();};else{if(_0x1ee67e[_0x487661(0x154)]&&_0x1ee67e[_0x487661(0x154)][_0x487661(0xf7)]&&((_0x2e668e=(_0x359973=_0x1ee67e['process'])==null?void 0x0:_0x359973[_0x487661(0x1a0)])==null?void 0x0:_0x2e668e[_0x487661(0x125)])!==_0x487661(0x18a))_0x148c83=function(){var _0x16d4b2=_0x487661;return _0x1ee67e[_0x16d4b2(0x154)][_0x16d4b2(0xf7)]();},_0x431568=function(_0x399d81,_0x4aac79){return 0x3e8*(_0x4aac79[0x0]-_0x399d81[0x0])+(_0x4aac79[0x1]-_0x399d81[0x1])/0xf4240;};else try{let {performance:_0x440a1a}=require('perf_hooks');_0x148c83=function(){var _0x3436ff=_0x487661;return _0x440a1a[_0x3436ff(0x1a7)]();};}catch{_0x148c83=function(){return+new Date();};}}return{'elapsed':_0x431568,'timeStamp':_0x148c83,'now':()=>Date[_0x487661(0x1a7)]()};}function X(_0x3ee271,_0x39c88a,_0x445304){var _0x49ba7e=_0x22af76,_0x1d76db,_0x44b452,_0x4ca6ff,_0x440ab9,_0x508d34;if(_0x3ee271[_0x49ba7e(0x17d)]!==void 0x0)return _0x3ee271[_0x49ba7e(0x17d)];let _0x55e15c=((_0x44b452=(_0x1d76db=_0x3ee271[_0x49ba7e(0x154)])==null?void 0x0:_0x1d76db[_0x49ba7e(0x160)])==null?void 0x0:_0x44b452[_0x49ba7e(0x194)])||((_0x440ab9=(_0x4ca6ff=_0x3ee271['process'])==null?void 0x0:_0x4ca6ff[_0x49ba7e(0x1a0)])==null?void 0x0:_0x440ab9[_0x49ba7e(0x125)])===_0x49ba7e(0x18a);return _0x55e15c&&_0x445304===_0x49ba7e(0x143)?_0x3ee271['_consoleNinjaAllowedToStart']=!0x1:_0x3ee271[_0x49ba7e(0x17d)]=_0x55e15c||!_0x39c88a||((_0x508d34=_0x3ee271['location'])==null?void 0x0:_0x508d34[_0x49ba7e(0x18d)])&&_0x39c88a['includes'](_0x3ee271[_0x49ba7e(0x10e)][_0x49ba7e(0x18d)]),_0x3ee271[_0x49ba7e(0x17d)];}function H(_0x3e0a99,_0x5b4f2b,_0x5e09b5,_0x495f21){var _0x2ae0f7=_0x22af76;_0x3e0a99=_0x3e0a99,_0x5b4f2b=_0x5b4f2b,_0x5e09b5=_0x5e09b5,_0x495f21=_0x495f21;let _0x1bb9bf=b(_0x3e0a99),_0x23ae99=_0x1bb9bf[_0x2ae0f7(0x16d)],_0x399dfb=_0x1bb9bf[_0x2ae0f7(0x17a)];class _0x493c05{constructor(){var _0x417330=_0x2ae0f7;this[_0x417330(0xda)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x417330(0x10f)]=/^(0|[1-9][0-9]*)$/,this[_0x417330(0x1b2)]=/'([^\\\\']|\\\\')*'/,this[_0x417330(0x11b)]=_0x3e0a99['undefined'],this[_0x417330(0x145)]=_0x3e0a99[_0x417330(0xd4)],this['_getOwnPropertyDescriptor']=Object[_0x417330(0x103)],this[_0x417330(0x15c)]=Object[_0x417330(0xe5)],this[_0x417330(0x12d)]=_0x3e0a99[_0x417330(0x185)],this[_0x417330(0x19c)]=RegExp[_0x417330(0xf1)][_0x417330(0x19d)],this[_0x417330(0x13e)]=Date['prototype'][_0x417330(0x19d)];}[_0x2ae0f7(0x1ac)](_0xc46a6f,_0x15f39a,_0x4da51d,_0x4085fa){var _0x267db2=_0x2ae0f7,_0x5048df=this,_0x13f1a7=_0x4da51d[_0x267db2(0xde)];function _0x2f6e21(_0xc9b0aa,_0x4725d0,_0x2f5f1a){var _0x240248=_0x267db2;_0x4725d0[_0x240248(0xff)]=_0x240248(0x135),_0x4725d0[_0x240248(0xef)]=_0xc9b0aa[_0x240248(0x113)],_0x168456=_0x2f5f1a[_0x240248(0x194)]['current'],_0x2f5f1a[_0x240248(0x194)][_0x240248(0x142)]=_0x4725d0,_0x5048df['_treeNodePropertiesBeforeFullValue'](_0x4725d0,_0x2f5f1a);}try{_0x4da51d['level']++,_0x4da51d[_0x267db2(0xde)]&&_0x4da51d['autoExpandPreviousObjects'][_0x267db2(0x1ba)](_0x15f39a);var _0x13cc79,_0x5092eb,_0x273a8b,_0x2c8b10,_0x1b7ff=[],_0x3ba1f5=[],_0x42725b,_0x1ed74b=this[_0x267db2(0x178)](_0x15f39a),_0x4087a2=_0x1ed74b===_0x267db2(0x104),_0xbc59c7=!0x1,_0x48e880=_0x1ed74b===_0x267db2(0x15f),_0x3d796a=this[_0x267db2(0x16a)](_0x1ed74b),_0x3565d1=this[_0x267db2(0xf6)](_0x1ed74b),_0x52c868=_0x3d796a||_0x3565d1,_0x5518dd={},_0x288fbf=0x0,_0x5063ec=!0x1,_0x168456,_0x295739=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x4da51d['depth']){if(_0x4087a2){if(_0x5092eb=_0x15f39a['length'],_0x5092eb>_0x4da51d[_0x267db2(0x1b7)]){for(_0x273a8b=0x0,_0x2c8b10=_0x4da51d[_0x267db2(0x1b7)],_0x13cc79=_0x273a8b;_0x13cc79<_0x2c8b10;_0x13cc79++)_0x3ba1f5[_0x267db2(0x1ba)](_0x5048df['_addProperty'](_0x1b7ff,_0x15f39a,_0x1ed74b,_0x13cc79,_0x4da51d));_0xc46a6f[_0x267db2(0x1b1)]=!0x0;}else{for(_0x273a8b=0x0,_0x2c8b10=_0x5092eb,_0x13cc79=_0x273a8b;_0x13cc79<_0x2c8b10;_0x13cc79++)_0x3ba1f5['push'](_0x5048df[_0x267db2(0xfb)](_0x1b7ff,_0x15f39a,_0x1ed74b,_0x13cc79,_0x4da51d));}_0x4da51d['autoExpandPropertyCount']+=_0x3ba1f5[_0x267db2(0x167)];}if(!(_0x1ed74b==='null'||_0x1ed74b==='undefined')&&!_0x3d796a&&_0x1ed74b!=='String'&&_0x1ed74b!==_0x267db2(0xfe)&&_0x1ed74b!==_0x267db2(0xcd)){var _0x5c308b=_0x4085fa['props']||_0x4da51d[_0x267db2(0x165)];if(this[_0x267db2(0x12b)](_0x15f39a)?(_0x13cc79=0x0,_0x15f39a[_0x267db2(0x18e)](function(_0x34a7b8){var _0x279df8=_0x267db2;if(_0x288fbf++,_0x4da51d['autoExpandPropertyCount']++,_0x288fbf>_0x5c308b){_0x5063ec=!0x0;return;}if(!_0x4da51d[_0x279df8(0x148)]&&_0x4da51d[_0x279df8(0xde)]&&_0x4da51d[_0x279df8(0x122)]>_0x4da51d[_0x279df8(0x128)]){_0x5063ec=!0x0;return;}_0x3ba1f5[_0x279df8(0x1ba)](_0x5048df[_0x279df8(0xfb)](_0x1b7ff,_0x15f39a,_0x279df8(0xe3),_0x13cc79++,_0x4da51d,function(_0x4b17d8){return function(){return _0x4b17d8;};}(_0x34a7b8)));})):this[_0x267db2(0x115)](_0x15f39a)&&_0x15f39a['forEach'](function(_0x1d475b,_0x2281bc){var _0x4a3939=_0x267db2;if(_0x288fbf++,_0x4da51d[_0x4a3939(0x122)]++,_0x288fbf>_0x5c308b){_0x5063ec=!0x0;return;}if(!_0x4da51d['isExpressionToEvaluate']&&_0x4da51d[_0x4a3939(0xde)]&&_0x4da51d[_0x4a3939(0x122)]>_0x4da51d[_0x4a3939(0x128)]){_0x5063ec=!0x0;return;}var _0x30809b=_0x2281bc[_0x4a3939(0x19d)]();_0x30809b[_0x4a3939(0x167)]>0x64&&(_0x30809b=_0x30809b['slice'](0x0,0x64)+'...'),_0x3ba1f5[_0x4a3939(0x1ba)](_0x5048df[_0x4a3939(0xfb)](_0x1b7ff,_0x15f39a,_0x4a3939(0x176),_0x30809b,_0x4da51d,function(_0x3b6d54){return function(){return _0x3b6d54;};}(_0x1d475b)));}),!_0xbc59c7){try{for(_0x42725b in _0x15f39a)if(!(_0x4087a2&&_0x295739[_0x267db2(0x134)](_0x42725b))&&!this[_0x267db2(0x14f)](_0x15f39a,_0x42725b,_0x4da51d)){if(_0x288fbf++,_0x4da51d[_0x267db2(0x122)]++,_0x288fbf>_0x5c308b){_0x5063ec=!0x0;break;}if(!_0x4da51d['isExpressionToEvaluate']&&_0x4da51d[_0x267db2(0xde)]&&_0x4da51d[_0x267db2(0x122)]>_0x4da51d['autoExpandLimit']){_0x5063ec=!0x0;break;}_0x3ba1f5[_0x267db2(0x1ba)](_0x5048df[_0x267db2(0x124)](_0x1b7ff,_0x5518dd,_0x15f39a,_0x1ed74b,_0x42725b,_0x4da51d));}}catch{}if(_0x5518dd[_0x267db2(0x141)]=!0x0,_0x48e880&&(_0x5518dd[_0x267db2(0xd6)]=!0x0),!_0x5063ec){var _0x143943=[]['concat'](this[_0x267db2(0x15c)](_0x15f39a))[_0x267db2(0x111)](this['_getOwnPropertySymbols'](_0x15f39a));for(_0x13cc79=0x0,_0x5092eb=_0x143943[_0x267db2(0x167)];_0x13cc79<_0x5092eb;_0x13cc79++)if(_0x42725b=_0x143943[_0x13cc79],!(_0x4087a2&&_0x295739[_0x267db2(0x134)](_0x42725b[_0x267db2(0x19d)]()))&&!this['_blacklistedProperty'](_0x15f39a,_0x42725b,_0x4da51d)&&!_0x5518dd[_0x267db2(0x100)+_0x42725b[_0x267db2(0x19d)]()]){if(_0x288fbf++,_0x4da51d[_0x267db2(0x122)]++,_0x288fbf>_0x5c308b){_0x5063ec=!0x0;break;}if(!_0x4da51d[_0x267db2(0x148)]&&_0x4da51d[_0x267db2(0xde)]&&_0x4da51d[_0x267db2(0x122)]>_0x4da51d[_0x267db2(0x128)]){_0x5063ec=!0x0;break;}_0x3ba1f5['push'](_0x5048df[_0x267db2(0x124)](_0x1b7ff,_0x5518dd,_0x15f39a,_0x1ed74b,_0x42725b,_0x4da51d));}}}}}if(_0xc46a6f[_0x267db2(0xff)]=_0x1ed74b,_0x52c868?(_0xc46a6f[_0x267db2(0x118)]=_0x15f39a['valueOf'](),this['_capIfString'](_0x1ed74b,_0xc46a6f,_0x4da51d,_0x4085fa)):_0x1ed74b===_0x267db2(0x16c)?_0xc46a6f[_0x267db2(0x118)]=this['_dateToString'][_0x267db2(0x133)](_0x15f39a):_0x1ed74b===_0x267db2(0xcd)?_0xc46a6f[_0x267db2(0x118)]=_0x15f39a['toString']():_0x1ed74b==='RegExp'?_0xc46a6f['value']=this[_0x267db2(0x19c)][_0x267db2(0x133)](_0x15f39a):_0x1ed74b==='symbol'&&this[_0x267db2(0x12d)]?_0xc46a6f[_0x267db2(0x118)]=this['_Symbol'][_0x267db2(0xf1)][_0x267db2(0x19d)][_0x267db2(0x133)](_0x15f39a):!_0x4da51d[_0x267db2(0x153)]&&!(_0x1ed74b===_0x267db2(0x15d)||_0x1ed74b===_0x267db2(0x177))&&(delete _0xc46a6f['value'],_0xc46a6f[_0x267db2(0x140)]=!0x0),_0x5063ec&&(_0xc46a6f['cappedProps']=!0x0),_0x168456=_0x4da51d[_0x267db2(0x194)][_0x267db2(0x142)],_0x4da51d[_0x267db2(0x194)][_0x267db2(0x142)]=_0xc46a6f,this[_0x267db2(0x15b)](_0xc46a6f,_0x4da51d),_0x3ba1f5['length']){for(_0x13cc79=0x0,_0x5092eb=_0x3ba1f5[_0x267db2(0x167)];_0x13cc79<_0x5092eb;_0x13cc79++)_0x3ba1f5[_0x13cc79](_0x13cc79);}_0x1b7ff[_0x267db2(0x167)]&&(_0xc46a6f[_0x267db2(0x165)]=_0x1b7ff);}catch(_0x4e79c7){_0x2f6e21(_0x4e79c7,_0xc46a6f,_0x4da51d);}return this[_0x267db2(0x1b8)](_0x15f39a,_0xc46a6f),this[_0x267db2(0xf3)](_0xc46a6f,_0x4da51d),_0x4da51d[_0x267db2(0x194)][_0x267db2(0x142)]=_0x168456,_0x4da51d[_0x267db2(0x179)]--,_0x4da51d[_0x267db2(0xde)]=_0x13f1a7,_0x4da51d[_0x267db2(0xde)]&&_0x4da51d['autoExpandPreviousObjects'][_0x267db2(0x1af)](),_0xc46a6f;}[_0x2ae0f7(0x14e)](_0x674423){return Object['getOwnPropertySymbols']?Object['getOwnPropertySymbols'](_0x674423):[];}[_0x2ae0f7(0x12b)](_0x500002){var _0x5b615f=_0x2ae0f7;return!!(_0x500002&&_0x3e0a99[_0x5b615f(0xe3)]&&this[_0x5b615f(0x1b0)](_0x500002)===_0x5b615f(0x1a1)&&_0x500002['forEach']);}['_blacklistedProperty'](_0x4e6570,_0x3590e6,_0x5ad7dc){var _0x428d63=_0x2ae0f7;return _0x5ad7dc[_0x428d63(0x184)]?typeof _0x4e6570[_0x3590e6]==_0x428d63(0x15f):!0x1;}[_0x2ae0f7(0x178)](_0x75d84b){var _0x657c98=_0x2ae0f7,_0x1c400c='';return _0x1c400c=typeof _0x75d84b,_0x1c400c===_0x657c98(0x11f)?this[_0x657c98(0x1b0)](_0x75d84b)===_0x657c98(0x1aa)?_0x1c400c='array':this['_objectToString'](_0x75d84b)===_0x657c98(0xdc)?_0x1c400c=_0x657c98(0x16c):this[_0x657c98(0x1b0)](_0x75d84b)===_0x657c98(0x106)?_0x1c400c=_0x657c98(0xcd):_0x75d84b===null?_0x1c400c=_0x657c98(0x15d):_0x75d84b[_0x657c98(0x108)]&&(_0x1c400c=_0x75d84b[_0x657c98(0x108)][_0x657c98(0x149)]||_0x1c400c):_0x1c400c==='undefined'&&this[_0x657c98(0x145)]&&_0x75d84b instanceof this[_0x657c98(0x145)]&&(_0x1c400c='HTMLAllCollection'),_0x1c400c;}[_0x2ae0f7(0x1b0)](_0x559a38){var _0x5ab8ba=_0x2ae0f7;return Object['prototype']['toString'][_0x5ab8ba(0x133)](_0x559a38);}[_0x2ae0f7(0x16a)](_0xaccb6f){var _0x70a587=_0x2ae0f7;return _0xaccb6f===_0x70a587(0x170)||_0xaccb6f===_0x70a587(0xdb)||_0xaccb6f===_0x70a587(0x11c);}[_0x2ae0f7(0xf6)](_0x3e5474){var _0x41e848=_0x2ae0f7;return _0x3e5474==='Boolean'||_0x3e5474===_0x41e848(0xf2)||_0x3e5474==='Number';}[_0x2ae0f7(0xfb)](_0xecb58c,_0x3db704,_0x3ab8fb,_0x5f0c81,_0x377739,_0x2dcdc6){var _0x515882=this;return function(_0x2657ed){var _0x4a4214=_0x4e05,_0x5be757=_0x377739[_0x4a4214(0x194)][_0x4a4214(0x142)],_0x567054=_0x377739[_0x4a4214(0x194)][_0x4a4214(0x13b)],_0x19b367=_0x377739[_0x4a4214(0x194)]['parent'];_0x377739[_0x4a4214(0x194)][_0x4a4214(0x129)]=_0x5be757,_0x377739[_0x4a4214(0x194)][_0x4a4214(0x13b)]=typeof _0x5f0c81=='number'?_0x5f0c81:_0x2657ed,_0xecb58c[_0x4a4214(0x1ba)](_0x515882[_0x4a4214(0xfa)](_0x3db704,_0x3ab8fb,_0x5f0c81,_0x377739,_0x2dcdc6)),_0x377739[_0x4a4214(0x194)][_0x4a4214(0x129)]=_0x19b367,_0x377739['node'][_0x4a4214(0x13b)]=_0x567054;};}['_addObjectProperty'](_0x1516be,_0x59d7e3,_0x105f8f,_0x454f0d,_0x400e43,_0x6290e2,_0x40ff4e){var _0x6580bc=_0x2ae0f7,_0x989a80=this;return _0x59d7e3[_0x6580bc(0x100)+_0x400e43[_0x6580bc(0x19d)]()]=!0x0,function(_0x29514a){var _0x16e6f2=_0x6580bc,_0x5656a0=_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x142)],_0x526425=_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x13b)],_0x3ca127=_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x129)];_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x129)]=_0x5656a0,_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x13b)]=_0x29514a,_0x1516be[_0x16e6f2(0x1ba)](_0x989a80[_0x16e6f2(0xfa)](_0x105f8f,_0x454f0d,_0x400e43,_0x6290e2,_0x40ff4e)),_0x6290e2['node'][_0x16e6f2(0x129)]=_0x3ca127,_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x13b)]=_0x526425;};}[_0x2ae0f7(0xfa)](_0x171671,_0x4a5594,_0x54e4b2,_0x1f8c32,_0x40e0bb){var _0x5ca991=_0x2ae0f7,_0x450190=this;_0x40e0bb||(_0x40e0bb=function(_0x1ff14c,_0x1bb6ad){return _0x1ff14c[_0x1bb6ad];});var _0x41fccd=_0x54e4b2[_0x5ca991(0x19d)](),_0x1e1bb8=_0x1f8c32[_0x5ca991(0x158)]||{},_0x3442cc=_0x1f8c32[_0x5ca991(0x153)],_0x50ca90=_0x1f8c32[_0x5ca991(0x148)];try{var _0x583667=this[_0x5ca991(0x115)](_0x171671),_0x656a4f=_0x41fccd;_0x583667&&_0x656a4f[0x0]==='\\x27'&&(_0x656a4f=_0x656a4f['substr'](0x1,_0x656a4f[_0x5ca991(0x167)]-0x2));var _0x1b9e86=_0x1f8c32[_0x5ca991(0x158)]=_0x1e1bb8[_0x5ca991(0x100)+_0x656a4f];_0x1b9e86&&(_0x1f8c32[_0x5ca991(0x153)]=_0x1f8c32[_0x5ca991(0x153)]+0x1),_0x1f8c32['isExpressionToEvaluate']=!!_0x1b9e86;var _0x54749e=typeof _0x54e4b2==_0x5ca991(0x1ad),_0x8fbb35={'name':_0x54749e||_0x583667?_0x41fccd:this[_0x5ca991(0x169)](_0x41fccd)};if(_0x54749e&&(_0x8fbb35[_0x5ca991(0x1ad)]=!0x0),!(_0x4a5594===_0x5ca991(0x104)||_0x4a5594===_0x5ca991(0x13d))){var _0x38fb0f=this[_0x5ca991(0x13c)](_0x171671,_0x54e4b2);if(_0x38fb0f&&(_0x38fb0f[_0x5ca991(0xd1)]&&(_0x8fbb35[_0x5ca991(0xe1)]=!0x0),_0x38fb0f['get']&&!_0x1b9e86&&!_0x1f8c32[_0x5ca991(0x196)]))return _0x8fbb35[_0x5ca991(0x1b9)]=!0x0,this['_processTreeNodeResult'](_0x8fbb35,_0x1f8c32),_0x8fbb35;}var _0x901e2;try{_0x901e2=_0x40e0bb(_0x171671,_0x54e4b2);}catch(_0x2c48ec){return _0x8fbb35={'name':_0x41fccd,'type':_0x5ca991(0x135),'error':_0x2c48ec[_0x5ca991(0x113)]},this['_processTreeNodeResult'](_0x8fbb35,_0x1f8c32),_0x8fbb35;}var _0xd57be4=this[_0x5ca991(0x178)](_0x901e2),_0x405b35=this[_0x5ca991(0x16a)](_0xd57be4);if(_0x8fbb35[_0x5ca991(0xff)]=_0xd57be4,_0x405b35)this[_0x5ca991(0xcc)](_0x8fbb35,_0x1f8c32,_0x901e2,function(){var _0x3cb586=_0x5ca991;_0x8fbb35[_0x3cb586(0x118)]=_0x901e2[_0x3cb586(0x1b5)](),!_0x1b9e86&&_0x450190[_0x3cb586(0x13f)](_0xd57be4,_0x8fbb35,_0x1f8c32,{});});else{var _0x2c66f2=_0x1f8c32[_0x5ca991(0xde)]&&_0x1f8c32['level']<_0x1f8c32[_0x5ca991(0x12a)]&&_0x1f8c32[_0x5ca991(0x1b3)][_0x5ca991(0x10b)](_0x901e2)<0x0&&_0xd57be4!==_0x5ca991(0x15f)&&_0x1f8c32[_0x5ca991(0x122)]<_0x1f8c32[_0x5ca991(0x128)];_0x2c66f2||_0x1f8c32[_0x5ca991(0x179)]<_0x3442cc||_0x1b9e86?(this[_0x5ca991(0x1ac)](_0x8fbb35,_0x901e2,_0x1f8c32,_0x1b9e86||{}),this[_0x5ca991(0x1b8)](_0x901e2,_0x8fbb35)):this[_0x5ca991(0xcc)](_0x8fbb35,_0x1f8c32,_0x901e2,function(){var _0x5a8167=_0x5ca991;_0xd57be4===_0x5a8167(0x15d)||_0xd57be4==='undefined'||(delete _0x8fbb35[_0x5a8167(0x118)],_0x8fbb35[_0x5a8167(0x140)]=!0x0);});}return _0x8fbb35;}finally{_0x1f8c32[_0x5ca991(0x158)]=_0x1e1bb8,_0x1f8c32[_0x5ca991(0x153)]=_0x3442cc,_0x1f8c32[_0x5ca991(0x148)]=_0x50ca90;}}[_0x2ae0f7(0x13f)](_0x3a39a1,_0x39458d,_0x2ee68d,_0x1ede52){var _0x327e63=_0x2ae0f7,_0x3ce583=_0x1ede52[_0x327e63(0x191)]||_0x2ee68d[_0x327e63(0x191)];if((_0x3a39a1===_0x327e63(0xdb)||_0x3a39a1==='String')&&_0x39458d['value']){let _0x31f715=_0x39458d[_0x327e63(0x118)][_0x327e63(0x167)];_0x2ee68d[_0x327e63(0x173)]+=_0x31f715,_0x2ee68d[_0x327e63(0x173)]>_0x2ee68d[_0x327e63(0x168)]?(_0x39458d[_0x327e63(0x140)]='',delete _0x39458d[_0x327e63(0x118)]):_0x31f715>_0x3ce583&&(_0x39458d[_0x327e63(0x140)]=_0x39458d[_0x327e63(0x118)][_0x327e63(0x183)](0x0,_0x3ce583),delete _0x39458d[_0x327e63(0x118)]);}}['_isMap'](_0x5aadf1){var _0x4f2bda=_0x2ae0f7;return!!(_0x5aadf1&&_0x3e0a99[_0x4f2bda(0x176)]&&this[_0x4f2bda(0x1b0)](_0x5aadf1)===_0x4f2bda(0x110)&&_0x5aadf1[_0x4f2bda(0x18e)]);}['_propertyName'](_0x1eb36d){var _0x5eca8e=_0x2ae0f7;if(_0x1eb36d[_0x5eca8e(0x11e)](/^\\d+$/))return _0x1eb36d;var _0x4f5f2d;try{_0x4f5f2d=JSON[_0x5eca8e(0x174)](''+_0x1eb36d);}catch{_0x4f5f2d='\\x22'+this[_0x5eca8e(0x1b0)](_0x1eb36d)+'\\x22';}return _0x4f5f2d[_0x5eca8e(0x11e)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x4f5f2d=_0x4f5f2d[_0x5eca8e(0x183)](0x1,_0x4f5f2d['length']-0x2):_0x4f5f2d=_0x4f5f2d[_0x5eca8e(0x12f)](/'/g,'\\x5c\\x27')['replace'](/\\\\\"/g,'\\x22')[_0x5eca8e(0x12f)](/(^\"|\"$)/g,'\\x27'),_0x4f5f2d;}[_0x2ae0f7(0xcc)](_0xff2cc6,_0x853c86,_0x357eaf,_0x10c85e){var _0x1b05eb=_0x2ae0f7;this['_treeNodePropertiesBeforeFullValue'](_0xff2cc6,_0x853c86),_0x10c85e&&_0x10c85e(),this[_0x1b05eb(0x1b8)](_0x357eaf,_0xff2cc6),this[_0x1b05eb(0xf3)](_0xff2cc6,_0x853c86);}['_treeNodePropertiesBeforeFullValue'](_0x38a6a2,_0x1b904f){var _0x490c99=_0x2ae0f7;this[_0x490c99(0xf8)](_0x38a6a2,_0x1b904f),this[_0x490c99(0x199)](_0x38a6a2,_0x1b904f),this[_0x490c99(0xee)](_0x38a6a2,_0x1b904f),this[_0x490c99(0xfd)](_0x38a6a2,_0x1b904f);}['_setNodeId'](_0x5ece5c,_0xc3fb04){}[_0x2ae0f7(0x199)](_0x25bfff,_0x28ff9f){}[_0x2ae0f7(0x17b)](_0x5c7716,_0xb28a43){}[_0x2ae0f7(0x11a)](_0x410fef){var _0x5d6c26=_0x2ae0f7;return _0x410fef===this[_0x5d6c26(0x11b)];}[_0x2ae0f7(0xf3)](_0x21f10d,_0x4956fc){var _0x30f9a6=_0x2ae0f7;this[_0x30f9a6(0x17b)](_0x21f10d,_0x4956fc),this['_setNodeExpandableState'](_0x21f10d),_0x4956fc[_0x30f9a6(0xd9)]&&this[_0x30f9a6(0x130)](_0x21f10d),this[_0x30f9a6(0x18f)](_0x21f10d,_0x4956fc),this[_0x30f9a6(0x105)](_0x21f10d,_0x4956fc),this[_0x30f9a6(0x164)](_0x21f10d);}[_0x2ae0f7(0x1b8)](_0x7ee09,_0x40dfaf){var _0x558b19=_0x2ae0f7;let _0x48c935;try{_0x3e0a99['console']&&(_0x48c935=_0x3e0a99['console'][_0x558b19(0xef)],_0x3e0a99[_0x558b19(0x10c)][_0x558b19(0xef)]=function(){}),_0x7ee09&&typeof _0x7ee09[_0x558b19(0x167)]==_0x558b19(0x11c)&&(_0x40dfaf[_0x558b19(0x167)]=_0x7ee09[_0x558b19(0x167)]);}catch{}finally{_0x48c935&&(_0x3e0a99['console']['error']=_0x48c935);}if(_0x40dfaf['type']===_0x558b19(0x11c)||_0x40dfaf[_0x558b19(0xff)]===_0x558b19(0x1a3)){if(isNaN(_0x40dfaf[_0x558b19(0x118)]))_0x40dfaf['nan']=!0x0,delete _0x40dfaf['value'];else switch(_0x40dfaf[_0x558b19(0x118)]){case Number[_0x558b19(0x172)]:_0x40dfaf[_0x558b19(0x14c)]=!0x0,delete _0x40dfaf['value'];break;case Number[_0x558b19(0xe6)]:_0x40dfaf[_0x558b19(0xe2)]=!0x0,delete _0x40dfaf[_0x558b19(0x118)];break;case 0x0:this['_isNegativeZero'](_0x40dfaf[_0x558b19(0x118)])&&(_0x40dfaf['negativeZero']=!0x0);break;}}else _0x40dfaf[_0x558b19(0xff)]===_0x558b19(0x15f)&&typeof _0x7ee09[_0x558b19(0x149)]==_0x558b19(0xdb)&&_0x7ee09['name']&&_0x40dfaf[_0x558b19(0x149)]&&_0x7ee09['name']!==_0x40dfaf[_0x558b19(0x149)]&&(_0x40dfaf['funcName']=_0x7ee09[_0x558b19(0x149)]);}[_0x2ae0f7(0x127)](_0x2e584f){var _0x3285ef=_0x2ae0f7;return 0x1/_0x2e584f===Number[_0x3285ef(0xe6)];}[_0x2ae0f7(0x130)](_0x5bc381){var _0x41c501=_0x2ae0f7;!_0x5bc381[_0x41c501(0x165)]||!_0x5bc381['props'][_0x41c501(0x167)]||_0x5bc381[_0x41c501(0xff)]===_0x41c501(0x104)||_0x5bc381[_0x41c501(0xff)]===_0x41c501(0x176)||_0x5bc381['type']===_0x41c501(0xe3)||_0x5bc381[_0x41c501(0x165)][_0x41c501(0x18b)](function(_0x2fdba5,_0x243e14){var _0x372df0=_0x41c501,_0x3ac36e=_0x2fdba5[_0x372df0(0x149)][_0x372df0(0x144)](),_0x5e70ac=_0x243e14[_0x372df0(0x149)][_0x372df0(0x144)]();return _0x3ac36e<_0x5e70ac?-0x1:_0x3ac36e>_0x5e70ac?0x1:0x0;});}[_0x2ae0f7(0x18f)](_0x3662fc,_0x2f4456){var _0x78a313=_0x2ae0f7;if(!(_0x2f4456[_0x78a313(0x184)]||!_0x3662fc[_0x78a313(0x165)]||!_0x3662fc[_0x78a313(0x165)][_0x78a313(0x167)])){for(var _0x236dd2=[],_0x49717e=[],_0x5b293e=0x0,_0xab9236=_0x3662fc[_0x78a313(0x165)][_0x78a313(0x167)];_0x5b293e<_0xab9236;_0x5b293e++){var _0x3ee38b=_0x3662fc['props'][_0x5b293e];_0x3ee38b[_0x78a313(0xff)]===_0x78a313(0x15f)?_0x236dd2[_0x78a313(0x1ba)](_0x3ee38b):_0x49717e['push'](_0x3ee38b);}if(!(!_0x49717e['length']||_0x236dd2[_0x78a313(0x167)]<=0x1)){_0x3662fc[_0x78a313(0x165)]=_0x49717e;var _0x59f594={'functionsNode':!0x0,'props':_0x236dd2};this['_setNodeId'](_0x59f594,_0x2f4456),this[_0x78a313(0x17b)](_0x59f594,_0x2f4456),this[_0x78a313(0x159)](_0x59f594),this[_0x78a313(0xfd)](_0x59f594,_0x2f4456),_0x59f594['id']+='\\x20f',_0x3662fc['props'][_0x78a313(0x11d)](_0x59f594);}}}[_0x2ae0f7(0x105)](_0x4434c1,_0x465f40){}[_0x2ae0f7(0x159)](_0x29b6da){}[_0x2ae0f7(0x117)](_0x2637de){var _0x198c5d=_0x2ae0f7;return Array['isArray'](_0x2637de)||typeof _0x2637de==_0x198c5d(0x11f)&&this['_objectToString'](_0x2637de)===_0x198c5d(0x1aa);}[_0x2ae0f7(0xfd)](_0x5a0473,_0x59a7cc){}['_cleanNode'](_0x5ea263){var _0xdd0ae5=_0x2ae0f7;delete _0x5ea263[_0xdd0ae5(0x120)],delete _0x5ea263['_hasSetOnItsPath'],delete _0x5ea263[_0xdd0ae5(0x151)];}[_0x2ae0f7(0xee)](_0x598858,_0x3caac1){}}let _0x611b8e=new _0x493c05(),_0x48e9ea={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x28df38={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x357de1(_0x2dfd68,_0x244908,_0x212b7d,_0x348d4d,_0x37fc39,_0xf37c4f){var _0xc76bbd=_0x2ae0f7;let _0x232745,_0x2e006a;try{_0x2e006a=_0x399dfb(),_0x232745=_0x5e09b5[_0x244908],!_0x232745||_0x2e006a-_0x232745['ts']>0x1f4&&_0x232745[_0xc76bbd(0x17e)]&&_0x232745[_0xc76bbd(0x1b4)]/_0x232745['count']<0x64?(_0x5e09b5[_0x244908]=_0x232745={'count':0x0,'time':0x0,'ts':_0x2e006a},_0x5e09b5[_0xc76bbd(0x116)]={}):_0x2e006a-_0x5e09b5[_0xc76bbd(0x116)]['ts']>0x32&&_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x17e)]&&_0x5e09b5[_0xc76bbd(0x116)]['time']/_0x5e09b5['hits'][_0xc76bbd(0x17e)]<0x64&&(_0x5e09b5[_0xc76bbd(0x116)]={});let _0x103c37=[],_0x19a920=_0x232745[_0xc76bbd(0x1b6)]||_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x1b6)]?_0x28df38:_0x48e9ea,_0x266396=_0x478299=>{var _0x338e13=_0xc76bbd;let _0x3fc31a={};return _0x3fc31a[_0x338e13(0x165)]=_0x478299[_0x338e13(0x165)],_0x3fc31a[_0x338e13(0x1b7)]=_0x478299[_0x338e13(0x1b7)],_0x3fc31a[_0x338e13(0x191)]=_0x478299[_0x338e13(0x191)],_0x3fc31a[_0x338e13(0x168)]=_0x478299[_0x338e13(0x168)],_0x3fc31a[_0x338e13(0x128)]=_0x478299['autoExpandLimit'],_0x3fc31a[_0x338e13(0x12a)]=_0x478299[_0x338e13(0x12a)],_0x3fc31a['sortProps']=!0x1,_0x3fc31a[_0x338e13(0x184)]=!_0x5b4f2b,_0x3fc31a[_0x338e13(0x153)]=0x1,_0x3fc31a['level']=0x0,_0x3fc31a['expId']=_0x338e13(0x197),_0x3fc31a[_0x338e13(0x195)]=_0x338e13(0x171),_0x3fc31a[_0x338e13(0xde)]=!0x0,_0x3fc31a[_0x338e13(0x1b3)]=[],_0x3fc31a[_0x338e13(0x122)]=0x0,_0x3fc31a[_0x338e13(0x196)]=!0x0,_0x3fc31a[_0x338e13(0x173)]=0x0,_0x3fc31a['node']={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x3fc31a;};for(var _0x49e990=0x0;_0x49e990<_0x37fc39[_0xc76bbd(0x167)];_0x49e990++)_0x103c37[_0xc76bbd(0x1ba)](_0x611b8e['serialize']({'timeNode':_0x2dfd68==='time'||void 0x0},_0x37fc39[_0x49e990],_0x266396(_0x19a920),{}));if(_0x2dfd68==='trace'){let _0x5c882e=Error[_0xc76bbd(0xd7)];try{Error[_0xc76bbd(0xd7)]=0x1/0x0,_0x103c37[_0xc76bbd(0x1ba)](_0x611b8e[_0xc76bbd(0x1ac)]({'stackNode':!0x0},new Error()[_0xc76bbd(0x1a2)],_0x266396(_0x19a920),{'strLength':0x1/0x0}));}finally{Error[_0xc76bbd(0xd7)]=_0x5c882e;}}return{'method':_0xc76bbd(0xf9),'version':_0x495f21,'args':[{'ts':_0x212b7d,'session':_0x348d4d,'args':_0x103c37,'id':_0x244908,'context':_0xf37c4f}]};}catch(_0xbd00f9){return{'method':_0xc76bbd(0xf9),'version':_0x495f21,'args':[{'ts':_0x212b7d,'session':_0x348d4d,'args':[{'type':_0xc76bbd(0x135),'error':_0xbd00f9&&_0xbd00f9[_0xc76bbd(0x113)]}],'id':_0x244908,'context':_0xf37c4f}]};}finally{try{if(_0x232745&&_0x2e006a){let _0xd289e6=_0x399dfb();_0x232745[_0xc76bbd(0x17e)]++,_0x232745[_0xc76bbd(0x1b4)]+=_0x23ae99(_0x2e006a,_0xd289e6),_0x232745['ts']=_0xd289e6,_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x17e)]++,_0x5e09b5[_0xc76bbd(0x116)]['time']+=_0x23ae99(_0x2e006a,_0xd289e6),_0x5e09b5['hits']['ts']=_0xd289e6,(_0x232745[_0xc76bbd(0x17e)]>0x32||_0x232745[_0xc76bbd(0x1b4)]>0x64)&&(_0x232745[_0xc76bbd(0x1b6)]=!0x0),(_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x17e)]>0x3e8||_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x1b4)]>0x12c)&&(_0x5e09b5['hits']['reduceLimits']=!0x0);}}catch{}}}return _0x357de1;}((_0xe39406,_0x12f4af,_0x453c88,_0x41365b,_0xc3559e,_0xdce0af,_0x33c738,_0x26605a,_0x543a92,_0x5f076a,_0x5844c8)=>{var _0x3348a8=_0x22af76;if(_0xe39406[_0x3348a8(0x16b)])return _0xe39406['_console_ninja'];if(!X(_0xe39406,_0x26605a,_0xc3559e))return _0xe39406[_0x3348a8(0x16b)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0xe39406[_0x3348a8(0x16b)];let _0x3599bc=b(_0xe39406),_0x7e6c5c=_0x3599bc['elapsed'],_0x369f46=_0x3599bc['timeStamp'],_0x165423=_0x3599bc['now'],_0x1e8be2={'hits':{},'ts':{}},_0x5d1787=H(_0xe39406,_0x543a92,_0x1e8be2,_0xdce0af),_0x1f0dca=_0x5411c4=>{_0x1e8be2['ts'][_0x5411c4]=_0x369f46();},_0x137155=(_0x29df21,_0x92cd06)=>{let _0x211b5e=_0x1e8be2['ts'][_0x92cd06];if(delete _0x1e8be2['ts'][_0x92cd06],_0x211b5e){let _0x25b30=_0x7e6c5c(_0x211b5e,_0x369f46());_0x230ae2(_0x5d1787('time',_0x29df21,_0x165423(),_0x2638dc,[_0x25b30],_0x92cd06));}},_0x26da5f=_0x21b4f5=>{var _0x4fe62f=_0x3348a8,_0x574fa5;return _0xc3559e===_0x4fe62f(0x187)&&_0xe39406[_0x4fe62f(0x14d)]&&((_0x574fa5=_0x21b4f5==null?void 0x0:_0x21b4f5[_0x4fe62f(0xf0)])==null?void 0x0:_0x574fa5[_0x4fe62f(0x167)])&&(_0x21b4f5[_0x4fe62f(0xf0)][0x0]['origin']=_0xe39406[_0x4fe62f(0x14d)]),_0x21b4f5;};_0xe39406[_0x3348a8(0x16b)]={'consoleLog':(_0x581e6b,_0x5c928c)=>{var _0x341716=_0x3348a8;_0xe39406[_0x341716(0x10c)][_0x341716(0xf9)]['name']!=='disabledLog'&&_0x230ae2(_0x5d1787('log',_0x581e6b,_0x165423(),_0x2638dc,_0x5c928c));},'consoleTrace':(_0x4aca16,_0xfebfc6)=>{var _0x1a169f=_0x3348a8;_0xe39406[_0x1a169f(0x10c)][_0x1a169f(0xf9)][_0x1a169f(0x149)]!=='disabledTrace'&&_0x230ae2(_0x26da5f(_0x5d1787(_0x1a169f(0x132),_0x4aca16,_0x165423(),_0x2638dc,_0xfebfc6)));},'consoleTime':_0x10b89d=>{_0x1f0dca(_0x10b89d);},'consoleTimeEnd':(_0xc2cdf8,_0x448e82)=>{_0x137155(_0x448e82,_0xc2cdf8);},'autoLog':(_0x58dacd,_0x3cb101)=>{var _0x4266a6=_0x3348a8;_0x230ae2(_0x5d1787(_0x4266a6(0xf9),_0x3cb101,_0x165423(),_0x2638dc,[_0x58dacd]));},'autoLogMany':(_0xea83fe,_0x1fdecb)=>{_0x230ae2(_0x5d1787('log',_0xea83fe,_0x165423(),_0x2638dc,_0x1fdecb));},'autoTrace':(_0x130829,_0x1b5197)=>{var _0x52cc80=_0x3348a8;_0x230ae2(_0x26da5f(_0x5d1787(_0x52cc80(0x132),_0x1b5197,_0x165423(),_0x2638dc,[_0x130829])));},'autoTraceMany':(_0x5a09f5,_0x18939b)=>{var _0x3f44ce=_0x3348a8;_0x230ae2(_0x26da5f(_0x5d1787(_0x3f44ce(0x132),_0x5a09f5,_0x165423(),_0x2638dc,_0x18939b)));},'autoTime':(_0xcf495c,_0x1cce05,_0x396811)=>{_0x1f0dca(_0x396811);},'autoTimeEnd':(_0x5738d5,_0x5b3b6d,_0x3d8db4)=>{_0x137155(_0x5b3b6d,_0x3d8db4);},'coverage':_0x41793b=>{var _0x1fb997=_0x3348a8;_0x230ae2({'method':_0x1fb997(0x16e),'version':_0xdce0af,'args':[{'id':_0x41793b}]});}};let _0x230ae2=q(_0xe39406,_0x12f4af,_0x453c88,_0x41365b,_0xc3559e,_0x5f076a,_0x5844c8),_0x2638dc=_0xe39406[_0x3348a8(0x112)];return _0xe39406['_console_ninja'];})(globalThis,'127.0.0.1',_0x22af76(0x1a8),_0x22af76(0xe4),_0x22af76(0x19e),_0x22af76(0x17c),_0x22af76(0x1a5),_0x22af76(0x13a),_0x22af76(0x189),'','1');");
  } catch (e) {}
}
; /* istanbul ignore next */
function oo_oo(i) {
  for (var _len = arguments.length, v = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    v[_key - 1] = arguments[_key];
  }
  try {
    oo_cm().consoleLog(i, v);
  } catch (e) {}
  return v;
}
; /* istanbul ignore next */
function oo_tr(i) {
  for (var _len2 = arguments.length, v = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    v[_key2 - 1] = arguments[_key2];
  }
  try {
    oo_cm().consoleTrace(i, v);
  } catch (e) {}
  return v;
}
; /* istanbul ignore next */
function oo_ts(v) {
  try {
    oo_cm().consoleTime(v);
  } catch (e) {}
  return v;
}
; /* istanbul ignore next */
function oo_te(v, i) {
  try {
    oo_cm().consoleTimeEnd(v, i);
  } catch (e) {}
  return v;
}
; /*eslint unicorn/no-abusive-eslint-disable:,eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/

/***/ }),

/***/ "./resources/asset/admin/js/demo1/scripts.bundle.js":
/*!**********************************************************!*\
  !*** ./resources/asset/admin/js/demo1/scripts.bundle.js ***!
  \**********************************************************/
/***/ (function() {

"use strict";


/**
 * @class KApp
 */
function _ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _ownKeys(Object(t), !0).forEach(function (r) { _defineProperty2(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : _ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty2(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var KTApp = function () {
  /** @type {object} colors State colors **/
  var colors = {};
  var _initTooltip = function initTooltip(el) {
    var skin = el.data('skin') ? 'tooltip-' + el.data('skin') : '';
    var width = el.data('width') == 'auto' ? 'tooltop-auto-width' : '';
    var triggerValue = el.data('trigger') ? el.data('trigger') : 'hover';
    var placement = el.data('placement') ? el.data('placement') : 'left';
    el.tooltip({
      trigger: triggerValue,
      template: '<div class="tooltip ' + skin + ' ' + width + '" role="tooltip">\
                <div class="arrow"></div>\
                <div class="tooltip-inner"></div>\
            </div>'
    });
  };
  var _initTooltips = function initTooltips() {
    // init bootstrap tooltips
    $('[data-toggle="kt-tooltip"]').each(function () {
      _initTooltip($(this));
    });
  };
  var _initPopover = function initPopover(el) {
    var skin = el.data('skin') ? 'popover-' + el.data('skin') : '';
    var triggerValue = el.data('trigger') ? el.data('trigger') : 'hover';
    el.popover({
      trigger: triggerValue,
      template: '\
            <div class="popover ' + skin + '" role="tooltip">\
                <div class="arrow"></div>\
                <h3 class="popover-header"></h3>\
                <div class="popover-body"></div>\
            </div>'
    });
  };
  var _initPopovers = function initPopovers() {
    // init bootstrap popover
    $('[data-toggle="kt-popover"]').each(function () {
      _initPopover($(this));
    });
  };
  var initFileInput = function initFileInput() {
    // init bootstrap popover
    $('.custom-file-input').on('change', function () {
      var fileName = $(this).val();
      // $(this).next('.custom-file-label').addClass("selected").html(fileName);
      $(this).siblings('.custom-file-label').addClass("selected").html(fileName);
    });
  };
  var _initPortlet = function initPortlet(el, options) {
    // init portlet tools
    var el = $(el);
    var portlet = new KTPortlet(el[0], options);
  };
  var _initPortlets = function initPortlets() {
    // init portlet tools
    $('[data-ktportlet="true"]').each(function () {
      var el = $(this);
      if (el.data('data-ktportlet-initialized') !== true) {
        _initPortlet(el, {});
        el.data('data-ktportlet-initialized', true);
      }
    });
  };
  var initScroll = function initScroll() {
    $('[data-scroll="true"]').each(function () {
      var el = $(this);
      KTUtil.scrollInit(this, {
        mobileNativeScroll: true,
        handleWindowResize: true,
        rememberPosition: el.data('remember-position') == 'true' ? true : false,
        height: function height() {
          if (KTUtil.isInResponsiveRange('tablet-and-mobile') && el.data('mobile-height')) {
            return el.data('mobile-height');
          } else {
            return el.data('height');
          }
        }
      });
    });
  };
  var initAlerts = function initAlerts() {
    // init bootstrap popover
    $('body').on('click', '[data-close=alert]', function () {
      $(this).closest('.alert').hide();
    });
  };
  var _initSticky = function initSticky() {
    window.sticky = new Sticky('[data-sticky="true"]');
  };
  var _initAbsoluteDropdown = function initAbsoluteDropdown(dropdown) {
    var dropdownMenu;
    if (!dropdown) {
      return;
    }
    dropdown.on('show.bs.dropdown', function (e) {
      dropdownMenu = $(e.target).find('.dropdown-menu');
      $('body').append(dropdownMenu.detach());
      dropdownMenu.css('display', 'block');
      dropdownMenu.position({
        'my': 'right top',
        'at': 'right bottom',
        'of': $(e.relatedTarget)
      });
    });
    dropdown.on('hide.bs.dropdown', function (e) {
      $(e.target).append(dropdownMenu.detach());
      dropdownMenu.hide();
    });
  };
  var initAbsoluteDropdowns = function initAbsoluteDropdowns() {
    $('body').on('show.bs.dropdown', function (e) {
      if ($(e.target).find("[data-attach='body']").length === 0) {
        return;
      }
      var dropdownMenu = $(e.target).find('.dropdown-menu');
      $('body').append(dropdownMenu.detach());
      dropdownMenu.css('display', 'block');
      dropdownMenu.position({
        'my': 'right top',
        'at': 'right bottom',
        'of': $(e.relatedTarget)
      });
    });
    $('body').on('hide.bs.dropdown', function (e) {
      if ($(e.target).find("[data-attach='body']").length === 0) {
        return;
      }
      var dropdownMenu = $(e.target).find('.dropdown-menu');
      $(e.target).append(dropdownMenu.detach());
      dropdownMenu.hide();
    });
  };
  return {
    init: function init(options) {
      if (options && options.colors) {
        colors = options.colors;
      }
      KTApp.initComponents();
    },
    initComponents: function initComponents() {
      initScroll();
      _initTooltips();
      _initPopovers();
      initAlerts();
      _initPortlets();
      initFileInput();
      _initSticky();
      initAbsoluteDropdowns();
    },
    initTooltips: function initTooltips() {
      _initTooltips();
    },
    initTooltip: function initTooltip(el) {
      _initTooltip(el);
    },
    initPopovers: function initPopovers() {
      _initPopovers();
    },
    initPopover: function initPopover(el) {
      _initPopover(el);
    },
    initPortlet: function initPortlet(el, options) {
      _initPortlet(el, options);
    },
    initPortlets: function initPortlets() {
      _initPortlets();
    },
    initSticky: function initSticky() {
      _initSticky();
    },
    initAbsoluteDropdown: function initAbsoluteDropdown(dropdown) {
      _initAbsoluteDropdown(dropdown);
    },
    block: function block(target, options) {
      var el = $(target);
      options = $.extend(true, {
        opacity: 0.03,
        overlayColor: '#000000',
        type: '',
        size: '',
        state: 'brand',
        centerX: true,
        centerY: true,
        message: '',
        shadow: true,
        width: 'auto'
      }, options);
      var html;
      var version = options.type ? 'kt-spinner--' + options.type : '';
      var state = options.state ? 'kt-spinner--' + options.state : '';
      var size = options.size ? 'kt-spinner--' + options.size : '';
      var spinner = '<div class="kt-spinner ' + version + ' ' + state + ' ' + size + '"></div';
      if (options.message && options.message.length > 0) {
        var classes = 'blockui ' + (options.shadow === false ? 'blockui' : '');
        html = '<div class="' + classes + '"><span>' + options.message + '</span><span>' + spinner + '</span></div>';
        var el = document.createElement('div');
        KTUtil.get('body').prepend(el);
        KTUtil.addClass(el, classes);
        el.innerHTML = '<span>' + options.message + '</span><span>' + spinner + '</span>';
        options.width = KTUtil.actualWidth(el) + 10;
        KTUtil.remove(el);
        if (target == 'body') {
          html = '<div class="' + classes + '" style="margin-left:-' + options.width / 2 + 'px;"><span>' + options.message + '</span><span>' + spinner + '</span></div>';
        }
      } else {
        html = spinner;
      }
      var params = {
        message: html,
        centerY: options.centerY,
        centerX: options.centerX,
        css: {
          top: '30%',
          left: '50%',
          border: '0',
          padding: '0',
          backgroundColor: 'none',
          width: options.width
        },
        overlayCSS: {
          backgroundColor: options.overlayColor,
          opacity: options.opacity,
          cursor: 'wait',
          zIndex: '10'
        },
        onUnblock: function onUnblock() {
          if (el && el[0]) {
            KTUtil.css(el[0], 'position', '');
            KTUtil.css(el[0], 'zoom', '');
          }
        }
      };
      if (target == 'body') {
        params.css.top = '50%';
        $.blockUI(params);
      } else {
        var el = $(target);
        el.block(params);
      }
    },
    unblock: function unblock(target) {
      if (target && target != 'body') {
        $(target).unblock();
      } else {
        $.unblockUI();
      }
    },
    blockPage: function blockPage(options) {
      return KTApp.block('body', options);
    },
    unblockPage: function unblockPage() {
      return KTApp.unblock('body');
    },
    progress: function progress(target, options) {
      var skin = options && options.skin ? options.skin : 'light';
      var alignment = options && options.alignment ? options.alignment : 'right';
      var size = options && options.size ? 'kt-spinner--' + options.size : '';
      var classes = 'kt-spinner ' + 'kt-spinner--' + skin + ' kt-spinner--' + alignment + ' kt-spinner--' + size;
      KTApp.unprogress(target);
      $(target).addClass(classes);
      $(target).data('progress-classes', classes);
    },
    unprogress: function unprogress(target) {
      $(target).removeClass($(target).data('progress-classes'));
    },
    getStateColor: function getStateColor(name) {
      return colors["state"][name];
    },
    getBaseColor: function getBaseColor(type, level) {
      return colors["base"][type][level - 1];
    }
  };
}();

// Initialize KTApp class on document ready
$(document).ready(function () {
  KTApp.init(KTAppOptions);
});
"use strict";
/**
 * @class KTUtil  base utilize class that privides helper functions
 */
// Polyfill
// matches polyfill
this.Element && function (ElementPrototype) {
  ElementPrototype.matches = ElementPrototype.matches || ElementPrototype.matchesSelector || ElementPrototype.webkitMatchesSelector || ElementPrototype.msMatchesSelector || function (selector) {
    var node = this,
      nodes = (node.parentNode || node.document).querySelectorAll(selector),
      i = -1;
    while (nodes[++i] && nodes[i] != node);
    return !!nodes[i];
  };
}(Element.prototype);

// closest polyfill
this.Element && function (ElementPrototype) {
  ElementPrototype.closest = ElementPrototype.closest || function (selector) {
    var el = this;
    while (el.matches && !el.matches(selector)) el = el.parentNode;
    return el.matches ? el : null;
  };
}(Element.prototype);

// remove polyfill
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

// matches polyfill
this.Element && function (ElementPrototype) {
  ElementPrototype.matches = ElementPrototype.matches || ElementPrototype.matchesSelector || ElementPrototype.webkitMatchesSelector || ElementPrototype.msMatchesSelector || function (selector) {
    var node = this,
      nodes = (node.parentNode || node.document).querySelectorAll(selector),
      i = -1;
    while (nodes[++i] && nodes[i] != node);
    return !!nodes[i];
  };
}(Element.prototype);

//
// requestAnimationFrame polyfill by Erik Möller.
//  With fixes from Paul Irish and Tino Zijdel
//
//  http://paulirish.com/2011/requestanimationframe-for-smart-animating/
//  http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
//
//  MIT license
//
(function () {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
})();

// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/prepend()/prepend().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('prepend')) {
      return;
    }
    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        this.insertBefore(docFrag, this.firstChild);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

// Global variables 
window.KTUtilElementDataStore = {};
window.KTUtilElementDataStoreID = 0;
window.KTUtilDelegatedEventHandlers = {};
window.KTUtil = function () {
  var resizeHandlers = [];

  /** @type {object} breakpoints The device width breakpoints **/
  var breakpoints = {
    sm: 544,
    // Small screen / phone           
    md: 768,
    // Medium screen / tablet            
    lg: 1024,
    // Large screen / desktop        
    xl: 1200 // Extra large screen / wide desktop
  };

  /**
   * Handle window resize event with some 
   * delay to attach event handlers upon resize complete 
   */
  var _windowResizeHandler = function _windowResizeHandler() {
    var _runResizeHandlers = function _runResizeHandlers() {
      // reinitialize other subscribed elements
      for (var i = 0; i < resizeHandlers.length; i++) {
        var each = resizeHandlers[i];
        each.call();
      }
    };
    var timeout = false; // holder for timeout id
    var delay = 250; // delay after event is "complete" to run callback

    window.addEventListener('resize', function () {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        _runResizeHandlers();
      }, delay); // wait 50ms until window resize finishes.
    });
  };
  return {
    /**
     * Class main initializer.
     * @param {object} options.
     * @returns null
     */
    //main function to initiate the theme
    init: function init(options) {
      if (options && options.breakpoints) {
        breakpoints = options.breakpoints;
      }
      _windowResizeHandler();
    },
    /**
     * Adds window resize event handler.
     * @param {function} callback function.
     */
    addResizeHandler: function addResizeHandler(callback) {
      resizeHandlers.push(callback);
    },
    /**
     * Removes window resize event handler.
     * @param {function} callback function.
     */
    removeResizeHandler: function removeResizeHandler(callback) {
      for (var i = 0; i < resizeHandlers.length; i++) {
        if (callback === resizeHandlers[i]) {
          delete resizeHandlers[i];
        }
      }
    },
    /**
     * Trigger window resize handlers.
     */
    runResizeHandlers: function runResizeHandlers() {
      _runResizeHandlers();
    },
    resize: function resize() {
      if (typeof Event === 'function') {
        // modern browsers
        window.dispatchEvent(new Event('resize'));
      } else {
        // for IE and other old browsers
        // causes deprecation warning on modern browsers
        var evt = window.document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
      }
    },
    /**
     * Get GET parameter value from URL.
     * @param {string} paramName Parameter name.
     * @returns {string}  
     */
    getURLParam: function getURLParam(paramName) {
      var searchString = window.location.search.substring(1),
        i,
        val,
        params = searchString.split("&");
      for (i = 0; i < params.length; i++) {
        val = params[i].split("=");
        if (val[0] == paramName) {
          return unescape(val[1]);
        }
      }
      return null;
    },
    /**
     * Checks whether current device is mobile touch.
     * @returns {boolean}  
     */
    isMobileDevice: function isMobileDevice() {
      return this.getViewPort().width < this.getBreakpoint('lg') ? true : false;
    },
    /**
     * Checks whether current device is desktop.
     * @returns {boolean}  
     */
    isDesktopDevice: function isDesktopDevice() {
      return KTUtil.isMobileDevice() ? false : true;
    },
    /**
     * Gets browser window viewport size. Ref:
     * http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
     * @returns {object}  
     */
    getViewPort: function getViewPort() {
      var e = window,
        a = 'inner';
      if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
      }
      return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
      };
    },
    /**
     * Checks whether given device mode is currently activated.
     * @param {string} mode Responsive mode name(e.g: desktop,
     *     desktop-and-tablet, tablet, tablet-and-mobile, mobile)
     * @returns {boolean}  
     */
    isInResponsiveRange: function isInResponsiveRange(mode) {
      var breakpoint = this.getViewPort().width;
      if (mode == 'general') {
        return true;
      } else if (mode == 'desktop' && breakpoint >= this.getBreakpoint('lg') + 1) {
        return true;
      } else if (mode == 'tablet' && breakpoint >= this.getBreakpoint('md') + 1 && breakpoint < this.getBreakpoint('lg')) {
        return true;
      } else if (mode == 'mobile' && breakpoint <= this.getBreakpoint('md')) {
        return true;
      } else if (mode == 'desktop-and-tablet' && breakpoint >= this.getBreakpoint('md') + 1) {
        return true;
      } else if (mode == 'tablet-and-mobile' && breakpoint <= this.getBreakpoint('lg')) {
        return true;
      } else if (mode == 'minimal-desktop-and-below' && breakpoint <= this.getBreakpoint('xl')) {
        return true;
      }
      return false;
    },
    /**
     * Generates unique ID for give prefix.
     * @param {string} prefix Prefix for generated ID
     * @returns {boolean}  
     */
    getUniqueID: function getUniqueID(prefix) {
      return prefix + Math.floor(Math.random() * new Date().getTime());
    },
    /**
     * Gets window width for give breakpoint mode.
     * @param {string} mode Responsive mode name(e.g: xl, lg, md, sm)
     * @returns {number}  
     */
    getBreakpoint: function getBreakpoint(mode) {
      return breakpoints[mode];
    },
    /**
     * Checks whether object has property matchs given key path.
     * @param {object} obj Object contains values paired with given key path
     * @param {string} keys Keys path seperated with dots
     * @returns {object}  
     */
    isset: function isset(obj, keys) {
      var stone;
      keys = keys || '';
      if (keys.indexOf('[') !== -1) {
        throw new Error('Unsupported object path notation.');
      }
      keys = keys.split('.');
      do {
        if (obj === undefined) {
          return false;
        }
        stone = keys.shift();
        if (!obj.hasOwnProperty(stone)) {
          return false;
        }
        obj = obj[stone];
      } while (keys.length);
      return true;
    },
    /**
     * Gets highest z-index of the given element parents
     * @param {object} el jQuery element object
     * @returns {number}  
     */
    getHighestZindex: function getHighestZindex(el) {
      var elem = KTUtil.get(el),
        position,
        value;
      while (elem && elem !== document) {
        // Ignore z-index if position is set to a value where z-index is ignored by the browser
        // This makes behavior of this function consistent across browsers
        // WebKit always returns auto if the element is positioned
        position = KTUtil.css(elem, 'position');
        if (position === "absolute" || position === "relative" || position === "fixed") {
          // IE returns 0 when zIndex is not specified
          // other browsers return a string
          // we ignore the case of nested elements with an explicit value of 0
          // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
          value = parseInt(KTUtil.css(elem, 'z-index'));
          if (!isNaN(value) && value !== 0) {
            return value;
          }
        }
        elem = elem.parentNode;
      }
      return null;
    },
    /**
     * Checks whether the element has any parent with fixed positionfreg
     * @param {object} el jQuery element object
     * @returns {boolean}  
     */
    hasFixedPositionedParent: function hasFixedPositionedParent(el) {
      while (el && el !== document) {
        position = KTUtil.css(el, 'position');
        if (position === "fixed") {
          return true;
        }
        el = el.parentNode;
      }
      return false;
    },
    /**
     * Simulates delay
     */
    sleep: function sleep(milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > milliseconds) {
          break;
        }
      }
    },
    /**
     * Gets randomly generated integer value within given min and max range
     * @param {number} min Range start value
     * @param {number} max Range end value
     * @returns {number}
     */
    getRandomInt: function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /**
     * Checks whether Angular library is included
     * @returns {boolean}  
     */
    isAngularVersion: function isAngularVersion() {
      return window.Zone !== undefined ? true : false;
    },
    // jQuery Workarounds

    // Deep extend:  $.extend(true, {}, objA, objB);
    deepExtend: function deepExtend(out) {
      out = out || {};
      for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];
        if (!obj) continue;
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (_typeof(obj[key]) === 'object') out[key] = KTUtil.deepExtend(out[key], obj[key]);else out[key] = obj[key];
          }
        }
      }
      return out;
    },
    // extend:  $.extend({}, objA, objB); 
    extend: function extend(out) {
      out = out || {};
      for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i]) continue;
        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
        }
      }
      return out;
    },
    get: function get(query) {
      var el;
      if (query === document) {
        return document;
      }
      if (!!(query && query.nodeType === 1)) {
        return query;
      }
      if (el = document.getElementById(query)) {
        return el;
      } else if (el = document.getElementsByTagName(query)) {
        return el[0];
      } else if (el = document.getElementsByClassName(query)) {
        return el[0];
      } else {
        return null;
      }
    },
    getByID: function getByID(query) {
      if (!!(query && query.nodeType === 1)) {
        return query;
      }
      return document.getElementById(query);
    },
    getByTag: function getByTag(query) {
      var el;
      if (el = document.getElementsByTagName(query)) {
        return el[0];
      } else {
        return null;
      }
    },
    getByClass: function getByClass(query) {
      var el;
      if (el = document.getElementsByClassName(query)) {
        return el[0];
      } else {
        return null;
      }
    },
    /**
     * Checks whether the element has given classes
     * @param {object} el jQuery element object
     * @param {string} Classes string
     * @returns {boolean}  
     */
    hasClasses: function hasClasses(el, classes) {
      if (!el) {
        return;
      }
      var classesArr = classes.split(" ");
      for (var i = 0; i < classesArr.length; i++) {
        if (KTUtil.hasClass(el, KTUtil.trim(classesArr[i])) == false) {
          return false;
        }
      }
      return true;
    },
    hasClass: function hasClass(el, className) {
      if (!el) {
        return;
      }
      return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
    },
    addClass: function addClass(el, className) {
      if (!el || typeof className === 'undefined') {
        return;
      }
      var classNames = className.split(' ');
      if (el.classList) {
        for (var i = 0; i < classNames.length; i++) {
          if (classNames[i] && classNames[i].length > 0) {
            el.classList.add(KTUtil.trim(classNames[i]));
          }
        }
      } else if (!KTUtil.hasClass(el, className)) {
        for (var i = 0; i < classNames.length; i++) {
          el.className += ' ' + KTUtil.trim(classNames[i]);
        }
      }
    },
    removeClass: function removeClass(el, className) {
      if (!el || typeof className === 'undefined') {
        return;
      }
      var classNames = className.split(' ');
      if (el.classList) {
        for (var i = 0; i < classNames.length; i++) {
          el.classList.remove(KTUtil.trim(classNames[i]));
        }
      } else if (KTUtil.hasClass(el, className)) {
        for (var i = 0; i < classNames.length; i++) {
          el.className = el.className.replace(new RegExp('\\b' + KTUtil.trim(classNames[i]) + '\\b', 'g'), '');
        }
      }
    },
    triggerCustomEvent: function triggerCustomEvent(el, eventName, data) {
      if (window.CustomEvent) {
        var event = new CustomEvent(eventName, {
          detail: data
        });
      } else {
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, true, true, data);
      }
      el.dispatchEvent(event);
    },
    triggerEvent: function triggerEvent(node, eventName) {
      // Make sure we use the ownerDocument from the provided node to avoid cross-window problems
      var doc;
      if (node.ownerDocument) {
        doc = node.ownerDocument;
      } else if (node.nodeType == 9) {
        // the node may be the document itself, nodeType 9 = DOCUMENT_NODE
        doc = node;
      } else {
        throw new Error("Invalid node passed to fireEvent: " + node.id);
      }
      if (node.dispatchEvent) {
        // Gecko-style approach (now the standard) takes more work
        var eventClass = "";

        // Different events have different event classes.
        // If this switch statement can't map an eventName to an eventClass,
        // the event firing is going to fail.
        switch (eventName) {
          case "click": // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
          case "mouseenter":
          case "mouseleave":
          case "mousedown":
          case "mouseup":
            eventClass = "MouseEvents";
            break;
          case "focus":
          case "change":
          case "blur":
          case "select":
            eventClass = "HTMLEvents";
            break;
          default:
            throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
            break;
        }
        var event = doc.createEvent(eventClass);
        var bubbles = eventName == "change" ? false : true;
        event.initEvent(eventName, bubbles, true); // All events created as bubbling and cancelable.

        event.synthetic = true; // allow detection of synthetic events
        // The second parameter says go ahead with the default action
        node.dispatchEvent(event, true);
      } else if (node.fireEvent) {
        // IE-old school style
        var event = doc.createEventObject();
        event.synthetic = true; // allow detection of synthetic events
        node.fireEvent("on" + eventName, event);
      }
    },
    index: function index(elm) {
      elm = KTUtil.get(elm);
      var c = elm.parentNode.children,
        i = 0;
      for (; i < c.length; i++) if (c[i] == elm) return i;
    },
    trim: function trim(string) {
      return string.trim();
    },
    eventTriggered: function eventTriggered(e) {
      if (e.currentTarget.dataset.triggered) {
        return true;
      } else {
        e.currentTarget.dataset.triggered = true;
        return false;
      }
    },
    remove: function remove(el) {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    },
    find: function find(parent, query) {
      parent = KTUtil.get(parent);
      if (parent) {
        return parent.querySelector(query);
      }
    },
    findAll: function findAll(parent, query) {
      parent = KTUtil.get(parent);
      if (parent) {
        return parent.querySelectorAll(query);
      }
    },
    insertAfter: function insertAfter(el, referenceNode) {
      return referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
    },
    parents: function parents(elem, selector) {
      // Element.matches() polyfill
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;
        };
      }

      // Set up a parent array
      var parents = [];

      // Push each parent element to the array
      for (; elem && elem !== document; elem = elem.parentNode) {
        if (selector) {
          if (elem.matches(selector)) {
            parents.push(elem);
          }
          continue;
        }
        parents.push(elem);
      }

      // Return our parent array
      return parents;
    },
    children: function children(el, selector, log) {
      if (!el || !el.childNodes) {
        return;
      }
      var result = [],
        i = 0,
        l = el.childNodes.length;
      for (var i; i < l; ++i) {
        if (el.childNodes[i].nodeType == 1 && KTUtil.matches(el.childNodes[i], selector, log)) {
          result.push(el.childNodes[i]);
        }
      }
      return result;
    },
    child: function child(el, selector, log) {
      var children = KTUtil.children(el, selector, log);
      return children ? children[0] : null;
    },
    matches: function matches(el, selector, log) {
      var p = Element.prototype;
      var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {
        return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
      };
      if (el && el.tagName) {
        return f.call(el, selector);
      } else {
        return false;
      }
    },
    data: function data(element) {
      element = KTUtil.get(element);
      return {
        set: function set(name, data) {
          if (element === undefined) {
            return;
          }
          if (element.customDataTag === undefined) {
            KTUtilElementDataStoreID++;
            element.customDataTag = KTUtilElementDataStoreID;
          }
          if (KTUtilElementDataStore[element.customDataTag] === undefined) {
            KTUtilElementDataStore[element.customDataTag] = {};
          }
          KTUtilElementDataStore[element.customDataTag][name] = data;
        },
        get: function get(name) {
          if (element === undefined) {
            return;
          }
          if (element.customDataTag === undefined) {
            return null;
          }
          return this.has(name) ? KTUtilElementDataStore[element.customDataTag][name] : null;
        },
        has: function has(name) {
          if (element === undefined) {
            return false;
          }
          if (element.customDataTag === undefined) {
            return false;
          }
          return KTUtilElementDataStore[element.customDataTag] && KTUtilElementDataStore[element.customDataTag][name] ? true : false;
        },
        remove: function remove(name) {
          if (element && this.has(name)) {
            delete KTUtilElementDataStore[element.customDataTag][name];
          }
        }
      };
    },
    outerWidth: function outerWidth(el, margin) {
      var width;
      if (margin === true) {
        var width = parseFloat(el.offsetWidth);
        width += parseFloat(KTUtil.css(el, 'margin-left')) + parseFloat(KTUtil.css(el, 'margin-right'));
        return parseFloat(width);
      } else {
        var width = parseFloat(el.offsetWidth);
        return width;
      }
    },
    offset: function offset(elem) {
      var rect, win;
      elem = KTUtil.get(elem);
      if (!elem) {
        return;
      }

      // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
      // Support: IE <=11 only
      // Running getBoundingClientRect on a
      // disconnected node in IE throws an error

      if (!elem.getClientRects().length) {
        return {
          top: 0,
          left: 0
        };
      }

      // Get document-relative position by adding viewport scroll to viewport-relative gBCR
      rect = elem.getBoundingClientRect();
      win = elem.ownerDocument.defaultView;
      return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
      };
    },
    height: function height(el) {
      return KTUtil.css(el, 'height');
    },
    visible: function visible(el) {
      return !(el.offsetWidth === 0 && el.offsetHeight === 0);
    },
    attr: function attr(el, name, value) {
      el = KTUtil.get(el);
      if (el == undefined) {
        return;
      }
      if (value !== undefined) {
        el.setAttribute(name, value);
      } else {
        return el.getAttribute(name);
      }
    },
    hasAttr: function hasAttr(el, name) {
      el = KTUtil.get(el);
      if (el == undefined) {
        return;
      }
      return el.getAttribute(name) ? true : false;
    },
    removeAttr: function removeAttr(el, name) {
      el = KTUtil.get(el);
      if (el == undefined) {
        return;
      }
      el.removeAttribute(name);
    },
    animate: function animate(from, to, duration, update, easing, done) {
      /**
       * TinyAnimate.easings
       *  Adapted from jQuery Easing
       */
      var easings = {};
      var easing;
      easings.linear = function (t, b, c, d) {
        return c * t / d + b;
      };
      easing = easings.linear;

      // Early bail out if called incorrectly
      if (typeof from !== 'number' || typeof to !== 'number' || typeof duration !== 'number' || typeof update !== 'function') {
        return;
      }

      // Create mock done() function if necessary
      if (typeof done !== 'function') {
        done = function done() {};
      }

      // Pick implementation (requestAnimationFrame | setTimeout)
      var rAF = window.requestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 50);
      };

      // Animation loop
      var canceled = false;
      var change = to - from;
      function loop(timestamp) {
        var time = (timestamp || +new Date()) - start;
        if (time >= 0) {
          update(easing(time, from, change, duration));
        }
        if (time >= 0 && time >= duration) {
          update(to);
          done();
        } else {
          rAF(loop);
        }
      }
      update(from);

      // Start animation loop
      var start = window.performance && window.performance.now ? window.performance.now() : +new Date();
      rAF(loop);
    },
    actualCss: function actualCss(el, prop, cache) {
      el = KTUtil.get(el);
      var css = '';
      if (el instanceof HTMLElement === false) {
        return;
      }
      if (!el.getAttribute('kt-hidden-' + prop) || cache === false) {
        var value;

        // the element is hidden so:
        // making the el block so we can meassure its height but still be hidden
        css = el.style.cssText;
        el.style.cssText = 'position: absolute; visibility: hidden; display: block;';
        if (prop == 'width') {
          value = el.offsetWidth;
        } else if (prop == 'height') {
          value = el.offsetHeight;
        }
        el.style.cssText = css;

        // store it in cache
        el.setAttribute('kt-hidden-' + prop, value);
        return parseFloat(value);
      } else {
        // store it in cache
        return parseFloat(el.getAttribute('kt-hidden-' + prop));
      }
    },
    actualHeight: function actualHeight(el, cache) {
      return KTUtil.actualCss(el, 'height', cache);
    },
    actualWidth: function actualWidth(el, cache) {
      return KTUtil.actualCss(el, 'width', cache);
    },
    getScroll: function getScroll(element, method) {
      // The passed in `method` value should be 'Top' or 'Left'
      method = 'scroll' + method;
      return element == window || element == document ? self[method == 'scrollTop' ? 'pageYOffset' : 'pageXOffset'] || browserSupportsBoxModel && document.documentElement[method] || document.body[method] : element[method];
    },
    css: function css(el, styleProp, value) {
      el = KTUtil.get(el);
      if (!el) {
        return;
      }
      if (value !== undefined) {
        el.style[styleProp] = value;
      } else {
        var value,
          defaultView = (el.ownerDocument || document).defaultView;
        // W3C standard way:
        if (defaultView && defaultView.getComputedStyle) {
          // sanitize property name to css notation
          // (hyphen separated words eg. font-Size)
          styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
          return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
        } else if (el.currentStyle) {
          // IE
          // sanitize property name to camelCase
          styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
            return letter.toUpperCase();
          });
          value = el.currentStyle[styleProp];
          // convert other units to pixels on IE
          if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
            return function (value) {
              var oldLeft = el.style.left,
                oldRsLeft = el.runtimeStyle.left;
              el.runtimeStyle.left = el.currentStyle.left;
              el.style.left = value || 0;
              value = el.style.pixelLeft + "px";
              el.style.left = oldLeft;
              el.runtimeStyle.left = oldRsLeft;
              return value;
            }(value);
          }
          return value;
        }
      }
    },
    slide: function slide(el, dir, speed, callback, recalcMaxHeight) {
      if (!el || dir == 'up' && KTUtil.visible(el) === false || dir == 'down' && KTUtil.visible(el) === true) {
        return;
      }
      speed = speed ? speed : 600;
      var calcHeight = KTUtil.actualHeight(el);
      var calcPaddingTop = false;
      var calcPaddingBottom = false;
      if (KTUtil.css(el, 'padding-top') && KTUtil.data(el).has('slide-padding-top') !== true) {
        KTUtil.data(el).set('slide-padding-top', KTUtil.css(el, 'padding-top'));
      }
      if (KTUtil.css(el, 'padding-bottom') && KTUtil.data(el).has('slide-padding-bottom') !== true) {
        KTUtil.data(el).set('slide-padding-bottom', KTUtil.css(el, 'padding-bottom'));
      }
      if (KTUtil.data(el).has('slide-padding-top')) {
        calcPaddingTop = parseInt(KTUtil.data(el).get('slide-padding-top'));
      }
      if (KTUtil.data(el).has('slide-padding-bottom')) {
        calcPaddingBottom = parseInt(KTUtil.data(el).get('slide-padding-bottom'));
      }
      if (dir == 'up') {
        // up          
        el.style.cssText = 'display: block; overflow: hidden;';
        if (calcPaddingTop) {
          KTUtil.animate(0, calcPaddingTop, speed, function (value) {
            el.style.paddingTop = calcPaddingTop - value + 'px';
          }, 'linear');
        }
        if (calcPaddingBottom) {
          KTUtil.animate(0, calcPaddingBottom, speed, function (value) {
            el.style.paddingBottom = calcPaddingBottom - value + 'px';
          }, 'linear');
        }
        KTUtil.animate(0, calcHeight, speed, function (value) {
          el.style.height = calcHeight - value + 'px';
        }, 'linear', function () {
          callback();
          el.style.height = '';
          el.style.display = 'none';
        });
      } else if (dir == 'down') {
        // down
        el.style.cssText = 'display: block; overflow: hidden;';
        if (calcPaddingTop) {
          KTUtil.animate(0, calcPaddingTop, speed, function (value) {
            el.style.paddingTop = value + 'px';
          }, 'linear', function () {
            el.style.paddingTop = '';
          });
        }
        if (calcPaddingBottom) {
          KTUtil.animate(0, calcPaddingBottom, speed, function (value) {
            el.style.paddingBottom = value + 'px';
          }, 'linear', function () {
            el.style.paddingBottom = '';
          });
        }
        KTUtil.animate(0, calcHeight, speed, function (value) {
          el.style.height = value + 'px';
        }, 'linear', function () {
          callback();
          el.style.height = '';
          el.style.display = '';
          el.style.overflow = '';
        });
      }
    },
    slideUp: function slideUp(el, speed, callback) {
      KTUtil.slide(el, 'up', speed, callback);
    },
    slideDown: function slideDown(el, speed, callback) {
      KTUtil.slide(el, 'down', speed, callback);
    },
    show: function show(el, display) {
      if (typeof el !== 'undefined') {
        el.style.display = display ? display : 'block';
      }
    },
    hide: function hide(el) {
      if (typeof el !== 'undefined') {
        el.style.display = 'none';
      }
    },
    addEvent: function addEvent(el, type, handler, one) {
      el = KTUtil.get(el);
      if (typeof el !== 'undefined') {
        el.addEventListener(type, handler);
      }
    },
    removeEvent: function removeEvent(el, type, handler) {
      el = KTUtil.get(el);
      el.removeEventListener(type, handler);
    },
    on: function on(element, selector, event, handler) {
      if (!selector) {
        return;
      }
      var eventId = KTUtil.getUniqueID('event');
      KTUtilDelegatedEventHandlers[eventId] = function (e) {
        var targets = element.querySelectorAll(selector);
        var target = e.target;
        while (target && target !== element) {
          for (var i = 0, j = targets.length; i < j; i++) {
            if (target === targets[i]) {
              handler.call(target, e);
            }
          }
          target = target.parentNode;
        }
      };
      KTUtil.addEvent(element, event, KTUtilDelegatedEventHandlers[eventId]);
      return eventId;
    },
    off: function off(element, event, eventId) {
      if (!element || !KTUtilDelegatedEventHandlers[eventId]) {
        return;
      }
      KTUtil.removeEvent(element, event, KTUtilDelegatedEventHandlers[eventId]);
      delete KTUtilDelegatedEventHandlers[eventId];
    },
    one: function onetime(el, type, callback) {
      el = KTUtil.get(el);
      el.addEventListener(type, function callee(e) {
        // remove event
        if (e.target && e.target.removeEventListener) {
          e.target.removeEventListener(e.type, callee);
        }

        // call handler
        return callback(e);
      });
    },
    hash: function hash(str) {
      var hash = 0,
        i,
        chr;
      if (str.length === 0) return hash;
      for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    },
    animateClass: function animateClass(el, animationName, callback) {
      var animation;
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
        msAnimation: 'msAnimationEnd'
      };
      for (var t in animations) {
        if (el.style[t] !== undefined) {
          animation = animations[t];
        }
      }
      KTUtil.addClass(el, 'animated ' + animationName);
      KTUtil.one(el, animation, function () {
        KTUtil.removeClass(el, 'animated ' + animationName);
      });
      if (callback) {
        KTUtil.one(el, animation, callback);
      }
    },
    transitionEnd: function transitionEnd(el, callback) {
      var transition;
      var transitions = {
        transition: 'transitionend',
        OTransition: 'oTransitionEnd',
        MozTransition: 'mozTransitionEnd',
        WebkitTransition: 'webkitTransitionEnd',
        msTransition: 'msTransitionEnd'
      };
      for (var t in transitions) {
        if (el.style[t] !== undefined) {
          transition = transitions[t];
        }
      }
      KTUtil.one(el, transition, callback);
    },
    animationEnd: function animationEnd(el, callback) {
      var animation;
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
        msAnimation: 'msAnimationEnd'
      };
      for (var t in animations) {
        if (el.style[t] !== undefined) {
          animation = animations[t];
        }
      }
      KTUtil.one(el, animation, callback);
    },
    animateDelay: function animateDelay(el, value) {
      var vendors = ['webkit-', 'moz-', 'ms-', 'o-', ''];
      for (var i = 0; i < vendors.length; i++) {
        KTUtil.css(el, vendors[i] + 'animation-delay', value);
      }
    },
    animateDuration: function animateDuration(el, value) {
      var vendors = ['webkit-', 'moz-', 'ms-', 'o-', ''];
      for (var i = 0; i < vendors.length; i++) {
        KTUtil.css(el, vendors[i] + 'animation-duration', value);
      }
    },
    scrollTo: function scrollTo(target, offset, duration) {
      var duration = duration ? duration : 500;
      var target = KTUtil.get(target);
      var targetPos = target ? KTUtil.offset(target).top : 0;
      var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      var from, to;
      if (targetPos > scrollPos) {
        from = targetPos;
        to = scrollPos;
      } else {
        from = scrollPos;
        to = targetPos;
      }
      if (offset) {
        to += offset;
      }
      KTUtil.animate(from, to, duration, function (value) {
        document.documentElement.scrollTop = value;
        document.body.parentNode.scrollTop = value;
        document.body.scrollTop = value;
      }); //, easing, done
    },
    scrollTop: function scrollTop(offset, duration) {
      KTUtil.scrollTo(null, offset, duration);
    },
    isArray: function isArray(obj) {
      return obj && Array.isArray(obj);
    },
    ready: function ready(callback) {
      if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        callback();
      } else {
        document.addEventListener('DOMContentLoaded', callback);
      }
    },
    isEmpty: function isEmpty(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }
      return true;
    },
    numberString: function numberString(nStr) {
      nStr += '';
      var x = nStr.split('.');
      var x1 = x[0];
      var x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      return x1 + x2;
    },
    detectIE: function detectIE() {
      var ua = window.navigator.userAgent;

      // Test values; Uncomment to check result …

      // IE 10
      // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

      // IE 11
      // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

      // Edge 12 (Spartan)
      // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

      // Edge 13
      // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

      var msie = ua.indexOf('MSIE ');
      if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      }
      var trident = ua.indexOf('Trident/');
      if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      }
      var edge = ua.indexOf('Edge/');
      if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      }

      // other browser
      return false;
    },
    isRTL: function isRTL() {
      return KTUtil.attr(KTUtil.get('html'), 'direction') == 'rtl';
    },
    // 

    // Scroller
    scrollInit: function scrollInit(element, options) {
      if (!element) return;
      // Define init function
      function init() {
        var ps;
        var height;
        if (options.height instanceof Function) {
          height = parseInt(options.height.call());
        } else {
          height = parseInt(options.height);
        }

        // Destroy scroll on table and mobile modes
        if ((options.mobileNativeScroll || options.disableForMobile) && KTUtil.isInResponsiveRange('tablet-and-mobile')) {
          if (ps = KTUtil.data(element).get('ps')) {
            if (options.resetHeightOnDestroy) {
              KTUtil.css(element, 'height', 'auto');
            } else {
              KTUtil.css(element, 'overflow', 'auto');
              if (height > 0) {
                KTUtil.css(element, 'height', height + 'px');
              }
            }
            ps.destroy();
            ps = KTUtil.data(element).remove('ps');
          } else if (height > 0) {
            KTUtil.css(element, 'overflow', 'auto');
            KTUtil.css(element, 'height', height + 'px');
          }
          return;
        }
        if (height > 0) {
          KTUtil.css(element, 'height', height + 'px');
        }
        if (options.desktopNativeScroll) {
          KTUtil.css(element, 'overflow', 'auto');
          return;
        }

        // Init scroll
        KTUtil.css(element, 'overflow', 'hidden');
        if (ps = KTUtil.data(element).get('ps')) {
          ps.update();
        } else {
          KTUtil.addClass(element, 'kt-scroll');
          ps = new PerfectScrollbar(element, {
            wheelSpeed: 0.5,
            swipeEasing: true,
            wheelPropagation: options.windowScroll === false ? false : true,
            minScrollbarLength: 40,
            maxScrollbarLength: 300,
            suppressScrollX: KTUtil.attr(element, 'data-scroll-x') != 'true' ? true : false
          });
          KTUtil.data(element).set('ps', ps);
        }

        // Remember scroll position in cookie
        var uid = KTUtil.attr(element, 'id');
        if (options.rememberPosition === true && Cookies && uid) {
          if (Cookies.get(uid)) {
            var pos = parseInt(Cookies.get(uid));
            if (pos > 0) {
              element.scrollTop = pos;
            }
          }
          element.addEventListener('ps-scroll-y', function () {
            Cookies.set(uid, element.scrollTop);
          });
        }
      }

      // Init
      init();

      // Handle window resize
      if (options.handleWindowResize) {
        KTUtil.addResizeHandler(function () {
          init();
        });
      }
    },
    scrollUpdate: function scrollUpdate(element) {
      var ps;
      if (ps = KTUtil.data(element).get('ps')) {
        ps.update();
      }
    },
    scrollUpdateAll: function scrollUpdateAll(parent) {
      var scrollers = KTUtil.findAll(parent, '.ps');
      for (var i = 0, len = scrollers.length; i < len; i++) {
        KTUtil.scrollerUpdate(scrollers[i]);
      }
    },
    scrollDestroy: function scrollDestroy(element) {
      var ps;
      if (ps = KTUtil.data(element).get('ps')) {
        ps.destroy();
        ps = KTUtil.data(element).remove('ps');
      }
    },
    setHTML: function setHTML(el, html) {
      if (KTUtil.get(el)) {
        KTUtil.get(el).innerHTML = html;
      }
    },
    getHTML: function getHTML(el) {
      if (KTUtil.get(el)) {
        return KTUtil.get(el).innerHTML;
      }
    }
  };
}();

// Initialize KTUtil class on document ready
KTUtil.ready(function () {
  KTUtil.init();
});

// CSS3 Transitions only after page load(.kt-page-loading class added to body tag and remove with JS on page load)
window.onload = function () {
  KTUtil.removeClass(KTUtil.get('body'), 'kt-page--loading');
};
// plugin setup
var KTAvatar = function KTAvatar(elementId, options) {
  // Main object
  var the = this;
  var init = false;

  // Get element object
  var element = KTUtil.get(elementId);
  var body = KTUtil.get('body');
  if (!element) {
    return;
  }

  // Default options
  var defaultOptions = {};

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Construct
     */

    construct: function construct(options) {
      if (KTUtil.data(element).has('avatar')) {
        the = KTUtil.data(element).get('avatar');
      } else {
        // reset menu
        Plugin.init(options);

        // build menu
        Plugin.build();
        KTUtil.data(element).set('avatar', the);
      }
      return the;
    },
    /**
     * Init avatar
     */
    init: function init(options) {
      the.element = element;
      the.events = [];
      the.input = KTUtil.find(element, 'input[type="file"]');
      the.holder = KTUtil.find(element, '.kt-avatar__holder');
      the.cancel = KTUtil.find(element, '.kt-avatar__cancel');
      the.src = KTUtil.css(the.holder, 'backgroundImage');

      // merge default and user defined options
      the.options = KTUtil.deepExtend({}, defaultOptions, options);
    },
    /**
     * Build Form Wizard
     */
    build: function build() {
      // Handle avatar change
      KTUtil.addEvent(the.input, 'change', function (e) {
        e.preventDefault();
        if (the.input && the.input.files && the.input.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            KTUtil.css(the.holder, 'background-image', 'url(' + e.target.result + ')');
          };
          reader.readAsDataURL(the.input.files[0]);
          KTUtil.addClass(the.element, 'kt-avatar--changed');
        }
      });

      // Handle avatar cancel
      KTUtil.addEvent(the.cancel, 'click', function (e) {
        e.preventDefault();
        KTUtil.removeClass(the.element, 'kt-avatar--changed');
        KTUtil.css(the.holder, 'background-image', the.src);
        the.input.value = "";
      });
    },
    /**
     * Trigger events
     */
    eventTrigger: function eventTrigger(name) {
      //KTUtil.triggerCustomEvent(name);
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];
        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              event.handler.call(this, the);
            }
          } else {
            event.handler.call(this, the);
          }
        }
      }
    },
    addEvent: function addEvent(name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
      return the;
    }
  };

  //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options 
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };

  /**
   * Attach event
   */
  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };

  /**
   * Attach event that will be fired once
   */
  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  };

  // Construct plugin
  Plugin.construct.apply(the, [options]);
  return the;
};
"use strict";

// plugin setup
var KTDialog = function KTDialog(options) {
  // Main object
  var the = this;

  // Get element object
  var element;
  var body = KTUtil.get('body');

  // Default options
  var defaultOptions = {
    'placement': 'top center',
    'type': 'loader',
    'width': 100,
    'state': 'default',
    'message': 'Loading...'
  };

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Construct
     */

    construct: function construct(options) {
      Plugin.init(options);
      return the;
    },
    /**
     * Handles subtoggle click toggle
     */
    init: function init(options) {
      the.events = [];

      // merge default and user defined options
      the.options = KTUtil.deepExtend({}, defaultOptions, options);
      the.state = false;
    },
    /**
     * Show dialog
     */
    show: function show() {
      Plugin.eventTrigger('show');
      element = document.createElement("DIV");
      KTUtil.setHTML(element, the.options.message);
      KTUtil.addClass(element, 'kt-dialog kt-dialog--shown');
      KTUtil.addClass(element, 'kt-dialog--' + the.options.state);
      KTUtil.addClass(element, 'kt-dialog--' + the.options.type);
      if (the.options.placement == 'top center') {
        KTUtil.addClass(element, 'kt-dialog--top-center');
      }
      body.appendChild(element);
      the.state = 'shown';
      Plugin.eventTrigger('shown');
      return the;
    },
    /**
     * Hide dialog
     */
    hide: function hide() {
      if (element) {
        Plugin.eventTrigger('hide');
        element.remove();
        the.state = 'hidden';
        Plugin.eventTrigger('hidden');
      }
      return the;
    },
    /**
     * Trigger events
     */
    eventTrigger: function eventTrigger(name) {
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];
        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              event.handler.call(this, the);
            }
          } else {
            event.handler.call(this, the);
          }
        }
      }
    },
    addEvent: function addEvent(name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
      return the;
    }
  };

  //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options 
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };

  /**
   * Check shown state 
   */
  the.shown = function () {
    return the.state == 'shown';
  };

  /**
   * Check hidden state 
   */
  the.hidden = function () {
    return the.state == 'hidden';
  };

  /**
   * Show dialog 
   */
  the.show = function () {
    return Plugin.show();
  };

  /**
   * Hide dialog
   */
  the.hide = function () {
    return Plugin.hide();
  };

  /**
   * Attach event
   * @returns {KTToggle}
   */
  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };

  /**
   * Attach event that will be fired once
   * @returns {KTToggle}
   */
  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  };

  // Construct plugin
  Plugin.construct.apply(the, [options]);
  return the;
};
"use strict";
var KTHeader = function KTHeader(elementId, options) {
  // Main object
  var the = this;
  var init = false;

  // Get element object
  var element = KTUtil.get(elementId);
  var body = KTUtil.get('body');
  if (element === undefined) {
    return;
  }

  // Default options
  var defaultOptions = {
    classic: false,
    offset: {
      mobile: 150,
      desktop: 200
    },
    minimize: {
      mobile: false,
      desktop: false
    }
  };

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Run plugin
     * @returns {KTHeader}
     */
    construct: function construct(options) {
      if (KTUtil.data(element).has('header')) {
        the = KTUtil.data(element).get('header');
      } else {
        // reset header
        Plugin.init(options);

        // build header
        Plugin.build();
        KTUtil.data(element).set('header', the);
      }
      return the;
    },
    /**
     * Handles subheader click toggle
     * @returns {KTHeader}
     */
    init: function init(options) {
      the.events = [];

      // merge default and user defined options
      the.options = KTUtil.deepExtend({}, defaultOptions, options);
    },
    /**
     * Reset header
     * @returns {KTHeader}
     */
    build: function build() {
      var lastScrollTop = 0;
      var eventTriggerState = true;
      var viewportHeight = KTUtil.getViewPort().height;
      if (the.options.minimize.mobile === false && the.options.minimize.desktop === false) {
        return;
      }
      window.addEventListener('scroll', function () {
        var offset = 0,
          on,
          off,
          st;
        if (KTUtil.isInResponsiveRange('desktop')) {
          offset = the.options.offset.desktop;
          on = the.options.minimize.desktop.on;
          off = the.options.minimize.desktop.off;
        } else if (KTUtil.isInResponsiveRange('tablet-and-mobile')) {
          offset = the.options.offset.mobile;
          on = the.options.minimize.mobile.on;
          off = the.options.minimize.mobile.off;
        }
        st = window.pageYOffset;
        if (KTUtil.isInResponsiveRange('tablet-and-mobile') && the.options.classic && the.options.classic.mobile || KTUtil.isInResponsiveRange('desktop') && the.options.classic && the.options.classic.desktop) {
          if (st > offset) {
            // down scroll mode
            KTUtil.addClass(body, on);
            KTUtil.removeClass(body, off);
            if (eventTriggerState) {
              Plugin.eventTrigger('minimizeOn', the);
              eventTriggerState = false;
            }
          } else {
            // back scroll mode
            KTUtil.addClass(body, off);
            KTUtil.removeClass(body, on);
            if (eventTriggerState == false) {
              Plugin.eventTrigger('minimizeOff', the);
              eventTriggerState = true;
            }
          }
        } else {
          if (st > offset && lastScrollTop < st) {
            // down scroll mode
            KTUtil.addClass(body, on);
            KTUtil.removeClass(body, off);
            if (eventTriggerState) {
              Plugin.eventTrigger('minimizeOn', the);
              eventTriggerState = false;
            }
          } else {
            // back scroll mode
            KTUtil.addClass(body, off);
            KTUtil.removeClass(body, on);
            if (eventTriggerState == false) {
              Plugin.eventTrigger('minimizeOff', the);
              eventTriggerState = true;
            }
          }
          lastScrollTop = st;
        }
      });
    },
    /**
     * Trigger events
     */
    eventTrigger: function eventTrigger(name, args) {
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];
        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              event.handler.call(this, the, args);
            }
          } else {
            event.handler.call(this, the, args);
          }
        }
      }
    },
    addEvent: function addEvent(name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
    }
  };

  //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options 
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };

  /**
   * Register event
   */
  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };

  ///////////////////////////////
  // ** Plugin Construction ** //
  ///////////////////////////////

  // Run plugin
  Plugin.construct.apply(the, [options]);

  // Init done
  init = true;

  // Return plugin instance
  return the;
};
"use strict";
var KTMenu = function KTMenu(elementId, options) {
  // Main object
  var the = this;
  var init = false;

  // Get element object
  var element = KTUtil.get(elementId);
  var body = KTUtil.get('body');
  if (!element) {
    return;
  }

  // Default options
  var defaultOptions = {
    // scrollable area with Perfect Scroll
    scroll: {
      rememberPosition: false
    },
    // accordion submenu mode
    accordion: {
      slideSpeed: 200,
      // accordion toggle slide speed in milliseconds
      autoScroll: false,
      // enable auto scrolling(focus) to the clicked menu item
      autoScrollSpeed: 1200,
      expandAll: true // allow having multiple expanded accordions in the menu
    },
    // dropdown submenu mode
    dropdown: {
      timeout: 500 // timeout in milliseconds to show and hide the hoverable submenu dropdown
    }
  };

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Run plugin
     * @returns {KTMenu}
     */
    construct: function construct(options) {
      if (KTUtil.data(element).has('menu')) {
        the = KTUtil.data(element).get('menu');
      } else {
        // reset menu
        Plugin.init(options);

        // reset menu
        Plugin.reset();

        // build menu
        Plugin.build();
        KTUtil.data(element).set('menu', the);
      }
      return the;
    },
    /**
     * Handles submenu click toggle
     * @returns {KTMenu}
     */
    init: function init(options) {
      the.events = [];
      the.eventHandlers = {};

      // merge default and user defined options
      the.options = KTUtil.deepExtend({}, defaultOptions, options);

      // pause menu
      the.pauseDropdownHoverTime = 0;
      the.uid = KTUtil.getUniqueID();
    },
    update: function update(options) {
      // merge default and user defined options
      the.options = KTUtil.deepExtend({}, defaultOptions, options);

      // pause menu
      the.pauseDropdownHoverTime = 0;

      // reset menu
      Plugin.reset();
      the.eventHandlers = {};

      // build menu
      Plugin.build();
      KTUtil.data(element).set('menu', the);
    },
    reload: function reload() {
      // reset menu
      Plugin.reset();

      // build menu
      Plugin.build();

      // reset submenu props
      Plugin.resetSubmenuProps();
    },
    /**
     * Reset menu
     * @returns {KTMenu}
     */
    build: function build() {
      // General accordion submenu toggle
      the.eventHandlers['event_1'] = KTUtil.on(element, '.kt-menu__toggle', 'click', Plugin.handleSubmenuAccordion);

      // Dropdown mode(hoverable)
      if (Plugin.getSubmenuMode() === 'dropdown' || Plugin.isConditionalSubmenuDropdown()) {
        // dropdown submenu - hover toggle
        the.eventHandlers['event_2'] = KTUtil.on(element, '[data-ktmenu-submenu-toggle="hover"]', 'mouseover', Plugin.handleSubmenuDrodownHoverEnter);
        the.eventHandlers['event_3'] = KTUtil.on(element, '[data-ktmenu-submenu-toggle="hover"]', 'mouseout', Plugin.handleSubmenuDrodownHoverExit);

        // dropdown submenu - click toggle
        the.eventHandlers['event_4'] = KTUtil.on(element, '[data-ktmenu-submenu-toggle="click"] > .kt-menu__toggle, [data-ktmenu-submenu-toggle="click"] > .kt-menu__link .kt-menu__toggle', 'click', Plugin.handleSubmenuDropdownClick);
        the.eventHandlers['event_5'] = KTUtil.on(element, '[data-ktmenu-submenu-toggle="tab"] > .kt-menu__toggle, [data-ktmenu-submenu-toggle="tab"] > .kt-menu__link .kt-menu__toggle', 'click', Plugin.handleSubmenuDropdownTabClick);
      }

      // handle link click
      the.eventHandlers['event_6'] = KTUtil.on(element, '.kt-menu__item > .kt-menu__link:not(.kt-menu__toggle):not(.kt-menu__link--toggle-skip)', 'click', Plugin.handleLinkClick);

      // Init scrollable menu
      if (the.options.scroll && the.options.scroll.height) {
        Plugin.scrollInit();
      }
    },
    /**
     * Reset menu
     * @returns {KTMenu}
     */
    reset: function reset() {
      KTUtil.off(element, 'click', the.eventHandlers['event_1']);

      // dropdown submenu - hover toggle
      KTUtil.off(element, 'mouseover', the.eventHandlers['event_2']);
      KTUtil.off(element, 'mouseout', the.eventHandlers['event_3']);

      // dropdown submenu - click toggle
      KTUtil.off(element, 'click', the.eventHandlers['event_4']);
      KTUtil.off(element, 'click', the.eventHandlers['event_5']);

      // handle link click
      KTUtil.off(element, 'click', the.eventHandlers['event_6']);
    },
    /**
     * Init scroll menu
     *
    */
    scrollInit: function scrollInit() {
      if (the.options.scroll && the.options.scroll.height) {
        KTUtil.scrollDestroy(element);
        KTUtil.scrollInit(element, {
          disableForMobile: true,
          resetHeightOnDestroy: true,
          handleWindowResize: true,
          height: the.options.scroll.height,
          rememberPosition: the.options.scroll.rememberPosition
        });
      } else {
        KTUtil.scrollDestroy(element);
      }
    },
    /**
     * Update scroll menu
    */
    scrollUpdate: function scrollUpdate() {
      if (the.options.scroll && the.options.scroll.height) {
        KTUtil.scrollUpdate(element);
      }
    },
    /**
     * Scroll top
    */
    scrollTop: function scrollTop() {
      if (the.options.scroll && the.options.scroll.height) {
        KTUtil.scrollTop(element);
      }
    },
    /**
     * Get submenu mode for current breakpoint and menu state
     * @returns {KTMenu}
     */
    getSubmenuMode: function getSubmenuMode(el) {
      if (KTUtil.isInResponsiveRange('desktop')) {
        if (el && KTUtil.hasAttr(el, 'data-ktmenu-submenu-toggle') && KTUtil.attr(el, 'data-ktmenu-submenu-toggle') == 'hover') {
          return 'dropdown';
        }
        if (KTUtil.isset(the.options.submenu, 'desktop.state.body')) {
          if (KTUtil.hasClasses(body, the.options.submenu.desktop.state.body)) {
            return the.options.submenu.desktop.state.mode;
          } else {
            return the.options.submenu.desktop["default"];
          }
        } else if (KTUtil.isset(the.options.submenu, 'desktop')) {
          return the.options.submenu.desktop;
        }
      } else if (KTUtil.isInResponsiveRange('tablet') && KTUtil.isset(the.options.submenu, 'tablet')) {
        return the.options.submenu.tablet;
      } else if (KTUtil.isInResponsiveRange('mobile') && KTUtil.isset(the.options.submenu, 'mobile')) {
        return the.options.submenu.mobile;
      } else {
        return false;
      }
    },
    /**
     * Get submenu mode for current breakpoint and menu state
     * @returns {KTMenu}
     */
    isConditionalSubmenuDropdown: function isConditionalSubmenuDropdown() {
      if (KTUtil.isInResponsiveRange('desktop') && KTUtil.isset(the.options.submenu, 'desktop.state.body')) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * Reset submenu attributes
     * @returns {KTMenu}
     */
    resetSubmenuProps: function resetSubmenuProps(e) {
      var submenus = KTUtil.findAll(element, '.kt-menu__submenu');
      if (submenus) {
        for (var i = 0, len = submenus.length; i < len; i++) {
          KTUtil.css(submenus[0], 'display', '');
          KTUtil.css(submenus[0], 'overflow', '');
        }
      }
    },
    /**
     * Handles submenu hover toggle
     * @returns {KTMenu}
     */
    handleSubmenuDrodownHoverEnter: function handleSubmenuDrodownHoverEnter(e) {
      if (Plugin.getSubmenuMode(this) === 'accordion') {
        return;
      }
      if (the.resumeDropdownHover() === false) {
        return;
      }
      var item = this;
      if (item.getAttribute('data-hover') == '1') {
        item.removeAttribute('data-hover');
        clearTimeout(item.getAttribute('data-timeout'));
        item.removeAttribute('data-timeout');
        //Plugin.hideSubmenuDropdown(item, false);
      }

      // console.log('test!');

      Plugin.showSubmenuDropdown(item);
    },
    /**
     * Handles submenu hover toggle
     * @returns {KTMenu}
     */
    handleSubmenuDrodownHoverExit: function handleSubmenuDrodownHoverExit(e) {
      if (the.resumeDropdownHover() === false) {
        return;
      }
      if (Plugin.getSubmenuMode(this) === 'accordion') {
        return;
      }
      var item = this;
      var time = the.options.dropdown.timeout;
      var timeout = setTimeout(function () {
        if (item.getAttribute('data-hover') == '1') {
          Plugin.hideSubmenuDropdown(item, true);
        }
      }, time);
      item.setAttribute('data-hover', '1');
      item.setAttribute('data-timeout', timeout);
    },
    /**
     * Handles submenu click toggle
     * @returns {KTMenu}
     */
    handleSubmenuDropdownClick: function handleSubmenuDropdownClick(e) {
      if (Plugin.getSubmenuMode(this) === 'accordion') {
        return;
      }
      var item = this.closest('.kt-menu__item');
      if (item.getAttribute('data-ktmenu-submenu-mode') == 'accordion') {
        return;
      }
      if (KTUtil.hasClass(item, 'kt-menu__item--hover') === false) {
        KTUtil.addClass(item, 'kt-menu__item--open-dropdown');
        Plugin.showSubmenuDropdown(item);
      } else {
        KTUtil.removeClass(item, 'kt-menu__item--open-dropdown');
        Plugin.hideSubmenuDropdown(item, true);
      }
      e.preventDefault();
    },
    /**
     * Handles tab click toggle
     * @returns {KTMenu}
     */
    handleSubmenuDropdownTabClick: function handleSubmenuDropdownTabClick(e) {
      if (Plugin.getSubmenuMode(this) === 'accordion') {
        return;
      }
      var item = this.closest('.kt-menu__item');
      if (item.getAttribute('data-ktmenu-submenu-mode') == 'accordion') {
        return;
      }
      if (KTUtil.hasClass(item, 'kt-menu__item--hover') == false) {
        KTUtil.addClass(item, 'kt-menu__item--open-dropdown');
        Plugin.showSubmenuDropdown(item);
      }
      e.preventDefault();
    },
    /**
     * Handles link click
     * @returns {KTMenu}
     */
    handleLinkClick: function handleLinkClick(e) {
      var submenu = this.closest('.kt-menu__item.kt-menu__item--submenu'); //
      if (submenu && Plugin.getSubmenuMode(submenu) === 'dropdown') {
        Plugin.hideSubmenuDropdowns();
      }
    },
    /**
     * Handles submenu dropdown close on link click
     * @returns {KTMenu}
     */
    handleSubmenuDropdownClose: function handleSubmenuDropdownClose(e, el) {
      // exit if its not submenu dropdown mode
      if (Plugin.getSubmenuMode(el) === 'accordion') {
        return;
      }
      var shown = element.querySelectorAll('.kt-menu__item.kt-menu__item--submenu.kt-menu__item--hover:not(.kt-menu__item--tabs)');

      // check if currently clicked link's parent item ha
      if (shown.length > 0 && KTUtil.hasClass(el, 'kt-menu__toggle') === false && el.querySelectorAll('.kt-menu__toggle').length === 0) {
        // close opened dropdown menus
        for (var i = 0, len = shown.length; i < len; i++) {
          Plugin.hideSubmenuDropdown(shown[0], true);
        }
      }
    },
    /**
     * helper functions
     * @returns {KTMenu}
     */
    handleSubmenuAccordion: function handleSubmenuAccordion(e, el) {
      var query;
      var item = el ? el : this;
      if (Plugin.getSubmenuMode(el) === 'dropdown' && (query = item.closest('.kt-menu__item'))) {
        if (query.getAttribute('data-ktmenu-submenu-mode') != 'accordion') {
          e.preventDefault();
          return;
        }
      }
      var li = item.closest('.kt-menu__item');
      var submenu = KTUtil.child(li, '.kt-menu__submenu, .kt-menu__inner');
      if (KTUtil.hasClass(item.closest('.kt-menu__item'), 'kt-menu__item--open-always')) {
        return;
      }
      if (li && submenu) {
        e.preventDefault();
        var speed = the.options.accordion.slideSpeed;
        var hasClosables = false;
        if (KTUtil.hasClass(li, 'kt-menu__item--open') === false) {
          // hide other accordions                    
          if (the.options.accordion.expandAll === false) {
            var subnav = item.closest('.kt-menu__nav, .kt-menu__subnav');
            var closables = KTUtil.children(subnav, '.kt-menu__item.kt-menu__item--open.kt-menu__item--submenu:not(.kt-menu__item--here):not(.kt-menu__item--open-always)');
            if (subnav && closables) {
              for (var i = 0, len = closables.length; i < len; i++) {
                var el_ = closables[0];
                var submenu_ = KTUtil.child(el_, '.kt-menu__submenu');
                if (submenu_) {
                  KTUtil.slideUp(submenu_, speed, function () {
                    Plugin.scrollUpdate();
                    KTUtil.removeClass(el_, 'kt-menu__item--open');
                  });
                }
              }
            }
          }
          KTUtil.slideDown(submenu, speed, function () {
            Plugin.scrollToItem(item);
            Plugin.scrollUpdate();
            Plugin.eventTrigger('submenuToggle', submenu);
          });
          KTUtil.addClass(li, 'kt-menu__item--open');
        } else {
          KTUtil.slideUp(submenu, speed, function () {
            Plugin.scrollToItem(item);
            Plugin.eventTrigger('submenuToggle', submenu);
          });
          KTUtil.removeClass(li, 'kt-menu__item--open');
        }
      }
    },
    /**
     * scroll to item function
     * @returns {KTMenu}
     */
    scrollToItem: function scrollToItem(item) {
      // handle auto scroll for accordion submenus
      if (KTUtil.isInResponsiveRange('desktop') && the.options.accordion.autoScroll && element.getAttribute('data-ktmenu-scroll') !== '1') {
        KTUtil.scrollTo(item, the.options.accordion.autoScrollSpeed);
      }
    },
    /**
     * Hide submenu dropdown
     * @returns {KTMenu}
     */
    hideSubmenuDropdown: function hideSubmenuDropdown(item, classAlso) {
      // remove submenu activation class
      if (classAlso) {
        KTUtil.removeClass(item, 'kt-menu__item--hover');
        KTUtil.removeClass(item, 'kt-menu__item--active-tab');
      }

      // clear timeout
      item.removeAttribute('data-hover');
      if (item.getAttribute('data-ktmenu-dropdown-toggle-class')) {
        KTUtil.removeClass(body, item.getAttribute('data-ktmenu-dropdown-toggle-class'));
      }
      var timeout = item.getAttribute('data-timeout');
      item.removeAttribute('data-timeout');
      clearTimeout(timeout);
    },
    /**
     * Hide submenu dropdowns
     * @returns {KTMenu}
     */
    hideSubmenuDropdowns: function hideSubmenuDropdowns() {
      var items;
      if (items = element.querySelectorAll('.kt-menu__item--submenu.kt-menu__item--hover:not(.kt-menu__item--tabs):not([data-ktmenu-submenu-toggle="tab"])')) {
        for (var j = 0, cnt = items.length; j < cnt; j++) {
          Plugin.hideSubmenuDropdown(items[j], true);
        }
      }
    },
    /**
     * helper functions
     * @returns {KTMenu}
     */
    showSubmenuDropdown: function showSubmenuDropdown(item) {
      // close active submenus
      var list = element.querySelectorAll('.kt-menu__item--submenu.kt-menu__item--hover, .kt-menu__item--submenu.kt-menu__item--active-tab');
      if (list) {
        for (var i = 0, len = list.length; i < len; i++) {
          var el = list[i];
          if (item !== el && el.contains(item) === false && item.contains(el) === false) {
            Plugin.hideSubmenuDropdown(el, true);
          }
        }
      }

      // add submenu activation class
      KTUtil.addClass(item, 'kt-menu__item--hover');
      if (item.getAttribute('data-ktmenu-dropdown-toggle-class')) {
        KTUtil.addClass(body, item.getAttribute('data-ktmenu-dropdown-toggle-class'));
      }
    },
    /**
     * Handles submenu slide toggle
     * @returns {KTMenu}
     */
    createSubmenuDropdownClickDropoff: function createSubmenuDropdownClickDropoff(el) {
      var query;
      var zIndex = (query = KTUtil.child(el, '.kt-menu__submenu') ? KTUtil.css(query, 'z-index') : 0) - 1;
      var dropoff = document.createElement('<div class="kt-menu__dropoff" style="background: transparent; position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: ' + zIndex + '"></div>');
      body.appendChild(dropoff);
      KTUtil.addEvent(dropoff, 'click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        KTUtil.remove(this);
        Plugin.hideSubmenuDropdown(el, true);
      });
    },
    /**
     * Handles submenu hover toggle
     * @returns {KTMenu}
     */
    pauseDropdownHover: function pauseDropdownHover(time) {
      var date = new Date();
      the.pauseDropdownHoverTime = date.getTime() + time;
    },
    /**
     * Handles submenu hover toggle
     * @returns {KTMenu}
     */
    resumeDropdownHover: function resumeDropdownHover() {
      var date = new Date();
      return date.getTime() > the.pauseDropdownHoverTime ? true : false;
    },
    /**
     * Reset menu's current active item
     * @returns {KTMenu}
     */
    resetActiveItem: function resetActiveItem(item) {
      var list;
      var parents;
      list = element.querySelectorAll('.kt-menu__item--active');
      for (var i = 0, len = list.length; i < len; i++) {
        var el = list[0];
        KTUtil.removeClass(el, 'kt-menu__item--active');
        KTUtil.hide(KTUtil.child(el, '.kt-menu__submenu'));
        parents = KTUtil.parents(el, '.kt-menu__item--submenu') || [];
        for (var i_ = 0, len_ = parents.length; i_ < len_; i_++) {
          var el_ = parents[i];
          KTUtil.removeClass(el_, 'kt-menu__item--open');
          KTUtil.hide(KTUtil.child(el_, '.kt-menu__submenu'));
        }
      }

      // close open submenus
      if (the.options.accordion.expandAll === false) {
        if (list = element.querySelectorAll('.kt-menu__item--open')) {
          for (var i = 0, len = list.length; i < len; i++) {
            KTUtil.removeClass(parents[0], 'kt-menu__item--open');
          }
        }
      }
    },
    /**
     * Sets menu's active item
     * @returns {KTMenu}
     */
    setActiveItem: function setActiveItem(item) {
      // reset current active item
      Plugin.resetActiveItem();
      var parents = KTUtil.parents(item, '.kt-menu__item--submenu') || [];
      for (var i = 0, len = parents.length; i < len; i++) {
        KTUtil.addClass(KTUtil.get(parents[i]), 'kt-menu__item--open');
      }
      KTUtil.addClass(KTUtil.get(item), 'kt-menu__item--active');
    },
    /**
     * Returns page breadcrumbs for the menu's active item
     * @returns {KTMenu}
     */
    getBreadcrumbs: function getBreadcrumbs(item) {
      var query;
      var breadcrumbs = [];
      var link = KTUtil.child(item, '.kt-menu__link');
      breadcrumbs.push({
        text: query = KTUtil.child(link, '.kt-menu__link-text') ? query.innerHTML : '',
        title: link.getAttribute('title'),
        href: link.getAttribute('href')
      });
      var parents = KTUtil.parents(item, '.kt-menu__item--submenu');
      for (var i = 0, len = parents.length; i < len; i++) {
        var submenuLink = KTUtil.child(parents[i], '.kt-menu__link');
        breadcrumbs.push({
          text: query = KTUtil.child(submenuLink, '.kt-menu__link-text') ? query.innerHTML : '',
          title: submenuLink.getAttribute('title'),
          href: submenuLink.getAttribute('href')
        });
      }
      return breadcrumbs.reverse();
    },
    /**
     * Returns page title for the menu's active item
     * @returns {KTMenu}
     */
    getPageTitle: function getPageTitle(item) {
      var query;
      return query = KTUtil.child(item, '.kt-menu__link-text') ? query.innerHTML : '';
    },
    /**
     * Trigger events
     */
    eventTrigger: function eventTrigger(name, args) {
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];
        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              event.handler.call(this, the, args);
            }
          } else {
            event.handler.call(this, the, args);
          }
        }
      }
    },
    addEvent: function addEvent(name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
    },
    removeEvent: function removeEvent(name) {
      if (the.events[name]) {
        delete the.events[name];
      }
    }
  };

  //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options 
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };

  /**
   * Update scroll
   */
  the.scrollUpdate = function () {
    return Plugin.scrollUpdate();
  };

  /**
   * Re-init scroll
   */
  the.scrollReInit = function () {
    return Plugin.scrollInit();
  };

  /**
   * Scroll top
   */
  the.scrollTop = function () {
    return Plugin.scrollTop();
  };

  /**
   * Set active menu item
   */
  the.setActiveItem = function (item) {
    return Plugin.setActiveItem(item);
  };
  the.reload = function () {
    return Plugin.reload();
  };
  the.update = function (options) {
    return Plugin.update(options);
  };

  /**
   * Set breadcrumb for menu item
   */
  the.getBreadcrumbs = function (item) {
    return Plugin.getBreadcrumbs(item);
  };

  /**
   * Set page title for menu item
   */
  the.getPageTitle = function (item) {
    return Plugin.getPageTitle(item);
  };

  /**
   * Get submenu mode
   */
  the.getSubmenuMode = function (el) {
    return Plugin.getSubmenuMode(el);
  };

  /**
   * Hide dropdown
   * @returns {Object}
   */
  the.hideDropdown = function (item) {
    Plugin.hideSubmenuDropdown(item, true);
  };

  /**
   * Hide dropdowns
   * @returns {Object}
   */
  the.hideDropdowns = function () {
    Plugin.hideSubmenuDropdowns();
  };

  /**
   * Disable menu for given time
   * @returns {Object}
   */
  the.pauseDropdownHover = function (time) {
    Plugin.pauseDropdownHover(time);
  };

  /**
   * Disable menu for given time
   * @returns {Object}
   */
  the.resumeDropdownHover = function () {
    return Plugin.resumeDropdownHover();
  };

  /**
   * Register event
   */
  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };
  the.off = function (name) {
    return Plugin.removeEvent(name);
  };
  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  };

  ///////////////////////////////
  // ** Plugin Construction ** //
  ///////////////////////////////

  // Run plugin
  Plugin.construct.apply(the, [options]);

  // Handle plugin on window resize
  KTUtil.addResizeHandler(function () {
    if (init) {
      the.reload();
    }
  });

  // Init done
  init = true;

  // Return plugin instance
  return the;
};

// Plugin global lazy initialization
document.addEventListener("click", function (e) {
  var body = KTUtil.get('body');
  var query;
  if (query = body.querySelectorAll('.kt-menu__nav .kt-menu__item.kt-menu__item--submenu.kt-menu__item--hover:not(.kt-menu__item--tabs)[data-ktmenu-submenu-toggle="click"]')) {
    for (var i = 0, len = query.length; i < len; i++) {
      var element = query[i].closest('.kt-menu__nav').parentNode;
      if (element) {
        var the = KTUtil.data(element).get('menu');
        if (!the) {
          break;
        }
        if (!the || the.getSubmenuMode() !== 'dropdown') {
          break;
        }
        if (e.target !== element && element.contains(e.target) === false) {
          the.hideDropdowns();
        }
      }
    }
  }
});
"use strict";
var KTOffcanvas = function KTOffcanvas(elementId, options) {
  // Main object
  var the = this;
  var init = false;

  // Get element object
  var element = KTUtil.get(elementId);
  var body = KTUtil.get('body');
  if (!element) {
    return;
  }

  // Default options
  var defaultOptions = {};

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    construct: function construct(options) {
      if (KTUtil.data(element).has('offcanvas')) {
        the = KTUtil.data(element).get('offcanvas');
      } else {
        // reset offcanvas
        Plugin.init(options);

        // build offcanvas
        Plugin.build();
        KTUtil.data(element).set('offcanvas', the);
      }
      return the;
    },
    init: function init(options) {
      the.events = [];

      // merge default and user defined options
      the.options = KTUtil.deepExtend({}, defaultOptions, options);
      the.overlay;
      the.classBase = the.options.baseClass;
      the.classShown = the.classBase + '--on';
      the.classOverlay = the.classBase + '-overlay';
      the.state = KTUtil.hasClass(element, the.classShown) ? 'shown' : 'hidden';
    },
    build: function build() {
      // offcanvas toggle
      if (the.options.toggleBy) {
        if (typeof the.options.toggleBy === 'string') {
          KTUtil.addEvent(the.options.toggleBy, 'click', function (e) {
            e.preventDefault();
            Plugin.toggle();
          });
        } else if (the.options.toggleBy && the.options.toggleBy[0]) {
          if (the.options.toggleBy[0].target) {
            for (var i in the.options.toggleBy) {
              KTUtil.addEvent(the.options.toggleBy[i].target, 'click', function (e) {
                e.preventDefault();
                Plugin.toggle();
              });
            }
          } else {
            for (var i in the.options.toggleBy) {
              KTUtil.addEvent(the.options.toggleBy[i], 'click', function (e) {
                e.preventDefault();
                Plugin.toggle();
              });
            }
          }
        } else if (the.options.toggleBy && the.options.toggleBy.target) {
          KTUtil.addEvent(the.options.toggleBy.target, 'click', function (e) {
            e.preventDefault();
            Plugin.toggle();
          });
        }
      }

      // offcanvas close
      var closeBy = KTUtil.get(the.options.closeBy);
      if (closeBy) {
        KTUtil.addEvent(closeBy, 'click', function (e) {
          e.preventDefault();
          Plugin.hide();
        });
      }

      // Window resize
      KTUtil.addResizeHandler(function () {
        if (parseInt(KTUtil.css(element, 'left')) >= 0 || parseInt(KTUtil.css(element, 'right') >= 0) || KTUtil.css(element, 'position') != 'fixed') {
          KTUtil.css(element, 'opacity', '1');
        }
      });
    },
    isShown: function isShown(target) {
      return the.state == 'shown' ? true : false;
    },
    toggle: function toggle() {
      ;
      Plugin.eventTrigger('toggle');
      if (the.state == 'shown') {
        Plugin.hide(this);
      } else {
        Plugin.show(this);
      }
    },
    show: function show(target) {
      if (the.state == 'shown') {
        return;
      }
      Plugin.eventTrigger('beforeShow');
      Plugin.togglerClass(target, 'show');

      // Offcanvas panel
      KTUtil.addClass(body, the.classShown);
      KTUtil.addClass(element, the.classShown);
      KTUtil.css(element, 'opacity', '1');
      the.state = 'shown';
      if (the.options.overlay) {
        the.overlay = KTUtil.insertAfter(document.createElement('DIV'), element);
        KTUtil.addClass(the.overlay, the.classOverlay);
        KTUtil.addEvent(the.overlay, 'click', function (e) {
          e.stopPropagation();
          e.preventDefault();
          Plugin.hide(target);
        });
      }
      Plugin.eventTrigger('afterShow');
    },
    hide: function hide(target) {
      if (the.state == 'hidden') {
        return;
      }
      Plugin.eventTrigger('beforeHide');
      Plugin.togglerClass(target, 'hide');
      KTUtil.removeClass(body, the.classShown);
      KTUtil.removeClass(element, the.classShown);
      the.state = 'hidden';
      if (the.options.overlay && the.overlay) {
        KTUtil.remove(the.overlay);
      }
      KTUtil.transitionEnd(element, function () {
        KTUtil.css(element, 'opacity', '0');
      });
      Plugin.eventTrigger('afterHide');
    },
    togglerClass: function togglerClass(target, mode) {
      // Toggler
      var id = KTUtil.attr(target, 'id');
      var toggleBy;
      if (the.options.toggleBy && the.options.toggleBy[0] && the.options.toggleBy[0].target) {
        for (var i in the.options.toggleBy) {
          if (the.options.toggleBy[i].target === id) {
            toggleBy = the.options.toggleBy[i];
          }
        }
      } else if (the.options.toggleBy && the.options.toggleBy.target) {
        toggleBy = the.options.toggleBy;
      }
      if (toggleBy) {
        var el = KTUtil.get(toggleBy.target);
        if (mode === 'show') {
          KTUtil.addClass(el, toggleBy.state);
        }
        if (mode === 'hide') {
          KTUtil.removeClass(el, toggleBy.state);
        }
      }
    },
    eventTrigger: function eventTrigger(name, args) {
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];
        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              event.handler.call(this, the, args);
            }
          } else {
            event.handler.call(this, the, args);
          }
        }
      }
    },
    addEvent: function addEvent(name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
    }
  };

  //////////////////////////
  // ** Public Methods ** //
  //////////////////////////
  the.setDefaults = function (options) {
    defaultOptions = options;
  };
  the.isShown = function () {
    return Plugin.isShown();
  };
  the.hide = function () {
    return Plugin.hide();
  };
  the.show = function () {
    return Plugin.show();
  };
  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };
  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  };

  ///////////////////////////////
  // ** Plugin Construction ** //
  ///////////////////////////////

  // Run plugin
  Plugin.construct.apply(the, [options]);

  // Init done
  init = true;

  // Return plugin instance
  return the;
};
"use strict";
// plugin setup
var KTPortlet = function KTPortlet(elementId, options) {
  // Main object
  var the = this;
  var init = false;

  // Get element object
  var element = KTUtil.get(elementId);
  var body = KTUtil.get('body');
  if (!element) {
    return;
  }

  // Default options
  var defaultOptions = {
    bodyToggleSpeed: 400,
    tooltips: true,
    tools: {
      toggle: {
        collapse: 'Collapse',
        expand: 'Expand'
      },
      reload: 'Reload',
      remove: 'Remove',
      fullscreen: {
        on: 'Fullscreen',
        off: 'Exit Fullscreen'
      }
    },
    sticky: {
      offset: 300,
      zIndex: 101
    }
  };

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Construct
     */

    construct: function construct(options) {
      if (KTUtil.data(element).has('portlet')) {
        the = KTUtil.data(element).get('portlet');
      } else {
        // reset menu
        Plugin.init(options);

        // build menu
        Plugin.build();
        KTUtil.data(element).set('portlet', the);
      }
      return the;
    },
    /**
     * Init portlet
     */
    init: function init(options) {
      the.element = element;
      the.events = [];

      // merge default and user defined options
      the.options = KTUtil.deepExtend({}, defaultOptions, options);
      the.head = KTUtil.child(element, '.kt-portlet__head');
      the.foot = KTUtil.child(element, '.kt-portlet__foot');
      if (KTUtil.child(element, '.kt-portlet__body')) {
        the.body = KTUtil.child(element, '.kt-portlet__body');
      } else if (KTUtil.child(element, '.kt-form')) {
        the.body = KTUtil.child(element, '.kt-form');
      }
    },
    /**
     * Build Form Wizard
     */
    build: function build() {
      // Remove
      var remove = KTUtil.find(the.head, '[data-ktportlet-tool=remove]');
      if (remove) {
        KTUtil.addEvent(remove, 'click', function (e) {
          e.preventDefault();
          Plugin.remove();
        });
      }

      // Reload
      var reload = KTUtil.find(the.head, '[data-ktportlet-tool=reload]');
      if (reload) {
        KTUtil.addEvent(reload, 'click', function (e) {
          e.preventDefault();
          Plugin.reload();
        });
      }

      // Toggle
      var toggle = KTUtil.find(the.head, '[data-ktportlet-tool=toggle]');
      if (toggle) {
        KTUtil.addEvent(toggle, 'click', function (e) {
          e.preventDefault();
          Plugin.toggle();
        });
      }

      //== Fullscreen
      var fullscreen = KTUtil.find(the.head, '[data-ktportlet-tool=fullscreen]');
      if (fullscreen) {
        KTUtil.addEvent(fullscreen, 'click', function (e) {
          e.preventDefault();
          Plugin.fullscreen();
        });
      }
      Plugin.setupTooltips();
    },
    /**
     * Enable stickt mode
     */
    initSticky: function initSticky() {
      var lastScrollTop = 0;
      var offset = the.options.sticky.offset;
      if (!the.head) {
        return;
      }
      window.addEventListener('scroll', Plugin.onScrollSticky);
    },
    /**
     * Window scroll handle event for sticky portlet
     */
    onScrollSticky: function onScrollSticky(e) {
      var offset = the.options.sticky.offset;
      if (isNaN(offset)) return;
      var st = document.documentElement.scrollTop;
      if (st >= offset && KTUtil.hasClass(body, 'kt-portlet--sticky') === false) {
        Plugin.eventTrigger('stickyOn');
        KTUtil.addClass(body, 'kt-portlet--sticky');
        KTUtil.addClass(element, 'kt-portlet--sticky');
        Plugin.updateSticky();
      } else if (st * 1.5 <= offset && KTUtil.hasClass(body, 'kt-portlet--sticky')) {
        // back scroll mode
        Plugin.eventTrigger('stickyOff');
        KTUtil.removeClass(body, 'kt-portlet--sticky');
        KTUtil.removeClass(element, 'kt-portlet--sticky');
        Plugin.resetSticky();
      }
    },
    updateSticky: function updateSticky() {
      if (!the.head) {
        return;
      }
      var top;
      if (KTUtil.hasClass(body, 'kt-portlet--sticky')) {
        if (the.options.sticky.position.top instanceof Function) {
          top = parseInt(the.options.sticky.position.top.call());
        } else {
          top = parseInt(the.options.sticky.position.top);
        }
        var left;
        if (the.options.sticky.position.left instanceof Function) {
          left = parseInt(the.options.sticky.position.left.call());
        } else {
          left = parseInt(the.options.sticky.position.left);
        }
        var right;
        if (the.options.sticky.position.right instanceof Function) {
          right = parseInt(the.options.sticky.position.right.call());
        } else {
          right = parseInt(the.options.sticky.position.right);
        }
        KTUtil.css(the.head, 'z-index', the.options.sticky.zIndex);
        KTUtil.css(the.head, 'top', top + 'px');
        KTUtil.css(the.head, 'left', left + 'px');
        KTUtil.css(the.head, 'right', right + 'px');
      }
    },
    resetSticky: function resetSticky() {
      if (!the.head) {
        return;
      }
      if (KTUtil.hasClass(body, 'kt-portlet--sticky') === false) {
        KTUtil.css(the.head, 'z-index', '');
        KTUtil.css(the.head, 'top', '');
        KTUtil.css(the.head, 'left', '');
        KTUtil.css(the.head, 'right', '');
      }
    },
    /**
     * Remove portlet
     */
    remove: function remove() {
      if (Plugin.eventTrigger('beforeRemove') === false) {
        return;
      }
      if (KTUtil.hasClass(body, 'kt-portlet--fullscreen') && KTUtil.hasClass(element, 'kt-portlet--fullscreen')) {
        Plugin.fullscreen('off');
      }
      Plugin.removeTooltips();
      KTUtil.remove(element);
      Plugin.eventTrigger('afterRemove');
    },
    /**
     * Set content
     */
    setContent: function setContent(html) {
      if (html) {
        the.body.innerHTML = html;
      }
    },
    /**
     * Get body
     */
    getBody: function getBody() {
      return the.body;
    },
    /**
     * Get self
     */
    getSelf: function getSelf() {
      return element;
    },
    /**
     * Setup tooltips
     */
    setupTooltips: function setupTooltips() {
      if (the.options.tooltips) {
        var collapsed = KTUtil.hasClass(element, 'kt-portlet--collapse') || KTUtil.hasClass(element, 'kt-portlet--collapsed');
        var fullscreenOn = KTUtil.hasClass(body, 'kt-portlet--fullscreen') && KTUtil.hasClass(element, 'kt-portlet--fullscreen');

        //== Remove
        var remove = KTUtil.find(the.head, '[data-ktportlet-tool=remove]');
        if (remove) {
          var placement = fullscreenOn ? 'bottom' : 'top';
          var tip = new Tooltip(remove, {
            title: the.options.tools.remove,
            placement: placement,
            offset: fullscreenOn ? '0,10px,0,0' : '0,5px',
            trigger: 'hover',
            template: '<div class="tooltip tooltip-portlet tooltip bs-tooltip-' + placement + '" role="tooltip">\
                            <div class="tooltip-arrow arrow"></div>\
                            <div class="tooltip-inner"></div>\
                        </div>'
          });
          KTUtil.data(remove).set('tooltip', tip);
        }

        //== Reload
        var reload = KTUtil.find(the.head, '[data-ktportlet-tool=reload]');
        if (reload) {
          var placement = fullscreenOn ? 'bottom' : 'top';
          var tip = new Tooltip(reload, {
            title: the.options.tools.reload,
            placement: placement,
            offset: fullscreenOn ? '0,10px,0,0' : '0,5px',
            trigger: 'hover',
            template: '<div class="tooltip tooltip-portlet tooltip bs-tooltip-' + placement + '" role="tooltip">\
                            <div class="tooltip-arrow arrow"></div>\
                            <div class="tooltip-inner"></div>\
                        </div>'
          });
          KTUtil.data(reload).set('tooltip', tip);
        }

        //== Toggle
        var toggle = KTUtil.find(the.head, '[data-ktportlet-tool=toggle]');
        if (toggle) {
          var placement = fullscreenOn ? 'bottom' : 'top';
          var tip = new Tooltip(toggle, {
            title: collapsed ? the.options.tools.toggle.expand : the.options.tools.toggle.collapse,
            placement: placement,
            offset: fullscreenOn ? '0,10px,0,0' : '0,5px',
            trigger: 'hover',
            template: '<div class="tooltip tooltip-portlet tooltip bs-tooltip-' + placement + '" role="tooltip">\
                            <div class="tooltip-arrow arrow"></div>\
                            <div class="tooltip-inner"></div>\
                        </div>'
          });
          KTUtil.data(toggle).set('tooltip', tip);
        }

        //== Fullscreen
        var fullscreen = KTUtil.find(the.head, '[data-ktportlet-tool=fullscreen]');
        if (fullscreen) {
          var placement = fullscreenOn ? 'bottom' : 'top';
          var tip = new Tooltip(fullscreen, {
            title: fullscreenOn ? the.options.tools.fullscreen.off : the.options.tools.fullscreen.on,
            placement: placement,
            offset: fullscreenOn ? '0,10px,0,0' : '0,5px',
            trigger: 'hover',
            template: '<div class="tooltip tooltip-portlet tooltip bs-tooltip-' + placement + '" role="tooltip">\
                            <div class="tooltip-arrow arrow"></div>\
                            <div class="tooltip-inner"></div>\
                        </div>'
          });
          KTUtil.data(fullscreen).set('tooltip', tip);
        }
      }
    },
    /**
     * Setup tooltips
     */
    removeTooltips: function removeTooltips() {
      if (the.options.tooltips) {
        //== Remove
        var remove = KTUtil.find(the.head, '[data-ktportlet-tool=remove]');
        if (remove && KTUtil.data(remove).has('tooltip')) {
          KTUtil.data(remove).get('tooltip').dispose();
        }

        //== Reload
        var reload = KTUtil.find(the.head, '[data-ktportlet-tool=reload]');
        if (reload && KTUtil.data(reload).has('tooltip')) {
          KTUtil.data(reload).get('tooltip').dispose();
        }

        //== Toggle
        var toggle = KTUtil.find(the.head, '[data-ktportlet-tool=toggle]');
        if (toggle && KTUtil.data(toggle).has('tooltip')) {
          KTUtil.data(toggle).get('tooltip').dispose();
        }

        //== Fullscreen
        var fullscreen = KTUtil.find(the.head, '[data-ktportlet-tool=fullscreen]');
        if (fullscreen && KTUtil.data(fullscreen).has('tooltip')) {
          KTUtil.data(fullscreen).get('tooltip').dispose();
        }
      }
    },
    /**
     * Reload
     */
    reload: function reload() {
      Plugin.eventTrigger('reload');
    },
    /**
     * Toggle
     */
    toggle: function toggle() {
      if (KTUtil.hasClass(element, 'kt-portlet--collapse') || KTUtil.hasClass(element, 'kt-portlet--collapsed')) {
        Plugin.expand();
      } else {
        Plugin.collapse();
      }
    },
    /**
     * Collapse
     */
    collapse: function collapse() {
      if (Plugin.eventTrigger('beforeCollapse') === false) {
        return;
      }
      KTUtil.slideUp(the.body, the.options.bodyToggleSpeed, function () {
        Plugin.eventTrigger('afterCollapse');
      });
      KTUtil.addClass(element, 'kt-portlet--collapse');
      var toggle = KTUtil.find(the.head, '[data-ktportlet-tool=toggle]');
      if (toggle && KTUtil.data(toggle).has('tooltip')) {
        KTUtil.data(toggle).get('tooltip').updateTitleContent(the.options.tools.toggle.expand);
      }
    },
    /**
     * Expand
     */
    expand: function expand() {
      if (Plugin.eventTrigger('beforeExpand') === false) {
        return;
      }
      KTUtil.slideDown(the.body, the.options.bodyToggleSpeed, function () {
        Plugin.eventTrigger('afterExpand');
      });
      KTUtil.removeClass(element, 'kt-portlet--collapse');
      KTUtil.removeClass(element, 'kt-portlet--collapsed');
      var toggle = KTUtil.find(the.head, '[data-ktportlet-tool=toggle]');
      if (toggle && KTUtil.data(toggle).has('tooltip')) {
        KTUtil.data(toggle).get('tooltip').updateTitleContent(the.options.tools.toggle.collapse);
      }
    },
    /**
     * fullscreen
     */
    fullscreen: function fullscreen(mode) {
      var d = {};
      var speed = 300;
      if (mode === 'off' || KTUtil.hasClass(body, 'kt-portlet--fullscreen') && KTUtil.hasClass(element, 'kt-portlet--fullscreen')) {
        Plugin.eventTrigger('beforeFullscreenOff');
        KTUtil.removeClass(body, 'kt-portlet--fullscreen');
        KTUtil.removeClass(element, 'kt-portlet--fullscreen');
        Plugin.removeTooltips();
        Plugin.setupTooltips();
        if (the.foot) {
          KTUtil.css(the.body, 'margin-bottom', '');
          KTUtil.css(the.foot, 'margin-top', '');
        }
        Plugin.eventTrigger('afterFullscreenOff');
      } else {
        Plugin.eventTrigger('beforeFullscreenOn');
        KTUtil.addClass(element, 'kt-portlet--fullscreen');
        KTUtil.addClass(body, 'kt-portlet--fullscreen');
        Plugin.removeTooltips();
        Plugin.setupTooltips();
        if (the.foot) {
          var height1 = parseInt(KTUtil.css(the.foot, 'height'));
          var height2 = parseInt(KTUtil.css(the.foot, 'height')) + parseInt(KTUtil.css(the.head, 'height'));
          KTUtil.css(the.body, 'margin-bottom', height1 + 'px');
          KTUtil.css(the.foot, 'margin-top', '-' + height2 + 'px');
        }
        Plugin.eventTrigger('afterFullscreenOn');
      }
    },
    /**
     * Trigger events
     */
    eventTrigger: function eventTrigger(name) {
      //KTUtil.triggerCustomEvent(name);
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];
        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              event.handler.call(this, the);
            }
          } else {
            event.handler.call(this, the);
          }
        }
      }
    },
    addEvent: function addEvent(name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
      return the;
    }
  };

  //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };

  /**
   * Remove portlet
   * @returns {KTPortlet}
   */
  the.remove = function () {
    return Plugin.remove(html);
  };

  /**
   * Remove portlet
   * @returns {KTPortlet}
   */
  the.initSticky = function () {
    return Plugin.initSticky();
  };

  /**
   * Remove portlet
   * @returns {KTPortlet}
   */
  the.updateSticky = function () {
    return Plugin.updateSticky();
  };

  /**
   * Remove portlet
   * @returns {KTPortlet}
   */
  the.resetSticky = function () {
    return Plugin.resetSticky();
  };

  /**
   * Destroy sticky portlet
   */
  the.destroySticky = function () {
    Plugin.resetSticky();
    window.removeEventListener('scroll', Plugin.onScrollSticky);
  };

  /**
   * Reload portlet
   * @returns {KTPortlet}
   */
  the.reload = function () {
    return Plugin.reload();
  };

  /**
   * Set portlet content
   * @returns {KTPortlet}
   */
  the.setContent = function (html) {
    return Plugin.setContent(html);
  };

  /**
   * Toggle portlet
   * @returns {KTPortlet}
   */
  the.toggle = function () {
    return Plugin.toggle();
  };

  /**
   * Collapse portlet
   * @returns {KTPortlet}
   */
  the.collapse = function () {
    return Plugin.collapse();
  };

  /**
   * Expand portlet
   * @returns {KTPortlet}
   */
  the.expand = function () {
    return Plugin.expand();
  };

  /**
   * Fullscreen portlet
   * @returns {MPortlet}
   */
  the.fullscreen = function () {
    return Plugin.fullscreen('on');
  };

  /**
   * Fullscreen portlet
   * @returns {MPortlet}
   */
  the.unFullscreen = function () {
    return Plugin.fullscreen('off');
  };

  /**
   * Get portletbody
   * @returns {jQuery}
   */
  the.getBody = function () {
    return Plugin.getBody();
  };

  /**
   * Get portletbody
   * @returns {jQuery}
   */
  the.getSelf = function () {
    return Plugin.getSelf();
  };

  /**
   * Attach event
   */
  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };

  /**
   * Attach event that will be fired once
   */
  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  };

  // Construct plugin
  Plugin.construct.apply(the, [options]);
  return the;
};
"use strict";
var KTScrolltop = function KTScrolltop(elementId, options) {
  // Main object
  var the = this;
  var init = false;

  // Get element object
  var element = KTUtil.get(elementId);
  var body = KTUtil.get('body');
  if (!element) {
    return;
  }

  // Default options
  var defaultOptions = {
    offset: 300,
    speed: 600,
    toggleClass: 'kt-scrolltop--on'
  };

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Run plugin
     * @returns {mscrolltop}
     */
    construct: function construct(options) {
      if (KTUtil.data(element).has('scrolltop')) {
        the = KTUtil.data(element).get('scrolltop');
      } else {
        // reset scrolltop
        Plugin.init(options);

        // build scrolltop
        Plugin.build();
        KTUtil.data(element).set('scrolltop', the);
      }
      return the;
    },
    /**
     * Handles subscrolltop click toggle
     * @returns {mscrolltop}
     */
    init: function init(options) {
      the.events = [];

      // merge default and user defined options
      the.options = KTUtil.deepExtend({}, defaultOptions, options);
    },
    build: function build() {
      // handle window scroll
      if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        window.addEventListener('touchend', function () {
          Plugin.handle();
        });
        window.addEventListener('touchcancel', function () {
          Plugin.handle();
        });
        window.addEventListener('touchleave', function () {
          Plugin.handle();
        });
      } else {
        window.addEventListener('scroll', function () {
          Plugin.handle();
        });
      }

      // handle button click 
      KTUtil.addEvent(element, 'click', Plugin.scroll);
    },
    /**
     * Handles scrolltop click scrollTop
     */
    handle: function handle() {
      var pos = window.pageYOffset; // current vertical position
      if (pos > the.options.offset) {
        KTUtil.addClass(body, the.options.toggleClass);
      } else {
        KTUtil.removeClass(body, the.options.toggleClass);
      }
    },
    /**
     * Handles scrolltop click scrollTop
     */
    scroll: function scroll(e) {
      e.preventDefault();
      KTUtil.scrollTop(0, the.options.speed);
    },
    /**
     * Trigger events
     */
    eventTrigger: function eventTrigger(name, args) {
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];
        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              event.handler.call(this, the, args);
            }
          } else {
            event.handler.call(this, the, args);
          }
        }
      }
    },
    addEvent: function addEvent(name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
    }
  };

  //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options 
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };

  /**
   * Get subscrolltop mode
   */
  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };

  /**
   * Set scrolltop content
   * @returns {mscrolltop}
   */
  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  };

  ///////////////////////////////
  // ** Plugin Construction ** //
  ///////////////////////////////

  // Run plugin
  Plugin.construct.apply(the, [options]);

  // Init done
  init = true;

  // Return plugin instance
  return the;
};
"use strict";

// plugin setup
var KTToggle = function KTToggle(elementId, options) {
  // Main object
  var the = this;
  var init = false;

  // Get element object
  var element = KTUtil.get(elementId);
  var body = KTUtil.get('body');
  if (!element) {
    return;
  }

  // Default options
  var defaultOptions = {
    togglerState: '',
    targetState: ''
  };

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Construct
     */

    construct: function construct(options) {
      if (KTUtil.data(element).has('toggle')) {
        the = KTUtil.data(element).get('toggle');
      } else {
        // reset menu
        Plugin.init(options);

        // build menu
        Plugin.build();
        KTUtil.data(element).set('toggle', the);
      }
      return the;
    },
    /**
     * Handles subtoggle click toggle
     */
    init: function init(options) {
      the.element = element;
      the.events = [];

      // merge default and user defined options
      the.options = KTUtil.deepExtend({}, defaultOptions, options);
      the.target = KTUtil.get(the.options.target);
      the.targetState = the.options.targetState;
      the.togglerState = the.options.togglerState;
      the.state = KTUtil.hasClasses(the.target, the.targetState) ? 'on' : 'off';
    },
    /**
     * Setup toggle
     */
    build: function build() {
      KTUtil.addEvent(element, 'mouseup', Plugin.toggle);
    },
    /**
     * Handles offcanvas click toggle
     */
    toggle: function toggle(e) {
      Plugin.eventTrigger('beforeToggle');
      if (the.state == 'off') {
        Plugin.toggleOn();
      } else {
        Plugin.toggleOff();
      }
      Plugin.eventTrigger('afterToggle');
      e.preventDefault();
      return the;
    },
    /**
     * Handles toggle click toggle
     */
    toggleOn: function toggleOn() {
      Plugin.eventTrigger('beforeOn');
      KTUtil.addClass(the.target, the.targetState);
      if (the.togglerState) {
        KTUtil.addClass(element, the.togglerState);
      }
      the.state = 'on';
      Plugin.eventTrigger('afterOn');
      Plugin.eventTrigger('toggle');
      return the;
    },
    /**
     * Handles toggle click toggle
     */
    toggleOff: function toggleOff() {
      Plugin.eventTrigger('beforeOff');
      KTUtil.removeClass(the.target, the.targetState);
      if (the.togglerState) {
        KTUtil.removeClass(element, the.togglerState);
      }
      the.state = 'off';
      Plugin.eventTrigger('afterOff');
      Plugin.eventTrigger('toggle');
      return the;
    },
    /**
     * Trigger events
     */
    eventTrigger: function eventTrigger(name) {
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];
        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              event.handler.call(this, the);
            }
          } else {
            event.handler.call(this, the);
          }
        }
      }
    },
    addEvent: function addEvent(name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
      return the;
    }
  };

  //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options 
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };

  /**
   * Get toggle state 
   */
  the.getState = function () {
    return the.state;
  };

  /**
   * Toggle 
   */
  the.toggle = function () {
    return Plugin.toggle();
  };

  /**
   * Toggle on 
   */
  the.toggleOn = function () {
    return Plugin.toggleOn();
  };

  /**
   * Toggle off 
   */
  the.toggleOff = function () {
    return Plugin.toggleOff();
  };

  /**
   * Attach event
   * @returns {KTToggle}
   */
  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };

  /**
   * Attach event that will be fired once
   * @returns {KTToggle}
   */
  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  };

  // Construct plugin
  Plugin.construct.apply(the, [options]);
  return the;
};
// plugin setup
var KTWizard = function KTWizard(elementId, options) {
  // Main object
  var the = this;
  var init = false;

  // Get element object
  var element = KTUtil.get(elementId);
  var body = KTUtil.get('body');
  if (!element) {
    return;
  }

  // Default options
  var defaultOptions = {
    startStep: 1,
    manualStepForward: false
  };

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Construct
     */

    construct: function construct(options) {
      if (KTUtil.data(element).has('wizard')) {
        the = KTUtil.data(element).get('wizard');
      } else {
        // reset menu
        Plugin.init(options);

        // build menu
        Plugin.build();
        KTUtil.data(element).set('wizard', the);
      }
      return the;
    },
    /**
     * Init wizard
     */
    init: function init(options) {
      the.element = element;
      the.events = [];

      // merge default and user defined options
      the.options = KTUtil.deepExtend({}, defaultOptions, options);

      // Elements
      the.steps = KTUtil.findAll(element, '[data-ktwizard-type="step"]');
      the.btnSubmit = KTUtil.find(element, '[data-ktwizard-type="action-submit"]');
      the.btnNext = KTUtil.find(element, '[data-ktwizard-type="action-next"]');
      the.btnPrev = KTUtil.find(element, '[data-ktwizard-type="action-prev"]');
      the.btnLast = KTUtil.find(element, '[data-ktwizard-type="action-last"]');
      the.btnFirst = KTUtil.find(element, '[data-ktwizard-type="action-first"]');

      // Variables
      the.events = [];
      the.currentStep = 1;
      the.stopped = false;
      the.totalSteps = the.steps.length;

      // Init current step
      if (the.options.startStep > 1) {
        Plugin.goTo(the.options.startStep);
      }

      // Init UI
      Plugin.updateUI();
    },
    /**
     * Build Form Wizard
     */
    build: function build() {
      // Next button event handler
      KTUtil.addEvent(the.btnNext, 'click', function (e) {
        e.preventDefault();
        Plugin.goNext();
      });

      // Prev button event handler
      KTUtil.addEvent(the.btnPrev, 'click', function (e) {
        e.preventDefault();
        Plugin.goPrev();
      });

      // First button event handler
      KTUtil.addEvent(the.btnFirst, 'click', function (e) {
        e.preventDefault();
        Plugin.goFirst();
      });

      // Last button event handler
      KTUtil.addEvent(the.btnLast, 'click', function (e) {
        e.preventDefault();
        Plugin.goLast();
      });
      KTUtil.on(element, 'a[data-ktwizard-type="step"]', 'click', function () {
        var index = KTUtil.index(this) + 1;
        if (index !== the.currentStep) {
          Plugin.goTo(index);
        }
      });
    },
    /**
     * Handles wizard click wizard
     */
    goTo: function goTo(number) {
      // Skip if this step is already shown
      if (number === the.currentStep || number > the.totalSteps || number < 0) {
        return;
      }

      // Validate step number
      if (number) {
        number = parseInt(number);
      } else {
        number = Plugin.getNextStep();
      }

      // Before next and prev events
      var callback;
      if (number > the.currentStep) {
        callback = Plugin.eventTrigger('beforeNext');
      } else {
        callback = Plugin.eventTrigger('beforePrev');
      }

      // Skip if stopped
      if (the.stopped === true) {
        the.stopped = false;
        return;
      }

      // Continue if no exit
      if (callback !== false) {
        // Before change
        Plugin.eventTrigger('beforeChange');

        // Set current step 
        the.currentStep = number;
        Plugin.updateUI();

        // Trigger change event
        Plugin.eventTrigger('change');
      }

      // After next and prev events
      if (number > the.startStep) {
        Plugin.eventTrigger('afterNext');
      } else {
        Plugin.eventTrigger('afterPrev');
      }
      return the;
    },
    /**
     * Cancel
     */
    stop: function stop() {
      the.stopped = true;
    },
    /**
     * Resume
     */
    start: function start() {
      the.stopped = false;
    },
    /**
     * Check last step
     */
    isLastStep: function isLastStep() {
      return the.currentStep === the.totalSteps;
    },
    /**
     * Check first step
     */
    isFirstStep: function isFirstStep() {
      return the.currentStep === 1;
    },
    /**
     * Check between step
     */
    isBetweenStep: function isBetweenStep() {
      return Plugin.isLastStep() === false && Plugin.isFirstStep() === false;
    },
    /**
     * Go to the next step
     */
    goNext: function goNext() {
      return Plugin.goTo(Plugin.getNextStep());
    },
    /**
     * Go to the prev step
     */
    goPrev: function goPrev() {
      return Plugin.goTo(Plugin.getPrevStep());
    },
    /**
     * Go to the last step
     */
    goLast: function goLast() {
      return Plugin.goTo(the.totalSteps);
    },
    /**
     * Go to the first step
     */
    goFirst: function goFirst() {
      return Plugin.goTo(1);
    },
    /**
     * Go to the first step
     */
    updateUI: function updateUI() {
      var stepType = '';
      var index = the.currentStep - 1;
      if (Plugin.isLastStep()) {
        stepType = 'last';
      } else if (Plugin.isFirstStep()) {
        stepType = 'first';
      } else {
        stepType = 'between';
      }
      KTUtil.attr(the.element, 'data-ktwizard-state', stepType);

      // Steps
      var steps = KTUtil.findAll(the.element, '[data-ktwizard-type="step"]');
      if (steps && steps.length > 0) {
        for (var i = 0, len = steps.length; i < len; i++) {
          if (i == index) {
            KTUtil.attr(steps[i], 'data-ktwizard-state', 'current');
          } else {
            if (i < index) {
              KTUtil.attr(steps[i], 'data-ktwizard-state', 'done');
            } else {
              KTUtil.attr(steps[i], 'data-ktwizard-state', 'pending');
            }
          }
        }
      }

      // Steps Info
      var stepsInfo = KTUtil.findAll(the.element, '[data-ktwizard-type="step-info"]');
      if (stepsInfo && stepsInfo.length > 0) {
        for (var i = 0, len = stepsInfo.length; i < len; i++) {
          if (i == index) {
            KTUtil.attr(stepsInfo[i], 'data-ktwizard-state', 'current');
          } else {
            KTUtil.removeAttr(stepsInfo[i], 'data-ktwizard-state');
          }
        }
      }

      // Steps Content
      var stepsContent = KTUtil.findAll(the.element, '[data-ktwizard-type="step-content"]');
      if (stepsContent && stepsContent.length > 0) {
        for (var i = 0, len = stepsContent.length; i < len; i++) {
          if (i == index) {
            KTUtil.attr(stepsContent[i], 'data-ktwizard-state', 'current');
          } else {
            KTUtil.removeAttr(stepsContent[i], 'data-ktwizard-state');
          }
        }
      }
    },
    /**
     * Get next step
     */
    getNextStep: function getNextStep() {
      if (the.totalSteps >= the.currentStep + 1) {
        return the.currentStep + 1;
      } else {
        return the.totalSteps;
      }
    },
    /**
     * Get prev step
     */
    getPrevStep: function getPrevStep() {
      if (the.currentStep - 1 >= 1) {
        return the.currentStep - 1;
      } else {
        return 1;
      }
    },
    /**
     * Trigger events
     */
    eventTrigger: function eventTrigger(name) {
      //KTUtil.triggerCustomEvent(name);
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];
        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              event.handler.call(this, the);
            }
          } else {
            event.handler.call(this, the);
          }
        }
      }
    },
    addEvent: function addEvent(name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
      return the;
    }
  };

  //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options 
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };

  /**
   * Go to the next step 
   */
  the.goNext = function () {
    return Plugin.goNext();
  };

  /**
   * Go to the prev step 
   */
  the.goPrev = function () {
    return Plugin.goPrev();
  };

  /**
   * Go to the last step 
   */
  the.goLast = function () {
    return Plugin.goLast();
  };

  /**
   * Cancel step 
   */
  the.stop = function () {
    return Plugin.stop();
  };

  /**
   * Resume step 
   */
  the.start = function () {
    return Plugin.start();
  };

  /**
   * Go to the first step 
   */
  the.goFirst = function () {
    return Plugin.goFirst();
  };

  /**
   * Go to a step
   */
  the.goTo = function (number) {
    return Plugin.goTo(number);
  };

  /**
   * Get current step number 
   */
  the.getStep = function () {
    return the.currentStep;
  };

  /**
   * Check last step 
   */
  the.isLastStep = function () {
    return Plugin.isLastStep();
  };

  /**
   * Check first step 
   */
  the.isFirstStep = function () {
    return Plugin.isFirstStep();
  };

  /**
   * Attach event
   */
  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };

  /**
   * Attach event that will be fired once
   */
  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  };

  // Construct plugin
  Plugin.construct.apply(the, [options]);
  return the;
};
'use strict';
(function ($) {
  var pluginName = 'KTDatatable';
  var pfx = 'kt-';
  var util = KTUtil;
  var app = KTApp;
  if (typeof util === 'undefined') throw new Error('Util class is required and must be included before ' + pluginName);

  // plugin setup
  $.fn[pluginName] = function (options) {
    if ($(this).length === 0) {
      console.warn('No ' + pluginName + ' element exist.');
      return;
    }

    // global variables
    var datatable = this;

    // debug enabled?
    // 1) state will be cleared on each refresh
    // 2) enable some logs
    // 3) etc.
    datatable.debug = false;
    datatable.API = {
      record: null,
      value: null,
      params: null
    };
    var Plugin = {
      /********************
       ** PRIVATE METHODS
       ********************/
      isInit: false,
      cellOffset: 110,
      iconOffset: 15,
      stateId: 'meta',
      ajaxParams: {},
      pagingObject: {},
      init: function init(options) {
        var isHtmlTable = false;
        // data source option empty is normal table
        if (options.data.source === null) {
          Plugin.extractTable();
          isHtmlTable = true;
        }
        Plugin.setupBaseDOM.call();
        Plugin.setupDOM(datatable.table);

        // set custom query from options
        Plugin.setDataSourceQuery(Plugin.getOption('data.source.read.params.query'));

        // on event after layout had done setup, show datatable
        $(datatable).on(pfx + 'datatable--on-layout-updated', Plugin.afterRender);
        if (datatable.debug) {
          Plugin.stateRemove(Plugin.stateId);
        }

        // initialize extensions
        $.each(Plugin.getOption('extensions'), function (extName, extOptions) {
          if (typeof $.fn[pluginName][extName] === 'function') {
            new $.fn[pluginName][extName](datatable, extOptions);
          }
        });
        Plugin.spinnerCallback(true);
        // get data
        if (options.data.type === 'remote' || options.data.type === 'local') {
          if (options.data.saveState === false || options.data.saveState.cookie === false && options.data.saveState.webstorage === false) {
            Plugin.stateRemove(Plugin.stateId);
          }
          // get data for local datatable and local table
          if (options.data.type === 'local' && _typeof(options.data.source) === 'object') {
            datatable.dataSet = datatable.originalDataSet = Plugin.dataMapCallback(options.data.source);
          }
          Plugin.dataRender();
        }

        // if html table, remove and setup a new header
        if (isHtmlTable) {
          $(datatable.tableHead).find('tr').remove();
          $(datatable.tableFoot).find('tr').remove();
        }
        Plugin.setHeadTitle();
        if (Plugin.getOption('layout.footer')) {
          Plugin.setHeadTitle(datatable.tableFoot);
        }

        // hide header
        if (typeof options.layout.header !== 'undefined' && options.layout.header === false) {
          $(datatable.table).find('thead').remove();
        }

        // hide footer
        if (typeof options.layout.footer !== 'undefined' && options.layout.footer === false) {
          $(datatable.table).find('tfoot').remove();
        }

        // for normal and local data type, run layoutUpdate
        if (options.data.type === null || options.data.type === 'local') {
          Plugin.setupCellField.call();
          Plugin.setupTemplateCell.call();

          // setup nested datatable, if option enabled
          Plugin.setupSubDatatable.call();

          // setup extra system column properties
          Plugin.setupSystemColumn.call();
          Plugin.redraw();
        }
        var width;
        var initialWidth = false;
        $(window).resize(function () {
          // get initial width
          if (!initialWidth) {
            width = $(this).width();
            initialWidth = true;
          }
          // issue: URL Bar Resizing on mobile, https://developers.google.com/web/updates/2016/12/url-bar-resizing
          // trigger datatable resize on width change only
          if ($(this).width() !== width) {
            width = $(this).width();
            Plugin.fullRender();
          }
        });
        $(datatable).height('');
        $(Plugin.getOption('search.input')).on('keyup', function (e) {
          if (Plugin.getOption('search.onEnter') && e.which !== 13) return;
          Plugin.search($(this).val());
        });
        return datatable;
      },
      /**
       * Extract static HTML table content into datasource
       */
      extractTable: function extractTable() {
        var columns = [];
        var headers = $(datatable).find('tr:first-child th').get().map(function (cell, i) {
          var field = $(cell).data('field');
          if (typeof field === 'undefined') {
            field = $(cell).text().trim();
          }
          var column = {
            field: field,
            title: field
          };
          for (var ii in options.columns) {
            if (options.columns[ii].field === field) {
              column = $.extend(true, {}, options.columns[ii], column);
            }
          }
          columns.push(column);
          return field;
        });
        // auto create columns config
        options.columns = columns;
        var rowProp = [];
        var source = [];
        $(datatable).find('tr').each(function () {
          if ($(this).find('td').length) {
            rowProp.push($(this).prop('attributes'));
          }
          var td = {};
          $(this).find('td').each(function (i, cell) {
            td[headers[i]] = cell.innerHTML.trim();
          });
          if (!util.isEmpty(td)) {
            source.push(td);
          }
        });
        options.data.attr.rowProps = rowProp;
        options.data.source = source;
      },
      /**
       * One time layout update on init
       */
      layoutUpdate: function layoutUpdate() {
        // setup nested datatable, if option enabled
        Plugin.setupSubDatatable.call();

        // setup extra system column properties
        Plugin.setupSystemColumn.call();

        // setup cell hover event
        Plugin.setupHover.call();
        if (typeof options.detail === 'undefined'
        // temporary disable lock column in subtable
        && Plugin.getDepth() === 1) {
          // lock columns handler
          Plugin.lockTable.call();
        }
        Plugin.columnHide.call();
        Plugin.resetScroll();

        // check if not is a locked column
        if (!Plugin.isLocked()) {
          Plugin.redraw.call();
          // check if its not a subtable and has autoHide option enabled
          if (!Plugin.isSubtable() && Plugin.getOption('rows.autoHide') === true) {
            Plugin.autoHide();
          }
          // reset row
          $(datatable.table).find('.' + pfx + 'datatable__row').css('height', '');
        }
        Plugin.rowEvenOdd.call();
        Plugin.sorting.call();
        Plugin.scrollbar.call();
        if (!Plugin.isInit) {
          // run once dropdown inside datatable
          Plugin.dropdownFix();
          $(datatable).trigger(pfx + 'datatable--on-init', {
            table: $(datatable.wrap).attr('id'),
            options: options
          });
          Plugin.isInit = true;
        }
        $(datatable).trigger(pfx + 'datatable--on-layout-updated', {
          table: $(datatable.wrap).attr('id')
        });
      },
      dropdownFix: function dropdownFix() {
        var dropdownMenu;
        $('body').on('show.bs.dropdown', '.' + pfx + 'datatable .' + pfx + 'datatable__body', function (e) {
          dropdownMenu = $(e.target).find('.dropdown-menu');
          $('body').append(dropdownMenu.detach());
          dropdownMenu.css('display', 'block');
          dropdownMenu.position({
            'my': 'right top',
            'at': 'right bottom',
            'of': $(e.relatedTarget)
          });
          // if datatable is inside modal
          if (datatable.closest('.modal').length) {
            // increase dropdown z-index
            dropdownMenu.css('z-index', '2000');
          }
        }).on('hide.bs.dropdown', '.' + pfx + 'datatable .' + pfx + 'datatable__body', function (e) {
          $(e.target).append(dropdownMenu.detach());
          dropdownMenu.hide();
        });
      },
      lockTable: function lockTable() {
        var lock = {
          lockEnabled: false,
          init: function init() {
            // check if table should be locked columns
            lock.lockEnabled = Plugin.lockEnabledColumns();
            if (lock.lockEnabled.left.length === 0 && lock.lockEnabled.right.length === 0) {
              return;
            }
            lock.enable();
          },
          enable: function enable() {
            var enableLock = function enableLock(tablePart) {
              // check if already has lock column
              if ($(tablePart).find('.' + pfx + 'datatable__lock').length > 0) {
                Plugin.log('Locked container already exist in: ', tablePart);
                return;
              }
              // check if no rows exists
              if ($(tablePart).find('.' + pfx + 'datatable__row').length === 0) {
                Plugin.log('No row exist in: ', tablePart);
                return;
              }

              // locked div container
              var lockLeft = $('<div/>').addClass(pfx + 'datatable__lock ' + pfx + 'datatable__lock--left');
              var lockScroll = $('<div/>').addClass(pfx + 'datatable__lock ' + pfx + 'datatable__lock--scroll');
              var lockRight = $('<div/>').addClass(pfx + 'datatable__lock ' + pfx + 'datatable__lock--right');
              $(tablePart).find('.' + pfx + 'datatable__row').each(function () {
                // create new row for lock columns and pass the data
                var rowLeft = $('<tr/>').addClass(pfx + 'datatable__row').data('obj', $(this).data('obj')).appendTo(lockLeft);
                var rowScroll = $('<tr/>').addClass(pfx + 'datatable__row').data('obj', $(this).data('obj')).appendTo(lockScroll);
                var rowRight = $('<tr/>').addClass(pfx + 'datatable__row').data('obj', $(this).data('obj')).appendTo(lockRight);
                $(this).find('.' + pfx + 'datatable__cell').each(function () {
                  var locked = $(this).data('locked');
                  if (typeof locked !== 'undefined') {
                    if (typeof locked.left !== 'undefined' || locked === true) {
                      // default locked to left
                      $(this).appendTo(rowLeft);
                    }
                    if (typeof locked.right !== 'undefined') {
                      $(this).appendTo(rowRight);
                    }
                  } else {
                    $(this).appendTo(rowScroll);
                  }
                });
                // remove old row
                $(this).remove();
              });
              if (lock.lockEnabled.left.length > 0) {
                $(datatable.wrap).addClass(pfx + 'datatable--lock');
                $(lockLeft).appendTo(tablePart);
              }
              if (lock.lockEnabled.left.length > 0 || lock.lockEnabled.right.length > 0) {
                $(lockScroll).appendTo(tablePart);
              }
              if (lock.lockEnabled.right.length > 0) {
                $(datatable.wrap).addClass(pfx + 'datatable--lock');
                $(lockRight).appendTo(tablePart);
              }
            };
            $(datatable.table).find('thead,tbody,tfoot').each(function () {
              var tablePart = this;
              if ($(this).find('.' + pfx + 'datatable__lock').length === 0) {
                $(this).ready(function () {
                  enableLock(tablePart);
                });
              }
            });
          }
        };
        lock.init();
        return lock;
      },
      /**
       * Render everything for resize
       */
      fullRender: function fullRender() {
        $(datatable.tableHead).empty();
        Plugin.setHeadTitle();
        if (Plugin.getOption('layout.footer')) {
          $(datatable.tableFoot).empty();
          Plugin.setHeadTitle(datatable.tableFoot);
        }
        Plugin.spinnerCallback(true);
        $(datatable.wrap).removeClass(pfx + 'datatable--loaded');
        Plugin.insertData();
      },
      lockEnabledColumns: function lockEnabledColumns() {
        var screen = $(window).width();
        var columns = options.columns;
        var enabled = {
          left: [],
          right: []
        };
        $.each(columns, function (i, column) {
          if (typeof column.locked !== 'undefined') {
            if (typeof column.locked.left !== 'undefined') {
              if (util.getBreakpoint(column.locked.left) <= screen) {
                enabled['left'].push(column.locked.left);
              }
            }
            if (typeof column.locked.right !== 'undefined') {
              if (util.getBreakpoint(column.locked.right) <= screen) {
                enabled['right'].push(column.locked.right);
              }
            }
          }
        });
        return enabled;
      },
      /**
       * After render event, called by
       * '+pfx+'-datatable--on-layout-updated
       * @param e
       * @param args
       */
      afterRender: function afterRender(e, args) {
        $(datatable).ready(function () {
          // redraw locked columns table
          if (Plugin.isLocked()) {
            Plugin.redraw();
          }
          $(datatable.tableBody).css('visibility', '');
          $(datatable.wrap).addClass(pfx + 'datatable--loaded');
          Plugin.spinnerCallback(false);
        });
      },
      hoverTimer: 0,
      isScrolling: false,
      setupHover: function setupHover() {
        $(window).scroll(function (e) {
          // stop hover when scrolling
          clearTimeout(Plugin.hoverTimer);
          Plugin.isScrolling = true;
        });
        $(datatable.tableBody).find('.' + pfx + 'datatable__cell').off('mouseenter', 'mouseleave').on('mouseenter', function () {
          // reset scroll timer to hover class
          Plugin.hoverTimer = setTimeout(function () {
            Plugin.isScrolling = false;
          }, 200);
          if (Plugin.isScrolling) return;

          // normal table
          var row = $(this).closest('.' + pfx + 'datatable__row').addClass(pfx + 'datatable__row--hover');
          var index = $(row).index() + 1;

          // lock table
          $(row).closest('.' + pfx + 'datatable__lock').parent().find('.' + pfx + 'datatable__row:nth-child(' + index + ')').addClass(pfx + 'datatable__row--hover');
        }).on('mouseleave', function () {
          // normal table
          var row = $(this).closest('.' + pfx + 'datatable__row').removeClass(pfx + 'datatable__row--hover');
          var index = $(row).index() + 1;

          // look table
          $(row).closest('.' + pfx + 'datatable__lock').parent().find('.' + pfx + 'datatable__row:nth-child(' + index + ')').removeClass(pfx + 'datatable__row--hover');
        });
      },
      /**
       * Adjust width of locked table containers by resize handler
       * @returns {number}
       */
      adjustLockContainer: function adjustLockContainer() {
        if (!Plugin.isLocked()) return 0;

        // refer to head dimension
        var containerWidth = $(datatable.tableHead).width();
        var lockLeft = $(datatable.tableHead).find('.' + pfx + 'datatable__lock--left').width();
        var lockRight = $(datatable.tableHead).find('.' + pfx + 'datatable__lock--right').width();
        if (typeof lockLeft === 'undefined') lockLeft = 0;
        if (typeof lockRight === 'undefined') lockRight = 0;
        var lockScroll = Math.floor(containerWidth - lockLeft - lockRight);
        $(datatable.table).find('.' + pfx + 'datatable__lock--scroll').css('width', lockScroll);
        return lockScroll;
      },
      /**
       * todo; not in use
       */
      dragResize: function dragResize() {
        var pressed = false;
        var start = undefined;
        var startX, startWidth;
        $(datatable.tableHead).find('.' + pfx + 'datatable__cell').mousedown(function (e) {
          start = $(this);
          pressed = true;
          startX = e.pageX;
          startWidth = $(this).width();
          $(start).addClass(pfx + 'datatable__cell--resizing');
        }).mousemove(function (e) {
          if (pressed) {
            var i = $(start).index();
            var tableBody = $(datatable.tableBody);
            var ifLocked = $(start).closest('.' + pfx + 'datatable__lock');
            if (ifLocked) {
              var lockedIndex = $(ifLocked).index();
              tableBody = $(datatable.tableBody).find('.' + pfx + 'datatable__lock').eq(lockedIndex);
            }
            $(tableBody).find('.' + pfx + 'datatable__row').each(function (tri, tr) {
              $(tr).find('.' + pfx + 'datatable__cell').eq(i).width(startWidth + (e.pageX - startX)).children().width(startWidth + (e.pageX - startX));
            });
            $(start).children().css('width', startWidth + (e.pageX - startX));
          }
        }).mouseup(function () {
          $(start).removeClass(pfx + 'datatable__cell--resizing');
          pressed = false;
        });
        $(document).mouseup(function () {
          $(start).removeClass(pfx + 'datatable__cell--resizing');
          pressed = false;
        });
      },
      /**
       * To prepare placeholder for table before content is loading
       */
      initHeight: function initHeight() {
        if (options.layout.height && options.layout.scroll) {
          var theadHeight = $(datatable.tableHead).find('.' + pfx + 'datatable__row').outerHeight();
          var tfootHeight = $(datatable.tableFoot).find('.' + pfx + 'datatable__row').outerHeight();
          var bodyHeight = options.layout.height;
          if (theadHeight > 0) {
            bodyHeight -= theadHeight;
          }
          if (tfootHeight > 0) {
            bodyHeight -= tfootHeight;
          }

          // scrollbar offset
          bodyHeight -= 2;
          $(datatable.tableBody).css('max-height', bodyHeight);

          // set scrollable area fixed height
          $(datatable.tableBody).find('.' + pfx + 'datatable__lock--scroll').css('height', bodyHeight);
        }
      },
      /**
       * Setup base DOM (table, thead, tbody, tfoot) and create if not
       * exist.
       */
      setupBaseDOM: function setupBaseDOM() {
        // keep original state before datatable initialize
        datatable.initialDatatable = $(datatable).clone();

        // main element
        if ($(datatable).prop('tagName') === 'TABLE') {
          // if main init element is <table>, wrap with div
          datatable.table = $(datatable).removeClass(pfx + 'datatable').addClass(pfx + 'datatable__table');
          if ($(datatable.table).parents('.' + pfx + 'datatable').length === 0) {
            datatable.table.wrap($('<div/>').addClass(pfx + 'datatable').addClass(pfx + 'datatable--' + options.layout.theme));
            datatable.wrap = $(datatable.table).parent();
          }
        } else {
          // create table
          datatable.wrap = $(datatable).addClass(pfx + 'datatable').addClass(pfx + 'datatable--' + options.layout.theme);
          datatable.table = $('<table/>').addClass(pfx + 'datatable__table').appendTo(datatable);
        }
        if (typeof options.layout["class"] !== 'undefined') {
          $(datatable.wrap).addClass(options.layout["class"]);
        }
        $(datatable.table).removeClass(pfx + 'datatable--destroyed').css('display', 'block');

        // force disable save state
        if (typeof $(datatable).attr('id') === 'undefined') {
          Plugin.setOption('data.saveState', false);
          $(datatable.table).attr('id', util.getUniqueID(pfx + 'datatable--'));
        }

        // predefine table height
        if (Plugin.getOption('layout.minHeight')) $(datatable.table).css('min-height', Plugin.getOption('layout.minHeight'));
        if (Plugin.getOption('layout.height')) $(datatable.table).css('max-height', Plugin.getOption('layout.height'));

        // for normal table load
        if (options.data.type === null) {
          $(datatable.table).css('width', '').css('display', '');
        }

        // create table head element
        datatable.tableHead = $(datatable.table).find('thead');
        if ($(datatable.tableHead).length === 0) {
          datatable.tableHead = $('<thead/>').prependTo(datatable.table);
        }

        // create table head element
        datatable.tableBody = $(datatable.table).find('tbody');
        if ($(datatable.tableBody).length === 0) {
          datatable.tableBody = $('<tbody/>').appendTo(datatable.table);
        }
        if (typeof options.layout.footer !== 'undefined' && options.layout.footer) {
          // create table foot element
          datatable.tableFoot = $(datatable.table).find('tfoot');
          if ($(datatable.tableFoot).length === 0) {
            datatable.tableFoot = $('<tfoot/>').appendTo(datatable.table);
          }
        }
      },
      /**
       * Set column data before table manipulation.
       */
      setupCellField: function setupCellField(tableParts) {
        if (typeof tableParts === 'undefined') tableParts = $(datatable.table).children();
        var columns = options.columns;
        $.each(tableParts, function (part, tablePart) {
          $(tablePart).find('.' + pfx + 'datatable__row').each(function (tri, tr) {
            // prepare data
            $(tr).find('.' + pfx + 'datatable__cell').each(function (tdi, td) {
              if (typeof columns[tdi] !== 'undefined') {
                $(td).data(columns[tdi]);
              }
            });
          });
        });
      },
      /**
       * Set column template callback
       * @param tablePart
       */
      setupTemplateCell: function setupTemplateCell(tablePart) {
        if (typeof tablePart === 'undefined') tablePart = datatable.tableBody;
        var columns = options.columns;
        $(tablePart).find('.' + pfx + 'datatable__row').each(function (tri, tr) {
          // row data object, if any
          var obj = $(tr).data('obj');
          if (typeof obj === 'undefined') {
            return;
          }

          // @deprecated in v5.0.6
          // obj['getIndex'] = function() {
          // 	return tri;
          // };
          // @deprecated in v5.0.6
          // obj['getDatatable'] = function() {
          // 	return datatable;
          // };

          // @deprecated in v5.0.6
          var rowCallback = Plugin.getOption('rows.callback');
          if (typeof rowCallback === 'function') {
            rowCallback($(tr), obj, tri);
          }
          // before template row callback
          var beforeTemplate = Plugin.getOption('rows.beforeTemplate');
          if (typeof beforeTemplate === 'function') {
            beforeTemplate($(tr), obj, tri);
          }
          // if data object is undefined, collect from table
          if (typeof obj === 'undefined') {
            obj = {};
            $(tr).find('.' + pfx + 'datatable__cell').each(function (tdi, td) {
              // get column settings by field
              var column = $.grep(columns, function (n, i) {
                return $(td).data('field') === n.field;
              })[0];
              if (typeof column !== 'undefined') {
                obj[column['field']] = $(td).text();
              }
            });
          }
          $(tr).find('.' + pfx + 'datatable__cell').each(function (tdi, td) {
            // get column settings by field
            var column = $.grep(columns, function (n, i) {
              return $(td).data('field') === n.field;
            })[0];
            if (typeof column !== 'undefined') {
              // column template
              if (typeof column.template !== 'undefined') {
                var finalValue = '';
                // template string
                if (typeof column.template === 'string') {
                  finalValue = Plugin.dataPlaceholder(column.template, obj);
                }
                // template callback function
                if (typeof column.template === 'function') {
                  finalValue = column.template(obj, tri, datatable);
                }

                // sanitize using DOMPurify if installed
                if (typeof DOMPurify !== 'undefined') {
                  finalValue = DOMPurify.sanitize(finalValue);
                }
                var span = document.createElement('span');
                span.innerHTML = finalValue;

                // insert to cell, wrap with span
                $(td).html(span);

                // set span overflow
                if (typeof column.overflow !== 'undefined') {
                  $(span).css('overflow', column.overflow);
                  $(span).css('position', 'relative');
                }
              }
            }
          });

          // after template row callback
          var afterTemplate = Plugin.getOption('rows.afterTemplate');
          if (typeof afterTemplate === 'function') {
            afterTemplate($(tr), obj, tri);
          }
        });
      },
      /**
       * Setup extra system column properties
       * Note: selector checkbox, subtable toggle
       */
      setupSystemColumn: function setupSystemColumn() {
        datatable.dataSet = datatable.dataSet || [];
        // no records available
        if (datatable.dataSet.length === 0) return;
        var columns = options.columns;
        $(datatable.tableBody).find('.' + pfx + 'datatable__row').each(function (tri, tr) {
          $(tr).find('.' + pfx + 'datatable__cell').each(function (tdi, td) {
            // get column settings by field
            var column = $.grep(columns, function (n, i) {
              return $(td).data('field') === n.field;
            })[0];
            if (typeof column !== 'undefined') {
              var value = $(td).text();

              // enable column selector
              if (typeof column.selector !== 'undefined' && column.selector !== false) {
                // check if checkbox exist
                if ($(td).find('.' + pfx + 'checkbox [type="checkbox"]').length > 0) return;
                $(td).addClass(pfx + 'datatable__cell--check');

                // append checkbox
                var chk = $('<label/>').addClass(pfx + 'checkbox ' + pfx + 'checkbox--single').append($('<input/>').attr('type', 'checkbox').attr('value', value).on('click', function () {
                  if ($(this).is(':checked')) {
                    // add checkbox active row class
                    Plugin.setActive(this);
                  } else {
                    // add checkbox active row class
                    Plugin.setInactive(this);
                  }
                })).append('&nbsp;<span></span>');

                // checkbox selector has outline style
                if (typeof column.selector["class"] !== 'undefined') {
                  $(chk).addClass(column.selector["class"]);
                }
                $(td).children().html(chk);
              }

              // enable column subtable toggle
              if (typeof column.subtable !== 'undefined' && column.subtable) {
                // check if subtable toggle exist
                if ($(td).find('.' + pfx + 'datatable__toggle-subtable').length > 0) return;
                // append subtable toggle
                $(td).children().html($('<a/>').addClass(pfx + 'datatable__toggle-subtable').attr('href', '#').attr('data-value', value).append($('<i/>').addClass(Plugin.getOption('layout.icons.rowDetail.collapse'))));
              }
            }
          });
        });

        // init checkbox for header/footer
        var initCheckbox = function initCheckbox(tr) {
          // get column settings by field
          var column = $.grep(columns, function (n, i) {
            return typeof n.selector !== 'undefined' && n.selector !== false;
          })[0];
          if (typeof column !== 'undefined') {
            // enable column selector
            if (typeof column.selector !== 'undefined' && column.selector !== false) {
              var td = $(tr).find('[data-field="' + column.field + '"]');
              // check if checkbox exist
              if ($(td).find('.' + pfx + 'checkbox [type="checkbox"]').length > 0) return;
              $(td).addClass(pfx + 'datatable__cell--check');

              // append checkbox
              var chk = $('<label/>').addClass(pfx + 'checkbox ' + pfx + 'checkbox--single ' + pfx + 'checkbox--all').append($('<input/>').attr('type', 'checkbox').on('click', function () {
                if ($(this).is(':checked')) {
                  Plugin.setActiveAll(true);
                } else {
                  Plugin.setActiveAll(false);
                }
              })).append('&nbsp;<span></span>');

              // checkbox selector has outline style
              if (typeof column.selector["class"] !== 'undefined') {
                $(chk).addClass(column.selector["class"]);
              }
              $(td).children().html(chk);
            }
          }
        };
        if (options.layout.header) {
          initCheckbox($(datatable.tableHead).find('.' + pfx + 'datatable__row').first());
        }
        if (options.layout.footer) {
          initCheckbox($(datatable.tableFoot).find('.' + pfx + 'datatable__row').first());
        }
      },
      maxWidthList: {},
      /**
       * Adjust width to match container size
       */
      adjustCellsWidth: function adjustCellsWidth() {
        // get table width
        var containerWidth = $(datatable.tableBody).innerWidth() - Plugin.iconOffset;

        // get total number of columns
        var columns = $(datatable.tableBody).find('.' + pfx + 'datatable__row:first-child').find('.' + pfx + 'datatable__cell').
        // exclude expand icon
        not('.' + pfx + 'datatable__toggle-detail').not(':hidden').length;
        if (columns > 0) {
          //  remove reserved sort icon width
          containerWidth = containerWidth - Plugin.iconOffset * columns;
          var minWidth = Math.floor(containerWidth / columns);

          // minimum width
          if (minWidth <= Plugin.cellOffset) {
            minWidth = Plugin.cellOffset;
          }
          $(datatable.table).find('.' + pfx + 'datatable__row').find('.' + pfx + 'datatable__cell').
          // exclude expand icon
          not('.' + pfx + 'datatable__toggle-detail').not(':hidden').each(function (tdi, td) {
            var width = minWidth;
            var dataWidth = $(td).data('width');
            if (typeof dataWidth !== 'undefined') {
              if (dataWidth === 'auto') {
                var field = $(td).data('field');
                if (Plugin.maxWidthList[field]) {
                  width = Plugin.maxWidthList[field];
                } else {
                  var cells = $(datatable.table).find('.' + pfx + 'datatable__cell[data-field="' + field + '"]');
                  width = Plugin.maxWidthList[field] = Math.max.apply(null, $(cells).map(function () {
                    return $(this).outerWidth();
                  }).get());
                }
              } else {
                width = dataWidth;
              }
            }
            $(td).children().css('width', Math.ceil(width));
          });
        }
        return datatable;
      },
      /**
       * Adjust height to match container size
       */
      adjustCellsHeight: function adjustCellsHeight() {
        $.each($(datatable.table).children(), function (part, tablePart) {
          var totalRows = $(tablePart).find('.' + pfx + 'datatable__row').first().parent().find('.' + pfx + 'datatable__row').length;
          for (var i = 1; i <= totalRows; i++) {
            var rows = $(tablePart).find('.' + pfx + 'datatable__row:nth-child(' + i + ')');
            if ($(rows).length > 0) {
              var maxHeight = Math.max.apply(null, $(rows).map(function () {
                return $(this).outerHeight();
              }).get());
              $(rows).css('height', Math.ceil(maxHeight));
            }
          }
        });
      },
      /**
       * Setup table DOM and classes
       */
      setupDOM: function setupDOM(table) {
        // set table classes
        $(table).find('> thead').addClass(pfx + 'datatable__head');
        $(table).find('> tbody').addClass(pfx + 'datatable__body');
        $(table).find('> tfoot').addClass(pfx + 'datatable__foot');
        $(table).find('tr').addClass(pfx + 'datatable__row');
        $(table).find('tr > th, tr > td').addClass(pfx + 'datatable__cell');
        $(table).find('tr > th, tr > td').each(function (i, td) {
          if ($(td).find('span').length === 0) {
            $(td).wrapInner($('<span/>').css('width', Plugin.cellOffset));
          }
        });
      },
      /**
       * Default scrollbar
       * @returns {{tableLocked: null, init: init, onScrolling:
       *     onScrolling}}
       */
      scrollbar: function scrollbar() {
        var scroll = {
          scrollable: null,
          tableLocked: null,
          initPosition: null,
          init: function init() {
            var screen = util.getViewPort().width;
            // setup scrollable datatable
            if (options.layout.scroll) {
              // add scrollable datatable class
              $(datatable.wrap).addClass(pfx + 'datatable--scroll');
              var scrollable = $(datatable.tableBody).find('.' + pfx + 'datatable__lock--scroll');

              // check if scrollable area have rows
              if ($(scrollable).find('.' + pfx + 'datatable__row').length > 0 && $(scrollable).length > 0) {
                scroll.scrollHead = $(datatable.tableHead).find('> .' + pfx + 'datatable__lock--scroll > .' + pfx + 'datatable__row');
                scroll.scrollFoot = $(datatable.tableFoot).find('> .' + pfx + 'datatable__lock--scroll > .' + pfx + 'datatable__row');
                scroll.tableLocked = $(datatable.tableBody).find('.' + pfx + 'datatable__lock:not(.' + pfx + 'datatable__lock--scroll)');
                if (Plugin.getOption('layout.customScrollbar') && util.detectIE() != 10 && screen > util.getBreakpoint('lg')) {
                  scroll.initCustomScrollbar(scrollable[0]);
                } else {
                  scroll.initDefaultScrollbar(scrollable);
                }
              } else if ($(datatable.tableBody).find('.' + pfx + 'datatable__row').length > 0) {
                scroll.scrollHead = $(datatable.tableHead).find('> .' + pfx + 'datatable__row');
                scroll.scrollFoot = $(datatable.tableFoot).find('> .' + pfx + 'datatable__row');
                if (Plugin.getOption('layout.customScrollbar') && util.detectIE() != 10 && screen > util.getBreakpoint('lg')) {
                  scroll.initCustomScrollbar(datatable.tableBody);
                } else {
                  scroll.initDefaultScrollbar(datatable.tableBody);
                }
              }
            }
          },
          initDefaultScrollbar: function initDefaultScrollbar(scrollable) {
            // get initial scroll position
            scroll.initPosition = $(scrollable).scrollLeft();
            $(scrollable).css('overflow-y', 'auto').off().on('scroll', scroll.onScrolling);
            if (Plugin.getOption('rows.autoHide') !== true) {
              $(scrollable).css('overflow-x', 'auto');
            }
          },
          onScrolling: function onScrolling(e) {
            var left = $(this).scrollLeft();
            var top = $(this).scrollTop();
            if (util.isRTL()) {
              // deduct initial position for RTL
              left = left - scroll.initPosition;
            }
            $(scroll.scrollHead).css('left', -left);
            $(scroll.scrollFoot).css('left', -left);
            $(scroll.tableLocked).each(function (i, table) {
              if (Plugin.isLocked()) {
                // scrollbar offset
                top -= 1;
              }
              $(table).css('top', -top);
            });
          },
          initCustomScrollbar: function initCustomScrollbar(scrollable) {
            scroll.scrollable = scrollable;
            // create a new instance for table body with scrollbar
            Plugin.initScrollbar(scrollable);
            // get initial scroll position
            scroll.initPosition = $(scrollable).scrollLeft();
            $(scrollable).off().on('scroll', scroll.onScrolling);
          }
        };
        scroll.init();
        return scroll;
      },
      /**
       * Init custom scrollbar and reset position
       * @param element
       * @param options
       */
      initScrollbar: function initScrollbar(element, options) {
        if (!element || !element.nodeName) {
          return;
        }
        $(datatable.tableBody).css('overflow', '');
        if (util.hasClass(element, 'ps')) {
          $(element).data('ps').update();
        } else {
          var ps = new PerfectScrollbar(element, Object.assign({}, {
            wheelSpeed: 0.5,
            swipeEasing: true,
            // wheelPropagation: false,
            minScrollbarLength: 40,
            maxScrollbarLength: 300,
            suppressScrollX: Plugin.getOption('rows.autoHide') && !Plugin.isLocked()
          }, options));
          $(element).data('ps', ps);

          // reset perfect scrollbar on resize
          $(window).resize(function () {
            ps.update();
          });
        }
      },
      /**
       * Set column title from options.columns settings
       */
      setHeadTitle: function setHeadTitle(tablePart) {
        if (typeof tablePart === 'undefined') tablePart = datatable.tableHead;
        tablePart = $(tablePart)[0];
        var columns = options.columns;
        var row = tablePart.getElementsByTagName('tr')[0];
        var ths = tablePart.getElementsByTagName('td');
        if (typeof row === 'undefined') {
          row = document.createElement('tr');
          tablePart.appendChild(row);
        }
        $.each(columns, function (i, column) {
          var th = ths[i];
          if (typeof th === 'undefined') {
            th = document.createElement('th');
            row.appendChild(th);
          }

          // set column title
          if (typeof column['title'] !== 'undefined') {
            th.innerHTML = column.title;
            th.setAttribute('data-field', column.field);
            util.addClass(th, column["class"]);
            // set disable autoHide or force enable
            if (typeof column.autoHide !== 'undefined') {
              if (column.autoHide !== true) {
                th.setAttribute('data-autohide-disabled', column.autoHide);
              } else {
                th.setAttribute('data-autohide-enabled', column.autoHide);
              }
            }
            $(th).data(column);
          }

          // set header attr option
          if (typeof column.attr !== 'undefined') {
            $.each(column.attr, function (key, val) {
              th.setAttribute(key, val);
            });
          }

          // apply text align to thead/tfoot
          if (typeof column.textAlign !== 'undefined') {
            var align = typeof datatable.textAlign[column.textAlign] !== 'undefined' ? datatable.textAlign[column.textAlign] : '';
            util.addClass(th, align);
          }
        });
        Plugin.setupDOM(tablePart);
      },
      /**
       * Initiate to get remote or local data via ajax
       */
      dataRender: function dataRender(action) {
        $(datatable.table).siblings('.' + pfx + 'datatable__pager').removeClass(pfx + 'datatable--paging-loaded');
        var buildMeta = function buildMeta() {
          datatable.dataSet = datatable.dataSet || [];
          Plugin.localDataUpdate();
          // local pagination meta
          var meta = Plugin.getDataSourceParam('pagination');
          if (meta.perpage === 0) {
            meta.perpage = options.data.pageSize || 10;
          }
          meta.total = datatable.dataSet.length;
          var start = Math.max(meta.perpage * (meta.page - 1), 0);
          var end = Math.min(start + meta.perpage, meta.total);
          datatable.dataSet = $(datatable.dataSet).slice(start, end);
          return meta;
        };
        var afterGetData = function afterGetData(result) {
          var localPagingCallback = function localPagingCallback(ctx, meta) {
            if (!$(ctx.pager).hasClass(pfx + 'datatable--paging-loaded')) {
              $(ctx.pager).remove();
              ctx.init(meta);
            }
            $(ctx.pager).off().on(pfx + 'datatable--on-goto-page', function (e) {
              $(ctx.pager).remove();
              ctx.init(meta);
            });
            var start = Math.max(meta.perpage * (meta.page - 1), 0);
            var end = Math.min(start + meta.perpage, meta.total);
            Plugin.localDataUpdate();
            datatable.dataSet = $(datatable.dataSet).slice(start, end);

            // insert data into table content
            Plugin.insertData();
          };
          $(datatable.wrap).removeClass(pfx + 'datatable--error');
          // pagination enabled
          if (options.pagination) {
            if (options.data.serverPaging && options.data.type !== 'local') {
              // server pagination
              var serverMeta = Plugin.getObject('meta', result || null);
              if (serverMeta !== null) {
                Plugin.pagingObject = Plugin.paging(serverMeta);
              } else {
                // no meta object from server response, fallback to local pagination
                Plugin.pagingObject = Plugin.paging(buildMeta(), localPagingCallback);
              }
            } else {
              // local pagination can be used by remote data also
              Plugin.pagingObject = Plugin.paging(buildMeta(), localPagingCallback);
            }
          } else {
            // pagination is disabled
            Plugin.localDataUpdate();
          }
          // insert data into table content
          Plugin.insertData();
        };

        // get local datasource
        if (options.data.type === 'local'
        // for remote json datasource
        // || typeof options.data.source.read === 'undefined' && datatable.dataSet !== null
        // for remote datasource, server sorting is disabled and data already received from remote
        || options.data.serverSorting === false && action === 'sort' || options.data.serverFiltering === false && action === 'search') {
          setTimeout(function () {
            afterGetData();
            Plugin.setAutoColumns();
          });
          return;
        }

        // getting data from remote only
        Plugin.getData().done(afterGetData);
      },
      /**
       * Process ajax data
       */
      insertData: function insertData() {
        datatable.dataSet = datatable.dataSet || [];
        var params = Plugin.getDataSourceParam();

        // get row attributes
        var pagination = params.pagination;
        var start = (Math.max(pagination.page, 1) - 1) * pagination.perpage;
        var end = Math.min(pagination.page, pagination.pages) * pagination.perpage;
        var rowProps = {};
        if (typeof options.data.attr.rowProps !== 'undefined' && options.data.attr.rowProps.length) {
          rowProps = options.data.attr.rowProps.slice(start, end);
        }
        var tableBody = document.createElement('tbody');
        tableBody.style.visibility = 'hidden';
        var colLength = options.columns.length;
        $.each(datatable.dataSet, function (rowIndex, row) {
          var tr = document.createElement('tr');
          tr.setAttribute('data-row', rowIndex);
          // keep data object to row
          $(tr).data('obj', row);
          if (typeof rowProps[rowIndex] !== 'undefined') {
            $.each(rowProps[rowIndex], function () {
              tr.setAttribute(this.name, this.value);
            });
          }
          var cellIndex = 0;
          var tds = [];
          for (var a = 0; a < colLength; a += 1) {
            var column = options.columns[a];
            var classes = [];
            // add sorted class to cells
            if (Plugin.getObject('sort.field', params) === column.field) {
              classes.push(pfx + 'datatable__cell--sorted');
            }

            // apply text align
            if (typeof column.textAlign !== 'undefined') {
              var align = typeof datatable.textAlign[column.textAlign] !== 'undefined' ? datatable.textAlign[column.textAlign] : '';
              classes.push(align);
            }

            // var classAttr = '';
            if (typeof column["class"] !== 'undefined') {
              classes.push(column["class"]);
            }
            var td = document.createElement('td');
            util.addClass(td, classes.join(' '));
            td.setAttribute('data-field', column.field);
            // set disable autoHide or force enable
            if (typeof column.autoHide !== 'undefined') {
              if (column.autoHide !== true) {
                td.setAttribute('data-autohide-disabled', column.autoHide);
              } else {
                td.setAttribute('data-autohide-enabled', column.autoHide);
              }
            }
            td.innerHTML = Plugin.getObject(column.field, row);
            tr.appendChild(td);
          }
          tableBody.appendChild(tr);
        });

        // display no records message
        if (datatable.dataSet.length === 0) {
          var errorSpan = document.createElement('span');
          util.addClass(errorSpan, pfx + 'datatable--error');
          errorSpan.innerHTML = Plugin.getOption('translate.records.noRecords');
          tableBody.appendChild(errorSpan);
          $(datatable.wrap).addClass(pfx + 'datatable--error ' + pfx + 'datatable--loaded');
          Plugin.spinnerCallback(false);
        }

        // replace existing table body
        $(datatable.tableBody).replaceWith(tableBody);
        datatable.tableBody = tableBody;

        // layout update
        Plugin.setupDOM(datatable.table);
        Plugin.setupCellField([datatable.tableBody]);
        Plugin.setupTemplateCell(datatable.tableBody);
        Plugin.layoutUpdate();
      },
      updateTableComponents: function updateTableComponents() {
        datatable.tableHead = $(datatable.table).children('thead');
        datatable.tableBody = $(datatable.table).children('tbody');
        datatable.tableFoot = $(datatable.table).children('tfoot');
      },
      /**
       * Call ajax for raw JSON data
       */
      getData: function getData() {
        // Plugin.spinnerCallback(true);

        var ajaxParams = {
          dataType: 'json',
          method: 'POST',
          data: {},
          timeout: Plugin.getOption('data.source.read.timeout') || 30000
        };
        if (options.data.type === 'local') {
          ajaxParams.url = options.data.source;
        }
        if (options.data.type === 'remote') {
          var data = Plugin.getDataSourceParam();
          // remove if server params is not enabled
          if (!Plugin.getOption('data.serverPaging')) {
            delete data['pagination'];
          }
          if (!Plugin.getOption('data.serverSorting')) {
            delete data['sort'];
          }
          ajaxParams.data = $.extend({}, ajaxParams.data, Plugin.getOption('data.source.read.params'), data);
          ajaxParams = $.extend({}, ajaxParams, Plugin.getOption('data.source.read'));
          if (typeof ajaxParams.url !== 'string') ajaxParams.url = Plugin.getOption('data.source.read');
          if (typeof ajaxParams.url !== 'string') ajaxParams.url = Plugin.getOption('data.source');
          // ajaxParams.data = $.extend(ajaxParams.data, data.pagination);
        }
        return $.ajax(ajaxParams).done(function (response, textStatus, jqXHR) {
          datatable.lastResponse = response;
          // extendible data map callback for custom datasource
          datatable.dataSet = datatable.originalDataSet = Plugin.dataMapCallback(response);
          Plugin.setAutoColumns();
          $(datatable).trigger(pfx + 'datatable--on-ajax-done', [datatable.dataSet]);
        }).fail(function (jqXHR, textStatus, errorThrown) {
          $(datatable).trigger(pfx + 'datatable--on-ajax-fail', [jqXHR]);
          $(datatable.tableBody).html($('<span/>').addClass(pfx + 'datatable--error').html(Plugin.getOption('translate.records.noRecords')));
          $(datatable.wrap).addClass(pfx + 'datatable--error ' + pfx + 'datatable--loaded');
          Plugin.spinnerCallback(false);
        }).always(function () {});
      },
      /**
       * Pagination object
       * @param meta if null, local pagination, otherwise remote
       *     pagination
       * @param callback for update data when navigating page
       */
      paging: function paging(meta, callback) {
        var pg = {
          meta: null,
          pager: null,
          paginateEvent: null,
          pagerLayout: {
            pagination: null,
            info: null
          },
          callback: null,
          init: function init(meta) {
            pg.meta = meta;

            // parse pagination meta to integer
            pg.meta.page = parseInt(pg.meta.page);
            pg.meta.pages = parseInt(pg.meta.pages);
            pg.meta.perpage = parseInt(pg.meta.perpage);
            pg.meta.total = parseInt(pg.meta.total);

            // always recount total pages
            pg.meta.pages = Math.max(Math.ceil(pg.meta.total / pg.meta.perpage), 1);

            // current page must be not over than total pages
            if (pg.meta.page > pg.meta.pages) pg.meta.page = pg.meta.pages;

            // set unique event name between tables
            pg.paginateEvent = Plugin.getTablePrefix('paging');
            pg.pager = $(datatable.table).siblings('.' + pfx + 'datatable__pager');
            if ($(pg.pager).hasClass(pfx + 'datatable--paging-loaded')) return;

            // if class .'+pfx+'datatable--paging-loaded not exist, recreate pagination
            $(pg.pager).remove();

            // if no pages available
            if (pg.meta.pages === 0) return;

            // update datasource params
            Plugin.setDataSourceParam('pagination', {
              page: pg.meta.page,
              pages: pg.meta.pages,
              perpage: pg.meta.perpage,
              total: pg.meta.total
            });

            // default callback function, contains remote pagination handler
            pg.callback = pg.serverCallback;
            // custom callback function
            if (typeof callback === 'function') pg.callback = callback;
            pg.addPaginateEvent();
            pg.populate();
            pg.meta.page = Math.max(pg.meta.page || 1, pg.meta.page);
            $(datatable).trigger(pg.paginateEvent, pg.meta);
            pg.pagingBreakpoint.call();
            $(window).resize(pg.pagingBreakpoint);
          },
          serverCallback: function serverCallback(ctx, meta) {
            Plugin.dataRender();
          },
          populate: function populate() {
            var icons = Plugin.getOption('layout.icons.pagination');
            var title = Plugin.getOption('translate.toolbar.pagination.items.default');
            // pager root element
            pg.pager = $('<div/>').addClass(pfx + 'datatable__pager ' + pfx + 'datatable--paging-loaded');
            // numbering links
            var pagerNumber = $('<ul/>').addClass(pfx + 'datatable__pager-nav');
            pg.pagerLayout['pagination'] = pagerNumber;

            // pager first/previous button
            $('<li/>').append($('<a/>').attr('title', title.first).addClass(pfx + 'datatable__pager-link ' + pfx + 'datatable__pager-link--first').append($('<i/>').addClass(icons.first)).on('click', pg.gotoMorePage).attr('data-page', 1)).appendTo(pagerNumber);
            $('<li/>').append($('<a/>').attr('title', title.prev).addClass(pfx + 'datatable__pager-link ' + pfx + 'datatable__pager-link--prev').append($('<i/>').addClass(icons.prev)).on('click', pg.gotoMorePage)).appendTo(pagerNumber);

            // more previous pages
            $('<li/>').append($('<a/>').attr('title', title.more).addClass(pfx + 'datatable__pager-link ' + pfx + 'datatable__pager-link--more-prev').html($('<i/>').addClass(icons.more)).on('click', pg.gotoMorePage)).appendTo(pagerNumber);
            $('<li/>').append($('<input/>').attr('type', 'text').addClass(pfx + 'pager-input form-control').attr('title', title.input).on('keyup', function () {
              // on keyup update [data-page]
              $(this).attr('data-page', Math.abs($(this).val()));
            }).on('keypress', function (e) {
              // on keypressed enter button
              if (e.which === 13) pg.gotoMorePage(e);
            })).appendTo(pagerNumber);
            var pagesNumber = Plugin.getOption('toolbar.items.pagination.pages.desktop.pagesNumber');
            var end = Math.ceil(pg.meta.page / pagesNumber) * pagesNumber;
            var start = end - pagesNumber;
            if (end > pg.meta.pages) {
              end = pg.meta.pages;
            }
            for (var x = start; x < end; x++) {
              var pageNumber = x + 1;
              $('<li/>').append($('<a/>').addClass(pfx + 'datatable__pager-link ' + pfx + 'datatable__pager-link-number').text(pageNumber).attr('data-page', pageNumber).attr('title', pageNumber).on('click', pg.gotoPage)).appendTo(pagerNumber);
            }

            // more next pages
            $('<li/>').append($('<a/>').attr('title', title.more).addClass(pfx + 'datatable__pager-link ' + pfx + 'datatable__pager-link--more-next').html($('<i/>').addClass(icons.more)).on('click', pg.gotoMorePage)).appendTo(pagerNumber);

            // pager next/last button
            $('<li/>').append($('<a/>').attr('title', title.next).addClass(pfx + 'datatable__pager-link ' + pfx + 'datatable__pager-link--next').append($('<i/>').addClass(icons.next)).on('click', pg.gotoMorePage)).appendTo(pagerNumber);
            $('<li/>').append($('<a/>').attr('title', title.last).addClass(pfx + 'datatable__pager-link ' + pfx + 'datatable__pager-link--last').append($('<i/>').addClass(icons.last)).on('click', pg.gotoMorePage).attr('data-page', pg.meta.pages)).appendTo(pagerNumber);

            // page info
            if (Plugin.getOption('toolbar.items.info')) {
              pg.pagerLayout['info'] = $('<div/>').addClass(pfx + 'datatable__pager-info').append($('<span/>').addClass(pfx + 'datatable__pager-detail'));
            }
            $.each(Plugin.getOption('toolbar.layout'), function (i, layout) {
              $(pg.pagerLayout[layout]).appendTo(pg.pager);
            });

            // page size select
            var pageSizeSelect = $('<select/>').addClass('selectpicker ' + pfx + 'datatable__pager-size').attr('title', Plugin.getOption('translate.toolbar.pagination.items.default.select')).attr('data-width', '60px').val(pg.meta.perpage).on('change', pg.updatePerpage).prependTo(pg.pagerLayout['info']);
            var pageSizes = Plugin.getOption('toolbar.items.pagination.pageSizeSelect');
            // default value here, to fix override option by user
            if (pageSizes.length == 0) pageSizes = [10, 20, 30, 50, 100];
            $.each(pageSizes, function (i, size) {
              var display = size;
              if (size === -1) display = Plugin.getOption('translate.toolbar.pagination.items.default.all');
              $('<option/>').attr('value', size).html(display).appendTo(pageSizeSelect);
            });

            // init selectpicker to dropdown
            $(datatable).ready(function () {
              $('.selectpicker').selectpicker().on('hide.bs.select', function () {
                // fix dropup arrow icon on hide
                $(this).closest('.bootstrap-select').removeClass('dropup');
              }).siblings('.dropdown-toggle').attr('title', Plugin.getOption('translate.toolbar.pagination.items.default.select'));
            });
            pg.paste();
          },
          paste: function paste() {
            // insert pagination based on placement position, top|bottom
            $.each($.unique(Plugin.getOption('toolbar.placement')), function (i, position) {
              if (position === 'bottom') {
                $(pg.pager).clone(true).insertAfter(datatable.table);
              }
              if (position === 'top') {
                // pager top need some extra space
                $(pg.pager).clone(true).addClass(pfx + 'datatable__pager--top').insertBefore(datatable.table);
              }
            });
          },
          gotoMorePage: function gotoMorePage(e) {
            e.preventDefault();
            // $(this) is a link of .'+pfx+'datatable__pager-link

            if ($(this).attr('disabled') === 'disabled') return false;
            var page = $(this).attr('data-page');

            // event from text input
            if (typeof page === 'undefined') {
              page = $(e.target).attr('data-page');
            }
            pg.openPage(parseInt(page));
            return false;
          },
          gotoPage: function gotoPage(e) {
            e.preventDefault();
            // prevent from click same page number
            if ($(this).hasClass(pfx + 'datatable__pager-link--active')) return;
            pg.openPage(parseInt($(this).data('page')));
          },
          openPage: function openPage(page) {
            // currentPage is 1-based index
            pg.meta.page = parseInt(page);
            $(datatable).trigger(pg.paginateEvent, pg.meta);
            pg.callback(pg, pg.meta);

            // update page callback function
            $(pg.pager).trigger(pfx + 'datatable--on-goto-page', pg.meta);
          },
          updatePerpage: function updatePerpage(e) {
            e.preventDefault();
            // if (Plugin.getOption('layout.height') === null) {
            // fix white space, when perpage is set from many records to less records
            // $('html, body').animate({scrollTop: $(datatable).position().top});
            // }

            pg.pager = $(datatable.table).siblings('.' + pfx + 'datatable__pager').removeClass(pfx + 'datatable--paging-loaded');

            // on change select page size
            if (e.originalEvent) {
              pg.meta.perpage = parseInt($(this).val());
            }
            $(pg.pager).find('select.' + pfx + 'datatable__pager-size').val(pg.meta.perpage).attr('data-selected', pg.meta.perpage);

            // update datasource params
            Plugin.setDataSourceParam('pagination', {
              page: pg.meta.page,
              pages: pg.meta.pages,
              perpage: pg.meta.perpage,
              total: pg.meta.total
            });

            // update page callback function
            $(pg.pager).trigger(pfx + 'datatable--on-update-perpage', pg.meta);
            $(datatable).trigger(pg.paginateEvent, pg.meta);
            pg.callback(pg, pg.meta);

            // update pagination info
            pg.updateInfo.call();
          },
          addPaginateEvent: function addPaginateEvent(e) {
            // pagination event
            $(datatable).off(pg.paginateEvent).on(pg.paginateEvent, function (e, meta) {
              Plugin.spinnerCallback(true);
              pg.pager = $(datatable.table).siblings('.' + pfx + 'datatable__pager');
              var pagerNumber = $(pg.pager).find('.' + pfx + 'datatable__pager-nav');

              // set sync active page class
              $(pagerNumber).find('.' + pfx + 'datatable__pager-link--active').removeClass(pfx + 'datatable__pager-link--active');
              $(pagerNumber).find('.' + pfx + 'datatable__pager-link-number[data-page="' + meta.page + '"]').addClass(pfx + 'datatable__pager-link--active');

              // set next and previous link page number
              $(pagerNumber).find('.' + pfx + 'datatable__pager-link--prev').attr('data-page', Math.max(meta.page - 1, 1));
              $(pagerNumber).find('.' + pfx + 'datatable__pager-link--next').attr('data-page', Math.min(meta.page + 1, meta.pages));

              // current page input value sync
              $(pg.pager).each(function () {
                $(this).find('.' + pfx + 'pager-input[type="text"]').prop('value', meta.page);
              });
              $(pg.pager).find('.' + pfx + 'datatable__pager-nav').show();
              if (meta.pages <= 1) {
                // hide pager if has 1 page
                $(pg.pager).find('.' + pfx + 'datatable__pager-nav').hide();
              }

              // update datasource params
              Plugin.setDataSourceParam('pagination', {
                page: pg.meta.page,
                pages: pg.meta.pages,
                perpage: pg.meta.perpage,
                total: pg.meta.total
              });
              $(pg.pager).find('select.' + pfx + 'datatable__pager-size').val(meta.perpage).attr('data-selected', meta.perpage);

              // clear active rows
              $(datatable.table).find('.' + pfx + 'checkbox > [type="checkbox"]').prop('checked', false);
              $(datatable.table).find('.' + pfx + 'datatable__row--active').removeClass(pfx + 'datatable__row--active');
              pg.updateInfo.call();
              pg.pagingBreakpoint.call();
              // Plugin.resetScroll();
            });
          },
          updateInfo: function updateInfo() {
            var start = Math.max(pg.meta.perpage * (pg.meta.page - 1) + 1, 1);
            var end = Math.min(start + pg.meta.perpage - 1, pg.meta.total);
            // page info update
            $(pg.pager).find('.' + pfx + 'datatable__pager-info').find('.' + pfx + 'datatable__pager-detail').html(Plugin.dataPlaceholder(Plugin.getOption('translate.toolbar.pagination.items.info'), {
              start: start,
              end: pg.meta.perpage === -1 ? pg.meta.total : end,
              pageSize: pg.meta.perpage === -1 || pg.meta.perpage >= pg.meta.total ? pg.meta.total : pg.meta.perpage,
              total: pg.meta.total
            }));
          },
          /**
           * Update pagination layout breakpoint
           */
          pagingBreakpoint: function pagingBreakpoint() {
            // keep page links reference
            var pagerNumber = $(datatable.table).siblings('.' + pfx + 'datatable__pager').find('.' + pfx + 'datatable__pager-nav');
            if ($(pagerNumber).length === 0) return;
            var currentPage = Plugin.getCurrentPage();
            var pagerInput = $(pagerNumber).find('.' + pfx + 'pager-input').closest('li');

            // reset
            $(pagerNumber).find('li').show();

            // pagination update
            $.each(Plugin.getOption('toolbar.items.pagination.pages'), function (mode, option) {
              if (util.isInResponsiveRange(mode)) {
                switch (mode) {
                  case 'desktop':
                  case 'tablet':
                    var end = Math.ceil(currentPage / option.pagesNumber) * option.pagesNumber;
                    var start = end - option.pagesNumber;
                    $(pagerInput).hide();
                    pg.meta = Plugin.getDataSourceParam('pagination');
                    pg.paginationUpdate();
                    break;
                  case 'mobile':
                    $(pagerInput).show();
                    $(pagerNumber).find('.' + pfx + 'datatable__pager-link--more-prev').closest('li').hide();
                    $(pagerNumber).find('.' + pfx + 'datatable__pager-link--more-next').closest('li').hide();
                    $(pagerNumber).find('.' + pfx + 'datatable__pager-link-number').closest('li').hide();
                    break;
                }
                return false;
              }
            });
          },
          /**
           * Update pagination number and button display
           */
          paginationUpdate: function paginationUpdate() {
            var pager = $(datatable.table).siblings('.' + pfx + 'datatable__pager').find('.' + pfx + 'datatable__pager-nav'),
              pagerMorePrev = $(pager).find('.' + pfx + 'datatable__pager-link--more-prev'),
              pagerMoreNext = $(pager).find('.' + pfx + 'datatable__pager-link--more-next'),
              pagerFirst = $(pager).find('.' + pfx + 'datatable__pager-link--first'),
              pagerPrev = $(pager).find('.' + pfx + 'datatable__pager-link--prev'),
              pagerNext = $(pager).find('.' + pfx + 'datatable__pager-link--next'),
              pagerLast = $(pager).find('.' + pfx + 'datatable__pager-link--last');

            // get visible page
            var pagerNumber = $(pager).find('.' + pfx + 'datatable__pager-link-number');
            // get page before of first visible
            var morePrevPage = Math.max($(pagerNumber).first().data('page') - 1, 1);
            $(pagerMorePrev).each(function (i, prev) {
              $(prev).attr('data-page', morePrevPage);
            });
            // show/hide <li>
            if (morePrevPage === 1) {
              $(pagerMorePrev).parent().hide();
            } else {
              $(pagerMorePrev).parent().show();
            }

            // get page after of last visible
            var moreNextPage = Math.min($(pagerNumber).last().data('page') + 1, pg.meta.pages);
            $(pagerMoreNext).each(function (i, prev) {
              $(pagerMoreNext).attr('data-page', moreNextPage).show();
            });

            // show/hide <li>
            if (moreNextPage === pg.meta.pages
            // missing dot fix when last hidden page is one left
            && moreNextPage === $(pagerNumber).last().data('page')) {
              $(pagerMoreNext).parent().hide();
            } else {
              $(pagerMoreNext).parent().show();
            }

            // begin/end of pages
            if (pg.meta.page === 1) {
              $(pagerFirst).attr('disabled', true).addClass(pfx + 'datatable__pager-link--disabled');
              $(pagerPrev).attr('disabled', true).addClass(pfx + 'datatable__pager-link--disabled');
            } else {
              $(pagerFirst).removeAttr('disabled').removeClass(pfx + 'datatable__pager-link--disabled');
              $(pagerPrev).removeAttr('disabled').removeClass(pfx + 'datatable__pager-link--disabled');
            }
            if (pg.meta.page === pg.meta.pages) {
              $(pagerNext).attr('disabled', true).addClass(pfx + 'datatable__pager-link--disabled');
              $(pagerLast).attr('disabled', true).addClass(pfx + 'datatable__pager-link--disabled');
            } else {
              $(pagerNext).removeAttr('disabled').removeClass(pfx + 'datatable__pager-link--disabled');
              $(pagerLast).removeAttr('disabled').removeClass(pfx + 'datatable__pager-link--disabled');
            }

            // display more buttons
            var nav = Plugin.getOption('toolbar.items.pagination.navigation');
            if (!nav.first) $(pagerFirst).remove();
            if (!nav.prev) $(pagerPrev).remove();
            if (!nav.next) $(pagerNext).remove();
            if (!nav.last) $(pagerLast).remove();
            if (!nav.more) {
              $(pagerMorePrev).remove();
              $(pagerMoreNext).remove();
            }
          }
        };
        pg.init(meta);
        return pg;
      },
      /**
       * Hide/show table cell defined by
       * options[columns][i][responsive][visible/hidden]
       */
      columnHide: function columnHide() {
        var screen = util.getViewPort().width;
        // foreach columns setting
        $.each(options.columns, function (i, column) {
          if (typeof column.responsive !== 'undefined') {
            var field = column.field;
            var tds = $.grep($(datatable.table).find('.' + pfx + 'datatable__cell'), function (n, i) {
              return field === $(n).data('field');
            });
            if (util.getBreakpoint(column.responsive.hidden) >= screen) {
              $(tds).hide();
            } else {
              $(tds).show();
            }
            if (util.getBreakpoint(column.responsive.visible) <= screen) {
              $(tds).show();
            } else {
              $(tds).hide();
            }
          }
        });
      },
      /**
       * Setup sub datatable
       */
      setupSubDatatable: function setupSubDatatable() {
        var subTableCallback = Plugin.getOption('detail.content');
        if (typeof subTableCallback !== 'function') return;

        // subtable already exist
        if ($(datatable.table).find('.' + pfx + 'datatable__subtable').length > 0) return;
        $(datatable.wrap).addClass(pfx + 'datatable--subtable');
        options.columns[0]['subtable'] = true;

        // toggle on open sub table
        var toggleSubTable = function toggleSubTable(e) {
          e.preventDefault();
          // get parent row of this subtable
          var parentRow = $(this).closest('.' + pfx + 'datatable__row');

          // get subtable row for sub table
          var subTableRow = $(parentRow).next('.' + pfx + 'datatable__row-subtable');
          if ($(subTableRow).length === 0) {
            // prepare DOM for sub table, each <tr> as parent and add <tr> as child table
            subTableRow = $('<tr/>').addClass(pfx + 'datatable__row-subtable ' + pfx + 'datatable__row-loading').hide().append($('<td/>').addClass(pfx + 'datatable__subtable').attr('colspan', Plugin.getTotalColumns()));
            $(parentRow).after(subTableRow);
            // add class to even row
            if ($(parentRow).hasClass(pfx + 'datatable__row--even')) {
              $(subTableRow).addClass(pfx + 'datatable__row-subtable--even');
            }
          }
          $(subTableRow).toggle();
          var subTable = $(subTableRow).find('.' + pfx + 'datatable__subtable');

          // get id from first column of parent row
          var primaryKey = $(this).closest('[data-field]:first-child').find('.' + pfx + 'datatable__toggle-subtable').data('value');
          var icon = $(this).find('i').removeAttr('class');

          // prevent duplicate datatable init
          if ($(parentRow).hasClass(pfx + 'datatable__row--subtable-expanded')) {
            $(icon).addClass(Plugin.getOption('layout.icons.rowDetail.collapse'));
            // remove expand class from parent row
            $(parentRow).removeClass(pfx + 'datatable__row--subtable-expanded');
            // trigger event on collapse
            $(datatable).trigger(pfx + 'datatable--on-collapse-subtable', [parentRow]);
          } else {
            // expand and run callback function
            $(icon).addClass(Plugin.getOption('layout.icons.rowDetail.expand'));
            // add expand class to parent row
            $(parentRow).addClass(pfx + 'datatable__row--subtable-expanded');
            // trigger event on expand
            $(datatable).trigger(pfx + 'datatable--on-expand-subtable', [parentRow]);
          }

          // prevent duplicate datatable init
          if ($(subTable).find('.' + pfx + 'datatable').length === 0) {
            // get data by primary id
            $.map(datatable.dataSet, function (n, i) {
              // primary id must be at the first column, otherwise e.data will be undefined
              if (primaryKey === n[options.columns[0].field]) {
                e.data = n;
                return true;
              }
              return false;
            });

            // deprecated in v5.0.6
            e.detailCell = subTable;
            e.parentRow = parentRow;
            e.subTable = subTable;

            // run callback with event
            subTableCallback(e);
            $(subTable).children('.' + pfx + 'datatable').on(pfx + 'datatable--on-init', function (e) {
              $(subTableRow).removeClass(pfx + 'datatable__row-loading');
            });
            if (Plugin.getOption('data.type') === 'local') {
              $(subTableRow).removeClass(pfx + 'datatable__row-loading');
            }
          }
        };
        var columns = options.columns;
        $(datatable.tableBody).find('.' + pfx + 'datatable__row').each(function (tri, tr) {
          $(tr).find('.' + pfx + 'datatable__cell').each(function (tdi, td) {
            // get column settings by field
            var column = $.grep(columns, function (n, i) {
              return $(td).data('field') === n.field;
            })[0];
            if (typeof column !== 'undefined') {
              var value = $(td).text();
              // enable column subtable toggle
              if (typeof column.subtable !== 'undefined' && column.subtable) {
                // check if subtable toggle exist
                if ($(td).find('.' + pfx + 'datatable__toggle-subtable').length > 0) return;
                // append subtable toggle
                $(td).html($('<a/>').addClass(pfx + 'datatable__toggle-subtable').attr('href', '#').attr('data-value', value).attr('title', Plugin.getOption('detail.title')).on('click', toggleSubTable).append($('<i/>').css('width', $(td).data('width')).addClass(Plugin.getOption('layout.icons.rowDetail.collapse'))));
              }
            }
          });
        });

        // $(datatable.tableHead).find('.'+pfx+'-datatable__row').first()
      },
      /**
       * Datasource mapping callback
       */
      dataMapCallback: function dataMapCallback(raw) {
        // static dataset array
        var dataSet = raw;
        // dataset mapping callback
        if (typeof Plugin.getOption('data.source.read.map') === 'function') {
          return Plugin.getOption('data.source.read.map')(raw);
        } else {
          // default data mapping fallback
          if (typeof raw !== 'undefined' && typeof raw.data !== 'undefined') {
            dataSet = raw.data;
          }
        }
        return dataSet;
      },
      isSpinning: false,
      /**
       * BlockUI spinner callback
       * @param block
       * @param target
       */
      spinnerCallback: function spinnerCallback(block, target) {
        if (typeof target === 'undefined') target = datatable;
        // get spinner options
        var spinnerOptions = Plugin.getOption('layout.spinner');
        // spinner is disabled
        if (typeof spinnerOptions === 'undefined' || !spinnerOptions) {
          return;
        }
        if (block) {
          if (!Plugin.isSpinning) {
            if (typeof spinnerOptions.message !== 'undefined' && spinnerOptions.message === true) {
              // use default spinner message from translation
              spinnerOptions.message = Plugin.getOption('translate.records.processing');
            }
            Plugin.isSpinning = true;
            if (typeof app !== 'undefined') {
              app.block(target, spinnerOptions);
            }
          }
        } else {
          Plugin.isSpinning = false;
          if (typeof app !== 'undefined') {
            app.unblock(target);
          }
        }
      },
      /**
       * Default sort callback function
       * @param data
       * @param sort
       * @param column
       * @returns {*|Array.<T>|{sort, field}|{asc, desc}}
       */
      sortCallback: function sortCallback(data, sort, column) {
        var type = column['type'] || 'string';
        var format = column['format'] || '';
        var field = column['field'];
        return $(data).sort(function (a, b) {
          var aField = a[field];
          var bField = b[field];
          switch (type) {
            case 'date':
              if (typeof moment === 'undefined') {
                throw new Error('Moment.js is required.');
              }
              var diff = moment(aField, format).diff(moment(bField, format));
              if (sort === 'asc') {
                return diff > 0 ? 1 : diff < 0 ? -1 : 0;
              } else {
                return diff < 0 ? 1 : diff > 0 ? -1 : 0;
              }
              break;
            case 'number':
              if (isNaN(parseFloat(aField)) && aField != null) {
                aField = Number(aField.replace(/[^0-9\.-]+/g, ''));
              }
              if (isNaN(parseFloat(bField)) && bField != null) {
                bField = Number(bField.replace(/[^0-9\.-]+/g, ''));
              }
              aField = parseFloat(aField);
              bField = parseFloat(bField);
              if (sort === 'asc') {
                return aField > bField ? 1 : aField < bField ? -1 : 0;
              } else {
                return aField < bField ? 1 : aField > bField ? -1 : 0;
              }
              break;
            case 'string':
            default:
              if (sort === 'asc') {
                return aField > bField ? 1 : aField < bField ? -1 : 0;
              } else {
                return aField < bField ? 1 : aField > bField ? -1 : 0;
              }
              break;
          }
        });
      },
      /**
       * Custom debug log
       * @param text
       * @param obj
       */
      log: function log(text, obj) {
        if (typeof obj === 'undefined') obj = '';
        if (datatable.debug) {
          var _console;
          /* eslint-disable */(_console = console).log.apply(_console, _toConsumableArray(oo_oo("185482492_7046_5_7046_27_4", text, obj)));
        }
      },
      /**
       * Auto hide columnds overflow in row
       */
      autoHide: function autoHide() {
        var hiddenExist = false;
        // force hide enabled
        var hidDefault = $(datatable.table).find('[data-autohide-enabled]');
        if (hidDefault.length) {
          hiddenExist = true;
          hidDefault.hide();
        }
        var toggleHiddenColumns = function toggleHiddenColumns(e) {
          e.preventDefault();
          var row = $(this).closest('.' + pfx + 'datatable__row');
          var detailRow = $(row).next();
          if (!$(detailRow).hasClass(pfx + 'datatable__row-detail')) {
            $(this).find('i').removeClass(Plugin.getOption('layout.icons.rowDetail.collapse')).addClass(Plugin.getOption('layout.icons.rowDetail.expand'));
            var hiddenCells = $(row).find('.' + pfx + 'datatable__cell:hidden');
            var clonedCells = hiddenCells.clone().show();
            detailRow = $('<tr/>').addClass(pfx + 'datatable__row-detail').insertAfter(row);
            var detailRowTd = $('<td/>').addClass(pfx + 'datatable__detail').attr('colspan', Plugin.getTotalColumns()).appendTo(detailRow);
            var detailSubTable = $('<table/>');
            $(clonedCells).each(function () {
              var field = $(this).data('field');
              var column = $.grep(options.columns, function (n, i) {
                return field === n.field;
              })[0];
              $(detailSubTable).append($('<tr class="' + pfx + 'datatable__row"></tr>').append($('<td class="' + pfx + 'datatable__cell"></td>').append($('<span/>').append(column.title))).append(this));
            });
            $(detailRowTd).append(detailSubTable);
          } else {
            $(this).find('i').removeClass(Plugin.getOption('layout.icons.rowDetail.expand')).addClass(Plugin.getOption('layout.icons.rowDetail.collapse'));
            $(detailRow).remove();
          }
        };
        setTimeout(function () {
          $(datatable.table).find('.' + pfx + 'datatable__cell').show();
          $(datatable.tableBody).each(function () {
            var recursive = 0;
            while ($(this)[0].offsetWidth < $(this)[0].scrollWidth && recursive < options.columns.length) {
              $(datatable.table).find('.' + pfx + 'datatable__row').each(function (i) {
                var cell = $(this).find('.' + pfx + 'datatable__cell:not(:hidden):not([data-autohide-disabled])').last();
                $(cell).hide();
                hiddenExist = true;
              });
              recursive++;
            }
          });
          if (hiddenExist) {
            // toggle show hidden columns
            $(datatable.tableBody).find('.' + pfx + 'datatable__row').each(function () {
              // if no toggle yet
              if ($(this).find('.' + pfx + 'datatable__toggle-detail').length === 0) {
                // add toggle
                $(this).prepend($('<td/>').addClass(pfx + 'datatable__cell ' + pfx + 'datatable__toggle-detail').append($('<a/>').addClass(pfx + 'datatable__toggle-detail').attr('href', '').on('click', toggleHiddenColumns).append('<i class="' + Plugin.getOption('layout.icons.rowDetail.collapse') + '"></i>')));
              }

              // check if subtable toggle exist
              if ($(datatable.tableHead).find('.' + pfx + 'datatable__toggle-detail').length === 0) {
                // add empty column to the header and footer
                $(datatable.tableHead).find('.' + pfx + 'datatable__row').first().prepend('<th class="' + pfx + 'datatable__cell ' + pfx + 'datatable__toggle-detail"><span></span></th>');
                $(datatable.tableFoot).find('.' + pfx + 'datatable__row').first().prepend('<th class="' + pfx + 'datatable__cell ' + pfx + 'datatable__toggle-detail"><span></span></th>');
              } else {
                $(datatable.tableHead).find('.' + pfx + 'datatable__toggle-detail').find('span');
              }
            });
          }
        });
        Plugin.adjustCellsWidth.call();
      },
      /**
       * To enable auto columns features for remote data source
       */
      setAutoColumns: function setAutoColumns() {
        if (Plugin.getOption('data.autoColumns')) {
          $.each(datatable.dataSet[0], function (k, v) {
            var found = $.grep(options.columns, function (n, i) {
              return k === n.field;
            });
            if (found.length === 0) {
              options.columns.push({
                field: k,
                title: k
              });
            }
          });
          $(datatable.tableHead).find('.' + pfx + 'datatable__row').remove();
          Plugin.setHeadTitle();
          if (Plugin.getOption('layout.footer')) {
            $(datatable.tableFoot).find('.' + pfx + 'datatable__row').remove();
            Plugin.setHeadTitle(datatable.tableFoot);
          }
        }
      },
      /********************
       ** HELPERS
       ********************/

      /**
       * Check if table is a locked colums table
       */
      isLocked: function isLocked() {
        var isLocked = Plugin.lockEnabledColumns();
        return isLocked.left.length > 0 || isLocked.right.length > 0;
      },
      isSubtable: function isSubtable() {
        return util.hasClass(datatable.wrap[0], pfx + 'datatable--subtable') || false;
      },
      /**
       * Get total extra space of an element for width calculation,
       * including padding, margin, border
       * @param element
       * @returns {number}
       */
      getExtraSpace: function getExtraSpace(element) {
        var padding = parseInt($(element).css('paddingRight')) + parseInt($(element).css('paddingLeft'));
        var margin = parseInt($(element).css('marginRight')) + parseInt($(element).css('marginLeft'));
        var border = Math.ceil($(element).css('border-right-width').replace('px', ''));
        return padding + margin + border;
      },
      /**
       * Insert data of array into {{ }} template placeholder
       * @param template
       * @param data
       * @returns {*}
       */
      dataPlaceholder: function dataPlaceholder(template, data) {
        var result = template;
        $.each(data, function (key, val) {
          result = result.replace('{{' + key + '}}', val);
        });
        return result;
      },
      /**
       * Get table unique ID
       * Note: table unique change each time refreshed
       * @param suffix
       * @returns {*}
       */
      getTableId: function getTableId(suffix) {
        if (typeof suffix === 'undefined') suffix = '';
        var id = $(datatable).attr('id');
        if (typeof id === 'undefined') {
          id = $(datatable).attr('class').split(' ')[0];
        }
        return id + suffix;
      },
      /**
       * Get table prefix with depth number
       */
      getTablePrefix: function getTablePrefix(suffix) {
        if (typeof suffix !== 'undefined') suffix = '-' + suffix;
        return Plugin.getTableId() + '-' + Plugin.getDepth() + suffix;
      },
      /**
       * Get current table depth of sub table
       * @returns {number}
       */
      getDepth: function getDepth() {
        var depth = 0;
        var table = datatable.table;
        do {
          table = $(table).parents('.' + pfx + 'datatable__table');
          depth++;
        } while ($(table).length > 0);
        return depth;
      },
      /**
       * Keep state item
       * @param key
       * @param value
       */
      stateKeep: function stateKeep(key, value) {
        key = Plugin.getTablePrefix(key);
        if (Plugin.getOption('data.saveState') === false) return;
        if (Plugin.getOption('data.saveState.webstorage') && localStorage) {
          localStorage.setItem(key, JSON.stringify(value));
        }
        if (Plugin.getOption('data.saveState.cookie')) {
          Cookies.set(key, JSON.stringify(value));
        }
      },
      /**
       * Get state item
       * @param key
       * @param defValue
       */
      stateGet: function stateGet(key, defValue) {
        key = Plugin.getTablePrefix(key);
        if (Plugin.getOption('data.saveState') === false) return;
        var value = null;
        if (Plugin.getOption('data.saveState.webstorage') && localStorage) {
          value = localStorage.getItem(key);
        } else {
          value = Cookies.get(key);
        }
        if (typeof value !== 'undefined' && value !== null) {
          return JSON.parse(value);
        }
      },
      /**
       * Update data in state without clear existing
       * @param key
       * @param value
       */
      stateUpdate: function stateUpdate(key, value) {
        var ori = Plugin.stateGet(key);
        if (typeof ori === 'undefined' || ori === null) ori = {};
        Plugin.stateKeep(key, $.extend({}, ori, value));
      },
      /**
       * Remove state item
       * @param key
       */
      stateRemove: function stateRemove(key) {
        key = Plugin.getTablePrefix(key);
        if (localStorage) {
          localStorage.removeItem(key);
        }
        Cookies.remove(key);
      },
      /**
       * Get total columns.
       */
      getTotalColumns: function getTotalColumns(tablePart) {
        if (typeof tablePart === 'undefined') tablePart = datatable.tableBody;
        return $(tablePart).find('.' + pfx + 'datatable__row').first().find('.' + pfx + 'datatable__cell').length;
      },
      /**
       * Get table row. Useful to get row when current table is in lock
       * mode. Can be used for both lock and normal table mode. By
       * default, returning result will be in a list of <td>.
       * @param tablePart
       * @param row 1-based index
       * @param tdOnly Optional. Default true
       * @returns {*}
       */
      getOneRow: function getOneRow(tablePart, row, tdOnly) {
        if (typeof tdOnly === 'undefined') tdOnly = true;
        // get list of <tr>
        var result = $(tablePart).find('.' + pfx + 'datatable__row:not(.' + pfx + 'datatable__row-detail):nth-child(' + row + ')');
        if (tdOnly) {
          // get list of <td> or <th>
          result = result.find('.' + pfx + 'datatable__cell');
        }
        return result;
      },
      /**
       * Sort table row at HTML level by column index.
       * todo; Not in use.
       * @param header Header sort clicked
       * @param sort asc|desc. Optional. Default asc
       * @param int Boolean. Optional. Comparison value parse to integer.
       *     Default false
       */
      sortColumn: function sortColumn(header, sort, _int) {
        if (typeof sort === 'undefined') sort = 'asc'; // desc
        if (typeof _int === 'undefined') _int = false;
        var column = $(header).index();
        var rows = $(datatable.tableBody).find('.' + pfx + 'datatable__row');
        var hIndex = $(header).closest('.' + pfx + 'datatable__lock').index();
        if (hIndex !== -1) {
          rows = $(datatable.tableBody).find('.' + pfx + 'datatable__lock:nth-child(' + (hIndex + 1) + ')').find('.' + pfx + 'datatable__row');
        }
        var container = $(rows).parent();
        $(rows).sort(function (a, b) {
          var tda = $(a).find('td:nth-child(' + column + ')').text();
          var tdb = $(b).find('td:nth-child(' + column + ')').text();
          if (_int) {
            // useful for integer type sorting
            tda = parseInt(tda);
            tdb = parseInt(tdb);
          }
          if (sort === 'asc') {
            return tda > tdb ? 1 : tda < tdb ? -1 : 0;
          } else {
            return tda < tdb ? 1 : tda > tdb ? -1 : 0;
          }
        }).appendTo(container);
      },
      /**
       * Perform sort remote and local
       */
      sorting: function sorting() {
        var sortObj = {
          init: function init() {
            if (options.sortable) {
              $(datatable.tableHead).find('.' + pfx + 'datatable__cell:not(.' + pfx + 'datatable__cell--check)').addClass(pfx + 'datatable__cell--sort').off('click').on('click', sortObj.sortClick);
              // first init
              sortObj.setIcon();
            }
          },
          setIcon: function setIcon() {
            var meta = Plugin.getDataSourceParam('sort');
            if ($.isEmptyObject(meta)) return;
            var column = Plugin.getColumnByField(meta.field);
            // sort is disabled for this column
            if (typeof column !== 'undefined' && typeof column.sortable !== 'undefined' && column.sortable === false) return;

            // sort icon beside column header
            var td = $(datatable.tableHead).find('.' + pfx + 'datatable__cell[data-field="' + meta.field + '"]').attr('data-sort', meta.sort);
            var sorting = $(td).find('span');
            var icon = $(sorting).find('i');
            var icons = Plugin.getOption('layout.icons.sort');
            // update sort icon; desc & asc
            if ($(icon).length > 0) {
              $(icon).removeAttr('class').addClass(icons[meta.sort]);
            } else {
              $(sorting).append($('<i/>').addClass(icons[meta.sort]));
            }

            // set sorted class to header on init
            $(td).addClass(pfx + 'datatable__cell--sorted');
          },
          sortClick: function sortClick(e) {
            var meta = Plugin.getDataSourceParam('sort');
            var field = $(this).data('field');
            var column = Plugin.getColumnByField(field);
            // sort is disabled for this column
            if (typeof column.sortable !== 'undefined' && column.sortable === false) return;

            // set sorted class to header
            $(datatable.tableHead).find('th').removeClass(pfx + 'datatable__cell--sorted');
            util.addClass(this, pfx + 'datatable__cell--sorted');
            $(datatable.tableHead).find('.' + pfx + 'datatable__cell > span > i').remove();
            if (options.sortable) {
              Plugin.spinnerCallback(true);
              var sort = 'desc';
              if (Plugin.getObject('field', meta) === field) {
                sort = Plugin.getObject('sort', meta);
              }

              // toggle sort
              sort = typeof sort === 'undefined' || sort === 'desc' ? 'asc' : 'desc';

              // update field and sort params
              meta = {
                field: field,
                sort: sort
              };
              Plugin.setDataSourceParam('sort', meta);
              sortObj.setIcon();
              setTimeout(function () {
                Plugin.dataRender('sort');
                $(datatable).trigger(pfx + 'datatable--on-sort', meta);
              }, 300);
            }
          }
        };
        sortObj.init();
      },
      /**
       * Update JSON data list linked with sort, filter and pagination.
       * Call this method, before using dataSet variable.
       * @returns {*|null}
       */
      localDataUpdate: function localDataUpdate() {
        var params = Plugin.getDataSourceParam();
        if (typeof datatable.originalDataSet === 'undefined') {
          datatable.originalDataSet = datatable.dataSet;
        }
        var field = Plugin.getObject('sort.field', params);
        var sort = Plugin.getObject('sort.sort', params);
        var column = Plugin.getColumnByField(field);
        if (typeof column !== 'undefined' && Plugin.getOption('data.serverSorting') !== true) {
          if (typeof column.sortCallback === 'function') {
            datatable.dataSet = column.sortCallback(datatable.originalDataSet, sort, column);
          } else {
            datatable.dataSet = Plugin.sortCallback(datatable.originalDataSet, sort, column);
          }
        } else {
          datatable.dataSet = datatable.originalDataSet;
        }

        // if server filter enable, don't pass local filter
        if (_typeof(params.query) === 'object' && !Plugin.getOption('data.serverFiltering')) {
          params.query = params.query || {};
          var nestedSearch = function nestedSearch(obj) {
            for (var field in obj) {
              if (!obj.hasOwnProperty(field)) continue;
              if (typeof obj[field] === 'string') {
                if (obj[field].toLowerCase() == search || obj[field].toLowerCase().indexOf(search) !== -1) {
                  return true;
                }
              } else if (typeof obj[field] === 'number') {
                if (obj[field] === search) {
                  return true;
                }
              } else if (_typeof(obj[field]) === 'object') {
                if (nestedSearch(obj[field])) {
                  return true;
                }
              }
            }
            return false;
          };
          var search = $(Plugin.getOption('search.input')).val();
          if (typeof search !== 'undefined' && search !== '') {
            search = search.toLowerCase();
            datatable.dataSet = $.grep(datatable.dataSet, nestedSearch);
            // remove generalSearch as we don't need this for next columns filter
            delete params.query[Plugin.getGeneralSearchKey()];
          }

          // remove empty element from array
          $.each(params.query, function (k, v) {
            if (v === '') {
              delete params.query[k];
            }
          });

          // filter array by query
          datatable.dataSet = Plugin.filterArray(datatable.dataSet, params.query);

          // reset array index
          datatable.dataSet = datatable.dataSet.filter(function () {
            return true;
          });
        }
        return datatable.dataSet;
      },
      /**
       * Utility helper to filter array by object pair of {key:value}
       * @param list
       * @param args
       * @param operator
       * @returns {*}
       */
      filterArray: function filterArray(list, args, operator) {
        if (_typeof(list) !== 'object') {
          return [];
        }
        if (typeof operator === 'undefined') operator = 'AND';
        if (_typeof(args) !== 'object') {
          return list;
        }
        operator = operator.toUpperCase();
        if ($.inArray(operator, ['AND', 'OR', 'NOT']) === -1) {
          return [];
        }
        var count = Object.keys(args).length;
        var filtered = [];
        $.each(list, function (key, obj) {
          var to_match = obj;
          var matched = 0;
          $.each(args, function (m_key, m_value) {
            m_value = m_value instanceof Array ? m_value : [m_value];
            var match_property = Plugin.getObject(m_key, to_match);
            if (typeof match_property !== 'undefined' && match_property) {
              var lhs = match_property.toString().toLowerCase();
              m_value.forEach(function (item, index) {
                if (item.toString().toLowerCase() == lhs || lhs.indexOf(item.toString().toLowerCase()) !== -1) {
                  matched++;
                }
              });
            }
          });
          if ('AND' == operator && matched == count || 'OR' == operator && matched > 0 || 'NOT' == operator && 0 == matched) {
            filtered[key] = obj;
          }
        });
        list = filtered;
        return list;
      },
      /**
       * Reset lock column scroll to 0 when resize
       */
      resetScroll: function resetScroll() {
        if (typeof options.detail === 'undefined' && Plugin.getDepth() === 1) {
          $(datatable.table).find('.' + pfx + 'datatable__row').css('left', 0);
          $(datatable.table).find('.' + pfx + 'datatable__lock').css('top', 0);
          $(datatable.tableBody).scrollTop(0);
        }
      },
      /**
       * Get column options by field
       * @param field
       * @returns {boolean}
       */
      getColumnByField: function getColumnByField(field) {
        if (typeof field === 'undefined') return;
        var result;
        $.each(options.columns, function (i, column) {
          if (field === column.field) {
            result = column;
            return false;
          }
        });
        return result;
      },
      /**
       * Get default sort column
       */
      getDefaultSortColumn: function getDefaultSortColumn() {
        var result;
        $.each(options.columns, function (i, column) {
          if (typeof column.sortable !== 'undefined' && $.inArray(column.sortable, ['asc', 'desc']) !== -1) {
            result = {
              sort: column.sortable,
              field: column.field
            };
            return false;
          }
        });
        return result;
      },
      /**
       * Helper to get element dimensions, when the element is hidden
       * @param element
       * @param includeMargin
       * @returns {{width: number, height: number, innerWidth: number,
       *     innerHeight: number, outerWidth: number, outerHeight:
       *     number}}
       */
      getHiddenDimensions: function getHiddenDimensions(element, includeMargin) {
        var props = {
            position: 'absolute',
            visibility: 'hidden',
            display: 'block'
          },
          dim = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
          },
          hiddenParents = $(element).parents().addBack().not(':visible');
        includeMargin = typeof includeMargin === 'boolean' ? includeMargin : false;
        var oldProps = [];
        hiddenParents.each(function () {
          var old = {};
          for (var name in props) {
            old[name] = this.style[name];
            this.style[name] = props[name];
          }
          oldProps.push(old);
        });
        dim.width = $(element).width();
        dim.outerWidth = $(element).outerWidth(includeMargin);
        dim.innerWidth = $(element).innerWidth();
        dim.height = $(element).height();
        dim.innerHeight = $(element).innerHeight();
        dim.outerHeight = $(element).outerHeight(includeMargin);
        hiddenParents.each(function (i) {
          var old = oldProps[i];
          for (var name in props) {
            this.style[name] = old[name];
          }
        });
        return dim;
      },
      getGeneralSearchKey: function getGeneralSearchKey() {
        var searchInput = $(Plugin.getOption('search.input'));
        return $(searchInput).prop('name') || $(searchInput).prop('id');
      },
      /**
       * Get value by dot notation path string and to prevent undefined
       * errors
       * @param path String Dot notation path in string
       * @param object Object to iterate
       * @returns {*}
       */
      getObject: function getObject(path, object) {
        return path.split('.').reduce(function (obj, i) {
          return obj !== null && typeof obj[i] !== 'undefined' ? obj[i] : null;
        }, object);
      },
      /**
       * Extend object
       * @param obj
       * @param path
       * @param value
       * @returns {*}
       */
      extendObj: function extendObj(obj, path, value) {
        var levels = path.split('.'),
          i = 0;
        function createLevel(child) {
          var name = levels[i++];
          if (typeof child[name] !== 'undefined' && child[name] !== null) {
            if (_typeof(child[name]) !== 'object' && typeof child[name] !== 'function') {
              child[name] = {};
            }
          } else {
            child[name] = {};
          }
          if (i === levels.length) {
            child[name] = value;
          } else {
            createLevel(child[name]);
          }
        }
        createLevel(obj);
        return obj;
      },
      rowEvenOdd: function rowEvenOdd() {
        // row even class
        $(datatable.tableBody).find('.' + pfx + 'datatable__row').removeClass(pfx + 'datatable__row--even');
        if ($(datatable.wrap).hasClass(pfx + 'datatable--subtable')) {
          $(datatable.tableBody).find('.' + pfx + 'datatable__row:not(.' + pfx + 'datatable__row-detail):even').addClass(pfx + 'datatable__row--even');
        } else {
          $(datatable.tableBody).find('.' + pfx + 'datatable__row:nth-child(even)').addClass(pfx + 'datatable__row--even');
        }
      },
      /********************
       ** PUBLIC API METHODS
       ********************/

      // delay timer
      timer: 0,
      /**
       * Redraw datatable by recalculating its DOM elements, etc.
       * @returns {jQuery}
       */
      redraw: function redraw() {
        Plugin.adjustCellsWidth.call();
        if (Plugin.isLocked()) {
          // fix hiding cell width issue
          Plugin.scrollbar();
          Plugin.resetScroll();
          Plugin.adjustCellsHeight.call();
        }
        Plugin.adjustLockContainer.call();
        Plugin.initHeight.call();
        return datatable;
      },
      /**
       * Shortcode to reload
       * @returns {jQuery}
       */
      load: function load() {
        Plugin.reload();
        return datatable;
      },
      /**
       * Datasource reload
       * @returns {jQuery}
       */
      reload: function reload() {
        var delay = function () {
          return function (callback, ms) {
            clearTimeout(Plugin.timer);
            Plugin.timer = setTimeout(callback, ms);
          };
        }();
        delay(function () {
          // local only. remote pagination will skip this block
          if (!options.data.serverFiltering) {
            Plugin.localDataUpdate();
          }
          Plugin.dataRender();
          $(datatable).trigger(pfx + 'datatable--on-reloaded');
        }, Plugin.getOption('search.delay'));
        return datatable;
      },
      /**
       * Get record by record ID
       * @param id
       * @returns {jQuery}
       */
      getRecord: function getRecord(id) {
        if (typeof datatable.tableBody === 'undefined') datatable.tableBody = $(datatable.table).children('tbody');
        $(datatable.tableBody).find('.' + pfx + 'datatable__cell:first-child').each(function (i, cell) {
          if (id == $(cell).text()) {
            var rowNumber = $(cell).closest('.' + pfx + 'datatable__row').index() + 1;
            datatable.API.record = datatable.API.value = Plugin.getOneRow(datatable.tableBody, rowNumber);
            return datatable;
          }
        });
        return datatable;
      },
      /**
       * @deprecated in v5.0.6
       * Get column of current record ID
       * @param columnName
       * @returns {jQuery}
       */
      getColumn: function getColumn(columnName) {
        Plugin.setSelectedRecords();
        datatable.API.value = $(datatable.API.record).find('[data-field="' + columnName + '"]');
        return datatable;
      },
      /**
       * Destroy datatable to original DOM state before datatable was
       * initialized
       * @returns {jQuery}
       */
      destroy: function destroy() {
        $(datatable).parent().find('.' + pfx + 'datatable__pager').remove();
        var initialDatatable = $(datatable.initialDatatable).addClass(pfx + 'datatable--destroyed').show();
        $(datatable).replaceWith(initialDatatable);
        datatable = initialDatatable;
        $(datatable).trigger(pfx + 'datatable--on-destroy');
        Plugin.isInit = false;
        initialDatatable = null;
        return initialDatatable;
      },
      /**
       * Sort by column field
       * @param field
       * @param sort
       */
      sort: function sort(field, _sort) {
        // toggle sort
        _sort = typeof _sort === 'undefined' ? 'asc' : _sort;
        Plugin.spinnerCallback(true);

        // update field and sort params
        var meta = {
          field: field,
          sort: _sort
        };
        Plugin.setDataSourceParam('sort', meta);
        setTimeout(function () {
          Plugin.dataRender('sort');
          $(datatable).trigger(pfx + 'datatable--on-sort', meta);
          $(datatable.tableHead).find('.' + pfx + 'datatable__cell > span > i').remove();
        }, 300);
        return datatable;
      },
      /**
       * @deprecated in v5.0.6
       * Get current selected column value
       * @returns {jQuery}
       */
      getValue: function getValue() {
        return $(datatable.API.value).text();
      },
      /**
       * Set checkbox active
       * @param cell JQuery selector or checkbox ID
       */
      setActive: function setActive(cell) {
        if (typeof cell === 'string') {
          // set by checkbox id
          cell = $(datatable.tableBody).find('.' + pfx + 'checkbox--single > [type="checkbox"][value="' + cell + '"]');
        }
        $(cell).prop('checked', true);
        var ids = [];
        $(cell).each(function (i, td) {
          // normal table
          var row = $(td).closest('tr').addClass(pfx + 'datatable__row--active');
          var colIndex = $(row).index() + 1;

          // lock table
          $(row).closest('tbody').find('tr:nth-child(' + colIndex + ')').not('.' + pfx + 'datatable__row-subtable').addClass(pfx + 'datatable__row--active');
          var id = $(td).attr('value');
          if (typeof id !== 'undefined') {
            ids.push(id);
          }
        });
        $(datatable).trigger(pfx + 'datatable--on-check', [ids]);
      },
      /**
       * Set checkbox inactive
       * @param cell JQuery selector or checkbox ID
       */
      setInactive: function setInactive(cell) {
        if (typeof cell === 'string') {
          // set by checkbox id
          cell = $(datatable.tableBody).find('.' + pfx + 'checkbox--single > [type="checkbox"][value="' + cell + '"]');
        }
        $(cell).prop('checked', false);
        var ids = [];
        $(cell).each(function (i, td) {
          // normal table
          var row = $(td).closest('tr').removeClass(pfx + 'datatable__row--active');
          var colIndex = $(row).index() + 1;

          // lock table
          $(row).closest('tbody').find('tr:nth-child(' + colIndex + ')').not('.' + pfx + 'datatable__row-subtable').removeClass(pfx + 'datatable__row--active');
          var id = $(td).attr('value');
          if (typeof id !== 'undefined') {
            ids.push(id);
          }
        });
        $(datatable).trigger(pfx + 'datatable--on-uncheck', [ids]);
      },
      /**
       * Set all checkboxes active or inactive
       * @param active
       */
      setActiveAll: function setActiveAll(active) {
        var checkboxes = $(datatable.table).find('> tbody, > thead').find('tr').not('.' + pfx + 'datatable__row-subtable').find('.' + pfx + 'datatable__cell--check [type="checkbox"]');
        if (active) {
          Plugin.setActive(checkboxes);
        } else {
          Plugin.setInactive(checkboxes);
        }
      },
      /**
       * @deprecated in v5.0.6
       * Get selected rows which are active
       * @returns {jQuery}
       */
      setSelectedRecords: function setSelectedRecords() {
        datatable.API.record = $(datatable.tableBody).find('.' + pfx + 'datatable__row--active');
        return datatable;
      },
      /**
       * Get selected records
       * @returns {null}
       */
      getSelectedRecords: function getSelectedRecords() {
        // support old method
        Plugin.setSelectedRecords();
        datatable.API.record = datatable.rows('.' + pfx + 'datatable__row--active').nodes();
        return datatable.API.record;
      },
      /**
       * Get options by dots notation path
       * @param path String Dot notation path in string
       * @returns {*}
       */
      getOption: function getOption(path) {
        return Plugin.getObject(path, options);
      },
      /**
       * Set global options nodes by dots notation path
       * @param path
       * @param object
       */
      setOption: function setOption(path, object) {
        options = Plugin.extendObj(options, path, object);
      },
      /**
       * Search filter for local & remote
       * @param value
       * @param columns. Optional list of columns to be filtered.
       */
      search: function search(value, columns) {
        if (typeof columns !== 'undefined') columns = $.makeArray(columns);
        var delay = function () {
          return function (callback, ms) {
            clearTimeout(Plugin.timer);
            Plugin.timer = setTimeout(callback, ms);
          };
        }();
        delay(function () {
          // get query parameters
          var query = Plugin.getDataSourceQuery();

          // search not by columns
          if (typeof columns === 'undefined' && typeof value !== 'undefined') {
            var key = Plugin.getGeneralSearchKey();
            query[key] = value;
          }

          // search by columns, support multiple columns
          if (_typeof(columns) === 'object') {
            $.each(columns, function (k, column) {
              query[column] = value;
            });
            // remove empty element from arrays
            $.each(query, function (k, v) {
              if (v === '' || $.isEmptyObject(v)) {
                delete query[k];
              }
            });
          }
          Plugin.setDataSourceQuery(query);

          // local filter only. remote pagination will skip this block
          if (!options.data.serverFiltering) {
            Plugin.localDataUpdate();
          }
          Plugin.dataRender('search');
        }, Plugin.getOption('search.delay'));
      },
      /**
       * Set datasource params extract
       * @param param
       * @param value
       */
      setDataSourceParam: function setDataSourceParam(param, value) {
        datatable.API.params = $.extend({}, {
          pagination: {
            page: 1,
            perpage: Plugin.getOption('data.pageSize')
          },
          sort: Plugin.getDefaultSortColumn(),
          query: {}
        }, datatable.API.params, Plugin.stateGet(Plugin.stateId));
        datatable.API.params = Plugin.extendObj(datatable.API.params, param, value);
        Plugin.stateKeep(Plugin.stateId, datatable.API.params);
      },
      /**
       * Get datasource params
       * @param param
       */
      getDataSourceParam: function getDataSourceParam(param) {
        datatable.API.params = $.extend({}, {
          pagination: {
            page: 1,
            perpage: Plugin.getOption('data.pageSize')
          },
          sort: Plugin.getDefaultSortColumn(),
          query: {}
        }, datatable.API.params, Plugin.stateGet(Plugin.stateId));
        if (typeof param === 'string') {
          return Plugin.getObject(param, datatable.API.params);
        }
        return datatable.API.params;
      },
      /**
       * Shortcode to datatable.getDataSourceParam('query');
       * @returns {*}
       */
      getDataSourceQuery: function getDataSourceQuery() {
        return Plugin.getDataSourceParam('query') || {};
      },
      /**
       * Shortcode to datatable.setDataSourceParam('query', query);
       * @param query
       */
      setDataSourceQuery: function setDataSourceQuery(query) {
        Plugin.setDataSourceParam('query', query);
      },
      /**
       * Get current page number
       * @returns {number}
       */
      getCurrentPage: function getCurrentPage() {
        return $(datatable.table).siblings('.' + pfx + 'datatable__pager').last().find('.' + pfx + 'datatable__pager-nav').find('.' + pfx + 'datatable__pager-link.' + pfx + 'datatable__pager-link--active').data('page') || 1;
      },
      /**
       * Get selected dropdown page size
       * @returns {*|number}
       */
      getPageSize: function getPageSize() {
        return $(datatable.table).siblings('.' + pfx + 'datatable__pager').last().find('select.' + pfx + 'datatable__pager-size').val() || 10;
      },
      /**
       * Get total rows
       */
      getTotalRows: function getTotalRows() {
        return datatable.API.params.pagination.total;
      },
      /**
       * Get full dataset in grid
       * @returns {*|null|Array}
       */
      getDataSet: function getDataSet() {
        return datatable.originalDataSet;
      },
      /**
       * @deprecated in v5.0.6
       * Hide column by column's field name
       * @param fieldName
       */
      hideColumn: function hideColumn(fieldName) {
        // add hide option for this column
        $.map(options.columns, function (column) {
          if (fieldName === column.field) {
            column.responsive = {
              hidden: 'xl'
            };
          }
          return column;
        });
        // hide current displayed column
        var tds = $.grep($(datatable.table).find('.' + pfx + 'datatable__cell'), function (n, i) {
          return fieldName === $(n).data('field');
        });
        $(tds).hide();
      },
      /**
       * @deprecated in v5.0.6
       * Show column by column's field name
       * @param fieldName
       */
      showColumn: function showColumn(fieldName) {
        // add hide option for this column
        $.map(options.columns, function (column) {
          if (fieldName === column.field) {
            delete column.responsive;
          }
          return column;
        });
        // hide current displayed column
        var tds = $.grep($(datatable.table).find('.' + pfx + 'datatable__cell'), function (n, i) {
          return fieldName === $(n).data('field');
        });
        $(tds).show();
      },
      nodeTr: [],
      nodeTd: [],
      nodeCols: [],
      recentNode: [],
      table: function table() {
        if (typeof datatable.table !== 'undefined') {
          return datatable.table;
        }
      },
      /**
       * Select a single row from the table
       * @param selector
       * @returns {jQuery}
       */
      row: function row(selector) {
        Plugin.rows(selector);
        Plugin.nodeTr = Plugin.recentNode = $(Plugin.nodeTr).first();
        return datatable;
      },
      /**
       * Select multiple rows from the table
       * @param selector
       * @returns {jQuery}
       */
      rows: function rows(selector) {
        if (Plugin.isLocked()) {
          Plugin.nodeTr = Plugin.recentNode = $(datatable.tableBody).find(selector).filter('.' + pfx + 'datatable__lock--scroll > .' + pfx + 'datatable__row');
        } else {
          Plugin.nodeTr = Plugin.recentNode = $(datatable.tableBody).find(selector).filter('.' + pfx + 'datatable__row');
        }
        return datatable;
      },
      /**
       * Select a single column from the table
       * @param index zero-based index
       * @returns {jQuery}
       */
      column: function column(index) {
        Plugin.nodeCols = Plugin.recentNode = $(datatable.tableBody).find('.' + pfx + 'datatable__cell:nth-child(' + (index + 1) + ')');
        return datatable;
      },
      /**
       * Select multiple columns from the table
       * @param selector
       * @returns {jQuery}
       */
      columns: function columns(selector) {
        var context = datatable.table;
        if (Plugin.nodeTr === Plugin.recentNode) {
          context = Plugin.nodeTr;
        }
        var columns = $(context).find('.' + pfx + 'datatable__cell[data-field="' + selector + '"]');
        if (columns.length > 0) {
          Plugin.nodeCols = Plugin.recentNode = columns;
        } else {
          Plugin.nodeCols = Plugin.recentNode = $(context).find(selector).filter('.' + pfx + 'datatable__cell');
        }
        return datatable;
      },
      cell: function cell(selector) {
        Plugin.cells(selector);
        Plugin.nodeTd = Plugin.recentNode = $(Plugin.nodeTd).first();
        return datatable;
      },
      cells: function cells(selector) {
        var cells = $(datatable.tableBody).find('.' + pfx + 'datatable__cell');
        if (typeof selector !== 'undefined') {
          cells = $(cells).filter(selector);
        }
        Plugin.nodeTd = Plugin.recentNode = cells;
        return datatable;
      },
      /**
       * Delete the selected row from the table
       * @returns {jQuery}
       */
      remove: function remove() {
        if ($(Plugin.nodeTr.length) && Plugin.nodeTr === Plugin.recentNode) {
          $(Plugin.nodeTr).remove();
        }
        Plugin.layoutUpdate();
        return datatable;
      },
      /**
       * Show or hide the columns or rows
       */
      visible: function visible(bool) {
        if ($(Plugin.recentNode.length)) {
          var locked = Plugin.lockEnabledColumns();
          if (Plugin.recentNode === Plugin.nodeCols) {
            var index = Plugin.recentNode.index();
            if (Plugin.isLocked()) {
              var scrollColumns = $(Plugin.recentNode).closest('.' + pfx + 'datatable__lock--scroll').length;
              if (scrollColumns) {
                // is at center of scrollable area
                index += locked.left.length + 1;
              } else if ($(Plugin.recentNode).closest('.' + pfx + 'datatable__lock--right').length) {
                // is at the right locked table
                index += locked.left.length + scrollColumns + 1;
              }
            }
          }
          if (bool) {
            if (Plugin.recentNode === Plugin.nodeCols) {
              delete options.columns[index].responsive;
            }
            $(Plugin.recentNode).show();
          } else {
            if (Plugin.recentNode === Plugin.nodeCols) {
              Plugin.setOption('columns.' + index + '.responsive', {
                hidden: 'xl'
              });
            }
            $(Plugin.recentNode).hide();
          }
          Plugin.redraw();
        }
      },
      /**
       * Get the the DOM element for the selected rows or columns
       * @returns {Array}
       */
      nodes: function nodes() {
        return Plugin.recentNode;
      },
      /**
       * will be implemented soon
       * @returns {jQuery}
       */
      dataset: function dataset() {
        return datatable;
      },
      /**
       * Open page by number
       * @param page number
       */
      gotoPage: function gotoPage(page) {
        if (typeof Plugin.pagingObject !== 'undefined') {
          Plugin.isInit = true;
          Plugin.pagingObject.openPage(page);
        }
      }
    };

    /**
     * Public API methods can be used directly by datatable
     */
    $.each(Plugin, function (funcName, func) {
      datatable[funcName] = func;
    });

    // initialize main datatable plugin
    if (typeof options !== 'undefined') {
      if (typeof options === 'string') {
        var method = options;
        datatable = $(this).data(pluginName);
        if (typeof datatable !== 'undefined') {
          options = datatable.options;
          Plugin[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
      } else {
        if (!datatable.data(pluginName) && !$(this).hasClass(pfx + 'datatable--loaded')) {
          datatable.dataSet = null;
          datatable.textAlign = {
            left: pfx + 'datatable__cell--left',
            center: pfx + 'datatable__cell--center',
            right: pfx + 'datatable__cell--right'
          };

          // merge default and user defined options
          options = $.extend(true, {}, $.fn[pluginName].defaults, options);
          datatable.options = options;

          // init plugin process
          Plugin.init.apply(this, [options]);
          $(datatable.wrap).data(pluginName, datatable);
        }
      }
    } else {
      // get existing instance datatable
      datatable = $(this).data(pluginName);
      if (typeof datatable === 'undefined') {
        $.error(pluginName + ' not initialized');
      }
      options = datatable.options;
    }
    return datatable;
  };

  // default options
  $.fn[pluginName].defaults = {
    // datasource definition
    data: {
      type: 'local',
      source: null,
      pageSize: 10,
      // display records per page
      saveState: {
        // save datatable state(pagination, filtering, sorting, etc) in cookie or browser webstorage
        cookie: false,
        webstorage: true
      },
      serverPaging: false,
      serverFiltering: false,
      serverSorting: false,
      autoColumns: false,
      attr: {
        rowProps: []
      }
    },
    // layout definition
    layout: {
      theme: 'default',
      // datatable will support multiple themes and designs
      "class": pfx + 'datatable--brand',
      // custom wrapper class
      scroll: false,
      // enable/disable datatable scroll both horizontal and vertical when needed.
      height: null,
      // datatable's body's fixed height
      minHeight: 500,
      footer: false,
      // display/hide footer
      header: true,
      // display/hide header
      customScrollbar: true,
      // set false to disable custom scrollbar

      // datatable spinner
      spinner: {
        overlayColor: '#000000',
        opacity: 0,
        type: 'loader',
        state: 'brand',
        message: true
      },
      // datatable UI icons
      icons: {
        sort: {
          asc: 'flaticon2-arrow-up',
          desc: 'flaticon2-arrow-down'
        },
        pagination: {
          next: 'flaticon2-next',
          prev: 'flaticon2-back',
          first: 'flaticon2-fast-back',
          last: 'flaticon2-fast-next',
          more: 'flaticon-more-1'
        },
        rowDetail: {
          expand: 'fa fa-caret-down',
          collapse: 'fa fa-caret-right'
        }
      }
    },
    // column sorting
    sortable: true,
    // resize column size with mouse drag coming soon)
    resizable: false,
    // column based filtering (coming soon)
    filterable: false,
    pagination: true,
    // inline and bactch editing (cooming soon)
    editable: false,
    // columns definition
    columns: [],
    search: {
      // enable trigger search by keyup enter
      onEnter: false,
      // input text for search
      input: null,
      // search delay in milliseconds
      delay: 400
    },
    rows: {
      // deprecated
      callback: function callback() {},
      // call before row template
      beforeTemplate: function beforeTemplate() {},
      // call after row template
      afterTemplate: function afterTemplate() {},
      autoHide: true
    },
    // toolbar
    toolbar: {
      // place pagination and displayInfo blocks according to the array order
      layout: ['pagination', 'info'],
      // toolbar placement can be at top or bottom or both top and bottom repeated
      placement: ['bottom'],
      //'top', 'bottom'

      // toolbar items
      items: {
        // pagination
        pagination: {
          // pagination type(default or scroll)
          type: 'default',
          // number of pages to display by breakpoints
          pages: {
            desktop: {
              layout: 'default',
              pagesNumber: 5
            },
            tablet: {
              layout: 'default',
              pagesNumber: 3
            },
            mobile: {
              layout: 'compact'
            }
          },
          // navigation buttons
          navigation: {
            prev: true,
            // display prev button
            next: true,
            // display next button
            first: true,
            // display first button
            last: true,
            // display last button
            more: false // display more button
          },
          // page size select
          pageSizeSelect: [] // display dropdown to select pagination size. -1 is used for "ALl" option
        },
        // records info
        info: true
      }
    },
    // here we will keep all strings and message used by datatable UI so developer can easiliy translate to any language.
    // By default the stirngs will be in the plugin source and here can override it
    translate: {
      records: {
        processing: 'Please wait...',
        noRecords: 'No records found'
      },
      toolbar: {
        pagination: {
          items: {
            "default": {
              first: 'First',
              prev: 'Previous',
              next: 'Next',
              last: 'Last',
              more: 'More pages',
              input: 'Page number',
              select: 'Select page size',
              all: 'all'
            },
            info: 'Showing {{start}} - {{end}} of {{total}}'
          }
        }
      }
    },
    extensions: {}
  };
})(jQuery);
"use strict";
(function ($) {
  var pluginName = 'KTDatatable';
  var pfx = 'kt-';
  $.fn[pluginName] = $.fn[pluginName] || {};

  /**
   * @param datatable Main datatable plugin instance
   * @param options Extension options
   * @returns {*}
   */
  $.fn[pluginName].checkbox = function (datatable, options) {
    var Extension = {
      selectedAllRows: false,
      selectedRows: [],
      unselectedRows: [],
      init: function init() {
        if (Extension.selectorEnabled()) {
          // reset
          datatable.setDataSourceParam(options.vars.selectedAllRows, false);
          datatable.stateRemove('checkbox');

          // requestIds is not null
          if (options.vars.requestIds) {
            // request ids in response
            datatable.setDataSourceParam(options.vars.requestIds, true);
          }

          // remove selected checkbox on datatable reload
          $(datatable).on(pfx + 'datatable--on-reloaded', function () {
            datatable.stateRemove('checkbox');
            datatable.setDataSourceParam(options.vars.selectedAllRows, false);
            Extension.selectedAllRows = false;
            Extension.selectedRows = [];
            Extension.unselectedRows = [];
          });

          // select all on extension init
          Extension.selectedAllRows = datatable.getDataSourceParam(options.vars.selectedAllRows);
          $(datatable).on(pfx + 'datatable--on-layout-updated', function (e, args) {
            if (args.table != $(datatable.wrap).attr('id')) {
              return;
            }
            datatable.ready(function () {
              Extension.initVars();
              Extension.initEvent();
              Extension.initSelect();
            });
          });
          $(datatable).on(pfx + 'datatable--on-check', function (e, ids) {
            ids.forEach(function (id) {
              Extension.selectedRows.push(id);
              // // remove from unselected rows
              Extension.unselectedRows = Extension.remove(Extension.unselectedRows, id);
            });
            var storage = {};
            storage['selectedRows'] = $.unique(Extension.selectedRows);
            storage['unselectedRows'] = $.unique(Extension.unselectedRows);
            datatable.stateKeep('checkbox', storage);
          });
          $(datatable).on(pfx + 'datatable--on-uncheck', function (e, ids) {
            ids.forEach(function (id) {
              Extension.unselectedRows.push(id);
              // // remove from selected rows
              Extension.selectedRows = Extension.remove(Extension.selectedRows, id);
            });
            var storage = {};
            storage['selectedRows'] = $.unique(Extension.selectedRows);
            storage['unselectedRows'] = $.unique(Extension.unselectedRows);
            datatable.stateKeep('checkbox', storage);
          });
        }
      },
      /**
       * Init checkbox clicks event
       */
      initEvent: function initEvent() {
        // select all checkbox click
        $(datatable.tableHead).find('.' + pfx + 'checkbox--all > [type="checkbox"]').click(function (e) {
          // clear selected and unselected rows
          Extension.selectedRows = Extension.unselectedRows = [];
          datatable.stateRemove('checkbox');

          // select all rows
          if ($(this).is(':checked')) {
            Extension.selectedAllRows = true;
          } else {
            Extension.selectedAllRows = false;
          }

          // local select all current page rows
          if (!options.vars.requestIds) {
            if ($(this).is(':checked')) {
              Extension.selectedRows = $.makeArray($(datatable.tableBody).find('.' + pfx + 'checkbox--single > [type="checkbox"]').map(function (i, chk) {
                return $(chk).val();
              }));
            }
            var storage = {};
            storage['selectedRows'] = $.unique(Extension.selectedRows);
            datatable.stateKeep('checkbox', storage);
          }

          // keep selectedAllRows in datasource params
          datatable.setDataSourceParam(options.vars.selectedAllRows, Extension.selectedAllRows);
          $(datatable).trigger(pfx + 'datatable--on-click-checkbox', [$(this)]);
        });

        // single row checkbox click
        $(datatable.tableBody).find('.' + pfx + 'checkbox--single > [type="checkbox"]').click(function (e) {
          var id = $(this).val();
          if ($(this).is(':checked')) {
            Extension.selectedRows.push(id);
            // remove from unselected rows
            Extension.unselectedRows = Extension.remove(Extension.unselectedRows, id);
          } else {
            Extension.unselectedRows.push(id);
            // remove from selected rows
            Extension.selectedRows = Extension.remove(Extension.selectedRows, id);
          }

          // local checkbox header check
          if (!options.vars.requestIds && Extension.selectedRows.length < 1) {
            // remove select all checkbox, if there is no checked checkbox left
            $(datatable.tableHead).find('.' + pfx + 'checkbox--all > [type="checkbox"]').prop('checked', false);
          }
          var storage = {};
          storage['selectedRows'] = $.unique(Extension.selectedRows);
          storage['unselectedRows'] = $.unique(Extension.unselectedRows);
          datatable.stateKeep('checkbox', storage);
          $(datatable).trigger(pfx + 'datatable--on-click-checkbox', [$(this)]);
        });
      },
      initSelect: function initSelect() {
        // selected all rows from server
        if (Extension.selectedAllRows && options.vars.requestIds) {
          if (!datatable.hasClass(pfx + 'datatable--error')) {
            // set header select all checkbox checked
            $(datatable.tableHead).find('.' + pfx + 'checkbox--all > [type="checkbox"]').prop('checked', true);
          }

          // set all checkbox in table body
          datatable.setActiveAll(true);

          // remove unselected rows
          Extension.unselectedRows.forEach(function (id) {
            datatable.setInactive(id);
          });
        } else {
          // single check for server and local
          Extension.selectedRows.forEach(function (id) {
            datatable.setActive(id);
          });

          // local checkbox; check if all checkboxes of currect page are checked
          if (!datatable.hasClass(pfx + 'datatable--error') && $(datatable.tableBody).find('.' + pfx + 'checkbox--single > [type="checkbox"]').not(':checked').length < 1) {
            // set header select all checkbox checked
            $(datatable.tableHead).find('.' + pfx + 'checkbox--all > [type="checkbox"]').prop('checked', true);
          }
        }
      },
      /**
       * Check if selector is enabled from options
       */
      selectorEnabled: function selectorEnabled() {
        return $.grep(datatable.options.columns, function (n, i) {
          return n.selector || false;
        })[0];
      },
      initVars: function initVars() {
        // get single select/unselect from localstorage
        var storage = datatable.stateGet('checkbox');
        if (typeof storage !== 'undefined') {
          Extension.selectedRows = storage['selectedRows'] || [];
          Extension.unselectedRows = storage['unselectedRows'] || [];
        }
      },
      getSelectedId: function getSelectedId(path) {
        Extension.initVars();

        // server selected all rows
        if (Extension.selectedAllRows && options.vars.requestIds) {
          if (typeof path === 'undefined') {
            path = options.vars.rowIds;
          }

          // if selected all rows, return id from response meta
          var selectedAllRows = datatable.getObject(path, datatable.lastResponse) || [];
          if (selectedAllRows.length > 0) {
            // remove single unselected rows from selectedAllRows ids from server response emta
            Extension.unselectedRows.forEach(function (id) {
              selectedAllRows = Extension.remove(selectedAllRows, parseInt(id));
            });
          }
          return selectedAllRows;
        }

        // else return single checked selected rows
        return Extension.selectedRows;
      },
      remove: function remove(array, element) {
        return array.filter(function (e) {
          return e !== element;
        });
      }
    };

    // make the extension accessible from datatable init
    datatable.checkbox = function () {
      return Extension;
    };
    if (_typeof(options) === 'object') {
      options = $.extend(true, {}, $.fn[pluginName].checkbox["default"], options);
      Extension.init.apply(this, [options]);
    }
    return datatable;
  };
  $.fn[pluginName].checkbox["default"] = {
    vars: {
      // select all rows flag to be sent to the server
      selectedAllRows: 'selectedAllRows',
      // request id parameter's name
      requestIds: 'requestIds',
      // response path to all rows id
      rowIds: 'meta.rowIds'
    }
  };
})(jQuery);
var defaults = {
  layout: {
    icons: {
      pagination: {
        next: 'flaticon2-next',
        prev: 'flaticon2-back',
        first: 'flaticon2-fast-back',
        last: 'flaticon2-fast-next',
        more: 'flaticon-more-1'
      },
      rowDetail: {
        expand: 'fa fa-caret-down',
        collapse: 'fa fa-caret-right'
      }
    }
  }
};
if (KTUtil.isRTL()) {
  defaults = {
    layout: {
      icons: {
        pagination: {
          next: 'flaticon2-back',
          prev: 'flaticon2-next',
          first: 'flaticon2-fast-next',
          last: 'flaticon2-fast-back'
        },
        rowDetail: {
          collapse: 'fa fa-caret-down',
          expand: 'fa fa-caret-right'
        }
      }
    }
  };
}
$.extend(true, $.fn.KTDatatable.defaults, defaults);
"use strict";

// Class definition
var KTChat = function () {
  var initChat = function initChat(parentEl) {
    var messageListEl = KTUtil.find(parentEl, '.kt-scroll');
    if (!messageListEl) {
      return;
    }

    // initialize perfect scrollbar(see:  https://github.com/utatti/perfect-scrollbar) 
    KTUtil.scrollInit(messageListEl, {
      windowScroll: false,
      // allow browser scroll when the scroll reaches the end of the side
      mobileNativeScroll: true,
      // enable native scroll for mobile
      desktopNativeScroll: false,
      // disable native scroll and use custom scroll for desktop 
      resetHeightOnDestroy: true,
      // reset css height on scroll feature destroyed
      handleWindowResize: true,
      // recalculate hight on window resize
      rememberPosition: true,
      // remember scroll position in cookie
      height: function height() {
        // calculate height
        var height;

        // Mobile mode
        if (KTUtil.isInResponsiveRange('tablet-and-mobile')) {
          return KTUtil.hasAttr(messageListEl, 'data-mobile-height') ? parseInt(KTUtil.attr(messageListEl, 'data-mobile-height')) : 300;
        }

        // Desktop mode
        if (KTUtil.isInResponsiveRange('desktop') && KTUtil.hasAttr(messageListEl, 'data-height')) {
          return parseInt(KTUtil.attr(messageListEl, 'data-height'));
        }
        var chatEl = KTUtil.find(parentEl, '.kt-chat');
        var portletHeadEl = KTUtil.find(parentEl, '.kt-portlet > .kt-portlet__head');
        var portletBodyEl = KTUtil.find(parentEl, '.kt-portlet > .kt-portlet__body');
        var portletFootEl = KTUtil.find(parentEl, '.kt-portlet > .kt-portlet__foot');
        if (KTUtil.isInResponsiveRange('desktop')) {
          height = KTLayout.getContentHeight();
        } else {
          height = KTUtil.getViewPort().height;
        }
        if (chatEl) {
          height = height - parseInt(KTUtil.css(chatEl, 'margin-top')) - parseInt(KTUtil.css(chatEl, 'margin-bottom'));
          height = height - parseInt(KTUtil.css(chatEl, 'padding-top')) - parseInt(KTUtil.css(chatEl, 'padding-bottom'));
        }
        if (portletHeadEl) {
          height = height - parseInt(KTUtil.css(portletHeadEl, 'height'));
          height = height - parseInt(KTUtil.css(portletHeadEl, 'margin-top')) - parseInt(KTUtil.css(portletHeadEl, 'margin-bottom'));
        }
        if (portletBodyEl) {
          height = height - parseInt(KTUtil.css(portletBodyEl, 'margin-top')) - parseInt(KTUtil.css(portletBodyEl, 'margin-bottom'));
          height = height - parseInt(KTUtil.css(portletBodyEl, 'padding-top')) - parseInt(KTUtil.css(portletBodyEl, 'padding-bottom'));
        }
        if (portletFootEl) {
          height = height - parseInt(KTUtil.css(portletFootEl, 'height'));
          height = height - parseInt(KTUtil.css(portletFootEl, 'margin-top')) - parseInt(KTUtil.css(portletFootEl, 'margin-bottom'));
        }

        // remove additional space
        height = height - 5;
        return height;
      }
    });

    // messaging
    var handleMessaging = function handleMessaging() {
      var scrollEl = KTUtil.find(parentEl, '.kt-scroll');
      var messagesEl = KTUtil.find(parentEl, '.kt-chat__messages');
      var textarea = KTUtil.find(parentEl, '.kt-chat__input textarea');
      if (textarea.value.length === 0) {
        return;
      }
      var node = document.createElement("DIV");
      KTUtil.addClass(node, 'kt-chat__message kt-chat__message--right');
      var html = '<div class="kt-chat__user">' + '<span class="kt-chat__datetime">Just now</span>' + '<a href="#" class="kt-chat__username">Jason Muller</span></a>' + '<span class="kt-userpic kt-userpic--circle kt-userpic--sm">' + '<img src="./assets/media/users/100_12.jpg" alt="image">' + '</span>' + '</div>' + '<div class="kt-chat__text kt-bg-light-brand">' + textarea.value;
      '</div>';
      KTUtil.setHTML(node, html);
      messagesEl.appendChild(node);
      textarea.value = '';
      scrollEl.scrollTop = parseInt(KTUtil.css(messagesEl, 'height'));
      var ps;
      if (ps = KTUtil.data(scrollEl).get('ps')) {
        ps.update();
      }
      setTimeout(function () {
        var node = document.createElement("DIV");
        KTUtil.addClass(node, 'kt-chat__message');
        var html = '<div class="kt-chat__user">' + '<span class="kt-userpic kt-userpic--circle kt-userpic--sm">' + '<img src="./assets/media/users/100_13.jpg" alt="image">' + '</span>' + '<a href="#" class="kt-chat__username">Max Born</span></a>' + '<span class="kt-chat__datetime">Just now</span>' + '</div>' + '<div class="kt-chat__text kt-bg-light-success">' + 'Right before vacation season we have the next Big Deal for you. <br>Book the car of your dreams and save up to <b>25%*</b> worldwide.';
        '</div>';
        KTUtil.setHTML(node, html);
        messagesEl.appendChild(node);
        textarea.value = '';
        scrollEl.scrollTop = parseInt(KTUtil.css(messagesEl, 'height'));
        var ps;
        if (ps = KTUtil.data(scrollEl).get('ps')) {
          ps.update();
        }
      }, 2000);
    };

    // attach events
    KTUtil.on(parentEl, '.kt-chat__input textarea', 'keydown', function (e) {
      if (e.keyCode == 13) {
        handleMessaging();
        e.preventDefault();
        return false;
      }
    });
    KTUtil.on(parentEl, '.kt-chat__input .kt-chat__reply', 'click', function (e) {
      handleMessaging();
    });
  };
  return {
    // public functions
    init: function init() {
      // init modal chat example
      initChat(KTUtil.getByID('kt_chat_modal'));

      // trigger click to show popup modal chat on page load
      setTimeout(function () {
        //KTUtil.getByID('kt_app_chat_launch_btn').click();
      }, 1000);
    },
    setup: function setup(element) {
      initChat(element);
    }
  };
}();
KTUtil.ready(function () {
  KTChat.init();
});
"use strict";
var KTDemoPanel = function () {
  var demoPanel = KTUtil.getByID('kt_demo_panel');
  var offcanvas;
  var _init = function init() {
    offcanvas = new KTOffcanvas(demoPanel, {
      overlay: true,
      baseClass: 'kt-demo-panel',
      closeBy: 'kt_demo_panel_close',
      toggleBy: 'kt_demo_panel_toggle'
    });
    var head = KTUtil.find(demoPanel, '.kt-demo-panel__head');
    var body = KTUtil.find(demoPanel, '.kt-demo-panel__body');
    KTUtil.scrollInit(body, {
      disableForMobile: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function height() {
        var height = parseInt(KTUtil.getViewPort().height);
        if (head) {
          height = height - parseInt(KTUtil.actualHeight(head));
          height = height - parseInt(KTUtil.css(head, 'marginBottom'));
        }
        height = height - parseInt(KTUtil.css(demoPanel, 'paddingTop'));
        height = height - parseInt(KTUtil.css(demoPanel, 'paddingBottom'));
        return height;
      }
    });
    if (typeof offcanvas !== 'undefined' && offcanvas.length === 0) {
      offcanvas.on('hide', function () {
        var expires = new Date(new Date().getTime() + 60 * 60 * 1000); // expire in 60 minutes from now
        Cookies.set('kt_demo_panel_shown', 1, {
          expires: expires
        });
      });
    }
  };
  var remind = function remind() {
    if (!(encodeURI(window.location.hostname) == 'keenthemes.com' || encodeURI(window.location.hostname) == 'www.keenthemes.com')) {
      return;
    }
    setTimeout(function () {
      if (!Cookies.get('kt_demo_panel_shown')) {
        var expires = new Date(new Date().getTime() + 15 * 60 * 1000); // expire in 15 minutes from now
        Cookies.set('kt_demo_panel_shown', 1, {
          expires: expires
        });
        offcanvas.show();
      }
    }, 4000);
  };
  return {
    init: function init() {
      _init();
      remind();
    }
  };
}();
$(document).ready(function () {
  KTDemoPanel.init();
});
"use strict";
var KTOffcanvasPanel = function () {
  var notificationPanel = KTUtil.get('kt_offcanvas_toolbar_notifications');
  var quickActionsPanel = KTUtil.get('kt_offcanvas_toolbar_quick_actions');
  var profilePanel = KTUtil.get('kt_offcanvas_toolbar_profile');
  var searchPanel = KTUtil.get('kt_offcanvas_toolbar_search');
  var initNotifications = function initNotifications() {
    var head = KTUtil.find(notificationPanel, '.kt-offcanvas-panel__head');
    var body = KTUtil.find(notificationPanel, '.kt-offcanvas-panel__body');
    var offcanvas = new KTOffcanvas(notificationPanel, {
      overlay: true,
      baseClass: 'kt-offcanvas-panel',
      closeBy: 'kt_offcanvas_toolbar_notifications_close',
      toggleBy: 'kt_offcanvas_toolbar_notifications_toggler_btn'
    });
    KTUtil.scrollInit(body, {
      mobileNativeScroll: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function height() {
        var height = parseInt(KTUtil.getViewPort().height);
        if (head) {
          height = height - parseInt(KTUtil.actualHeight(head));
          height = height - parseInt(KTUtil.css(head, 'marginBottom'));
        }
        height = height - parseInt(KTUtil.css(notificationPanel, 'paddingTop'));
        height = height - parseInt(KTUtil.css(notificationPanel, 'paddingBottom'));
        return height;
      }
    });
  };
  var initQucikActions = function initQucikActions() {
    var head = KTUtil.find(quickActionsPanel, '.kt-offcanvas-panel__head');
    var body = KTUtil.find(quickActionsPanel, '.kt-offcanvas-panel__body');
    var offcanvas = new KTOffcanvas(quickActionsPanel, {
      overlay: true,
      baseClass: 'kt-offcanvas-panel',
      closeBy: 'kt_offcanvas_toolbar_quick_actions_close',
      toggleBy: 'kt_offcanvas_toolbar_quick_actions_toggler_btn'
    });
    KTUtil.scrollInit(body, {
      mobileNativeScroll: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function height() {
        var height = parseInt(KTUtil.getViewPort().height);
        if (head) {
          height = height - parseInt(KTUtil.actualHeight(head));
          height = height - parseInt(KTUtil.css(head, 'marginBottom'));
        }
        height = height - parseInt(KTUtil.css(quickActionsPanel, 'paddingTop'));
        height = height - parseInt(KTUtil.css(quickActionsPanel, 'paddingBottom'));
        return height;
      }
    });
  };
  var initProfile = function initProfile() {
    var head = KTUtil.find(profilePanel, '.kt-offcanvas-panel__head');
    var body = KTUtil.find(profilePanel, '.kt-offcanvas-panel__body');
    var offcanvas = new KTOffcanvas(profilePanel, {
      overlay: true,
      baseClass: 'kt-offcanvas-panel',
      closeBy: 'kt_offcanvas_toolbar_profile_close',
      toggleBy: 'kt_offcanvas_toolbar_profile_toggler_btn'
    });
    KTUtil.scrollInit(body, {
      mobileNativeScroll: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function height() {
        var height = parseInt(KTUtil.getViewPort().height);
        if (head) {
          height = height - parseInt(KTUtil.actualHeight(head));
          height = height - parseInt(KTUtil.css(head, 'marginBottom'));
        }
        height = height - parseInt(KTUtil.css(profilePanel, 'paddingTop'));
        height = height - parseInt(KTUtil.css(profilePanel, 'paddingBottom'));
        return height;
      }
    });
  };
  var initSearch = function initSearch() {
    var head = KTUtil.find(searchPanel, '.kt-offcanvas-panel__head');
    var body = KTUtil.find(searchPanel, '.kt-offcanvas-panel__body');
    var offcanvas = new KTOffcanvas(searchPanel, {
      overlay: true,
      baseClass: 'kt-offcanvas-panel',
      closeBy: 'kt_offcanvas_toolbar_search_close',
      toggleBy: 'kt_offcanvas_toolbar_search_toggler_btn'
    });
    KTUtil.scrollInit(body, {
      mobileNativeScroll: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function height() {
        var height = parseInt(KTUtil.getViewPort().height);
        if (head) {
          height = height - parseInt(KTUtil.actualHeight(head));
          height = height - parseInt(KTUtil.css(head, 'marginBottom'));
        }
        height = height - parseInt(KTUtil.css(searchPanel, 'paddingTop'));
        height = height - parseInt(KTUtil.css(searchPanel, 'paddingBottom'));
        return height;
      }
    });
  };
  return {
    init: function init() {
      initNotifications();
      initQucikActions();
      initProfile();
      initSearch();
    }
  };
}();
$(document).ready(function () {
  KTOffcanvasPanel.init();
});
"use strict";
var KTQuickPanel = function () {
  var panel = KTUtil.get('kt_quick_panel');
  var notificationPanel = KTUtil.get('kt_quick_panel_tab_notifications');
  var logsPanel = KTUtil.get('kt_quick_panel_tab_logs');
  var settingsPanel = KTUtil.get('kt_quick_panel_tab_settings');
  var getContentHeight = function getContentHeight() {
    var height;
    var nav = KTUtil.find(panel, '.kt-quick-panel__nav');
    var content = KTUtil.find(panel, '.kt-quick-panel__content');
    height = parseInt(KTUtil.getViewPort().height) - parseInt(KTUtil.actualHeight(nav)) - 2 * parseInt(KTUtil.css(nav, 'padding-top')) - 10;
    return height;
  };
  var initOffcanvas = function initOffcanvas() {
    var offcanvas = new KTOffcanvas(panel, {
      overlay: true,
      baseClass: 'kt-quick-panel',
      closeBy: 'kt_quick_panel_close_btn',
      toggleBy: 'kt_quick_panel_toggler_btn'
    });
  };
  var initNotifications = function initNotifications() {
    KTUtil.scrollInit(notificationPanel, {
      mobileNativeScroll: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function height() {
        return getContentHeight();
      }
    });
  };
  var initLogs = function initLogs() {
    KTUtil.scrollInit(logsPanel, {
      mobileNativeScroll: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function height() {
        return getContentHeight();
      }
    });
  };
  var initSettings = function initSettings() {
    KTUtil.scrollInit(settingsPanel, {
      mobileNativeScroll: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function height() {
        return getContentHeight();
      }
    });
  };
  var updatePerfectScrollbars = function updatePerfectScrollbars() {
    $(panel).find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      KTUtil.scrollUpdate(notificationPanel);
      KTUtil.scrollUpdate(logsPanel);
      KTUtil.scrollUpdate(settingsPanel);
    });
  };
  return {
    init: function init() {
      initOffcanvas();
      initNotifications();
      initLogs();
      initSettings();
      updatePerfectScrollbars();
    }
  };
}();
$(document).ready(function () {
  KTQuickPanel.init();
});
"use strict";
var KTQuickSearch = function KTQuickSearch() {
  var target;
  var form;
  var input;
  var closeIcon;
  var resultWrapper;
  var resultDropdown;
  var resultDropdownToggle;
  var inputGroup;
  var query = '';
  var hasResult = false;
  var timeout = false;
  var isProcessing = false;
  var requestTimeout = 200; // ajax request fire timeout in milliseconds 
  var spinnerClass = 'kt-spinner kt-spinner--input kt-spinner--sm kt-spinner--brand kt-spinner--right';
  var resultClass = 'kt-quick-search--has-result';
  var minLength = 2;
  var showProgress = function showProgress() {
    isProcessing = true;
    KTUtil.addClass(inputGroup, spinnerClass);
    if (closeIcon) {
      KTUtil.hide(closeIcon);
    }
  };
  var hideProgress = function hideProgress() {
    isProcessing = false;
    KTUtil.removeClass(inputGroup, spinnerClass);
    if (closeIcon) {
      if (input.value.length < minLength) {
        KTUtil.hide(closeIcon);
      } else {
        KTUtil.show(closeIcon, 'flex');
      }
    }
  };
  var showDropdown = function showDropdown() {
    if (resultDropdownToggle && !KTUtil.hasClass(resultDropdown, 'show')) {
      $(resultDropdownToggle).dropdown('toggle');
      $(resultDropdownToggle).dropdown('update');
    }
  };
  var hideDropdown = function hideDropdown() {
    if (resultDropdownToggle && KTUtil.hasClass(resultDropdown, 'show')) {
      $(resultDropdownToggle).dropdown('toggle');
    }
  };
  var processSearch = function processSearch() {
    if (hasResult && query === input.value) {
      hideProgress();
      KTUtil.addClass(target, resultClass);
      showDropdown();
      KTUtil.scrollUpdate(resultWrapper);
      return;
    }
    query = input.value;
    KTUtil.removeClass(target, resultClass);
    showProgress();
    setTimeout(function () {
      $.ajax({
        url: 'https://keenthemes.com/metronic/themes/themes/metronic/dist/preview/inc/api/quick_search.php',
        data: {
          query: query
        },
        dataType: 'html',
        success: function success(res) {
          hasResult = true;
          hideProgress();
          KTUtil.addClass(target, resultClass);
          KTUtil.setHTML(resultWrapper, res);
          showDropdown();
          KTUtil.scrollUpdate(resultWrapper);
        },
        error: function error(res) {
          hasResult = false;
          hideProgress();
          KTUtil.addClass(target, resultClass);
          KTUtil.setHTML(resultWrapper, '<span class="kt-quick-search__message">Connection error. Pleae try again later.</div>');
          showDropdown();
          KTUtil.scrollUpdate(resultWrapper);
        }
      });
    }, 1000);
  };
  var handleCancel = function handleCancel(e) {
    input.value = '';
    query = '';
    hasResult = false;
    KTUtil.hide(closeIcon);
    KTUtil.removeClass(target, resultClass);
    hideDropdown();
  };
  var handleSearch = function handleSearch() {
    if (input.value.length < minLength) {
      hideProgress();
      hideDropdown();
      return;
    }
    if (isProcessing == true) {
      return;
    }
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      processSearch();
    }, requestTimeout);
  };
  return {
    init: function init(element) {
      // Init
      target = element;
      form = KTUtil.find(target, '.kt-quick-search__form');
      input = KTUtil.find(target, '.kt-quick-search__input');
      closeIcon = KTUtil.find(target, '.kt-quick-search__close');
      resultWrapper = KTUtil.find(target, '.kt-quick-search__wrapper');
      resultDropdown = KTUtil.find(target, '.dropdown-menu');
      resultDropdownToggle = KTUtil.find(target, '[data-toggle="dropdown"]');
      inputGroup = KTUtil.find(target, '.input-group');

      // Attach input keyup handler
      KTUtil.addEvent(input, 'keyup', handleSearch);
      KTUtil.addEvent(input, 'focus', handleSearch);

      // Prevent enter click
      form.onkeypress = function (e) {
        var key = e.charCode || e.keyCode || 0;
        if (key == 13) {
          e.preventDefault();
        }
      };
      KTUtil.addEvent(closeIcon, 'click', handleCancel);

      // Auto-focus on the form input on dropdown form open
      var toggle = KTUtil.getByID('kt_quick_search_toggle');
      if (toggle) {
        $(toggle).on('shown.bs.dropdown', function () {
          input.focus();
        });
      }
    }
  };
};
var KTQuickSearchMobile = KTQuickSearch;
$(document).ready(function () {
  if (KTUtil.get('kt_quick_search_default')) {
    KTQuickSearch().init(KTUtil.get('kt_quick_search_default'));
  }
  if (KTUtil.get('kt_quick_search_inline')) {
    KTQuickSearchMobile().init(KTUtil.get('kt_quick_search_inline'));
  }
});
"use strict";
var KTLayout = function () {
  var body;
  var header;
  var headerMenu;
  var headerMenuOffcanvas;
  var asideMenu;
  var asideMenuOffcanvas;
  var asideToggler;
  var asideSecondary;
  var asideSecondaryToggler;
  var scrollTop;
  var pageStickyPortlet;

  // Header
  var _initHeader = function initHeader() {
    var tmp;
    var headerEl = KTUtil.get('kt_header');
    var options = {
      offset: {},
      minimize: {
        /*
        desktop: {
            on: 'kt-header--minimize'
        },
        */
        desktop: false,
        mobile: false
      }
    };
    if (tmp = KTUtil.attr(headerEl, 'data-ktheader-minimize-offset')) {
      options.offset.desktop = tmp;
    }
    if (tmp = KTUtil.attr(headerEl, 'data-ktheader-minimize-mobile-offset')) {
      options.offset.mobile = tmp;
    }
    header = new KTHeader('kt_header', options);
  };

  // Header Menu
  var initHeaderMenu = function initHeaderMenu() {
    // init aside left offcanvas
    headerMenuOffcanvas = new KTOffcanvas('kt_header_menu_wrapper', {
      overlay: true,
      baseClass: 'kt-header-menu-wrapper',
      closeBy: 'kt_header_menu_mobile_close_btn',
      toggleBy: {
        target: 'kt_header_mobile_toggler',
        state: 'kt-header-mobile__toolbar-toggler--active'
      }
    });
    headerMenu = new KTMenu('kt_header_menu', {
      submenu: {
        desktop: 'dropdown',
        tablet: 'accordion',
        mobile: 'accordion'
      },
      accordion: {
        slideSpeed: 200,
        // accordion toggle slide speed in milliseconds
        expandAll: false // allow having multiple expanded accordions in the menu
      }
    });
  };

  // Header Topbar
  var initHeaderTopbar = function initHeaderTopbar() {
    asideToggler = new KTToggle('kt_header_mobile_topbar_toggler', {
      target: 'body',
      targetState: 'kt-header__topbar--mobile-on',
      togglerState: 'kt-header-mobile__toolbar-topbar-toggler--active'
    });
  };

  // Aside
  var _initAside = function initAside() {
    // init aside left offcanvas
    var asidBrandHover = false;
    var aside = KTUtil.get('kt_aside');
    var asideBrand = KTUtil.get('kt_aside_brand');
    var asideOffcanvasClass = KTUtil.hasClass(aside, 'kt-aside--offcanvas-default') ? 'kt-aside--offcanvas-default' : 'kt-aside';
    asideMenuOffcanvas = new KTOffcanvas('kt_aside', {
      baseClass: asideOffcanvasClass,
      overlay: true,
      closeBy: 'kt_aside_close_btn',
      toggleBy: {
        target: 'kt_aside_mobile_toggler',
        state: 'kt-header-mobile__toolbar-toggler--active'
      }
    });

    // Handle minimzied aside hover
    if (KTUtil.hasClass(body, 'kt-aside--fixed')) {
      var insideTm;
      var outsideTm;
      KTUtil.addEvent(aside, 'mouseenter', function (e) {
        e.preventDefault();
        if (KTUtil.isInResponsiveRange('desktop') === false) {
          return;
        }
        if (outsideTm) {
          clearTimeout(outsideTm);
          outsideTm = null;
        }
        insideTm = setTimeout(function () {
          if (KTUtil.hasClass(body, 'kt-aside--minimize') && KTUtil.isInResponsiveRange('desktop')) {
            KTUtil.removeClass(body, 'kt-aside--minimize');

            // Minimizing class
            KTUtil.addClass(body, 'kt-aside--minimizing');
            KTUtil.transitionEnd(body, function () {
              KTUtil.removeClass(body, 'kt-aside--minimizing');
            });

            // Hover class
            KTUtil.addClass(body, 'kt-aside--minimize-hover');
            asideMenu.scrollUpdate();
            asideMenu.scrollTop();
          }
        }, 50);
      });
      KTUtil.addEvent(aside, 'mouseleave', function (e) {
        e.preventDefault();
        if (KTUtil.isInResponsiveRange('desktop') === false) {
          return;
        }
        if (insideTm) {
          clearTimeout(insideTm);
          insideTm = null;
        }
        outsideTm = setTimeout(function () {
          if (KTUtil.hasClass(body, 'kt-aside--minimize-hover') && KTUtil.isInResponsiveRange('desktop')) {
            KTUtil.removeClass(body, 'kt-aside--minimize-hover');
            KTUtil.addClass(body, 'kt-aside--minimize');

            // Minimizing class
            KTUtil.addClass(body, 'kt-aside--minimizing');
            KTUtil.transitionEnd(body, function () {
              KTUtil.removeClass(body, 'kt-aside--minimizing');
            });

            // Hover class
            asideMenu.scrollUpdate();
            asideMenu.scrollTop();
          }
        }, 100);
      });
    }
  };

  // Aside menu
  var initAsideMenu = function initAsideMenu() {
    // Init aside menu
    var menu = KTUtil.get('kt_aside_menu');
    var menuDesktopMode = KTUtil.attr(menu, 'data-ktmenu-dropdown') === '1' ? 'dropdown' : 'accordion';
    var scroll;
    if (KTUtil.attr(menu, 'data-ktmenu-scroll') === '1') {
      scroll = {
        rememberPosition: true,
        // remember position on page reload
        height: function height() {
          // calculate available scrollable area height
          var height;
          if (KTUtil.isInResponsiveRange('desktop')) {
            height = parseInt(KTUtil.getViewPort().height) - parseInt(KTUtil.actualHeight('kt_aside_brand')) - parseInt(KTUtil.getByID('kt_aside_footer') ? KTUtil.actualHeight('kt_aside_footer') : 0);
          } else {
            height = parseInt(KTUtil.getViewPort().height) - parseInt(KTUtil.getByID('kt_aside_footer') ? KTUtil.actualHeight('kt_aside_footer') : 0);
          }
          height = height - (parseInt(KTUtil.css(menu, 'marginBottom')) + parseInt(KTUtil.css(menu, 'marginTop')));
          return height;
        }
      };
    }
    asideMenu = new KTMenu('kt_aside_menu', {
      // vertical scroll
      scroll: scroll,
      // submenu setup
      submenu: {
        desktop: menuDesktopMode,
        tablet: 'accordion',
        // menu set to accordion in tablet mode
        mobile: 'accordion' // menu set to accordion in mobile mode
      },
      //accordion setup
      accordion: {
        expandAll: false // allow having multiple expanded accordions in the menu
      }
    });

    // sample set active menu
    // asideMenu.setActiveItem($('a[href="?page=custom/pages/pricing/pricing-1&demo=demo1"]').closest('.kt-menu__item')[0]);
  };

  // Sidebar toggle
  var initAsideToggler = function initAsideToggler() {
    if (!KTUtil.get('kt_aside_toggler')) {
      return;
    }
    asideToggler = new KTToggle('kt_aside_toggler', {
      target: 'body',
      targetState: 'kt-aside--minimize',
      togglerState: 'kt-aside__brand-aside-toggler--active'
    });
    asideToggler.on('toggle', function (toggle) {
      KTUtil.addClass(body, 'kt-aside--minimizing');
      if (KTUtil.get('kt_page_portlet')) {
        pageStickyPortlet.updateSticky();
      }
      KTUtil.transitionEnd(body, function () {
        KTUtil.removeClass(body, 'kt-aside--minimizing');
      });
      headerMenu.pauseDropdownHover(800);
      asideMenu.pauseDropdownHover(800);

      // Remember state in cookie
      Cookies.set('kt_aside_toggle_state', toggle.getState());
      // to set default minimized left aside use this cookie value in your 
      // server side code and add "kt-brand--minimize kt-aside--minimize" classes to
      // the body tag in order to initialize the minimized left aside mode during page loading.
    });
    asideToggler.on('beforeToggle', function (toggle) {
      var body = KTUtil.get('body');
      if (KTUtil.hasClass(body, 'kt-aside--minimize') === false && KTUtil.hasClass(body, 'kt-aside--minimize-hover')) {
        KTUtil.removeClass(body, 'kt-aside--minimize-hover');
      }
    });
  };

  // Aside secondary
  var _initAsideSecondary = function initAsideSecondary() {
    if (!KTUtil.get('kt_aside_secondary')) {
      return;
    }
    asideSecondaryToggler = new KTToggle('kt_aside_secondary_toggler', {
      target: 'body',
      targetState: 'kt-aside-secondary--expanded'
    });
    asideSecondaryToggler.on('toggle', function (toggle) {
      if (KTUtil.get('kt_page_portlet')) {
        pageStickyPortlet.updateSticky();
      }
    });
  };

  // Scrolltop
  var initScrolltop = function initScrolltop() {
    var scrolltop = new KTScrolltop('kt_scrolltop', {
      offset: 300,
      speed: 600
    });
  };

  // Init page sticky portlet
  var _initPageStickyPortlet = function initPageStickyPortlet() {
    var asideWidth = 255;
    var asideMinimizeWidth = 78;
    var asideSecondaryWidth = 60;
    var asideSecondaryExpandedWidth = 310;
    return new KTPortlet('kt_page_portlet', {
      sticky: {
        offset: parseInt(KTUtil.css(KTUtil.get('kt_header'), 'height')),
        zIndex: 90,
        position: {
          top: function top() {
            var h = 0;
            if (KTUtil.isInResponsiveRange('desktop')) {
              if (KTUtil.hasClass(body, 'kt-header--fixed')) {
                h = h + parseInt(KTUtil.css(KTUtil.get('kt_header'), 'height'));
              }
              if (KTUtil.hasClass(body, 'kt-subheader--fixed') && KTUtil.get('kt_subheader')) {
                h = h + parseInt(KTUtil.css(KTUtil.get('kt_subheader'), 'height'));
              }
            } else {
              if (KTUtil.hasClass(body, 'kt-header-mobile--fixed')) {
                h = h + parseInt(KTUtil.css(KTUtil.get('kt_header_mobile'), 'height'));
              }
            }
            return h;
          },
          left: function left() {
            var left = 0;
            if (KTUtil.isInResponsiveRange('desktop')) {
              if (KTUtil.hasClass(body, 'kt-aside--minimize')) {
                left += asideMinimizeWidth;
              } else if (KTUtil.hasClass(body, 'kt-aside--enabled')) {
                left += asideWidth;
              }
            }
            left += parseInt(KTUtil.css(KTUtil.get('kt_content'), 'paddingLeft'));
            return left;
          },
          right: function right() {
            var right = 0;
            if (KTUtil.isInResponsiveRange('desktop')) {
              if (KTUtil.hasClass(body, 'kt-aside-secondary--enabled')) {
                if (KTUtil.hasClass(body, 'kt-aside-secondary--expanded')) {
                  right += asideSecondaryExpandedWidth + asideSecondaryWidth;
                } else {
                  right += asideSecondaryWidth;
                }
              } else {
                right += parseInt(KTUtil.css(KTUtil.get('kt_content'), 'paddingRight'));
              }
            }
            if (KTUtil.get('kt_aside_secondary')) {
              right += parseInt(KTUtil.css(KTUtil.get('kt_content'), 'paddingRight'));
            }
            return right;
          }
        }
      }
    });
  };

  // Calculate content available full height
  var _getContentHeight = function getContentHeight() {
    var height;
    height = KTUtil.getViewPort().height;
    if (KTUtil.getByID('kt_header')) {
      height = height - KTUtil.actualHeight('kt_header');
    }
    if (KTUtil.getByID('kt_subheader')) {
      height = height - KTUtil.actualHeight('kt_subheader');
    }
    if (KTUtil.getByID('kt_footer')) {
      height = height - parseInt(KTUtil.css('kt_footer', 'height'));
    }
    if (KTUtil.getByID('kt_content')) {
      height = height - parseInt(KTUtil.css('kt_content', 'padding-top')) - parseInt(KTUtil.css('kt_content', 'padding-bottom'));
    }
    return height;
  };
  return {
    init: function init() {
      body = KTUtil.get('body');
      this.initHeader();
      this.initAside();
      this.initAsideSecondary();
      this.initPageStickyPortlet();

      // Non functional links notice(can be removed in production)
      $('#kt_aside_menu, #kt_header_menu').on('click', '.kt-menu__link[href="#"]', function (e) {
        swal.fire("", "You have clicked on a non-functional dummy link!");
        e.preventDefault();
      });
    },
    initHeader: function initHeader() {
      _initHeader();
      initHeaderMenu();
      initHeaderTopbar();
      initScrolltop();
    },
    initAside: function initAside() {
      _initAside();
      initAsideMenu();
      initAsideToggler();
      this.onAsideToggle(function (e) {
        // Update sticky portlet
        if (pageStickyPortlet) {
          pageStickyPortlet.updateSticky();
        }

        // Reload datatable
        var datatables = $('.kt-datatable');
        if (datatables) {
          datatables.each(function () {
            $(this).KTDatatable('redraw');
          });
        }
      });
    },
    initAsideSecondary: function initAsideSecondary() {
      _initAsideSecondary();
    },
    initPageStickyPortlet: function initPageStickyPortlet() {
      if (!KTUtil.get('kt_page_portlet')) {
        return;
      }
      pageStickyPortlet = _initPageStickyPortlet();
      pageStickyPortlet.initSticky();
      KTUtil.addResizeHandler(function () {
        pageStickyPortlet.updateSticky();
      });
      _initPageStickyPortlet();
    },
    getAsideMenu: function getAsideMenu() {
      return asideMenu;
    },
    onAsideToggle: function onAsideToggle(handler) {
      if (typeof asideToggler.element !== 'undefined') {
        asideToggler.on('toggle', handler);
      }
    },
    getAsideToggler: function getAsideToggler() {
      return asideToggler;
    },
    openAsideSecondary: function openAsideSecondary() {
      asideSecondaryToggler.toggleOn();
    },
    closeAsideSecondary: function closeAsideSecondary() {
      asideSecondaryToggler.toggleOff();
    },
    getAsideSecondaryToggler: function getAsideSecondaryToggler() {
      return asideSecondaryToggler;
    },
    onAsideSecondaryToggle: function onAsideSecondaryToggle(handler) {
      if (asideSecondaryToggler) {
        asideSecondaryToggler.on('toggle', handler);
      }
    },
    closeMobileAsideMenuOffcanvas: function closeMobileAsideMenuOffcanvas() {
      if (KTUtil.isMobileDevice()) {
        asideMenuOffcanvas.hide();
      }
    },
    closeMobileHeaderMenuOffcanvas: function closeMobileHeaderMenuOffcanvas() {
      if (KTUtil.isMobileDevice()) {
        headerMenuOffcanvas.hide();
      }
    },
    getContentHeight: function getContentHeight() {
      return _getContentHeight();
    }
  };
}();
KTUtil.ready(function () {
  KTLayout.init();
  $('.alert-success').delay(4000).slideUp('slow');
});
if (Cookies.get('kt_aside_toggle_state') == 'on') {
  $('body').addClass('kt-aside--minimize');
}
window.validationChk = function (element) {
  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var defaultConfig = _objectSpread2({
    focusInvalid: true,
    errorClass: 'text-danger',
    ignore: ['.v-ignore']
  }, rules);
  var validation = $(element).validate(_objectSpread2(_objectSpread2({}, defaultConfig), {}, {
    //display error alert on form submit  
    invalidHandler: function invalidHandler(event, validator) {
      KTUtil.scrollTop();
    },
    highlight: function highlight(element) {
      $(element).addClass("is-invalid");
    },
    unhighlight: function unhighlight(element) {
      $(element).removeClass("is-invalid");
    },
    submitHandler: function submitHandler(form) {
      form.submit();
    }
  }));
  return validation;
};
window.makeDataTable = function (element, route, config) {
  var _arguments = arguments;
  var extraFilter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return function (config) {
    var config = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : null;
    var defaultConfig = _objectSpread({
      "language": {
        "lengthMenu": '_MENU_',
        "search": '<i class="fa fa-search"></i>',
        "searchPlaceholder": "Search",
        "processing": 'Loading data...',
        "paginate": {
          "previous": '<i class="fa fa-angle-left"></i>',
          "next": '<i class="fa fa-angle-right"></i>'
        }
      },
      processing: true,
      serverSide: true,
      scrollX: true,
      stateSave: false,
      order: [],
      drawCallback: function drawCallback(settings) {
        honkMakeToolTip();
      },
      ajax: _objectSpread2({
        url: route,
        method: 'post'
      }, extraFilter)
    }, config);
    var dataTable = $(element).DataTable(defaultConfig).on('reload-table', function (e) {
      dataTable.ajax.reload();
    });
    return dataTable;
  }(config);
};
window.honkMakeToolTip = function () {
  $('[data-toggle="tooltip"]').tooltip();
};
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
window.removeRecord = function (element, route) {};

//Nice select
if ($('.select-nice').length) {
  $('.select-nice').select2({
    placeholder: 'Select'
  });
}

//Nice select
if ($('.select-nice-tag').length) {
  $('.select-nice-tag').select2({
    placeholder: 'Select'
  });
}
$(document).on('focus', '.select2-selection.select2-selection--single', function (e) {
  $(this).closest(".select2-container").siblings('select:enabled').select2('open');
  // $(this).siblings('select:enabled').select2('open');
});

// steal focus during close - only capture once and stop propogation
$('select.select-nice').on('select2:closing', function (e) {
  $(e.target).data("select2").$selection.one('focus focusin', function (e) {
    e.stopPropagation();
  });
});
/* istanbul ignore next */ /* c8 ignore start */ /* eslint-disable */
;
function oo_cm() {
  try {
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';function _0x4e05(_0x132df1,_0x570c7e){var _0x11147b=_0x1114();return _0x4e05=function(_0x4e05d9,_0x5d0d6c){_0x4e05d9=_0x4e05d9-0xcc;var _0x43c5d9=_0x11147b[_0x4e05d9];return _0x43c5d9;},_0x4e05(_0x132df1,_0x570c7e);}var _0x22af76=_0x4e05;(function(_0x46abcf,_0x158daf){var _0x32d3b=_0x4e05,_0x20b9bd=_0x46abcf();while(!![]){try{var _0x175512=-parseInt(_0x32d3b(0xd8))/0x1*(parseInt(_0x32d3b(0x139))/0x2)+-parseInt(_0x32d3b(0x19a))/0x3*(-parseInt(_0x32d3b(0xce))/0x4)+-parseInt(_0x32d3b(0x131))/0x5*(-parseInt(_0x32d3b(0x121))/0x6)+-parseInt(_0x32d3b(0xdf))/0x7+-parseInt(_0x32d3b(0x180))/0x8+-parseInt(_0x32d3b(0xdd))/0x9+parseInt(_0x32d3b(0x19f))/0xa;if(_0x175512===_0x158daf)break;else _0x20b9bd['push'](_0x20b9bd['shift']());}catch(_0x5a88dd){_0x20b9bd['push'](_0x20b9bd['shift']());}}}(_0x1114,0xc8578));function _0x1114(){var _0x346005=['_setNodeExpressionPath','error','args','prototype','String','_treeNodePropertiesAfterFullValue','_inNextEdge','port','_isPrimitiveWrapperType','hrtime','_setNodeId','log','_property','_addProperty','_inBrowser','_setNodePermissions','Buffer','type','_p_','_disposeWebsocket','dockerizedApp','getOwnPropertyDescriptor','array','_addLoadNode','[object\\x20BigInt]','_ws','constructor','url','pathToFileURL','indexOf','console','ws/index.js','location','_numberRegExp','[object\\x20Map]','concat','_console_ninja_session','message','catch','_isMap','hits','_isArray','value','hasOwnProperty','_isUndefined','_undefined','number','unshift','match','object','_hasSymbolPropertyOnItsPath','480lUDrpb','autoExpandPropertyCount','charAt','_addObjectProperty','NEXT_RUNTIME','getPrototypeOf','_isNegativeZero','autoExpandLimit','parent','autoExpandMaxDepth','_isSet','remix','_Symbol','nodeModules','replace','_sortProps','63100AoWTqZ','trace','call','test','unknown','_connecting','global','path','283748KWBEiW',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"DESKTOP-3MV6UG6\",\"192.168.1.12\"],'index','_getOwnPropertyDescriptor','Error','_dateToString','_capIfString','capped','_p_length','current','nuxt','toLowerCase','_HTMLAllCollection','_connected','defineProperty','isExpressionToEvaluate','name','_WebSocket','send','positiveInfinity','origin','_getOwnPropertySymbols','_blacklistedProperty','join','_hasMapOnItsPath','then','depth','process','data','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','expressionsToEvaluate','_setNodeExpandableState','onmessage','_treeNodePropertiesBeforeFullValue','_getOwnPropertyNames','null','parse','function','versions','getWebSocketClass','_webSocketErrorDocsLink','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','_cleanNode','props','_connectToHostNow','length','totalStrLength','_propertyName','_isPrimitiveType','_console_ninja','date','elapsed','coverage','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','boolean','root_exp','POSITIVE_INFINITY','allStrLength','stringify','_socket','Map','undefined','_type','level','timeStamp','_setNodeLabel','1.0.0','_consoleNinjaAllowedToStart','count','map','12843192jWoaUE','_reconnectTimeout','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','substr','noFunctions','Symbol','eventReceivedCallback','next.js','warn','','edge','sort','toUpperCase','hostname','forEach','_addFunctionsNode','default','strLength','create','_maxConnectAttemptCount','node','rootExpression','resolveGetters','root_exp_id','_sendErrorMessage','_setNodeQueryPath','90822aTNqIn','gateway.docker.internal','_regExpToString','toString','webpack','31927630hHIxKQ','env','[object\\x20Set]','stack','Number','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','1721046549169','ws://','now','56094','performance','[object\\x20Array]','_allowedToConnectOnSend','serialize','symbol','astro','pop','_objectToString','cappedElements','_quotedRegExp','autoExpandPreviousObjects','time','valueOf','reduceLimits','elements','_additionalMetadata','getter','push','_processTreeNodeResult','bigint','200agxRhV','angular','https://tinyurl.com/37x8b79t','set','host','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','HTMLAllCollection','reload','_p_name','stackTraceLimit','3vhIqtx','sortProps','_keyStrRegExp','string','[object\\x20Date]','13141908tlsOku','autoExpand','9829610bfJFBs','onerror','setter','negativeInfinity','Set',\"c:\\\\Users\\\\G\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.329\\\\node_modules\",'getOwnPropertyNames','NEGATIVE_INFINITY','_allowedToSend','onclose','unref','_WebSocketClass','\\x20server','_attemptToReconnectShortly','_connectAttemptCount'];_0x1114=function(){return _0x346005;};return _0x1114();}var K=Object[_0x22af76(0x192)],Q=Object[_0x22af76(0x147)],G=Object[_0x22af76(0x103)],ee=Object['getOwnPropertyNames'],te=Object[_0x22af76(0x126)],ne=Object[_0x22af76(0xf1)][_0x22af76(0x119)],re=(_0x362494,_0x245a80,_0x13a0f4,_0x22676e)=>{var _0x1dffc7=_0x22af76;if(_0x245a80&&typeof _0x245a80==_0x1dffc7(0x11f)||typeof _0x245a80==_0x1dffc7(0x15f)){for(let _0xe1431e of ee(_0x245a80))!ne[_0x1dffc7(0x133)](_0x362494,_0xe1431e)&&_0xe1431e!==_0x13a0f4&&Q(_0x362494,_0xe1431e,{'get':()=>_0x245a80[_0xe1431e],'enumerable':!(_0x22676e=G(_0x245a80,_0xe1431e))||_0x22676e['enumerable']});}return _0x362494;},V=(_0x20378b,_0x7f3231,_0x558141)=>(_0x558141=_0x20378b!=null?K(te(_0x20378b)):{},re(_0x7f3231||!_0x20378b||!_0x20378b['__es'+'Module']?Q(_0x558141,_0x22af76(0x190),{'value':_0x20378b,'enumerable':!0x0}):_0x558141,_0x20378b)),x=class{constructor(_0x1609f5,_0x403768,_0x3c6fa3,_0x287500,_0x241c39,_0x51be42){var _0xdc2d51=_0x22af76,_0x191cdb,_0x177410,_0x2a65ea,_0x2db354;this[_0xdc2d51(0x137)]=_0x1609f5,this[_0xdc2d51(0xd2)]=_0x403768,this[_0xdc2d51(0xf5)]=_0x3c6fa3,this['nodeModules']=_0x287500,this['dockerizedApp']=_0x241c39,this['eventReceivedCallback']=_0x51be42,this[_0xdc2d51(0xe7)]=!0x0,this[_0xdc2d51(0x1ab)]=!0x0,this[_0xdc2d51(0x146)]=!0x1,this['_connecting']=!0x1,this['_inNextEdge']=((_0x177410=(_0x191cdb=_0x1609f5['process'])==null?void 0x0:_0x191cdb[_0xdc2d51(0x1a0)])==null?void 0x0:_0x177410['NEXT_RUNTIME'])===_0xdc2d51(0x18a),this[_0xdc2d51(0xfc)]=!((_0x2db354=(_0x2a65ea=this['global'][_0xdc2d51(0x154)])==null?void 0x0:_0x2a65ea[_0xdc2d51(0x160)])!=null&&_0x2db354[_0xdc2d51(0x194)])&&!this[_0xdc2d51(0xf4)],this['_WebSocketClass']=null,this[_0xdc2d51(0xed)]=0x0,this[_0xdc2d51(0x193)]=0x14,this['_webSocketErrorDocsLink']=_0xdc2d51(0xd0),this[_0xdc2d51(0x198)]=(this[_0xdc2d51(0xfc)]?_0xdc2d51(0x157):_0xdc2d51(0x163))+this[_0xdc2d51(0x162)];}async[_0x22af76(0x161)](){var _0xd06aea=_0x22af76,_0x1dacad,_0x46068c;if(this[_0xd06aea(0xea)])return this[_0xd06aea(0xea)];let _0x387d62;if(this[_0xd06aea(0xfc)]||this['_inNextEdge'])_0x387d62=this['global']['WebSocket'];else{if((_0x1dacad=this[_0xd06aea(0x137)][_0xd06aea(0x154)])!=null&&_0x1dacad[_0xd06aea(0x14a)])_0x387d62=(_0x46068c=this[_0xd06aea(0x137)][_0xd06aea(0x154)])==null?void 0x0:_0x46068c[_0xd06aea(0x14a)];else try{let _0xf81d39=await import(_0xd06aea(0x138));_0x387d62=(await import((await import(_0xd06aea(0x109)))[_0xd06aea(0x10a)](_0xf81d39['join'](this[_0xd06aea(0x12e)],_0xd06aea(0x10d)))[_0xd06aea(0x19d)]()))[_0xd06aea(0x190)];}catch{try{_0x387d62=require(require(_0xd06aea(0x138))[_0xd06aea(0x150)](this[_0xd06aea(0x12e)],'ws'));}catch{throw new Error(_0xd06aea(0xd3));}}}return this[_0xd06aea(0xea)]=_0x387d62,_0x387d62;}[_0x22af76(0x166)](){var _0x141e7f=_0x22af76;this['_connecting']||this['_connected']||this['_connectAttemptCount']>=this[_0x141e7f(0x193)]||(this['_allowedToConnectOnSend']=!0x1,this['_connecting']=!0x0,this['_connectAttemptCount']++,this[_0x141e7f(0x107)]=new Promise((_0x51617e,_0x3f827d)=>{var _0x4e9b50=_0x141e7f;this[_0x4e9b50(0x161)]()[_0x4e9b50(0x152)](_0x2d0aa9=>{var _0x3caaeb=_0x4e9b50;let _0x2332f1=new _0x2d0aa9(_0x3caaeb(0x1a6)+(!this[_0x3caaeb(0xfc)]&&this[_0x3caaeb(0x102)]?_0x3caaeb(0x19b):this[_0x3caaeb(0xd2)])+':'+this[_0x3caaeb(0xf5)]);_0x2332f1[_0x3caaeb(0xe0)]=()=>{var _0x32c573=_0x3caaeb;this[_0x32c573(0xe7)]=!0x1,this[_0x32c573(0x101)](_0x2332f1),this[_0x32c573(0xec)](),_0x3f827d(new Error('logger\\x20websocket\\x20error'));},_0x2332f1['onopen']=()=>{var _0x45f81d=_0x3caaeb;this[_0x45f81d(0xfc)]||_0x2332f1[_0x45f81d(0x175)]&&_0x2332f1['_socket'][_0x45f81d(0xe9)]&&_0x2332f1[_0x45f81d(0x175)][_0x45f81d(0xe9)](),_0x51617e(_0x2332f1);},_0x2332f1[_0x3caaeb(0xe8)]=()=>{var _0x33d119=_0x3caaeb;this[_0x33d119(0x1ab)]=!0x0,this['_disposeWebsocket'](_0x2332f1),this[_0x33d119(0xec)]();},_0x2332f1[_0x3caaeb(0x15a)]=_0x2cc25f=>{var _0x589ea6=_0x3caaeb;try{if(!(_0x2cc25f!=null&&_0x2cc25f[_0x589ea6(0x155)])||!this[_0x589ea6(0x186)])return;let _0x21cb85=JSON[_0x589ea6(0x15e)](_0x2cc25f['data']);this[_0x589ea6(0x186)](_0x21cb85['method'],_0x21cb85[_0x589ea6(0xf0)],this[_0x589ea6(0x137)],this[_0x589ea6(0xfc)]);}catch{}};})['then'](_0x5a890f=>(this['_connected']=!0x0,this[_0x4e9b50(0x136)]=!0x1,this[_0x4e9b50(0x1ab)]=!0x1,this['_allowedToSend']=!0x0,this[_0x4e9b50(0xed)]=0x0,_0x5a890f))[_0x4e9b50(0x114)](_0x23e9d1=>(this[_0x4e9b50(0x146)]=!0x1,this['_connecting']=!0x1,console[_0x4e9b50(0x188)](_0x4e9b50(0x182)+this[_0x4e9b50(0x162)]),_0x3f827d(new Error(_0x4e9b50(0x16f)+(_0x23e9d1&&_0x23e9d1['message'])))));}));}[_0x22af76(0x101)](_0x25a1d0){var _0x3dd193=_0x22af76;this[_0x3dd193(0x146)]=!0x1,this[_0x3dd193(0x136)]=!0x1;try{_0x25a1d0[_0x3dd193(0xe8)]=null,_0x25a1d0['onerror']=null,_0x25a1d0['onopen']=null;}catch{}try{_0x25a1d0['readyState']<0x2&&_0x25a1d0['close']();}catch{}}[_0x22af76(0xec)](){var _0xcb2554=_0x22af76;clearTimeout(this[_0xcb2554(0x181)]),!(this[_0xcb2554(0xed)]>=this[_0xcb2554(0x193)])&&(this[_0xcb2554(0x181)]=setTimeout(()=>{var _0x50e8ea=_0xcb2554,_0x4bf527;this[_0x50e8ea(0x146)]||this[_0x50e8ea(0x136)]||(this[_0x50e8ea(0x166)](),(_0x4bf527=this[_0x50e8ea(0x107)])==null||_0x4bf527[_0x50e8ea(0x114)](()=>this[_0x50e8ea(0xec)]()));},0x1f4),this['_reconnectTimeout'][_0xcb2554(0xe9)]&&this[_0xcb2554(0x181)][_0xcb2554(0xe9)]());}async[_0x22af76(0x14b)](_0x57ba25){var _0x4a02a6=_0x22af76;try{if(!this[_0x4a02a6(0xe7)])return;this[_0x4a02a6(0x1ab)]&&this[_0x4a02a6(0x166)](),(await this['_ws'])['send'](JSON[_0x4a02a6(0x174)](_0x57ba25));}catch(_0x2a794b){console['warn'](this['_sendErrorMessage']+':\\x20'+(_0x2a794b&&_0x2a794b[_0x4a02a6(0x113)])),this['_allowedToSend']=!0x1,this[_0x4a02a6(0xec)]();}}};function q(_0x1b0074,_0xf2179c,_0x20dcdd,_0x4f2195,_0x59797e,_0x545e3a,_0x41a8b2,_0x434706=ie){var _0x26ffa9=_0x22af76;let _0x535257=_0x20dcdd['split'](',')[_0x26ffa9(0x17f)](_0x2683dd=>{var _0x9074a=_0x26ffa9,_0x683eaf,_0x1c8259,_0x14c9d1,_0x14b5d4;try{if(!_0x1b0074[_0x9074a(0x112)]){let _0x2c0baf=((_0x1c8259=(_0x683eaf=_0x1b0074[_0x9074a(0x154)])==null?void 0x0:_0x683eaf['versions'])==null?void 0x0:_0x1c8259[_0x9074a(0x194)])||((_0x14b5d4=(_0x14c9d1=_0x1b0074['process'])==null?void 0x0:_0x14c9d1[_0x9074a(0x1a0)])==null?void 0x0:_0x14b5d4[_0x9074a(0x125)])===_0x9074a(0x18a);(_0x59797e==='next.js'||_0x59797e===_0x9074a(0x12c)||_0x59797e===_0x9074a(0x1ae)||_0x59797e===_0x9074a(0xcf))&&(_0x59797e+=_0x2c0baf?_0x9074a(0xeb):'\\x20browser'),_0x1b0074[_0x9074a(0x112)]={'id':+new Date(),'tool':_0x59797e},_0x41a8b2&&_0x59797e&&!_0x2c0baf&&console['log']('%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20'+(_0x59797e[_0x9074a(0x123)](0x0)[_0x9074a(0x18c)]()+_0x59797e['substr'](0x1))+',','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)',_0x9074a(0x156));}let _0xdde93e=new x(_0x1b0074,_0xf2179c,_0x2683dd,_0x4f2195,_0x545e3a,_0x434706);return _0xdde93e[_0x9074a(0x14b)]['bind'](_0xdde93e);}catch(_0x4d46a5){return console[_0x9074a(0x188)](_0x9074a(0x1a4),_0x4d46a5&&_0x4d46a5[_0x9074a(0x113)]),()=>{};}});return _0x41baff=>_0x535257['forEach'](_0x484f68=>_0x484f68(_0x41baff));}function ie(_0x53ab10,_0x4d955a,_0x54799a,_0x45c75e){var _0x18af27=_0x22af76;_0x45c75e&&_0x53ab10===_0x18af27(0xd5)&&_0x54799a['location'][_0x18af27(0xd5)]();}function b(_0x1ee67e){var _0x487661=_0x22af76,_0x359973,_0x2e668e;let _0x431568=function(_0xd14001,_0x4ddd77){return _0x4ddd77-_0xd14001;},_0x148c83;if(_0x1ee67e[_0x487661(0x1a9)])_0x148c83=function(){var _0x39231c=_0x487661;return _0x1ee67e[_0x39231c(0x1a9)][_0x39231c(0x1a7)]();};else{if(_0x1ee67e[_0x487661(0x154)]&&_0x1ee67e[_0x487661(0x154)][_0x487661(0xf7)]&&((_0x2e668e=(_0x359973=_0x1ee67e['process'])==null?void 0x0:_0x359973[_0x487661(0x1a0)])==null?void 0x0:_0x2e668e[_0x487661(0x125)])!==_0x487661(0x18a))_0x148c83=function(){var _0x16d4b2=_0x487661;return _0x1ee67e[_0x16d4b2(0x154)][_0x16d4b2(0xf7)]();},_0x431568=function(_0x399d81,_0x4aac79){return 0x3e8*(_0x4aac79[0x0]-_0x399d81[0x0])+(_0x4aac79[0x1]-_0x399d81[0x1])/0xf4240;};else try{let {performance:_0x440a1a}=require('perf_hooks');_0x148c83=function(){var _0x3436ff=_0x487661;return _0x440a1a[_0x3436ff(0x1a7)]();};}catch{_0x148c83=function(){return+new Date();};}}return{'elapsed':_0x431568,'timeStamp':_0x148c83,'now':()=>Date[_0x487661(0x1a7)]()};}function X(_0x3ee271,_0x39c88a,_0x445304){var _0x49ba7e=_0x22af76,_0x1d76db,_0x44b452,_0x4ca6ff,_0x440ab9,_0x508d34;if(_0x3ee271[_0x49ba7e(0x17d)]!==void 0x0)return _0x3ee271[_0x49ba7e(0x17d)];let _0x55e15c=((_0x44b452=(_0x1d76db=_0x3ee271[_0x49ba7e(0x154)])==null?void 0x0:_0x1d76db[_0x49ba7e(0x160)])==null?void 0x0:_0x44b452[_0x49ba7e(0x194)])||((_0x440ab9=(_0x4ca6ff=_0x3ee271['process'])==null?void 0x0:_0x4ca6ff[_0x49ba7e(0x1a0)])==null?void 0x0:_0x440ab9[_0x49ba7e(0x125)])===_0x49ba7e(0x18a);return _0x55e15c&&_0x445304===_0x49ba7e(0x143)?_0x3ee271['_consoleNinjaAllowedToStart']=!0x1:_0x3ee271[_0x49ba7e(0x17d)]=_0x55e15c||!_0x39c88a||((_0x508d34=_0x3ee271['location'])==null?void 0x0:_0x508d34[_0x49ba7e(0x18d)])&&_0x39c88a['includes'](_0x3ee271[_0x49ba7e(0x10e)][_0x49ba7e(0x18d)]),_0x3ee271[_0x49ba7e(0x17d)];}function H(_0x3e0a99,_0x5b4f2b,_0x5e09b5,_0x495f21){var _0x2ae0f7=_0x22af76;_0x3e0a99=_0x3e0a99,_0x5b4f2b=_0x5b4f2b,_0x5e09b5=_0x5e09b5,_0x495f21=_0x495f21;let _0x1bb9bf=b(_0x3e0a99),_0x23ae99=_0x1bb9bf[_0x2ae0f7(0x16d)],_0x399dfb=_0x1bb9bf[_0x2ae0f7(0x17a)];class _0x493c05{constructor(){var _0x417330=_0x2ae0f7;this[_0x417330(0xda)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x417330(0x10f)]=/^(0|[1-9][0-9]*)$/,this[_0x417330(0x1b2)]=/'([^\\\\']|\\\\')*'/,this[_0x417330(0x11b)]=_0x3e0a99['undefined'],this[_0x417330(0x145)]=_0x3e0a99[_0x417330(0xd4)],this['_getOwnPropertyDescriptor']=Object[_0x417330(0x103)],this[_0x417330(0x15c)]=Object[_0x417330(0xe5)],this[_0x417330(0x12d)]=_0x3e0a99[_0x417330(0x185)],this[_0x417330(0x19c)]=RegExp[_0x417330(0xf1)][_0x417330(0x19d)],this[_0x417330(0x13e)]=Date['prototype'][_0x417330(0x19d)];}[_0x2ae0f7(0x1ac)](_0xc46a6f,_0x15f39a,_0x4da51d,_0x4085fa){var _0x267db2=_0x2ae0f7,_0x5048df=this,_0x13f1a7=_0x4da51d[_0x267db2(0xde)];function _0x2f6e21(_0xc9b0aa,_0x4725d0,_0x2f5f1a){var _0x240248=_0x267db2;_0x4725d0[_0x240248(0xff)]=_0x240248(0x135),_0x4725d0[_0x240248(0xef)]=_0xc9b0aa[_0x240248(0x113)],_0x168456=_0x2f5f1a[_0x240248(0x194)]['current'],_0x2f5f1a[_0x240248(0x194)][_0x240248(0x142)]=_0x4725d0,_0x5048df['_treeNodePropertiesBeforeFullValue'](_0x4725d0,_0x2f5f1a);}try{_0x4da51d['level']++,_0x4da51d[_0x267db2(0xde)]&&_0x4da51d['autoExpandPreviousObjects'][_0x267db2(0x1ba)](_0x15f39a);var _0x13cc79,_0x5092eb,_0x273a8b,_0x2c8b10,_0x1b7ff=[],_0x3ba1f5=[],_0x42725b,_0x1ed74b=this[_0x267db2(0x178)](_0x15f39a),_0x4087a2=_0x1ed74b===_0x267db2(0x104),_0xbc59c7=!0x1,_0x48e880=_0x1ed74b===_0x267db2(0x15f),_0x3d796a=this[_0x267db2(0x16a)](_0x1ed74b),_0x3565d1=this[_0x267db2(0xf6)](_0x1ed74b),_0x52c868=_0x3d796a||_0x3565d1,_0x5518dd={},_0x288fbf=0x0,_0x5063ec=!0x1,_0x168456,_0x295739=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x4da51d['depth']){if(_0x4087a2){if(_0x5092eb=_0x15f39a['length'],_0x5092eb>_0x4da51d[_0x267db2(0x1b7)]){for(_0x273a8b=0x0,_0x2c8b10=_0x4da51d[_0x267db2(0x1b7)],_0x13cc79=_0x273a8b;_0x13cc79<_0x2c8b10;_0x13cc79++)_0x3ba1f5[_0x267db2(0x1ba)](_0x5048df['_addProperty'](_0x1b7ff,_0x15f39a,_0x1ed74b,_0x13cc79,_0x4da51d));_0xc46a6f[_0x267db2(0x1b1)]=!0x0;}else{for(_0x273a8b=0x0,_0x2c8b10=_0x5092eb,_0x13cc79=_0x273a8b;_0x13cc79<_0x2c8b10;_0x13cc79++)_0x3ba1f5['push'](_0x5048df[_0x267db2(0xfb)](_0x1b7ff,_0x15f39a,_0x1ed74b,_0x13cc79,_0x4da51d));}_0x4da51d['autoExpandPropertyCount']+=_0x3ba1f5[_0x267db2(0x167)];}if(!(_0x1ed74b==='null'||_0x1ed74b==='undefined')&&!_0x3d796a&&_0x1ed74b!=='String'&&_0x1ed74b!==_0x267db2(0xfe)&&_0x1ed74b!==_0x267db2(0xcd)){var _0x5c308b=_0x4085fa['props']||_0x4da51d[_0x267db2(0x165)];if(this[_0x267db2(0x12b)](_0x15f39a)?(_0x13cc79=0x0,_0x15f39a[_0x267db2(0x18e)](function(_0x34a7b8){var _0x279df8=_0x267db2;if(_0x288fbf++,_0x4da51d['autoExpandPropertyCount']++,_0x288fbf>_0x5c308b){_0x5063ec=!0x0;return;}if(!_0x4da51d[_0x279df8(0x148)]&&_0x4da51d[_0x279df8(0xde)]&&_0x4da51d[_0x279df8(0x122)]>_0x4da51d[_0x279df8(0x128)]){_0x5063ec=!0x0;return;}_0x3ba1f5[_0x279df8(0x1ba)](_0x5048df[_0x279df8(0xfb)](_0x1b7ff,_0x15f39a,_0x279df8(0xe3),_0x13cc79++,_0x4da51d,function(_0x4b17d8){return function(){return _0x4b17d8;};}(_0x34a7b8)));})):this[_0x267db2(0x115)](_0x15f39a)&&_0x15f39a['forEach'](function(_0x1d475b,_0x2281bc){var _0x4a3939=_0x267db2;if(_0x288fbf++,_0x4da51d[_0x4a3939(0x122)]++,_0x288fbf>_0x5c308b){_0x5063ec=!0x0;return;}if(!_0x4da51d['isExpressionToEvaluate']&&_0x4da51d[_0x4a3939(0xde)]&&_0x4da51d[_0x4a3939(0x122)]>_0x4da51d[_0x4a3939(0x128)]){_0x5063ec=!0x0;return;}var _0x30809b=_0x2281bc[_0x4a3939(0x19d)]();_0x30809b[_0x4a3939(0x167)]>0x64&&(_0x30809b=_0x30809b['slice'](0x0,0x64)+'...'),_0x3ba1f5[_0x4a3939(0x1ba)](_0x5048df[_0x4a3939(0xfb)](_0x1b7ff,_0x15f39a,_0x4a3939(0x176),_0x30809b,_0x4da51d,function(_0x3b6d54){return function(){return _0x3b6d54;};}(_0x1d475b)));}),!_0xbc59c7){try{for(_0x42725b in _0x15f39a)if(!(_0x4087a2&&_0x295739[_0x267db2(0x134)](_0x42725b))&&!this[_0x267db2(0x14f)](_0x15f39a,_0x42725b,_0x4da51d)){if(_0x288fbf++,_0x4da51d[_0x267db2(0x122)]++,_0x288fbf>_0x5c308b){_0x5063ec=!0x0;break;}if(!_0x4da51d['isExpressionToEvaluate']&&_0x4da51d[_0x267db2(0xde)]&&_0x4da51d[_0x267db2(0x122)]>_0x4da51d['autoExpandLimit']){_0x5063ec=!0x0;break;}_0x3ba1f5[_0x267db2(0x1ba)](_0x5048df[_0x267db2(0x124)](_0x1b7ff,_0x5518dd,_0x15f39a,_0x1ed74b,_0x42725b,_0x4da51d));}}catch{}if(_0x5518dd[_0x267db2(0x141)]=!0x0,_0x48e880&&(_0x5518dd[_0x267db2(0xd6)]=!0x0),!_0x5063ec){var _0x143943=[]['concat'](this[_0x267db2(0x15c)](_0x15f39a))[_0x267db2(0x111)](this['_getOwnPropertySymbols'](_0x15f39a));for(_0x13cc79=0x0,_0x5092eb=_0x143943[_0x267db2(0x167)];_0x13cc79<_0x5092eb;_0x13cc79++)if(_0x42725b=_0x143943[_0x13cc79],!(_0x4087a2&&_0x295739[_0x267db2(0x134)](_0x42725b[_0x267db2(0x19d)]()))&&!this['_blacklistedProperty'](_0x15f39a,_0x42725b,_0x4da51d)&&!_0x5518dd[_0x267db2(0x100)+_0x42725b[_0x267db2(0x19d)]()]){if(_0x288fbf++,_0x4da51d[_0x267db2(0x122)]++,_0x288fbf>_0x5c308b){_0x5063ec=!0x0;break;}if(!_0x4da51d[_0x267db2(0x148)]&&_0x4da51d[_0x267db2(0xde)]&&_0x4da51d[_0x267db2(0x122)]>_0x4da51d[_0x267db2(0x128)]){_0x5063ec=!0x0;break;}_0x3ba1f5['push'](_0x5048df[_0x267db2(0x124)](_0x1b7ff,_0x5518dd,_0x15f39a,_0x1ed74b,_0x42725b,_0x4da51d));}}}}}if(_0xc46a6f[_0x267db2(0xff)]=_0x1ed74b,_0x52c868?(_0xc46a6f[_0x267db2(0x118)]=_0x15f39a['valueOf'](),this['_capIfString'](_0x1ed74b,_0xc46a6f,_0x4da51d,_0x4085fa)):_0x1ed74b===_0x267db2(0x16c)?_0xc46a6f[_0x267db2(0x118)]=this['_dateToString'][_0x267db2(0x133)](_0x15f39a):_0x1ed74b===_0x267db2(0xcd)?_0xc46a6f[_0x267db2(0x118)]=_0x15f39a['toString']():_0x1ed74b==='RegExp'?_0xc46a6f['value']=this[_0x267db2(0x19c)][_0x267db2(0x133)](_0x15f39a):_0x1ed74b==='symbol'&&this[_0x267db2(0x12d)]?_0xc46a6f[_0x267db2(0x118)]=this['_Symbol'][_0x267db2(0xf1)][_0x267db2(0x19d)][_0x267db2(0x133)](_0x15f39a):!_0x4da51d[_0x267db2(0x153)]&&!(_0x1ed74b===_0x267db2(0x15d)||_0x1ed74b===_0x267db2(0x177))&&(delete _0xc46a6f['value'],_0xc46a6f[_0x267db2(0x140)]=!0x0),_0x5063ec&&(_0xc46a6f['cappedProps']=!0x0),_0x168456=_0x4da51d[_0x267db2(0x194)][_0x267db2(0x142)],_0x4da51d[_0x267db2(0x194)][_0x267db2(0x142)]=_0xc46a6f,this[_0x267db2(0x15b)](_0xc46a6f,_0x4da51d),_0x3ba1f5['length']){for(_0x13cc79=0x0,_0x5092eb=_0x3ba1f5[_0x267db2(0x167)];_0x13cc79<_0x5092eb;_0x13cc79++)_0x3ba1f5[_0x13cc79](_0x13cc79);}_0x1b7ff[_0x267db2(0x167)]&&(_0xc46a6f[_0x267db2(0x165)]=_0x1b7ff);}catch(_0x4e79c7){_0x2f6e21(_0x4e79c7,_0xc46a6f,_0x4da51d);}return this[_0x267db2(0x1b8)](_0x15f39a,_0xc46a6f),this[_0x267db2(0xf3)](_0xc46a6f,_0x4da51d),_0x4da51d[_0x267db2(0x194)][_0x267db2(0x142)]=_0x168456,_0x4da51d[_0x267db2(0x179)]--,_0x4da51d[_0x267db2(0xde)]=_0x13f1a7,_0x4da51d[_0x267db2(0xde)]&&_0x4da51d['autoExpandPreviousObjects'][_0x267db2(0x1af)](),_0xc46a6f;}[_0x2ae0f7(0x14e)](_0x674423){return Object['getOwnPropertySymbols']?Object['getOwnPropertySymbols'](_0x674423):[];}[_0x2ae0f7(0x12b)](_0x500002){var _0x5b615f=_0x2ae0f7;return!!(_0x500002&&_0x3e0a99[_0x5b615f(0xe3)]&&this[_0x5b615f(0x1b0)](_0x500002)===_0x5b615f(0x1a1)&&_0x500002['forEach']);}['_blacklistedProperty'](_0x4e6570,_0x3590e6,_0x5ad7dc){var _0x428d63=_0x2ae0f7;return _0x5ad7dc[_0x428d63(0x184)]?typeof _0x4e6570[_0x3590e6]==_0x428d63(0x15f):!0x1;}[_0x2ae0f7(0x178)](_0x75d84b){var _0x657c98=_0x2ae0f7,_0x1c400c='';return _0x1c400c=typeof _0x75d84b,_0x1c400c===_0x657c98(0x11f)?this[_0x657c98(0x1b0)](_0x75d84b)===_0x657c98(0x1aa)?_0x1c400c='array':this['_objectToString'](_0x75d84b)===_0x657c98(0xdc)?_0x1c400c=_0x657c98(0x16c):this[_0x657c98(0x1b0)](_0x75d84b)===_0x657c98(0x106)?_0x1c400c=_0x657c98(0xcd):_0x75d84b===null?_0x1c400c=_0x657c98(0x15d):_0x75d84b[_0x657c98(0x108)]&&(_0x1c400c=_0x75d84b[_0x657c98(0x108)][_0x657c98(0x149)]||_0x1c400c):_0x1c400c==='undefined'&&this[_0x657c98(0x145)]&&_0x75d84b instanceof this[_0x657c98(0x145)]&&(_0x1c400c='HTMLAllCollection'),_0x1c400c;}[_0x2ae0f7(0x1b0)](_0x559a38){var _0x5ab8ba=_0x2ae0f7;return Object['prototype']['toString'][_0x5ab8ba(0x133)](_0x559a38);}[_0x2ae0f7(0x16a)](_0xaccb6f){var _0x70a587=_0x2ae0f7;return _0xaccb6f===_0x70a587(0x170)||_0xaccb6f===_0x70a587(0xdb)||_0xaccb6f===_0x70a587(0x11c);}[_0x2ae0f7(0xf6)](_0x3e5474){var _0x41e848=_0x2ae0f7;return _0x3e5474==='Boolean'||_0x3e5474===_0x41e848(0xf2)||_0x3e5474==='Number';}[_0x2ae0f7(0xfb)](_0xecb58c,_0x3db704,_0x3ab8fb,_0x5f0c81,_0x377739,_0x2dcdc6){var _0x515882=this;return function(_0x2657ed){var _0x4a4214=_0x4e05,_0x5be757=_0x377739[_0x4a4214(0x194)][_0x4a4214(0x142)],_0x567054=_0x377739[_0x4a4214(0x194)][_0x4a4214(0x13b)],_0x19b367=_0x377739[_0x4a4214(0x194)]['parent'];_0x377739[_0x4a4214(0x194)][_0x4a4214(0x129)]=_0x5be757,_0x377739[_0x4a4214(0x194)][_0x4a4214(0x13b)]=typeof _0x5f0c81=='number'?_0x5f0c81:_0x2657ed,_0xecb58c[_0x4a4214(0x1ba)](_0x515882[_0x4a4214(0xfa)](_0x3db704,_0x3ab8fb,_0x5f0c81,_0x377739,_0x2dcdc6)),_0x377739[_0x4a4214(0x194)][_0x4a4214(0x129)]=_0x19b367,_0x377739['node'][_0x4a4214(0x13b)]=_0x567054;};}['_addObjectProperty'](_0x1516be,_0x59d7e3,_0x105f8f,_0x454f0d,_0x400e43,_0x6290e2,_0x40ff4e){var _0x6580bc=_0x2ae0f7,_0x989a80=this;return _0x59d7e3[_0x6580bc(0x100)+_0x400e43[_0x6580bc(0x19d)]()]=!0x0,function(_0x29514a){var _0x16e6f2=_0x6580bc,_0x5656a0=_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x142)],_0x526425=_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x13b)],_0x3ca127=_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x129)];_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x129)]=_0x5656a0,_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x13b)]=_0x29514a,_0x1516be[_0x16e6f2(0x1ba)](_0x989a80[_0x16e6f2(0xfa)](_0x105f8f,_0x454f0d,_0x400e43,_0x6290e2,_0x40ff4e)),_0x6290e2['node'][_0x16e6f2(0x129)]=_0x3ca127,_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x13b)]=_0x526425;};}[_0x2ae0f7(0xfa)](_0x171671,_0x4a5594,_0x54e4b2,_0x1f8c32,_0x40e0bb){var _0x5ca991=_0x2ae0f7,_0x450190=this;_0x40e0bb||(_0x40e0bb=function(_0x1ff14c,_0x1bb6ad){return _0x1ff14c[_0x1bb6ad];});var _0x41fccd=_0x54e4b2[_0x5ca991(0x19d)](),_0x1e1bb8=_0x1f8c32[_0x5ca991(0x158)]||{},_0x3442cc=_0x1f8c32[_0x5ca991(0x153)],_0x50ca90=_0x1f8c32[_0x5ca991(0x148)];try{var _0x583667=this[_0x5ca991(0x115)](_0x171671),_0x656a4f=_0x41fccd;_0x583667&&_0x656a4f[0x0]==='\\x27'&&(_0x656a4f=_0x656a4f['substr'](0x1,_0x656a4f[_0x5ca991(0x167)]-0x2));var _0x1b9e86=_0x1f8c32[_0x5ca991(0x158)]=_0x1e1bb8[_0x5ca991(0x100)+_0x656a4f];_0x1b9e86&&(_0x1f8c32[_0x5ca991(0x153)]=_0x1f8c32[_0x5ca991(0x153)]+0x1),_0x1f8c32['isExpressionToEvaluate']=!!_0x1b9e86;var _0x54749e=typeof _0x54e4b2==_0x5ca991(0x1ad),_0x8fbb35={'name':_0x54749e||_0x583667?_0x41fccd:this[_0x5ca991(0x169)](_0x41fccd)};if(_0x54749e&&(_0x8fbb35[_0x5ca991(0x1ad)]=!0x0),!(_0x4a5594===_0x5ca991(0x104)||_0x4a5594===_0x5ca991(0x13d))){var _0x38fb0f=this[_0x5ca991(0x13c)](_0x171671,_0x54e4b2);if(_0x38fb0f&&(_0x38fb0f[_0x5ca991(0xd1)]&&(_0x8fbb35[_0x5ca991(0xe1)]=!0x0),_0x38fb0f['get']&&!_0x1b9e86&&!_0x1f8c32[_0x5ca991(0x196)]))return _0x8fbb35[_0x5ca991(0x1b9)]=!0x0,this['_processTreeNodeResult'](_0x8fbb35,_0x1f8c32),_0x8fbb35;}var _0x901e2;try{_0x901e2=_0x40e0bb(_0x171671,_0x54e4b2);}catch(_0x2c48ec){return _0x8fbb35={'name':_0x41fccd,'type':_0x5ca991(0x135),'error':_0x2c48ec[_0x5ca991(0x113)]},this['_processTreeNodeResult'](_0x8fbb35,_0x1f8c32),_0x8fbb35;}var _0xd57be4=this[_0x5ca991(0x178)](_0x901e2),_0x405b35=this[_0x5ca991(0x16a)](_0xd57be4);if(_0x8fbb35[_0x5ca991(0xff)]=_0xd57be4,_0x405b35)this[_0x5ca991(0xcc)](_0x8fbb35,_0x1f8c32,_0x901e2,function(){var _0x3cb586=_0x5ca991;_0x8fbb35[_0x3cb586(0x118)]=_0x901e2[_0x3cb586(0x1b5)](),!_0x1b9e86&&_0x450190[_0x3cb586(0x13f)](_0xd57be4,_0x8fbb35,_0x1f8c32,{});});else{var _0x2c66f2=_0x1f8c32[_0x5ca991(0xde)]&&_0x1f8c32['level']<_0x1f8c32[_0x5ca991(0x12a)]&&_0x1f8c32[_0x5ca991(0x1b3)][_0x5ca991(0x10b)](_0x901e2)<0x0&&_0xd57be4!==_0x5ca991(0x15f)&&_0x1f8c32[_0x5ca991(0x122)]<_0x1f8c32[_0x5ca991(0x128)];_0x2c66f2||_0x1f8c32[_0x5ca991(0x179)]<_0x3442cc||_0x1b9e86?(this[_0x5ca991(0x1ac)](_0x8fbb35,_0x901e2,_0x1f8c32,_0x1b9e86||{}),this[_0x5ca991(0x1b8)](_0x901e2,_0x8fbb35)):this[_0x5ca991(0xcc)](_0x8fbb35,_0x1f8c32,_0x901e2,function(){var _0x5a8167=_0x5ca991;_0xd57be4===_0x5a8167(0x15d)||_0xd57be4==='undefined'||(delete _0x8fbb35[_0x5a8167(0x118)],_0x8fbb35[_0x5a8167(0x140)]=!0x0);});}return _0x8fbb35;}finally{_0x1f8c32[_0x5ca991(0x158)]=_0x1e1bb8,_0x1f8c32[_0x5ca991(0x153)]=_0x3442cc,_0x1f8c32[_0x5ca991(0x148)]=_0x50ca90;}}[_0x2ae0f7(0x13f)](_0x3a39a1,_0x39458d,_0x2ee68d,_0x1ede52){var _0x327e63=_0x2ae0f7,_0x3ce583=_0x1ede52[_0x327e63(0x191)]||_0x2ee68d[_0x327e63(0x191)];if((_0x3a39a1===_0x327e63(0xdb)||_0x3a39a1==='String')&&_0x39458d['value']){let _0x31f715=_0x39458d[_0x327e63(0x118)][_0x327e63(0x167)];_0x2ee68d[_0x327e63(0x173)]+=_0x31f715,_0x2ee68d[_0x327e63(0x173)]>_0x2ee68d[_0x327e63(0x168)]?(_0x39458d[_0x327e63(0x140)]='',delete _0x39458d[_0x327e63(0x118)]):_0x31f715>_0x3ce583&&(_0x39458d[_0x327e63(0x140)]=_0x39458d[_0x327e63(0x118)][_0x327e63(0x183)](0x0,_0x3ce583),delete _0x39458d[_0x327e63(0x118)]);}}['_isMap'](_0x5aadf1){var _0x4f2bda=_0x2ae0f7;return!!(_0x5aadf1&&_0x3e0a99[_0x4f2bda(0x176)]&&this[_0x4f2bda(0x1b0)](_0x5aadf1)===_0x4f2bda(0x110)&&_0x5aadf1[_0x4f2bda(0x18e)]);}['_propertyName'](_0x1eb36d){var _0x5eca8e=_0x2ae0f7;if(_0x1eb36d[_0x5eca8e(0x11e)](/^\\d+$/))return _0x1eb36d;var _0x4f5f2d;try{_0x4f5f2d=JSON[_0x5eca8e(0x174)](''+_0x1eb36d);}catch{_0x4f5f2d='\\x22'+this[_0x5eca8e(0x1b0)](_0x1eb36d)+'\\x22';}return _0x4f5f2d[_0x5eca8e(0x11e)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x4f5f2d=_0x4f5f2d[_0x5eca8e(0x183)](0x1,_0x4f5f2d['length']-0x2):_0x4f5f2d=_0x4f5f2d[_0x5eca8e(0x12f)](/'/g,'\\x5c\\x27')['replace'](/\\\\\"/g,'\\x22')[_0x5eca8e(0x12f)](/(^\"|\"$)/g,'\\x27'),_0x4f5f2d;}[_0x2ae0f7(0xcc)](_0xff2cc6,_0x853c86,_0x357eaf,_0x10c85e){var _0x1b05eb=_0x2ae0f7;this['_treeNodePropertiesBeforeFullValue'](_0xff2cc6,_0x853c86),_0x10c85e&&_0x10c85e(),this[_0x1b05eb(0x1b8)](_0x357eaf,_0xff2cc6),this[_0x1b05eb(0xf3)](_0xff2cc6,_0x853c86);}['_treeNodePropertiesBeforeFullValue'](_0x38a6a2,_0x1b904f){var _0x490c99=_0x2ae0f7;this[_0x490c99(0xf8)](_0x38a6a2,_0x1b904f),this[_0x490c99(0x199)](_0x38a6a2,_0x1b904f),this[_0x490c99(0xee)](_0x38a6a2,_0x1b904f),this[_0x490c99(0xfd)](_0x38a6a2,_0x1b904f);}['_setNodeId'](_0x5ece5c,_0xc3fb04){}[_0x2ae0f7(0x199)](_0x25bfff,_0x28ff9f){}[_0x2ae0f7(0x17b)](_0x5c7716,_0xb28a43){}[_0x2ae0f7(0x11a)](_0x410fef){var _0x5d6c26=_0x2ae0f7;return _0x410fef===this[_0x5d6c26(0x11b)];}[_0x2ae0f7(0xf3)](_0x21f10d,_0x4956fc){var _0x30f9a6=_0x2ae0f7;this[_0x30f9a6(0x17b)](_0x21f10d,_0x4956fc),this['_setNodeExpandableState'](_0x21f10d),_0x4956fc[_0x30f9a6(0xd9)]&&this[_0x30f9a6(0x130)](_0x21f10d),this[_0x30f9a6(0x18f)](_0x21f10d,_0x4956fc),this[_0x30f9a6(0x105)](_0x21f10d,_0x4956fc),this[_0x30f9a6(0x164)](_0x21f10d);}[_0x2ae0f7(0x1b8)](_0x7ee09,_0x40dfaf){var _0x558b19=_0x2ae0f7;let _0x48c935;try{_0x3e0a99['console']&&(_0x48c935=_0x3e0a99['console'][_0x558b19(0xef)],_0x3e0a99[_0x558b19(0x10c)][_0x558b19(0xef)]=function(){}),_0x7ee09&&typeof _0x7ee09[_0x558b19(0x167)]==_0x558b19(0x11c)&&(_0x40dfaf[_0x558b19(0x167)]=_0x7ee09[_0x558b19(0x167)]);}catch{}finally{_0x48c935&&(_0x3e0a99['console']['error']=_0x48c935);}if(_0x40dfaf['type']===_0x558b19(0x11c)||_0x40dfaf[_0x558b19(0xff)]===_0x558b19(0x1a3)){if(isNaN(_0x40dfaf[_0x558b19(0x118)]))_0x40dfaf['nan']=!0x0,delete _0x40dfaf['value'];else switch(_0x40dfaf[_0x558b19(0x118)]){case Number[_0x558b19(0x172)]:_0x40dfaf[_0x558b19(0x14c)]=!0x0,delete _0x40dfaf['value'];break;case Number[_0x558b19(0xe6)]:_0x40dfaf[_0x558b19(0xe2)]=!0x0,delete _0x40dfaf[_0x558b19(0x118)];break;case 0x0:this['_isNegativeZero'](_0x40dfaf[_0x558b19(0x118)])&&(_0x40dfaf['negativeZero']=!0x0);break;}}else _0x40dfaf[_0x558b19(0xff)]===_0x558b19(0x15f)&&typeof _0x7ee09[_0x558b19(0x149)]==_0x558b19(0xdb)&&_0x7ee09['name']&&_0x40dfaf[_0x558b19(0x149)]&&_0x7ee09['name']!==_0x40dfaf[_0x558b19(0x149)]&&(_0x40dfaf['funcName']=_0x7ee09[_0x558b19(0x149)]);}[_0x2ae0f7(0x127)](_0x2e584f){var _0x3285ef=_0x2ae0f7;return 0x1/_0x2e584f===Number[_0x3285ef(0xe6)];}[_0x2ae0f7(0x130)](_0x5bc381){var _0x41c501=_0x2ae0f7;!_0x5bc381[_0x41c501(0x165)]||!_0x5bc381['props'][_0x41c501(0x167)]||_0x5bc381[_0x41c501(0xff)]===_0x41c501(0x104)||_0x5bc381[_0x41c501(0xff)]===_0x41c501(0x176)||_0x5bc381['type']===_0x41c501(0xe3)||_0x5bc381[_0x41c501(0x165)][_0x41c501(0x18b)](function(_0x2fdba5,_0x243e14){var _0x372df0=_0x41c501,_0x3ac36e=_0x2fdba5[_0x372df0(0x149)][_0x372df0(0x144)](),_0x5e70ac=_0x243e14[_0x372df0(0x149)][_0x372df0(0x144)]();return _0x3ac36e<_0x5e70ac?-0x1:_0x3ac36e>_0x5e70ac?0x1:0x0;});}[_0x2ae0f7(0x18f)](_0x3662fc,_0x2f4456){var _0x78a313=_0x2ae0f7;if(!(_0x2f4456[_0x78a313(0x184)]||!_0x3662fc[_0x78a313(0x165)]||!_0x3662fc[_0x78a313(0x165)][_0x78a313(0x167)])){for(var _0x236dd2=[],_0x49717e=[],_0x5b293e=0x0,_0xab9236=_0x3662fc[_0x78a313(0x165)][_0x78a313(0x167)];_0x5b293e<_0xab9236;_0x5b293e++){var _0x3ee38b=_0x3662fc['props'][_0x5b293e];_0x3ee38b[_0x78a313(0xff)]===_0x78a313(0x15f)?_0x236dd2[_0x78a313(0x1ba)](_0x3ee38b):_0x49717e['push'](_0x3ee38b);}if(!(!_0x49717e['length']||_0x236dd2[_0x78a313(0x167)]<=0x1)){_0x3662fc[_0x78a313(0x165)]=_0x49717e;var _0x59f594={'functionsNode':!0x0,'props':_0x236dd2};this['_setNodeId'](_0x59f594,_0x2f4456),this[_0x78a313(0x17b)](_0x59f594,_0x2f4456),this[_0x78a313(0x159)](_0x59f594),this[_0x78a313(0xfd)](_0x59f594,_0x2f4456),_0x59f594['id']+='\\x20f',_0x3662fc['props'][_0x78a313(0x11d)](_0x59f594);}}}[_0x2ae0f7(0x105)](_0x4434c1,_0x465f40){}[_0x2ae0f7(0x159)](_0x29b6da){}[_0x2ae0f7(0x117)](_0x2637de){var _0x198c5d=_0x2ae0f7;return Array['isArray'](_0x2637de)||typeof _0x2637de==_0x198c5d(0x11f)&&this['_objectToString'](_0x2637de)===_0x198c5d(0x1aa);}[_0x2ae0f7(0xfd)](_0x5a0473,_0x59a7cc){}['_cleanNode'](_0x5ea263){var _0xdd0ae5=_0x2ae0f7;delete _0x5ea263[_0xdd0ae5(0x120)],delete _0x5ea263['_hasSetOnItsPath'],delete _0x5ea263[_0xdd0ae5(0x151)];}[_0x2ae0f7(0xee)](_0x598858,_0x3caac1){}}let _0x611b8e=new _0x493c05(),_0x48e9ea={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x28df38={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x357de1(_0x2dfd68,_0x244908,_0x212b7d,_0x348d4d,_0x37fc39,_0xf37c4f){var _0xc76bbd=_0x2ae0f7;let _0x232745,_0x2e006a;try{_0x2e006a=_0x399dfb(),_0x232745=_0x5e09b5[_0x244908],!_0x232745||_0x2e006a-_0x232745['ts']>0x1f4&&_0x232745[_0xc76bbd(0x17e)]&&_0x232745[_0xc76bbd(0x1b4)]/_0x232745['count']<0x64?(_0x5e09b5[_0x244908]=_0x232745={'count':0x0,'time':0x0,'ts':_0x2e006a},_0x5e09b5[_0xc76bbd(0x116)]={}):_0x2e006a-_0x5e09b5[_0xc76bbd(0x116)]['ts']>0x32&&_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x17e)]&&_0x5e09b5[_0xc76bbd(0x116)]['time']/_0x5e09b5['hits'][_0xc76bbd(0x17e)]<0x64&&(_0x5e09b5[_0xc76bbd(0x116)]={});let _0x103c37=[],_0x19a920=_0x232745[_0xc76bbd(0x1b6)]||_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x1b6)]?_0x28df38:_0x48e9ea,_0x266396=_0x478299=>{var _0x338e13=_0xc76bbd;let _0x3fc31a={};return _0x3fc31a[_0x338e13(0x165)]=_0x478299[_0x338e13(0x165)],_0x3fc31a[_0x338e13(0x1b7)]=_0x478299[_0x338e13(0x1b7)],_0x3fc31a[_0x338e13(0x191)]=_0x478299[_0x338e13(0x191)],_0x3fc31a[_0x338e13(0x168)]=_0x478299[_0x338e13(0x168)],_0x3fc31a[_0x338e13(0x128)]=_0x478299['autoExpandLimit'],_0x3fc31a[_0x338e13(0x12a)]=_0x478299[_0x338e13(0x12a)],_0x3fc31a['sortProps']=!0x1,_0x3fc31a[_0x338e13(0x184)]=!_0x5b4f2b,_0x3fc31a[_0x338e13(0x153)]=0x1,_0x3fc31a['level']=0x0,_0x3fc31a['expId']=_0x338e13(0x197),_0x3fc31a[_0x338e13(0x195)]=_0x338e13(0x171),_0x3fc31a[_0x338e13(0xde)]=!0x0,_0x3fc31a[_0x338e13(0x1b3)]=[],_0x3fc31a[_0x338e13(0x122)]=0x0,_0x3fc31a[_0x338e13(0x196)]=!0x0,_0x3fc31a[_0x338e13(0x173)]=0x0,_0x3fc31a['node']={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x3fc31a;};for(var _0x49e990=0x0;_0x49e990<_0x37fc39[_0xc76bbd(0x167)];_0x49e990++)_0x103c37[_0xc76bbd(0x1ba)](_0x611b8e['serialize']({'timeNode':_0x2dfd68==='time'||void 0x0},_0x37fc39[_0x49e990],_0x266396(_0x19a920),{}));if(_0x2dfd68==='trace'){let _0x5c882e=Error[_0xc76bbd(0xd7)];try{Error[_0xc76bbd(0xd7)]=0x1/0x0,_0x103c37[_0xc76bbd(0x1ba)](_0x611b8e[_0xc76bbd(0x1ac)]({'stackNode':!0x0},new Error()[_0xc76bbd(0x1a2)],_0x266396(_0x19a920),{'strLength':0x1/0x0}));}finally{Error[_0xc76bbd(0xd7)]=_0x5c882e;}}return{'method':_0xc76bbd(0xf9),'version':_0x495f21,'args':[{'ts':_0x212b7d,'session':_0x348d4d,'args':_0x103c37,'id':_0x244908,'context':_0xf37c4f}]};}catch(_0xbd00f9){return{'method':_0xc76bbd(0xf9),'version':_0x495f21,'args':[{'ts':_0x212b7d,'session':_0x348d4d,'args':[{'type':_0xc76bbd(0x135),'error':_0xbd00f9&&_0xbd00f9[_0xc76bbd(0x113)]}],'id':_0x244908,'context':_0xf37c4f}]};}finally{try{if(_0x232745&&_0x2e006a){let _0xd289e6=_0x399dfb();_0x232745[_0xc76bbd(0x17e)]++,_0x232745[_0xc76bbd(0x1b4)]+=_0x23ae99(_0x2e006a,_0xd289e6),_0x232745['ts']=_0xd289e6,_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x17e)]++,_0x5e09b5[_0xc76bbd(0x116)]['time']+=_0x23ae99(_0x2e006a,_0xd289e6),_0x5e09b5['hits']['ts']=_0xd289e6,(_0x232745[_0xc76bbd(0x17e)]>0x32||_0x232745[_0xc76bbd(0x1b4)]>0x64)&&(_0x232745[_0xc76bbd(0x1b6)]=!0x0),(_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x17e)]>0x3e8||_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x1b4)]>0x12c)&&(_0x5e09b5['hits']['reduceLimits']=!0x0);}}catch{}}}return _0x357de1;}((_0xe39406,_0x12f4af,_0x453c88,_0x41365b,_0xc3559e,_0xdce0af,_0x33c738,_0x26605a,_0x543a92,_0x5f076a,_0x5844c8)=>{var _0x3348a8=_0x22af76;if(_0xe39406[_0x3348a8(0x16b)])return _0xe39406['_console_ninja'];if(!X(_0xe39406,_0x26605a,_0xc3559e))return _0xe39406[_0x3348a8(0x16b)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0xe39406[_0x3348a8(0x16b)];let _0x3599bc=b(_0xe39406),_0x7e6c5c=_0x3599bc['elapsed'],_0x369f46=_0x3599bc['timeStamp'],_0x165423=_0x3599bc['now'],_0x1e8be2={'hits':{},'ts':{}},_0x5d1787=H(_0xe39406,_0x543a92,_0x1e8be2,_0xdce0af),_0x1f0dca=_0x5411c4=>{_0x1e8be2['ts'][_0x5411c4]=_0x369f46();},_0x137155=(_0x29df21,_0x92cd06)=>{let _0x211b5e=_0x1e8be2['ts'][_0x92cd06];if(delete _0x1e8be2['ts'][_0x92cd06],_0x211b5e){let _0x25b30=_0x7e6c5c(_0x211b5e,_0x369f46());_0x230ae2(_0x5d1787('time',_0x29df21,_0x165423(),_0x2638dc,[_0x25b30],_0x92cd06));}},_0x26da5f=_0x21b4f5=>{var _0x4fe62f=_0x3348a8,_0x574fa5;return _0xc3559e===_0x4fe62f(0x187)&&_0xe39406[_0x4fe62f(0x14d)]&&((_0x574fa5=_0x21b4f5==null?void 0x0:_0x21b4f5[_0x4fe62f(0xf0)])==null?void 0x0:_0x574fa5[_0x4fe62f(0x167)])&&(_0x21b4f5[_0x4fe62f(0xf0)][0x0]['origin']=_0xe39406[_0x4fe62f(0x14d)]),_0x21b4f5;};_0xe39406[_0x3348a8(0x16b)]={'consoleLog':(_0x581e6b,_0x5c928c)=>{var _0x341716=_0x3348a8;_0xe39406[_0x341716(0x10c)][_0x341716(0xf9)]['name']!=='disabledLog'&&_0x230ae2(_0x5d1787('log',_0x581e6b,_0x165423(),_0x2638dc,_0x5c928c));},'consoleTrace':(_0x4aca16,_0xfebfc6)=>{var _0x1a169f=_0x3348a8;_0xe39406[_0x1a169f(0x10c)][_0x1a169f(0xf9)][_0x1a169f(0x149)]!=='disabledTrace'&&_0x230ae2(_0x26da5f(_0x5d1787(_0x1a169f(0x132),_0x4aca16,_0x165423(),_0x2638dc,_0xfebfc6)));},'consoleTime':_0x10b89d=>{_0x1f0dca(_0x10b89d);},'consoleTimeEnd':(_0xc2cdf8,_0x448e82)=>{_0x137155(_0x448e82,_0xc2cdf8);},'autoLog':(_0x58dacd,_0x3cb101)=>{var _0x4266a6=_0x3348a8;_0x230ae2(_0x5d1787(_0x4266a6(0xf9),_0x3cb101,_0x165423(),_0x2638dc,[_0x58dacd]));},'autoLogMany':(_0xea83fe,_0x1fdecb)=>{_0x230ae2(_0x5d1787('log',_0xea83fe,_0x165423(),_0x2638dc,_0x1fdecb));},'autoTrace':(_0x130829,_0x1b5197)=>{var _0x52cc80=_0x3348a8;_0x230ae2(_0x26da5f(_0x5d1787(_0x52cc80(0x132),_0x1b5197,_0x165423(),_0x2638dc,[_0x130829])));},'autoTraceMany':(_0x5a09f5,_0x18939b)=>{var _0x3f44ce=_0x3348a8;_0x230ae2(_0x26da5f(_0x5d1787(_0x3f44ce(0x132),_0x5a09f5,_0x165423(),_0x2638dc,_0x18939b)));},'autoTime':(_0xcf495c,_0x1cce05,_0x396811)=>{_0x1f0dca(_0x396811);},'autoTimeEnd':(_0x5738d5,_0x5b3b6d,_0x3d8db4)=>{_0x137155(_0x5b3b6d,_0x3d8db4);},'coverage':_0x41793b=>{var _0x1fb997=_0x3348a8;_0x230ae2({'method':_0x1fb997(0x16e),'version':_0xdce0af,'args':[{'id':_0x41793b}]});}};let _0x230ae2=q(_0xe39406,_0x12f4af,_0x453c88,_0x41365b,_0xc3559e,_0x5f076a,_0x5844c8),_0x2638dc=_0xe39406[_0x3348a8(0x112)];return _0xe39406['_console_ninja'];})(globalThis,'127.0.0.1',_0x22af76(0x1a8),_0x22af76(0xe4),_0x22af76(0x19e),_0x22af76(0x17c),_0x22af76(0x1a5),_0x22af76(0x13a),_0x22af76(0x189),'','1');");
  } catch (e) {}
}
; /* istanbul ignore next */
function oo_oo(i) {
  for (var _len = arguments.length, v = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    v[_key - 1] = arguments[_key];
  }
  try {
    oo_cm().consoleLog(i, v);
  } catch (e) {}
  return v;
}
; /* istanbul ignore next */
function oo_tr(i) {
  for (var _len2 = arguments.length, v = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    v[_key2 - 1] = arguments[_key2];
  }
  try {
    oo_cm().consoleTrace(i, v);
  } catch (e) {}
  return v;
}
; /* istanbul ignore next */
function oo_ts(v) {
  try {
    oo_cm().consoleTime(v);
  } catch (e) {}
  return v;
}
; /* istanbul ignore next */
function oo_te(v, i) {
  try {
    oo_cm().consoleTimeEnd(v, i);
  } catch (e) {}
  return v;
}
; /*eslint unicorn/no-abusive-eslint-disable:,eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/

/***/ }),

/***/ "./resources/asset/admin/vendors/general/jquery-form/dist/jquery.form.min.js":
/*!***********************************************************************************!*\
  !*** ./resources/asset/admin/vendors/general/jquery-form/dist/jquery.form.min.js ***!
  \***********************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/*!
 * jQuery Form Plugin
 * version: 4.2.2
 * Requires jQuery v1.7.2 or later
 * Project repository: https://github.com/jquery-form/form

 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup

 * Dual licensed under the LGPL-2.1+ or MIT licenses
 * https://github.com/jquery-form/form#license

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */
!function (e) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
}(function (e) {
  "use strict";

  function t(t) {
    var r = t.data;
    t.isDefaultPrevented() || (t.preventDefault(), e(t.target).closest("form").ajaxSubmit(r));
  }
  function r(t) {
    var r = t.target,
      a = e(r);
    if (!a.is("[type=submit],[type=image]")) {
      var n = a.closest("[type=submit]");
      if (0 === n.length) return;
      r = n[0];
    }
    var i = r.form;
    if (i.clk = r, "image" === r.type) if (void 0 !== t.offsetX) i.clk_x = t.offsetX, i.clk_y = t.offsetY;else if ("function" == typeof e.fn.offset) {
      var o = a.offset();
      i.clk_x = t.pageX - o.left, i.clk_y = t.pageY - o.top;
    } else i.clk_x = t.pageX - r.offsetLeft, i.clk_y = t.pageY - r.offsetTop;
    setTimeout(function () {
      i.clk = i.clk_x = i.clk_y = null;
    }, 100);
  }
  function a() {
    if (e.fn.ajaxSubmit.debug) {
      var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
      window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t);
    }
  }
  var n = /\r?\n/g,
    i = {};
  i.fileapi = void 0 !== e('<input type="file">').get(0).files, i.formdata = void 0 !== window.FormData;
  var o = !!e.fn.prop;
  e.fn.attr2 = function () {
    if (!o) return this.attr.apply(this, arguments);
    var e = this.prop.apply(this, arguments);
    return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments);
  }, e.fn.ajaxSubmit = function (t, r, n, s) {
    function u(r) {
      var a,
        n,
        i = e.param(r, t.traditional).split("&"),
        o = i.length,
        s = [];
      for (a = 0; a < o; a++) i[a] = i[a].replace(/\+/g, " "), n = i[a].split("="), s.push([decodeURIComponent(n[0]), decodeURIComponent(n[1])]);
      return s;
    }
    function c(r) {
      function n(e) {
        var t = null;
        try {
          e.contentWindow && (t = e.contentWindow.document);
        } catch (e) {
          a("cannot get iframe.contentWindow document: " + e);
        }
        if (t) return t;
        try {
          t = e.contentDocument ? e.contentDocument : e.document;
        } catch (r) {
          a("cannot get iframe.contentDocument: " + r), t = e.document;
        }
        return t;
      }
      function i() {
        function t() {
          try {
            var e = n(v).readyState;
            a("state = " + e), e && "uninitialized" === e.toLowerCase() && setTimeout(t, 50);
          } catch (e) {
            a("Server abort: ", e, " (", e.name, ")"), s(L), j && clearTimeout(j), j = void 0;
          }
        }
        var r = p.attr2("target"),
          i = p.attr2("action"),
          o = p.attr("enctype") || p.attr("encoding") || "multipart/form-data";
        w.setAttribute("target", m), l && !/post/i.test(l) || w.setAttribute("method", "POST"), i !== f.url && w.setAttribute("action", f.url), f.skipEncodingOverride || l && !/post/i.test(l) || p.attr({
          encoding: "multipart/form-data",
          enctype: "multipart/form-data"
        }), f.timeout && (j = setTimeout(function () {
          T = !0, s(A);
        }, f.timeout));
        var u = [];
        try {
          if (f.extraData) for (var c in f.extraData) f.extraData.hasOwnProperty(c) && (e.isPlainObject(f.extraData[c]) && f.extraData[c].hasOwnProperty("name") && f.extraData[c].hasOwnProperty("value") ? u.push(e('<input type="hidden" name="' + f.extraData[c].name + '">', k).val(f.extraData[c].value).appendTo(w)[0]) : u.push(e('<input type="hidden" name="' + c + '">', k).val(f.extraData[c]).appendTo(w)[0]));
          f.iframeTarget || h.appendTo(D), v.attachEvent ? v.attachEvent("onload", s) : v.addEventListener("load", s, !1), setTimeout(t, 15);
          try {
            w.submit();
          } catch (e) {
            document.createElement("form").submit.apply(w);
          }
        } finally {
          w.setAttribute("action", i), w.setAttribute("enctype", o), r ? w.setAttribute("target", r) : p.removeAttr("target"), e(u).remove();
        }
      }
      function s(t) {
        if (!x.aborted && !X) {
          if ((O = n(v)) || (a("cannot access response document"), t = L), t === A && x) return x.abort("timeout"), void S.reject(x, "timeout");
          if (t === L && x) return x.abort("server abort"), void S.reject(x, "error", "server abort");
          if (O && O.location.href !== f.iframeSrc || T) {
            v.detachEvent ? v.detachEvent("onload", s) : v.removeEventListener("load", s, !1);
            var r,
              i = "success";
            try {
              if (T) throw "timeout";
              var o = "xml" === f.dataType || O.XMLDocument || e.isXMLDoc(O);
              if (a("isXml=" + o), !o && window.opera && (null === O.body || !O.body.innerHTML) && --C) return a("requeing onLoad callback, DOM not available"), void setTimeout(s, 250);
              var u = O.body ? O.body : O.documentElement;
              x.responseText = u ? u.innerHTML : null, x.responseXML = O.XMLDocument ? O.XMLDocument : O, o && (f.dataType = "xml"), x.getResponseHeader = function (e) {
                return {
                  "content-type": f.dataType
                }[e.toLowerCase()];
              }, u && (x.status = Number(u.getAttribute("status")) || x.status, x.statusText = u.getAttribute("statusText") || x.statusText);
              var c = (f.dataType || "").toLowerCase(),
                l = /(json|script|text)/.test(c);
              if (l || f.textarea) {
                var p = O.getElementsByTagName("textarea")[0];
                if (p) x.responseText = p.value, x.status = Number(p.getAttribute("status")) || x.status, x.statusText = p.getAttribute("statusText") || x.statusText;else if (l) {
                  var m = O.getElementsByTagName("pre")[0],
                    g = O.getElementsByTagName("body")[0];
                  m ? x.responseText = m.textContent ? m.textContent : m.innerText : g && (x.responseText = g.textContent ? g.textContent : g.innerText);
                }
              } else "xml" === c && !x.responseXML && x.responseText && (x.responseXML = q(x.responseText));
              try {
                M = N(x, c, f);
              } catch (e) {
                i = "parsererror", x.error = r = e || i;
              }
            } catch (e) {
              a("error caught: ", e), i = "error", x.error = r = e || i;
            }
            x.aborted && (a("upload aborted"), i = null), x.status && (i = x.status >= 200 && x.status < 300 || 304 === x.status ? "success" : "error"), "success" === i ? (f.success && f.success.call(f.context, M, "success", x), S.resolve(x.responseText, "success", x), d && e.event.trigger("ajaxSuccess", [x, f])) : i && (void 0 === r && (r = x.statusText), f.error && f.error.call(f.context, x, i, r), S.reject(x, "error", r), d && e.event.trigger("ajaxError", [x, f, r])), d && e.event.trigger("ajaxComplete", [x, f]), d && ! --e.active && e.event.trigger("ajaxStop"), f.complete && f.complete.call(f.context, x, i), X = !0, f.timeout && clearTimeout(j), setTimeout(function () {
              f.iframeTarget ? h.attr("src", f.iframeSrc) : h.remove(), x.responseXML = null;
            }, 100);
          }
        }
      }
      var u,
        c,
        f,
        d,
        m,
        h,
        v,
        x,
        y,
        b,
        T,
        j,
        w = p[0],
        S = e.Deferred();
      if (S.abort = function (e) {
        x.abort(e);
      }, r) for (c = 0; c < g.length; c++) u = e(g[c]), o ? u.prop("disabled", !1) : u.removeAttr("disabled");
      (f = e.extend(!0, {}, e.ajaxSettings, t)).context = f.context || f, m = "jqFormIO" + new Date().getTime();
      var k = w.ownerDocument,
        D = p.closest("body");
      if (f.iframeTarget ? (b = (h = e(f.iframeTarget, k)).attr2("name")) ? m = b : h.attr2("name", m) : (h = e('<iframe name="' + m + '" src="' + f.iframeSrc + '" />', k)).css({
        position: "absolute",
        top: "-1000px",
        left: "-1000px"
      }), v = h[0], x = {
        aborted: 0,
        responseText: null,
        responseXML: null,
        status: 0,
        statusText: "n/a",
        getAllResponseHeaders: function getAllResponseHeaders() {},
        getResponseHeader: function getResponseHeader() {},
        setRequestHeader: function setRequestHeader() {},
        abort: function abort(t) {
          var r = "timeout" === t ? "timeout" : "aborted";
          a("aborting upload... " + r), this.aborted = 1;
          try {
            v.contentWindow.document.execCommand && v.contentWindow.document.execCommand("Stop");
          } catch (e) {}
          h.attr("src", f.iframeSrc), x.error = r, f.error && f.error.call(f.context, x, r, t), d && e.event.trigger("ajaxError", [x, f, r]), f.complete && f.complete.call(f.context, x, r);
        }
      }, (d = f.global) && 0 == e.active++ && e.event.trigger("ajaxStart"), d && e.event.trigger("ajaxSend", [x, f]), f.beforeSend && !1 === f.beforeSend.call(f.context, x, f)) return f.global && e.active--, S.reject(), S;
      if (x.aborted) return S.reject(), S;
      (y = w.clk) && (b = y.name) && !y.disabled && (f.extraData = f.extraData || {}, f.extraData[b] = y.value, "image" === y.type && (f.extraData[b + ".x"] = w.clk_x, f.extraData[b + ".y"] = w.clk_y));
      var A = 1,
        L = 2,
        F = e("meta[name=csrf-token]").attr("content"),
        E = e("meta[name=csrf-param]").attr("content");
      E && F && (f.extraData = f.extraData || {}, f.extraData[E] = F), f.forceSync ? i() : setTimeout(i, 10);
      var M,
        O,
        X,
        C = 50,
        q = e.parseXML || function (e, t) {
          return window.ActiveXObject ? ((t = new ActiveXObject("Microsoft.XMLDOM")).async = "false", t.loadXML(e)) : t = new DOMParser().parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" !== t.documentElement.nodeName ? t : null;
        },
        _ = e.parseJSON || function (e) {
          return window.eval("(" + e + ")");
        },
        N = function N(t, r, a) {
          var n = t.getResponseHeader("content-type") || "",
            i = ("xml" === r || !r) && n.indexOf("xml") >= 0,
            o = i ? t.responseXML : t.responseText;
          return i && "parsererror" === o.documentElement.nodeName && e.error && e.error("parsererror"), a && a.dataFilter && (o = a.dataFilter(o, r)), "string" == typeof o && (("json" === r || !r) && n.indexOf("json") >= 0 ? o = _(o) : ("script" === r || !r) && n.indexOf("javascript") >= 0 && e.globalEval(o)), o;
        };
      return S;
    }
    if (!this.length) return a("ajaxSubmit: skipping submit process - no element selected"), this;
    var l,
      f,
      d,
      p = this;
    "function" == typeof t ? t = {
      success: t
    } : "string" == typeof t || !1 === t && arguments.length > 0 ? (t = {
      url: t,
      data: r,
      dataType: n
    }, "function" == typeof s && (t.success = s)) : void 0 === t && (t = {}), l = t.method || t.type || this.attr2("method"), (d = (d = "string" == typeof (f = t.url || this.attr2("action")) ? e.trim(f) : "") || window.location.href || "") && (d = (d.match(/^([^#]+)/) || [])[1]), t = e.extend(!0, {
      url: d,
      success: e.ajaxSettings.success,
      type: l || e.ajaxSettings.type,
      iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
    }, t);
    var m = {};
    if (this.trigger("form-pre-serialize", [this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
    if (t.beforeSerialize && !1 === t.beforeSerialize(this, t)) return a("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
    var h = t.traditional;
    void 0 === h && (h = e.ajaxSettings.traditional);
    var v,
      g = [],
      x = this.formToArray(t.semantic, g, t.filtering);
    if (t.data) {
      var y = e.isFunction(t.data) ? t.data(x) : t.data;
      t.extraData = y, v = e.param(y, h);
    }
    if (t.beforeSubmit && !1 === t.beforeSubmit(x, this, t)) return a("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
    if (this.trigger("form-submit-validate", [x, this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
    var b = e.param(x, h);
    v && (b = b ? b + "&" + v : v), "GET" === t.type.toUpperCase() ? (t.url += (t.url.indexOf("?") >= 0 ? "&" : "?") + b, t.data = null) : t.data = b;
    var T = [];
    if (t.resetForm && T.push(function () {
      p.resetForm();
    }), t.clearForm && T.push(function () {
      p.clearForm(t.includeHidden);
    }), !t.dataType && t.target) {
      var j = t.success || function () {};
      T.push(function (r, a, n) {
        var i = arguments,
          o = t.replaceTarget ? "replaceWith" : "html";
        e(t.target)[o](r).each(function () {
          j.apply(this, i);
        });
      });
    } else t.success && (e.isArray(t.success) ? e.merge(T, t.success) : T.push(t.success));
    if (t.success = function (e, r, a) {
      for (var n = t.context || this, i = 0, o = T.length; i < o; i++) T[i].apply(n, [e, r, a || p, p]);
    }, t.error) {
      var w = t.error;
      t.error = function (e, r, a) {
        var n = t.context || this;
        w.apply(n, [e, r, a, p]);
      };
    }
    if (t.complete) {
      var S = t.complete;
      t.complete = function (e, r) {
        var a = t.context || this;
        S.apply(a, [e, r, p]);
      };
    }
    var k = e("input[type=file]:enabled", this).filter(function () {
        return "" !== e(this).val();
      }).length > 0,
      D = "multipart/form-data",
      A = p.attr("enctype") === D || p.attr("encoding") === D,
      L = i.fileapi && i.formdata;
    a("fileAPI :" + L);
    var F,
      E = (k || A) && !L;
    !1 !== t.iframe && (t.iframe || E) ? t.closeKeepAlive ? e.get(t.closeKeepAlive, function () {
      F = c(x);
    }) : F = c(x) : F = (k || A) && L ? function (r) {
      for (var a = new FormData(), n = 0; n < r.length; n++) a.append(r[n].name, r[n].value);
      if (t.extraData) {
        var i = u(t.extraData);
        for (n = 0; n < i.length; n++) i[n] && a.append(i[n][0], i[n][1]);
      }
      t.data = null;
      var o = e.extend(!0, {}, e.ajaxSettings, t, {
        contentType: !1,
        processData: !1,
        cache: !1,
        type: l || "POST"
      });
      t.uploadProgress && (o.xhr = function () {
        var r = e.ajaxSettings.xhr();
        return r.upload && r.upload.addEventListener("progress", function (e) {
          var r = 0,
            a = e.loaded || e.position,
            n = e.total;
          e.lengthComputable && (r = Math.ceil(a / n * 100)), t.uploadProgress(e, a, n, r);
        }, !1), r;
      }), o.data = null;
      var s = o.beforeSend;
      return o.beforeSend = function (e, r) {
        t.formData ? r.data = t.formData : r.data = a, s && s.call(this, e, r);
      }, e.ajax(o);
    }(x) : e.ajax(t), p.removeData("jqxhr").data("jqxhr", F);
    for (var M = 0; M < g.length; M++) g[M] = null;
    return this.trigger("form-submit-notify", [this, t]), this;
  }, e.fn.ajaxForm = function (n, i, o, s) {
    if (("string" == typeof n || !1 === n && arguments.length > 0) && (n = {
      url: n,
      data: i,
      dataType: o
    }, "function" == typeof s && (n.success = s)), n = n || {}, n.delegation = n.delegation && e.isFunction(e.fn.on), !n.delegation && 0 === this.length) {
      var u = {
        s: this.selector,
        c: this.context
      };
      return !e.isReady && u.s ? (a("DOM not ready, queuing ajaxForm"), e(function () {
        e(u.s, u.c).ajaxForm(n);
      }), this) : (a("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this);
    }
    return n.delegation ? (e(document).off("submit.form-plugin", this.selector, t).off("click.form-plugin", this.selector, r).on("submit.form-plugin", this.selector, n, t).on("click.form-plugin", this.selector, n, r), this) : this.ajaxFormUnbind().on("submit.form-plugin", n, t).on("click.form-plugin", n, r);
  }, e.fn.ajaxFormUnbind = function () {
    return this.off("submit.form-plugin click.form-plugin");
  }, e.fn.formToArray = function (t, r, a) {
    var n = [];
    if (0 === this.length) return n;
    var o,
      s = this[0],
      u = this.attr("id"),
      c = t || void 0 === s.elements ? s.getElementsByTagName("*") : s.elements;
    if (c && (c = e.makeArray(c)), u && (t || /(Edge|Trident)\//.test(navigator.userAgent)) && (o = e(':input[form="' + u + '"]').get()).length && (c = (c || []).concat(o)), !c || !c.length) return n;
    e.isFunction(a) && (c = e.map(c, a));
    var l, f, d, p, m, h, v;
    for (l = 0, h = c.length; l < h; l++) if (m = c[l], (d = m.name) && !m.disabled) if (t && s.clk && "image" === m.type) s.clk === m && (n.push({
      name: d,
      value: e(m).val(),
      type: m.type
    }), n.push({
      name: d + ".x",
      value: s.clk_x
    }, {
      name: d + ".y",
      value: s.clk_y
    }));else if ((p = e.fieldValue(m, !0)) && p.constructor === Array) for (r && r.push(m), f = 0, v = p.length; f < v; f++) n.push({
      name: d,
      value: p[f]
    });else if (i.fileapi && "file" === m.type) {
      r && r.push(m);
      var g = m.files;
      if (g.length) for (f = 0; f < g.length; f++) n.push({
        name: d,
        value: g[f],
        type: m.type
      });else n.push({
        name: d,
        value: "",
        type: m.type
      });
    } else null !== p && void 0 !== p && (r && r.push(m), n.push({
      name: d,
      value: p,
      type: m.type,
      required: m.required
    }));
    if (!t && s.clk) {
      var x = e(s.clk),
        y = x[0];
      (d = y.name) && !y.disabled && "image" === y.type && (n.push({
        name: d,
        value: x.val()
      }), n.push({
        name: d + ".x",
        value: s.clk_x
      }, {
        name: d + ".y",
        value: s.clk_y
      }));
    }
    return n;
  }, e.fn.formSerialize = function (t) {
    return e.param(this.formToArray(t));
  }, e.fn.fieldSerialize = function (t) {
    var r = [];
    return this.each(function () {
      var a = this.name;
      if (a) {
        var n = e.fieldValue(this, t);
        if (n && n.constructor === Array) for (var i = 0, o = n.length; i < o; i++) r.push({
          name: a,
          value: n[i]
        });else null !== n && void 0 !== n && r.push({
          name: this.name,
          value: n
        });
      }
    }), e.param(r);
  }, e.fn.fieldValue = function (t) {
    for (var r = [], a = 0, n = this.length; a < n; a++) {
      var i = this[a],
        o = e.fieldValue(i, t);
      null === o || void 0 === o || o.constructor === Array && !o.length || (o.constructor === Array ? e.merge(r, o) : r.push(o));
    }
    return r;
  }, e.fieldValue = function (t, r) {
    var a = t.name,
      i = t.type,
      o = t.tagName.toLowerCase();
    if (void 0 === r && (r = !0), r && (!a || t.disabled || "reset" === i || "button" === i || ("checkbox" === i || "radio" === i) && !t.checked || ("submit" === i || "image" === i) && t.form && t.form.clk !== t || "select" === o && -1 === t.selectedIndex)) return null;
    if ("select" === o) {
      var s = t.selectedIndex;
      if (s < 0) return null;
      for (var u = [], c = t.options, l = "select-one" === i, f = l ? s + 1 : c.length, d = l ? s : 0; d < f; d++) {
        var p = c[d];
        if (p.selected && !p.disabled) {
          var m = p.value;
          if (m || (m = p.attributes && p.attributes.value && !p.attributes.value.specified ? p.text : p.value), l) return m;
          u.push(m);
        }
      }
      return u;
    }
    return e(t).val().replace(n, "\r\n");
  }, e.fn.clearForm = function (t) {
    return this.each(function () {
      e("input,select,textarea", this).clearFields(t);
    });
  }, e.fn.clearFields = e.fn.clearInputs = function (t) {
    var r = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
    return this.each(function () {
      var a = this.type,
        n = this.tagName.toLowerCase();
      r.test(a) || "textarea" === n ? this.value = "" : "checkbox" === a || "radio" === a ? this.checked = !1 : "select" === n ? this.selectedIndex = -1 : "file" === a ? /MSIE/.test(navigator.userAgent) ? e(this).replaceWith(e(this).clone(!0)) : e(this).val("") : t && (!0 === t && /hidden/.test(a) || "string" == typeof t && e(this).is(t)) && (this.value = "");
    });
  }, e.fn.resetForm = function () {
    return this.each(function () {
      var t = e(this),
        r = this.tagName.toLowerCase();
      switch (r) {
        case "input":
          this.checked = this.defaultChecked;
        case "textarea":
          return this.value = this.defaultValue, !0;
        case "option":
        case "optgroup":
          var a = t.parents("select");
          return a.length && a[0].multiple ? "option" === r ? this.selected = this.defaultSelected : t.find("option").resetForm() : a.resetForm(), !0;
        case "select":
          return t.find("option").each(function (e) {
            if (this.selected = this.defaultSelected, this.defaultSelected && !t[0].multiple) return t[0].selectedIndex = e, !1;
          }), !0;
        case "label":
          var n = e(t.attr("for")),
            i = t.find("input,select,textarea");
          return n[0] && i.unshift(n[0]), i.resetForm(), !0;
        case "form":
          return ("function" == typeof this.reset || "object" == _typeof(this.reset) && !this.reset.nodeType) && this.reset(), !0;
        default:
          return t.find("form,input,label,select,textarea").resetForm(), !0;
      }
    });
  }, e.fn.enable = function (e) {
    return void 0 === e && (e = !0), this.each(function () {
      this.disabled = !e;
    });
  }, e.fn.selected = function (t) {
    return void 0 === t && (t = !0), this.each(function () {
      var r = this.type;
      if ("checkbox" === r || "radio" === r) this.checked = t;else if ("option" === this.tagName.toLowerCase()) {
        var a = e(this).parent("select");
        t && a[0] && "select-one" === a[0].type && a.find("option").selected(!1), this.selected = t;
      }
    });
  }, e.fn.ajaxSubmit.debug = !1;
});

/***/ }),

/***/ "./resources/js/admin-login.js":
/*!*************************************!*\
  !*** ./resources/js/admin-login.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/dist/js.cookie.mjs");
/* harmony import */ var jquery_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery-validation */ "./node_modules/jquery-validation/dist/jquery.validate.js");
/* harmony import */ var jquery_validation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery_validation__WEBPACK_IMPORTED_MODULE_1__);
window.$ = window.jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
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


window.Cookies = js_cookie__WEBPACK_IMPORTED_MODULE_0__["default"];
window.Sticky = __webpack_require__(/*! sticky-js */ "./node_modules/sticky-js/index.js");
__webpack_require__(/*! ../asset/admin/vendors/general/jquery-form/dist/jquery.form.min.js */ "./resources/asset/admin/vendors/general/jquery-form/dist/jquery.form.min.js");
// require('../asset/admin/vendors/general/jquery-validation/dist/jquery.validate.js');
// require('../asset/admin/vendors/general/jquery-validation/dist/additional-methods.js');
// require('../asset/admin/vendors/custom/js/vendors/jquery-validation.init.js');
__webpack_require__(/*! ../asset/admin/js/demo1/scripts.bundle.js */ "./resources/asset/admin/js/demo1/scripts.bundle.js");
__webpack_require__(/*! ../asset/admin/js/demo1/pages/login/login-general.js */ "./resources/asset/admin/js/demo1/pages/login/login-general.js");

/***/ }),

/***/ "./node_modules/jquery-validation/dist/jquery.validate.js":
/*!****************************************************************!*\
  !*** ./node_modules/jquery-validation/dist/jquery.validate.js ***!
  \****************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery Validation Plugin v1.20.0
 *
 * https://jqueryvalidation.org/
 *
 * Copyright (c) 2023 Jörn Zaefferer
 * Released under the MIT license
 */
(function( factory ) {
	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}(function( $ ) {

$.extend( $.fn, {

	// https://jqueryvalidation.org/validate/
	validate: function( options ) {

		// If nothing is selected, return nothing; can't chain anyway
		if ( !this.length ) {
			if ( options && options.debug && window.console ) {
				console.warn( "Nothing selected, can't validate, returning nothing." );
			}
			return;
		}

		// Check if a validator for this form was already created
		var validator = $.data( this[ 0 ], "validator" );
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr( "novalidate", "novalidate" );

		validator = new $.validator( options, this[ 0 ] );
		$.data( this[ 0 ], "validator", validator );

		if ( validator.settings.onsubmit ) {

			this.on( "click.validate", ":submit", function( event ) {

				// Track the used submit button to properly handle scripted
				// submits later.
				validator.submitButton = event.currentTarget;

				// Allow suppressing validation by adding a cancel class to the submit button
				if ( $( this ).hasClass( "cancel" ) ) {
					validator.cancelSubmit = true;
				}

				// Allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
				if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
					validator.cancelSubmit = true;
				}
			} );

			// Validate the form on submit
			this.on( "submit.validate", function( event ) {
				if ( validator.settings.debug ) {

					// Prevent form submit to be able to see console output
					event.preventDefault();
				}

				function handle() {
					var hidden, result;

					// Insert a hidden input as a replacement for the missing submit button
					// The hidden input is inserted in two cases:
					//   - A user defined a `submitHandler`
					//   - There was a pending request due to `remote` method and `stopRequest()`
					//     was called to submit the form in case it's valid
					if ( validator.submitButton && ( validator.settings.submitHandler || validator.formSubmitted ) ) {
						hidden = $( "<input type='hidden'/>" )
							.attr( "name", validator.submitButton.name )
							.val( $( validator.submitButton ).val() )
							.appendTo( validator.currentForm );
					}

					if ( validator.settings.submitHandler && !validator.settings.debug ) {
						result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
						if ( hidden ) {

							// And clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						if ( result !== undefined ) {
							return result;
						}
						return false;
					}
					return true;
				}

				// Prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			} );
		}

		return validator;
	},

	// https://jqueryvalidation.org/valid/
	valid: function() {
		var valid, validator, errorList;

		if ( $( this[ 0 ] ).is( "form" ) ) {
			valid = this.validate().form();
		} else {
			errorList = [];
			valid = true;
			validator = $( this[ 0 ].form ).validate();
			this.each( function() {
				valid = validator.element( this ) && valid;
				if ( !valid ) {
					errorList = errorList.concat( validator.errorList );
				}
			} );
			validator.errorList = errorList;
		}
		return valid;
	},

	// https://jqueryvalidation.org/rules/
	rules: function( command, argument ) {
		var element = this[ 0 ],
			isContentEditable = typeof this.attr( "contenteditable" ) !== "undefined" && this.attr( "contenteditable" ) !== "false",
			settings, staticRules, existingRules, data, param, filtered;

		// If nothing is selected, return empty object; can't chain anyway
		if ( element == null ) {
			return;
		}

		if ( !element.form && isContentEditable ) {
			element.form = this.closest( "form" )[ 0 ];
			element.name = this.attr( "name" );
		}

		if ( element.form == null ) {
			return;
		}

		if ( command ) {
			settings = $.data( element.form, "validator" ).settings;
			staticRules = settings.rules;
			existingRules = $.validator.staticRules( element );
			switch ( command ) {
			case "add":
				$.extend( existingRules, $.validator.normalizeRule( argument ) );

				// Remove messages from rules, but allow them to be set separately
				delete existingRules.messages;
				staticRules[ element.name ] = existingRules;
				if ( argument.messages ) {
					settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
				}
				break;
			case "remove":
				if ( !argument ) {
					delete staticRules[ element.name ];
					return existingRules;
				}
				filtered = {};
				$.each( argument.split( /\s/ ), function( index, method ) {
					filtered[ method ] = existingRules[ method ];
					delete existingRules[ method ];
				} );
				return filtered;
			}
		}

		data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.classRules( element ),
			$.validator.attributeRules( element ),
			$.validator.dataRules( element ),
			$.validator.staticRules( element )
		), element );

		// Make sure required is at front
		if ( data.required ) {
			param = data.required;
			delete data.required;
			data = $.extend( { required: param }, data );
		}

		// Make sure remote is at back
		if ( data.remote ) {
			param = data.remote;
			delete data.remote;
			data = $.extend( data, { remote: param } );
		}

		return data;
	}
} );

// JQuery trim is deprecated, provide a trim method based on String.prototype.trim
var trim = function( str ) {

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim#Polyfill
	return str.replace( /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "" );
};

// Custom selectors
$.extend( $.expr.pseudos || $.expr[ ":" ], {		// '|| $.expr[ ":" ]' here enables backwards compatibility to jQuery 1.7. Can be removed when dropping jQ 1.7.x support

	// https://jqueryvalidation.org/blank-selector/
	blank: function( a ) {
		return !trim( "" + $( a ).val() );
	},

	// https://jqueryvalidation.org/filled-selector/
	filled: function( a ) {
		var val = $( a ).val();
		return val !== null && !!trim( "" + val );
	},

	// https://jqueryvalidation.org/unchecked-selector/
	unchecked: function( a ) {
		return !$( a ).prop( "checked" );
	}
} );

// Constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

// https://jqueryvalidation.org/jQuery.validator.format/
$.validator.format = function( source, params ) {
	if ( arguments.length === 1 ) {
		return function() {
			var args = $.makeArray( arguments );
			args.unshift( source );
			return $.validator.format.apply( this, args );
		};
	}
	if ( params === undefined ) {
		return source;
	}
	if ( arguments.length > 2 && params.constructor !== Array  ) {
		params = $.makeArray( arguments ).slice( 1 );
	}
	if ( params.constructor !== Array ) {
		params = [ params ];
	}
	$.each( params, function( i, n ) {
		source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
			return n;
		} );
	} );
	return source;
};

$.extend( $.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		pendingClass: "pending",
		validClass: "valid",
		errorElement: "label",
		focusCleanup: false,
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function( element ) {
			this.lastActive = element;

			// Hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup ) {
				if ( this.settings.unhighlight ) {
					this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				}
				this.hideThese( this.errorsFor( element ) );
			}
		},
		onfocusout: function( element ) {
			if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
				this.element( element );
			}
		},
		onkeyup: function( element, event ) {

			// Avoid revalidate the field when pressing one of the following keys
			// Shift       => 16
			// Ctrl        => 17
			// Alt         => 18
			// Caps lock   => 20
			// End         => 35
			// Home        => 36
			// Left arrow  => 37
			// Up arrow    => 38
			// Right arrow => 39
			// Down arrow  => 40
			// Insert      => 45
			// Num lock    => 144
			// AltGr key   => 225
			var excludedKeys = [
				16, 17, 18, 20, 35, 36, 37,
				38, 39, 40, 45, 144, 225
			];

			if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
				return;
			} else if ( element.name in this.submitted || element.name in this.invalid ) {
				this.element( element );
			}
		},
		onclick: function( element ) {

			// Click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted ) {
				this.element( element );

			// Or option elements, check parent select in that case
			} else if ( element.parentNode.name in this.submitted ) {
				this.element( element.parentNode );
			}
		},
		highlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
			} else {
				$( element ).addClass( errorClass ).removeClass( validClass );
			}
		},
		unhighlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
			} else {
				$( element ).removeClass( errorClass ).addClass( validClass );
			}
		}
	},

	// https://jqueryvalidation.org/jQuery.validator.setDefaults/
	setDefaults: function( settings ) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		equalTo: "Please enter the same value again.",
		maxlength: $.validator.format( "Please enter no more than {0} characters." ),
		minlength: $.validator.format( "Please enter at least {0} characters." ),
		rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
		range: $.validator.format( "Please enter a value between {0} and {1}." ),
		max: $.validator.format( "Please enter a value less than or equal to {0}." ),
		min: $.validator.format( "Please enter a value greater than or equal to {0}." ),
		step: $.validator.format( "Please enter a multiple of {0}." )
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $( this.settings.errorLabelContainer );
			this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
			this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var currentForm = this.currentForm,
				groups = ( this.groups = {} ),
				rules;
			$.each( this.settings.groups, function( key, value ) {
				if ( typeof value === "string" ) {
					value = value.split( /\s/ );
				}
				$.each( value, function( index, name ) {
					groups[ name ] = key;
				} );
			} );
			rules = this.settings.rules;
			$.each( rules, function( key, value ) {
				rules[ key ] = $.validator.normalizeRule( value );
			} );

			function delegate( event ) {
				var isContentEditable = typeof $( this ).attr( "contenteditable" ) !== "undefined" && $( this ).attr( "contenteditable" ) !== "false";

				// Set form expando on contenteditable
				if ( !this.form && isContentEditable ) {
					this.form = $( this ).closest( "form" )[ 0 ];
					this.name = $( this ).attr( "name" );
				}

				// Ignore the element if it belongs to another form. This will happen mainly
				// when setting the `form` attribute of an input to the id of another form.
				if ( currentForm !== this.form ) {
					return;
				}

				var validator = $.data( this.form, "validator" ),
					eventType = "on" + event.type.replace( /^validate/, "" ),
					settings = validator.settings;
				if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
					settings[ eventType ].call( validator, this, event );
				}
			}

			$( this.currentForm )
				.on( "focusin.validate focusout.validate keyup.validate",
					":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
					"[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
					"[type='radio'], [type='checkbox'], [contenteditable], [type='button']", delegate )

				// Support: Chrome, oldIE
				// "select" is provided as event.target when clicking a option
				.on( "click.validate", "select, option, [type='radio'], [type='checkbox']", delegate );

			if ( this.settings.invalidHandler ) {
				$( this.currentForm ).on( "invalid-form.validate", this.settings.invalidHandler );
			}
		},

		// https://jqueryvalidation.org/Validator.form/
		form: function() {
			this.checkForm();
			$.extend( this.submitted, this.errorMap );
			this.invalid = $.extend( {}, this.errorMap );
			if ( !this.valid() ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
			}
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
				this.check( elements[ i ] );
			}
			return this.valid();
		},

		// https://jqueryvalidation.org/Validator.element/
		element: function( element ) {
			var cleanElement = this.clean( element ),
				checkElement = this.validationTargetFor( cleanElement ),
				v = this,
				result = true,
				rs, group;

			if ( checkElement === undefined ) {
				delete this.invalid[ cleanElement.name ];
			} else {
				this.prepareElement( checkElement );
				this.currentElements = $( checkElement );

				// If this element is grouped, then validate all group elements already
				// containing a value
				group = this.groups[ checkElement.name ];
				if ( group ) {
					$.each( this.groups, function( name, testgroup ) {
						if ( testgroup === group && name !== checkElement.name ) {
							cleanElement = v.validationTargetFor( v.clean( v.findByName( name ) ) );
							if ( cleanElement && cleanElement.name in v.invalid ) {
								v.currentElements.push( cleanElement );
								result = v.check( cleanElement ) && result;
							}
						}
					} );
				}

				rs = this.check( checkElement ) !== false;
				result = result && rs;
				if ( rs ) {
					this.invalid[ checkElement.name ] = false;
				} else {
					this.invalid[ checkElement.name ] = true;
				}

				if ( !this.numberOfInvalids() ) {

					// Hide error containers on last error
					this.toHide = this.toHide.add( this.containers );
				}
				this.showErrors();

				// Add aria-invalid status for screen readers
				$( element ).attr( "aria-invalid", !rs );
			}

			return result;
		},

		// https://jqueryvalidation.org/Validator.showErrors/
		showErrors: function( errors ) {
			if ( errors ) {
				var validator = this;

				// Add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = $.map( this.errorMap, function( message, name ) {
					return {
						message: message,
						element: validator.findByName( name )[ 0 ]
					};
				} );

				// Remove items from success list
				this.successList = $.grep( this.successList, function( element ) {
					return !( element.name in errors );
				} );
			}
			if ( this.settings.showErrors ) {
				this.settings.showErrors.call( this, this.errorMap, this.errorList );
			} else {
				this.defaultShowErrors();
			}
		},

		// https://jqueryvalidation.org/Validator.resetForm/
		resetForm: function() {
			if ( $.fn.resetForm ) {
				$( this.currentForm ).resetForm();
			}
			this.invalid = {};
			this.submitted = {};
			this.prepareForm();
			this.hideErrors();
			var elements = this.elements()
				.removeData( "previousValue" )
				.removeAttr( "aria-invalid" );

			this.resetElements( elements );
		},

		resetElements: function( elements ) {
			var i;

			if ( this.settings.unhighlight ) {
				for ( i = 0; elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ],
						this.settings.errorClass, "" );
					this.findByName( elements[ i ].name ).removeClass( this.settings.validClass );
				}
			} else {
				elements
					.removeClass( this.settings.errorClass )
					.removeClass( this.settings.validClass );
			}
		},

		numberOfInvalids: function() {
			return this.objectLength( this.invalid );
		},

		objectLength: function( obj ) {
			/* jshint unused: false */
			var count = 0,
				i;
			for ( i in obj ) {

				// This check allows counting elements with empty error
				// message as invalid elements
				if ( obj[ i ] !== undefined && obj[ i ] !== null && obj[ i ] !== false ) {
					count++;
				}
			}
			return count;
		},

		hideErrors: function() {
			this.hideThese( this.toHide );
		},

		hideThese: function( errors ) {
			errors.not( this.containers ).text( "" );
			this.addWrapper( errors ).hide();
		},

		valid: function() {
			return this.size() === 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if ( this.settings.focusInvalid ) {
				try {
					$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [] )
					.filter( ":visible" )
					.trigger( "focus" )

					// Manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger( "focusin" );
				} catch ( e ) {

					// Ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep( this.errorList, function( n ) {
				return n.element.name === lastActive.name;
			} ).length === 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// Select all valid inputs inside the form (no submit or reset buttons)
			return $( this.currentForm )
			.find( "input, select, textarea, [contenteditable]" )
			.not( ":submit, :reset, :image, :disabled" )
			.not( this.settings.ignore )
			.filter( function() {
				var name = this.name || $( this ).attr( "name" ); // For contenteditable
				var isContentEditable = typeof $( this ).attr( "contenteditable" ) !== "undefined" && $( this ).attr( "contenteditable" ) !== "false";

				if ( !name && validator.settings.debug && window.console ) {
					console.error( "%o has no name assigned", this );
				}

				// Set form expando on contenteditable
				if ( isContentEditable ) {
					this.form = $( this ).closest( "form" )[ 0 ];
					this.name = name;
				}

				// Ignore elements that belong to other/nested forms
				if ( this.form !== validator.currentForm ) {
					return false;
				}

				// Select only the first element for each name, and only those with rules specified
				if ( name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
					return false;
				}

				rulesCache[ name ] = true;
				return true;
			} );
		},

		clean: function( selector ) {
			return $( selector )[ 0 ];
		},

		errors: function() {
			var errorClass = this.settings.errorClass.split( " " ).join( "." );
			return $( this.settings.errorElement + "." + errorClass, this.errorContext );
		},

		resetInternals: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $( [] );
			this.toHide = $( [] );
		},

		reset: function() {
			this.resetInternals();
			this.currentElements = $( [] );
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor( element );
		},

		elementValue: function( element ) {
			var $element = $( element ),
				type = element.type,
				isContentEditable = typeof $element.attr( "contenteditable" ) !== "undefined" && $element.attr( "contenteditable" ) !== "false",
				val, idx;

			if ( type === "radio" || type === "checkbox" ) {
				return this.findByName( element.name ).filter( ":checked" ).val();
			} else if ( type === "number" && typeof element.validity !== "undefined" ) {
				return element.validity.badInput ? "NaN" : $element.val();
			}

			if ( isContentEditable ) {
				val = $element.text();
			} else {
				val = $element.val();
			}

			if ( type === "file" ) {

				// Modern browser (chrome & safari)
				if ( val.substr( 0, 12 ) === "C:\\fakepath\\" ) {
					return val.substr( 12 );
				}

				// Legacy browsers
				// Unix-based path
				idx = val.lastIndexOf( "/" );
				if ( idx >= 0 ) {
					return val.substr( idx + 1 );
				}

				// Windows-based path
				idx = val.lastIndexOf( "\\" );
				if ( idx >= 0 ) {
					return val.substr( idx + 1 );
				}

				// Just the file name
				return val;
			}

			if ( typeof val === "string" ) {
				return val.replace( /\r/g, "" );
			}
			return val;
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $( element ).rules(),
				rulesCount = $.map( rules, function( n, i ) {
					return i;
				} ).length,
				dependencyMismatch = false,
				val = this.elementValue( element ),
				result, method, rule, normalizer;

			// Abort any pending Ajax request from a previous call to this method.
			this.abortRequest( element );

			// Prioritize the local normalizer defined for this element over the global one
			// if the former exists, otherwise user the global one in case it exists.
			if ( typeof rules.normalizer === "function" ) {
				normalizer = rules.normalizer;
			} else if (	typeof this.settings.normalizer === "function" ) {
				normalizer = this.settings.normalizer;
			}

			// If normalizer is defined, then call it to retreive the changed value instead
			// of using the real one.
			// Note that `this` in the normalizer is `element`.
			if ( normalizer ) {
				val = normalizer.call( element, val );

				// Delete the normalizer from rules to avoid treating it as a pre-defined method.
				delete rules.normalizer;
			}

			for ( method in rules ) {
				rule = { method: method, parameters: rules[ method ] };
				try {
					result = $.validator.methods[ method ].call( this, val, element, rule.parameters );

					// If a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result === "dependency-mismatch" && rulesCount === 1 ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result === "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor( element ) );
						return;
					}

					if ( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch ( e ) {
					if ( this.settings.debug && window.console ) {
						console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
					}
					if ( e instanceof TypeError ) {
						e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
					}

					throw e;
				}
			}
			if ( dependencyMismatch ) {
				return;
			}
			if ( this.objectLength( rules ) ) {
				this.successList.push( element );
			}
			return true;
		},

		// Return the custom message for the given element and validation method
		// specified in the element's HTML5 data attribute
		// return the generic message if present and no method specific message is present
		customDataMessage: function( element, method ) {
			return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
				method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
		},

		// Return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[ name ];
			return m && ( m.constructor === String ? m : m[ method ] );
		},

		// Return the first defined argument, allowing empty strings
		findDefined: function() {
			for ( var i = 0; i < arguments.length; i++ ) {
				if ( arguments[ i ] !== undefined ) {
					return arguments[ i ];
				}
			}
			return undefined;
		},

		// The second parameter 'rule' used to be a string, and extended to an object literal
		// of the following form:
		// rule = {
		//     method: "method name",
		//     parameters: "the given method parameters"
		// }
		//
		// The old behavior still supported, kept to maintain backward compatibility with
		// old code, and will be removed in the next major release.
		defaultMessage: function( element, rule ) {
			if ( typeof rule === "string" ) {
				rule = { method: rule };
			}

			var message = this.findDefined(
					this.customMessage( element.name, rule.method ),
					this.customDataMessage( element, rule.method ),

					// 'title' is never undefined, so handle empty string as undefined
					!this.settings.ignoreTitle && element.title || undefined,
					$.validator.messages[ rule.method ],
					"<strong>Warning: No message defined for " + element.name + "</strong>"
				),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message === "function" ) {
				message = message.call( this, rule.parameters, element );
			} else if ( theregex.test( message ) ) {
				message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
			}

			return message;
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule );

			this.errorList.push( {
				message: message,
				element: element,
				method: rule.method
			} );

			this.errorMap[ element.name ] = message;
			this.submitted[ element.name ] = message;
		},

		addWrapper: function( toToggle ) {
			if ( this.settings.wrapper ) {
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			}
			return toToggle;
		},

		defaultShowErrors: function() {
			var i, elements, error;
			for ( i = 0; this.errorList[ i ]; i++ ) {
				error = this.errorList[ i ];
				if ( this.settings.highlight ) {
					this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				}
				this.showLabel( error.element, error.message );
			}
			if ( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if ( this.settings.success ) {
				for ( i = 0; this.successList[ i ]; i++ ) {
					this.showLabel( this.successList[ i ] );
				}
			}
			if ( this.settings.unhighlight ) {
				for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not( this.invalidElements() );
		},

		invalidElements: function() {
			return $( this.errorList ).map( function() {
				return this.element;
			} );
		},

		showLabel: function( element, message ) {
			var place, group, errorID, v,
				error = this.errorsFor( element ),
				elementID = this.idOrName( element ),
				describedBy = $( element ).attr( "aria-describedby" );

			if ( error.length ) {

				// Refresh error/success class
				error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

				// Replace message on existing label
				if ( this.settings && this.settings.escapeHtml ) {
					error.text( message || "" );
				} else {
					error.html( message || "" );
				}
			} else {

				// Create error element
				error = $( "<" + this.settings.errorElement + ">" )
					.attr( "id", elementID + "-error" )
					.addClass( this.settings.errorClass );

				if ( this.settings && this.settings.escapeHtml ) {
					error.text( message || "" );
				} else {
					error.html( message || "" );
				}

				// Maintain reference to the element to be placed into the DOM
				place = error;
				if ( this.settings.wrapper ) {

					// Make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
				}
				if ( this.labelContainer.length ) {
					this.labelContainer.append( place );
				} else if ( this.settings.errorPlacement ) {
					this.settings.errorPlacement.call( this, place, $( element ) );
				} else {
					place.insertAfter( element );
				}

				// Link error back to the element
				if ( error.is( "label" ) ) {

					// If the error is a label, then associate using 'for'
					error.attr( "for", elementID );

					// If the element is not a child of an associated label, then it's necessary
					// to explicitly apply aria-describedby
				} else if ( error.parents( "label[for='" + this.escapeCssMeta( elementID ) + "']" ).length === 0 ) {
					errorID = error.attr( "id" );

					// Respect existing non-error aria-describedby
					if ( !describedBy ) {
						describedBy = errorID;
					} else if ( !describedBy.match( new RegExp( "\\b" + this.escapeCssMeta( errorID ) + "\\b" ) ) ) {

						// Add to end of list if not already present
						describedBy += " " + errorID;
					}
					$( element ).attr( "aria-describedby", describedBy );

					// If this element is grouped, then assign to all elements in the same group
					group = this.groups[ element.name ];
					if ( group ) {
						v = this;
						$.each( v.groups, function( name, testgroup ) {
							if ( testgroup === group ) {
								$( "[name='" + v.escapeCssMeta( name ) + "']", v.currentForm )
									.attr( "aria-describedby", error.attr( "id" ) );
							}
						} );
					}
				}
			}
			if ( !message && this.settings.success ) {
				error.text( "" );
				if ( typeof this.settings.success === "string" ) {
					error.addClass( this.settings.success );
				} else {
					this.settings.success( error, element );
				}
			}
			this.toShow = this.toShow.add( error );
		},

		errorsFor: function( element ) {
			var name = this.escapeCssMeta( this.idOrName( element ) ),
				describer = $( element ).attr( "aria-describedby" ),
				selector = "label[for='" + name + "'], label[for='" + name + "'] *";

			// 'aria-describedby' should directly reference the error element
			if ( describer ) {
				selector = selector + ", #" + this.escapeCssMeta( describer )
					.replace( /\s+/g, ", #" );
			}

			return this
				.errors()
				.filter( selector );
		},

		// See https://api.jquery.com/category/selectors/, for CSS
		// meta-characters that should be escaped in order to be used with JQuery
		// as a literal part of a name/id or any selector.
		escapeCssMeta: function( string ) {
			if ( string === undefined ) {
				return "";
			}

			return string.replace( /([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1" );
		},

		idOrName: function( element ) {
			return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
		},

		validationTargetFor: function( element ) {

			// If radio/checkbox, validate first element in group instead
			if ( this.checkable( element ) ) {
				element = this.findByName( element.name );
			}

			// Always apply ignore filter
			return $( element ).not( this.settings.ignore )[ 0 ];
		},

		checkable: function( element ) {
			return ( /radio|checkbox/i ).test( element.type );
		},

		findByName: function( name ) {
			return $( this.currentForm ).find( "[name='" + this.escapeCssMeta( name ) + "']" );
		},

		getLength: function( value, element ) {
			switch ( element.nodeName.toLowerCase() ) {
			case "select":
				return $( "option:selected", element ).length;
			case "input":
				if ( this.checkable( element ) ) {
					return this.findByName( element.name ).filter( ":checked" ).length;
				}
			}
			return value.length;
		},

		depend: function( param, element ) {
			return this.dependTypes[ typeof param ] ? this.dependTypes[ typeof param ]( param, element ) : true;
		},

		dependTypes: {
			"boolean": function( param ) {
				return param;
			},
			"string": function( param, element ) {
				return !!$( param, element.form ).length;
			},
			"function": function( param, element ) {
				return param( element );
			}
		},

		optional: function( element ) {
			var val = this.elementValue( element );
			return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
		},

		elementAjaxPort: function( element ) {
			return "validate" + element.name;
		},

		startRequest: function( element ) {
			if ( !this.pending[ element.name ] ) {
				this.pendingRequest++;
				$( element ).addClass( this.settings.pendingClass );
				this.pending[ element.name ] = true;
			}
		},

		stopRequest: function( element, valid ) {
			this.pendingRequest--;

			// Sometimes synchronization fails, make sure pendingRequest is never < 0
			if ( this.pendingRequest < 0 ) {
				this.pendingRequest = 0;
			}
			delete this.pending[ element.name ];
			$( element ).removeClass( this.settings.pendingClass );
			if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() && this.pendingRequest === 0 ) {
				$( this.currentForm ).trigger( "submit" );

				// Remove the hidden input that was used as a replacement for the
				// missing submit button. The hidden input is added by `handle()`
				// to ensure that the value of the used submit button is passed on
				// for scripted submits triggered by this method
				if ( this.submitButton ) {
					$( "input:hidden[name='" + this.submitButton.name + "']", this.currentForm ).remove();
				}

				this.formSubmitted = false;
			} else if ( !valid && this.pendingRequest === 0 && this.formSubmitted ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
				this.formSubmitted = false;
			}
		},

		abortRequest: function( element ) {
			var port;

			if ( this.pending[ element.name ] ) {
				port = this.elementAjaxPort( element );
				$.ajaxAbort( port );

				this.pendingRequest--;

				// Sometimes synchronization fails, make sure pendingRequest is never < 0
				if ( this.pendingRequest < 0 ) {
					this.pendingRequest = 0;
				}

				delete this.pending[ element.name ];
				$( element ).removeClass( this.settings.pendingClass );
			}
		},

		previousValue: function( element, method ) {
			method = typeof method === "string" && method || "remote";

			return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, { method: method } )
			} );
		},

		// Cleans up all forms and elements, removes validator-specific events
		destroy: function() {
			this.resetForm();

			$( this.currentForm )
				.off( ".validate" )
				.removeData( "validator" )
				.find( ".validate-equalTo-blur" )
					.off( ".validate-equalTo" )
					.removeClass( "validate-equalTo-blur" )
				.find( ".validate-lessThan-blur" )
					.off( ".validate-lessThan" )
					.removeClass( "validate-lessThan-blur" )
				.find( ".validate-lessThanEqual-blur" )
					.off( ".validate-lessThanEqual" )
					.removeClass( "validate-lessThanEqual-blur" )
				.find( ".validate-greaterThanEqual-blur" )
					.off( ".validate-greaterThanEqual" )
					.removeClass( "validate-greaterThanEqual-blur" )
				.find( ".validate-greaterThan-blur" )
					.off( ".validate-greaterThan" )
					.removeClass( "validate-greaterThan-blur" );
		}

	},

	classRuleSettings: {
		required: { required: true },
		email: { email: true },
		url: { url: true },
		date: { date: true },
		dateISO: { dateISO: true },
		number: { number: true },
		digits: { digits: true },
		creditcard: { creditcard: true }
	},

	addClassRules: function( className, rules ) {
		if ( className.constructor === String ) {
			this.classRuleSettings[ className ] = rules;
		} else {
			$.extend( this.classRuleSettings, className );
		}
	},

	classRules: function( element ) {
		var rules = {},
			classes = $( element ).attr( "class" );

		if ( classes ) {
			$.each( classes.split( " " ), function() {
				if ( this in $.validator.classRuleSettings ) {
					$.extend( rules, $.validator.classRuleSettings[ this ] );
				}
			} );
		}
		return rules;
	},

	normalizeAttributeRule: function( rules, type, method, value ) {

		// Convert the value to a number for number inputs, and for text for backwards compability
		// allows type="date" and others to be compared as strings
		if ( /min|max|step/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
			value = Number( value );

			// Support Opera Mini, which returns NaN for undefined minlength
			if ( isNaN( value ) ) {
				value = undefined;
			}
		}

		if ( value || value === 0 ) {
			rules[ method ] = value;
		} else if ( type === method && type !== "range" ) {

			// Exception: the jquery validate 'range' method
			// does not test for the html5 'range' type
			rules[ type === "date" ? "dateISO" : method ] = true;
		}
	},

	attributeRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {

			// Support for <input required> in both html5 and older browsers
			if ( method === "required" ) {
				value = element.getAttribute( method );

				// Some browsers return an empty string for the required attribute
				// and non-HTML5 browsers might have required="" markup
				if ( value === "" ) {
					value = true;
				}

				// Force non-HTML5 browsers to return bool
				value = !!value;
			} else {
				value = $element.attr( method );
			}

			this.normalizeAttributeRule( rules, type, method, value );
		}

		// 'maxlength' may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
		if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
			delete rules.maxlength;
		}

		return rules;
	},

	dataRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {
			value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );

			// Cast empty attributes like `data-rule-required` to `true`
			if ( value === "" ) {
				value = true;
			}

			this.normalizeAttributeRule( rules, type, method, value );
		}
		return rules;
	},

	staticRules: function( element ) {
		var rules = {},
			validator = $.data( element.form, "validator" );

		if ( validator.settings.rules ) {
			rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
		}
		return rules;
	},

	normalizeRules: function( rules, element ) {

		// Handle dependency check
		$.each( rules, function( prop, val ) {

			// Ignore rule when param is explicitly false, eg. required:false
			if ( val === false ) {
				delete rules[ prop ];
				return;
			}
			if ( val.param || val.depends ) {
				var keepRule = true;
				switch ( typeof val.depends ) {
				case "string":
					keepRule = !!$( val.depends, element.form ).length;
					break;
				case "function":
					keepRule = val.depends.call( element, element );
					break;
				}
				if ( keepRule ) {
					rules[ prop ] = val.param !== undefined ? val.param : true;
				} else {
					$.data( element.form, "validator" ).resetElements( $( element ) );
					delete rules[ prop ];
				}
			}
		} );

		// Evaluate parameters
		$.each( rules, function( rule, parameter ) {
			rules[ rule ] = typeof parameter === "function" && rule !== "normalizer" ? parameter( element ) : parameter;
		} );

		// Clean number parameters
		$.each( [ "minlength", "maxlength" ], function() {
			if ( rules[ this ] ) {
				rules[ this ] = Number( rules[ this ] );
			}
		} );
		$.each( [ "rangelength", "range" ], function() {
			var parts;
			if ( rules[ this ] ) {
				if ( Array.isArray( rules[ this ] ) ) {
					rules[ this ] = [ Number( rules[ this ][ 0 ] ), Number( rules[ this ][ 1 ] ) ];
				} else if ( typeof rules[ this ] === "string" ) {
					parts = rules[ this ].replace( /[\[\]]/g, "" ).split( /[\s,]+/ );
					rules[ this ] = [ Number( parts[ 0 ] ), Number( parts[ 1 ] ) ];
				}
			}
		} );

		if ( $.validator.autoCreateRanges ) {

			// Auto-create ranges
			if ( rules.min != null && rules.max != null ) {
				rules.range = [ rules.min, rules.max ];
				delete rules.min;
				delete rules.max;
			}
			if ( rules.minlength != null && rules.maxlength != null ) {
				rules.rangelength = [ rules.minlength, rules.maxlength ];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function( data ) {
		if ( typeof data === "string" ) {
			var transformed = {};
			$.each( data.split( /\s/ ), function() {
				transformed[ this ] = true;
			} );
			data = transformed;
		}
		return data;
	},

	// https://jqueryvalidation.org/jQuery.validator.addMethod/
	addMethod: function( name, method, message ) {
		$.validator.methods[ name ] = method;
		$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
		if ( method.length < 3 ) {
			$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
		}
	},

	// https://jqueryvalidation.org/jQuery.validator.methods/
	methods: {

		// https://jqueryvalidation.org/required-method/
		required: function( value, element, param ) {

			// Check if dependency is met
			if ( !this.depend( param, element ) ) {
				return "dependency-mismatch";
			}
			if ( element.nodeName.toLowerCase() === "select" ) {

				// Could be an array for select-multiple or a string, both are fine this way
				var val = $( element ).val();
				return val && val.length > 0;
			}
			if ( this.checkable( element ) ) {
				return this.getLength( value, element ) > 0;
			}
			return value !== undefined && value !== null && value.length > 0;
		},

		// https://jqueryvalidation.org/email-method/
		email: function( value, element ) {

			// From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
			// Retrieved 2014-01-14
			// If you have a problem with this implementation, report a bug against the above spec
			// Or use custom methods to implement your own email validation
			return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
		},

		// https://jqueryvalidation.org/url-method/
		url: function( value, element ) {

			// Copyright (c) 2010-2013 Diego Perini, MIT licensed
			// https://gist.github.com/dperini/729294
			// see also https://mathiasbynens.be/demo/url-regex
			// modified to allow protocol-relative URLs
			return this.optional( element ) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})+(?::(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
		},

		// https://jqueryvalidation.org/date-method/
		date: ( function() {
			var called = false;

			return function( value, element ) {
				if ( !called ) {
					called = true;
					if ( this.settings.debug && window.console ) {
						console.warn(
							"The `date` method is deprecated and will be removed in version '2.0.0'.\n" +
							"Please don't use it, since it relies on the Date constructor, which\n" +
							"behaves very differently across browsers and locales. Use `dateISO`\n" +
							"instead or one of the locale specific methods in `localizations/`\n" +
							"and `additional-methods.js`."
						);
					}
				}

				return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
			};
		}() ),

		// https://jqueryvalidation.org/dateISO-method/
		dateISO: function( value, element ) {
			return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
		},

		// https://jqueryvalidation.org/number-method/
		number: function( value, element ) {
			return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
		},

		// https://jqueryvalidation.org/digits-method/
		digits: function( value, element ) {
			return this.optional( element ) || /^\d+$/.test( value );
		},

		// https://jqueryvalidation.org/minlength-method/
		minlength: function( value, element, param ) {
			var length = Array.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length >= param;
		},

		// https://jqueryvalidation.org/maxlength-method/
		maxlength: function( value, element, param ) {
			var length = Array.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length <= param;
		},

		// https://jqueryvalidation.org/rangelength-method/
		rangelength: function( value, element, param ) {
			var length = Array.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
		},

		// https://jqueryvalidation.org/min-method/
		min: function( value, element, param ) {
			return this.optional( element ) || value >= param;
		},

		// https://jqueryvalidation.org/max-method/
		max: function( value, element, param ) {
			return this.optional( element ) || value <= param;
		},

		// https://jqueryvalidation.org/range-method/
		range: function( value, element, param ) {
			return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
		},

		// https://jqueryvalidation.org/step-method/
		step: function( value, element, param ) {
			var type = $( element ).attr( "type" ),
				errorMessage = "Step attribute on input type " + type + " is not supported.",
				supportedTypes = [ "text", "number", "range" ],
				re = new RegExp( "\\b" + type + "\\b" ),
				notSupported = type && !re.test( supportedTypes.join() ),
				decimalPlaces = function( num ) {
					var match = ( "" + num ).match( /(?:\.(\d+))?$/ );
					if ( !match ) {
						return 0;
					}

					// Number of digits right of decimal point.
					return match[ 1 ] ? match[ 1 ].length : 0;
				},
				toInt = function( num ) {
					return Math.round( num * Math.pow( 10, decimals ) );
				},
				valid = true,
				decimals;

			// Works only for text, number and range input types
			// TODO find a way to support input types date, datetime, datetime-local, month, time and week
			if ( notSupported ) {
				throw new Error( errorMessage );
			}

			decimals = decimalPlaces( param );

			// Value can't have too many decimals
			if ( decimalPlaces( value ) > decimals || toInt( value ) % toInt( param ) !== 0 ) {
				valid = false;
			}

			return this.optional( element ) || valid;
		},

		// https://jqueryvalidation.org/equalTo-method/
		equalTo: function( value, element, param ) {

			// Bind to the blur event of the target in order to revalidate whenever the target field is updated
			var target = $( param );
			if ( this.settings.onfocusout && target.not( ".validate-equalTo-blur" ).length ) {
				target.addClass( "validate-equalTo-blur" ).on( "blur.validate-equalTo", function() {
					$( element ).valid();
				} );
			}
			return value === target.val();
		},

		// https://jqueryvalidation.org/remote-method/
		remote: function( value, element, param, method ) {
			if ( this.optional( element ) ) {
				return "dependency-mismatch";
			}

			method = typeof method === "string" && method || "remote";

			var previous = this.previousValue( element, method ),
				validator, data, optionDataString;

			if ( !this.settings.messages[ element.name ] ) {
				this.settings.messages[ element.name ] = {};
			}
			previous.originalMessage = previous.originalMessage || this.settings.messages[ element.name ][ method ];
			this.settings.messages[ element.name ][ method ] = previous.message;

			param = typeof param === "string" && { url: param } || param;
			optionDataString = $.param( $.extend( { data: value }, param.data ) );
			if ( previous.old === optionDataString ) {
				return previous.valid;
			}

			previous.old = optionDataString;
			validator = this;
			this.startRequest( element );
			data = {};
			data[ element.name ] = value;
			$.ajax( $.extend( true, {
				mode: "abort",
				port: this.elementAjaxPort( element ),
				dataType: "json",
				data: data,
				context: validator.currentForm,
				success: function( response ) {
					var valid = response === true || response === "true",
						errors, message, submitted;

					validator.settings.messages[ element.name ][ method ] = previous.originalMessage;
					if ( valid ) {
						submitted = validator.formSubmitted;
						validator.toHide = validator.errorsFor( element );
						validator.formSubmitted = submitted;
						validator.successList.push( element );
						validator.invalid[ element.name ] = false;
						validator.showErrors();
					} else {
						errors = {};
						message = response || validator.defaultMessage( element, { method: method, parameters: value } );
						errors[ element.name ] = previous.message = message;
						validator.invalid[ element.name ] = true;
						validator.showErrors( errors );
					}
					previous.valid = valid;
					validator.stopRequest( element, valid );
				}
			}, param ) );
			return "pending";
		}
	}

} );

// Ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
//        $.ajaxAbort( port );
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

var pendingRequests = {},
	ajax;

// Use a prefilter if available (1.5+)
if ( $.ajaxPrefilter ) {
	$.ajaxPrefilter( function( settings, _, xhr ) {
		var port = settings.port;
		if ( settings.mode === "abort" ) {
			$.ajaxAbort( port );
			pendingRequests[ port ] = xhr;
		}
	} );
} else {

	// Proxy ajax
	ajax = $.ajax;
	$.ajax = function( settings ) {
		var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
			port = ( "port" in settings ? settings : $.ajaxSettings ).port;
		if ( mode === "abort" ) {
			$.ajaxAbort( port );
			pendingRequests[ port ] = ajax.apply( this, arguments );
			return pendingRequests[ port ];
		}
		return ajax.apply( this, arguments );
	};
}

// Abort the previous request without sending a new one
$.ajaxAbort = function( port ) {
	if ( pendingRequests[ port ] ) {
		pendingRequests[ port ].abort();
		delete pendingRequests[ port ];
	}
};
return $;
}));

/***/ }),

/***/ "./node_modules/jquery/dist/jquery.js":
/*!********************************************!*\
  !*** ./node_modules/jquery/dist/jquery.js ***!
  \********************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */
( function( global, factory ) {

	"use strict";

	if (  true && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket trac-14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var version = "3.7.1",

	rhtmlSuffix = /HTML$/i,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},


	// Retrieve the text value of an array of DOM nodes
	text: function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {

			// If no nodeType, this is expected to be an array
			while ( ( node = elem[ i++ ] ) ) {

				// Do not traverse comment nodes
				ret += jQuery.text( node );
			}
		}
		if ( nodeType === 1 || nodeType === 11 ) {
			return elem.textContent;
		}
		if ( nodeType === 9 ) {
			return elem.documentElement.textContent;
		}
		if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}

		// Do not include comment or processing instruction nodes

		return ret;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
						[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	isXMLDoc: function( elem ) {
		var namespace = elem && elem.namespaceURI,
			docElem = elem && ( elem.ownerDocument || elem ).documentElement;

		// Assume HTML when documentElement doesn't yet exist, such as inside
		// document fragments.
		return !rhtmlSuffix.test( namespace || docElem && docElem.nodeName || "HTML" );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}


function nodeName( elem, name ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var pop = arr.pop;


var sort = arr.sort;


var splice = arr.splice;


var whitespace = "[\\x20\\t\\r\\n\\f]";


var rtrimCSS = new RegExp(
	"^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
	"g"
);




// Note: an element does not contain itself
jQuery.contains = function( a, b ) {
	var bup = b && b.parentNode;

	return a === bup || !!( bup && bup.nodeType === 1 && (

		// Support: IE 9 - 11+
		// IE doesn't have `contains` on SVG.
		a.contains ?
			a.contains( bup ) :
			a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
	) );
};




// CSS string/identifier serialization
// https://drafts.csswg.org/cssom/#common-serializing-idioms
var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

function fcssescape( ch, asCodePoint ) {
	if ( asCodePoint ) {

		// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
		if ( ch === "\0" ) {
			return "\uFFFD";
		}

		// Control characters and (dependent upon position) numbers get escaped as code points
		return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
	}

	// Other potentially-special ASCII characters get backslash-escaped
	return "\\" + ch;
}

jQuery.escapeSelector = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};




var preferredDoc = document,
	pushNative = push;

( function() {

var i,
	Expr,
	outermostContext,
	sortInput,
	hasDuplicate,
	push = pushNative,

	// Local document vars
	document,
	documentElement,
	documentIsHTML,
	rbuggyQSA,
	matches,

	// Instance-specific data
	expando = jQuery.expando,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|" +
		"loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: https://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rleadingCombinator = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" +
		whitespace + "*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		ID: new RegExp( "^#(" + identifier + ")" ),
		CLASS: new RegExp( "^\\.(" + identifier + ")" ),
		TAG: new RegExp( "^(" + identifier + "|[*])" ),
		ATTR: new RegExp( "^" + attributes ),
		PSEUDO: new RegExp( "^" + pseudos ),
		CHILD: new RegExp(
			"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
				whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
				whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		bool: new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		needsContext: new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// https://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		if ( nonHex ) {

			// Strip the backslash prefix from a non-hex escape sequence
			return nonHex;
		}

		// Replace a hexadecimal escape sequence with the encoded Unicode code point
		// Support: IE <=11+
		// For values outside the Basic Multilingual Plane (BMP), manually construct a
		// surrogate pair
		return high < 0 ?
			String.fromCharCode( high + 0x10000 ) :
			String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes; see `setDocument`.
	// Support: IE 9 - 11+, Edge 12 - 18+
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE/Edge.
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && nodeName( elem, "fieldset" );
		},
		{ dir: "parentNode", next: "legend" }
	);

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android <=4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = {
		apply: function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		},
		call: function( target ) {
			pushNative.apply( target, slice.call( arguments, 1 ) );
		}
	};
}

function find( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE 9 only
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								push.call( results, elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE 9 only
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							find.contains( context, elem ) &&
							elem.id === m ) {

							push.call( results, elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && context.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( !nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rleadingCombinator.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when
					// strict-comparing two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( newContext != context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = jQuery.escapeSelector( nid );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrimCSS, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties
		// (see https://github.com/jquery/sizzle/issues/157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by jQuery selector module
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		return nodeName( elem, "input" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		return ( nodeName( elem, "input" ) || nodeName( elem, "button" ) ) &&
			elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11+
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					elem.isDisabled !== !disabled &&
						inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a jQuery selector context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [node] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
function setDocument( node ) {
	var subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	documentElement = document.documentElement;
	documentIsHTML = !jQuery.isXMLDoc( document );

	// Support: iOS 7 only, IE 9 - 11+
	// Older browsers didn't support unprefixed `matches`.
	matches = documentElement.matches ||
		documentElement.webkitMatchesSelector ||
		documentElement.msMatchesSelector;

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors
	// (see trac-13936).
	// Limit the fix to IE & Edge Legacy; despite Edge 15+ implementing `matches`,
	// all IE 9+ and Edge Legacy versions implement `msMatchesSelector` as well.
	if ( documentElement.msMatchesSelector &&

		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 9 - 11+, Edge 12 - 18+
		subWindow.addEventListener( "unload", unloadHandler );
	}

	// Support: IE <10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		documentElement.appendChild( el ).id = jQuery.expando;
		return !document.getElementsByName ||
			!document.getElementsByName( jQuery.expando ).length;
	} );

	// Support: IE 9 only
	// Check to see if it's possible to do matchesSelector
	// on a disconnected node.
	support.disconnectedMatch = assert( function( el ) {
		return matches.call( el, "*" );
	} );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// IE/Edge don't support the :scope pseudo-class.
	support.scope = assert( function() {
		return document.querySelectorAll( ":scope" );
	} );

	// Support: Chrome 105 - 111 only, Safari 15.4 - 16.3 only
	// Make sure the `:has()` argument is parsed unforgivingly.
	// We include `*` in the test to detect buggy implementations that are
	// _selectively_ forgiving (specifically when the list includes at least
	// one valid selector).
	// Note that we treat complete lack of support for `:has()` as if it were
	// spec-compliant support, which is fine because use of `:has()` in such
	// environments will fail in the qSA path and fall back to jQuery traversal
	// anyway.
	support.cssHas = assert( function() {
		try {
			document.querySelector( ":has(*,:jqfake)" );
			return false;
		} catch ( e ) {
			return true;
		}
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter.ID = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find.ID = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter.ID =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find.ID = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find.TAG = function( tag, context ) {
		if ( typeof context.getElementsByTagName !== "undefined" ) {
			return context.getElementsByTagName( tag );

		// DocumentFragment nodes don't have gEBTN
		} else {
			return context.querySelectorAll( tag );
		}
	};

	// Class
	Expr.find.CLASS = function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	rbuggyQSA = [];

	// Build QSA regex
	// Regex strategy adopted from Diego Perini
	assert( function( el ) {

		var input;

		documentElement.appendChild( el ).innerHTML =
			"<a id='" + expando + "' href='' disabled='disabled'></a>" +
			"<select id='" + expando + "-\r\\' disabled='disabled'>" +
			"<option selected=''></option></select>";

		// Support: iOS <=7 - 8 only
		// Boolean attributes and "value" are not treated correctly in some XML documents
		if ( !el.querySelectorAll( "[selected]" ).length ) {
			rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
		}

		// Support: iOS <=7 - 8 only
		if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
			rbuggyQSA.push( "~=" );
		}

		// Support: iOS 8 only
		// https://bugs.webkit.org/show_bug.cgi?id=136851
		// In-page `selector#id sibling-combinator selector` fails
		if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
			rbuggyQSA.push( ".#.+[+~]" );
		}

		// Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
		// In some of the document kinds, these selectors wouldn't work natively.
		// This is probably OK but for backwards compatibility we want to maintain
		// handling them through jQuery traversal in jQuery 3.x.
		if ( !el.querySelectorAll( ":checked" ).length ) {
			rbuggyQSA.push( ":checked" );
		}

		// Support: Windows 8 Native Apps
		// The type and name attributes are restricted during .innerHTML assignment
		input = document.createElement( "input" );
		input.setAttribute( "type", "hidden" );
		el.appendChild( input ).setAttribute( "name", "D" );

		// Support: IE 9 - 11+
		// IE's :disabled selector does not pick up the children of disabled fieldsets
		// Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
		// In some of the document kinds, these selectors wouldn't work natively.
		// This is probably OK but for backwards compatibility we want to maintain
		// handling them through jQuery traversal in jQuery 3.x.
		documentElement.appendChild( el ).disabled = true;
		if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
			rbuggyQSA.push( ":enabled", ":disabled" );
		}

		// Support: IE 11+, Edge 15 - 18+
		// IE 11/Edge don't find elements on a `[name='']` query in some cases.
		// Adding a temporary attribute to the document before the selection works
		// around the issue.
		// Interestingly, IE 10 & older don't seem to have the issue.
		input = document.createElement( "input" );
		input.setAttribute( "name", "" );
		el.appendChild( input );
		if ( !el.querySelectorAll( "[name='']" ).length ) {
			rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
				whitespace + "*(?:''|\"\")" );
		}
	} );

	if ( !support.cssHas ) {

		// Support: Chrome 105 - 110+, Safari 15.4 - 16.3+
		// Our regular `try-catch` mechanism fails to detect natively-unsupported
		// pseudo-classes inside `:has()` (such as `:has(:contains("Foo"))`)
		// in browsers that parse the `:has()` argument as a forgiving selector list.
		// https://drafts.csswg.org/selectors/#relational now requires the argument
		// to be parsed unforgivingly, but browsers have not yet fully adjusted.
		rbuggyQSA.push( ":has" );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a === document || a.ownerDocument == preferredDoc &&
				find.contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b === document || b.ownerDocument == preferredDoc &&
				find.contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	};

	return document;
}

find.matches = function( expr, elements ) {
	return find( expr, null, null, elements );
};

find.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyQSA || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return find( expr, document, null, [ elem ] ).length > 0;
};

find.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return jQuery.contains( context, elem );
};


find.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (see trac-13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	if ( val !== undefined ) {
		return val;
	}

	return elem.getAttribute( name );
};

find.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
jQuery.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	//
	// Support: Android <=4.0+
	// Testing for detecting duplicates is unpredictable so instead assume we can't
	// depend on duplicate detection in all browsers without a stable sort.
	hasDuplicate = !support.sortStable;
	sortInput = !support.sortStable && slice.call( results, 0 );
	sort.call( results, sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			splice.call( results, duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

jQuery.fn.uniqueSort = function() {
	return this.pushStack( jQuery.uniqueSort( slice.apply( this ) ) );
};

Expr = jQuery.expr = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		ATTR: function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] || match[ 5 ] || "" )
				.replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		CHILD: function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					find.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" )
				);
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

			// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				find.error( match[ 0 ] );
			}

			return match;
		},

		PSEUDO: function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr.CHILD.test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		TAG: function( nodeNameSelector ) {
			var expectedNodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return nodeName( elem, expectedNodeName );
				};
		},

		CLASS: function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace + ")" + className +
					"(" + whitespace + "|$)" ) ) &&
				classCache( className, function( elem ) {
					return pattern.test(
						typeof elem.className === "string" && elem.className ||
							typeof elem.getAttribute !== "undefined" &&
								elem.getAttribute( "class" ) ||
							""
					);
				} );
		},

		ATTR: function( name, operator, check ) {
			return function( elem ) {
				var result = find.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				if ( operator === "=" ) {
					return result === check;
				}
				if ( operator === "!=" ) {
					return result !== check;
				}
				if ( operator === "^=" ) {
					return check && result.indexOf( check ) === 0;
				}
				if ( operator === "*=" ) {
					return check && result.indexOf( check ) > -1;
				}
				if ( operator === "$=" ) {
					return check && result.slice( -check.length ) === check;
				}
				if ( operator === "~=" ) {
					return ( " " + result.replace( rwhitespace, " " ) + " " )
						.indexOf( check ) > -1;
				}
				if ( operator === "|=" ) {
					return result === check || result.slice( 0, check.length + 1 ) === check + "-";
				}

				return false;
			};
		},

		CHILD: function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										nodeName( node, name ) :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || ( parent[ expando ] = {} );
							cache = outerCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {
								outerCache = elem[ expando ] || ( elem[ expando ] = {} );
								cache = outerCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										nodeName( node, name ) :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );
											outerCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		PSEUDO: function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// https://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					find.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as jQuery does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		not: markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrimCSS, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element
					// (see https://github.com/jquery/sizzle/issues/299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		has: markFunction( function( selector ) {
			return function( elem ) {
				return find( selector, elem ).length > 0;
			};
		} ),

		contains: markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || jQuery.text( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// https://www.w3.org/TR/selectors/#lang-pseudo
		lang: markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				find.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		target: function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		root: function( elem ) {
			return elem === documentElement;
		},

		focus: function( elem ) {
			return elem === safeActiveElement() &&
				document.hasFocus() &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		enabled: createDisabledPseudo( false ),
		disabled: createDisabledPseudo( true ),

		checked: function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			return ( nodeName( elem, "input" ) && !!elem.checked ) ||
				( nodeName( elem, "option" ) && !!elem.selected );
		},

		selected: function( elem ) {

			// Support: IE <=11+
			// Accessing the selectedIndex property
			// forces the browser to treat the default option as
			// selected when in an optgroup.
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		empty: function( elem ) {

			// https://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		parent: function( elem ) {
			return !Expr.pseudos.empty( elem );
		},

		// Element/input types
		header: function( elem ) {
			return rheader.test( elem.nodeName );
		},

		input: function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		button: function( elem ) {
			return nodeName( elem, "input" ) && elem.type === "button" ||
				nodeName( elem, "button" );
		},

		text: function( elem ) {
			var attr;
			return nodeName( elem, "input" ) && elem.type === "text" &&

				// Support: IE <10 only
				// New HTML5 attribute values (e.g., "search") appear
				// with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		first: createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		last: createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		eq: createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		even: createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		odd: createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		lt: createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i;

			if ( argument < 0 ) {
				i = argument + length;
			} else if ( argument > length ) {
				i = length;
			} else {
				i = argument;
			}

			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		gt: createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos.nth = Expr.pseudos.eq;

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rleadingCombinator.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrimCSS, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	if ( parseOnly ) {
		return soFar.length;
	}

	return soFar ?
		find.error( selector ) :

		// Cache the tokens
		tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						if ( skip && nodeName( elem, skip ) ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = outerCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							outerCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		find( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem, matcherOut,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed ||
				multipleContexts( selector || "*",
					context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems;

		if ( matcher ) {

			// If we have a postFinder, or filtered seed, or non-seed postFilter
			// or preexisting results,
			matcherOut = postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

				// ...intermediate processing is necessary
				[] :

				// ...otherwise use results directly
				results;

			// Find primary matches
			matcher( matcherIn, matcherOut, context, xml );
		} else {
			matcherOut = matcherIn;
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf.call( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			var ret = ( !leadingRelative && ( xml || context != outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element
			// (see https://github.com/jquery/sizzle/issues/299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 )
							.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrimCSS, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find.TAG( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: iOS <=7 - 9 only
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching
			// elements by id. (see trac-14142)
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							push.call( results, elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					jQuery.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

function compile( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
}

/**
 * A low-level selection function that works with jQuery's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with jQuery selector compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find.ID(
				token.matches[ 0 ].replace( runescape, funescape ),
				context
			) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr.needsContext.test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) &&
						testContext( context.parentNode ) || context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Support: Android <=4.0 - 4.1+
// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Initialize against the default document
setDocument();

// Support: Android <=4.0 - 4.1+
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

jQuery.find = find;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.unique = jQuery.uniqueSort;

// These have always been private, but they used to be documented as part of
// Sizzle so let's maintain them for now for backwards compatibility purposes.
find.compile = compile;
find.select = select;
find.setDocument = setDocument;
find.tokenize = tokenize;

find.escape = jQuery.escapeSelector;
find.getText = jQuery.text;
find.isXML = jQuery.isXMLDoc;
find.selectors = jQuery.expr;
find.support = jQuery.support;
find.uniqueSort = jQuery.uniqueSort;

	/* eslint-enable */

} )();


var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
	// Strict HTML recognition (trac-11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to jQuery#find
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.error );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the error, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getErrorHook ) {
									process.error = jQuery.Deferred.getErrorHook();

								// The deprecated alias of the above. While the name suggests
								// returning the stack, not an error instance, jQuery just passes
								// it directly to `console.warn` so both will work; an instance
								// just better cooperates with source maps.
								} else if ( jQuery.Deferred.getStackHook ) {
									process.error = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the primary Deferred
			primary = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( primary.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return primary.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

// If `jQuery.Deferred.getErrorHook` is defined, `asyncError` is an error
// captured before the async barrier to get the original error cause
// which may otherwise be hidden.
jQuery.Deferred.exceptionHook = function( error, asyncError ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message,
			error.stack, asyncError );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See trac-6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (trac-9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see trac-8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (trac-14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (trac-11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (trac-14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (trac-13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (trac-15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (trac-12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
				dataPriv.get( this, "events" ) || Object.create( null )
			)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (trac-13208)
				// Don't process clicks on disabled elements (trac-6911, trac-8165, trac-11382, trac-11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (trac-13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
						return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
						return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", true );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, isSetup ) {

	// Missing `isSetup` indicates a trigger call, which must force setup through jQuery.event.add
	if ( !isSetup ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				if ( !saved ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					this[ type ]();
					result = dataPriv.get( this, type );
					dataPriv.set( this, type, false );

					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();

						return result;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering
				// the native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved ) {

				// ...and capture the result
				dataPriv.set( this, type, jQuery.event.trigger(
					saved[ 0 ],
					saved.slice( 1 ),
					this
				) );

				// Abort handling of the native event by all jQuery handlers while allowing
				// native handlers on the same element to run. On target, this is achieved
				// by stopping immediate propagation just on the jQuery event. However,
				// the native event is re-wrapped by a jQuery one on each level of the
				// propagation so the only way to stop it for jQuery is to stop it for
				// everyone via native `stopPropagation()`. This is not a problem for
				// focus/blur which don't bubble, but it does also stop click on checkboxes
				// and radios. We accept this limitation.
				event.stopPropagation();
				event.isImmediatePropagationStopped = returnTrue;
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (trac-504, trac-13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: true
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {

	function focusMappedHandler( nativeEvent ) {
		if ( document.documentMode ) {

			// Support: IE 11+
			// Attach a single focusin/focusout handler on the document while someone wants
			// focus/blur. This is because the former are synchronous in IE while the latter
			// are async. In other browsers, all those handlers are invoked synchronously.

			// `handle` from private data would already wrap the event, but we need
			// to change the `type` here.
			var handle = dataPriv.get( this, "handle" ),
				event = jQuery.event.fix( nativeEvent );
			event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
			event.isSimulated = true;

			// First, handle focusin/focusout
			handle( nativeEvent );

			// ...then, handle focus/blur
			//
			// focus/blur don't bubble while focusin/focusout do; simulate the former by only
			// invoking the handler at the lower level.
			if ( event.target === event.currentTarget ) {

				// The setup part calls `leverageNative`, which, in turn, calls
				// `jQuery.event.add`, so event handle will already have been set
				// by this point.
				handle( event );
			}
		} else {

			// For non-IE browsers, attach a single capturing handler on the document
			// while someone wants focusin/focusout.
			jQuery.event.simulate( delegateType, nativeEvent.target,
				jQuery.event.fix( nativeEvent ) );
		}
	}

	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			var attaches;

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, true );

			if ( document.documentMode ) {

				// Support: IE 9 - 11+
				// We use the same native handler for focusin & focus (and focusout & blur)
				// so we need to coordinate setup & teardown parts between those events.
				// Use `delegateType` as the key as `type` is already used by `leverageNative`.
				attaches = dataPriv.get( this, delegateType );
				if ( !attaches ) {
					this.addEventListener( delegateType, focusMappedHandler );
				}
				dataPriv.set( this, delegateType, ( attaches || 0 ) + 1 );
			} else {

				// Return false to allow normal processing in the caller
				return false;
			}
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		teardown: function() {
			var attaches;

			if ( document.documentMode ) {
				attaches = dataPriv.get( this, delegateType ) - 1;
				if ( !attaches ) {
					this.removeEventListener( delegateType, focusMappedHandler );
					dataPriv.remove( this, delegateType );
				} else {
					dataPriv.set( this, delegateType, attaches );
				}
			} else {

				// Return false to indicate standard teardown should be applied
				return false;
			}
		},

		// Suppress native focus or blur if we're currently inside
		// a leveraged native-event stack
		_default: function( event ) {
			return dataPriv.get( event.target, type );
		},

		delegateType: delegateType
	};

	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	//
	// Support: IE 9 - 11+
	// To preserve relative focusin/focus & focusout/blur event order guaranteed on the 3.x branch,
	// attach a single handler for both events in IE.
	jQuery.event.special[ delegateType ] = {
		setup: function() {

			// Handle: regular nodes (via `this.ownerDocument`), window
			// (via `this.document`) & document (via `this`).
			var doc = this.ownerDocument || this.document || this,
				dataHolder = document.documentMode ? this : doc,
				attaches = dataPriv.get( dataHolder, delegateType );

			// Support: IE 9 - 11+
			// We use the same native handler for focusin & focus (and focusout & blur)
			// so we need to coordinate setup & teardown parts between those events.
			// Use `delegateType` as the key as `type` is already used by `leverageNative`.
			if ( !attaches ) {
				if ( document.documentMode ) {
					this.addEventListener( delegateType, focusMappedHandler );
				} else {
					doc.addEventListener( type, focusMappedHandler, true );
				}
			}
			dataPriv.set( dataHolder, delegateType, ( attaches || 0 ) + 1 );
		},
		teardown: function() {
			var doc = this.ownerDocument || this.document || this,
				dataHolder = document.documentMode ? this : doc,
				attaches = dataPriv.get( dataHolder, delegateType ) - 1;

			if ( !attaches ) {
				if ( document.documentMode ) {
					this.removeEventListener( delegateType, focusMappedHandler );
				} else {
					doc.removeEventListener( type, focusMappedHandler, true );
				}
				dataPriv.remove( dataHolder, delegateType );
			} else {
				dataPriv.set( dataHolder, delegateType, attaches );
			}
		}
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,

	rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (trac-8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Re-enable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {

							// Unwrap a CDATA section containing script contents. This shouldn't be
							// needed as in XML documents they're already not visible when
							// inspecting element contents and in HTML documents they have no
							// meaning but we're preserving that logic for backwards compatibility.
							// This will be removed completely in 4.0. See gh-4904.
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew jQuery#find here for performance reasons:
			// https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var rcustomProp = /^--/;


var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (trac-15098, trac-14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (trac-8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		//
		// Support: Firefox 70+
		// Only Firefox includes border widths
		// in computed dimensions. (gh-4529)
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
				tr.style.cssText = "box-sizing:content-box;border:1px solid";

				// Support: Chrome 86+
				// Height set through cssText does not get applied.
				// Computed height then comes back as 0.
				tr.style.height = "1px";
				trChild.style.height = "9px";

				// Support: Android 8 Chrome 86+
				// In our bodyBackground.html iframe,
				// display for all div elements is set to "inline",
				// which causes a problem only in Android 8 Chrome 86.
				// Ensuring the div is `display: block`
				// gets around this issue.
				trChild.style.display = "block";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		isCustomProp = rcustomProp.test( name ),

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, trac-12537)
	//   .css('--customProperty) (gh-3144)
	if ( computed ) {

		// Support: IE <=9 - 11+
		// IE only supports `"float"` in `getPropertyValue`; in computed styles
		// it's only available as `"cssFloat"`. We no longer modify properties
		// sent to `.css()` apart from camelCasing, so we need to check both.
		// Normally, this would create difference in behavior: if
		// `getPropertyValue` returns an empty string, the value returned
		// by `.css()` would be `undefined`. This is usually the case for
		// disconnected elements. However, in IE even disconnected elements
		// with no styles return `"none"` for `getPropertyValue( "float" )`
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( isCustomProp && ret ) {

			// Support: Firefox 105+, Chrome <=105+
			// Spec requires trimming whitespace for custom properties (gh-4926).
			// Firefox only trims leading whitespace. Chrome just collapses
			// both leading & trailing whitespace to a single space.
			//
			// Fall back to `undefined` if empty string returned.
			// This collapses a missing definition with property defined
			// and set to an empty string but there's no standard API
			// allowing us to differentiate them without a performance penalty
			// and returning `undefined` aligns with older jQuery.
			//
			// rtrimCSS treats U+000D CARRIAGE RETURN and U+000C FORM FEED
			// as whitespace while CSS does not, but this is not a problem
			// because CSS preprocessing replaces them with U+000A LINE FEED
			// (which *is* CSS whitespace)
			// https://www.w3.org/TR/css-syntax-3/#input-preprocessing
			ret = ret.replace( rtrimCSS, "$1" ) || undefined;
		}

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0,
		marginDelta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		// Count margin delta separately to only add it after scroll gutter adjustment.
		// This is needed to make negative margins work with `outerHeight( true )` (gh-3982).
		if ( box === "margin" ) {
			marginDelta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta + marginDelta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		animationIterationCount: true,
		aspectRatio: true,
		borderImageSlice: true,
		columnCount: true,
		flexGrow: true,
		flexShrink: true,
		fontWeight: true,
		gridArea: true,
		gridColumn: true,
		gridColumnEnd: true,
		gridColumnStart: true,
		gridRow: true,
		gridRowEnd: true,
		gridRowStart: true,
		lineHeight: true,
		opacity: true,
		order: true,
		orphans: true,
		scale: true,
		widows: true,
		zIndex: true,
		zoom: true,

		// SVG-related
		fillOpacity: true,
		floodOpacity: true,
		stopOpacity: true,
		strokeMiterlimit: true,
		strokeOpacity: true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (trac-7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug trac-9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (trac-7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

				/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (trac-12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
					animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};

		doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// Use proper attribute retrieval (trac-12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classNames, cur, curValue, className, i, finalValue;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classNames = classesToArray( value );

		if ( classNames.length ) {
			return this.each( function() {
				curValue = getClass( this );
				cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					for ( i = 0; i < classNames.length; i++ ) {
						className = classNames[ i ];
						if ( cur.indexOf( " " + className + " " ) < 0 ) {
							cur += className + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						this.setAttribute( "class", finalValue );
					}
				}
			} );
		}

		return this;
	},

	removeClass: function( value ) {
		var classNames, cur, curValue, className, i, finalValue;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classNames = classesToArray( value );

		if ( classNames.length ) {
			return this.each( function() {
				curValue = getClass( this );

				// This expression is here for better compressibility (see addClass)
				cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					for ( i = 0; i < classNames.length; i++ ) {
						className = classNames[ i ];

						// Remove *all* instances
						while ( cur.indexOf( " " + className + " " ) > -1 ) {
							cur = cur.replace( " " + className + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						this.setAttribute( "class", finalValue );
					}
				}
			} );
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var classNames, className, i, self,
			type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		classNames = classesToArray( value );

		return this.each( function() {
			if ( isValidValue ) {

				// Toggle individual class names
				self = jQuery( this );

				for ( i = 0; i < classNames.length; i++ ) {
					className = classNames[ i ];

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (trac-14686, trac-14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (trac-2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, parserErrorElem;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "Invalid XML: " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent;
				} ).join( "\n" ) :
				data
		) );
	}
	return xml;
};


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (trac-9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (trac-9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (trac-6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} ).filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// trac-7653, trac-8125, trac-8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (trac-10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes trac-9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (trac-10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket trac-12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (trac-15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// trac-9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script but not if jsonp
			if ( !isSuccess &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (trac-11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// trac-1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see trac-8605, trac-14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// trac-14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this
			.on( "mouseenter", fnOver )
			.on( "mouseleave", fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
// Require that the "whitespace run" starts from a non-whitespace
// to avoid O(N^2) behavior when the engine would try matching "\s+$" at each space position.
var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "$1" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
		return jQuery;
	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (trac-7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (trac-13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),

/***/ "./resources/css/admin-login.css":
/*!***************************************!*\
  !*** ./resources/css/admin-login.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/css/admin-main.css":
/*!**************************************!*\
  !*** ./resources/css/admin-main.css ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/sticky-js/dist/sticky.compile.js":
/*!*******************************************************!*\
  !*** ./node_modules/sticky-js/dist/sticky.compile.js ***!
  \*******************************************************/
/***/ (function(module) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Sticky.js
 * Library for sticky elements written in vanilla javascript. With this library you can easily set sticky elements on your website. It's also responsive.
 *
 * @version 1.3.0
 * @author Rafal Galus <biuro@rafalgalus.pl>
 * @website https://rgalus.github.io/sticky-js/
 * @repo https://github.com/rgalus/sticky-js
 * @license https://github.com/rgalus/sticky-js/blob/master/LICENSE
 */
var Sticky = /*#__PURE__*/function () {
  /**
   * Sticky instance constructor
   * @constructor
   * @param {string} selector - Selector which we can find elements
   * @param {string} options - Global options for sticky elements (could be overwritten by data-{option}="" attributes)
   */
  function Sticky() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Sticky);

    this.selector = selector;
    this.elements = [];
    this.version = '1.3.0';
    this.vp = this.getViewportSize();
    this.body = document.querySelector('body');
    this.options = {
      wrap: options.wrap || false,
      wrapWith: options.wrapWith || '<span></span>',
      marginTop: options.marginTop || 0,
      marginBottom: options.marginBottom || 0,
      stickyFor: options.stickyFor || 0,
      stickyClass: options.stickyClass || null,
      stickyContainer: options.stickyContainer || 'body'
    };
    this.updateScrollTopPosition = this.updateScrollTopPosition.bind(this);
    this.updateScrollTopPosition();
    window.addEventListener('load', this.updateScrollTopPosition);
    window.addEventListener('scroll', this.updateScrollTopPosition);
    this.run();
  }
  /**
   * Function that waits for page to be fully loaded and then renders & activates every sticky element found with specified selector
   * @function
   */


  _createClass(Sticky, [{
    key: "run",
    value: function run() {
      var _this = this;

      // wait for page to be fully loaded
      var pageLoaded = setInterval(function () {
        if (document.readyState === 'complete') {
          clearInterval(pageLoaded);
          var elements = document.querySelectorAll(_this.selector);

          _this.forEach(elements, function (element) {
            return _this.renderElement(element);
          });
        }
      }, 10);
    }
    /**
     * Function that assign needed variables for sticky element, that are used in future for calculations and other
     * @function
     * @param {node} element - Element to be rendered
     */

  }, {
    key: "renderElement",
    value: function renderElement(element) {
      var _this2 = this;

      // create container for variables needed in future
      element.sticky = {}; // set default variables

      element.sticky.active = false;
      element.sticky.marginTop = parseInt(element.getAttribute('data-margin-top')) || this.options.marginTop;
      element.sticky.marginBottom = parseInt(element.getAttribute('data-margin-bottom')) || this.options.marginBottom;
      element.sticky.stickyFor = parseInt(element.getAttribute('data-sticky-for')) || this.options.stickyFor;
      element.sticky.stickyClass = element.getAttribute('data-sticky-class') || this.options.stickyClass;
      element.sticky.wrap = element.hasAttribute('data-sticky-wrap') ? true : this.options.wrap; // @todo attribute for stickyContainer
      // element.sticky.stickyContainer = element.getAttribute('data-sticky-container') || this.options.stickyContainer;

      element.sticky.stickyContainer = this.options.stickyContainer;
      element.sticky.container = this.getStickyContainer(element);
      element.sticky.container.rect = this.getRectangle(element.sticky.container);
      element.sticky.rect = this.getRectangle(element); // fix when element is image that has not yet loaded and width, height = 0

      if (element.tagName.toLowerCase() === 'img') {
        element.onload = function () {
          return element.sticky.rect = _this2.getRectangle(element);
        };
      }

      if (element.sticky.wrap) {
        this.wrapElement(element);
      } // activate rendered element


      this.activate(element);
    }
    /**
     * Wraps element into placeholder element
     * @function
     * @param {node} element - Element to be wrapped
     */

  }, {
    key: "wrapElement",
    value: function wrapElement(element) {
      element.insertAdjacentHTML('beforebegin', element.getAttribute('data-sticky-wrapWith') || this.options.wrapWith);
      element.previousSibling.appendChild(element);
    }
    /**
     * Function that activates element when specified conditions are met and then initalise events
     * @function
     * @param {node} element - Element to be activated
     */

  }, {
    key: "activate",
    value: function activate(element) {
      if (element.sticky.rect.top + element.sticky.rect.height < element.sticky.container.rect.top + element.sticky.container.rect.height && element.sticky.stickyFor < this.vp.width && !element.sticky.active) {
        element.sticky.active = true;
      }

      if (this.elements.indexOf(element) < 0) {
        this.elements.push(element);
      }

      if (!element.sticky.resizeEvent) {
        this.initResizeEvents(element);
        element.sticky.resizeEvent = true;
      }

      if (!element.sticky.scrollEvent) {
        this.initScrollEvents(element);
        element.sticky.scrollEvent = true;
      }

      this.setPosition(element);
    }
    /**
     * Function which is adding onResizeEvents to window listener and assigns function to element as resizeListener
     * @function
     * @param {node} element - Element for which resize events are initialised
     */

  }, {
    key: "initResizeEvents",
    value: function initResizeEvents(element) {
      var _this3 = this;

      element.sticky.resizeListener = function () {
        return _this3.onResizeEvents(element);
      };

      window.addEventListener('resize', element.sticky.resizeListener);
    }
    /**
     * Removes element listener from resize event
     * @function
     * @param {node} element - Element from which listener is deleted
     */

  }, {
    key: "destroyResizeEvents",
    value: function destroyResizeEvents(element) {
      window.removeEventListener('resize', element.sticky.resizeListener);
    }
    /**
     * Function which is fired when user resize window. It checks if element should be activated or deactivated and then run setPosition function
     * @function
     * @param {node} element - Element for which event function is fired
     */

  }, {
    key: "onResizeEvents",
    value: function onResizeEvents(element) {
      this.vp = this.getViewportSize();
      element.sticky.rect = this.getRectangle(element);
      element.sticky.container.rect = this.getRectangle(element.sticky.container);

      if (element.sticky.rect.top + element.sticky.rect.height < element.sticky.container.rect.top + element.sticky.container.rect.height && element.sticky.stickyFor < this.vp.width && !element.sticky.active) {
        element.sticky.active = true;
      } else if (element.sticky.rect.top + element.sticky.rect.height >= element.sticky.container.rect.top + element.sticky.container.rect.height || element.sticky.stickyFor >= this.vp.width && element.sticky.active) {
        element.sticky.active = false;
      }

      this.setPosition(element);
    }
    /**
     * Function which is adding onScrollEvents to window listener and assigns function to element as scrollListener
     * @function
     * @param {node} element - Element for which scroll events are initialised
     */

  }, {
    key: "initScrollEvents",
    value: function initScrollEvents(element) {
      var _this4 = this;

      element.sticky.scrollListener = function () {
        return _this4.onScrollEvents(element);
      };

      window.addEventListener('scroll', element.sticky.scrollListener);
    }
    /**
     * Removes element listener from scroll event
     * @function
     * @param {node} element - Element from which listener is deleted
     */

  }, {
    key: "destroyScrollEvents",
    value: function destroyScrollEvents(element) {
      window.removeEventListener('scroll', element.sticky.scrollListener);
    }
    /**
     * Function which is fired when user scroll window. If element is active, function is invoking setPosition function
     * @function
     * @param {node} element - Element for which event function is fired
     */

  }, {
    key: "onScrollEvents",
    value: function onScrollEvents(element) {
      if (element.sticky && element.sticky.active) {
        this.setPosition(element);
      }
    }
    /**
     * Main function for the library. Here are some condition calculations and css appending for sticky element when user scroll window
     * @function
     * @param {node} element - Element that will be positioned if it's active
     */

  }, {
    key: "setPosition",
    value: function setPosition(element) {
      this.css(element, {
        position: '',
        width: '',
        top: '',
        left: ''
      });

      if (this.vp.height < element.sticky.rect.height || !element.sticky.active) {
        return;
      }

      if (!element.sticky.rect.width) {
        element.sticky.rect = this.getRectangle(element);
      }

      if (element.sticky.wrap) {
        this.css(element.parentNode, {
          display: 'block',
          width: element.sticky.rect.width + 'px',
          height: element.sticky.rect.height + 'px'
        });
      }

      if (element.sticky.rect.top === 0 && element.sticky.container === this.body) {
        this.css(element, {
          position: 'fixed',
          top: element.sticky.rect.top + 'px',
          left: element.sticky.rect.left + 'px',
          width: element.sticky.rect.width + 'px'
        });

        if (element.sticky.stickyClass) {
          element.classList.add(element.sticky.stickyClass);
        }
      } else if (this.scrollTop > element.sticky.rect.top - element.sticky.marginTop) {
        this.css(element, {
          position: 'fixed',
          width: element.sticky.rect.width + 'px',
          left: element.sticky.rect.left + 'px'
        });

        if (this.scrollTop + element.sticky.rect.height + element.sticky.marginTop > element.sticky.container.rect.top + element.sticky.container.offsetHeight - element.sticky.marginBottom) {
          if (element.sticky.stickyClass) {
            element.classList.remove(element.sticky.stickyClass);
          }

          this.css(element, {
            top: element.sticky.container.rect.top + element.sticky.container.offsetHeight - (this.scrollTop + element.sticky.rect.height + element.sticky.marginBottom) + 'px'
          });
        } else {
          if (element.sticky.stickyClass) {
            element.classList.add(element.sticky.stickyClass);
          }

          this.css(element, {
            top: element.sticky.marginTop + 'px'
          });
        }
      } else {
        if (element.sticky.stickyClass) {
          element.classList.remove(element.sticky.stickyClass);
        }

        this.css(element, {
          position: '',
          width: '',
          top: '',
          left: ''
        });

        if (element.sticky.wrap) {
          this.css(element.parentNode, {
            display: '',
            width: '',
            height: ''
          });
        }
      }
    }
    /**
     * Function that updates element sticky rectangle (with sticky container), then activate or deactivate element, then update position if it's active
     * @function
     */

  }, {
    key: "update",
    value: function update() {
      var _this5 = this;

      this.forEach(this.elements, function (element) {
        element.sticky.rect = _this5.getRectangle(element);
        element.sticky.container.rect = _this5.getRectangle(element.sticky.container);

        _this5.activate(element);

        _this5.setPosition(element);
      });
    }
    /**
     * Destroys sticky element, remove listeners
     * @function
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this6 = this;

      window.removeEventListener('load', this.updateScrollTopPosition);
      window.removeEventListener('scroll', this.updateScrollTopPosition);
      this.forEach(this.elements, function (element) {
        _this6.destroyResizeEvents(element);

        _this6.destroyScrollEvents(element);

        delete element.sticky;
      });
    }
    /**
     * Function that returns container element in which sticky element is stuck (if is not specified, then it's stuck to body)
     * @function
     * @param {node} element - Element which sticky container are looked for
     * @return {node} element - Sticky container
     */

  }, {
    key: "getStickyContainer",
    value: function getStickyContainer(element) {
      var container = element.parentNode;

      while (!container.hasAttribute('data-sticky-container') && !container.parentNode.querySelector(element.sticky.stickyContainer) && container !== this.body) {
        container = container.parentNode;
      }

      return container;
    }
    /**
     * Function that returns element rectangle & position (width, height, top, left)
     * @function
     * @param {node} element - Element which position & rectangle are returned
     * @return {object}
     */

  }, {
    key: "getRectangle",
    value: function getRectangle(element) {
      this.css(element, {
        position: '',
        width: '',
        top: '',
        left: ''
      });
      var width = Math.max(element.offsetWidth, element.clientWidth, element.scrollWidth);
      var height = Math.max(element.offsetHeight, element.clientHeight, element.scrollHeight);
      var top = 0;
      var left = 0;

      do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
      } while (element);

      return {
        top: top,
        left: left,
        width: width,
        height: height
      };
    }
    /**
     * Function that returns viewport dimensions
     * @function
     * @return {object}
     */

  }, {
    key: "getViewportSize",
    value: function getViewportSize() {
      return {
        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      };
    }
    /**
     * Function that updates window scroll position
     * @function
     * @return {number}
     */

  }, {
    key: "updateScrollTopPosition",
    value: function updateScrollTopPosition() {
      this.scrollTop = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0) || 0;
    }
    /**
     * Helper function for loops
     * @helper
     * @param {array}
     * @param {function} callback - Callback function (no need for explanation)
     */

  }, {
    key: "forEach",
    value: function forEach(array, callback) {
      for (var i = 0, len = array.length; i < len; i++) {
        callback(array[i]);
      }
    }
    /**
     * Helper function to add/remove css properties for specified element.
     * @helper
     * @param {node} element - DOM element
     * @param {object} properties - CSS properties that will be added/removed from specified element
     */

  }, {
    key: "css",
    value: function css(element, properties) {
      for (var property in properties) {
        if (properties.hasOwnProperty(property)) {
          element.style[property] = properties[property];
        }
      }
    }
  }]);

  return Sticky;
}();
/**
 * Export function that supports AMD, CommonJS and Plain Browser.
 */


(function (root, factory) {
  if (true) {
    module.exports = factory;
  } else {}
})(this, Sticky);

/***/ }),

/***/ "./node_modules/sticky-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/sticky-js/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var Sticky = __webpack_require__(/*! ./dist/sticky.compile.js */ "./node_modules/sticky-js/dist/sticky.compile.js");

module.exports = Sticky;


/***/ }),

/***/ "./node_modules/js-cookie/dist/js.cookie.mjs":
/*!***************************************************!*\
  !*** ./node_modules/js-cookie/dist/js.cookie.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ api)
/* harmony export */ });
/*! js-cookie v3.0.5 | MIT */
/* eslint-disable no-var */
function assign (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target
}
/* eslint-enable no-var */

/* eslint-disable no-var */
var defaultConverter = {
  read: function (value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
  },
  write: function (value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    )
  }
};
/* eslint-enable no-var */

/* eslint-disable no-var */

function init (converter, defaultAttributes) {
  function set (name, value, attributes) {
    if (typeof document === 'undefined') {
      return
    }

    attributes = assign({}, defaultAttributes, attributes);

    if (typeof attributes.expires === 'number') {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }

    name = encodeURIComponent(name)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape);

    var stringifiedAttributes = '';
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue
      }

      stringifiedAttributes += '; ' + attributeName;

      if (attributes[attributeName] === true) {
        continue
      }

      // Considers RFC 6265 section 5.2:
      // ...
      // 3.  If the remaining unparsed-attributes contains a %x3B (";")
      //     character:
      // Consume the characters of the unparsed-attributes up to,
      // not including, the first %x3B (";") character.
      // ...
      stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
    }

    return (document.cookie =
      name + '=' + converter.write(value, name) + stringifiedAttributes)
  }

  function get (name) {
    if (typeof document === 'undefined' || (arguments.length && !name)) {
      return
    }

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all.
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split('=');
      var value = parts.slice(1).join('=');

      try {
        var found = decodeURIComponent(parts[0]);
        jar[found] = converter.read(value, found);

        if (name === found) {
          break
        }
      } catch (e) {}
    }

    return name ? jar[name] : jar
  }

  return Object.create(
    {
      set,
      get,
      remove: function (name, attributes) {
        set(
          name,
          '',
          assign({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function (attributes) {
        return init(this.converter, assign({}, this.attributes, attributes))
      },
      withConverter: function (converter) {
        return init(assign({}, this.converter, converter), this.attributes)
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  )
}

var api = init(defaultConverter, { path: '/' });
/* eslint-enable no-var */




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/admin-login": 0,
/******/ 			"css/admin-main": 0,
/******/ 			"css/admin-login": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/admin-main","css/admin-login"], () => (__webpack_require__("./resources/js/admin-login.js")))
/******/ 	__webpack_require__.O(undefined, ["css/admin-main","css/admin-login"], () => (__webpack_require__("./resources/css/admin-login.css")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/admin-main","css/admin-login"], () => (__webpack_require__("./resources/css/admin-main.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;