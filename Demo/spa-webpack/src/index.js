import {sync} from "./components/sync/index.js";
import(/* webpackChunkName: "asyncTest" */ './components/async/index.js').then( _ =>{
    _.default.init();
    _.default.goImg();
});
$(document).ready(function () {
    console.log($)
});
console.log("Hello Webpack");
sync();
