define(function(){
    var _navBody = Backbone.View.extend({
        menuTpl:_.template(AppTplMap.menu),
        initialize:function(){
            this.render();
        },
        events:{
            'click a':'itemTap'
//            'touchstart .item':'itemOn',
//            'touchend .item':'itemOff',
//            'mousedown .item':'itemOn',
//            'mouseout .item':'itemOff',
//            'mouseup .item':'itemOff'
        },
//        itemOn:function(e){
//            $(e.target).addClass('item-on');
//        },
//        itemOff:function(e){
//            $(e.target).removeClass('item-on');
//        },
        itemTap:function(e){
            Kimiss.NavBar.NavBody.toggle();
        },
        render:function(){
            var me = this;
            me.$el.html(me.menuTpl({
                list:[{
                    name:'首页',
                    link:'#index'
                },{
                    name:'品牌',
                    link:'#brand'
                },{
                    name:'分类'
                },{
                    name:'功效'
                }],
                list1:[{
                    name:'新品ewq',
                    link:'#productsSo/美白'
                },{
                    name:'面132膜',
                    link:''
                },{
                    name:'精dddads华',
                    link:''
                },{
                    name:'眼a霜',
                    link:''
                },{
                    name:'美白',
                    link:''
                },{
                    name:'祛dsa痘',
                    link:''
                },{
                    name:'瘦q身',
                    link:''
                },{
                    name:'更多',
                    link:''
                },{
                    name:'测试链接',
                    link:''
                },{
                    name:'测试链接测试',
                    link:''
                },{
                    name:'测试链接测',
                    link:''
                },{
                    name:'测试链接测试链接',
                    link:''
                },{
                    name:'测试链接测试链',
                    link:''
                }]
            }));
            return this;
        },
        status:'close',
        toggle:function(){
            var me = this;
            if(this.status == 'close'){
//                me.$el.addClass('nav-body-show');
                me.$el.fadeIn();
                this.status = 'open'
            }else if(this.status == 'open'){
//                this.$el.removeClass('nav-body-show');
                me.$el.fadeOut();
                this.status = 'close'
            }
        },
        setHeight:function(){
            var me = this;
            me.$el.height($(window).height() - 80);
        }
    });
    return _navBody;
});