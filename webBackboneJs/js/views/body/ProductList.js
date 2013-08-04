define(['collections/ProductList','models/ProductsModel'],function(ProductList,ProductsModel){
    var _v = Backbone.View.extend({
        productList:new ProductList,
        model:new ProductsModel,
        tpl: _.template(AppTplMap.productList),
        show:function(pswy,so){
            this.$el.show();
            if(so){
                this.loadSo(pswy);
            }
        },
        addItems:function(data){
            console.log(data);
            this.$el.html(this.tpl({
                list:data
            }));
        },
        hide:function(){
            this.$el.hide();
        },
        loadSo:function(pswy){
            var me = this;
            this.productList.setSoUrl();
            this.productList.fetch({
                data:{
                    pswy:'['+pswy+']'
                },
                success:function(clt,data){
                    me.addItems(data.de.py);
                }
            });
        }
    });

    return _v;
});