const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const chalk = require('chalk')
const commonConfig = require('./common')
const helpers = require('./helpers')

const isProxyProd = helpers.hasNpmFlag('proxy-prod')
console.log(chalk.green('is proxy prod?'), isProxyProd ? chalk.green('true') : chalk.red('false'))
const ENV = process.env.ENV = process.env.NODE_ENV = 'development'
const METADATA = {
  baseUrl: '/',
  host: '0.0.0.0',
  port: 4000,
  ENV: ENV
}

module.exports = webpackMerge(commonConfig({ env: ENV }), {
  devtool: 'eval',
  output: {

    /** 
     * The output directory as absolute path (required).
     *
     * See: https://webpack.js.org/configuration/output/#output-path
     */
    path: helpers.root('dist'),

    publicPath: '/',

    /** 
     * Specifies the name of each output file on disk.
     * IMPORTANT: You must not specify an absolute path here!
     *
     * See: https://webpack.js.org/configuration/output/#output-filename
     */
    filename: '[name].bundle.js',

    /** 
     * The filename of the SourceMaps for the JavaScript files.
     * They are inside the output.path directory.
     *
     * See: https://webpack.js.org/configuration/output/#output-sourcemapfilename
     */
    sourceMapFilename: '[name].map',

    /** 
     * The filename of non-entry chunks as relative path
     * inside the output.path directory.
     *
     * See: https://webpack.js.org/configuration/output/#output-chunkfilename
     */
    chunkFilename: '[id].chunk.js'

  },

  devServer: {
    port: METADATA.port,
    host: METADATA.host,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    proxy: {
      "/api": {
        target: isProxyProd ? 'https://api.darlin.me' : 'http://0.0.0.0:9999',
        changeOrigin: isProxyProd,
        secure: !isProxyProd,
        pathRewrite: {
          '^/api': ''
        },
        onProxyReq: function(proxyReq, req, res) {
          if (isProxyProd) {
            proxyReq.setHeader('referer', 'https://www.darlin.me')
          }
        }
      }
    }
  },

  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
})
