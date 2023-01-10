import { nodeResolve } from '@rollup/plugin-node-resolve';  // 支持从nodemodules引入三方库
import css from "rollup-plugin-import-css"; // 支持引入css文件

export default {
    input: 'src/js/index.js',
    output: {
        file: 'src/js/bundle.js',
        format: 'cjs',
        sourcemap: true,
    },
    plugins: [nodeResolve(), css()]
};
