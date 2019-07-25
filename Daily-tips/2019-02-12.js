//Vue
    //1.slot
        //在vue2.6里新更新了v-slot
        //以前的slot所依赖的数据更新时，先触发父组件的更新，然后新的slot内容传到子组件
        //触发子组件的更新,父子组件完全解耦 this.scopedSlots上

    //2.Vue-Bus
        /*let Bus = new Vue();

        let eventBus = {
            install(Vue) {
                Vue.prototype.$bus = Bus;
            }
        };

        Vue.use(eventBus); 用this.$bus.$on和$emit来监听*/

    //3.provide和inject
        // A.vue
        export default {
            provide: {
                name: 'Aresn'//所有的子组件都能用到
            }
        }
        // B.vue
        export default {
            inject: ['name'],
            mounted () {
                console.log(this.name);  // Aresn
            }
        }
        /*provide 和 inject 绑定并不是可响应的。这是刻意为之的。
        然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。*/

        //使用 provide / inject 替代 Vuex
            export default {
                provide () {
                    return {
                        app: this
                    }
                }
            }
            /*任何组件（或路由）只要通过 inject 注入 app.vue 的 app 的话，
            都可以直接通过 this.app.xxx 来访问 app.vue 的 data、computed、methods 等内容。*/

    //4.render函数
    //5.$nextTick 且返回的是一个 Promise 对象
        /*methods: {
            handleShow () {nextTick 函数接收一个回调函数 cb，在下一个 DOM 更新循环之后执行
                this.show = true;
                console.log(this.$refs.node);  // undefined
                this.$nextTick(() => {
                    console.log(this.$refs.node);  // <p>内容</p>
                });
            }*/

    //6.容易忽略的API
        /*2.x 的 .sync 不是真正的双向绑定，而是一个语法糖，修改数据还是在父组件完成的，
        并非在子组件。

        因为组件是用来复用的，JS 里对象是引用关系，这样作用域没有隔离，
        而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。

        v-model @input model .sync 修饰符
        */

/****************************************************************/
//Vue原理
    /*1.Vue 不能检测到对象属性的添加或删除。
        由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，
        所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的.
        Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上*/

