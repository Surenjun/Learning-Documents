//访问者模式：针对于对象结构中的元素，定义在不改变对象的前提下访问结构中元素的方法

/*

    在访问者模式中，主要包括下面几个角色

    1、抽象访问者：抽象类或者接口，声明访问者可以访问哪些元素，具体到程序中就是visit方法中的参数定义哪些对象是可以被访问的。
    2、访问者：实现抽象访问者所声明的方法，它影响到访问者访问到一个类后该干什么，要做什么事情。
    3、抽象元素类：接口或者抽象类，声明接受哪一类访问者访问，程序上是通过accept方法中的参数来定义的。抽象元素一般有两类方法，一部分是本身的业务逻辑，另外就是允许接收哪类访问者来访问。
    4、元素类：实现抽象元素类所声明的accept方法，通常都是visitor.visit(this)，基本上已经形成一种定式了。
    5、结构对象：一个元素的容器，一般包含一个容纳多个不同类、不同接口的容器，如List、Set、Map等，在项目中一般很少抽象出这个角色

*/


/*
 * 让对象可以使用数组的push方法
 */

//访问者
function Visitor() {
    this.visit = function (concreteElement , value) {
        concreteElement.push(this,value);
        this.doSomeThing()
    };

    //访问到之后干什么
    this.doSomeThing = function () {
        console.log("已经访问到了")
    }
}

//元素类
function ConceteElement() {

    //元素上的某一个方法
    this.push = function ( that ,value ) {
        Array.prototype.push.call( that , value);
    };

    //可以控制访问者 是否能访问
    this.accept = function (visitor ,value) {
        visitor.visit(this ,value);
    }
}

//Go Go Go
const ele = new ConceteElement();
const v = new Visitor();

ele.accept( v ,2);

console.log(v);

