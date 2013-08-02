define(function(){
    var _articleModel = Backbone.Model.extend({
        url:'http://m.kimiss.com/files/eventapi.php?c=KMIOSAPI&rd=11',
        defaults:{
            td:null,
            te:null,
            tl:null,
            tt:null,
            tg:null,
            to:null,
            tn:null,
            tp:0
        },
        parse:function(data){
            data = data.de;
            var t = parseInt(data.tt);
            if(data&&!isNaN(t)){
                t = new Date(t*1000);
                data.tt = t.getFullYear()+'-'+ (t.getMonth()+1)+'-'+ t.getDate();
            }
            return data;
        }
    });
    return _articleModel;
});