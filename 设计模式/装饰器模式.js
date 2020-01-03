/*
 *
 *   装饰模式经典的应用是 AOP 编程，比如“日志系统”，日志系统的作用是记录系统的行为操作，
 *   它在不影响原有系统的功能的基础上增加记录环节 —— 好比你佩戴了一个智能手环，
 *   并不影响你日常的作息起居，但你现在却有了自己每天的行为记录。
 *
 */

/*
 *  场景
 *  首先创建一个普通的Man类，它的抵御值 2，攻击力为 3，血量为 3；
 *  然后我们让其带上钢铁侠的盔甲，这样他的抵御力增加 100，变成 102；
 *  让其带上光束手套，攻击力增加 50，变成 53；
 *  最后让他增加“飞行”能力
 */


//代码直接放在 http://babeljs.io/repl/ 中运行

class Man{
    constructor(def = 2,atk = 3,hp = 3){
        this.init(def,atk,hp);
    }

    @decorateArmour
    init(def,atk,hp){
        this.def = def; // 防御值
        this.atk = atk;  // 攻击力
        this.hp = hp;  // 血量
    }
    toString(){
        return `防御力:${this.def},攻击力:${this.atk},血量:${this.hp}`;
    }
}

const tony = new Man();

console.log(`当前状态 ===> ${tony}`);


//穿上盔甲
function decorateArmour( target, key, descriptor ){

    //装饰器底层是通过Object.defineProperty实现的 所以说参数和前者相同
    const method = descriptor.value;
    let moreDef = 100;
    let ret;
    descriptor.value = (...args) => {
        args[0] += moreDef;
        ret = method.apply(target , args);
        return ret;
    };
    return descriptor;
}



