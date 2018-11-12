// Webpack v4
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pathToIndexHtml = require.resolve('./src/template/index.html');

module.exports = {
  entry: {main: './src/scripts/index.js'},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'source-map-loader',
          'babel-loader',
        ],
        enforce: "pre"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve(__dirname, './node_modules/compass-mixins'),
              ],
            },
          },
        ],
      },
      {
        test: pathToIndexHtml,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
          'extract-loader',
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
