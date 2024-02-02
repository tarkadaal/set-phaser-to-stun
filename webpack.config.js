const path = require('path');

module.exports = {
  entry: './src/entry_point.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
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
