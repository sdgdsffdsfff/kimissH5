/**
 * User: daisikey
 * Date: 13-10-21
 */
define(["models/verifyCode"],function (verifyCode) {
    return Backbone.View.extend({
        initialize:function(){
            this.verifyCode = new verifyCode;
        },
        getCode:function(){
            this.verifyCode.fetch({
                success:function(req){
                }
            });
        }
    });
});