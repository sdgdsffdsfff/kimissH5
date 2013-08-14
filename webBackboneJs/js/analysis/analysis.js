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
                socket.on('connect',this.onopen);
                socket.on('msg',this.onmessage);
                this.socket = socket;
            }
        },
        onopen:function(){
            console.log('The WebSocket server has opened!');
            this.openFlag = true;
            this.socket.on('disconnect',this.onclose);
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
        emit:function(data){
            if(this.socket){
                this.socket.emit('gesture',data);
            }
        }
    };

    return analysis;
});