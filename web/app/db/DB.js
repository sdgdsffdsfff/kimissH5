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
        rel_url:'http://m.kimiss.com/files/product_index.php?c=iapp&rd=28',
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
        getNameByTypeId:function(s,t){
            var me = this,re = s, i, j, k, h,ln,p;
            switch(t){
                case 'bdy':
                    for(i in me.brand_val){
                        p = me.brand_val[i];
                        k = null;
                        for(j = 0,ln = p.length;j<ln;j++){
                            if(parseInt(p[j].id) == parseInt(s)){
                                k = p[j].name;
                                break;
                            }
                        }
                        if(k){
                            re = k;
                            break;
                        }
                    }
                    break;
                case 'pcdy':
                    for(i=0,ln=me.sort_val.length;i<ln;i++){
                        p = me.sort_val[i].arr;
                        h = null;
                        for(j=0,k= p.length;j<k;j++){
                            if(parseInt(p[j].id)==parseInt(s)){
                                h = p[j].name;
                                break;
                            }
                        }
                        if(h){
                            re = h;
                            break;
                        }
                    }
                    break;
                case 'pfdy':
                    for(i= 0;i<me.effect_val.length;i++){
                        var tt = me.effect_val[i];
                        if(parseInt(tt.id) == parseInt(s)){
                            re =  tt.name;
                            break;
                        }
                    }
                    break;
                case 'pst':
                    re = '新品';
                    break;
                default :
                    break;
            }
            return re;
        },
        dbInit:function(){
//            this.db = openDatabase(this.db_name,'1.0','kimiss db, cbsi', 2*1024*1024);
            var rel = JSON.parse(this.rel_val).de,
                rt,
                rel_be = rel.bfy,bel = rel_be.length,
                rel_bc = rel.bcy,bcl = rel_bc.length,
                rel_ce = rel.cfy,cel = rel_ce.length;
//            console.log(rel);
            var re = {
                be:[],//brand-effect
                eb:[],//effect-brand
                bc:[],//brand-classify
                cb:[],//classify-brand
                ce:[],//classify-effect
                ec:[]//effect-classify
            };
            //be
            for(var i = 0;i<bel;i++){
                rt = rel_be[i].split(':');
                if(re.be.hasOwnProperty(rt[0])){
                    re.be[rt[0]].push(rt[1]);
                }else{
                    re.be[rt[0]] = [rt[1]];
                }
            }
            //eb
            for(var i = 0;i<bel;i++){
                rt = rel_be[i].split(':');
                if(re.eb.hasOwnProperty(rt[1])){
                    re.eb[rt[1]].push(rt[0]);
                }else{
                    re.eb[rt[1]] = [rt[0]];
                }
            }
            //bc
            for(var i = 0;i<bcl;i++){
                rt = rel_bc[i].split(':');
                if(re.bc.hasOwnProperty(rt[0])){
                    re.bc[rt[0]].push(rt[1]);
                }else{
                    re.bc[rt[0]] = [rt[1]];
                }
            }
            //cb
            for(var i = 0;i<bcl;i++){
                rt = rel_bc[i].split(':');
                if(re.cb.hasOwnProperty(rt[1])){
                    re.cb[rt[1]].push(rt[0]);
                }else{
                    re.cb[rt[1]] = [rt[0]];
                }
            }
            //ce
            for(var i = 0;i<cel;i++){
                rt = rel_ce[i].split(':');
                if(re.ce.hasOwnProperty(rt[0])){
                    re.ce[rt[0]].push(rt[1]);
                }else{
                    re.ce[rt[0]] = [rt[1]];
                }
            }
            //ec
            for(var i = 0;i<cel;i++){
                rt = rel_ce[i].split(':');
                if(re.ec.hasOwnProperty(rt[1])){
                    re.ec[rt[1]].push(rt[0]);
                }else{
                    re.ec[rt[1]] = [rt[0]];
                }
            }
            this.rel_val = re;



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
            //classify
            var sort = JSON.parse(this.sort_val),st = [];
            sort = sort.de.pcy;
            for(var i1 in sort){
                var t1 = sort[i1],tt1;
                for(var j1 = 0,ln1 = t1.length;j1<ln1;j1++){
                    tt1 = t1[j1].split(':');
                    t1[j1] = {
                        id:tt1[0],
                        name:tt1[1]
                    };
                }
                st.push({
                    title:i1,
                    arr:t1
                });
            }
            this.sort_val = st;
            //effect
            this.effect_val = this.getEffectList();
        },
        getEffectList:function(){
            var s = i18n.effect_data;
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
                    me.initOk('brand');
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
                    me.initOk('sort');
                    console.log('sort_val init ok.');
                }
            });
        },
        getRelValFromServer:function(){
            var me = this;
            $.ajax({
                type : "POST",
                async : false,
                url : this.rel_url,
                cache : false, //默认值true
                dataType : "jsonp",
                jsonp: "callbackfun",
                jsonpCallback:"jsonpCallback",
                success : function(data){
                    var s = JSON.stringify(data);
                    ls.setItem(me.rel_key,s);
                    me.rel_val = s;
                    me.initOk('rel');
                    console.log('rel_val init ok.');
                }
            });
        }
    };
    return db;
});