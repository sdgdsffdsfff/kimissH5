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
//            data.iy.push(data.iy[0]);
            console.log(data);
            data.pt = Math.round(data.pt);
            var date = new Date(parseInt(data.pk)*1000);
            data.pk = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
            var attr = '';
            $.each(data.pfy,function(i,a){
                attr+= a.split(':')[1]+' ';
            });
            data.attr = attr;
            return data;
        }
    });

    return _m;
});