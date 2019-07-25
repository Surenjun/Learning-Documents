//1.浏览器的缓存机制
    /*Service Worker (让我们自由控制缓存哪些文件、如何匹配缓存、如何读取缓存，并且缓存是持续性的)
    Memory Cache     (内存缓存虽然读取高效，可是缓存持续性很短，会随着进程的释放而释放)
    Disk Cache       (存储在硬盘中的缓存，读取速度慢点，但是什么都能存储到磁盘中)
    Push Cache       (Push Cache 是 HTTP/2 中的内容，当以上三种缓存都没有命中时，它才会被使用。并且缓存时间也很短暂，只在会话（Session）中存在，一旦会话结束就被释放。)
    网络请求*/

//2.缓存策略

   //a.强制缓存(强制缓存就是向浏览器缓存查找该请求结果，并根据该结果的缓存规则来决定是否使用该缓存结果的过程)
        /*当浏览器向服务器发起请求时，
        服务器会将缓存规则放入HTTP响应报文的HTTP头中和请求结果一起返回给浏览器，
        控制强制缓存的字段分别是Expires和Cache-Control，其中Cache-Control优先级比Expires高*/
            //Cache-Control的缓存规则
              /*public：所有内容都将被缓存（客户端和代理服务器都可缓存）
                private：所有内容只有客户端可以缓存，Cache-Control的默认取值
                no-cache：客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定
                no-store：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存
                max-age=xxx (xxx is numeric)：缓存内容将在xxx秒后失效*/

   //b.协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程，主要有以下两种情况：
      /*协商缓存生效，返回304(资源无更新)
        协商缓存失效，返回200和请求结果结果(返回新的资源)*/
      /*控制协商缓存的字段分别有：Last-Modified / If-Modified-Since和Etag / If-None-Match，
        其中Etag / If-None-Match的优先级比Last-Modified / If-Modified-Since高*/

      //如果什么缓存都没做，浏览器会采用一个启发式的算法，通常会取响应头中的 Date 减去 Last-Modified 值的 10% 作为缓存时间。

//3.浏览器渲染原理
    /*a.在网络中传输的内容,html,css,js文件其实都是 0 和 1 这些字节数据。当浏览器接收到这些字节数据以后，它会将这些字节数据转换为字符串，
      也就是我们写的代码。

            字节数据 => 字符串代码

      b.当数据转换为字符串以后，浏览器会先将这些字符串通过词法分析转换为标记（token），
      这一过程在词法分析中叫做标记化（tokenization）。

            字节数据 => 字符串代码 => Token

      c.当结束标记化后，这些标记会紧接着转换为 Node，最后这些 Node 会根据不同 Node 之前的联系构建为一颗 DOM 树。

            字节数据 => 字符串代码 => Token => Node => Dom树

      d.其实转换 CSS 到 CSSOM 树的过程和上一小节的过程是极其类似的

            字节数据 => 字符串代码 => Token => Node => CSSOM树

      */

//4.安全防范知识

//5.节流和防抖
    //节流
{
    const throtte = (func , wait = 2000)=>{
    //上一次执行的时间
    let prevTime = 0;
        return function() {
            let nowTime = +new Date();
            if(nowTime - prevTime > wait){
                prevTime = nowTime;
                func();
            }
        }
    };
    setInterval(throtte(
        function () {
            console.log(1);
        }
    ),0);
}
{
    //防抖
    // func是用户传入需要防抖的函数
    // wait是等待时间
    const debounce = (func, wait = 50) => {
        // 缓存一个定时器id
        let timer = 0;
        // 这里返回的函数是每次用户实际调用的防抖函数
        // 如果已经设定过定时器了就清空上一次的定时器
        // 开始一个新的定时器，延迟执行用户传入的方法
        return function(...args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args)
            }, wait)
        }
    }
}
