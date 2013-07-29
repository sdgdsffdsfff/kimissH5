MenuBtn = new _button({
    el:$('#menu'),
    clsPressing:'bar-btn-pressing'
});
MenuBtn.on('tap',function(){
    NavBody.toggle();
});