// 1.对象转原始类型
    // 对象在转换类型的时候，会调用内置的 [[ToPrimitive]] 函数，对于该函数来说，算法逻辑一般来说如下：
        // 如果已经是原始类型了，那就不需要转换了
        // 调用 x.valueOf()，如果转换为基础类型，就返回转换的值
        // 调用 x.toString()，如果转换为基础类型，就返回转换的值
        // 如果都没有返回原始类型，就会报错
//可以重写 Symbol.toPrimitive ，该方法在转原始类型时调用优先级最高。
    let a = {
        valueOf() {
            return 0
        },
        toString() {
            return '1'
        },
        [Symbol.toPrimitive]() {
            return 2
        }
    };
    console.log(1 + a); // => 3

    let b = {
        valueOf() {
            return 0
        },
        toString() {
            return '1'
        }
    };
    console.log(b > -1); // true

/*********************************************************************/

//2.this指向的优先级
    /*new 的方式优先级最高，接下来是 bind 这些函数，然后是 obj.foo() 这种调用方式，
    最后是 foo 这种调用方式，同时，箭头函数的 this 一旦被绑定，就不会再被任何方式所改变。*/

    /*箭头函数其实是没有 this 的，
    箭头函数中的 this 只取决包裹箭头函数的第一个普通函数的 this。*/

//3.Object.assign
    /*Object.assign 只会拷贝所有的属性值到新的对象中，
    如果属性值是对象的话，拷贝的是地址，所以并不是深拷贝。*/

    // ... 运算符也是浅拷贝
    {
        let a = {age: {num:1}};
        let b = Object.assign({}, a);
        a.age.num = 2;
        console.log(b.age); // 2
    }

//4.深拷贝
    //1.JSON.parse(JSON.stringify(object))
        //局限性:
            /*会忽略 undefined
            会忽略 symbol
            不能序列化函数
            不能解决循环引用的对象*/

    //2.实现一个深拷贝
    function deepClone(obj) {
        function isObject(o) {
            return (typeof o === 'object' || typeof o === 'function') && o !== null
        }

        if (!isObject(obj)) {
            throw new Error('非对象')
        }

        let isArray = Array.isArray(obj);
        let newObj = isArray ? [...obj] : { ...obj };
        Reflect.ownKeys(newObj).forEach(key => {
            newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
        });

        return newObj
    }

//5.面向对象
    function Fn(name,age){
        this.name = name;
        this.age = age;
    }
    Fn.prototype = {
        constructor:Fn,
        render(){
            console.log(1);
        }
    };
    let a = new Fn("surenjun",23);
    console.log(a.__proto__ === Fn.prototype); //=> true;
    //so Fn.prototype ? 通过Object构造出来的
    console.log(Fn.prototype.__proto__.constructor === Object); //=> true;

//6.原型的继承
    //组合继承
    function Parent(value) {
        this.val = value
    };
    Parent.prototype.getValue = function() {
        console.log(this.val)
    };
    function Child(value) {
        Parent.call(this, value)
    };
    Child.prototype = new Parent();

    const child = new Child(1);

    child.getValue(); // 1
    console.log(child instanceof Parent);; // true

    //寄生继承
{
    function Parent(value) {
        this.val = value
    }
    Parent.prototype.getValue = function() {
        console.log(this.val)
    }

    function Child(value) {
        Parent.call(this, value)
    }
    Child.prototype = Object.create(Parent.prototype, {
        constructor: {
            value: Child,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    const child = new Child(1)

    child.getValue() // 1
    child instanceof Parent // true
}

// 7.Proxy
{
    /*Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，
    所以属于一种“元编程”（meta programming），即对编程语言进行编程。*/
    /*var proxy = new Proxy(target, handler);*/
    let obj = new Proxy({}, {
        get: function (target, key, receiver) {
            console.log(`getting ${key}!`);
            return Reflect.get(target, key, receiver);
        },
        set: function (target, key, value, receiver) {
            console.log(`setting ${key}!`);
            return Reflect.set(target, key, value, receiver);
        }
    });
}
//8.Reflect
{
    /*Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。Reflect对象的设计目的有这样几个。
    比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，
    而Reflect.defineProperty(obj, name, desc)则会返回false。*/

    Reflect.apply(target, thisArg, args)
    Reflect.construct(target, args)
    Reflect.get(target, name, receiver)
    Reflect.set(target, name, value, receiver)
    Reflect.defineProperty(target, name, desc)
    Reflect.deleteProperty(target, name)
    Reflect.has(target, name)
    Reflect.ownKeys(target)
    Reflect.isExtensible(target)
    Reflect.preventExtensions(target)
    Reflect.getOwnPropertyDescriptor(target, name)
    Reflect.getPrototypeOf(target)
    Reflect.setPrototypeOf(target, prototype)

    /*let myObject = {
        foo: 1,
        bar: 2,
        get baz() {
            return this.foo + this.bar;
        },
    };

    let myReceiverObject = {
        foo: 4,
        bar: 4,
    };

    Reflect.get(myObject, 'baz', myReceiverObject) // 8*/

}
