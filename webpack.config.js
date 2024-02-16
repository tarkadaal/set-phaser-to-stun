const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/entry_point.js',
  mode: 'production',
  cache: {
    type: 'filesystem'
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        title: 'Caching'
      }
    )
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  optimization: {
    runtimeChunk: 'single',

    splitChunks: {

      cacheGroups: {

        vendor: {

          test: /[\\/]node_modules[\\/]/,

          name: 'vendors',

          chunks: 'all'

        }

      }

    }
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif|wav|mp3|ogg|xml)$/i,
        type: 'asset/resource'
      }
    ]
  },
  ignoreWarnings: [
    {
      message: /size limit/
    },
    {
      message: /limit the size of your bundles/
    }
  ],
  resolve: {
    alias: {
      Assets: path.resolve(__dirname, './assets/')
    }
  }

}
