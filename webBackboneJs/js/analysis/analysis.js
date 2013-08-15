define(function(){
    var analysis = function(options){
        for(var i in options){
            this[i] = options[i];
        }
    };
    analysis.prototype = {
        url:'',
        socket:null,
        initialize:function(){},
        openFlag:false,
        start:function(){
            var me = this;
            if(io){
                var socket = io.connect('42.96.193.252:3001');
                socket.on('connect',function(){
                    me.onopen();
                });
                socket.on('msg',function(){
                    me.onmessage();
                });
                this.socket = socket;
            }
        },
        onopen:function(){
            console.log('The WebSocket server has opened!');
            var me = this;
            this.openFlag = true;
            this.socket.on('disconnect',function(){
                me.onclose();
            });
            this.bindAnalyEvents();
        },
        bindAnalyEvents:function(){
            var me = this;
            me.iteratorAnalyDom(function(i,analy){
                $(analy).attr('data-analy-reg',true);
                $(analy).bind('click',me.socket,me.emit);
            });
        },
        unbindAnalyEvents:function(){
            var me = this;
            me.iteratorAnalyDom(function(i,analy){
                $(analy).attr('data-analy-reg',false);
                $(analy).unbind('click',me.socket,me.emit);
            });
        },
        refreshAnalyEvents:function(){
            var me = this;
            me.iteratorAnalyDom(function(i,analy){
                if(!$(analy).attr('data-analy-reg')){
                    $(analy).bind('click',me.emit);
                }
            });
        },
        iteratorAnalyDom:function(fn){
            var me = this,
                analys = $('[data-analy]');
            analys.each(fn);
        },
        onmessage:function(){
            console.log('The WebSocket server response: ');
            console.log(arguments);
        },
        onclose:function(){
            console.log('The WebSocket server has closed!');
            this.openFlag = false;
        },
        end:function(){},
        gesture:function(){},
        click:function(){},
        emit:function(socket){
            var s = $(this).attr('data-analy');

            if(socket){
//                socket.emit('gesture',{});
                console.log(s.replace());

            }
        }
    };

    return analysis;
});