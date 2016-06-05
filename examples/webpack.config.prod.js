var path = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var webpack = require("webpack")

module.exports = {
    devtool: "source-map",
    entry: {
        "example": ["./examples/Example"],
    },
    output: {
        path: path.join(__dirname, '../demo'),
        filename: "[name].js",
        publicPath: ""
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            comments: false
        }),
        new HtmlWebpackPlugin({
            template: "./examples/index.html"
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ["babel"],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
        ]
    }
}
