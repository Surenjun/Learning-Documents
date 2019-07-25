//1.跨域
    /*如果协议、域名或者端口有一个不同就是跨域。
    请求跨域了，那么请求到底发出去没有？ 请求必然是发出去了，但是浏览器拦截了响应。*/
    //JsonP
    function JSONP(url , params , callBackId , success){
        let onceScript = null;
        if(!onceScript){
            onceScript = this.createJsonp();
        }
        let newScript = this.JsonpArgus(onceScript , url , params);
        window[callBackId] = function (data) {
            success && success(data);
            document.body.removeChild(newScript);
        };
        document.body.appendChild(newScript);
    }
    JSONP.prototype.createJsonp = function () {
        let script = document.createElement("script");
        script.type = "text/javascript";
        //script.async = true;
        return script
    };
    JSONP.prototype.JsonpArgus = function (onceScript , url , params) {
        const paramKeys = Reflect.ownKeys(params);
        let queryString = paramKeys.map(key =>
            `${key}=${params[key]}&`
        )[0];
        onceScript.url = `${url}?${queryString.slice(0,queryString.length - 1)}`;
        return onceScript;
    };

    new JSONP(
        'http://s.weibo.com/ajax/jsonp/suggestion',
        {key: 'test'},
        'callback',
        function(value){
            console.log(value)
        }
    );

//2.service Work
    /*Service Worker 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能。
    使用 Service Worker的话，传输协议必须为 HTTPS。因为 Service Worker 中涉及到请求拦截，
    所以必须使用 HTTPS 协议来保障安全。*/

    /*Service Worker 实现缓存功能一般分为三个步骤：首先需要先注册 Service Worker，
    然后监听到 install 事件以后就可以缓存需要的文件，
    那么在下次用户访问的时候就可以通过拦截请求的方式查询是否存在缓存，
    存在缓存的话就可以直接读取缓存文件，否则就去请求数据。以下是这个步骤的实现：*/

    // index.js
    if (navigator.serviceWorker) {
        navigator.serviceWorker
            .register('sw.js')
            .then(function(registration) {
                console.log('service worker 注册成功')
            })
            .catch(function(err) {
                console.log('servcie worker 注册失败')
            })
    }
    // sw.js
    // 监听 `install` 事件，回调中缓存所需文件
    self.addEventListener('install', e => {
        e.waitUntil(
            caches.open('my-cache').then(function(cache) {
                return cache.addAll(['./index.html', './index.js'])
            })
        )
    })

    // 拦截所有请求事件
    // 如果缓存中已经有请求的数据就直接用缓存，否则去请求数据
    self.addEventListener('fetch', e => {
        e.respondWith(
            caches.match(e.request).then(function(response) {
                if (response) {
                    return response
                }
                console.log('fetch source')
            })
        )
    });