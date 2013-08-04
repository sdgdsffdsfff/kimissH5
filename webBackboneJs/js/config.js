function requireApp1(){
    require([
        'js/models/IndexModel',

        'js/views/Button',

        'js/collections/IndexList',

        'js/views/Kimiss',

        'js/views/nav/NavBar',
        'js/views/nav/NavBody',
        'js/views/nav/MenuBtn',

        'js/views/loading/Loading',

        'js/views/search/Search',
        'js/views/search/SearchBtn',

        'js/views/body/Index',
        'js/views/body/Body',

        'js/routes/Router'
    ]);
}
function requireApp(){
    require.config({
        baseUrl:'js'
    });
    require(['views/Kimiss'],function(Kimiss){
        var kimiss = new Kimiss({
            el:$('#app')
        }).render();
        window['Kimiss'] = kimiss;
        Backbone.history.start();
    });
}

var _templatesMap_ = [{
    name:'navBar',
    path:'/partials/navBar.html'
},{
    name:'body',
    path:'/partials/body.html'
},{
    name:'brandList',
    path:'/partials/brandList.html'
},{
    name:'brandIndexes',
    path:'/partials/brandIndex.html'
},{
    name:'indexListItem',
    path:'/partials/indexListItem.html'
},{
    name:'loading',
    path:'/partials/loading.html'
},{
    name:'menu',
    path:'/partials/menu.html'
},{
    name:'searchView',
    path:'/partials/searchView.html'
},{
    name:'article',
    path:'/partials/article.html'
},{
    name:'proDetail',
    path:'/partials/proDetail.html'
},{
    name:'comment',
    path:'/partials/comment.html'
},{
    name:'productList',
    path:'/partials/products.html'
},{
    name:'segmentbtn',
    path:'/partials/segmentbtn.html'
}];


var AppTplMap = {},_templatesMap_L = 0;
_templatesMap_.each(function(a){
    var fn = function(s){
        AppTplMap[arguments.callee.tempName] = s;
        if(++_templatesMap_L == _templatesMap_.length){
            requireApp();
        }
    };
    fn.tempName = a.name;
    $.get(a.path,fn);
});