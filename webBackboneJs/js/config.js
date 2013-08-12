function requireApp(){
    require.config({
        baseUrl:'js'
    });
    require(['views/Kimiss','analysis/analysis'],function(Kimiss,Analysis){
        var kimiss = new Kimiss({
            el:$('#app')
        }).render();
        window['Kimiss'] = kimiss;
        var analysis = new Analysis({
            url:'http://localhost:3001'
        });
        analysis.start();
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
    name:'brandHot',
    path:'/partials/brandHot.html'
},{
    name:'sortList',
    path:'/partials/sortList.html'
},{
    name:'sortIndexes',
    path:'/partials/sortIndex.html'
},{
    name:'sortHot',
    path:'/partials/sortHot.html'
},{
    name:'indexListBody',
    path:'/partials/indexListBody.html'
},{
    name:'indexListTitle',
    path:'/partials/indexListTitle.html'
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
    name:'effect',
    path:'/partials/effect.html'
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