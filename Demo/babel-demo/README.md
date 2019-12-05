```javascript
{
  "presets": [
    [
      '@babel/preset-env', /*是一个智能预设。根据浏览器和运行环境，自动的确定 babel 插件和 polyfills 。*/
      {
        'target': {
          "browser":["ie>=8","chrome>=62"],
          "node":"8.9.0",
          "safari":"tp"
        },
        "modules":false,
        "debug":true,
        "uglify":true
        "useBuiltIns":true
      }
    ]
  ]
}
```

>babel-polyfill：需要在你自己的代码中手工引入（最好放在 vendor 里），它会以全局变量污染的方式 polyfill 内建类（如 Map、Set、Promise 等），同时也会通过修改 Array、String、Object 等原型的方式添加实例方法（如 Array.prototype.includes()、String.prototype.padStart() 等），内建类的静态方法（如 Array.from() 等）也会被 polyfill。babel-polyfill 适合于开发独立的业务应用，及时全局污染、prototype 被修改也不会受到太大的影响，babel-polyfill 不适合开发第三方类库。
 
>babel-plugin-transform-runtime：需要你在 .babelrc 或 Babel 编译选项中将该插件添加到 plugins 中，插件只会 polyfill 你用到的类或方法，由于采用了沙盒（Sandbox）机制，它不会污染全局变量，同时也不会去修改内建类的原型，带来的坏处是它不会 polyfill 原型上的扩展（例如 Array.prototype.includes() 不会被 polyfill，Array.from() 则会被 polyfill）。插件的方式适合于开发第三方类库，不适合开发需要大量使用 Array 等原型链扩展方法的应用。