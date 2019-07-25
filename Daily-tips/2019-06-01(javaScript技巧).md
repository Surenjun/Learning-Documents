##### 判断对象的数据类型
```javascript
const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target);
const isArray = isType('Array'),
      isObject = isType('Object');
console.log(isArray([]));  //=> true
console.log(isObject({})); //=>true
```
##### ES5 实现数组 map方法
```javascript
const myMap = function(fn , context) {
  const arr = Array.prototype.slice.call(this);
  let returnArr = [];
  for(let i =0,len = arr.length; i < len;i++){
      if(!arr.hasOwnProperty(i)) continue;
      returnArr.push(fn.call(context , arr[i] , i , this));
  }
  return returnArr
}
```
