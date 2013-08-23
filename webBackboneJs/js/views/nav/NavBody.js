define(['views/filter/Filter'],function(Filter){
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
            me.FilterEL = me.$el.children('.filter');
            this.Filter = new Filter({
                el:$('#filter')
            });
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
                    Kimiss.NavBody.MenuEL.addClass('nav-body-on').siblings('div').removeClass('nav-body-on');
                }
                if(type == 'search'){
                    Kimiss.NavBody.SearchEL.addClass('nav-body-on').siblings('div').removeClass('nav-body-on');
                }
                if(type == 'filter'){
                    Kimiss.NavBody.FilterEL.addClass('nav-body-on').siblings('div').removeClass('nav-body-on');
                    this.Filter.load();
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