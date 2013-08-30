define(['models/CommentModel'],function(CommentModel){
    var _c = Backbone.Collection.extend({
        url:'http://m.kimiss.com/files/product_index.php?c=iapp&rd=40',
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
        model:CommentModel,
        parse:function(data){
            data = data.de.cy;
            console.log(data);
            $.each(data,function(i,a){
                var date = new Date(parseInt(a.ce)*1000);
                a.ce1 = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
            });
            return data;
        }
    });

    return _c;
});