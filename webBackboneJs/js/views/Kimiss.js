define(['views/nav/navBar','views/search/Search','views/body/Body','routes/Router'],function(NavBar,SearchView,Body,Router){
    //eric branch test...
    var _kimiss = Backbone.View.extend({
        navBarTpl: _.template(AppTplMap.navBar),//_.template($('#navBar-tpl').html()),
        loadingTpl:_.template(AppTplMap.loading),//_.template($('#loading-tpl').html()),
        searchViewTpl:_.template(AppTplMap.searchView),//_.template($('#searchView-tpl').html()),
        bodyTpl:_.template(AppTplMap.body),//_.template($('#body-tpl').html()),
        render:function(){
            var me = this;
            me.$el.html(
                this.navBarTpl()+
                    this.loadingTpl()+
                    this.searchViewTpl()+
                    this.bodyTpl()
            );
            this.NavBar = new NavBar({
                el:$('#navBar')
            });
            this.SearchView = new SearchView({
                el:$('#searchView')
            });
            this.Body = new Body({
                el:$('#body')
            });
            this.Router = new Router();
            return this;
        }
    });
    return _kimiss;
});
