define(['views/common/Button','views/nav/NavBody'],function(Button,NavBody){
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
            this.NavBody = new NavBody({
                el:$('#navBody')
            });
        },
        events:{
            'click #menu':'toogleMenu'
//            'touchstart .bar-btn':'barBtnOn',
//            'touchend .bar-btn':'barBtnOff',
//            'mousedown .bar-btn':'barBtnOn',
//            'mouseup .bar-btn':'barBtnOff'
        },
        toogleMenu:function(e){
            Km.Analysis.emit({
                a:{b:['123',455]}
            });
            Kimiss.NavBar.NavBody.toggle();
        },
        showCenterSeg:function(type){
            this.hideTitle();
            if (type == 'brand'){
                this.$el.find('.brand-seg').show();
                this.$el.find('.sort-seg').hide();
            }else if(type == 'sort'){
                this.$el.find('.sort-seg').show();
                this.$el.find('.brand-seg').hide();
            }
        },
        hideCenterSeg:function(type){
            this.showTitle();
            if(type == 'brand')
            this.$el.find('.brand-seg').hide();
            if(type == 'sort')
            this.$el.find('.sort-seg').hide();
        },
        segTpl: _.template(AppTplMap.segmentbtn),
        loadBrandSeg:function(options){
            this.hideTitle();
            this.$el.find('.brand-seg').html(this.segTpl(options)).show();
        },
        loadSortSeg:function(options){
            this.hideTitle();
            this.$el.find('.sort-seg').html(this.segTpl(options)).show();
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