define(['models/ProductsModel'],function(ProductsModel){
    var _l = Backbone.Collection.extend({
        model:ProductsModel,
        url:'http://product.kimiss.com/index.php?c=iapp&rd=30',
        urlNormal:'http://product.kimiss.com/index.php?c=iapp&rd=30',
        urlSearch:'http://so.kimiss.com/index.php?c=iapp&rd=32&jp=1',//pswy = [keywords] callbackfun=jsonpCallback
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
            data = data.de.py;
            return data;
        },
        setSoUrl:function(){
            this.url = this.urlSearch;
//            this.set('url',this.urlSearch);
        }
    });

    return _l;
});