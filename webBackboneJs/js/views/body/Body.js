define(['views/body/Index','views/body/Brand',
    'views/body/Article','views/body/Loading',
    'views/body/ProDetail','views/body/ProductList',
    'views/body/Sort','views/body/Effect',
    'views/common/Event','views/body/Comments'],
function(Index,Brand,Article,Loading,ProDetail,ProductList,Sort,Effect,Event,Comments){
    var BodyMask = Backbone.View.extend({
        initialize:function(){
            var me = this;
            this.event = new Event({
                hoster:me
            });
        },
        show:function(){
            this.$el.show();
        },
        hide:function(){
            this.$el.hide();
        },
        touchstart:function(e){
            e.preventDefault();
            e.stopPropagation();
        },
        touchmove:function(e){
            e.preventDefault();
            e.stopPropagation();
        },
        touchend:function(e){
            e.preventDefault();
            e.stopPropagation();
            Kimiss.NavBody.toggle();
        }
    });
    var _body = Backbone.View.extend({
        initialize:function(){
            this.render();
            this.$el.css({
                minHeight:$(window).height() - 40
            });
        },
        modules:{
        },
        getModule:function(name){
            return this.modules[name];
        },
        render:function(){
            this.Loading = new Loading({
                el:$('#loading')
            });
            this.Mask = new BodyMask({
                el:$('#body-mask')
            });
            this.modules.Index = new Index({
                el:$('#index')
            });
            this.modules.Brand = new Brand({
                el:$('#brand')
            });
            this.modules.Article = new Article({
                el:$('#article')
            });
            this.modules.ProDetail = new ProDetail({
                el:$('#proDetail')
            });
            this.modules.ProductList = new ProductList({
                el:$('#productList')
            });
            this.modules.Sort = new Sort({
                el:$('#sort')
            });
            this.modules.Effect = new Effect({
                el:$('#effect')
            });
            this.modules.Comments = new Comments({
                el:$('#comments')
            });
        },
        switch:function(name,params){
            for(var i in this.modules){
                var m = this.modules[i];
                if(i == name){
                    m.show.apply(m,params);
                }else{
                    m.hide.apply(m,params);
                }
            }
        }
    });
    return _body;
});