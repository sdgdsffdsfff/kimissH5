define(function(){
    return Backbone.View.extend({
        tagName:'a',
        className:'index-load-more',
        text:i18n.loadMore_txt,
        loading:false,
        initialize:function(){
            for(var i in this.options){
                this[i] = this.options[i];
            }
            this.render();
        },
        ontap:function(callback){
            callback();
        },
        events:{
            'click':function(){
                var me =this;
                if(this.loading) return;
                me.startAnim();
                this.ontap.call(this,function(){
                    me.stopAnim();
                });
            }
        },
        render:function(){
            this.$el.attr('href','javascript:void(0)');
            this.$el.html(this.text);
        },
        startAnim:function(){
            this.$el.addClass('index-load-more-run');
            this.loading = true;
        },
        stopAnim:function(){
            this.$el.removeClass('index-load-more-run');
            this.loading = false;
        }
    });
});