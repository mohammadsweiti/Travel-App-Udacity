const CssExtractor = require("mini-css-extract-plugin"),
    JsMinifier = require("terser-webpack-plugin"),
    path = require("path"),
    baseConfig = require("./webpack.common.js");
const { merge } = require("webpack-merge"),
    CssCompressor = require("css-minimizer-webpack-plugin");

module.exports = merge(baseConfig, {
    mode: "production",
    devtool: "hidden-source-map",
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'AppClient',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [CssExtractor.loader, "css-loader", "sass-loader"]
            },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssCompressor(),
            new JsMinifier()
        ],
    },
    plugins: [
        new CssExtractor({
            filename: 'style.[contenthash].css'
        })
    ]
});
