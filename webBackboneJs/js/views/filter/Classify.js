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
        load:function(key,type){
            var val = Kimiss.DB.sort_val,
                rel = Kimiss.DB.rel_val,
                t = [],
                indexes = [];
            if(type == 'brand'){
                console.log('brand:'+key);
                rel = rel.bc;
                console.log(rel[key]);
//                rel = rel.cb;
//                for(var i =0;i<val.length;i++){
//                    var tt = val[i].arr;
//                    for(var j=0;j<tt.length;j++){
//                        var sortid = tt[j].id;
//                        var brandarr = rel[sortid];
//                        if(brandarr){
//                            for(var k=0;k<brandarr.length;k++){
//                                if(brandarr[k] == key){
//                                    console.log(val[i].title+'='+tt[j].name);
//                                    break;
//                                }
//                            }
//                        }
//                    }
//                }
            }
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
