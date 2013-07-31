define(['collections/BrandList'],function(BrandListClt){
    var _brandIndex = Backbone.View.extend({
        tpl: _.template(AppTplMap.brandIndexes),
        events:{
            'click ul li':function(e){
                var brand =  Kimiss.Body.getModule('Brand');
                var map = brand.brandListMap;
                var index = e.target.innerHTML;
                if(!map[index]){
                    brand.addItem(brand.BrandListClt.findWhere({index:index}));
                }
                for(var i in map){
                    if(i == index){
                        map[i].show();
                    }else{
                        map[i].hide();
                    }
                }
                $(e.target).addClass('brand-indexes-pressing');
                $(e.target).siblings().removeClass('brand-indexes-pressing');
            }
        },
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
            this.elp = this.options.elp;
            this.render();
        },
        show:function(){
            this.$el.show();
        },
        hide:function(){
            this.$el.hide();
        },
        render:function(){
            this.$el.html(this.tpl(this.model.attributes));
            this.elp.append(this.$el);
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
        brandListMap:{},
        addItem:function(model){
            var l = new this.BrandList({
                elp:this.itemsEL,
                model:model
            });
            this.brandListMap[model.get('index')] = l;
            return l;
        },
        addIndexes:function(indexes){
            var me = this;
            new this.BrandIndex({
                el:this.indexesEL,
                indexes:indexes
            });
            this.indexesEL.height($(window).height() - 40);

            var brandIndexScroller = new iScroll('brand-indexes-scroller',{
                vScrollbar:false
            });
            window.addEventListener('resize',function(){
                me.indexesEL.height($(window).height() - 40);
                brandIndexScroller.refresh();
            },false);
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
                    me.addItem(clt.models[0]);
                }
            });
        }
    });
    return _brand;
});