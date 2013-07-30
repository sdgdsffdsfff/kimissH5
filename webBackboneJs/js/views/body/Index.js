_index = Backbone.View.extend({
    el:$('#index'),
    hasLoaded:false,
    load:function(){
        IndexList.fetch({
            data:{
                ie:1
            }
        });
    }
});
_indexListItem = Backbone.View.extend({

});
Index = new _index;
Index.load();