const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development', /* production */
  // devtool: 'source-map',

  entry: {
    core: [
      '@babel/polyfill',
      './client/js/index.ts', 
    ],
  },

  output: {
    path: path.resolve(__dirname, './client'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test : /\.js$/,
        include: [
          path.resolve(__dirname, 'src/client')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          },
        }
      },
      
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.webpack.json',
          },
        },
      },
    ],
  },  

  plugins: [],
  optimization: {},

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.json', '.css'],
  }
};