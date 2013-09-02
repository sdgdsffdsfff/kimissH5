define(['collections/SortList'],function(SortListClt){
    var _sortIndex = Backbone.View.extend({
        tpl: _.template(AppTplMap.sortIndexes),
        events:{
            'click ul li':function(e){
                Kimiss.Body.modules.Sort.setScrollTop($(e.target).html());
                $(e.target).addClass('on').siblings('li').removeClass('on');
                e.stopPropagation();
            }
        },
        addIndexes:function(indexes){
            this.$el.html(this.tpl({
                indexes:indexes
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
                $('body').scrollTop(top-80);
            }
        },
        render:function(){
            this.indexesEL = $('#sort-indexes-pack');
            this.itemsEL = this.$el.find('.sort-items-pack');
            this.allEL = this.$el.find('.sort-all');
            this.hotEL = this.$el.find('.sort-hot');
            this.SortIndex = new this.SortIndex({
                el:this.indexesEL
            });
        },
        scrolling:function(){
            var me = this;
            this.itemsEL.children('dl').each(function(i,a){
                if($(a).offset().top + $(a).height()>= $('body').scrollTop()+81){
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
            me.indexesEL.show();
            Kimiss.NavBar.showCenterSeg('sort');
            if(!this.hasLoaded){
                this.load(function(){
                    me.switchMode(type);
                    Kimiss.Analysis.refreshAnalyEvents();
                });
                this.hasLoaded = true;
                Kimiss.$el.append(me.indexesEL);
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
            this.hotEL.width(w - w%70);
        },
        hide:function(){
            this.$el.hide();
            this.indexesEL.hide();
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
            this.SortIndex.addIndexes(indexes);
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
                this.indexesEL.hide();
            }else if(type == 'all'){
                this.allEL.show();
                this.hotEL.hide();
                this.indexesEL.show();
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
                    Kimiss.NavBar.loadSortSeg({
                        btnList:[{
                            name:i18n.hot_classify,
                            link:'#sort/hot',
                            anchor:'hot'
                        },{
                            name:i18n.all_classify,
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