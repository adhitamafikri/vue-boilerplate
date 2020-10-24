const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const DotenvWebpack = require('dotenv-webpack')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: {
    index: 'src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: {
          loader: 'vue-loader',
        },
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'vue-style-loader'],
      },

      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'node-sass', 'sass-loader', 'vue-style-loader'],
      },
    ],
  },

  plugins: [
    new DotenvWebpack(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new VueLoaderPlugin(),
  ],

  devServer: {
    index: path.resolve(__dirname, 'dist/public/index.html'),
    contentBase: path.resolve(__dirname, 'dist/public'),
    compress: false,
    port: 4080,
    writeToDisk: true,
    historyApiFallback: true,
  },
}
