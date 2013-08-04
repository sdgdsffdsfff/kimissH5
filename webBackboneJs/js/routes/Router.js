define(function(){
    var _router = Backbone.Router.extend({
        routes:{
            '': 'index',
            'index':'index',
            'brand':'brand',
            'brand/:type':'brandType',
            'article/:td':'article',
            'proDetail/:pd':'proDetail',
            'productsSo/:pswy':'productsSo'
        },
        index:function(){
            Kimiss.Body.switch('Index');
        },
        brand:function(){
            Kimiss.Body.switch('Brand');
        },
        proDetail:function(pd){
            Kimiss.Body.switch('ProDetail',[pd]);
        },
        article:function(td){
            Kimiss.Body.switch('Article',[td]);
        },
        productsSo:function(pswy){
            Kimiss.Body.switch('ProductList',[pswy,'so']);
        },
        brandType:function(type){
            Kimiss.Body.getModule('Brand').switchMode(type);
        }
    });
    return _router;
});