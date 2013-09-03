var AppTplMap = {},KIMISS_STATUS = 'development';//production
var _templatesMap_ = [
    {
        name: 'body',
        path: '/partials/body.html'
    },
    {
        name: 'brandList',
        path: '/partials/brandList.html'
    },
    {
        name: 'brandIndexes',
        path: '/partials/brandIndex.html'
    },
    {
        name: 'brandHot',
        path: '/partials/brandHot.html'
    },
    {
        name: 'sortList',
        path: '/partials/sortList.html'
    },
    {
        name: 'sortIndexes',
        path: '/partials/sortIndex.html'
    },
    {
        name: 'sortHot',
        path: '/partials/sortHot.html'
    },
    {
        name: 'indexListBody',
        path: '/partials/indexListBody.html'
    },
    {
        name: 'indexListTitle',
        path: '/partials/indexListTitle.html'
    },
    {
        name: 'article',
        path: '/partials/article.html'
    },
    {
        name: 'effect',
        path: '/partials/effect.html'
    },
    {
        name: 'proDetail',
        path: '/partials/proDetail.html'
    },
    {
        name: 'comment',
        path: '/partials/comment.html'
    },
    {
        name: 'productList',
        path: '/partials/products.html'
    },
    {
        name: 'segmentbtn',
        path: '/partials/segmentbtn.html'
    },
    {
        name:'filter_brand_item',
        path:'/partials/filter/brandItem.html'
    },
    {
        name:'filter_effect_item',
        path:'/partials/filter/effectItem.html'
    }
];
var i18n = {
    effect_data:'保湿:893,' +
        '修护:2409,' +
        '净化:1976,' +
        '去角质:2333,' +
        '去黑眼圈:2402,' +
        '受损恢复:207,' +
        '均匀肤色:2554,' +
        '抗氧化:2417,' +
        '抗痘:2337,' +
        '祛痘:2556,' +
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
        '防护:2101',
    hot_brand:'热门品牌',
    all_brand:'全部品牌',
    hot_classify:'热门分类',
    all_classify:'全部分类',

    index_name:'首页',
    brand_name:'品牌',
    classify_name:'分类',
    effect_name:'功效',
    sort_name:'排序',

    search_name:'搜索',

    sort_moreToLess:'多→少',
    sort_lessToMore:'少→多',
    sort_highToLow:'高→低',
    sort_lowToHigh:'低→高',

    commentNum_txt:'点评数',
    level_txt:'星级',
    price_txt:'价格',
    ok_txt:'确认',

    listedTime:'上市时间',
    format:'规格',
    attrs:'属性',
    desc:'简介',
    tiaopinglun:'条评论',
    gong:'共',
    viewMoreComments:'查看更多评论',

    xinpin:'新品',
    mianmo:'面膜',
    jinghua:'精华',
    yanshuang:'眼霜',
    meibai:'美白',
    qudou:'祛痘',
    shoushen:'瘦身',
    more_txt:'更多',

    loadMore_txt:'点击加载更多',
    bianjijingxuan:'编辑精选',
    a:23
};

//function requireApp(){
//    require.config({
//        baseUrl:'js'
//    });
//    require(['views/Kimiss','analysis/analysis','db/DB','../libs/socket.io-min'],function(Kimiss,Analysis,DB,io){
//        var kimiss = new Kimiss({
//            el:$('#app')
//        });
//        window['Km'] = window['Kimiss'] = kimiss;
//        var analysis = new Analysis();
//        analysis.start();
//        Km.Analysis = analysis;
//        kimiss.DB = new DB();
//        setTimeout(function(){
//            kimiss.render();
//            Backbone.history.start();
//        },1);
//    });
//}
//function loadTemplates(){
//    _templatesMap_.each(function(a){
//        var fn = function(s){
//            AppTplMap[arguments.callee.tempName] = s;
//            if(++_templatesMap_L == _templatesMap_.length){
//                requireApp();
//            }
//        };
//        fn.tempName = a.name;
//        $.get(a.path,fn);
//    });
//}