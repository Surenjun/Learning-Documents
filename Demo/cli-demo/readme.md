>使用npm run script执行脚本的时候都会创建一个shell，然后在shell中执行指定的脚本。
>这个shell会将当前项目的可执行依赖目录（即node_modules/.bin）添加到环境变量path中，当执行之后之后再恢复原样。就是说脚本命令中的依赖名会直接找到node_modules/.bin下面的对应脚本，而不需要加上路径。