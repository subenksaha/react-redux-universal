var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('css/main.css');
var config = {
    resolve: {
        alias: {
            'client': path.resolve(__dirname, '../client')
        },
        extensions: ['.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, '..', 'server', 'public'),
        filename: 'js/bundle.js',
        publicPath: '/public/'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.DefinePlugin({
            'process.env.BABEL_ENV': JSON.stringify('dev')
        }),
        extractCSS
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            use: extractCSS.extract(
                { 
                    fallback: 'style-loader',
                    use: 'css-loader',
                    publicPath: '/public/'
                })
        }, {
            test: /\.(jpe?g|png|gif|svg|ico)/i,
            loader: 'file-loader?name=img/[name].[ext]'
        }, {
            test: /\.(ttf|eot|svg|woff|woff2)/,
            loader: 'file-loader?name=font/[name].[ext]'
        }, {
            test: /\.(pdf)/,
            loader: 'file-loader?name=asset/[name].[ext]'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ["react", "es2015", "stage-0"],
                plugins: [
                    "transform-runtime",
                    "transform-decorators-legacy",
                    "lodash",
                    "antd"
                ],
                env: {
                    dev: {
                        presets: ["react-hmre", "rewire"]
                    },
                    production: {}
                }
            }
        }]
    }
};

module.exports = config;