/**
 * User: daisikey
 * Date: 13-10-15
 */
define(["models/LoginModel","models/ProDetailModel","models/CommentModel"],function (loginView,proDetail,commentM) {
    return Backbone.View.extend({
        initialize:function(){
            var me = this;
            me.login = new loginView;
            me.prodetail = new proDetail($.cookie("uid"));
            me.userComment = new commentM;
            $("#body").css({"backgroundColor":"#eee"});
        },
        events:{
            'click .commentMore':function(e){
                $(e.target).parent().prev().toggleClass("maxHeight");
                $(e.target).toggleClass("commentLeast");
            },
            'click .showComment':'showComment',
            'click .showProfile':'showProfile',
            'click .loginOut':function(){
                this.login.loginOut({
                    success:function(req){
                        if(req[0].err=="1"){alert(req[0].err);}
                    },
                    error:function(){console.log("error");}
                });
                window.location.href="#login";
            },
//            'change .profileValue .hide_dom':function(){},
//            'blur.profileValue .hide_dom':function(){},
            'click .profileValue':function(e){
                var pro = $(e.currentTarget);
                var hide_dom = pro.children('.hide_dom');
                var show = pro.children('.show_profile_val');
                pro.addClass("borderRed");
//                hide_dom.trigger('focus');//hide_dom.get(0).focus();
                hide_dom.get(0).focus();
                hide_dom.change(function(){
                    alert("we");
                    if(hide_dom.attr('type')=='date'){
                        var dtArr = hide_dom.val().split("-");
                        var dt = new Date(dtArr[0],(dtArr[1]-1),dtArr[2]);
                        show.text(dt.toLocaleDateString());
                    }
                    else{
                        show.text(hide_dom.val());
                    }
                });
                hide_dom.blur(function(){
                    pro.removeClass("borderRed");
                });
            }
        },
        tpl: _.template(AppTplMap.userInfo),
        render:function(data){
            this.$el.html(this.tpl({
                data:data
            }));
        },
        switchModel:function(type){
            var me = this;
            if(type=="comment"){
                me.showComment();
            }
            else{
                me.showProfile();
            }
        },
        showProfile:function(){
            var me = this;
            me.prodetail.load(function(req){
                me.render(req);
                if($.cookie("userAvatar")==null) $.cookie("userAvatar",req.avatar);
                me.setAvatar();
                $("#commentDiv").hide();
                $("#myProfile").show();
            });
        },
        showComment:function(){
            var me = this;
            me.userComment.load($.cookie("uid"),function(req){
                me.render(req.cy);
                me.setAvatar();
                $("#commentDiv").show();
                $("#myProfile").hide();
            });
        },
        setAvatar:function(){
            $(".userName").text($.cookie("j_c_usernick"));
            if($.cookie("userAvatar")!=null){
                $(".userAvatar").attr("src",$.cookie("userAvatar"));
            }
        },
        show:function(type){
            var me = this;
            var type = type||'profile';
            me.$el.show();
            me.switchModel(type);
            Kimiss.NavBar.setTitle(i18n.user_info);
            Kimiss.Body.Loading.hide();
        },
        hide:function(){
            this.$el.hide();
        }
    });
});