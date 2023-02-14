function __isNaN(a, b) {
  return Number.isNaN(a) && Number.isNaN(b);
}

class miniVue {
  constructor(options = {}) {
    this.$options = options;
    this.$el =
      typeof options.el === 'string'
        ? document.querySelector(options.el)
        : options.el;
    this.$data = options.data;
    this.$methods = options.methods;
    this.proxy(this.$data);
    // observer,拦截this.$data
    new Observer(this.$data);
    new Compiler(this);
  }
  // Object.defineProperty; 代理,this.$data.xxx -> this.xxx
  proxy(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key];
        },
        set(newValue) {
          // NaN !== NaN
          if (data[key] === newValue || __isNaN(data[key], newValue)) return;
          data[key] = newValue;
        },
      });
    });
  }
}

/**
 * 依赖类
 * Observer类的defineReactive有用到两个方法: add、notify
 * 1.vue源码用的是队列，这里简单化，使用ES6的set数据结构
 * 2.源码还会有删除依赖的方法，也省略了
 */
class Dep {
  constructor() {
    this.deps = new Set();
  }
  add(dep) {
    //判断dep是否存在并且是否存在update方法,然后添加到存储的依赖数据结构中
    if (dep && dep.update) this.deps.add(dep);
  }
  notify() {
    // 发布通知，遍历一遍dep，调用每一个dep的update方法，使得每一个依赖都会进行更新
    this.deps.forEach((dep) => dep.update());
  }
}

/**
 * watcher类
 * 管理每一个组件实例的类，每个组件实例可以由这个类来发送视图更新以及状态流转的操作
 */
class Watcher {
  //3个参数，当前组件实例vm，state也就是数据，回调函数或叫处理器
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    // 依赖类
    Dep.target = this;
    // 我们用一个变量来存储旧值，也就是未变更之前的值
    this.__old = vm[key];
    Dep.target = null;
  }
  update() {
    // 获取新的值
    let newValue = this.vm[this.key];
    // 与旧值做比较，如果没有改变就无需执行下一步
    if (this.__old === newValue || __isNaN(this.__old, newValue)) return;
    // 把新的值回调出去
    this.cb(newValue);
    // 执行完之后，需要更新一下旧值的存储
    this.__old = newValue;
  }
}

/**
 * 数据响应式观察者observer类，不考虑数组
 * 需要给每一个数据都添加响应式对象，并且转换成getter和setter函数
 * 再次用到 Object.defineProperty
 * 在getter函数中收集依赖，在setter函数中发送通知，用来通知依赖进行更新。
 */
class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    if (!data || typeof data !== 'object') return;
    Object.keys(data).forEach((key) =>
      this.defineReactive(data, key, data[key])
    );
  }
  defineReactive(obj, key, value) {
    let vm = this;
    // 递归调用walk方法，因为对象里面还有可能是对象
    this.walk(value);
    //实例化收集依赖的类
    let dep = new Dep();
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get() {
        // 收集依赖,依赖存在Dep类上
        Dep.target && dep.add(Dep.target);
        return value;
      },
      set(newValue) {
        if (value === newValue || __isNaN(value, newValue)) return;
        value = newValue;
        // newValue也有可能是对象，所以递归
        vm.walk(newValue);
        // 通知Dep类
        dep.notify();
      },
    });
  }
}

/**
 * 编译类
 * 这个类的实现基本脱离vue源码了，因为源码的编译十分复杂，涉及到diff算法以及虚拟节点vNode，而我们这里致力于将其最简化，所以单独写一个Compiler类来编译。
 */
class Compiler {
  constructor(vm) {
    //根元素
    this.el = vm.$el;
    //当前组件实例
    this.vm = vm;
    //事件方法
    this.methods = vm.$methods;
    //调用编译函数开始编译
    this.compile(vm.$el);
  }

  compile(el) {
    //拿到所有子节点（包含文本节点）
    let childNodes = el.childNodes;
    //转成数组
    Array.from(childNodes).forEach((node) => {
      //判断是文本节点还是元素节点分别执行不同的编译方法
      if (this.isTextNode(node)) {
        this.compileText(node);
      } else if (this.isElementNode(node)) {
        this.compileElement(node);
      }
      //递归判断node下是否还含有子节点，如果有的话继续编译
      if (node.childNodes && node.childNodes.length) this.compile(node);
    });
  }
  /**
   * 编译元素节点
   * 根据元素节点上的指令来分别执行不同的操作
   * 简版 只考虑了v-text,v-model,v-on:click这三个指令
   */
  compileElement(node) {
    // 指令就是一堆属性，只需获取属性即可
    if (node.attributes.length) {
      Array.from(node.attributes).forEach((attr) => {
        let attrName = attr.name;
        //这里由于我们拿到的attributes可能包含不是指令的属性，所以我们需要先做一次判断
        if (this.isDirective(attrName)) {
          //根据v-来截取一下后缀属性名；例如v-on:click,subStr(5)即可截取到click；v-text与v-model则subStr(2)截取到text和model即可
          attrName =
            attrName.indexOf(':') > -1
              ? attrName.substr(5)
              : attrName.substr(2);
          let key = attr.value;
          //单独定义一个update方法来区分这些
          this.update(node, key, attrName, this.vm[key]);
        }
      });
    }
  }
  update(node, key, attrName, value) {
    //执行v-text的操作
    if (attrName === 'text') {
      node.textContent = value;
      new Watcher(this.vm, key, (val) => (node.textContent = val));
    } else if (attrName === 'model') {
      //执行v-model的操作; 双向绑定是更改输入框的value值，并且通过监听input事件来实现
      node.value = value;
      new Watcher(this.vm, key, (val) => (node.value = val));
      node.addEventListener('input', () => {
        this.vm[key] = node.value;
      });
    } else if (attrName === 'click') {
      //执行v-on:click的操作; 将事件绑定到methods内定义的函数，this指向当前组件实例，通过bind方法改变一下this指向
      node.addEventListener(attrName, this.methods[key].bind(this.vm));
    }
  }
  // 编译文本节点, eg: {{ count }}
  compileText(node) {
    //定义正则，匹配{{}}中的count
    let reg = /\{\{(.+?)\}\}/;
    let value = node.textContent;
    //判断是否含有{{}}
    if (reg.test(value)) {
      //拿到{{}}中的count,由于我们是匹配一个捕获组，所以我们可以根据RegExp类的$1属性来获取这个count
      let key = RegExp.$1.trim();
      node.textContent = value.replace(reg, this.vm[key]);
      //如果更新了值，还要做更改
      new Watcher(this.vm, key, (val) => {
        node.textContent = val;
      });
    }
  }
  isDirective(dir) {
    return dir.startsWith('v-');
  }
  isTextNode(node) {
    return node.nodeType === 3;
  }
  isElementNode(node) {
    return node.nodeType === 1;
  }
}
