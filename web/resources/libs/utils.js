Object.defineProperty(Array.prototype, "contains", {
    writable: false,
    enumerable: false,
    value: function (o) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == o) {
                return true;
            }
        }
        return false;
    }
});
Object.defineProperty(Array.prototype, "each", {
    writable: false,
    enumerable: false,
    value: function (fn) {
        for(var i= 0,ln=this.length;i<ln;i++){
            fn.apply(this,[this[i],i,ln]);
        }
    }
});

Object.defineProperty(Array.prototype, "addAll", {
    writable: false,
    enumerable: false,
    value: function (arr) {
        for (var i = 0; i < arr.length; i++) {
            this.push(arr[i]);
        }
        return this;
    }

});
Object.defineProperty(Array.prototype, "truncate", {
    writable: false,
    enumerable: false,
    value:function (num) {
        var re = [];
        if (num > this.length) num = this.length;
        for (var i = 0; i < num; i++) {
            re.push(this[i]);
        }
        return re;
    }

});

Object.defineProperty(String.prototype, "replaceAll", {
    writable: false,
    enumerable: false,
    value:function (s1, s2) {
        return this.replace(new RegExp(s1, "gm"), s2);
    }
});
Object.defineProperty(String.prototype, "trim", {
    writable: false,
    enumerable: false,
    value:function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
});
Object.defineProperty(String.prototype, "startsWith", {
    writable: false,
    enumerable: false,
    value:function (str) {
        var reg = new RegExp("^" + str);
        return reg.test(this);
    }
});
Object.defineProperty(String.prototype, "endsWith", {
    writable: false,
    enumerable: false,
    value:function (str) {
        var reg = new RegExp(str + "$");
        return reg.test(this);
    }
});
var _CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
Math.UUID = function () {
    var uuid = new Array(36), rnd=0, r;
    for (var i = 0; i < 36; i++) {
        if (i==8 || i==13 ||  i==18 || i==23) {
            uuid[i] = '-';
        } else if (i==14) {
            uuid[i] = '4';
        } else {
            if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
            r = rnd & 0xf;
            rnd = rnd >> 4;
            uuid[i] = _CHARS[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
    }
    return uuid.join('');
};
isNumber = function (o) {
    return Object.prototype.toString.call(o) === '[object Number]';
};
isArray = function (o) {
    return Object.prototype.toString.call(o) === '[object Array]';
};
isString = function (o) {
    return Object.prototype.toString.call(o) === '[object String]';
};
isObject = function (o) {
    return Object.prototype.toString.call(o) === '[object Object]';
};
isFunction = function (o) {
    return Object.prototype.toString.call(o) === '[object Function]';
};
isBoolean = function (o) {
    return Object.prototype.toString.call(o) === '[object Boolean]';
};
if(!window.console){
    window.console = {
        log:function(){}
    };
}