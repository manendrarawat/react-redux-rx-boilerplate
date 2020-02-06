"use strict";

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = function() {
  return {
    mode: "development",

    entry: {
      polyfills: ["@babel/polyfill"],
      app: path.join(__dirname, "src"),
      vendor: ["react", "react-dom"]
    },

    output: {
      filename: "js/[name].[contenthash].js",
      path: path.join(__dirname, "../dist/client"),
      publicPath: "/groceries/"
    },

    optimization: {
      moduleIds: "hashed",
      runtimeChunk: false,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            minChunks: 2
          }
        }
      }
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            cacheDirectory: true
          }
        },

        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        },

        {
          test: /\.(jpe?g|png|gif|bmp|svg)/i,
          exclude: /node_modules/,
          include: [path.resolve(__dirname, "img")],
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8000,
                name: "img/[name].[contenthash].[ext]"
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new CleanWebpackPlugin({
        dry: false,
        dangerouslyAllowCleanPatternsOutsideProject: true,
        cleanOnceBeforeBuildPatterns: [
          path.resolve(__dirname, "../dist/client/js/*"),
          path.resolve(__dirname, "../dist/client/img/*")
        ]
      }),

      new webpack.EnvironmentPlugin({ ENV: "local" }),

      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src/templates/index.html"),
        filename: "index.html",
        inject: "body",
        minify: false
      })
    ],

    resolve: {
      modules: [path.resolve(__dirname, "node_modules")],
      alias: {
        src: path.resolve(__dirname, "src"),
        images: path.resolve(__dirname, "img")
      }
    }
  };
};
