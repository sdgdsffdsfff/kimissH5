define(['views/filter/Brand','views/filter/Classify','views/filter/Effect','views/filter/Sort'],function(BrandFilter,ClassifyFilter,EffectFilter,SortFilter){
    return Backbone.View.extend({
        initialize:function(){
            this.brand = new BrandFilter({
                el:$('#filter-brand')
            });
            this.classify = new ClassifyFilter({
                el:$('#filter-classify')
            })  ;
            this.effect = new EffectFilter({
                el:$('#filter-effect')
            });
            this.sort = new SortFilter({
                el:$('#filter-sort')
            });
        },
        events:{
            'click .seg-btn a':'switchFilter',
            'click .selected-pack a':'closeSeleItem'
        },
        closeSeleItem:function(e){
            var $el = $(e.target);
            if(e.offsetX > $el.width() - 40){
                $el.text('').attr('data-flt-id','-1').hide();
                this[$el.attr('data-flt-sele')].clear();
            }
        },
        switchFilter:function(e){
            var $el =  $(e.target);
            $el.addClass('on').siblings('a').removeClass('on');
            $('#'+$el.attr('rel-filter-id')).show().siblings('.seg-item').hide();
        },
        load:function(){
            this.brand.load();
            this.classify.load();
            this.effect.load();
        }
    });
});