//数据抽离：将json数据合并写到data目录下的data.json文件中

const { series } = require('gulp');
const gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    merge = require('gulp-merge-json'),
    clean = require('gulp-clean'),
    gulpPath = require('./path'),
    template = require('gulp-template');

const cleanTask = () => {
    return gulp.src('src/data/data.json', { read: false }).pipe(clean());
};

const dataTask = () => {
    return gulp
        .src(gulpPath.src.data)
        .pipe(
            merge({
                fileName: 'data.json',
                edit: (json, file) => {
                    // Extract the filename and strip the extension
                    var filename = path.basename(file.path),
                        primaryKey = filename.replace(
                            path.extname(filename),
                            ''
                        );

                    // Set the filename as the primary key for our JSON data
                    var data = {};
                    data[primaryKey.toUpperCase()] = json;

                    return data;
                },
            })
        )
        .pipe(gulp.dest(gulpPath.dist.data))
        .pipe(gulp.dest('dist/data'));
};

exports.dataTask = series(cleanTask, dataTask);
