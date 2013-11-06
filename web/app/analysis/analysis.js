define(function(){
    var analysis = function(options){
        for(var i in options){
            this[i] = options[i];
        }
        this.ID = Math.UUID();
        this.start();
    };
    analysis.prototype = {
        url:'',
        socket:null,
        openFlag:false,
        start:function(){
            var me = this;
            return;
            if(typeof io != 'undefined'){
                try{
                    var socket = io.connect('http://42.96.193.252:3001');
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
                    console.log(e);
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
            this.socket.emit('gesture',{
                model:'Model',
                data:{
                    name:'onOpen',
                    data:{
                        userAgent:navigator.userAgent,
                        url:location.href
                    },
                    id:this.ID,
                    ts:Date.now()
                }
            });
            this.bindAnalyEvents();
        },
        onclose:function(){
            console.log('The WebSocket server has closed!');
            this.openFlag = false;
            this.socket.emit('gesture',{
                model:'Model',
                data:{
                    name:'onClose',
                    id:this.ID,
                    ts:Date.now()
                }
            });
        },
        bindAnalyEvents:function(){
            var me = this;
            me.iteratorAnalyDom(function(i,analy){
                $(analy).attr('data-analy-reg',true);
                $(analy).bind('click',me.socket,me.emit);
            });
//            $(window).scroll(function(){
//                console.log('>>'+$(document.body).scrollTop());
//            });
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
            if(this.openFlag){
                me.iteratorAnalyDom(function(i,analy){
                    if(!$(analy).attr('data-analy-reg')){
                        $(analy).attr('data-analy-reg',true);
                        $(analy).bind('click',me.socket,me.emit);
                    }
                });
            }
        },
        iteratorAnalyDom:function(fn){
            var me = this,
                analys = $('[data-analy]');
            console.log('Analyzed Objects : '+analys.length);
            analys.each(fn);
        },
        onmessage:function(){
            console.log('The WebSocket server response: ');
            console.log(arguments);
        },
        end:function(){},
        gesture:function(){},
        click:function(){},
        emit:function(e){
            var me = this,socket = e.data;
            var s = $(this).attr('data-analy'),model,json;
            if(socket){
                try{
//                    s = s.replaceAll(':','":"').replaceAll(',','","')
//                        .replaceAll('{','{"').replaceAll('}','"}')
//                        .replaceAll('[','["').replaceAll(']','"]');
//                    s = /(\w+)(\{[^\{\}]*\})/g.exec(s);
                    s = s.split('->');
                    model = s[0];
                    json = $.parseJSON(s[1]);
                    json.ts = Date.now();
                    json.id = Kimiss.Analysis.ID;
//                    console.log('emit to model:'+model);
                    console.log('emit '+json.name);
//                    console.log('emit to model==');
                    socket.emit('gesture',{
                        model:model,
                        data:json
                    });
                }catch(e){
                    console.log('parse emitted data error!');
                }
            }else{
                console.log('Gain ws server error!');
            }
        }
    };

    return analysis;
});