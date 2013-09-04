(function(){
    var MODE = 'PRO';//PRO  DEV
    function write(content) {
        document.write(content);
    }
    write('<link rel="stylesheet" href="resources/css/bootstrap.css"/>');
    write('<link rel="stylesheet" href="resources/css/app.css"/>');
    write('<link rel="stylesheet" href="resources/css/icons.css"/>');

    $.get('resources/i18n/cn.json',function(data){
        window['i18n'] = data;
        switch(MODE){
            case 'DEV':
                $.get('resources/tpls/tpls.json',function(tpls){
                    var _templatesMap_L = 0,AppTplMap = {};
                    $.each(tpls,function(i,a){
                        var fn = function(s){
                            AppTplMap[arguments.callee.tempName] = s;
                            if(++_templatesMap_L == tpls.length){
                                window['AppTplMap'] = AppTplMap;
                                addScript('resources/libs/require.js',{
                                    'data-main':'app/main'
                                });
                            }
                        };
                        fn.tempName = a.name;
                        $.get(a.path,fn);
                    });
                },'json');
                break;
            case 'PRO':
                $.get('resources/tpls/tpls_pro.json',function(tpls){
                    window['AppTplMap'] = tpls;
                    addScript('resources/libs/require.js',{
                        'data-main':'app/main-build'
                    });
                },'json');
                break;
            default:
                break;
        }
    },'json');
    function addScript(url,attrs){
        var script = document.createElement('script');
        $(script).attr(attrs);
        script.src = url;
        $(document.head).append(script);
    }
})();