var path = require('path');
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
    {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
    {
      test:   /\.css$/,
      loader: "style!css-loader!postcss-loader"
    },
    {
      test: /\.(jpe?g|png|gif|svg|mp4|webm)$/i,
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
  postcss: function() {
    return [precss, autoprefixer]
  }
};
