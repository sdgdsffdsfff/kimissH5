define(function(){
    var _searchView = Backbone.View.extend({
        clsShow:'searchView-show',
        status:'close',
        events:{
            'click a':'submit',
            'submit form':'submit'
        },
        click:function(e){
            var v = this.$el.find('input').val();
            this.$el.find('a.submit-btn').attr('href','#productList/s='+v+'&t=pswy');
        },
        submit:function(e){
            var me = this,v = this.$el.find('input').val();
            Kimiss.slide();
            setTimeout(function(){
//                location.hash = '#productList/s='+v+'&t=pswy';
                me.$el.find('input').blur();
                Kimiss.Router.navigate('productList/s='+encodeURIComponent(v)+'&t=pswy',{
                    trigger:true
                });
                console.log(Kimiss.Analysis.emit);
                Kimiss.Analysis.socket.emit('gesture',{
                    model:'Model',
                    data:{
                        name:'search',
                        data:{
                            field:encodeURIComponent(v)
                        },
                        id:Kimiss.Analysis.ID,
                        ts:Date.now()
                    }
                });
            },300);
            return false;
        },
        initialize:function(){
            this.render();
        },
        render:function(){

        }
    });
    return _searchView;
});

