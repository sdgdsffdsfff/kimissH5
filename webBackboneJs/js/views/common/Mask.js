define(['views/common/Event'],function(Event){
    return Backbone.View.extend({
        initialize:function(){
            var me = this;
            this.event = new Event({
                hoster:me
            });
        },
        show:function(){
            this.$el.show();
        },
        hide:function(){
            this.$el.hide();
        },
        touchstart:function(e){
            e.preventDefault();
            e.stopPropagation();
        },
        touchmove:function(e){
            e.preventDefault();
            e.stopPropagation();
        },
        touchend:function(e){
            e.preventDefault();
            e.stopPropagation();
        }
    });
});