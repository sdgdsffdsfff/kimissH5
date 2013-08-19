define(function(){
    var _navBar = Backbone.View.extend({
        initialize:function(){
//            this.MenuBtn = new Button({
//                el:$('#menu'),
//                clsPressing:'bar-btn-pressing'
//            });
//            this.MenuBtn.on('tap',function(){
//                Kimiss.NavBar.NavBody.toggle();
//            });
//            this.SearchBtn = new Button({
//                el:$('#search'),
//                clsPressing:'bar-btn-pressing'
//            });
//            this.SearchBtn.on('tap',function(){
//                Kimiss.SearchView.toggle();
//            });
            this.render();
        },
        events:{
            'click #menu':'toogleMenu'
//            'touchstart .bar-btn':'barBtnOn',
//            'touchend .bar-btn':'barBtnOff',
//            'mousedown .bar-btn':'barBtnOn',
//            'mouseup .bar-btn':'barBtnOff'
        },
        render:function(){
            this.titleEL = this.$el.find('[data-title=1]');
        },
        toogleMenu:function(e){
            Kimiss.NavBody.toggle('menu');
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