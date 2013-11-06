/**
 * User: daisikey
 * Date: 13-10-21
 */
define(function () {
    var _login = Backbone.Model.extend({
        initialize:function(val){
            this.formVal = val;
        },
        url:"http://9night.kimiss.com/api.php?mod=login",
        loginOut_url:"http://9night.kimiss.com/api.php?mod=logout",
        sync:function(method,model,options){
            return $.ajax({
                type:"POST",
                async:false,
                url:this.url,
                data:{
                        'loginsubmit': 1,
                        'username':this.formVal.email,
                        'password':this.formVal.psd,
                        'sechash':this.formVal.code.idhash,
                        'seccodeverify':this.formVal.code.code
                },
                cache:false,
                dataType:"jsonp",
                jsonpCallback:"jsonpCallback",
                success:options.success,
                error:options.error
            });
        },
        loginOut:function(options){
            return $.ajax({
                type:"POST",
                async:false,
                url:this.loginOut_url,
                data:{},
                cache:false,
                dataType:"",
                jsonpCallback:"",
                success:options.success,
                error:options.error
            });
        }
    });
    return _login;
});