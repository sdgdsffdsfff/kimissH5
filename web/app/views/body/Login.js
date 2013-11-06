/**
 * User: daisikey
 * Date: 13-10-12
 */
define(["models/verifyCodeModel","models/LoginModel"],function (verifyCode,loginView) {
    return Backbone.View.extend({
        initialize:function(){
            this.verifyCode = new verifyCode;
        },
        events:{
            'DOMContentLoaded #body':function(){this.$el.find("#errorTips").hide();},
            'click #loginForm img':function(){this.getCode();},
            'submit #loginForm':function(e){
                var formCon = $("#loginForm")[0];
                var formData = {"email":formCon.email.value,"psd":formCon.psd.value,"code":{"idhash":formCon.sechash.value,"code":formCon.code.value}};
                this.userLogin = new loginView(formData);
                this.userLogin.fetch({
                    success:function(req){
                        var res = req.attributes[0];
                        $("#errorTips").html(res.ret_msg);
                        $("#errorTips").show();
                        if(res.err=="0"){
                            $.cookie("j_c_usernick",res.data.username);
                            $.cookie("uid",res.data.uid);
                            setTimeout(function(){
                                Kimiss.Router.navigate('userInfo',{
                                    trigger:true
                                });
                            },1000);
                        }
                    },
                    error:function(err){
                        var res = req.attributes[0];
                        alert(res.ret_msg);
                    }
                });
                return false;
            }
        },
        tpl: _.template(AppTplMap.login),
        render:function(data){
            this.$el.html(this.tpl({
                //data:data
            }));
        },
        getCode:function(){
            var me = this;
            me.verifyCode.load(function(req){
                me.$el.find(".codeUrl").attr("src",req.codeurl);
                me.$el.find(".codeHash").val(req.sechash);
            });
        },
        show:function(){
            var me = this;
            me.$el.show();
            me.render();
            me.getCode();
            $("#body").css({"backgroundColor":"#eee"});
            Kimiss.NavBar.setTitle(i18n.login_name);
            Kimiss.Body.Loading.hide();
        },
        hide:function(){
            this.$el.hide();
        }
    });
});