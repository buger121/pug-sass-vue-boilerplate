const { watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create('Main');
const { pugTask } = require('./pug');
const { dataTask } = require('./data');
const { cssTask } = require('./css');
const { jsTask } = require('./javascript');
const { copyFile } = require('./copyFile');
const { revision } = require('./revision');
const { rollupTask } = require('./rollup');
const { i18nTask } = require('./i18n');
const { resetFolder, resetMap, resetAssets } = require('./reset');
const fse = require('fs-extra');
const fs = require('fs');
const nodePath = require('path');

const path = require('./path.js');

//本地服务配置
const serveTask = (done) => {
    browserSync.init({
        server: {
            baseDir: './dist',
        },
        port: 3000,
        open: false,
        notify: false,
				ghostMode: false
    });
    done();
};

//监测修改，实时编译
const watchTask = (done) => {
    watch(path.src.pug[0], pugTask);
    watch(path.src.sass, cssTask);
    watch([path.src.js, '!src/js/bundle**'], series(rollupTask, jsTask));
    watch(path.src.assets, series(resetAssets, copyFile));
    watch(path.src.vendor, copyFile);
    watch([path.src.data, '!src/data/data.json'], series(dataTask, pugTask));

    done();
};

//将编译完成后的dist目录复制到上一层与dev同级的目录（项目部署地址）
const srcDir = `./dist`;
const destDir = `../`;
const buildTask = (done) => {
    try {
        fs.readdirSync(destDir).forEach((file) => {
            if (file !== 'dev') {
                fs.rmSync(destDir + file, { recursive: true });
            }
        });
        fse.copySync(srcDir, destDir, { overwrite: true });
    } catch (err) {
        console.error(err);
    }
    done();
};

exports.default = series(
    resetFolder,
    dataTask,
    i18nTask,
    rollupTask,
    parallel(copyFile, pugTask, jsTask, cssTask),
    serveTask,
    watchTask
);
exports.watch = series(serveTask, watchTask);
exports.build = series(
    resetFolder,
    dataTask,
    i18nTask,
    rollupTask,
    parallel(copyFile, pugTask, cssTask, jsTask),
    resetMap,
    revision,
    buildTask
);
exports.reset = resetFolder;
