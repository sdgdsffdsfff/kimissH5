define(['views/nav/navBar',
    'views/nav/NavBody',
    'views/search/Search',
    'views/body/Body',
    'routes/Router'],function(NavBar,NavBody,SearchView,Body,Router){
    //eric branch test...
    var _kimiss = Backbone.View.extend({
        bodyTpl:_.template(AppTplMap.body),//_.template($('#body-tpl').html()),
        events:{
            'click #filter-btn':function(){
                Kimiss.NavBody.toggle('filter');
            },
            'click #back-btn':function(){
                history.back();
            }
        },
        render:function(){
            var me = this;
            me.$el.html(
                    this.bodyTpl({
                        i18n:i18n
                    })
            );
            this.NavBar = new NavBar({
                el:$('#navBar')
            });
            this.NavBody = new NavBody({
                el:$('#navBody')
            });
            this.SearchView = new SearchView({
                el:$('#search-view')
            });
            this.Body = new Body({
                el:$('#body')
            });
            this.$toolbar = $('#btm-toolbar');
            this.Router = new Router();
            return this;
        },
        slide:function(type){
            var per = 0,w = 1;
            if(type == 'menu'){
                per = 1;
            }
            if(type == 'search'||type == 'filter'){
                per = -1;
            }
//            w = $(window).width()/100;
            this.NavBar.$el.css({
                webkitTransform:'translate3d('+per*80+'%,0,0)',
                mozTransform:'translate3d('+per*80+'%,0,0)'
            });
            this.Body.$el.css({
                webkitTransform:'translate3d('+per*80+'%,0,0)',
                mozTransform:'translate3d('+per*80+'%,0,0)'
            });
            this.$toolbar.css({
                webkitTransform:'translate3d('+per*80+'%,0,0)',
                mozTransform:'translate3d('+per*80+'%,0,0)'
            });
//            this.NavBar.$el.css({
//                webkitTransform:'translate3d('+per*80*w+'px,0,0)'
//            });
//            this.Body.$el.css({
//                webkitTransform:'translate3d('+per*80*w+'px,0,0)'
//            });
        }
    });
    return _kimiss;
});
