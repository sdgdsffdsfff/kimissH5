define(['views/common/Event'],function(Event){
    var v = Backbone.View.extend({
        initialize:function(){
            for(var i in this.options){
                this[i]=this.options[i];
            }
            this.event = new Event({
                hoster:this,
                touchstart:this.touchstart,
                touchmove:this.touchmove,
                touchend:this.touchend
            });
            this.render();
        },
        orientation:'x',//x , y
//        events:{
//            'mousedown':'touchstart',
//            'mouseup':'touchend',
//            'mousemove':'touchmove',
//            'touchstart':'touchstart',
//            'touchend':'touchend',
//            'touchmove':'touchmove'
//        },
        curIndex:0,
        initMarginLeft:0,
        itemLength:0,
        itemWidth:0,
        render:function(){
            var me = this,
                inner = me.$el.children('.carousel-inner'),
                children = inner.children();
            me.itemLength = children.size();
            me.itemWidth = children.outerWidth();
            me.initMarginLeft = -me.itemWidth/2;
            //put the inner div center...
            inner.css({
                webkitTransform:'translate'+this.orientation.toUpperCase()+'('+me.initMarginLeft+'px)'
            });
        },
        touchstart:function(){

        },
        touchmove:function(e){
            var me = this,
                inner = me.$el.children('.carousel-inner');
            if(e.getTouchOrient() == 'x'){
                e.stopPropagation();
                e.preventDefault();
                inner.css({
                    webkitTransition:'-webkit-transform 0s ease',
                    webkitTransform:'translateX('+ (parseInt(me.initMarginLeft-me.itemWidth*me.curIndex)+parseInt(e.getDeltaDis().x))+'px)'
                });
            }
        },
        backward:function(){
            if(this.curIndex>0){
                this.curIndex--;
            }
            this.slide();
        },
        forward:function(){
            if(this.curIndex<this.itemLength-1){
                this.curIndex++;
            }
            this.slide();
        },
        slide:function(){
            var me = this,
                inner = me.$el.children('.carousel-inner');
            inner.css({
                webkitTransition:'-webkit-transform .3s ease',
                webkitTransform:'translateX('+(me.initMarginLeft-me.itemWidth*me.curIndex)+'px)'
            });
        },
        touchend:function(e){
            var me = this,
                inner = me.$el.children('.carousel-inner'),
                dis = e.getDeltaDis();
            if(Math.abs(dis.x)>me.itemWidth/2||Math.abs(e.speed.x)>=0.3){
                if(dis.x > 0){
                    // backward
                    me.backward();
                }
                if(dis.x < 0){
                    // forward
                    me.forward();
                }
            }else{
                me.slide();
            }

        }

    });

    return v;
});