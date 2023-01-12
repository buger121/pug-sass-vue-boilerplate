//数据抽离：将json数据合并写到data目录下的data.json文件中

const { series } = require('gulp'),
    gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    merge = require('gulp-merge-json'),
    gulpPath = require('./path')

//先重置data.json文件
const resetTask = async () => {
    fs.writeFileSync('./src/data/data.json', '{}');
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

exports.dataTask = series(resetTask, dataTask);
