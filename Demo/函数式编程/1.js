/**
 *  纯函数
 */

/*
*   “面向对象语言的问题是，它们永远都要随身携带那些隐式的环境。你只需要一个香蕉，但却得到一个拿着香蕉的大猩猩...以及整个丛林”
* */

//例子1：缓存取值
    const memorize = function(f) {
      const cache = {};

      return function() {
        const arg_str = JSON.stringify(arguments);
        cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
        return cache[arg_str];
      };
    };

    const squareNumber = memorize( (x) => x * x);
    squareNumber(4);
    //=> 16

    squareNumber(4); // 从缓存中读取输入值为 4 的结果
    //=> 16

    squareNumber(5);
    //=> 25

    squareNumber(5); // 从缓存中读取输入值为 5 的结果
    //=> 25
