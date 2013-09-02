define(['models/ArticleModel'],function(ArticleModel){
    var _article = Backbone.View.extend({
        hide:function(){
            this.$el.hide();
        },
        show:function(id){
            this.load(id);
            this.$el.show();
        },
        tpl: _.template(AppTplMap.article),
        model:new ArticleModel,
        load:function(id){
            var me = this;
            Kimiss.Body.Loading.show();
            this.model.fetch({
                data:{
                    td:id
                },
                success:function(model){
                    me.$el.html(me.tpl(model.attributes));
                    Kimiss.NavBar.setTitle(model.get('te'));
                    Kimiss.Body.Loading.hide();
                    Kimiss.Analysis.refreshAnalyEvents();
                }
            });
        }
    });
    return _article;
});