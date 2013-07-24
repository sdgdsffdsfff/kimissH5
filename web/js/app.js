(function($){

    var AppView = Backbone.View.extend({
        el:$('body'),
        headerTpl: Handlebars.compile($('#navbar-tpl').html()),
        events:{
            'click .navi-index':function(){
                alert(1233);
            }
        },
        initialize:function(){
            this.render();
        },
        render:function(){
            this.$el.html(this.headerTpl({}));
        }
    });
    var App = new AppView;

    var IndexView = Backbone.View.extend({
        tpl: Handlebars.compile($('#index-tpl').html()),

    });

})(jQuery);