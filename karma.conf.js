/*global module, process*/

'use strict';

module.exports = function(config) {
    config.set({
         files: [
            //polyfill like we do with chorme browsers
            // Grab all files in the app folder that contain .test.
            'node_modules/babel-polyfill/dist/polyfill.js',
            'test/*.test.js'
        ],

        frameworks: [
            'jasmine', 'intl-shim'
        ],

        plugins: [
            'karma-jasmine',
            'karma-webpack',
            'karma-sourcemap-loader',
            'karma-phantomjs-launcher',
            'karma-spec-reporter',
            'karma-chrome-launcher',
            'karma-intl-shim'
        ],

        reporters: [
            // Reference: https://github.com/mlex/karma-spec-reporter
            // Set reporter to print detailed results to console
            'spec'
        ],

        preprocessors: {
            // Reference: http://webpack.github.io/docs/testing.html
            // Reference: https://github.com/webpack/karma-webpack
            // Convert files with webpack and load sourcemaps
            'test/*.test.js': ['webpack', 'sourcemap']
        },

        browsers: [
            // Run tests using PhantomJS
            'PhantomJS'
        ],

        singleRun: true,

        webpack: {
        	devtool: 'inline-source-map',
            module: {
                loaders: [
                    { 
                        test: /\.js?$/, 
                        exclude: /(node_modules)/,
                        loader: 'babel-loader?plugins=rewire' 
                    },
                    {
                        // sass-loader for the origami pieces
                        test: /\.scss$/,
                        loader: 'null-loader'
                    },
                    {
				        test: /\.json$/,
				        loader: 'json'
				    }
                ]
            },
            resolve: {
                modulesDirectories: ['node_modules'],
                extensions: ['', '.js']
            },
            plugins: [
            ]
        },

        // Hide webpack build information from output
        webpackMiddleware: {
            noInfo: true
        }
    });
};