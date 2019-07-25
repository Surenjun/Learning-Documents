//1.模块化
    // AMD
    /*define(['./a', './b'], function(a, b) {
        // 加载模块完毕可以使用
        a.do()
        b.do()
    })
    // CMD
    define(function(require, exports, module) {
        // 加载模块
        // 可以把 require 写在函数体的任意地方实现延迟加载
        var a = require('./a')
        a.doSomething()
    })
    //CommonJS(node的使用规范,支持动态导入,深拷贝)
    //ES Module
    */

//2.Proxy(Vue3.0将通过使用Proxy来替换Object.defineProperty)
    let onWatch = (obj, setBind, getLogger) => {
        let handler = {
            get(target, property, receiver) {
                getLogger(target, property);
                return Reflect.get(target, property, receiver)
            },
            set(target, property, value, receiver) {
                setBind(value, property);
                return Reflect.set(target, property, value)
            }
        };
        return new Proxy(obj, handler)
    };

    let obj = { a: 1 ,b:2};
    let p = onWatch(
        obj,
        (v, property) => {
            console.log(`监听到属性${property}改变为${v}`)
        },
        (target, property) => {
            console.log(`'${property}' = ${target[property]}`)
        }
    );
    console.log(p.a);

//3.Event Loop机制
/**
 * 1.microtask(jobs)  process.nextTick ，promise ，MutationObserver
 * 2.macrotask(tasks) script ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering
 * Node 中的 process.nextTick，这个函数其实是独立于 Event Loop 之外的，它有一个自己的队列，
 * 当每个阶段完成后，如果存在 nextTick 队列，就会清空队列中的所有回调函数，
 * 并且优先于其他 microtask 执行。
 * */

//4.call,apply,bind
{
    Function.prototype.myCall = function (context) {
        if(typeof this !== "function"){
            throw new TypeError("error")
        }
        context = context || window;
        context.fn = this;
        const args = [...arguments].slice(1);
        const result = context.fn(...args);
        delete context.fn;
        return result
    };

    Function.prototype.myApply = function (context) {
        if(typeof this !== "function"){
            throw new TypeError("error")
        }
        context = context || window;
        context.fn = this;
        const args = [...arguments][1];
        const result = context.fn(args);
        delete context.fn;
        return result
    };

    Function.prototype.myBind = function (context) {
        if(typeof this !== "function"){
            throw new TypeError("error")
        }
        context = context || window;
        const _this = this;
        const args = [...arguments].slice(1);
        return function F() {
            // 因为返回了一个函数，我们可以 new F()，所以需要判断
            if (this instanceof F) {
                return new _this(...args, ...arguments)
            }else{
                return _this.apply( context , args.concat(...arguments) )
            }
        }
    }
    Function.prototype.myBind1 = function (that) {
        if(typeof this !== "function"){
            throw Error("错误")
        }
        const bindArgs = [].slice.call(arguments , 1);
        const prevFn = this;
        const fn = function () {
            //判断fn是不是构造函数，如果是则使模拟的bind失效
            prevFn.apply(this instanceof fn ? this : that,bindArgs, [...arguments])
        }
        //修正原型链
        if(prevFn.prototype){
            fn.prototype = prevFn.prototype;
        }
        return fn;
    }
}
//5.instanceof
{
    function myInstanceof(left, right) {
        let prototype = right.prototype;
        left = left.__proto__;
        while (true) {
            if (left === null || left === undefined)
                return false;
            if (prototype === left)
                return true;
            left = left.__proto__;
        }
    }
}

