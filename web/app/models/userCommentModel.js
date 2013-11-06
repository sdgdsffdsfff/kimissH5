/**
 * User: daisikey
 * Date: 13-10-23
 */
define(function () {
    var _comment = new Backbone.Model.extend({
        initialize:function(){
            this.uid = "111";
        },
        url:"http://product.kimiss.com/index.php?c=Iapp&rd=40&ud="+this.uid,
        sync:function(method,model,options){
            return $.ajax({
                type:"POST",
                async:false,
                url:this.url,
                data:{},
                cache:false,
                dataType:"jsonp",
                jsonp: "callbackfun",
                jsonpCallback:"jsonpCallback",
                success:options.success,
                error:options.error
            });
        }
    });
    return _comment;
});