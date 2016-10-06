var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create(), 
    reload = browserSync.reload;

gulp.task('styles', function(){
    gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('src/css/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('pug', function(){
    gulp.src('src/pug/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('src/html/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function(){
    browserSync.init({
        open:false,
        server: {
            baseDir: 'src/html',
        },
    })
});


gulp.task('default', ['browserSync'], function(){
    gulp.watch('src/sass/**/*.scss',['styles']);
    gulp.watch('src/pug/**/*.pug',['pug']);
    gulp.watch('src/js/**/*.js',browserSync.reload)
});