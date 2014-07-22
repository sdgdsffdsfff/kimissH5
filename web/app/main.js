require.config({
    baseUrl:'app',
    paths:{
        backbone:'../resources/libs/backbone',
        underscore:'../resources/libs/underscore',
//        jquery:'../resources/libs/jquery-1.10.2.min',
        socketIO:'../resources/libs/socket.io',
        iScroll:'../resources/libs/iscroll',
        utils:'../resources/libs/utils',
        adv:'../resources/libs/adv',
        kimiss:'views/Kimiss'
    },
    shim:{
        backbone:{
            deps:['underscore'],
            exports:'Backbone'
        },
        kimiss:{
            deps:[/*'config',*/'backbone',/*'jquery',*/'socketIO','iScroll','utils']
        }
    }
});

require(['kimiss'],function(Kimiss){
    var kimiss = new Kimiss({
        el:$(document.body)
    });
    window['Kimiss'] = kimiss;
    setTimeout(function(){
        kimiss.render();
        Backbone.history.start();
    },1);
});

//require(['config','backbone',/*,'jquery',*/'socketIO','iScroll','utils'],function(){
//    if(KIMISS_STATUS == 'development'){
//        var _templatesMap_L = 0;
//        _templatesMap_.each(function(a){
//            var fn = function(s){
//                AppTplMap[arguments.callee.tempName] = s;
//                if(++_templatesMap_L == _templatesMap_.length){
//                    startup();
//                }
//            };
//            fn.tempName = a.name;
//            $.get(a.path,fn);
//        });
//    }else if(KIMISS_STATUS == 'production'){
//        startup();
//    }
//
//});
//function startup(){
//    require(['kimiss'],function(Kimiss){
//        var kimiss = new Kimiss({
//            el:$('#app')
//        });
//        window['Kimiss'] = kimiss;
//        setTimeout(function(){
//            kimiss.render();
//            Backbone.history.start();
//        },1);
//    });
//}