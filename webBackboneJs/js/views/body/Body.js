define(['views/body/index/Index','views/body/brand/Brand'],function(Index,Brand){
    var _body = Backbone.View.extend({
        initialize:function(){
            this.render();
        },
        modules:{
        },
        getModule:function(name){
            return this.modules[name];
        },
        render:function(){
            this.modules.Index = new Index({
                el:$('#index')
            });
            this.modules.Brand = new Brand({
                el:$('#brand')
            });
        },
        switch:function(name){
            for(var i in this.modules){
                if(i == name){
                    this.modules[i].show();
                }else{
                    this.modules[i].hide();
                }
            }
        }
    });
    return _body;
});