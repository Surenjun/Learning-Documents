>React 性能优化有很多种方式，那常见的一种就是在生命周期函数shouldComponentUpdate里面判断某些值或属性来控制组件是否重新再次渲染。
>
>判断一般的字符串，数字或者基础的对象，数组都还是比较好处理，那嵌套的对象或者数组就比较麻烦了，对于这种，可以转成字符串处理，但属性值的位置不同时，那就无效了。
>
>推荐使用lodash(或者其他的类似库)的[isEqual](https://lodash.com/docs/4.17.10#isEqual)对嵌套数组或对象进行判断(相比其他方式更简单些)
>
>```javascript
>shouldComponentUpdate(nextProps, nextState) {
>    if (_.isEqual(nextState.columns, this.state.columns)) return false;
>    return true;
>}
>```
>
>

