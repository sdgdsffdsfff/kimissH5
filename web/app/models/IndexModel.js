define(function(){
    var _indexModel  = Backbone.Model.extend({
        defaults:{
            td:0,
            te:null,
            tl:null,
            tt:0
        }
    });
    return _indexModel;
});