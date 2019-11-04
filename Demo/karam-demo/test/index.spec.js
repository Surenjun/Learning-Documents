//默认运行环境为浏览器 node环境需要通过webpack相关编译
const utils = require('../src/index');
//一个discrible是测试组
describe("测试window.add函数", function() {
    //一个it是个用例
    it("", function() {
        expect(utils.add(2,3)).toBe(5);
    });
    it("分支0",function () {
        expect(utils.add(0,3)).toBe(1);

    })
});

//一个discrible是测试组
describe("测试window.testPromise函数", function() {
    //一个it是个用例
    it("", function() {
        utils.testPromise().then(ret =>{
            expect(ret).toBe('ok')
        })
    });
});
