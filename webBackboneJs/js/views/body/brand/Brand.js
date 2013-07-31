define(['collections/BrandList'],function(BrandListClt){
    var _brandIndex = Backbone.View.extend({
        tpl: _.template(AppTplMap.brandIndexes),
        initialize:function(){
            this.indexes = this.options.indexes;
            this.render();
        },
        render:function(){
            this.$el.html(this.tpl({
                indexes:this.indexes
            }));
        }
    });
    var _brandList = Backbone.View.extend({
        className:'brand-list',
        tpl: _.template(AppTplMap.brandList),
        model:null,
        initialize:function(){
            this.arr = this.options.arr;
            this.render();
        },
        render:function(){
            this.$el.html(this.tpl(this.model.attributes));
        }
    });
    var _brand = Backbone.View.extend({
        BrandIndex:_brandIndex,
        BrandList:_brandList,
        initialize:function(){
            this.BrandListClt = new BrandListClt;
            this.render();
        },
        render:function(){
            this.indexesEL = this.$el.find('.brand-indexes-pack');
            this.itemsEL = this.$el.find('.brand-items-pack');
        },
        hasLoaded:false,
        addFirstItem:function(model){
            new this.BrandList({
                el:this.itemsEL,
                model:model
            });
        },
        addIndexes:function(indexes){
            new this.BrandIndex({
                el:this.indexesEL,
                indexes:indexes
            });
        },
        show:function(){
            this.$el.show();
            if(!this.hasLoaded){
                this.load();
                this.hasLoaded = true;
            }
        },
        hide:function(){
            this.$el.hide();
        },
        load:function(){
            var me = this;
            this.BrandListClt.fetch({
                success:function(clt){
                    me.addIndexes(clt.indexes);
                    me.addFirstItem(clt.models[0]);
                }
            });
        }
    });
    return _brand;
});