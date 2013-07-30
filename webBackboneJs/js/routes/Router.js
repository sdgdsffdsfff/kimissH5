var _router = Backbone.Router.extend({
    routes:{
        '': 'index',
        'index':'index',
        'brand':'brand'
    },
    index:function(){
        Body.switch('index');
    },
    brand:function(){
        Body.switch('brand');
    }
});
KmRouter = new _router();
Backbone.history.start();