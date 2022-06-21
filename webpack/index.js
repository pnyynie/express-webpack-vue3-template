const fs = require('fs');
const path = require('path');
const resolve = url => path.resolve(__dirname, url);
const utils = require('./utils');
const createEnvironmentHash = require('./createEnvironmentHash');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const paths = {
  src: resolve('../client/src'),
  public: resolve('../client/public'),
  dist: resolve('../client/dist'),
  html: resolve('../client/html'),
  entrys: {},
  appWebpackCache: resolve('../node_modules/.cache'),
};

const entryPath = resolve('../client/entry');
fs.readdirSync(entryPath).forEach(file => {
  paths.entrys[file.split('.')[0]] = [entryPath + '/' + file];
});

module.exports = function (env) {
  console.log(env);
  const isProd = env === 'production';

  const prodPlugins = [];
  if (isProd) {
    prodPlugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      })
    );
  }

  const entry = {};
  Object.keys(paths.entrys).forEach(key => {
    entry[key] = isProd ? [...paths.entrys[key]] : [...paths.entrys[key], 'webpack-hot-middleware/client?reload=true'];
  });

  return {
    mode: env,
    entry,
    output: {
      hashFunction: 'xxhash64',
      path: paths.dist,
      filename: isProd ? 'js/[name].[contenthash].js' : 'js/[name].js',
      publicPath: '/',
      chunkFilename: isProd ? 'js/[name].[contenthash].chunk.js' : 'js/[name].js',
    },
    cache: {
      type: 'filesystem',
      version: createEnvironmentHash({ env }),
      cacheDirectory: paths.appWebpackCache,
      store: 'pack',
      buildDependencies: {
        defaultWebpack: ['webpack/lib/'],
        config: [__filename],
      },
    },
    resolve: {
      alias: {
        '@': paths.src,
      },
      extensions: ['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'],
    },
    plugins: [
      new VueLoaderPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: paths.public,
            to: paths.dist,
            toType: 'dir',
            noErrorOnMissing: true,
            globOptions: {
              ignore: ['**/.DS_Store', paths.public + '/index.html'],
            },
            info: {
              minimized: true,
            },
          },
        ],
      }),
      ...prodPlugins,
      ...Object.keys(paths.entrys).map(filename => {
        const _path = paths.html + '/' + filename + '.html';
        const template = utils.fileExists(_path) ? _path : paths.html + '/template.html';
        const title = require('./pageTitle')[filename];
        return new HtmlWebpackPlugin(
          Object.assign(
            {},
            {
              inject: 'body',
              filename: filename + '.html',
              template,
              title,
              chunks: [filename, 'commons', 'vendor'],
            },
            isProd
              ? {
                  minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                  },
                }
              : undefined
          )
        );
      }),
    ],
    module: {
      noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
      rules: [
        {
          test: /\.m?jsx?$/,
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['postcss-preset-env'],
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(svg)(\?.*)?$/,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name].[hash:8][ext]',
          },
        },
        {
          test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
          type: 'asset',
          generator: {
            filename: 'img/[name].[hash:8][ext]',
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          type: 'asset',
          generator: {
            filename: 'media/[name].[hash:8][ext]',
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
          type: 'asset',
          generator: {
            filename: 'fonts/[name].[hash:8][ext]',
          },
        },
      ],
    },
    optimization: {
      realContentHash: false,
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial',
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true,
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true,
            },
            mangle: {
              safari10: true,
            },
          },
          parallel: true,
          extractComments: false,
        }),
      ],
    },
  };
};
