define(function () {
    return Backbone.View.extend({
        events:{
            'click dl dd a':'changeMode'
        },
        sele_id:-1,
        changeMode:function(e){
            var $el = $(e.target);
            $el.addClass('on').siblings('a').removeClass('on').parent().parent().siblings('dl')
                .find('.middle').addClass('on').siblings('a').removeClass('on');
            this.sele_id = $el.attr('data-sort-id');
        },
        load:function(){

        }
    });
});