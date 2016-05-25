var path = require("path")

module.exports = {
    devtool: "cheap-module-source-map",
    entry: {
        "example": ["./examples/Example"],
    },
    output: {
        path: __dirname,
        filename: "[name].js",
        publicPath: "/"
    },
    plugins: [],
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
            }
        ]
    }
}
