const CssExtractor = require("mini-css-extract-plugin");
const JsMinifier = require("terser-webpack-plugin");
const path = require("path");
const baseConfig = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const CssCompressor = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = merge(baseConfig, {
    mode: "production",
    devtool: "hidden-source-map",
    entry: './src/client/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'AppClient',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    CssExtractor.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [CssExtractor.loader, 'css-loader', 'sass-loader'],
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssCompressor(),
            new JsMinifier(),
            new TerserPlugin()
        ],
    },
    plugins: [
        new CssExtractor({
            filename: 'style.[contenthash].css'
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html',
        })
    ]
});