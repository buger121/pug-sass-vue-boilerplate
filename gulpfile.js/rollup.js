//在gulp pipeline中执行rollup命令，打包js module构造bundle
const { exec } = require("node:child_process");

let HELPERS = {
    execute: (command) => {
        const process = exec(command);
        process.stdout.on("data", (data) => {
            console.log(data.toString());
        });
        process.stderr.on("data", (data) => {
            console.log(data.toString());
        });
        process.on("exit", (code) => {
            console.log("Process exited with code " + code.toString());
        });
        return process;
    },
};

function rollupTask() {
    return HELPERS.execute("rollup -c");
}

exports.rollupTask = rollupTask;
