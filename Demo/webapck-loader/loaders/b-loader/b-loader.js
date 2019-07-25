
module.exports = function (content, map, meta) {
    console.log("b-loader执行了....");
    return content + this.data.value;
};
//5.前置钩子
module.exports.pitch = function (remainRequest,preRequest,data) {
    console.log("b-loader的前置执行了....");
    data.value = "执行到bloader";
};
