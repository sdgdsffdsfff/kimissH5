_indexList = Backbone.Collection.extend({
    initialize:function(){
        this.bind('add',this.onItemAdd,this);
    },
    model:_indexModel,
    url:'http://m.kimiss.com/files/eventapi.php?c=KMIOSAPI&rd=10&cly=1',
    ie:1,
    parse:function(resp){
        return resp.de.ty;
    },
    onItemAdd:function(){

    }
});
IndexList = new _indexList;
