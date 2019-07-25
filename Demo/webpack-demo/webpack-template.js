const  bundleFile = require("./3.webacpk-ast")({entry:"./src/index.js"});
//webpack简化的template
const data = (function (modules) {
    function __webpack_require__(moduleId) {
        const module = {
            exports: {}
            //...其内部做了缓存处理
        };
        //函数体
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    return __webpack_require__(0);
})(bundleFile);

console.log(data);
