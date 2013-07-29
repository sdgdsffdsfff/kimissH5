exports.srv = function(app){
    app.get('/srv',function(req,res){
        res.write('200 lines...');
        res.end();
    });
};