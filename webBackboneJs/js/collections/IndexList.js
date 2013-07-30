define(['views/body/IndexListItem','models/IndexModel'],function(IndexListItem,IndexModel){
    var _indexList = Backbone.Collection.extend({
        initialize:function(){
            this.bind('add',this.onItemAdd,this);
        },
        model: IndexModel ,
        url:'http://m.kimiss.com/files/eventapi.php?c=KMIOSAPI&rd=10&cly=1',
        ie:1,
        parse:function(resp){
            return resp.de.ty;
        },
        onItemAdd:function(model){
            Kimiss.Body.getModule('Index').addItem(new IndexListItem({
                model:model
            }));
        }
    });
    return _indexList;
});
