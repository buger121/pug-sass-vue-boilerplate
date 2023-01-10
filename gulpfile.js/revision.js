//给js，css文件添加版本号
const { src, dest, series } = require("gulp");
const path = require("./path");
const rev = require("gulp-rev");
const revReplace = require("gulp-rev-replace");
const revdel = require("gulp-rev-delete-original");

function revision() {
    return src(["dist/**/*.{css,js}", "!dist/js/config/**"])
        .pipe(rev())
        .pipe(
            revdel({
                exclude: /.*\.json$/,
            })
        )
        .pipe(dest("dist"))
        .pipe(rev.manifest())

        .pipe(dest("dist"));
}

function reWrite() {
    const manifest = src("dist/rev-manifest.json");

    return src([path.dist.html, path.dist.js])
        .pipe(revReplace({ manifest: manifest }))
        .pipe(dest("dist"));
}

exports.revision = series(revision, reWrite);
