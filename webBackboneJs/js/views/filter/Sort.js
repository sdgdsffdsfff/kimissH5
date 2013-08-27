define(function () {
    return Backbone.View.extend({
        events:{
            'click dl dd a':'changeMode'
        },
        changeMode:function(e){
            var $el = $(e.target);
            $el.addClass('on').siblings('a').removeClass('on');
        },
        load:function(){

        }
    });
});