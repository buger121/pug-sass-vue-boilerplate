import { nodeResolve } from '@rollup/plugin-node-resolve';  // 支持从nodemodules引入三方库
import css from "rollup-plugin-import-css"; // 支持引入css文件
import replace from '@rollup/plugin-replace';

export default {
    input: 'src/js/index.js',
    output: {
        file: 'src/js/bundle.js',
        format: 'cjs',
        sourcemap: true,
    },
    plugins: [
        nodeResolve(), 
        css(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),  //配置vue的环境production，development
            'process.env.VUE_ENV': JSON.stringify('browser')
        })
    ]
};
