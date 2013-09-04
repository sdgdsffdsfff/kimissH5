define(['collections/IndexList','views/common/LoadMore'],function(IndexList,LoadMore){
    var _index = Backbone.View.extend({
        IndexList:new IndexList(),
        className:'index-list',
        titleTpl: _.template(AppTplMap.indexListTitle),
        bodyTpl: _.template(AppTplMap.indexListBody),
        hasLoaded:false,
        items:[],
        addTitle:function(){
            this.$el.html(this.titleTpl());
        },
        addItems:function(models){
            var me = this,re = [];
            if(this.loadMoreCmp){
                this.loadMoreCmp.remove();
            }
            models.each(function(model){
                var t = new Date(parseInt(model.attributes.tt)*1000);
                model.attributes.date_top = t.getFullYear()+'.'+ (t.getMonth()+1);
                model.attributes.date_bottom = t.getDate();
                re.push(model.attributes);
            });
            me.$el.html(me.$el.html()+this.bodyTpl({
                list:re
            }));
            this.loadMoreCmp = this.getLoadMore();
            me.$el.append(this.loadMoreCmp.$el);
        },
        show:function(){
            this.$el.show();
            if(!this.hasLoaded){
                this.load();
                this.hasLoaded = true;
            }
            Kimiss.NavBar.setTitle('');
        },
        hide:function(){
            this.$el.hide();
        },
        loadMoreCmp:null,
        getLoadMore:function(){
            var me = this;
            return new LoadMore({
                ontap:function(callback){
                    me.loadMore(callback);
                }
            });
        },
        pageNum:1,
        loadMore:function(callback){
            var me = this;
            this.IndexList.fetch({
                data:{
                    ie:me.pageNum++
                },
                success:function(clt){
                    var l = clt.models.length;
                    if(l < 10&&this.loadMoreCmp){
                        this.loadMoreCmp.remove();
                    }
                    if(me.pageNum <= 2){
                        me.addTitle();
                    }
                    me.addItems(clt.models);
                    Kimiss.Analysis.refreshAnalyEvents();
                    callback();
                },
                error:function(){
                    alert('Index init error.');
                }
            });
        },
        load:function(){
            var me = this;
            Kimiss.Body.Loading.show();
            this.loadMore(function(){
                Kimiss.Body.Loading.hide();
            });
        }
    });

    return _index;
});

