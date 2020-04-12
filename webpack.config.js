const webpack = require('webpack');
const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin'); // heroku 배포 때 파일 대소문자 자동 변환 문제 때문에 사용

module.exports = {
  mode: 'production', /* production */
  // devtool: 'source-map',

  entry: {
    core: [
      '@babel/polyfill',
      './client/ts/index.ts', 
    ],
  },

  output: {
    path: path.resolve(__dirname, './client'),
    filename: 'bundle.js',
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
  ],
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