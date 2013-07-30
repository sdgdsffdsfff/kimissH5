_indexList = Backbone.Collection.extend({
    model:_indexModel,
    url:'http://m.kimiss.com/files/eventapi.php?c=KMIOSAPI&rd=10&cly=1',
    parse:function(resp){
        return resp.de.ty;
    }
});
IndexList = new _indexList;