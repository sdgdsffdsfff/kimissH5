define(['views/nav/navBar',
    'views/nav/NavBody',
    'views/search/Search',
    'views/body/Body',
    'routes/Router'],function(NavBar,NavBody,SearchView,Body,Router){
    //eric branch test...
    var _kimiss = Backbone.View.extend({
        navBodyTpl: _.template(AppTplMap.navBody),//_.template($('#navBar-tpl').html()),
        loadingTpl:_.template(AppTplMap.loading),//_.template($('#loading-tpl').html()),
        searchViewTpl:_.template(AppTplMap.searchView),//_.template($('#searchView-tpl').html()),
        bodyTpl:_.template(AppTplMap.body),//_.template($('#body-tpl').html()),
        render:function(){
            var me = this;
            me.$el.html(
                this.navBodyTpl()+
                    this.loadingTpl()+
//                    this.searchViewTpl()+
                    this.bodyTpl()
            );
            this.NavBar = new NavBar({
                el:$('#navBar')
            });
            this.NavBody = new NavBody({
                el:$('#navBody')
            });
//            this.SearchView = new SearchView({
//                el:$('#searchView')
//            });
            this.Body = new Body({
                el:$('#body')
            });
            this.Router = new Router();
            return this;
        },
        slide:function(type){
            var per = 0;
            if(type == 'menu'){
                per = 1;
            }
            if(type == 'search'){
                per = -1;
            }
            this.NavBar.$el.css({
                webkitTransform:'translate3d('+per*80+'%,0,0)'
            });
            this.Body.$el.css({
                webkitTransform:'translate3d('+per*80+'%,0,0)'
            });
        }
    });
    return _kimiss;
});
