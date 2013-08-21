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
            var v = this.$el.find('input').val();
            Kimiss.slide();
            setTimeout(function(){
                location.hash = '#productList/s='+v+'&t=pswy';
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

