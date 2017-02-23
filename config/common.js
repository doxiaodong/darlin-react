const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function() {
  return {
    entry: {
      'main': './src/index.tsx'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js']
    },

    module: {
      rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader'
      }]
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: ['main']
      }),

      new HtmlWebpackPlugin({
        template: 'src/index.html',
        minify: {
          minifyCSS: true,
          collapseWhitespace: true,
          removeComments: true
        },
        chunksSortMode: 'dependency'
      })
    ],

    node: {
      global: true,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  }
}
