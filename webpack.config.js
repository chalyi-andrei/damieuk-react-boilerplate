const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const prod = process.env.NODE_ENV === 'production';
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
    entry: {
        js: ['./app/js/app.js'],
        css:  ['./app/scss/global.scss']
    },

    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, "client"),
        publicPath: prod ? '/client/' : 'http://localhost:3000/client/'
    },

    watch: true,

    resolve: {
        modulesDirectories: ['node_modules', 'js'],
        extensions: ['', '.js', '.jsx', '.css', '.scss']
    },

    module: {
        preLoaders: [
            {
                test: /\.js?$/,
                loader: "eslint-loader", exclude: /node_modules/
            }
        ],

        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0', 'stage-1']
                }
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }, {
                test: /\.scss$/,
                // loaders: ["style-loader", "css-loader", "sass-loader"],
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!resolve-url!sass-loader?sourceMap')
            }
        ],

        sassLoader: {
            includePaths: [path.resolve(__dirname, "./app/scss")]
        }
    },

    postcss: function() {
        return [
            autoprefixer, precss
        ];
    },

    debug: true,

    devtool: "inline-source-map",

    devServer: {
        hot: true,
        host: 'localhost',
        port: 3000
        // historyApiFallback: true
    },

    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            Router: 'react-router'
        }),
        new ExtractTextPlugin('global.css', {
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};