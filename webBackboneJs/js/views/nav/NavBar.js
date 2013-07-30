var _navBar = Backbone.View.extend({
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
NavBar = new _navBar({
    el:$('#navBar')
});