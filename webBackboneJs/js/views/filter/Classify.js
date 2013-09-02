define(function(){
    return Backbone.View.extend({
        brandItemTpl: _.template(AppTplMap.filter_brand_item),
        last$el:null,
        initialize:function(){
            this.$seled = $('#filter').children('.selected-pack').children('a[data-flt-sele=classify]');
        },
        render:function(){},
        events:{
            'click ul.slide-bar li a':'scrollByIndex',
            'click div.list-pack dl dd a':'selectOne'
        },
        scrollByIndex:function(e){
            var el = this.$el.find('dl[data-filter-title='+e.target.textContent+']');
            if(el.length){
                this.scroller.scrollTo(0,el.parent().offset().top - el.offset().top);
            }
            $(e.target).addClass('on').parent().siblings('li').children('a').removeClass('on');
            e.stopPropagation();
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
        getTTValue:function(key,ii){
            var me = this,t = {};
            if(!ii){
                return null;
            }
            $.each(Kimiss.DB.sort_val,function(i,a){
                $.each(a.arr,function(j,b){
                    $.each(Kimiss.DB.rel_val[ii][key],function(k,c){
                        if(parseInt(b.id) == parseInt(c)){
                            if(t.hasOwnProperty(a.title)){
                                t[a.title].push({
                                    id:c,
                                    name: b.name
                                });
                            }else{
                                t[a.title] = [{
                                    id:c,
                                    name: b.name
                                }];
                            }
                            return false;
                        }
                    });
                });
            });
            return t;
        },
        load:function(key,type){
            var me = this,
                indexes = [];
            var t = me.getTTValue(key,type == 'brand'?'bc':type=='effect'?'ec':null);
            $.each(t,function(i){
                indexes.push(i);
            });
            this.$el.html(this.brandItemTpl({
                data:t,
                indexes:indexes
            })).show();
            this.scroller = new iScroll('filter-classify');
        }
    });
});
