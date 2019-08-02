### immer

>```javascript
>const produce = require('immer').produce;
>const state = {
>  done : false,
>  val : 'string'
>};
>
>const newState = produce(state ,(draft)=>{
>  draft.done = true
>});
>
>console.log(state.done);
>console.log(newState.done);
>```
>
>所有**具有副作用的逻辑**都可以放进 produce 的第二个参数的函数内部进行处理。在这个函数内部对原来的数据进行任何操作，都不会对原对象产生任何影响。

### Proxy

>proxy技巧
>
>```javascript
>let object = {proxy : new Proxy(target , handler)};
>let proxy = new Proxy({},{
>    get : function(target , property){return 35;}
>})
>let obj = Object.create(proxy);
>obj.time //35
>```
>
>对于同一个拦截器函数，可以设置拦截多个操作
>
>```javascript
>get(target , property , receiver) 用于拦截某个属性的读取操作 receiver指向原始的读操作所在的对象
>set(target , property , value, receiver)
>apply(target, ctx, args) apply方法拦截函数的调用，ctx为目标对象的指向上下文
>construct(target, args, newTarget) 拦截new命令
>deleteProperty() 用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除
>```

immer的用法

>```javascript
>const produce = require('immer').produce;
>
>//produce的第一个参数传入的是函数，会返回一个待执行的produce。第二个参数为默认传入的draft值
>const mapper = produce((draft, index) => {  draft.index = index},[]);
>console.dir([{}, {}, {}].map(mapper))
>
>const mapper = produce((draft, index) => {
>  draft.index1 = 2
>},{index:1});
>console.dir(mapper());
>```
>
>​	