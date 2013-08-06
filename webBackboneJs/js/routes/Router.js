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
            'effect':'effect',
            'proDetail/:pd':'proDetail',
            'productList/pswy=:pswy':'productList',
            'productList/bdy=:bdy':'productList',
            'productList/pcdy=:pcdy':'productList',
            'productList/pfdy=:pfdy':'productList',
            'productList/bdy=:bdy/pcdy=:pcdy/pfdy=:pfdy/pswy=:pswy':'productList'
//            'productsSo/:pswy':'productsSo'
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
        productList:function(bdy,pcdy,pfdy,pswy){
            Kimiss.Body.switch('ProductList',[{
                bdy:bdy,
                pcdy:pcdy,
                pfdy:pfdy,
                pswy:pswy
            }]);
        },
        brandType:function(type){
            Kimiss.Body.switch('Brand',[type]);
        },
        sortType:function(type){
            Kimiss.Body.switch('Sort',[type]);
        },
        effect:function(){
            Kimiss.Body.switch('Effect');
        }
    });
    return _router;
});