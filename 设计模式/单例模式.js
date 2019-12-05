{   //ES6
    let Fn = (function () {
        let ins = null;     //利用闭包存储this
        return class{
            constructor(){
                if(ins) return ins;
                ins = this
            }
        }
    })();

    let A = new Fn(),
        B = new Fn();

    console.log(A === B); // =>true
}

{   //ES5
    let Fn = (function () {
        let ins = null;
        return function(title){
            if(!ins){
                ins = this;
            }
            return ins.title = title;
        }
    })();

    let A = new Fn("surenjun");
    console.log(A);
    let B = new Fn("boy");
    console.log(B);
    console.log(A === B);
}

