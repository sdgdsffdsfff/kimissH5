define(function(){
    var _m = Backbone.Model.extend({
        url:'http://m.kimiss.com/files/product_index.php?c=iapp&rd=31',
        sync: function(method, model, options) {
            // Default JSON-request options.
            return $.ajax({
                type : "POST",
                async : false,
                url : model.url,
                data : options.data,
                cache : false, //默认值true
                dataType : "jsonp",
                jsonp: "callbackfun",
                jsonpCallback:"jsonpCallback",
                success : options.success
            });
        },
        parse:function(data){
            data = data.de;
            data.iy.push(data.iy[0]);
            return data;
        }
    });

    return _m;
});