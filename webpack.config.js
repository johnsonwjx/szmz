const path = require("path"),
  webpack = require('webpack'),
  src = path.resolve(__dirname, 'app'),
  dist = path.resolve(__dirname, 'dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    "index": src + '/index.js'
  },
  output: {
    path: dist,
    filename: "[name].js"
  },
  resolve: {
    root: src,
    alias: {
      jquery: src + '/lib/jquery.min.js'
    }
  },
  module: {
    //加载器配置
    loaders: [{
      include: require.resolve(src + '/lib/jquery.min.js'),
      loader: 'exports-loader?window.jQuery'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
    }, {
      test: /\.html$/,
      loader: "html-loader"
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.(eot|svg|ttf|woff|woff2|png)\w*/,
      loader: 'file'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      template: src + '/index.html',
      filename: dist + '/index.html'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new ExtractTextPlugin("[name].css")
  ]

};

if (process.env.NODE_ENV !== 'production') {
  module.exports.devtool = 'eval-source-map'; //配置生成Source Maps，选择合适的选项
  module.exports.devServer = {
    host: '0.0.0.0',
    port: 8888,
    contentBase: dist, //本地服务器所加载的页面所在的目录
    colors: true, //终端中输出结果为彩色
    hot: true,
    inline: true,
    progress: true
  }
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin() //热加载插件
  ]);
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
