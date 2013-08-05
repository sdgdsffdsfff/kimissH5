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
            this.allEL = this.$el.find('.brand-all');
            this.hotEL = this.$el.find('.brand-hot');
        },
        hasLoaded:false,
        brandListMap:{},
        hotTpl: _.template(AppTplMap.brandHot),
        addHot:function(){
            var s = '128,140,272,145,183,105,197,182,355,125,198,177,118,211,253,102,119,212,338,255,374,144,126,181,151,127,259,112,353,328,107,231,283,252,185,111,155,1098,685,114,526,439,184,237,204,104,234,218,918,180';
            s = s.split(',');
            this.hotEL.html(this.hotTpl({
                list:s
            }));
        },
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
        show:function(type){
            var me = this;
            type = type||'hot';
            this.$el.show();
            Kimiss.NavBar.showCenterSeg('brand');
            if(!this.hasLoaded){
                this.load(function(){
                    me.switchMode(type);
                });
                this.hasLoaded = true;
            }else{
                me.switchMode(type);
            }
            me.resetHotWidth();
            window.addEventListener('resize',function(){
                me.resetHotWidth();
            },false);
        },
        resetHotWidth:function(){
            var w = this.$el.width();
            this.hotEL.width(w - w%62);
        },
        hide:function(){
            this.$el.hide();
            Kimiss.NavBar.hideCenterSeg();
        },
        switchMode:function(type){
            var anchor = Kimiss.NavBar.$el.find('.brand-seg [type-anchor='+type+']');
            anchor.addClass('on');
            anchor.siblings('a').removeClass('on');
            if(type == 'hot'){
                this.allEL.hide();
                this.hotEL.show();
            }else if(type == 'all'){
                this.allEL.show();
                this.hotEL.hide();
            }
        },
        load:function(callback){
            var me = this;
            this.BrandListClt.fetch({
                success:function(clt){
                    me.addIndexes(clt.indexes);
                    me.addItem(clt.models[0]);
                    me.addHot();
                    Kimiss.NavBar.loadBrandSeg({
                        btnList:[{
                            name:'热门品牌',
                            link:'#brand/hot',
                            anchor:'hot'
                        },{
                            name:'全部品牌',
                            link:'#brand/all',
                            anchor:'all'
                        }],
                        activeIndex:0
                    });
                    callback();
                }
            });
        }
    });
    return _brand;
});