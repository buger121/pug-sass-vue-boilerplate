const { src, dest } = require("gulp");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync").get("Main");
const terser = require("gulp-terser");
const lazypipe = require("lazypipe");
const babel = require("gulp-babel");

const path = require("./path");

const jsHandle = lazypipe()
    .pipe(plumber)
    .pipe(babel, {
        presets: [["@babel/env", { modules: false }]],
        plugins: ["@babel/plugin-syntax-import-assertions"],
    })
    .pipe(terser);

const jsCommonTask = () => {
    return src([path.src.js, "!src/js/config/**"], { sourcemaps: true })
        .pipe(jsHandle())
        .pipe(dest(path.dist.js, { sourcemaps: "." }))
        .pipe(browserSync.stream());
};

exports.jsTask = jsCommonTask;
