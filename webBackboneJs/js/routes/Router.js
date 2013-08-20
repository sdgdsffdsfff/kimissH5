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
            'productList/s=:s&t=:t':'productList'
//            'productList/pswy=:pswy':'productListPswy',
//            'productList/bdy=:bdy':'productListBdy',
//            'productList/pcdy=:pcdy':'productListPcdy',
//            'productList/pfdy=:pfdy':'productListPfdy',
//            'productList/bdy=:bdy/pcdy=:pcdy/pfdy=:pfdy/pswy=:pswy':'productList'
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
        productList:function(s,t){
            var d = {
                s: '['+s+']',
                t: t
            };
            Kimiss.NavBar.setTitle(s);
            Kimiss.Body.switch('ProductList',[d]);
        },
//        productList:function(bdy,pcdy,pfdy,pswy){
//            Kimiss.Body.switch('ProductList',[{
//                bdy:bdy,
//                pcdy:pcdy,
//                pfdy:pfdy,
//                pswy:pswy
//            }]);
//        },
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