/*
 * 输入: 3 ，4
 * 输出: [0,1,0]
 *       [1,2,1]
 *       [0,1,0]
 *
 * 输入：5 ，6
 * 输出：[0,0,1,0,0]
 *       [0,1,2,1,0]
 *       [1,2,3,2,1]
 *       [0,1,2,1,0]
 *       [0,0,1,0,0]
 * */

let fn = (num) => {
    if( num & 1 === 0) num -=1;      //判断基偶
    let middleNum = ~~(num / 2 + 1); //取整
    let returnArr = [];
    for(let i = 1 ; i <= num ; i++){
        let everyArr = [];
        if(i <= middleNum){
            for(let j = 0 ; j < middleNum ; j++){
                if(i - j > 0){
                    everyArr.push(i - j);
                }else{
                    everyArr.push(0);
                }
            }
            returnArr.push([...everyArr.reverse() , ...everyArr.splice(0, num /2).reverse()]);
        }else{
            returnArr.push(returnArr[num  - i]);
        }
    }
    return returnArr;
};
console.log(fn(9));
