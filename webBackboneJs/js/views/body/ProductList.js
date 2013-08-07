define(['collections/ProductList','models/ProductsModel'],function(ProductList,ProductsModel){
    var _v = Backbone.View.extend({
        productList:new ProductList,
        model:new ProductsModel,
        tpl: _.template(AppTplMap.productList),
        show:function(params){
            this.$el.show();
            this.loadList(params);
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
        loadList:function(params){
            var me = this;
            var data = {};
            if(params.pswy){
                data.pswy = '['+params.pswy+']';
            }else{
                if(params.bdy){
                    data.bdy = '['+params.bdy+']';
                }
                if(params.pcdy){
                    data.pcdy = '['+params.pcdy+']';
                }
                if(params.pfdy){
                    data.pfdy = '['+params.pfdy+']';
                }
            }
            this.productList.setListUrl();
            Kimiss.Body.Loading.show();
            this.productList.fetch({
                data:data,
                success:function(clt,data){
                    me.addItems(data.de.py);
                    Kimiss.Body.Loading.hide();
                }
            });
        }
    });

    return _v;
});