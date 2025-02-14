const baseConfig = require("./webpack.common.js"),
    { merge } = require("webpack-merge"),
    CssOptimizer = require("css-minimizer-webpack-plugin"),
    path = require("path");

module.exports = merge(baseConfig, {
    mode: "development",
    devtool: "source-map",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'AppClient',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    optimization: {
        minimizer: [
            new CssOptimizer(),
        ],
        minimize: true,
    },
});
  