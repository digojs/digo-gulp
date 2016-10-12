# digo-gulp
[digo](https://github.com/digojs/digo) 插件：使用 [gulp](https://github.com/gulpjs/gulp) 插件。

## 安装
```bash
npm install digo-gulp -g
```

## 用法
### 使用 gulp-xx 插件
```js
digo.src("*").pipe("digo-gulp", require("gulp-xx")());
```
