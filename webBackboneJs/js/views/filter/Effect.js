define(function(){
    return Backbone.View.extend({
        itemTpl: _.template(AppTplMap.filter_effect_item),
        events:{
        },
        load:function(){
            var val = Kimiss.DB.effect_val;
            this.$el.html(this.itemTpl({
                data:val
            })).show();
            this.scroller = new iScroll('filter-effect');
        }
    });
});