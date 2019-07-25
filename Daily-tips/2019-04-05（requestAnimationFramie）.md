##### 1、requestAnimationFrame替代setTimeout、setInterval
````javascript
    const RAF = {
        intervalTimer : null,
        timeoutTimer : null, 
        setTimeout(cb , time){  //实现setTimeout
            let prevTime = Date.now();
            let loop = () => {
               this.timeoutTimer = requestAnimationFrame(loop);
               if( Date.now() - prevTime > time ){
                   cb();
                   cancelAnimationFrame(this.timeoutTimer);
               }
            };
            this.timeoutTimer = requestAnimationFrame(loop)
        },
        clearTimeout(){
            cancelAnimationFrame(this.timeoutTimer)
        },
        setInterval(cb , time){
            let prevTime = Date.now();
            let loop = () => {
                this.intervalTimer = requestAnimationFrame(loop);

                if( Date.now() - prevTime >= time ){
                    cb();
                    prevTime = Date.now(); //更新时间点
                }
            };
            this.intervalTimer = requestAnimationFrame(loop)
        },
        clearInterval(){
            cancelAnimationFrame(this.intervalTimer)
        },
    }
````
