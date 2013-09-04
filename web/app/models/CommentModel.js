define(function(){
    var _m = Backbone.Model.extend({
        parse:function(data){
            return data;
        }
    });

    return _m;
});