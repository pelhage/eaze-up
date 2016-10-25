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
      loader: "style!css-loader!postcss-loader"//,
//      loader: ExtractTextPlugin.extract('style', 'style!css-loader!postcss-loaders')
    },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        include: path.join(__dirname, 'src'),
        loader: 'file',
        query: {
          name: 'media/[name].[hash:8].[ext]'
        }
      },
/*    {
      test: /\.(jpe?g|png|gif|svg|mp4|webm|html)$/i,
      include: "./src",
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }, */
      {
        test: /\.(mp4|webm)(\?.*)?$/,
        include: path.join(__dirname, 'src'),
        loader: 'url',
        query: {
          limit: 10000,
          name: 'media/[name].[hash:8].[ext]'
        }
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
