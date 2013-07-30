define(function(){
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
    return _indexListItem;
});