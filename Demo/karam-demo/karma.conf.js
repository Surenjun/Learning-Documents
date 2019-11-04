module.exports = function (config) {
    config.set({

        basePath: '',

        frameworks: ['jasmine'],

        files: [
            'src/**/*.js',
            //test目录下
            'test/**/*.spec.js'
        ],

        exclude: [],

        preprocessors: {
            'src/**/*.js': ['webpack','coverage'],
            'test/**/*.spec.js': ['webpack']
        },

        reporters: ['progress', 'coverage'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['Chrome'],

        singleRun: false,

        concurrency: Infinity,
        webpack:{},
        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        }
    })
};
