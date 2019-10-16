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

### React不常用的特性

>```javascript
>render 支持返回数组和字符串
>// 不需要再将元素作为子元素装载到根元素下面
>render() {
>  return [
>    <li/>1</li>,
>    <li/>2</li>,
>    <li/>3</li>,
>  ];
>}
>
>Error Boundaries
>//React15 在渲染过程中遇到运行时的错误，会导致整个 React 组件的崩溃，而且错误信息不明确可读性差。React16 支持了更优雅的错误处理策略，如果一个错误是在组件的渲染或者生命周期方法中被抛出，整个组件结构就会从根节点中卸载，而不影响其他组件的渲染，可以利用 error boundaries 进行错误的优化处理。
>
>class ErrorBoundary extends React.Component {
>  state = { hasError: false };
>
>  componentDidCatch(error, info) {
>    this.setState({ hasError: true });
>
>    logErrorToMyService(error, info);
>  }
>
>  render() {
>    if (this.state.hasError) {
>      return <h1>数据错误</h1>;
>    }
>
>    return this.props.children;
>  }
>}
>
>createPortal
>
>```
>
>
>
>