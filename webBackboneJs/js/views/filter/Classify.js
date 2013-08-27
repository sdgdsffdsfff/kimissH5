define(function(){
    return Backbone.View.extend({
        brandItemTpl: _.template(AppTplMap.filter_brand_item),
        last$el:null,
        initialize:function(){
            this.$seled = $('#filter').children('.selected-pack').children('a[data-flt-sele=classify]');
        },
        render:function(){},
        events:{
            'click ul.slide-bar li':'scrollByIndex',
            'click div.list-pack dl dd a':'selectOne'
        },
        scrollByIndex:function(e){
            var el = this.$el.find('dl[data-filter-title='+e.target.textContent+']');
            if(el.length){
                this.scroller.scrollTo(0,el.parent().offset().top - el.offset().top);
            }
            $(e.target).addClass('on').siblings('li').removeClass('on');
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
        clear:function(){
            this.last$el.removeClass('on');
        },
        load:function(){
            var val = Kimiss.DB.sort_val,
                indexes = [];
            for(var i=0;i<val.length;i++){
                indexes.push(val[i].title);
            }
            this.$el.html(this.brandItemTpl({
                data:val,
                indexes:indexes
            })).show();
            this.scroller = new iScroll('filter-classify');
        }
    });
});
