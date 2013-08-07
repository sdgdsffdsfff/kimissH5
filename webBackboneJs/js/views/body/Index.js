define(['collections/IndexList','views/common/Button'],function(IndexList,Button){
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
        listTpl: _.template(AppTplMap.indexListItem),
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
        addItems:function(models){
            var me = this,re = [];
            models.each(function(model){
                re.push(model.attributes);
            });
            console.log(re);
            me.$el.html(this.listTpl({
                list:re
            }));
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
        removeLoadMore:function(){
            if(this.loadMoreCmp){
                this.loadMoreCmp.$el.hide();
            }
        },
        addLoadMore:function(){
            if(!this.loadMoreCmp){
                this.loadMoreCmp = new Button({
                    className:'index-load-more',
                    clsPressing:'index-load-more-pressing',
                    text:'加载更多',
                    startAnim:function(){
                        this.$el.addClass('index-load-more-run');
                    },
                    stopAnim:function(){
                        this.$el.removeClass('index-load-more-run');
                    }
                });
                this.loadMoreCmp.loading = false;
                this.loadMoreCmp.on({
                    tap:function(){
                        var me = this;
                        if(this.loading === false){
                            me.startAnim();
                            Kimiss.Body.getModule('Index').load();
                            this.loading = true;
                        }
                    }
                });
                this.$el.parent().append(this.loadMoreCmp.$el);
            }
            this.loadMoreCmp.$el.show();
        },
        pageNum:1,
        load:function(){
            var me = this;
            Kimiss.Body.Loading.show();
            this.IndexList.fetch({
                data:{
                    ie:me.pageNum++
                },
                success:function(clt){
                    var l = clt.models.length;
                    if(me.loadMoreCmp){
                        me.loadMoreCmp.loading = false;
                        me.loadMoreCmp.stopAnim();
                    }
                    if(l == 10){
                        me.addItems(clt.models);
                        me.addLoadMore();
                    }else if(l < 10){
                        me.removeLoadMore();
                    }
                    Kimiss.Body.Loading.hide();
                }
            });
        }
    });

    return _index;
});

