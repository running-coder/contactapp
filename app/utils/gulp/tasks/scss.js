import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';

module.exports = function (gulp, pkg, functions) {
    return function (cb) {

        return gulp.src(pkg.path.src + '/scss/app.scss')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['ie 10-11', 'last 2 versions'],
                cascade: false
            }))
            .pipe(cssnano({keepSpecialComments: 0}))
            .pipe(rename('app.css'))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(pkg.path.dist + '/css/'));

    };
};