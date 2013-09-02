define(['views/filter/Brand','views/filter/Classify','views/filter/Effect','views/filter/Sort'],function(BrandFilter,ClassifyFilter,EffectFilter,SortFilter){
    return Backbone.View.extend({
        initialize:function(){
            this.brand = new BrandFilter({
                el:$('#filter-brand')
            });
            this.classify = new ClassifyFilter({
                el:$('#filter-classify')
            })  ;
            this.effect = new EffectFilter({
                el:$('#filter-effect')
            });
            this.sort = new SortFilter({
                el:$('#filter-sort')
            });
        },
        events:{
            'click .seg-btn a':'switchFilter',
            'click .selected-pack a':'closeSeleItem',
            'click .submit-btn':'submit'
        },
        closeSeleItem:function(e){
            var $el = $(e.target);
            if(e.offsetX > $el.width() - 40){
                $el.text('').attr('data-flt-id','-1').hide();
                this[$el.attr('data-flt-sele')].clear();
            }
        },
        submit:function(e){
            var el = this.$el.children('.selected-pack'), s='',t='';
            var brandId = el.children('a[data-flt-sele=brand]').attr('data-flt-id'),
                classifyId = el.children('a[data-flt-sele=classify]').attr('data-flt-id'),
                effectId = el.children('a[data-flt-sele=effect]').attr('data-flt-id'),
                sortId = this.sort.sele_id;
            e.stopPropagation();
            if(brandId>0){
                s+=('-'+brandId);
                t+=('-bdy');
            }
            if(classifyId>0){
                s+=('-'+classifyId);
                t+=('-pcdy');
            }
            if(effectId>0){
                s+=('-'+effectId);
                t+=('-pfdy');
            }
            if(sortId>0){
                s+=('-'+sortId);
                t+=('-pst');
            }
            Kimiss.Router.navigate('productList/s='+s+'&t='+t,{
                trigger:true
            });
            Kimiss.NavBody.toggle();
        },
        switchFilter:function(e){
            var $el =  $(e.target);
            $el.addClass('on').siblings('a').removeClass('on');
            $('#'+$el.attr('rel-filter-id')).show().siblings('.seg-item').hide();
        },
        showByType:function(show,hide){
            this.$el.children('.seg-btn').children('a[rel-filter-id=filter-'+show+']').click();
            this.$el.children('.seg-btn').children('a[rel-filter-id=filter-'+hide+']').hide().siblings('a').css('display','block');
        },
        load:function(){
            var params = Kimiss.Body.getModule('ProductList').lastLoadParams,
                s = params.s.substring(1,params.s.length-1);
            this.$el.children('.selected-pack').children('a').attr('data-flt-id',null).text('').hide();
            switch(params.t){
                case 'bdy'://brand
                    this.classify.load(s,'brand');
                    this.effect.load(s,'brand');
                    this.showByType('classify','brand');
                    break;
                case 'pcdy'://classify
                    this.brand.load(s,'classify');
                    this.effect.load(s,'classify');
                    this.showByType('brand','classify');
                    break;
                case 'pfdy'://effect
                    this.brand.load(s,'effect');
                    this.classify.load(s,'effect');
                    this.showByType('brand','effect');
                    break;
                case 'pswy'://search
                    this.brand.load(s,'search');
                    this.classify.load(s,'search');
                    this.effect.load(s,'search');
                    this.showByType('brand');
                    break;
            }


        }
    });
});