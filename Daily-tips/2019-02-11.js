//数据结构
    //1.栈结构
    class Stack {
        constructor() {
            this.stack = []
        }
        push(item) {
            this.stack.push(item)
        }
        pop() {
            this.stack.pop()
        }
        peek() {
            return this.stack[this.getCount() - 1]
        }
        getCount() {
            return this.stack.length
        }
        isEmpty() {
            return this.getCount() === 0
        }
    }
    //2.队列 队列是一个线性结构，特点是在某一端添加数据，在另一端删除数据，遵循先进先出的原则。
    //3.链表 链表是一个线性结构，同时也是一个天然的递归结构
    //4.树
        /*二分搜索树也是二叉树，拥有二叉树的特性。
        但是区别在于二分搜索树每个节点的值都比他的左子树的值大，比右子树的值小。*/

//排序算法
    //冒泡排序
    let array = [2,1,3,4,3,2];
    /*for(let a = array.length - 1;a > 0;a--){
        for(let b = 0;b < a;b++){
            if(array[b] > array[b + 1]){
                [array[b+1],array[b]] = [array[b],array[b+1]];
            }
        }
    }*/
    //插入排序
    for(let i = 0;i < array.length -1; i++) {
        for (let j = i; j >= 0 && array[j] > array[j + 1]; j--){
            [array[j+1],array[j]] = [array[j],array[j+1]];
        }
    }
    console.log(array);
