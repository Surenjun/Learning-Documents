/**
 * webpack主运行流程
 * Compiler(Tapable)->Compilation(Tapable)--> Chunk ->
 * Module->runloaders-> Dependency(AST) -> Template
 */

// 模拟:Chunk->Dependency->Template
let input  = "./src/index.js",  //入口
    output = "./dist/main.js";  //出口

const fs = require("fs");
const ejs = require("ejs");  //使用ejs模板就行模拟
const entryStream = fs.readFileSync(input , "utf-8");

let template = `(function(modules){
    function  __webpack_require__(moduleId){
        const module ={
            exports:{}
        }
        //函数体
        modules[moduleId].call(module.exports,module, module.exports, __webpack_require__);
        return module.exports;
    }
    return __webpack_require__(0);//
})([(function(module,exports){
    <%- entryStream %>
})]);`;

let result = ejs.render(template,{ //使用ejs转化
    entryStream
});
fs.writeFileSync(output,result);
