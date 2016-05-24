'use strict';

import gulp from 'gulp';

let pkg = require('./package.json'),
    functions = {
        removeDoubleSlashes(string) {
            return string.replace(/([^:])(?:[\/]{2,})/g, '$1/');
        },
        cleanAssetPath(string) {
            return string.replace(/[\\\/]/g, '/');
        }
    };

gulp.task('vtl', getTask('vendor-to-libraries'));
gulp.task('scss', getTask('scss'));
gulp.task('default', gulp.parallel('scss'));

function getTask(task) {
    return require('./tasks/' + task)(gulp, pkg, functions);
}

gulp._vars = gulp._vars || {};

gulp.task('watch', function () {
    gulp.watch(pkg.path.src + '/scss/**/*.scss', gulp.task('scss')).on('change', function (file) {
        gulp._vars.scss = {file: file};
    });
});