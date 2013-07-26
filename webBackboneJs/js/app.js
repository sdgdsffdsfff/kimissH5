
Handlebars.registerPartial('navBar',Handlebars.compile($('#navBar-tpl').html()));
var NavBarView = Backbone.View.extend({
    partial:'navBar',
    render:function(){
        console.log('render navBar...');
    }
});
var NavBar = new NavBarView;

var BodyView = Backbone.View.extend({
    partial:'body',
    el:$('#navBar'),
    render:function(){
        console.log('render BodyView...');
        console.log(this.el);
    }
});
var Body = new BodyView;

var AppView = Backbone.View.extend({
    tpl: Handlebars.compile($('#tpl').html()),
    className:'app-view',
    items:[NavBar,Body],
    render:function(){
        this.$el.html(this.tpl);
        this.items.each(function(a){
            a.render();
        });
    }
});
var App = new AppView;
App.render();
$('body').append(App.el);
