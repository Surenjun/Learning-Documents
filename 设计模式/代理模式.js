// 代理模式（Proxy）：为对象提供一个代理，用来控制对这个对象的访问。
const obj = {
    name:"surenjun",
    age:23,
    sex:"男"
};

let hanlder = {
    get(target,key){
        console.log(`正在访问${target}`);
        return target[key];
    },
    set(target,key,value){
        return target[key] = value;
    }
};

let proxyObj = new Proxy(obj , hanlder);
console.log(proxyObj.name);