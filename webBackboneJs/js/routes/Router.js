define(function(){
    var _router = Backbone.Router.extend({
        routes:{
            '': 'index',
            'index':'index',
            'brand':'brandType',
            'brand/:type':'brandType',
            'sort':'sortType',
            'sort/:type':'sortType',
            'article/:td':'article',
            'proDetail/:pd':'proDetail',
            'productList/:pd':'productList',
            'productsSo/:pswy':'productsSo'
        },
        index:function(){
            Kimiss.Body.switch('Index');
        },
        proDetail:function(pd){
            Kimiss.Body.switch('ProDetail',[pd]);
        },
        article:function(td){
            Kimiss.Body.switch('Article',[td]);
        },
        productList:function(pd){
            Kimiss.Body.switch('ProductList',[pd]);
        },
        productsSo:function(pswy){
            Kimiss.Body.switch('ProductList',[pswy,'so']);
        },
        brandType:function(type){
            Kimiss.Body.switch('Brand',[type]);
        },
        sortType:function(type){
            Kimiss.Body.switch('Sort',[type]);
        }
    });
    return _router;
});