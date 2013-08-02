define(function(){
    var _m = Backbone.Model.extend({
        url:'http://m.kimiss.com/files/product_index.php?c=iapp&rd=31',
        parse:function(data){
            data = data.de;
            data.iy.push(data.iy[0]);
            return data;
        }
    });

    return _m;
});