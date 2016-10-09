/* global require */
const path = require('path')
const webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production'

const config = {
    entry: {
        'react-ultra-date-picker': ['./src/DatePicker.js'],
    },
    externals: {
        react: 'react',
        'deep-equal': 'deep-equal',
        'react-dom': 'react-dom',
        'react-ultra-select': 'react-ultra-select',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: isProd ? '[name].min.js' : '[name].js',
        library: 'react-ultra-date-picker',
        libraryTarget: 'umd',
    },
    plugins: [],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                loader: 'style!css!less',
            },
        ],
    },
}

if (isProd) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            comments: false,
        })
    )
}

module.exports = config
