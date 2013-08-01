define(function(){
    var _button = Backbone.View.extend({
        mdown:null,
        initialize:function(){
            for(var i in this.options){
                this[i] = this.options[i];
            }
//            this.clsPressing = this.options.clsPressing;
//            this.className = this.options.className;
//            this.text = this.options.text;
            this.render();
        },
        render:function(){
            this.$el.text(this.text);
        },
        clsPressing:null,
        events:{
            'mousedown':'touchstart',
            'mouseup':'touchend',
            'touchstart':'touchstart',
            'touchend':'touchend',
            'all':function(){
                console.log(arguments);
            },
            'tap':function(e){}
        },
        touchstart:function(e){
            var me = this;
            e.preventDefault();
            e.stopPropagation();
            me.$el.addClass(this.clsPressing);
            this.mdown = {
                ts:Date.now()
            };
        },
        touchend:function(e){
            e.preventDefault();
            e.stopPropagation();
            this.$el.removeClass(this.clsPressing);
            if(this.mdown&&Date.now() - this.mdown.ts<500){
                this.trigger('tap',[e]);
                this.mdown = null;
            }
        }
    });
    return _button;
});
