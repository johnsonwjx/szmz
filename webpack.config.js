/* eslint-env es6,node */
var path = require("path"),
  webpack = require('webpack'),
  src = path.resolve(__dirname, 'app'),
  dist = path.resolve(__dirname, '../web');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: {
    "index": path.join(src, '/index.js'),
    "main": path.join(src, '/main.js'),
    "list": path.join(src, '/list.js'),
    "detail": path.join(src, '/detail.js')
  },
  output: {
    path: dist,
    filename: "[name].js"
  },
  resolve: {
    root: src,
    alias: {
      common: path.join(src, '/lib/common.js')
    }
  },
  module: {
    //加载器配置
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }, {
      test: require.resolve("jquery"),
      loader: "expose-loader?$!expose-loader?jQuery"
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader?name=images/[name].[ext]&limit=8192',
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)\w*/,
      loader: 'file?name=fonts/[name].[ext]'
    }, {
      test: /\.tmpl$/,
      // loader: 'mustache'
      // loader: 'mustache?minify'
      // loader: 'mustache?{ minify: { removeComments: false } }'
      loader: 'mustache?noShortcut'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      inject: false,
      template: src + '/index.html',
      filename: dist + '/index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['main'],
      inject: false,
      template: src + '/main.html',
      filename: dist + '/main.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['list'],
      inject: false,
      template: src + '/list.html',
      filename: dist + '/list.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['detail'],
      inject: false,
      template: src + '/detail.html',
      filename: dist + '/detail.html'
    }),

    new ExtractTextPlugin("[name].css"),
    new webpack.ProvidePlugin({
      Common: 'common',
      swal: 'sweetalert2'
    })
  ]
};

if (process.env.NODE_ENV !== 'production') {
  module.exports.devtool = 'eval-module-source-map'; //配置生成Source Maps，选择合适的选项
  module.exports.entry.test = path.join(src, '/test.js');
  module.exports.devServer = {
    host: '38.19.66.65',
    port: 8888,
    contentBase: dist, //本地服务器所加载的页面所在的目录
    colors: true, //终端中输出结果为彩色
    hot: true,
    inline: true,
    progress: true
  };
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin(), //热加载插件
    new HtmlWebpackPlugin({
      chunks: ['test'],
      template: src + '/test.html',
      filename: dist + '/test.html'
    }),
    new CopyWebpackPlugin([{
      from: "static/datas",
      to: "datas"
    }, {
      from: "static/WEB-INF",
      to: "WEB-INF"
    }])
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new CopyWebpackPlugin([{
      from: "static/WEB-INF",
      to: "WEB-INF"
    }])
  ]);
}
