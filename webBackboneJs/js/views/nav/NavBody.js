define(function(){
    var _navBody = Backbone.View.extend({
        menuTpl:_.template(AppTplMap.menu),
        initialize:function(){
            this.render();
        },
        events:{
            'click a':'toggle'
        },
        render:function(){
            var me = this;
            me.$el.find('.menu').html(me.menuTpl({
                list:[{
                    name:'首页',
                    link:'#index',
                    icon:'indexIcon'
                },{
                    name:'品牌',
                    link:'#brand',
                    icon:'brandIcon'
                },{
                    name:'分类',
                    link:'#sort',
                    icon:'sortIcon'
                },{
                    name:'功效',
                    link:'#effect',
                    icon:'effectIcon'
                },{
                    name:'我的闺蜜',
                    link:'#admin',
                    icon:'adminIcon'
                }]
            }));
            return this;
        },
        status:'close',
        toggle:function(type){
            var me = this;
            if(this.status == 'close'){
                this.status = 'open';
                Kimiss.Body.Mask.show();
            }else if(this.status == 'open'){
                this.status = 'close';
                type = null;
                Kimiss.Body.Mask.hide();
            }
            Kimiss.slide(type);

        }
    });
    return _navBody;
});