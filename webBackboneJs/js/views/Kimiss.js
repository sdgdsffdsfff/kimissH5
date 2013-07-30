var _kimiss = Backbone.View.extend({
    el:$('#app'),
    initialize:function(){
        this.render();
    },
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
        return this;
    }
});
Kimiss = new _kimiss();