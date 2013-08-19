define(function(){
    return Backbone.View.extend({
        initialize:function(){
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
            this.effectsData = data;
            this.render();
        },
        effectsData:[],
        tpl: _.template(AppTplMap.effect),
        render:function(){
            this.$el.html(this.tpl({
                list:this.effectsData
            }));
        },
        show:function(){
            this.$el.show();
            Kimiss.NavBar.setTitle('功效');
            Kimiss.Body.Loading.hide();
        },
        hide:function(){
            this.$el.hide();
        }
    });
});
















