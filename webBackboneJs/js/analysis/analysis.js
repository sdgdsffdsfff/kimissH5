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
                try{
                    var socket = io.connect('42.96.193.252:3001');
                    socket.on('connect',function(){
                        me.onopen();
                    });
                    socket.on('msg',function(){
                        me.onmessage();
                    });
                    socket.on('error',function(){
                        console.log('connect to gesture server error.');
                    });
                    this.socket = socket;
                }catch(e){
                }
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
            $(window).scroll(function(){
                console.log('>>'+$(document.body).scrollTop());
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
        emit:function(e){
            var socket = e.data;
            var s = $(this).attr('data-analy'),model,json;
            if(socket){
                try{
                    s = s.replaceAll(':','":"').replaceAll(',','","').replaceAll('{','{"').replaceAll('}','"}');
                    s = /(\w+)(\{[^\{\}]*\})/g.exec(s);
                    model = s[1];
                    json = $.parseJSON(s[2]);
                    json.ts = Date.now();
                    console.log('emit to model:'+model);
                    console.log(json);
                    console.log('emit to model==');
                    socket.emit('gesture',{
                        model:model,
                        data:json
                    });
                }catch(e){
                    console.log('parse emitted data error!');
                }

            }
        }
    };

    return analysis;
});