define(function(){
    var _brandModel = Backbone.Model.extend({
        defaults:{
            index:'',
            arr:[]
        }
    });
    return _brandModel;
});