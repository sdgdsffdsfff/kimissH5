var fs = require('fs');
var express = require('express');
var data = require('./data');
var app = express();
var os = require('os');
var dns = require('dns');
var port = 3000;
app.get('/',function(req,res){
    res.sendfile(__dirname + '/webBackboneJs/index.html');
});
data.srv(app);
app.configure(function(){
    app.use(express.static(__dirname + '/webBackboneJs'));
});
app.listen(port);
showIP();
console.log('listen on port : '+ port);

var io = require('socket.io').listen(3001);
io.sockets.on('connection',function(socket){
    socket.on('/gesture',function(data){
        console.log(data);
    });
});















function showIP(){
    var ifaces=os.networkInterfaces();
    for (var dev in ifaces) {
        var alias=0;
        ifaces[dev].forEach(function(details){
            if (details.family=='IPv4') {
                console.log(dev+(alias?':'+alias:''),details.address);
                ++alias;
            }
        });
    }
}