define(function(){
    var _router = Backbone.Router.extend({
        routes:{
            '': 'index',
            'index':'index',
            'brand':'brand'
        },
        index:function(){
            Kimiss.Body.switch('Index');
        },
        brand:function(){
            Kimiss.Body.switch('Brand');
        }
    });
    return _router;
});