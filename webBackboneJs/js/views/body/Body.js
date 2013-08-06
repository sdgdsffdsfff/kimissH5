define(['views/body/Index','views/body/Brand',
    'views/body/Article','views/body/Loading',
    'views/body/ProDetail','views/body/ProductList',
    'views/body/Sort','views/body/Effect'],
function(Index,Brand,Article,Loading,ProDetail,ProductList,Sort,Effect){
    var _body = Backbone.View.extend({
        initialize:function(){
            this.render();
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