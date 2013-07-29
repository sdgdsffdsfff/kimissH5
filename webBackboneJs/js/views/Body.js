var _body = Backbone.View.extend({
    modules:{
        index:_.template($('#index-tpl').html()),
        brand:_.template($('#brand-tpl').html())
    },
    load:function(name,options){
        var tpl = this.modules[name];
        options = options||{};
        if(tpl){
            window.scrollTo(0,0);
            for(var i in this.modules){
                if(i == name){
                    this.$el.find('#'+name).html(tpl(options.data||{})).show();
                }else{
                    this.$el.find('#'+i).hide();
                }
            }

        }
    }
});
Body = new _body({
    el:$('#body')
});