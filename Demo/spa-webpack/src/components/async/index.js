import loadingPath from "../../img/webpack-img.png"

const asyncTest = {
    init(){
        console.log("这是异步导入的包");
    },
    goImg(){
        let loading = new Image();
        loading.src = loadingPath;
        loading.onload = function () {
            document.querySelector(".bouncing-loader").innerHTML="";
            document.querySelector(".bouncing-loader").append(loading);
        }
    }
};
export default asyncTest;