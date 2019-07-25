// import lodash from "lodash-es";
import {
    isArray
} from "lodash-es";
import "./sync.css";
const sync = function () {
    // fetch("/api/test")
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log("fetch结果", data.message);
    // })
    document.getElementById("app").innerHTML = `<h1 class="test">Welcome To Webpack-SPA</h1></h1>`;
    document.querySelectorAll(".bouncing-loader")[0].innerHTML="<div></div><div></div><div></div>"
};
const isArrayFun = function (args) {
    console.log(isArray(args));
};
export {
    sync,
    isArrayFun
}