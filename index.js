var fs = require('fs');
var express = require('express');
var app = express();
app.get('/',function(req,res){
    res.sendfile(__dirname + '/webBackboneJs/index.html');
});
app.configure(function(){
    app.use(express.static(__dirname + '/webBackboneJs'));
});
app.listen(3000);
