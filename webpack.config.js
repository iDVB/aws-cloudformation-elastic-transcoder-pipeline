const slsw = require('serverless-webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

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
  mode: 'production',
};
