/**
 * vue3.x的实现思想与vue2.x差不多，只不过vue3.x的实现方式有些不同，
 * 在vue3.x，把收集依赖的方法称作是副作用effect。
 * vue3.x更像是函数式编程了，每一个功能都是一个函数，比如定义响应式对象，那就是reactive方法
 */

function isObject(data) {
  return data && typeof data === 'object';
}

/**
 * 收集依赖的方法
 * 用es6的weakMap数据结构来存储依赖
 * 为了简便化用一个全局变量 activeEffect 来表示依赖
 */
//全局变量表示依赖
let activeEffect;
//存储依赖的数据结构
let targetMap = new WeakMap();
//每一个依赖又是一个map结构，每一个map存储一个副作用函数即effect函数
function track(target, key) {
  //拿到依赖
  let depsMap = targetMap.get(target);
  // 如果依赖不存在则初始化
  if (!depsMap) targetMap.set(target, (depsMap = new Map()));
  //拿到具体的依赖，是一个set结构
  let dep = depsMap.get(key);
  if (!dep) depsMap.set(key, (dep = new Set()));
  //如果没有依赖，则存储再set数据结构中
  if (!dep.has(activeEffect)) dep.add(activeEffect);
}

/**
 * 触发依赖的方法
 * 拿出所有依赖，每一个依赖就是一个副作用函数，所以直接调用即可
 */
function trigger(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) return;
  depsMap.get(key).forEach((e) => e && e());
}

/**
 * 副作用函数
 * 执行每一个回调函数。所以该方法有2个参数，第一个是回调函数，第二个则是一个配置对象。
 */
function effect(fn, options = {}) {
  const __effect = function (...args) {
    activeEffect = __effect;
    return fn(...args);
  };
  //配置对象有一个lazy属性，用于computed计算属性的实现，因为计算属性是懒加载的，也就是延迟执行
  //也就是说如果不是一个计算属性的回调函数，则立即执行副作用函数
  if (!options.lazy) {
    __effect();
  }
  return __effect;
}

/**
 * 响应式，简版只考虑对象
 * 对象 { count:0 }
 * @param {*} data
 * @returns
 *
 * 使用ES6的proxy
 * 还是在getter中收集依赖，setter中触发依赖
 * 收集依赖与触发依赖，对应track和trigger方法。
 */
function reactive(data) {
  if (!isObject(data)) return;
  return new Proxy(data, {
    get(target, key, receiver) {
      //反射api
      const ret = Reflect.get(target, key, receiver);
      //收集依赖
      track(target, key);
      return isObject(ret) ? reactive(ret) : ret;
    },
    set(target, key, val, receiver) {
      Reflect.set(target, key, val, receiver);
      //触发依赖方法
      trigger(target, key);
      return true;
    },
    deleteProperty() {
      const ret = Reflect.deleteProperty(target, key, receiver);
      trigger(target, key);
      return ret;
    },
  });
}

/**
 * 基本数据类型的响应式
 * 将基本类型包装成一个对象
 * const count = ref(0);
 * count.value++
 */
function ref(target) {
  let value = target;
  const obj = {
    get value() {
      //收集依赖
      track(obj, 'value');
      return value;
    },
    set value(newValue) {
      if (value === newValue) return;
      value = newValue;
      //触发依赖
      trigger(obj, 'value');
    },
  };
  return obj;
}

/**
 * 计算属性
 */
function computed(fn) {
  // 只考虑函数的情况
  // 延迟计算 const c = computed(() => `${ count.value}!`)
  let __computed;
  //可以看到computed就是一个添加了lazy为true的配置对象的副作用函数
  const run = effect(fn, { lazy: true });
  __computed = {
    get value() {
      return run();
    },
  };
  return __computed;
}

/**
 * 挂载函数
 * 副作用函数就是在这里执行。
 * 它有2个参数，第一个参数即一个vue组件，第二个参数则是挂载的DOM根元素。
 */
function mount(instance, el) {
  effect(function () {
    instance.$data && update(instance, el);
  });
  //setup返回的数据就是实例上的数据
  instance.$data = instance.setup();
  //这里的update实际上就是编译函数
  update(instance, el);
}

/**
 * update实际就是编译函数
 * 最简版compile编译实现，直接就将定义在组件上的render函数给赋值给根元素的innerHTML
*/
function update(instance, el) {
  el.innerHTML = instance.render();
}
