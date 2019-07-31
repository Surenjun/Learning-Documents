### async

>async函数返回一个Promise对象。函数执行时，一旦遇到await就会先返回，等到遇到异步操作完成，再接着执行函数内后面的语句。
>
>`async`函数内部`return`语句返回的值，会成为`then`方法回调函数的参数。
>
>```javascript
>const fn = async ()=>{
>        console.log(1);
>        let a = await fn1()
>        console.log(a);
>    	return 3
>};
>const fn1 = async ()=>{
>     return new Promise(resolve => {
>         setTimeout(()=>{
>             console.log(2);
>             resolve(2)
>         },2000)
>      })
>};
>fn().then(a => console.log(a))
>```
>
>

### webstrom快捷键

>**Ctrl + Space**  另启一行
>
>**Ctrl + W**：  选择代码块，一般是增量选择
>
>**Ctrl + Shift + W** ：上个快捷键的回退，减量选择代码
>
>**Alt + Enter**： 意图行动，快速见效
>
>**Ctrl + Shift + U**：光标所在位置大小写转换
>
>**Ctrl + Shift + ]**：选择直到代码块结束/开始
>
>**Ctrl + Shift + F**：  指定文件内寻找路径
>
>**Ctrl + Tab**： 标签和工具窗的转换（与windows快捷键冲突）