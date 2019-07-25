const { join } = require("path");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const  ProgressBarPlugin  = require('progress-bar-webpack-plugin');

module.exports = {
    devServer: {
        port:3000,
        historyApiFallback:true, //匹配搜索栏输入的路由
        hot:true,
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new ProgressBarPlugin(),              //面板进度条
        new WebpackBuildNotifierPlugin({
            title: " 😀 打包完成 👍",
            suppressSuccess: true
        })
    ],
};