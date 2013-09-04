define(function(){
    var _loading = Backbone.View.extend({
        hide:function(){
            this.$el.hide();
        },
        show:function(){
            this.$el.show();
            this.$el.height($(window).height());
        }
    });
    return _loading;
});