const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/entry_point.js',
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin(
      {
        title: 'Caching',
      }
    )
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  ignoreWarnings: [
    {
      message: /size limit/
    },
    {
      message: /limit the size of your bundles/
    }
  ]
};
