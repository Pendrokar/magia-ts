const gulp = require("gulp");
// const browserify = require("browserify");
// const source = require('vinyl-source-stream');
const ts = require('gulp-typescript');
// const tsify = require("tsify");
const sass = require('gulp-sass');
//const paths = {
//    pages: ['index.html']
//};

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

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});



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



// Run default tasks
gulp.task('default', gulp.series(sassTask, tsTask));

// var tsProject = ts.createProject("tsconfig.json");

/*

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});
gulp.task("default", gulp.series("copy-html", function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['js/main.ts'],
        cache: {},
        packageCache: {}
    })
        // .add('js/main.ts')
        .plugin(tsify, { target: 'es6', module: 'system' })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
}));
*/