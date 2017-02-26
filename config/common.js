const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlElementsPlugin = require('./plugin/html-elements')
const helpers = require('./helpers')

module.exports = function() {
  return {
    entry: {
      'main': './src/app/index.tsx'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        styles: helpers.root('src/app/styles')
      },
      modules: [
        './src',
        'node_modules'
      ]
    },

    module: {
      rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader'
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [
                  autoprefixer({
                    browsers: ['last 1 version', '> 10%']
                  })
                ]
              }
            }
          },
          'sass-loader'
        ],
        exclude: [/\.global\.scss$/]
      }]
    },

    plugins: [
      new HtmlElementsPlugin({
        headTags: require('./head-config')
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: ['main']
      }),

      new CopyWebpackPlugin(
        [
          { from: 'src/assets', to: 'assets' },
          { from: 'src/favicon.ico', to: 'favicon.ico' },
          // { from: 'src/sw.js', to: 'sw.js' },
        ],
        { ignore: ['.DS_Store', 'i18n/**/*'] }
      ),

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
