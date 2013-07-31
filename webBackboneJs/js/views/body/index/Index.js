define(['collections/IndexList'],function(IndexList){
    var _indexListItem = Backbone.View.extend({
        tagName:'li',
        className:'index-list-item',
        model:null,
        tpl: _.template(AppTplMap.indexListItem),
        initialize:function(){
            this.render();
        },
        render:function(){
            this.$el.html(this.tpl(this.model.attributes));
            return this;
        }
    });

    var _index = Backbone.View.extend({
        initialize:function(){
            this.IndexList = new IndexList();
        },
        ListItem: _indexListItem,
        hasLoaded:false,
        addItem:function(model){
            var item = new this.ListItem({
                model:model
            });
            this.$el.append(item.$el);
        },
        show:function(){
            this.$el.parent().show();
            if(!this.hasLoaded){
                this.load();
                this.hasLoaded = true;
            }
        },
        hide:function(){
            this.$el.parent().hide();
        },
        load:function(){
            this.IndexList.fetch({
                data:{
                    ie:1
                }
            });
        }
    });

    return _index;
});

