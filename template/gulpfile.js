const path = require('path');
const gulp = require('gulp');
const pkg = require('./package.json');
const BundleHelper = require('maptalks-build-helpers').BundleHelper;
{{#runner}}
const Server = require('karma').Server;
{{/runner}}
const bundleHelper = new BundleHelper(pkg);

gulp.task('build', () => {
    return bundleHelper.bundle('index.js');
});

gulp.task('minify', ['build'], () => {
    bundleHelper.minify();
});

gulp.task('watch', ['build'], () => {
    gulp.watch(['index.js', './gulpfile.js'], ['build']);
});

{{#runner}}
/**
 * Run test once and exit
 */
gulp.task('test', ['build'], function (done) {
    const karmaConfig = {
        configFile: path.join(__dirname, 'karma.config.js')
    };
    new Server(karmaConfig, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
    const karmaConfig = {
        configFile: path.join(__dirname, 'karma.config.js')
    };
    gulp.watch(['index.js'], ['test']);
    let started = false;
    if (!started) {
        const karmaServer = new Server(karmaConfig, done);
        karmaServer.start();
        started = true;
    }
});
{{/runner}}

gulp.task('default', ['watch']);
