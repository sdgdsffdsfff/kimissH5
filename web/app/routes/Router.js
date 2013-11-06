define(function(){
    var _router = Backbone.Router.extend({
        initialize:function(){
            window.onhashchange = function(e){
                if(e.newURL.indexOf('#productList')<0){
                    $('#filter-btn').hide();
                }
                if(e.newURL.indexOf('#productList')<0
                    &&e.newURL.indexOf('#article')<0
                    &&e.newURL.indexOf('#proDetail')<0
                    &&e.newURL.indexOf('#comments')<0){
                    $('#back-btn').hide();
                }
            };
        },
        routes:{
            '': 'index',
            'index':'index',
            'brand':'brandType',
            'brand/:type':'brandType',
            'sort':'sortType',
            'sort/:type':'sortType',
            'article/:td':'article',
            'Km.ArticlePacker!td=:td':'article',
            'effect':'effect',
            'login':'login',
            'proDetail/:pd':'proDetail',
            'Km.PDetailPacker!pd=:pd':'proDetail',
            'productList/s=:s&t=:t':'productList',
            'comments/:pd':'comments',
            'userInfo':'userInfo',
            'userInfo/:type':'userInfo'
        },
        index:function(){
            Kimiss.Body.switch('Index');
        },
        proDetail:function(pd){
            Kimiss.Body.switch('ProDetail',[pd]);
            $('#back-btn').css('display','block');
        },
        article:function(td){
            Kimiss.Body.switch('Article',[td]);
            $('#back-btn').css('display','block');
        },
        productList:function(s,t){
            var d = {
                s: '['+s+']',
                t: t
            };
            if(s&& s.indexOf('-')<0){
                Kimiss.NavBar.setTitle(Kimiss.DB.getNameByTypeId(s,t));
            }
            Kimiss.Body.switch('ProductList',[d]);
            $('#filter-btn').css('display','block');
            $('#back-btn').css('display','block');
        },
        comments:function(pd){
            Kimiss.Body.switch('Comments',[pd]);
            $('#back-btn').css('display','block');
        },
        brandType:function(type){
            Kimiss.Body.switch('Brand',[type]);
        },
        sortType:function(type){
            Kimiss.Body.switch('Sort',[type]);
        },
        effect:function(){
            Kimiss.Body.switch('Effect');
        },
        login:function(){
            Kimiss.Body.switch('Login');
        },
        userInfo:function(type){
            Kimiss.Body.switch('UserInfo',[type]);
        }
    });
    return _router;
});