const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
/*
    --TOP LEVEL FUNCTIONS--
    gulp.task - Define task
    gulp.src - Point to files to use
    gulp.dest - Point to folder to output
    gulp.watch - Watch files and folders for changes
*/

//logs message
gulp.task('message', function () {
    return console.log('gulp is runing...');
});


//Copy All HTML fils
gulp.task("copyHtml", async () => {
    await new Promise((resolve, reject) => {
        gulp.src("src/*.html")
            .pipe(gulp.dest('dist'))
            .on("end", resolve);
    });
});

//Optimize images
gulp.task("imageMin", async () => {
    await new Promise((resolve, reject) => {
        gulp.src('src/images/*')
            .pipe(imagemin())
            .pipe(gulp.dest('dist/images'))
            .on("end", resolve);
    });
});

//Minify js
gulp.task("minify", async () => {
    await new Promise((resolve, reject) => {
        gulp.src('src/js/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('dist/js'))
            .on("end", resolve);
    });
});

//Compile Sass
gulp.task("sass", async () => {
    await new Promise((resolve, reject) => {
        gulp.src('src/sass/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('dist/css'))
            .on("end", resolve);
    });
});

// Scripts
gulp.task("scripts", async () => {
    await new Promise((resolve, reject) => {
        gulp.src("src/js/*.js")
            .pipe(concat('main.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/js'))
            .on("end", resolve);
    });
});

//Gulp watch al process function
gulp.task('watch', () => {
    gulp.watch(
        ['src/js/*.js', 'src/images/*', 'src/sass/*.scss', 'src/*.html'],
        gulp.series(['scripts', 'imageMin', 'sass', 'copyHtml'])
    );
});