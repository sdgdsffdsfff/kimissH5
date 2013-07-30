define(['views/Button','views/nav/NavBody'],function(Button,NavBody){
    var _navBar = Backbone.View.extend({
        initialize:function(){
            this.MenuBtn = new Button({
                el:$('#menu'),
                clsPressing:'bar-btn-pressing'
            });
            this.MenuBtn.on('tap',function(){
                Kimiss.NavBar.NavBody.toggle();
            });
            this.SearchBtn = new Button({
                el:$('#search'),
                clsPressing:'bar-btn-pressing'
            });
            this.SearchBtn.on('tap',function(){
                Kimiss.SearchView.toggle();
            });
            this.NavBody = new NavBody({
                el:$('#navBody')
            });
        },
        events1:{
            'click #menu':'toogleMenu',
            'touchstart .bar-btn':'barBtnOn',
            'touchend .bar-btn':'barBtnOff',
            'mousedown .bar-btn':'barBtnOn',
            'mouseup .bar-btn':'barBtnOff'
        },
        toogleMenu:function(e){
            NavBody.toggle();
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