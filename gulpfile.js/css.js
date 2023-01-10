//css文件工程化配置
//使用postcss编译器，添加自动添加前缀、css文件压缩插件

const { src, dest, series } = require('gulp');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const mq = require('postcss-sort-media-queries');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').get('Main');

const path = require('./path');

const sassTask = () => {
    return src(path.src.sass, { sourcemaps: true })
        .pipe(
            plumber({
                errorHandler: notify.onError('Error: <%= error.message %>'),
            })
        )
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([mq(), autoprefixer(), cssnano()]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(path.dist.css, { sourcemaps: '.' }))
        .pipe(browserSync.stream());
};

exports.cssTask = series(sassTask);
