define(function(){
    var _m = Backbone.Model.extend({
        initialize:function(){
        },
        uid:null,
        commentList:null,
        sync:function(method,model,options){
            var me = this;
            return $.ajax({
                type:"GET",
                async:false,
                url:"http://product.kimiss.com/index.php?c=Iapp&rd=40",
                data:{ud:me.uid},
                cache:false,
                dataType:"jsonp",
                jsonp: "callbackfun",
                jsonpCallback:"jsonpCallback",
                success:options.success,
                error:options.error
            });
        },
        load:function(uid,cb){
            this.uid = uid;
            this.fetch({
                success:function(req){
                    var data = req.attributes.de;
//                    if(data.err=="0"){
//                        cb(data.data);
//                    }
//                    else{
//                        alert(data.ret_msg);
//                    }
                    cb(data);
                },
                error:function(req){}
            });
        },
        parse:function(data){
            return data;
        }
    });

    return _m;
});
