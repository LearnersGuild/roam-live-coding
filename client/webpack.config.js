const webpack = require('webpack')
const path = require( 'path' )
const HtmlWebpackPlugin = require('html-webpack-plugin')
const jsonLoader = require('json-loader');
const BUILD_DIR = path.resolve(__dirname, 'public/build/')
const APP_DIR = path.resolve(__dirname, 'src')

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body',
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
  }
})

var config = {
  entry: APP_DIR + '/main.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {include: /\.json$/, loaders: ['json-loader']}
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  plugins: [HTMLWebpackPluginConfig]
}

module.exports = config
