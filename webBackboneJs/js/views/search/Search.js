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

