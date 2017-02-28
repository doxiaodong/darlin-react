const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlElementsPlugin = require('./plugin/html-elements')
const helpers = require('./helpers')

function postCssPlugins() {
  return [
    autoprefixer({
      browsers: ['last 1 version', '> 10%']
    })
  ]
}

module.exports = function(option) {
  const isProd = option.env === 'production'
  return {
    entry: {
      'main': './src/index.tsx'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        styles: helpers.root('src/styles')
      },
      modules: [
        './src',
        'node_modules'
      ]
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader'
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  minimize: isProd
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: postCssPlugins
                }
              },
              'sass-loader'
            ]
          }),

          exclude: [/global\.scss$/]
        },
        {
          test: /(global\.scss|\.css)$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: false,
                  minimize: isProd
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: postCssPlugins
                }
              },
              'sass-loader'
            ]
          })
        }
      ]
    },

    plugins: [
      new HtmlElementsPlugin({
        headTags: require('./head-config')
      }),

      new ExtractTextPlugin(helpers.static + 'main.[hash].css'),

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
