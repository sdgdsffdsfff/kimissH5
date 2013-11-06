define(function(){
    var _m = Backbone.Model.extend({
        initialize:function(id){},
        uid:null,
        url:'http://9night.kimiss.com/api.php?mod=wapuinfo',
        sync: function(method, model, options) {
            // Default JSON-request options.
            return $.ajax({
                type : "POST",
                async : false,
                url : model.url,
                data : {'profilesubmitbtn': 0,'uid':options.ud},
                cache : false, //默认值true
                dataType : "jsonp",
                jsonp: "callbackfun",
                jsonpCallback:"jsonpCallback",
                success : options.success
            });
        },
        load:function(cb){
            var pro = this;
            this.fetch({
                data:{
                    ud:$.cookie("uid")
                },
                success:function(req){
                    var data = req.attributes[0];
                    if(data.err=="0"){
                        cb(data.data);
                    }
                    else{
                        alert(data.ret_msg);
                    }
                },
                error:function(req){}
            });
        }
    });

    return _m;
});