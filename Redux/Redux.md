#### Action

> FSA：action的类型规范
>
> ```javascript
> {
>       type: 'ADD_TODO',
>       payload: { //表示这个action携带的内容
>         text: 'Do something.'  
>       }
>       error:
>       meta: //可以是任何类型的数据。它旨在保存一切不属于payload的额外信息
>  }
> ```

#### React-Redux

> connect()
>
> ```javascript
> function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)
> 
> //mapSateToProps:mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染
> 
> const mapStateToProps = (state) => {
>   	return {count: state.count}
>    }
>   
> //mapDispatchToProps:mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射
> 
> const mapDispatchToProps = (dispatch, ownProps) => {
>     return {
>      increase: (...args) => dispatch(actions.increase(...args)),
>        decrease: (...args) => dispatch(actions.decrease(...args))
>        }
>     }
>   ```
> 

#### store

>
>
>```javascript
>import { createStore ,combineReducers ,compose } from 'redux'
>const store = createStore(combineReducer(A,B),initState , enhancer);
>
>//enhancer :Store enhancer 是一个组合 store creator 的高阶函数，返回一个可以创建功能更加强大的store的函数，简称store增加器
>
>//store enhancer 函数的结构:
>function enhancerCreator() {
>  return createStore => (...args) => {
>    
>	}
>}
>
>/*
>   enhancer和applyMiddleWare功能相似
>  middleware限制为只可以增强store dispatch的功能
>  对于其他store enhancer，你可以增强store中包含的任意方法的功能，如dispatch、subscribe、getState、replaceReducer等
>  
>*/
>type store = {
>    dispathch:Dispatch,
>    getState:()[reducerKey], //=>返回store中的某一个
>    subscrible: (listener: () => void) => () => void
>    repalceReducer:(reducer: Reducer) => void 
>    // 替换所有的reduce 先把以前的reducer保存下来然后combineReducers(newReducers)
>    // 这种替换思想可以实现动态注入reducers，在componentDidMount里去init，在componentWillUnmount里去销毁对应的reducer
>}
>
>const GolbalStore = {
>   ...currentReducer, //以前的reducer
>   ...nowReducer,     //现在的reducer 
>};
>
>GolbalStore.replaceReducer(
>    GolbalStore
>);
>
>compose(...functions)  也会形成洋葱模型 而且是一半
>/*预计每个函数都接收一个参数。它的返回值将作为一个参数提供给它左边的函数
>compose 做的只是让你在写深度嵌套的函数时，避免了代码的向右偏移*/
>
>compose(funcA, funcB, funcC) =>compose(funcA(funcB(funcC())))
>
>//compose实现原理
>function compose(...fns) {
>       return fns.reduce(function (a ,b) { //a为当前 b为prev
>           return function(...args){
>               return a(b(...args))
>           }
>       })
> }
>
>//简写 return funcs.reduce((a, b) => (...args) => a(b(...args)))
>compose(fn1, fn2, fn3)(1));
>```
>
>

#### setState的函数式写法

>setState是异步的。面对**多次函数式 setState() 调用**时，React 并不会将对象合并（显然根本没有对象让它合并），而是会**按调用顺序**将这些函数**排列**起来。
>
>```javascript
>this.setState(function (state, props) {
> return {
>  score: state.score - 1
> }
>});
>
>this.setState((state , props) =>{
>    score : state.score - 1
>})
>
>
>//这种写法可以让setSate在组件外部调用
>// 在组件类之外
>function increaseScore (state, props) {
>  return {score : state.score + 1}
>}
>
>class User{
>
>// 在组件类之内
>  handleIncreaseScore () {
>    this.setState(increaseScore)
>  }
>
>}
>```
>
>

