const path = require('path');

module.exports = {
  entry: 'main.jsx',
  output: {
    path: './docs/',
    filename: 'bundle.js',
    publicPath: '/fatego_memo/'
  },
  devServer: {
    contentBase: 'docs'
  },
  devtool: 'source-map',
  resolve: {
    root: [
      path.resolve('./src')
    ]
  },
  module: {
    loaders: [
      { 
        test: /\.jsx$/, 
        exclude: /node_modules/, 
        loader: "babel", 
        query:{
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
