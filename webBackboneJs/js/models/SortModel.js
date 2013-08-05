define(function(){
    var m = Backbone.Model.extend({
        defaults:{
            index:'',
            arr:[]
        }
    });
    return m;
});