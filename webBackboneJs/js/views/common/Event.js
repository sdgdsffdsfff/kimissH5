define(function(){
    var event = function(options){
        for(var i in options){
            this[i] = options[i];
        }
        this.init();
    };
    event.prototype = {
        init:function(){
            var me = this;
            this.hoster.$el
                .bind('mousedown',function(e){
                    me._touchstart(e);
                })
                .bind('mousemove',function(e){
                    me._touchmove(e);
                })
                .bind('mouseup',function(e){
                    me._touchend(e);
                })
                .bind('touchstart',function(e){
                    me._touchstart(e);
                })
                .bind('touchmove',function(e){
                    me._touchmove(e);
                })
                .bind('touchend',function(e){
                    me._touchend(e);
                })
            ;
        },
        touchdown:false,
        startp:null,
        curp:null,
        pA:null,
        originEvent:null,
        speed:{
            x:0,
            y:0
        },
        touchstart:function(){},
        touchmove:function(){},
        touchend:function(){},
        _touchstart:function(e){
            this.originEvent = e;
            this.touchdown = true;
            this.startp = this.getP(e);
            this.curp = this.startp;
            this.pA = this.startp;
            this.touchstart.call(this.hoster,this);
        },
        _touchmove:function(e){
            if(this.touchdown == true){
                this.originEvent = e;
                this.curp = this.getP(e);
                var deltaTs = this.curp.ts- this.pA.ts;
                if(deltaTs>50){
                    this.speed = {
                        x: (this.curp.x-this.pA.x)/(deltaTs),
                        y: (this.curp.y-this.pA.y)/(deltaTs)
                    };
                    this.pA = this.curp;
                }
                this.touchmove.call(this.hoster,this);
            }
        },
        _touchend:function(e){
            this.originEvent = e;
            this.touchdown = false;
            this.touchend.call(this.hoster,this);
        },
        getDeltaDis:function(){
            return {
                x:this.curp.x - this.startp.x,
                y:this.curp.y - this.startp.y,
                ts:this.curp.ts - this.startp.ts
            };
        },
        getAbsDeltaDis:function(){
            var d = this.getDeltaDis();
            return {
                x:Math.abs(d.x),
                y:Math.abs(d.y),
                ts: d.ts
            };
        },
        getP:function(e){
            e = e.originalEvent;
            return {
                x: e.touches? e.touches[0].pageX: e.pageX,
                y: e.touches? e.touches[0].pageY: e.pageY,
                ts: Date.now()
            };
        },
        getTrans:function(el){
            var s = getComputedStyle(el, null)['webkitTransform'].replace(/[^0-9\-.,]/g, '').split(','),
                x = 0,y = 0;
            if (isArray(s) && s.length >= 5) {
                x = parseInt(s[4]);
                y = parseInt(s[5]);
            }
            return {
                x:x,
                y:y
            };
        },
        preventDefault:function(){
            this.originEvent.preventDefault();
        },
        stopPropagation:function(){
            this.originEvent.stopPropagation();
        },
        getTouchOrient:function(){
            var delta = this.getAbsDeltaDis();
            return delta.x>delta.y?'x':'y';
        }
    };
    return event;
});