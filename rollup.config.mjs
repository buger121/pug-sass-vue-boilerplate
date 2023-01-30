import { nodeResolve } from '@rollup/plugin-node-resolve';  // 支持从nodemodules引入三方库
import commonjs from '@rollup/plugin-commonjs';
import css from "rollup-plugin-import-css"; // 支持引入css文件
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';

export default {
    input: 'src/js/index.js',
    output: {
        file: 'src/js/bundle.js',
        format: 'iife',
        name: 'myModule',
        sourcemap: true,
    },
    external: [
        // /node_modules/ 
        'vue',
        'vue-i18n'
    ],
    plugins: [
        nodeResolve({
            moduleDirectories: ['node_modules']
        }), 
        commonjs({
            include: 'node_modules/**'
        }),
        css(),
        json(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),  // 配置vue的环境production，development
            'process.env.VUE_ENV': JSON.stringify('browser')
        }),
        alias({
            entries: [
                { find: 'vue', replacement: 'vue/dist/vue.esm.js' },
                { find: 'vue-i18n', replacement: 'vue-i18n/dist/vue-i18n.esm.js' },
            ]
        })
    ]
};
