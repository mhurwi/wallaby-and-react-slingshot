'use strict';

let wallabyWebpack = require('wallaby-webpack');

let webpackConfig = {
  module: {
    noParse: [
      /\/sinon\.js/
    ],
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpe?g|png|gif)$/i, loader: 'file?name=[name].[ext]'},
      {test: /\.ico$/, loader: 'file?name=[name].[ext]'},
      {test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap']},
      {test: /\.json$/, loader: "json"}
    ]
  },
  externals: {
    // Use external version of React instead of rebuilding it
    "react": "React",
    jsdom: 'window',
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react/addons': true,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
     sinon: 'sinon/pkg/sinon'
   }
  }
};

module.exports = function (wallaby) {

  let webpackPostprocessor = wallabyWebpack(webpackConfig);

  return {
    files: [
      {pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false},
      'src/**/*.css',
      '!src/**/*.spec.js',
      {pattern: 'src/**/*.js*', load: false}
    ],

    tests: [
      {pattern: 'src/**/*.spec.js', load: false}
    ],

    compilers: {
      '**/*.js*': wallaby.compilers.babel()
    },

    postprocessor: webpackPostprocessor,

    testFramework: 'mocha',

    env: {
      kind: 'electron'
    },

    setup: function () {
      window.__moduleBundler.loadTests();
    }
  };
};
