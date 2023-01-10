const del = require("del");

const path = require("./path");

const resetFolder = (done) => {
    del.sync(["dist/**"]);
    done();
};

const resetAssets = (done) => {
    del.sync([path.dist.assets]);
    done();
};

const resetMap = (done) => {
    del.sync(["./dist/**/*.map"]);
    done();
};

exports.resetFolder = resetFolder;
exports.resetAssets = resetAssets;
exports.resetMap = resetMap;
