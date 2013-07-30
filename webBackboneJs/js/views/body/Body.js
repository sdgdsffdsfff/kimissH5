var _body = Backbone.View.extend({
    modules:['index','brand'],
    switch:function(name){
        for(var i in this.modules){
            if(i == name){
                this.$el.find('#'+name).show();
            }else{
                this.$el.find('#'+i).hide();
            }
        }
    }
});
Body = new _body({
    el:$('#body')
});