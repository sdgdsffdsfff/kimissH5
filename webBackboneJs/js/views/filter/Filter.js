define(['collections/BrandList'],function(BrandList){
    return Backbone.View.extend({
        initialize:function(){
            this.BrandList = new BrandList();
        },
        load:function(){
            this.BrandList.fetch();
        }
    });
});