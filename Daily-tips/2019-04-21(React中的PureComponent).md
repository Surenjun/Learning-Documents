##### React的父子组件更新
>React Component的生命周期中，有一个shouldComponentUpdate方法。这个方法默认返回值是true。这意味着就算没有改变组件的props或者state，也会导致组件的重绘。这就经常导致组件因为不相关数据的改变导致重绘，这极大的降低了React的渲染效率。

###### 重新编写componentshouldUpadte函数

```javascript
     shouldComponentUpdate(nextProps, nextState) {
        if (this.props.option === nextProps.option) {
          return false;
        } else {
          return true;
        }
      }
```

###### PureComponent
>PureComponent组件创建了默认的shouldComponentUpdate行为。这个默认的shouldComponentUpdate行为会一一比较props和state中所有的属性，只有当其中任意一项发生改变是，才会进行重绘。实际上react做了最外层的浅比较：
```javascript
    //shadowEqual只会浅检查组件的props和state，所以嵌套对象和数组是不会被比较的。
    if (this._compositeType === CompositeTypes.PureClass) {
      shouldUpdate = !shallowEqual(prevProps, nextProps) || ! shallowEqual(inst.state, nextState);
    }
```

###### PureComponent使用注意点

```javascript 
   //这里点击是不会重新渲染的，的确向this.state.items加入了新的值，但是它仍然指向同一个对象的引用。但是，通过移除可变对象就很容易改变这种情况，使之能够正确被渲染。
  handleClick() {
    let {items} = this.state
  
    items.push('new-item')
    this.setState({ items })
  }
  
  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ItemList items={this.state.items} />
      </div>
    )
  }
```
```javascript
    handleClick() { //click换成这种写法
      this.setState(prevState => ({
        words: prevState.items.concat(['new-item'])
      }))
    }
```
