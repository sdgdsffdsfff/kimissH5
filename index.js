var fs = require('fs');
var http = require('http');
var server = http.createServer();
var express = require('express');
var app = express(server);
var os = require('os');
var cp = require('child_process');
var port = 80;
app.get('/',function(req,res){
    var headers = {};
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = true;
    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept";
    fs.readFile(__dirname + '/web/index.html',function(err,data){
        if(err) throw err;
        res.writeHead(200, headers);
        res.write(data);
        res.end();
    });
});
app.get('/minJs',function(req,res){
    cp.exec('node web/r.js -o web/profile.js',{},function(){// optimize=none
        console.log(arguments);
        res.write('minJs ok!');
        res.end();
    });

});
app.get('/packPartials',function(req,res){
    var s = fs.readFileSync(__dirname+'/web/resources/tpls/tpls.json');
    var arr =JSON.parse(s),l = arr.length,out = {};
    for(var i = 0 , ln = arr.length;i<ln ; i++){
        out[arr[i].name] = fs.readFileSync(__dirname+'/web'+arr[i].path).toString();
    }
    fs.writeFile(__dirname+'/web/resources/tpls/tpls_pro.json',JSON.stringify(out),function(err){
        if(err) throw err;
        res.write('Pack partials ok!');
        res.end();
    });
});
app.configure(function(){
    app.use(express.static(__dirname + '/web'));
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