function requireApp(){
    require([
        'js/views/Button',

        'js/models/IndexModel',

        'js/collections/IndexList',

        'js/views/Kimiss',

        'js/views/nav/NavBar',
        'js/views/nav/NavBody',
        'js/views/nav/MenuBtn',

        'js/views/loading/Loading',

        'js/views/search/Search',
        'js/views/search/SearchBtn',

        'js/views/body/Body',
        'js/views/body/Index',

        'js/routes/Router'
    ]);
}

var _templatesMap_ = [{
    name:'navBar',
    path:'/partials/navBar.html'
},{
    name:'body',
    path:'/partials/body.html'
},{
    name:'brand',
    path:'/partials/brand.html'
},{
    name:'index',
    path:'/partials/index.html'
},{
    name:'loading',
    path:'/partials/loading.html'
},{
    name:'menu',
    path:'/partials/menu.html'
},{
    name:'searchView',
    path:'/partials/searchView.html'
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