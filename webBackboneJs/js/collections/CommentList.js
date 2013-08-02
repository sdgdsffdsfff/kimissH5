define(['models/CommentModel'],function(CommentModel){
    var _c = Backbone.Collection.extend({
        url:'http://m.kimiss.com/files/product_index.php?c=iapp&rd=40',
        model:CommentModel,
        parse:function(data){
            data = data.de.cy;
            return data;
        }
    });

    return _c;
});