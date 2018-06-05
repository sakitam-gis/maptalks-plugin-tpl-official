const gulp = require('gulp');
const pkg = require('./package.json');
const BundleHelper = require('maptalks-build-helpers').BundleHelper;
{{#runner}}
const TestHelper = require('maptalks-build-helpers').TestHelper;
const testHelper = new TestHelper();
const karmaConfig = require('./karma.config');
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
gulp.task('test', ['build'], () => {
    testHelper.test(karmaConfig);
});

gulp.task('tdd', ['build'], () => {
    karmaConfig.singleRun = false;
    gulp.watch(['index.js'], ['test']);
    testHelper.test(karmaConfig);
});
{{/runner}}

gulp.task('default', ['watch']);
