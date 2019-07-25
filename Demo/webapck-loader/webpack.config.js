const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    //这里写 loader 的路径
                    loader: "b-loader/b-loader.js",
                },{
                    loader: "a-loader/a-loader.js",
                }],
            },
            {
                test: /\.html$/,
                use: ['html-loader', {
                    loader: 'html-minify-loader/index.js',
                    options: {
                        comments: false
                    }
                }]
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {template:'src/index.html'}
        )
    ],
    resolveLoader: {
            // 因为 html-loader 是开源 npm 包，所以这里要添加 'node_modules' 目录
            modules: [path.join(__dirname, './loaders'), 'node_modules']
    }
};
