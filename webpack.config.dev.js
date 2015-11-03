var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './web/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      include: path.join(__dirname, 'web'),
      exclude: /node_modules/,
      // react-transform config
      // https://github.com/gaearon/react-transform-hmr/issues/5
      query: {
        'stage': 0,
        'plugins': ['react-transform'],
        'extra': {
          'react-transform': {
            'transforms': [{
              'transform': 'react-transform-hmr',
              'imports': ['react'],
              'locals': ['module']
            }, {
              'transform': 'react-transform-catch-errors',
              'imports': ['react', 'redbox-react']
            }]
          }
        }
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
