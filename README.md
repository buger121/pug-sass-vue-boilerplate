# pug-sass-vue-boilerplate
网站架构模板，集成了pug，sass以及vue。使用gulp(v4)配置工程，rollup进行模块化打包。
## 项目目录结构
```
pug-sass-vue-boilerplate
├─.eslintrc.js				//eslint配置文件
├─.gitignore				//git提交忽略
├─.prettierrc				//prettier配置文件
├─favicon.ico				//标签icon
├─package.json														
├─README.md
├─rollup.config.mjs				//rollup打包工具配置，打包js模块到bundle.js
├─src
|  ├─index.pug				//首页
|  ├─view				//视图文件夹
|  |  ├─pages				//页面
|  |  ├─layout				//布局：header、footer、aside
|  |  ├─config				//head部分的配置：css,js文件引入；meta配置
|  |  ├─components				//组件：更加原子化的布局，如button、card
|  |  ├─base				//html基本结构划分，所有页面继承于此
|  ├─vendor				//三方依赖文件
|  ├─sass				//样式文件夹
|  |  ├─style.scss				//样式根文件，引入所有模块
|  |  ├─utils				//工具文件：函数、工具类、变量、混入
|  |  ├─pages				//页面样式
|  |  ├─layout				//布局样式
|  |  ├─components				//组件样式
|  |  ├─base				//样式reset
|  ├─js
|  | ├─bundle.js				//rollup打包后生成的js文件
|  | ├─bundle.js.map				//js映射，便于调试
|  | ├─index.js				//入口js文件
|  | ├─modules				//模块js文件夹
|  | ├─base				//基础js文件夹：工具函数、多语言配置、响应式字体设置
|  | ├─api				//接口配置文件夹：axios配置，api配置
|  ├─i18n				//多语言内容：根据excel将多语言数据转换成json，再由js（vuei18n）注入到pug页面
|  ├─data				//外部数据文件：所有json文件会先合并到data.json。pug和js都能接受到一致的外部数据
|  ├─assets				//静态资源文件夹：音视频，图片，字体文件
├─gulpfile.js				//gulp工程配置文件夹：将src目录中的文件处理后生成到dist
|      ├─copyFile.js				//静态资源直接拷贝到dist文件夹
|      ├─css.js				//样式处理：sass编译，postcss处理（自动前缀、压缩）
|      ├─data.js				//外部数据处理：所有json合并到data.json导出
|      ├─i18n.js				//多语言配置：excel转换json
|      ├─index.js				//gulp配置入口：工程配置、修改检测、脚本执行
|      ├─javascript.js				//js处理：babel处理，文件压缩
|      ├─path.js				//gulp配置文件路径
|      ├─pug.js				//pug编译html处理，注入data数据
|      ├─reset.js				//工程重制：清除dist文件夹旧数据
|      ├─revision.jsv//构建后js，css文件添加版本号
|      └rollup.js				//在js处理过程自动执行rollup，打包js文件
├─dist				//gulp构建后的工程，直接用于部署
```