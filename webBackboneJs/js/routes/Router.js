var _router = Backbone.Router.extend({
    routes:{
        '': 'index',
        'index':'index',
        'brand':'brand'
    },
    index:function(){
        Body.load('index',{
            data:{
                list:[1,1,1,1,1,1,1,1]
            }
        });
    },
    brand:function(){
        Body.load('brand',{
            data:{
                list:[1,1,1,1,1,1,1,1]
            }
        });
    }
});
KmRouter = new _router();
Backbone.history.start();