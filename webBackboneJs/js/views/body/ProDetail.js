define(['models/ProDetailModel','collections/CommentList','views/common/Carousel'],function(ProDetailModel,CommentList,Carousel){
    var _v = Backbone.View.extend({
        model:new ProDetailModel,
        commentList:new CommentList,
        tpl: _.template(AppTplMap.proDetail),
        commentTpl: _.template(AppTplMap.comment),
        render:function(){},
        show:function(pd){
            this.load(pd);
            this.$el.show();
        },
        loadComment:function(pd){
            var me = this;
            Kimiss.Body.Loading.show();
            this.commentList.fetch({
                data:{
                    pdy: '['+pd+']'
                },
                success:function(clt){
                    var list = me.$el.find('.comment-list');
                    clt.models.each(function(a){
                        var s = me.commentTpl(a.attributes);
                        list.html(list.html()+s);
                    });

                    me.$el.find('.small-loading').hide();
                    Kimiss.Body.Loading.hide();
                }
            });
        },
        hide:function(){
            this.$el.hide();
        },
        load:function(pd){
            var me = this;
            this.model.fetch({
                data:{
                    pd:pd
                },
                success:function(model){
                    Kimiss.NavBar.setTitle(model.get('pe'));
                    me.$el.html(me.tpl(model.attributes));
                    new Carousel({
                        el:me.$el.find('#proDetail-carousel')
                    });
                    me.loadComment(pd);
                }
            });
        }
    });
    return _v;
});