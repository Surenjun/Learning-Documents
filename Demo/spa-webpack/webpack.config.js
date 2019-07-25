const merge = require("webpack-merge");

const _mergeBase = require("./config/webpack.base");

const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const _modeFlag = _mode === "production";

console.log( _modeFlag?"生产环境":"开发环境");

const _mergeConfig = require(`./config/webpack.${_mode}.js`); //动态导入

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const  smp = new SpeedMeasurePlugin();

let webpackConfig = {
    entry: ['./src/index.js'], //入口文件，src下的index.js
    output: {
        filename: _modeFlag?"scripts/[name].[hash:5].bundles.js":"scripts/[name].bundles.js",
        publicPath: "/"
    },
};

module.exports = smp.wrap(merge(webpackConfig ,_mergeConfig, _mergeBase)); //打包详情
module.exports = merge( webpackConfig,_mergeConfig, _mergeBase);     //正常

