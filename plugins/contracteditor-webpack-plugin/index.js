const webpack = require('webpack');

module.exports = function () {
  return {
    name: 'contracteditor-webpack-plugin',
    configureWebpack(_config, isServer, utils) {
      return {
        node: {
          fs: 'empty',
          net: 'empty',
          tls: 'empty',
        },
        plugins: [
          new webpack.IgnorePlugin(/jsdom$/),
        ],
      };
    },
  };
}