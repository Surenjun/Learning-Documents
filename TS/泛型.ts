//多个类型参数
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]

//泛型变量
function getArrayLength<T>(arg: T): T {
    console.log(arg.length); // 类型“T”上不存在属性“length”
    return arg
}

function getArrayLength1<T>(arg: Array<T>) {
    console.log((arg as Array<any>).length) // ok
    return arg
}

//泛型接口
interface ReturnItemFn<T> {
    //表示一个函数
    (paraOne: T , paraTwo:T): T
}

const returnItem: ReturnItemFn<number> = para => para
returnItem(1,'');//报错
returnItem(1, 2);

//泛型约束与索引类型
function getValue(obj: object, key: string) {
    return obj[key] // error
}
getValue({a:1},'a');

function getValueOne<T extends object>(obj: T, key: string) {
    return obj[key] // error
}

function getValueTwo<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key] // ok
}

//类型守卫
class Person {
    name = 'xiaomuzhu';
    age = 20;
}

class Animal {
    name = 'petty';
    color = 'pink';
}

function getSometing(arg: Person | Animal) {
    if ('age' in arg) {
        console.log(arg.color); // Error
        console.log(arg.age); // ok
    }
    if ('color' in arg) {
        console.log(arg.age); // Error
        console.log(arg.color); // ok
    }
}