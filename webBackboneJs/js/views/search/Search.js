define(function(){
    var _searchView = Backbone.View.extend({
        clsShow:'searchView-show',
        status:'close',
        events:{
            'click a':'click',
            'submit form':'submit'
        },
        click:function(e){
            var v = this.$el.find('input').val();
            this.$el.find('a.submit-btn').attr('href','#productList/s='+v+'&t=pswy');
        },
        submit:function(e){
            var v = this.$el.find('input').val();
            this.click();
            location.hash = '#productList/s='+v+'&t=pswy';
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

