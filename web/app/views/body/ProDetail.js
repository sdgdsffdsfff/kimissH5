define(['models/ProDetailModel','collections/CommentList','views/common/Carousel'],function(ProDetailModel,CommentList,Carousel){
    var _v = Backbone.View.extend({
        model:new ProDetailModel,
        commentList:new CommentList,
        tpl: _.template(AppTplMap.proDetail),
        commentTpl: _.template(AppTplMap.comment),
        wholeDesc:false,
        render:function(){},
        events:{
            'click .data-grid .col .desctxt .value':'toggleDesc1',
            'click .data-grid .col .desc a':'toggleDesc'
        },
        toggleDesc1:function(e){
            var a = $(e.target).parent().next().children('a');
            if(this.wholeDesc){//fold
                $(a).text(i18n.spreadDesc);
                $(a).removeClass('reverse');
                $(e.target).css('maxHeight','88px');
            }else{//spread
                $(a).text(i18n.foldDesc);
                $(a).addClass('reverse');
                $(e.target).css('maxHeight','100000px');
            }
            this.wholeDesc = !this.wholeDesc;
        },
        toggleDesc:function(e){
            if(this.wholeDesc){//fold
                $(e.target).text(i18n.spreadDesc);
                $(e.target).removeClass('reverse');
                $(e.target).parent().prev().children('.value').css('maxHeight','88px');
            }else{//spread
                $(e.target).text(i18n.foldDesc);
                $(e.target).addClass('reverse');
                $(e.target).parent().prev().children('.value').css('maxHeight','100000px');
            }
            this.wholeDesc = !this.wholeDesc;
        },
        show:function(pd){
            this.load(pd);
            this.$el.show();
        },
        addNoComments:function(){

        },
        viewMoreComments:function(pd){
            this.$el.find('.view-more-comment').attr('href','#comments/'+pd).css('display','block');
        },
        loadComment:function(pd){
            var me = this;
            this.commentList.fetch({
                data:{
                    pdy: '['+pd+']'
                },
                success:function(clt){
                    var list = me.$el.find('.comment-list');
                    if(clt.models.length>0){
                        list.html(me.commentTpl(clt.models[0].attributes));
                        me.viewMoreComments(pd);
                    }else{
                        me.addNoComments();
                    }
                    me.$el.find('.small-loading').hide();
                }
            });
        },
        hide:function(){
            this.$el.hide();
        },
        lastPd:null,
        load:function(pd){
            var me = this;
            if(this.lastPd != pd){
                this.lastPd = pd;
                Kimiss.Body.Loading.show();
                this.model.fetch({
                    data:{
                        pd:pd
                    },
                    success:function(model){
                        Kimiss.NavBar.setTitle(model.get('pe'));
                        me.$el.html(me.tpl(model.attributes));
                        new Carousel({
                            el:me.$el.find('#proDetail-carousel')
                        });
                        me.loadComment(pd);
                        Kimiss.Body.Loading.hide();
                        Kimiss.Analysis.refreshAnalyEvents();
                    }
                });
            }
        }
    });
    return _v;
});