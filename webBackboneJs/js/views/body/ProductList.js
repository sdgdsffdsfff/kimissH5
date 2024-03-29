define([
    'collections/ProductList',
//    'models/ProductsModel',
    'views/common/LoadMore'
],function(ProductList,
//           ProductsModel,
           LoadMore){
    var _v = Backbone.View.extend({
        productList:new ProductList,
//        model:new ProductsModel,
        tpl: _.template(AppTplMap.productList),
        getLoadMore:function(){
            var me = this;
            return new LoadMore({
                ontap:function(callback){
                    me.loadMore(me.lastLoadParams,callback);
                }
            });
        },
        addItems:function(data){
            if(this.loadMoreCmp){
                this.loadMoreCmp.remove();
            }
            this.$el.html(this.$el.html()+this.tpl({
                list:data
            }));
            this.loadMoreCmp = this.getLoadMore();
            this.$el.append(this.loadMoreCmp.$el);
        },
        show:function(params){
            this.$el.show();
            this.loadList(params);
        },
        hide:function(){
            this.$el.hide();
        },
        loadMoreCmp:null,
        lastLoadParams:{},
        loadMore:function(params,callback){
            var me = this,
                data = {};
            params.ie = params.ie?(params.ie+1):1;
            this.lastLoadParams = params;
            data.ie = params.ie;
            if(params.t.indexOf('-')<0){
                data[params.t] = params.s;
            }else{
                var t = params.t.split('-'),
                    s = params.s.replace(/[\[\]]/g,'').split('-');
                for(var i=1;i< t.length;i++){
                    if(t[i] == 'pst'){
                        data[t[i]] = s[i];
                    }else{
                        data[t[i]] = '['+s[i]+']';
                    }
                }
            }
            if(params.t == 'pswy'){
                this.productList.setSoUrl();
            }else{
                this.productList.setListUrl();
            }
            this.productList.fetch({
                data:data,
                success:function(clt,data){
                    me.addItems(data.de.py);
                    if(clt.models.length <10){
                        me.loadMoreCmp.remove();
                    }
                    Kimiss.Analysis.refreshAnalyEvents();
                    callback();
                }
            });
        },
        loadList:function(params){
            var me = this,t = this.lastLoadParams;
            if(!(t.s == params.s&& t.t == params.t)){
                Kimiss.Body.Loading.show();
                me.$el.html('');
                me.loadMore(params,function(){
                    Kimiss.Body.Loading.hide();
                });
            }
        }
    });

    return _v;
});