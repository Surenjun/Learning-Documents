function MyPromise(executor){
    var that = this
    this.status = 'pending' // 当前状态
    this.data = undefined
    this.onResolvedCallback = [] // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
    this.onRejectedCallback = [] // Promise reject时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面

    // 更改状态 => 绑定数据 => 执行回调函数集
    function resolve(value){
        if(that.status === 'pending'){
            that.status = 'resolved'
            that.data = value
            for(var i = 0; i < that.onResolvedCallback.length; ++i){
                that.onResolvedCallback[i](value)
            }
        }
    }

    function reject(reason){
        if(that.status === 'pending'){
            that.status = 'rejected'
            that.data = reason
            for(var i = 0; i < that.onResolvedCallback.length; ++i){
                that.onRejectedCallback[i](reason)
            }
        }
    }

    try{
        executor(resolve, reject) // resolve, reject两个函数可以在外部传入的函数（executor）中调用
    } catch(e) { // 考虑到执行过程可能有错
        reject(e)
    }
}

// 标准是没有catch方法的，实现了then，就实现了catch
// then/catch 均要返回一个新的Promise实例

MyPromise.prototype.then = function(onResolved, onRejected){
    var that = this
    var promise2

    // 值穿透
    onResolved = typeof onResolved === 'function' ? onResolved : function(v){ return v }
    onRejected = typeof onRejected === 'function' ? onRejected : function(r){ return r }

    if(that.status === 'resolved'){
        return promise2 = new MyPromise(function(resolve, reject){
            try{
                var x = onResolved(that.data)
                if(x instanceof MyPromise){ // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
                    x.then(resolve, reject)
                }
                resolve(x) // 否则，以它的返回值做为promise2的结果
            } catch(e) {
                reject(e) // 如果出错，以捕获到的错误做为promise2的结果
            }
        })
    }

    if(that.status === 'rejected'){
        return promise2 = new MyPromise(function(resolve, reject){
            try{
                var x = onRejected(that.data)
                if(x instanceof MyPromise){
                    x.then(resolve, reject)
                }
            } catch(e) {
                reject(e)
            }
        })
    }

    if(that.status === 'pending'){
        return promise2 = new MyPromise(function(resolve, reject){
            self.onResolvedCallback.push(function(reason){
                try{
                    var x = onResolved(that.data)
                    if(x instanceof MyPromise){
                        x.then(resolve, reject)
                    }
                } catch(e) {
                    reject(e)
                }
            })

            self.onRejectedCallback.push(function(value){
                try{
                    var x = onRejected(that.data)
                    if(x instanceof MyPromise){
                        x.then(resolve, reject)
                    }
                } catch(e) {
                    reject(e)
                }
            })
        })
    }
}

MyPromise.prototype.catch = function(onRejected){
    return this.then(null, onRejected)
}

// 以下是简单的测试样例：
new MyPromise(resolve => resolve(8)).then(value => {
    console.log(value)
})
