const webpack = require('webpack');

const path = require("path");
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const _modeFlag = _mode === "production";

const CleanWebpackPlugin = require('clean-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      WebpackBuildNotifierPlugin = require('webpack-build-notifier'),
      ProgressBarPlugin = require('progress-bar-webpack-plugin'),
      ManifestPlugin = require('webpack-manifest-plugin'),
      MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HappyPack = require('happypack');
const os = require('os'); // node 提供的系统操作模块

// 根据系统的内核数量 指定线程池个数 也可以其他数量
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

const loading = {
    html:"加载中..."
};

module.exports = {

    module: {
        rules: [
            // {   //将css以style的标签里,减少http请求
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]'],
            //     include: path.join(__dirname, 'src'),
            //     exclude: /node_modules/
            // },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,//将css从js里拉出来(与style-loader不能连用)
                        options: {publicPath: '../'}
                    },
                    //"css-loader?modules&localIdentName=[name]-[local]-[hash:base64:5]']"
                    'css-loader',
                    "postcss-loader"
                ],
                exclude: /node_modules/,
                include: path.resolve(__dirname, '../src') // 精确指定要处理的目录
            },
            {
                // babel-loader (ES6)
                test: /\.js$/,
                use:['babel-loader?cacheDirectory','happypack/loader?id=babel'], //缓存loader执行结果 发现打包速度已经明显提升了
                exclude: file => /node_modules/.test(file),
                include: path.resolve(__dirname, '../src')
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {name: 'images/[name]-[hash:5].[ext]'}
                }],
                exclude: /node_modules/,
                include: path.resolve(__dirname, '../src')
            }
        ]
    },
    plugins: [
        new ManifestPlugin(),
        new ProgressBarPlugin(),              //面板进度条
        new WebpackBuildNotifierPlugin({suppressSuccess: true}),//提示框
        new CleanWebpackPlugin(["dist"],{root: path.resolve(__dirname,'..'),}),     //清除dist文件,
        new webpack.ProvidePlugin({
            "$":'jquery'    //在全局下添加$变量，不需要再次引入
        }),
        new HtmlWebpackPlugin({               //插入html
            filename:"index.html",
            template:"src/index.html",
            loading,
            minify:{
                collapseWhitespace:false, //压缩代码，去除空格和换行
                removeAttributeQuotes:false//压缩代码，去除属性双引号
            }
        }),
        new MiniCssExtractPlugin({
            filename: _modeFlag?"styles/[name].[hash:5].css":"styles/[name].css",
            chunkFilename: _modeFlag?"styles/[id].[hash:5].css":"styles/[name].css"
        }),
        new HappyPack({  // 基础参数设置
            id: 'babel', // 上面loader?后面指定的id
            loaders: ['babel-loader?cacheDirectory'], // 实际匹配处理的loader
            threadPool: happyThreadPool,
            // cache: true // 已被弃用
            verbose: true
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial', //提取公共代码
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {             // 将第三方模块提取出来
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10, // 优先
                    enforce: true
                },
                runtimeChunk: "runtime"
            }
        }
    },
    resolve:{
        extensions:['.js','.css','.vue']
        // alias:{
        //     bootstrap:'bootstrap/dist/css/bootstrap.css'    //import 'bootstrap'会找对应的路径
        // }
    }
};
