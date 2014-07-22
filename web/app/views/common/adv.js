define(function(){
    var _adv = Backbone.View.extend({
        initialize:function(){
            var expdate = new Date;
            expdate.setDate(expdate.getDate() + 1);
            expdate.setHours(0);
            expdate.setMinutes(0);
            expdate.setSeconds(0);
        },
        cookie:function (key, value, options) {
            // key and at least value given, set cookie...
            if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
                options = $.extend({}, options);
                if (value === null || value === undefined) {
                    options.expires = -1;
                }
                if (typeof options.expires === 'number') {
                    var days = options.expires, t = options.expires = new Date();
                    t.setDate(t.getDate() + days);
                }
                value = String(value);
                return (document.cookie = [
                    encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                    options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                    options.path ? '; path=' + options.path : '',
                    options.domain ? '; domain=' + options.domain : '',
                    options.secure ? '; secure' : ''
                ].join(''));
            }
            // key and possibly options given, get cookie...
            options = value || {};
            var decode = options.raw ? function (s) {
                return s;
            } : decodeURIComponent;
            var pairs = document.cookie.split('; ');
            for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
                if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
            }
            return null;
        },
        hasChild:function(p) {
            var childs = document.querySelector(p).childNodes;
            for (var i = 0, len = childs.length; i < len; i++) {
                if (childs[i].nodeType == 1)
                    return true;
            }
            return false;
        },
        addCloseBtn:function(p, closeClass, closeHandle, callback) {
            console.log(p)
            var me = this;
            if (me.hasChild(p)) {
                var close = document.createElement("a");
                close.setAttribute("href", "javascript:;");
                close.className = closeClass;
                close.addEventListener("click", function () {
                    $(p).hide();
                    if (typeof closeHandle == "function") {
                        closeHandle();
                    }
                });
                document.querySelector(p).appendChild(close);
                if (typeof callback == "function") {
                    callback();
                }
            }
        }
    });
    return _adv;
});