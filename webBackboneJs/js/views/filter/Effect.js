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
        getTTValue:function(key,ii){
            var me = this,t = [];
            if(!ii){
                return null;
            }
            $.each(Kimiss.DB.effect_val,function(i,a){
                $.each(Kimiss.DB.rel_val[ii][key],function(k,c){
                    if(parseInt(a.id) == parseInt(c)){
                        t.push(a);
                        return false;
                    }
                });
            });
            return t;
        },
        load:function(key,type){
            var val = Kimiss.DB.effect_val,
                me = this,
                t = me.getTTValue(key,type == 'brand'?'be':type=='classify'?'ce':null);
            this.$el.html(this.itemTpl({
                data:t
            })).show();
            this.scroller = new iScroll('filter-effect');
        }
    });
});