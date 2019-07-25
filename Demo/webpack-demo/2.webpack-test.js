let input = "./src/index.js",
    output = "./dist/main.js";

const fs = require("fs");
const ejs = require("ejs");
const ora = require('ora');

const getIntry = fs.readFileSync(input, "utf-8");

//依赖关系
const spinner = ora('开始构建项目文件').start();
let dependency = [];

//主入口
let dealIntry = getIntry.replace(/(require)\(['"](.+?)['"]\)/g, ($1,$2,$3,$4)=>{
    let cont = fs.readFileSync($3,"utf-8");
    dependency.push(cont);
    return $2 = `__webpack_require__(${dependency.length})`;
});
let template = `(function(modules){
    function  __webpack_require__(moduleId){
        const module ={
            exports:{}
        }
        //函数体
        modules[moduleId].call(module.exports,module, module.exports, __webpack_require__);
        return module.exports;
    }
    return __webpack_require__(0);
})([(function(module,exports,__webpack_require__){
    <%- dealIntry %>
}),<% for(var i = 0;i<dependency.length;i++) {%>
    (function(module,exports){
        <%-dependency[i] %>
    })
<% }%>]);`;

let result = ejs.render(template,{
    dealIntry,
    dependency
});
fs.writeFileSync(output,result);
setTimeout(function(){
    spinner.succeed("构建成功");
},1000);
