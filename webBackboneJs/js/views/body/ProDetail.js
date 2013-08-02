define(['models/ProDetailModel','collections/CommentList'],function(ProDetailModel,CommentList){
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
            this.commentList.fetch({
                data:{
                    pdy: '['+pd+']'
                },
                success:function(clt){
                    console.log(clt);
                    var list = me.$el.find('.comment-list');
                    clt.models.each(function(a){
                        var s = me.commentTpl(a.attributes);
                        list.html(list.html()+s);
                    });

                    me.$el.find('.small-loading').hide();
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
                    me.$el.html(me.tpl(model.attributes));
                    me.loadComment(pd);
                }
            });
        }
    });
    return _v;
});