var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var paths = {
    pages: ['index.html']
};

// var tsProject = ts.createProject("tsconfig.json");

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
