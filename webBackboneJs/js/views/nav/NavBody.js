define(function(){
    var _navBody = Backbone.View.extend({
//        menuTpl:_.template(AppTplMap.menu),
        initialize:function(){
            this.render();
        },
        events:{
            'click a':'click'
        },
        render:function(){
            var me = this;
            me.MenuEL = me.$el.children('.menu');
            me.SearchEL = me.$el.children('.search');
            return this;
        },
        status:'close',
        activeComp:function(type){
            if(type == 'menu'){
                this.MenuEL.show();
            }else
            if(type == 'search'){
                this.MenuEL.hide();
            }
        },
        click:function(e){
            $(e.target).addClass('on').parent().siblings('li').children('a').removeClass('on');
            this.toggle();
        },
        toggle:function(type){
            var me = this;
            if(this.status == 'close'){
                this.status = 'open';
                Kimiss.Body.Mask.show();
                if(type == 'menu'){
                    Kimiss.NavBody.MenuEL.show();
                    Kimiss.NavBody.SearchEL.hide();
                }
                if(type == 'search'){
                    Kimiss.NavBody.MenuEL.hide();
                    Kimiss.NavBody.SearchEL.show();
                }
            }else if(this.status == 'open'){
                this.status = 'close';
                type = null;
                Kimiss.Body.Mask.hide();
            }
            this.activeComp(type);
            Kimiss.slide(type);

        }
    });
    return _navBody;
});