define(['collections/IndexList'],function(IndexList){
    var _index = Backbone.View.extend({
        initialize:function(){
            this.IndexList = new IndexList();
        },
        hasLoaded:false,
        addItem:function(item){
            this.$el.append(item.$el);
        },
        show:function(){
            this.$el.parent().show();
            if(!this.hasLoaded){
                this.load();
                this.hasLoaded = true;
            }
        },
        hide:function(){},
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

