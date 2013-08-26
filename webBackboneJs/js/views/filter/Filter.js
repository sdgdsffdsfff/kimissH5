define(function(){
    return Backbone.View.extend({
        brandItemTpl: _.template(AppTplMap.filter_brand_item),
        initialize:function(){
            var brand = this.$el.find('.seg-brand');
            this.brandEL = brand.children('div.list-pack');
            this.brandBarEL = brand.children('ul.slide-bar');

            var classify = this.$el.find('.seg-classify');
            this.classifyEL = classify.children('div.list-pack');
            this.classifyBarEL = classify.children('ul.slide-bar');

            this.effectEL = this.$el.find('.seg-effect ul');

            this.sortEL = this.$el.find('.seg-sort ul');


        },
        load:function(){
//            var val = Kimiss.DB.brand_val,t = [];
//            for(var i in val){
//                t.push({
//                    title:i,
//                    arr:val[i]
//                });
//            }
//            this.brandEL.html(this.brandItemTpl({
//                data:t
//            })).show();
//            this.brandScroller = new iScroll('filter-brand');
        }
    });
});