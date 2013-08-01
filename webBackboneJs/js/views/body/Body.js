define(['views/body/Index','views/body/Brand',
    'views/body/Article','views/body/Loading'],function(Index,Brand,Article,Loading){
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
            this.Loading = new Loading({
                el:$('#loading')
            });
            this.modules.Index = new Index({
                el:$('#index')
            });
            this.modules.Brand = new Brand({
                el:$('#brand')
            });
            this.modules.Article = new Article({
                el:$('#article')
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