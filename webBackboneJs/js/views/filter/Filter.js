define(function(){
    return Backbone.View.extend({
        show:function(){},
        hide:function(){},
        toggle:function(){
            this.$el.toggle(300);
        }
    });
});