define(function () {
    var ls = window.localStorage;
    var db = function(){
        this.init();
    };
    db.prototype = {
        db:null,
        db_name:'KIMISS_DB',
        rel_key:'KIMISS_ALL_RELATIONS_MAP',
        rel_val:null,
        rel_flag:false,
        brand_key:'KIMISS_BRAND_IDNAME_MAP',
        brand_val:null,
        brand_flag:false,
        sort_key:'KIMISS_SORT_IDNAME_MAP',
        sort_val:null,
        sort_flag:false,
        rel_url:'/data/data.json',
        brand_url:'http://m.kimiss.com/files/product_index.php?c=iapp&rd=20',
        sort_url:'http://m.kimiss.com/files/product_index.php?c=iapp&rd=21&st=1',
        init:function(){
            this.rel_val = ls.getItem(this.rel_key);
            this.brand_val = ls.getItem(this.brand_key);
            this.sort_val = ls.getItem(this.sort_key);
            if(this.rel_val){
                this.initOk('rel');
                console.log('rel_val init ok.');
            }else{
                this.getRelValFromServer();
            }
            if(this.brand_val){
                this.initOk('brand');
                console.log('brand_val init ok.');
            }else{
                this.getBrandValFromServer();
            }
            if(this.sort_val){
                this.initOk('sort');
                console.log('sort_val init ok.');
            }else{
                this.getSortValFromServer();
            }
        },
        initOk:function(type){
            this[type+'_flag'] = true;
            if(this.rel_flag&&this.brand_flag&&this.sort_flag){
                this.dbInit();
            }
        },
        dbInit:function(){
//            this.db = openDatabase(this.db_name,'1.0','kimiss db, cbsi', 2*1024*1024);
            this.rel_val = JSON.parse(this.rel_val);
            //brand
            var  brand = JSON.parse(this.brand_val);
            brand = brand.de.by;
            for(var i in brand){
                var t = brand[i],tt;
                for(var j = 0,ln = t.length;j<ln;j++){
                    tt = t[j].split(':');
                    t[j] = {
                        id:tt[0],
                        name:tt[1]
                    };
                }
            }
            this.brand_val = brand;
            this.sort_val = JSON.parse(this.sort_val);
        },
        getEffectList:function(){
            var s = '保湿:893,' +
                '修护:2409,' +
                '净化:1976,' +
                '去角质:2333,' +
                '去黑眼圈:2402,' +
                '受损恢复:207,' +
                '均匀肤色:2554,' +
                '抗氧化:2417,' +
                '抗痘:2337,' +
                '紧肤:2188,' +
                '抗菌:2457,' +
                '抗衰老:2108,' +
                '控油:2429,' +
                '敏感肌肤:2557,' +
                '晒后修复:1985,' +
                '柔顺:211,' +
                '水油平衡:2358,' +
                '消浮肿:2407,' +
                '祛斑:1974,' +
                '深层清洁:2513,' +
                '滋养:209,' +
                '滋润:2452,' +
                '爽肤:1960,' +
                '祛除黑头:1982,' +
                '细致毛孔:2356,' +
                '美白:2488,' +
                '舒缓:2497,' +
                '防晒:1962,' +
                '防护:2101';
            var data = s.split(',');
            data.each(function(a,i){
                var t = a.split(':');
                data.splice(i,1,{
                    id:t[1],
                    name:t[0]
                });
            });
            return data;
        },
        getBrandValFromServer:function(){
            var me = this;
            $.ajax({
                type : "POST",
                async : false,
                url : this.brand_url,
                cache : false, //默认值true
                dataType : "jsonp",
                jsonp: "callbackfun",
                jsonpCallback:"jsonpCallback",
                success : function(data){
                    var s = JSON.stringify(data);
                    ls.setItem(me.brand_key,s);
                    me.brand_val = s;
                    this.initOk('brand');
                    console.log('brand_val init ok.');
                }
            });
        },
        getSortValFromServer:function(){
            var me = this;
            $.ajax({
                type : "POST",
                async : false,
                url : this.sort_url,
                cache : false, //默认值true
                dataType : "jsonp",
                jsonp: "callbackfun",
                jsonpCallback:"jsonpCallback",
                success : function(data){
                    var s = JSON.stringify(data);
                    ls.setItem(me.sort_key,s);
                    me.sort_val = s;
                    this.initOk('sort');
                    console.log('sort_val init ok.');
                }
            });
        },
        getRelValFromServer:function(){
            var me = this;
            $.get(this.rel_url,function(data){
                ls.setItem(me.rel_key,data);
                me.rel_val = data;
                this.initOk('rel');
                console.log('rel_val init ok.');
            },'text');
        }
    };
    return db;
});