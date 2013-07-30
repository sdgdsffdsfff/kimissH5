define(function(){
    var _searchView = Backbone.View.extend({
        clsShow:'searchView-show',
        status:'close',
        toggle:function(){
            if(this.status == 'close'){
                this.$el.addClass(this.clsShow);
                this.status = 'open';
            }else if(this.status == 'open'){
                this.$el.removeClass(this.clsShow);
                this.status = 'close';
            }
        }
    });
    return _searchView;
});

