const  ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin'),
       OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
       WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default,
       PurifyCSSPlugin = require('purifycss-webpack'),
       ManifestPlugin = require('webpack-manifest-plugin');

const  os = require("os");
const  glob = require('glob'),
       path = require("path");

module.exports = {

    plugins: [
        new ManifestPlugin(),
        new WebpackDeepScopeAnalysisPlugin(), //JS treeShaking
        new PurifyCSSPlugin({                 //CSS treeShaking(一般用于多页,单页要使用cssmodule)
            paths: glob.sync(path.join(__dirname,'../src/*.html'))
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css\.*(?!.*map)/g,  //注意不要写成 /\.css$/g
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: { removeAll: true },
                // 避免 cssnano 重新计算 z-index
                safe: true,
                // cssnano 集成了autoprefixer的功能
                // 会使用到autoprefixer进行无关前缀的清理
                // 关闭autoprefixer功能
                // 使用postcss的autoprefixer功能
                autoprefixer: false
            },
            canPrint: true
        }),
        new ParallelUglifyPlugin({
            exclude:/\.min\.js$/,
            workerCount:os.cpus().length, //开启多核模式
            uglifyJS: {
                output: {
                    beautify: false, //不需要格式化
                    comments: false //不保留注释
                },
                compress: {
                    warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                    drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            }
        }),
    ]
};