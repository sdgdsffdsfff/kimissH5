define(['models/BrandModel'],function(BrandModel){
    var _brandList = Backbone.Collection.extend({
        url:'http://m.kimiss.com/files/product_index.php?c=iapp&rd=20',
        model:BrandModel,
        initialize:function(){
//            this.bind('add',this.onItemAdd,this);
        },
        sync: function(method, model, options) {
            // Default JSON-request options.
            return $.ajax({
                type : "POST",
                async : false,
                url : model.url,
                data : options.data,
                cache : false, //default true
                dataType : "jsonp",
                jsonp: "callbackfun",
                jsonpCallback:"jsonpCallback",
                success : options.success
            });
        },
        onItemAdd:function(model){
            Kimiss.Body.getModule('Brand').addItem(model);
        },
        indexes:[],
        parse:function(data){
            data = data.de.by;
            var re = [], t,p;
            for(var i in data){
                this.indexes.push(i);
                t = data[i];
                t.each(function(a,i){
                    p = a.split(':');
                    t[i] = {
                        id: p[0],
                        name: p[1]
                    };
                });
                re.push({
                    index:i,
                    arr:t
                });
            }
            return re;
        }
    });
    return _brandList;
});