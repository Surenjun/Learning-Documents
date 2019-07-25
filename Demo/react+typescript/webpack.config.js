const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const merge = require("webpack-merge");
const {join, resolve} = require("path");
const {CheckerPlugin} = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log("🍎", argv.mode);
//join(__dirname, "./dist/assets")
const webpackConfig = {
    entry: join(__dirname, 'src/web/index'),
    output: {
        path: join(__dirname, './dist'),
        publicPath: '/',
        filename: 'scripts/[name]-[hash:5].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,//将css从js里拉出来(与style-loader不能连用)
                    },
                    //"css-loader?modules&localIdentName=[name]-[local]-[hash:base64:5]']"
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            strictMath: true,
                            noIeCompat: true,
                        },
                    }
                ],
                include: [resolve("src")],
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                include: [resolve("src")],
                exclude: /node_modules/,
                // loader: "awesome-typescript-loader"
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new CheckerPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:5].css',
            chunkFilename: '[id].[hash:5].css',
        }),
        new HtmlWebpackPlugin({               //插入html
            filename: "index.html",
            template: "src/asset/index.html",
            // loading,
            minify: {
                collapseWhitespace: false, //压缩代码，去除空格和换行
                removeAttributeQuotes: false//压缩代码，去除属性双引号
            }
        }),

    ]
};

module.exports = merge(webpackConfig, _mergeConfig);