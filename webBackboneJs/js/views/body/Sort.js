define(['collections/SortList'],function(SortListClt){
    var _sortIndex = Backbone.View.extend({
        tpl: _.template(AppTplMap.sortIndexes),
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
    var _sortList = Backbone.View.extend({
        className:'brand-list',
        tpl: _.template(AppTplMap.sortList),
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
    var _v = Backbone.View.extend({
        SortIndex:_sortIndex,
        SortList:_sortList,
        SortListClt:new SortListClt,
        hasLoaded:false,
        initialize:function(){
            this.render();
        },
        events:{
            'click ul.sort-indexes li':function(e){
                this.setScrollTop($(e.target).html());
                $(e.target).addClass('on').siblings('li').removeClass('on');
            }
        },
        getP:function(e){
            return {
                x: e.touches? e.touches[0].pageX: e.pageX,
                y: e.touches? e.touches[0].clientY: e.clientY
            };
        },
        indexesDown:false,
        setScrollTop:function(s){
            var ele = this.itemsEL.children('dl[sort-group-index='+s+']');
            if(ele.length){
                var top = ele.offset().top;
                $('body').scrollTop(top-40);
            }
        },
        render:function(){
            this.indexesEL = this.$el.find('.sort-indexes-pack');
            this.itemsEL = this.$el.find('.sort-items-pack');
            this.allEL = this.$el.find('.sort-all');
            this.hotEL = this.$el.find('.sort-hot');
        },
        scrolling:function(){
            var me = this;
            this.itemsEL.children('dl').each(function(i,a){
                if($(a).offset().top + $(a).height()>= $('body').scrollTop()+41){
                    me.indexesEL.find('ul li[index-name='+$(a).attr('sort-group-index')+']').
                        addClass('on').siblings('li').removeClass('on');
                    return false;
                }
            });
        },
        show:function(type){
            var me = this;
            type = type||'hot';
            me.$el.show();
            Kimiss.NavBar.showCenterSeg('sort');
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
            $(window).bind('scroll',function(){
                me.scrolling();
            });
        },
        resetHotWidth:function(){
            var w = this.$el.width();
            this.hotEL.width(w - w%72);
        },
        hide:function(){
            this.$el.hide();
            $(window).unbind('scroll');
            Kimiss.NavBar.hideCenterSeg('sort');
        },
        hotTpl: _.template(AppTplMap.sortHot),
        indexesTpl: _.template(AppTplMap.sortIndexes),
        listTpl: _.template(AppTplMap.sortList),
        addItems:function(models){
            var re = [];
            models.each(function(a){
                re.push(a.attributes);
            });
            this.itemsEL.html(this.listTpl({
                list:re
            }));
        },
        addIndexes:function(indexes){
            this.indexesEL.html(this.indexesTpl({
                indexes:indexes
            }));
        },
        addHot:function(){
            var s = '2076,2071,2068,2075,9036,2072,1884,827,902,1880,1888,2070,1881,2069,1885,881,1893,1894,1988,1882,2083,2042,2197,1883,2041,2171,901,2008,1891,2048,9029,1895,1903,2089,867,2079,1320';
            s = s.split(',');
            s.push('2518,2541,2542,2543,2548,2549,2550');
            this.hotEL.html(this.hotTpl({
                list:s
            }));
        },
        switchMode:function(type){
            var anchor = Kimiss.NavBar.$el.find('.sort-seg [type-anchor='+type+']');
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
            Kimiss.Body.Loading.show();
            this.SortListClt.fetch({
                success:function(clt){
                    me.addIndexes(clt.indexes);
                    me.addItems(clt.models);
                    me.addHot();
                    console.log(arguments);
                    Kimiss.NavBar.loadSortSeg({
                        btnList:[{
                            name:'热门分类',
                            link:'#sort/hot',
                            anchor:'hot'
                        },{
                            name:'全部分类',
                            link:'#sort/all',
                            anchor:'all'
                        }],
                        activeIndex:0
                    });
                    callback();
                    Kimiss.Body.Loading.hide();
                }
            });
        }
    });

    return _v;
});