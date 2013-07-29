var _kimiss = Backbone.View.extend({
    el:$('#app'),
    initialize:function(){
        this.render();
    },
    navBarTpl: _.template(AppTplMap.navBar),//_.template($('#navBar-tpl').html()),
    loadingTpl:_.template($('#loading-tpl').html()),
    searchViewTpl:_.template($('#searchView-tpl').html()),
    bodyTpl:_.template($('#body-tpl').html()),
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