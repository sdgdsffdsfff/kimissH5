define(function(){
    var _indexModel  = Backbone.Model.extend({
        url:'http://m.kimiss.com/files/eventapi.php?c=KMIOSAPI&rd=10&cly=1',
        defaults:{
            td:0,
            te:null,
            tl:null,
            tt:0
        }
    });
    return _indexModel;
});