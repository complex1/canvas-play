const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin
const path = require('path')
module.exports = {
  mode: 'development',
  entry: __dirname + "/index.js", // webpack entry point. Module to start building dependency graph
  output: {
    path: __dirname + '/dist', // Folder to store generated bundle
    filename: 'bundle.js',  // Name of generated bundle after build
    publicPath: '' // public URL of the output directory when referenced in a browser
  },
  module: {  // where we defined file patterns and their loaders
      rules: [
      ]
  },
  plugins: [  // Array of plugins to apply to build chunk
      new HtmlWebpackPlugin({
          template: __dirname + "/public/index.html",
          inject: 'body'
      })
  ],
  devServer: {  // configuration for webpack-dev-server
      // contentBase
    static : {
      directory : path.join(__dirname, "public/")
    },
    port: 3001,
    // hotOnly
    hot: "only",
  }
};