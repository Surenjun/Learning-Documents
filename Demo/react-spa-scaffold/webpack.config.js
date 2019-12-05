const path = require('path')
// 注入HTML
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 提取CSS插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 清除冗余文件插件
const CleanWebpackPlugin = require('clean-webpack-plugin')
// webpack4无法自动压缩.css文件，需要下面的插件支持
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const localConfig = {
    entry: path.join(__dirname, 'src/index.jsx'),
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/',
        filename: 'scripts/[name]-[hash:5].js'
    },
    resolve: {
        extensions: ['.jsx', '.js'],
        alias: {
            '@': path.resolve('src')
        }
    },
    // webpack4压缩插件配置
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            cacheGroups: {
                vendor: { // 抽离第三方插件
                    test: /node_modules/, // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'common/vendor', // 打包后的文件名，任意命名
                    priority: 10 // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                },
                utils: { // 抽离自定义公共代码
                    test: /\.js$/,
                    chunks: 'initial',
                    name: 'common/utils',
                    minSize: 0 // 只要超出0字节就生成一个新包
                }
            }
        }
    },
    module: {
        rules: [{
            // css-loader
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss'
                    }
                }
            ]
        }, {
            // Babel-loader  (ES6)
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'Babel-loader'
            }
        }, {
            // eslint-loader
            enforce: 'pre',
            test: /\.(js|jsx)$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {}
            }]
        }]
    },
    plugins: [
    // 加入 html 模板任务
        new HtmlWebpackPlugin({
            // 模板文件
            template: 'src/assets/index.html',
            // 打包后文件名称，会自动放到 output 指定的 dist 目录
            filename: 'index.html'
        }),
        // 提取CSS
        new MiniCssExtractPlugin({
            filename: 'styles/[name]-[hash:5].css',
            chunkFilename: 'styles/[id]-[hash:5].css'
        }),
        new CleanWebpackPlugin('dist/*', {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]
}

module.exports = localConfig
