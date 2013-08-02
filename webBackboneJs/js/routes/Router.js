define(function(){
    var _router = Backbone.Router.extend({
        routes:{
            '': 'index',
            'index':'index',
            'brand':'brand',
            'article/:td':'article',
            'proDetail/:pd':'proDetail'
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
        }
    });
    return _router;
});