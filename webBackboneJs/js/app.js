var _button = Backbone.View.extend({
    mdown:null,
    initialize:function(){
        this.clsPressing = this.options.clsPressing;
    },
    clsPressing:null,
    events:{
        'mousedown':'touchstart',
        'mouseup':'touchend',
        'touchstart':'touchstart',
        'touchend':'touchend',
        'all':function(){
            console.log(arguments);
        },
        'tap':function(e){}
    },
    touchstart:function(e){
        var me = this;
        e.preventDefault();
        e.stopPropagation();
        me.$el.addClass(this.clsPressing);
        this.mdown = {
            ts:Date.now()
        };
    },
    touchend:function(e){
        e.preventDefault();
        e.stopPropagation();
        this.$el.removeClass(this.clsPressing);
        if(this.mdown&&Date.now() - this.mdown.ts<500){
            this.trigger('tap',[e]);
            this.mdown = null;
        }
    }
});

var _kimiss = Backbone.View.extend({
    el:$('#app'),
    initialize:function(){
        this.render();
    },
    navBarTpl: _.template($('#navBar-tpl').html()),
    loadingTpl:_.template($('#loading-tpl').html()),
    searchViewTpl:_.template($('#searchView-tpl').html()),
    bodyTpl:_.template($('#body-tpl').html()),
    render:function(){
        var me = this;
        me.$el.html(
            this.navBarTpl()+
            this.loadingTpl()+
            this.searchViewTpl()+
            this.bodyTpl()
        );
        return this;
    }
});
var _navBar = Backbone.View.extend({
    events1:{
        'click #menu':'toogleMenu',
        'touchstart .bar-btn':'barBtnOn',
        'touchend .bar-btn':'barBtnOff',
        'mousedown .bar-btn':'barBtnOn',
        'mouseup .bar-btn':'barBtnOff'
    },
    toogleMenu:function(e){
        NavBody.toggle();
    },
    barBtnOn:function(e){
        $(e.target).addClass('bar-btn-pressing');
    },
    barBtnOff:function(e){
        $(e.target).removeClass('bar-btn-pressing');
    }
});
var _body = Backbone.View.extend({
    modules:{
        index:_.template($('#index-tpl').html()),
        brand:_.template($('#brand-tpl').html())
    },
    load:function(name,options){
        var tpl = this.modules[name];
        options = options||{};
        if(tpl){
            window.scrollTo(0,0);
            for(var i in this.modules){
                if(i == name){
                    this.$el.find('#'+name).html(tpl(options.data||{})).show();
                }else{
                    this.$el.find('#'+i).hide();
                }
            }

        }
    }
});
var _navBody = Backbone.View.extend({
    menuTpl:_.template($('#menu-tpl').html()),
    initialize:function(){
        this.render();
    },
    events:{
        'click .item':'itemTap',
        'touchstart .item':'itemOn',
        'touchend .item':'itemOff',
        'mousedown .item':'itemOn',
        'mouseout .item':'itemOff',
        'mouseup .item':'itemOff'
    },
    itemOn:function(e){
        $(e.target).addClass('item-on');
    },
    itemOff:function(e){
        $(e.target).removeClass('item-on');
    },
    itemTap:function(e){
        NavBody.toggle();
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
                name:'首页'
            },{
                name:'首页'
            },{
                name:'首页'
            }]
        }));
        return this;
    },
    status:'close',
    toggle:function(){
        var me = this;
        if(this.status == 'close'){
            me.$el.addClass('nav-body-show');
            this.status = 'open'
        }else if(this.status == 'open'){
            this.$el.removeClass('nav-body-show');
            this.status = 'close'
        }
    },
    setHeight:function(){
        var me = this;
        me.$el.height($(window).height() - 80);
    }
});
var _loading = Backbone.View.extend({

});
var _searchView = Backbone.View.extend({
    clsShow:'searchView-show',
    status:'close',
    toggle:function(){
        if(this.status == 'close'){
            this.$el.addClass(this.clsShow);
            this.status = 'open';
        }else if(this.status == 'open'){
            this.$el.removeClass(this.clsShow);
            this.status = 'close';
        }
    }
});

Kimiss = new _kimiss();
NavBar = new _navBar({
    el:$('#navBar')
});
Loading = new _loading({
    el:$('#loading')
});
SearchView = new _searchView({
    el:$('#searchView')
});
Body = new _body({
    el:$('#body')
});
NavBody = new _navBody({
    el:$('#navBody')
});
//=========BarBtn=========
SearchBtn = new _button({
    el:$('#search'),
    clsPressing:'bar-btn-pressing'
});
SearchBtn.on('tap',function(){
    SearchView.toggle();
});
MenuBtn = new _button({
    el:$('#menu'),
    clsPressing:'bar-btn-pressing'
});
MenuBtn.on('tap',function(){
    NavBody.toggle();
});

var _router = Backbone.Router.extend({
    routes:{
        '': 'index',
        'index':'index',
        'brand':'brand'
    },
    index:function(){
        Body.load('index',{
            data:{
                list:[1,1,1,1,1,1,1,1]
            }
        });
    },
    brand:function(){
        Body.load('brand',{
            data:{
                list:[1,1,1,1,1,1,1,1]
            }
        });
    }
});
KmRouter = new _router();
Backbone.history.start();




























/*
 var  View = Backbone.View.extend({
 tpl:null,
 items:[],
 render:function(){
 var me = this;
 if(me.tpl){
 me.tpl = _.template($('#'+me.tpl).html()||'');
 me.$el.html(me.tpl);
 }
 me.$el.addClass(me.cls);
 me.items.each(function(a,i){
 var config = {
 el:$('#'+ a.rel)
 },
 p = me.$el.find('#'+ a.rel);
 if(!a.rel){
 delete config.el;
 p = me.$el;
 }
 var na = new a.clazz(config).render();
 p.append(na.el);
 console.log(p.append);
 console.log(na.el);
 console.log(me.$el.find('#'+ a.rel));
 //            me.items.splice(i,1,a.render());
 });
 return this;
 }
 });
 var NavBar = View.extend({
 id:'navBar',
 tpl:'navBar-tpl'
 });
 var App = View.extend({
 el:$('#app'),
 cls:'app',
 items:[{
 clazz:NavBar
 }]
 });
 var kimiss = new App().render();
 console.log(kimiss);
* */