/**
 * User: daisikey
 * Date: 13-10-21
 */
define(function () {
    var _verifyCode = Backbone.Model.extend({
        url:"http://9night.kimiss.com/api.php?mod=vericode",
        initialize:function(){},
        sync:function(method,model,options){
            return $.ajax({
                type:"POST",
                async:false,
                url:this.url,
                data:{'update': 'update','idhash':''},
                cache:false,
                dataType:"jsonp",
                jsonpCallback:"jsonpCallback",
                success:options.success
            });
        },
        load:function(cb){
            this.fetch({
                success:function(req){
                    var data = req.attributes[0].data;
                    cb(data);
                },
                error:function(req){

                }
            });
        }
    });
    return _verifyCode;
});