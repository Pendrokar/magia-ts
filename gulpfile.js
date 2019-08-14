const gulp = require("gulp");
const ts = require('gulp-typescript');
const sass = require('gulp-sass');

// SCSS => CSS
sass.compiler = require('node-sass');

const sassTask = function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass({
            sourceMap: false,
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
}

gulp.task('sass', sassTask);

const sassWatch = function () {
    gulp.watch('./sass/**/*.scss', gulp.series('sass'));
}

gulp.task('sass:watch', sassWatch);



// TypeScript => JavaScript
const tsTask = function () {
    return gulp.src('js/*.ts')
        .pipe(ts({
            target: 'es6',
            module: 'system',
            noImplicitAny: true
        }))
        .pipe(gulp.dest('js'));
}
gulp.task('tsc', tsTask);

const tscWatch = function () {
    gulp.watch('./js/**/*.ts', gulp.series('tsc'));
}

gulp.task('tsc:watch', tscWatch);

// Run watch tasks
gulp.task('watch', gulp.parallel(sassWatch, tscWatch));

// Run default tasks
gulp.task('default', gulp.series(sassTask, tsTask));
