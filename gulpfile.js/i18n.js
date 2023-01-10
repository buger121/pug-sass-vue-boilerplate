//将多语言excel文件转为json格式
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const { src, dest, series } = require('gulp');
const path = require('./path');

const result = excelToJson({
    sourceFile: 'src/i18n/translate.xlsx',
    header: {
        rows: 1,
    },
    sheets: ['Sheet1'], //默认只转换sheet1
    columnToKey: {
        A: 'id',
        B: 'zh', //中
        C: 'en', //英语
    },
});

//gulp不支持同步任务，加上async返回异步任务
const i18nTask = async () => {
    try {
        fs.writeFileSync('src/i18n/i18n.json', JSON.stringify(result), {
            flag: 'w+',
        });
    } catch (err) {
        console.log(err);
    }
    return;
};

const copyi18n = () => {
    return src(path.src.i18n).pipe(dest(path.dist.i18n));
};

exports.i18nTask = series(i18nTask, copyi18n);
