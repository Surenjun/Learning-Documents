// 一个枚举类型是,虽然没有给它们赋值,但是它们的值其实是默认的数字类型,而且默认从0开始依次累加
enum Direction {
    Up,
    Down,
    Left,
    Right
}

console.log(Direction.Up === 0); // true
console.log(Direction.Down === 1); // true
console.log(Direction.Left === 2); // true
console.log(Direction.Right === 3); // true

enum Direction1 {
    Up = 10,
    Down,
    Left,
    Right
}

console.log(Direction1.Up, Direction1.Down, Direction1.Left, Direction1.Right); // 10 11 12 13

/*********************************************************************************************************************/

// 枚举成员类型
// 当所有枚举成员都拥有字面量枚举值时，它就带有了一种特殊的语义，即枚举成员成为了类型。
enum Direction2 {
    Up,
    Down,
    Left,
    Right
}
const a = 0;

console.log(a === Direction2.Up); // true

type c = 0;
declare let b:c;
b = 1;//// 不能将类型“1”分配给类型“0”
b = Direction2.Up // ok

/**********************************************************************************************************************/
//user 的性别之后就不允许就改了， interface 可以保证这一点吗？利用 readonly 我们可以把一个属性变成只读性质，此后我们就无法对他进行修改

interface User {
    name: string
    age?: number
    readonly isMale: boolean
}