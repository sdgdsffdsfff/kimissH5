define(function(){
    return Backbone.View.extend({
        itemTpl: _.template(AppTplMap.filter_effect_item),
        events:{
            'click ul li a':'selectOne'
        },
        initialize:function(){
            this.$seled = $('#filter').children('.selected-pack').children('a[data-flt-sele=effect]');
        },
        selectOne:function(e){
            var id = parseInt($(e.target).attr('data-filter-id')),
                $el = $(e.target);
            if(!isNaN(id)){
                this.$seled.text($el.text()).attr('data-flt-id',$el.attr('data-filter-id')).css('display','block');
                if(this.last$el){
                    this.last$el.removeClass('on');
                }
                $el.addClass('on');
                this.last$el = $el;
            }
            e.stopPropagation();
        },
        load:function(key,type){
            var val = Kimiss.DB.effect_val;
            this.$el.html(this.itemTpl({
                data:val
            })).show();
            this.scroller = new iScroll('filter-effect');
        }
    });
});