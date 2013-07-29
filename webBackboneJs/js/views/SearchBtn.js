SearchBtn = new _button({
    el:$('#search'),
    clsPressing:'bar-btn-pressing'
});
SearchBtn.on('tap',function(){
    SearchView.toggle();
});