define(['collections/CommentList','views/common/LoadMore'],function(CommentList,LoadMore){
    return Backbone.View.extend({
        commentTpl: _.template(AppTplMap.comment),
        loadMoreCmp:null,
        pageNum:1,
        lastPd:null,
        commentList:new CommentList,
        getLoadMore:function(){
            var me = this;
            return new LoadMore({
                ontap:function(callback){
                    me.loadMore(me.lastPd,callback);
                }
            });
        },
        show:function(pd){
            this.load(pd);
            this.$el.show();
        },
        hide:function(){
            this.$el.hide();
        },
        addItems:function(models){
            var me = this,s = '';
            if(this.loadMoreCmp){
                this.loadMoreCmp.remove();
            }
            models.each(function(a){
                s += me.commentTpl(a.attributes);
            });
            this.$el.html(this.$el.html()+s);
            if(models.length >=10){
                this.loadMoreCmp = this.getLoadMore();
                me.$el.append(this.loadMoreCmp.$el);
            }
        },
        loadMore:function(pd,cb){
            var me = this;
            this.commentList.fetch({
                data:{
                    pdy: '['+pd+']',
                    ie: me.pageNum++
                },
                success:function(clt){
                    var l = clt.models.length;
                    me.addItems(clt.models);
                    cb();
                }
            });
        },
        load:function(pd){
            this.lastPd = pd;
            Kimiss.Body.Loading.show();
            this.loadMore(pd,function(){
                Kimiss.Body.Loading.hide();
            });
        }
    });
});