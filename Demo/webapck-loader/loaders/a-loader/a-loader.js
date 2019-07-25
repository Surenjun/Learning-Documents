//1.use:["xx1-loader","xx2-loadder"]
//2.最后的loader最早调用 传入原始的资源
//3.中间loader执行的时候 传入的就是上一个loader的执行结果
//4.loader需要异步 this.async() this.callcalk();

// import { getOptions } from 'loader-utils';//webpack提供的一个工具包
// import { validateOptions } from 'schema-utils';

module.exports = function (content, map, meta) {
    console.log("a-loader执行了....");
    return content + this.data.value;
};
//5.前置钩子
module.exports.pitch = function (remainRequest,preRequest,data) {
    console.log("a-loader的前置执行了....");
    data.value = "执行到aloader";
};

//6.前置钩子的执行顺序
// a-loader -> pitch
// b-loader -> pitch
// b-loader
// a-loader
