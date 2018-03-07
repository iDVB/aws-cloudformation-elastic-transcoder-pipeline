const slsw = require('serverless-webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, 'functions')],
        loader: 'babel-loader',
        options: {
          presets: ['stage-0'],
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([path.resolve(__dirname, 'functions/**/*.json')], {
      debug: 'warning',
    }),
  ],
  mode: 'production',
};
