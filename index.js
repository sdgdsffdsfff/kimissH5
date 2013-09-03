var fs = require('fs');
var http = require('http');
var server = http.createServer();
var express = require('express');
var app = express(server);
var os = require('os');
var port = 80;
app.get('/',function(req,res){
    var headers = {};
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = true;
    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept";
    fs.readFile(__dirname + '/webBackboneJs/index.html',function(err,data){
        if(err) throw err;
        res.writeHead(200, headers);
        res.write(data);
        res.end();
    });
});
app.get('/minJs',function(req,res){
    var path = __dirname+'/webBackboneJs/libs';
    var jquery = fs.readFileSync(path+'/jquery-1.10.2.min.js');
    var iscroll = fs.readFileSync(path+'/iscroll-min.js');
    var underscore = fs.readFileSync(path+'/underscore-min.js');
    var backbone = fs.readFileSync(path+'/backbone-min.js');
    var socketio = fs.readFileSync(path+'/socket.io-min.js');
    var utils = fs.readFileSync(path+'/utils.js');
    var require = fs.readFileSync(path+'/require-min.js');
    var s = jquery + iscroll + underscore + backbone+ socketio + utils + require;
    fs.writeFile(__dirname+'/webBackboneJs/libs/libs.js',s ,'utf-8', function(err){
        if(err) throw err;
        res.write('minJs ok!');
        res.end();
    });
});
app.configure(function(){
    app.use(express.static(__dirname + '/webBackboneJs'));
});

showIP();
app.listen(port);
console.log('listen on port : '+ port);















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