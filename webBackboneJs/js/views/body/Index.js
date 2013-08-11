define(['collections/IndexList','views/common/LoadMore'],function(IndexList,LoadMore){
//    var _indexListItem = Backbone.View.extend({
//        tagName:'li',
//        className:'index-list-item',
//        model:null,
//        tpl: _.template(AppTplMap.indexListItem),
//        initialize:function(){
//            this.render();
//        },
//        render:function(){
//            this.$el.articleid = this.model.get('td');
//            this.$el.html(this.tpl(this.model.attributes));
//            return this;
//        }
//    });

    var _index = Backbone.View.extend({
        initialize:function(){
            this.IndexList = new IndexList();
        },
        className:'index-list',
        events:{
//            'click li':function(e){
//                Kimiss.Body.switch('Article',[$(e.currentTarget).attr('article-id')]);
//            }
        },
        titleTpl: _.template(AppTplMap.indexListTitle),
        bodyTpl: _.template(AppTplMap.indexListBody),
//        ListItem: _indexListItem,
        hasLoaded:false,
        items:[],
//        addItem:function(model){
//            var item = new this.ListItem({
//                model:model
//            });
//            this.items.push(item);
//            this.$el.append(item.$el);
//        },
        addTitle:function(){
            this.$el.html(this.titleTpl());
        },
        addItems:function(models){
            var me = this,re = [];
            if(this.loadMoreCmp){
                this.loadMoreCmp.remove();
            }
            models.each(function(model){
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
                    callback();
                },
                error:function(){
                    alert(123333);
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

