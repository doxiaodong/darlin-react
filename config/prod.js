const webpack = require('webpack')
const webpackMerge = require('webpack-merge') // Used to merge webpack configs
const MinifyPlugin = require('babel-minify-webpack-plugin')
const commonConfig = require('./common') // The settings that are common to prod and dev
const helpers = require('./helpers')

const JsonMinifyPlugin = require('./plugin/json-minify')

const ENV = process.env.NODE_ENV = process.env.ENV = 'production'

module.exports = webpackMerge(commonConfig({ env: ENV }), {
  devtool: 'source-map',
  output: {

    /** 
     * The output directory as absolute path (required).
     *
     * See: https://webpack.js.org/configuration/output/#output-path
     */
    path: helpers.root('dist'),

    // use static server
    publicPath: '//static.tristana.cc/react/',
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

    new MinifyPlugin()

  ],

  node: {
    global: true
  }
})
