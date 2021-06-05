// 1.运行在一个函数内部，实现私有作用域 Module.wrapper

// 2.eval和Function 都可以用来执行javascript字符串;不过在node中并没有选用他们来实现模块化，原因他们都有一个致命的问题，就是都容易被不属于他们的变量所影响。所以使用 node 的vm虚拟环境
// wm.runInThisContext 保证模块的独立性

// 3.Module._extensions , 针对不同的模块扩展名使用不同的加载方式
// 比如 JS 使用 vm.runInThisContext来运行；JSON使用JSON.parse来运行

// 4.tryModuleLoad函数接收的是模块对象，通过path.extname来获取模块的后缀名，然后使用Module._extensions来加载模块

// 5.给模块添加缓存 Module._cache

// 6.自动补全路径

//7. 总结 整体的步骤
// 1.导入相关模块，创建一个Require方法。
// 2.抽离通过Module._load方法，用于加载模块。
// 3.Module.resolveFilename 根据相对路径，转换成绝对路径。
// 4.创建模块 id: 保存的内容是 exports = {}相当于this。
// 5.先缓存模块 Module._cache，同一个模块不要重复加载，提升性能。
// 6.再利用tryModuleLoad(module, filename) 尝试加载模块。
// 7.Module._extensions使用读取文件，具体运行模块的内容；比如 JS 使用 vm.runInThisContext来运行；JSON使用JSON.parse来运行
// 8.Module.wrap: 把读取到的js包裹一个函数。
// 9.将拿到的字符串使用runInThisContext运行字符串。
// 10.让字符串执行并将this改编成exports。

// !手写
// 导入依赖
const path = require('path'); // 路径操作
const fs = require('fs'); // 文件读取
const vm = require('vm'); // 文件执行
// 定义导入类，参数为模块路径
function myRequire(modulePath) {
  // 获取当前要加载的绝对路径
  let absPathname = path.resolve(__dirname, modulePath);
  // 获取所有后缀名
  const extNames = Object.keys(Module._extensions);
  let index = 0;
  // 存储原始文件路径
  const oldPath = absPathname;
  let realPath = '';
  function findExt(absPathname) {
    if (index === extNames.length) {
      throw new Error('文件不存在');
    }
    try {
      fs.accessSync(absPathname);
      realPath = absPathname;
      return;
    } catch (e) {
      const ext = extNames[index++];
      findExt(oldPath + ext);
    }
  }
  // 递归追加后缀名，判断文件是否存在
  findExt(absPathname);
  console.log('真正的路径名', realPath);
  console.log('Module._cache', Module._cache);
  // 从缓存中读取，如果存在，直接返回结果
  if (Module._cache[realPath]) {
    console.log('😸 命中缓存')
    return Module._cache[realPath].exports;
  }
  console.log('🤮 没有 缓存')
  // 创建模块，新建Module实例
  const module = new Module(realPath);
  // 先加入到缓存
  Module._cache[realPath] = module;
  // 再执行当前模块
  tryModuleLoad(module);
  // 返回exports对象
  return module.exports;
}

// 定义模块, 添加文件id标识和exports属性
function Module(id) {
  this.id = id;
  // 读取到的文件内容会放在exports中
  this.exports = {};
}
// 定义包裹模块内容的函数
Module.wrapper = [
  '(function(exports, module, Require, __dirname, __filename) {',
  '})',
];
// 定义扩展名，不同的扩展名，加载方式不同，实现js和json
Module._extensions = {
  '.js'(module) {
    const content = fs.readFileSync(module.id, 'utf8');
    const fnStr = Module.wrapper[0] + content + Module.wrapper[1];
    const fn = vm.runInThisContext(fnStr);
    fn.call(
      module.exports,
      module.exports,
      module,
      myRequire,
      __filename,
      __dirname
    );
  },
  '.json'(module) {
    const json = fs.readFileSync(module.id, 'utf8');
    module.exports = JSON.parse(json); // 把文件的结果放在exports属性上
  },
};
// 定义 Module的缓存
Module._cache = {};
// 定义模块加载方法
function tryModuleLoad(module) {
  // 获取扩展名
  const extension = path.extname(module.id);
  // 通过后缀加载当前模块
  Module._extensions[extension](module);
}

module.exports.myRequire = myRequire;
