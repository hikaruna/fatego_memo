const path = require('path');

module.exports = {
  entry: {
    app: 'index.js'
  },
  output: {
    path: './',
    filename: '[name].bundle.js'
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
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel", 
        query:{
          presets: ['es2015']
        }
      }
    ]
  }
};
