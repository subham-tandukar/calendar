const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

// Load environment variables from .env file
dotenv.config();

module.exports = {
  mode: process.env.NODE_ENV, // or 'development'
  entry: './public/ok-widgets/index.js',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'okcalendar.min.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    }),
    new CssMinimizerPlugin(),
  ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public/okcalendar@1.0.0/dist'),
    },
    compress: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'okcalendar.min.css',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
};