#### webpack实现插件机制的⼤体⽅式是：
>「创建」——	webpack在其内部对象上创建各种钩⼦；

>「注册」——	插件将⾃⼰的⽅法注册到对应钩⼦上，交给webpack；

>「调⽤」——	webpack编译过程中，会适时地触发相应钩⼦，因此也就触发了插件的⽅法。

>1.webpack 利用了 tapable 这个库（https://github.com/webpack/tapable）来协助实现对于整个
>构建流程各个步骤的控制。使用 tapable 来实现插件(plugins)的binding和applying。Tapable是一个用于事件发
布订阅执行的可插拔插件架构
>钩子方法来将 webpack 扩展至功能十分丰富,这就是plugin 的机制。

>2.查看 webpack->package.json->main -> webpack.js 分析 ~ 

>3.创建 Compiler ->(Compiler是继承Tapable生成hooks的),生成一些钩子

>4.调用 compiler.run 开始构建 ->

>5.创建 Compilation ->

>6.基于配置开始创建 Chunk ->

>7.使用 Parser 从 Chunk 开始解析依赖 ->

>8.使用 Module 和 Dependency 管理代码模块相互关系 ->

>9.使用 Template 基于 Compilation 的数据生成结果代码


![Alt text](/src/webpackPlugins-relation.png )
>webpack内部插件内部插件与钩子关系: https://alienzhou.github.io/webpack-internal-plugin-relation/


