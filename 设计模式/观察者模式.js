{
    let Observer = (function () {
        let QUEUE = [];  //利用闭包定义QUEUE数组，用来存储订阅者，并防止外界修改
        return {
            //订阅接口
            subscribe(fn){
                QUEUE.push(fn);
                console.log("订阅成功！");
            },
            //发布接口
            trigger(msg){
                QUEUE.forEach((fn,index)=>{
                    fn(msg,index);
                });
            },
        };
    })();

    //订阅01
    Observer.subscribe(function(data){
        console.log("1111已订阅"+data);
    });
    //订阅02
    Observer.subscribe(function(data){
        console.log("2222已订阅"+data);
    });
    //发布
    Observer.trigger("这是发布信息")
}