//外观模式提供了一个接口，隐藏了内部的逻辑，更加方便外部调用。

function addEvent(dom , eName , fn){
    if( document.addEventListener ){
        dom.addEventListener(eName, fn, false);
    }else if( document.attachEvent ){
        dom.attachEvent("on"+eName,fn);
    }else{
        dom["on"+eName] = fn;
    }
}