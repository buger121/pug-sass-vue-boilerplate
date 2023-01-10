//静态文件拷贝

const { src, dest, parallel } = require('gulp');
const path = require('./path');

//复制assets文件
const copyFile = () => {
    return src([path.src.assets]).pipe(dest(path.dist.assets));
};

//复制favicon
const copyIcon = () => {
    return src(path.src.icon).pipe(dest(path.dist.pug));
};

//复制三方文件
const copyVendor = () => {
    return src(path.src.vendor).pipe(dest(path.dist.vendor));
};

exports.copyFile = parallel(copyFile, copyIcon, copyVendor);
