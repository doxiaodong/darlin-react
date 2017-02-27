const webpack = require('webpack')
const webpackMerge = require('webpack-merge') // Used to merge webpack configs
const commonConfig = require('./common') // The settings that are common to prod and dev
const helpers = require('./helpers')

const WebpackMd5Hash = require('webpack-md5-hash')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')

const JsonMinifyPlugin = require('./plugin/json-minify')

const ENV = process.env.NODE_ENV = process.env.ENV = 'production'

module.exports = webpackMerge(commonConfig(), {
  devtool: 'source-map',
  output: {

    /** 
     * The output directory as absolute path (required).
     *
     * See: https://webpack.js.org/configuration/output/#output-path
     */
    path: helpers.root('dist'),

    // use static server
    publicPath: '//static.darlin.me/',
    // publicPath: '/',

    /** 
     * Specifies the name of each output file on disk.
     * IMPORTANT: You must not specify an absolute path here!
     *
     * See: https://webpack.js.org/configuration/output/#output-filename
     */
    filename: helpers.static + '[name].[chunkhash].js',

    /** 
     * The filename of the SourceMaps for the JavaScript files.
     * They are inside the output.path directory.
     *
     * See: https://webpack.js.org/configuration/output/#output-sourcemapfilename
     */
    sourceMapFilename: '[file].map',

    /** 
     * The filename of non-entry chunks as relative path
     * inside the output.path directory.
     *
     * See: https://webpack.js.org/configuration/output/#output-chunkfilename
     */
    chunkFilename: helpers.static + '[id].[chunkhash].chunk.js',

    jsonpFunction: 'jp'

  },

  /** 
   * Add additional plugins to the compiler.
   *
   * See: https://webpack.js.org/configuration/plugins/
   */
  plugins: [
    new JsonMinifyPlugin({
      src: 'src/assets/i18n',
      dest: 'assets/i18n'
    }),

    /** 
     * Plugin: WebpackMd5Hash
     * Description: Plugin to replace a standard webpack chunkhash with md5.
     *
     * See: https://www.npmjs.com/package/webpack-md5-hash
     */
    new WebpackMd5Hash(),

    /** 
     * Plugin: UglifyJsPlugin
     * Description: Minimize all JavaScript output of chunks.
     * Loaders are switched into minimizing mode.
     *
     * See: https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
     * NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
     */
    new UglifyJsPlugin({
      sourceMap: true,
      beautify: false, //prod
      output: {
        comments: false
      }, //prod
      mangle: {
        screw_ie8: true
      }, //prod
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      }
    })

  ],

  node: {
    global: true,
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
})
