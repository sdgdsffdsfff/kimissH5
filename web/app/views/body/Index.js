define(['collections/IndexList','views/common/LoadMore','views/common/adv'],function(IndexList,LoadMore,Adv){
    var _index = Backbone.View.extend({
        IndexList:new IndexList(),
        Adv:new Adv(),
        className:'index-list',
        titleTpl: _.template(AppTplMap.indexListTitle),
        bodyTpl: _.template(AppTplMap.indexListBody),
        hasLoaded:false,
        items:[],
        events:{

        },
        addTitle:function(){
            this.$el.html(this.titleTpl());
        },
        addItems:function(models){
            var me = this,re = [];
            if(this.loadMoreCmp){
                this.loadMoreCmp.remove();
            }
            models.each(function(model){
                var t = new Date(parseInt(model.attributes.tt)*1000);
                model.attributes.date_top = t.getFullYear()+'.'+ (t.getMonth()+1);
                model.attributes.date_bottom = t.getDate();
                re.push(model.attributes);
            });
            me.$el.html(me.$el.html()+this.bodyTpl({
                list:re
            }));
            this.loadMoreCmp = this.getLoadMore();
            me.$el.append(this.loadMoreCmp.$el);
        },
        show:function(){
            var me = this;
            this.$el.show();
            if(!this.hasLoaded){
                this.load();
                this.hasLoaded = true;
            }
            Kimiss.NavBar.setTitle('');
            setTimeout(function(){me.adv();},1000);
        },
        hide:function(){
            this.$el.hide();
        },
        loadMoreCmp:null,
        getLoadMore:function(){
            var me = this;
            return new LoadMore({
                ontap:function(callback){
                    me.loadMore(callback);
                }
            });
        },
        pageNum:1,
        loadMore:function(callback){
            var me = this;
            this.IndexList.fetch({
                data:{
                    ie:me.pageNum++
                },
                success:function(clt){
                    var l = clt.models.length;
                    if(l < 10&&this.loadMoreCmp){
                        this.loadMoreCmp.remove();
                    }
                    if(me.pageNum <= 2){
                        me.addTitle();
                    }
                    me.addItems(clt.models);
                    Kimiss.Analysis.refreshAnalyEvents();
                    callback();
                },
                error:function(){
                    alert('Index init error.');
                }
            });
        },
        load:function(){
            var me = this;
            Kimiss.Body.Loading.show();
            this.loadMore(function(){
                Kimiss.Body.Loading.hide();
            });
        },
        readCon:function(par,url){
            $.ajax({
                type : "GET",
                async : false,
                url : url,
                data : {},
                cache : false, //Ä¬ÈÏÖµtrue
                dataType : "html",
                success : function(data){
                    var str1 = data.indexOf("<a ");
                    var str2 = data.indexOf("</body>");
                    var returnData = data.substring(str1,str2);
                    $(par).append(returnData);

                },
                error:function(){console.log("data error!");}
            });

        },
        adv:function(){
            //adv
            var me = this;
            me.readCon("#top_ad","http://localhost/OL_SYS_18686.php");
            me.readCon("#overlay_ad","http://localhost/OL_SYS_18687.php");
            var isTopShowed = me.Adv.cookie('_M_OL_TOPAD');
            console.log(me.Adv.cookie('_M_OL_TOPAD'))
            if(isTopShowed==1) {
                $('#top_ad').hide()
            }else{
                me.Adv.addCloseBtn("#top_ad","top_close_ad",function(){
                    var expdate = new Date;
                    expdate.setDate(expdate.getDate()+1);
                    expdate.setHours(0);
                    expdate.setMinutes(0);
                    expdate.setSeconds(0);
                    me.Adv.cookie('_M_OL_TOPAD',1,{ expires:expdate,path:"/"});
                });
            }
            var isLayShowed = this.Adv.cookie('_M_OL_LAYAD');
            if(isLayShowed==1) {
                $('#overlay_ad').hide()
            }else{
                this.Adv.addCloseBtn("#overlay_ad","overlay_close_ad",
                    function(){
                        var expdate = new Date;
                        expdate.setDate(expdate.getDate()+1);
                        expdate.setHours(0);
                        expdate.setMinutes(0);
                        expdate.setSeconds(0);
                        me.Adv.cookie('_M_OL_LAYAD',1,{ expires:expdate,path:"/"});
                    },function(){
                        setTimeout(function(){ $('#overlay_ad').hide()},5*1000);
                    });
            }
        }
    });

    return _index;
});

