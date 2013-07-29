var fs = require('fs');
var express = require('express');
var data = require('./data');
var app = express();
var port = 3000;
app.get('/',function(req,res){
    res.sendfile(__dirname + '/webBackboneJs/index.html');
});
data.srv(app);
app.configure(function(){
    app.use(express.static(__dirname + '/webBackboneJs'));
});
app.listen(port);
console.log('listen on port : '+ port);
