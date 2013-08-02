define(['models/ArticleModel'],function(ArticleModel){
    var _article = Backbone.View.extend({
        hide:function(){
            this.$el.hide();
        },
        show:function(id){
            Kimiss.Body.Loading.show();
            this.load(id,function(){
                Kimiss.Body.Loading.hide();
            });
            this.$el.show();
        },
        tpl: _.template(AppTplMap.article),
        model:new ArticleModel,
        load:function(id,callback){
            var me = this;
            this.model.fetch({
                data:{
                    td:id
                },
                success:function(model){
                    me.$el.html(me.tpl(model.attributes));
                    callback();
                }
            });
        }
    });
    return _article;
});