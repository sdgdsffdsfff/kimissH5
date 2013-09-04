define(function(){
    var _m = Backbone.Model.extend({
        parse:function(data){
            var psy = '';
            $.each(data.psy,function(i,a){
                psy += a.replace(':','/\uffe5')+' '
            });
            data.psy = psy;
            data.pt = Math.round(data.pt);
        }
    });

    return _m;
});