var path = require('path');
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'eval',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/eaze-up/'
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
    {
      test:   /\.css$/,
      loader: "style!css-loader!postcss-loader",
      loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss')
    },
    {
      test: /\.(jpe?g|png|gif|svg|mp4|webm|html)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }
    // {
    //   test: /\.html$/,
    //   loader: 'html-loader?attrs[]=video:src'
    // }, {
    //   test: /\.mp4$/,
    //   loader: 'url?limit=10000&mimetype=video/mp4'
    // }

    // {
    //   test: /\.css$/,
    //   loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
    // }

    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ],
  postcss: function() {
    return [precss, autoprefixer]
  }
};
