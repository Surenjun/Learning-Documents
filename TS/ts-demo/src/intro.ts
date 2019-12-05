/*
    ts的其它常见类型
    1.unknown
      unknown 与 any 的不同之处,虽然它们都可以是任何类型,但是当 unknown 类型被确定是某个类型之前,它不能被进行任何操作比如实例化、getter、函数执行等等。

      let value: any;
      value.foo.bar;  // OK
      value();        // OK
      new value();    // OK
      value[0][1];    // OK

      let value: unknown;
       value.foo.bar;  // ERROR
       value();        // ERROR
       new value();    // ERROR
       value[0][1];    // ERROR

    枚举类型：用于声明一组命名的常数,当一个变量有几种可能的取值时,可以将它定义为枚举类型。
* */