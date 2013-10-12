/**
 * User: daisikey
 * Date: 13-10-12
 */
define(function () {
    return Backbone.View.extend({
        initialize:function(){
            this.render();
        },
        tpl: _.template(AppTplMap.login),
        render:function(){
            this.$el.html(this.tpl({}));
        }
    });
});