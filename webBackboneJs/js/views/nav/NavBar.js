define(function(){
    var _navBar = Backbone.View.extend({
        initialize:function(){
            this.render();
        },
        events:{
            'click #menu':'toggle',
            'click #search':'toggle'
        },
        render:function(){
            var me = this;
            me.titleEL = this.$el.find('[data-title=1]');
            me.brandIndexesEL = this.$el.find('.brand-indexes-pack');
//            me.filterEL = $('#filter-btn');
//            function setFilterBtnH(){
//                var h = $(window).height() - me.filterEL.outerHeight() - 10;
//                me.filterEL.css('top',h+'px');
//            }
//            setFilterBtnH();
//            $(window).resize(setFilterBtnH);
        },
        showIndexes:function(type){
            this[type+'IndexesEL'].show();
        },
        hideIndexes:function(type){
            this[type+'IndexesEL'].hide();
        },
        toggle:function(e){
            e.stopPropagation();
            e.preventDefault();
            Kimiss.NavBody.toggle(e.target.id);
        },
        showCenterSeg:function(type){
//            this.hideTitle();
            if (type == 'brand'){
                this.setTitle('品牌');
                this.$el.find('.brand-seg').show();
                this.$el.find('.sort-seg').hide();
            }else if(type == 'sort'){
                this.setTitle('分类');
                this.$el.find('.sort-seg').show();
                this.$el.find('.brand-seg').hide();
            }
        },
        hideCenterSeg:function(type){
//            this.showTitle();
            if(type == 'brand'){
                this.$el.find('.brand-seg').hide();
            }
            if(type == 'sort'){
                this.$el.find('.sort-seg').hide();
            }
        },
        segTpl: _.template(AppTplMap.segmentbtn),
        loadBrandSeg:function(options){
//            this.hideTitle();
            this.$el.find('.brand-seg').html(this.segTpl(options)).show();
        },
        loadSortSeg:function(options){
//            this.hideTitle();
            this.$el.find('.sort-seg').html(this.segTpl(options)).show();
        },
        setTitle:function(t){
            this.titleEL.text(t);
        },
        showTitle:function(){
            this.$el.find('[data-title=1]').show();
        },
        hideTitle:function(){
            this.$el.find('[data-title=1]').hide();
        },
        barBtnOn:function(e){
            $(e.target).addClass('bar-btn-pressing');
        },
        barBtnOff:function(e){
            $(e.target).removeClass('bar-btn-pressing');
        }
    });
    return _navBar;
});