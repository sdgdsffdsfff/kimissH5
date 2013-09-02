define(function(){
    return Backbone.View.extend({
        initialize:function(){
            this.render();
        },
        effectsData:[],
        tpl: _.template(AppTplMap.effect),
        render:function(){
            this.$el.html(this.tpl({
                list:Kimiss.DB.effect_val
            }));
        },
        show:function(){
            this.$el.show();
            Kimiss.NavBar.setTitle(i18n.effect_name);
            Kimiss.Body.Loading.hide();
        },
        hide:function(){
            this.$el.hide();
        }
    });
});
















