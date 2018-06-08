const pkg = require('./package.json');

module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['mocha', 'expect', 'expect-maptalks', 'happen'],
        client: {
            mocha: {
                timeout : 8000
            }
        },
        files: [
            'node_modules/maptalks/dist/maptalks.js',
            'dist/' + pkg.name + '.js',
            'test/**/*.js'
        ],
        preprocessors: {},
        browsers: ['Chrome'],
        reporters: ['mocha'],
        customLaunchers: {
            IE10: {
                base: 'IE',
                'x-ua-compatible': 'IE=EmulateIE10'
            },
            IE9: {
                base: 'IE',
                'x-ua-compatible': 'IE=EmulateIE9'
            }
        },
        logLevel: config.LOG_INFO,
        singleRun: true
    });
};
