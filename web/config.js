(function(){
//    var MODE = 'PRO',//PRO  DEV
//        lang = 'cn';// cn en
//    var host = 'http://new-icon.ol-img.com/article/kimiss-m/';
    var MODE = 'DEV',//PRO  DEV
        lang = 'en';// cn en
    var host = 'http://m1.kimiss.com/';
    function write(content) {
        document.write(content);
    }
    write('<link rel="stylesheet" href="'+host+'resources/css/bootstrap.css"/>');
    write('<link rel="stylesheet" href="'+host+'resources/css/app.css"/>');
    write('<link rel="stylesheet" href="'+host+'resources/css/icons.css"/>');
    $.ajax({
        type : "get",
        async : false,
        url : host+'resources/i18n/'+lang+'.json',
        cache : false, //default true
        dataType : "jsonp",
        jsonp: "callbackfun",
        jsonpCallback:"jsonpCallback",
        success : function(data){
            window['i18n'] = data;
            switch(MODE){
                case 'DEV':
                    $.ajax({
                        type:'get',
                        url:host+'resources/tpls/tpls.json',
                        dataType : "jsonp",
                        jsonp: "callbackfun",
                        jsonpCallback:"jsonpCallback",
                        success:function(tpls){
                            var _templatesMap_L = 0,AppTplMap = {};
                            $.each(tpls,function(i,a){
                                var fn = function(s){
                                    AppTplMap[arguments.callee.tempName] = s;
                                    if(++_templatesMap_L == tpls.length){
                                        window['AppTplMap'] = AppTplMap;
                                        addScript(host+'resources/libs/require.js',{
                                            'data-main':host+'app/main'
                                        });
                                    }
                                };
                                fn.tempName = a.name;
                                $.get(a.path,fn);
                            });
                        }
                    });
//                    $.get(host+'resources/tpls/tpls.json',function(tpls){
//                        var _templatesMap_L = 0,AppTplMap = {};
//                        $.each(tpls,function(i,a){
//                            var fn = function(s){
//                                AppTplMap[arguments.callee.tempName] = s;
//                                if(++_templatesMap_L == tpls.length){
//                                    window['AppTplMap'] = AppTplMap;
//                                    addScript(host+'resources/libs/require.js',{
//                                        'data-main':'app/main'
//                                    });
//                                }
//                            };
//                            fn.tempName = a.name;
//                            $.get(a.path,fn);
//                        });
//                    },'json');
                    break;
                case 'PRO':
                    $.ajax({
                        type:'get',
                        url:host+'resources/tpls/tpls_pro.json',
                        dataType : "jsonp",
                        jsonp: "callbackfun",
                        jsonpCallback:"jsonpCallback",
                        success:function(tpls){
                            window['AppTplMap'] = tpls;
                            addScript(host+'resources/libs/require.js',{
                                'data-main':host+'app/main-build'
                            });
                        }
                    });
//                    $.get(host+'resources/tpls/tpls_pro.json',function(tpls){
//                        window['AppTplMap'] = tpls;
//                        addScript(host+'resources/libs/require.js',{
//                            'data-main':host+'app/main-build'
//                        });
//                    },'json');
                    break;
                default:
                    break;
            }
        }
    });
//    $.get(host+'resources/i18n/cn.json',
//        function(data){
//        window['i18n'] = data;
//        switch(MODE){
//            case 'DEV':
//                $.get(host+'resources/tpls/tpls.json',function(tpls){
//                    var _templatesMap_L = 0,AppTplMap = {};
//                    $.each(tpls,function(i,a){
//                        var fn = function(s){
//                            AppTplMap[arguments.callee.tempName] = s;
//                            if(++_templatesMap_L == tpls.length){
//                                window['AppTplMap'] = AppTplMap;
//                                addScript(host+'resources/libs/require.js',{
//                                    'data-main':'app/main'
//                                });
//                            }
//                        };
//                        fn.tempName = a.name;
//                        $.get(a.path,fn);
//                    });
//                },'json');
//                break;
//            case 'PRO':
//                $.get(host+'resources/tpls/tpls_pro.json',function(tpls){
//                    window['AppTplMap'] = tpls;
//                    addScript(host+'resources/libs/require.js',{
//                        'data-main':host+'app/main-build'
//                    });
//                },'json');
//                break;
//            default:
//                break;
//        }
//    },'json');
    function addScript(url,attrs){
        var script = document.createElement('script');
        $(script).attr(attrs);
        script.src = url;
        $(document.head).append(script);
    }
})();