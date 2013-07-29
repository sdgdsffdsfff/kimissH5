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
function requireApp(){
    require([
        'js/views/Kimiss',
        'js/views/NavBar',
        'js/views/NavBody',
        'js/views/Button',
        'js/views/SearchBtn',
        'js/views/MenuBtn',
        'js/views/Body',
        'js/views/Loading',
        'js/views/Search',

        'js/routes/Router'
    ]);
}


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