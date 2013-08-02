define(['views/body/Index','views/body/Brand',
    'views/body/Article','views/body/Loading',
    'views/body/ProDetail'],function(Index,Brand,Article,Loading,ProDetail){
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
            this.modules.ProDetail = new ProDetail({
                el:$('#proDetail')
            });
        },
        switch:function(name,params){
            for(var i in this.modules){
                var m = this.modules[i];
                if(i == name){
                    m.show.apply(m,params);
                }else{
                    m.hide.apply(m,params);
                }
            }
        }
    });
    return _body;
});