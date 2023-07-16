// id：完整的文件名
const path = require("path");
const fs = require("fs");
function Module(id) {
  // 用来唯一标识模块
  this.id = id;
  // 用来导出模块的属性和方法
  this.exports = {};
}

function myRequire(filePath) {
  // 直接调用Module的静态方法进行文件的加载
  return Module._load(filePath);
}

Module._cache = {};
Module._load = function (filePath) {
  // 首先通过用户传入的filePath寻址文件的绝对路径
  // 因为再CommnJS中，模块的唯一标识是文件的绝对路径
  const realPath = Module._resoleveFilename(filePath);
  // 缓存优先，如果缓存中存在即直接返回模块的exports属性
  let cacheModule = Module._cache[realPath];
  if (cacheModule) return cacheModule.exports;
  // 如果第一次加载，需要new一个模块，参数是文件的绝对路径
  let module = new Module(realPath);
  // 调用模块的load方法去编译模块
  module.load(realPath);
  return module.exports;
};

// node文件暂不讨论
Module._extensions = {
  // 对js文件处理
  ".js": handleJS,
  // 对json文件处理
  ".json": handleJSON,
};

function handleJSON(module) {
  // 如果是json文件，直接用fs.readFileSync进行读取，
  // 然后用JSON.parse进行转化，直接返回即可
  const json = fs.readFileSync(module.id, "utf-8");
  module.exports = JSON.parse(json);
}

function handleJS(module) {
  const js = fs.readFileSync(module.id, "utf-8");
  let fn = new Function(
    "exports",
    "myRequire",
    "module",
    "__filename",
    "__dirname",
    js
  );
  let exports = module.exports;
  // 组装后的函数直接执行即可
  fn.call(
    exports,
    exports,
    myRequire,
    module,
    module.id,
    path.dirname(module.id)
  );
}

Module._resolveFilename = function (filePath) {
  // 拼接绝对路径，然后去查找，存在即返回
  let absPath = path.resolve(__dirname, filePath);
  let exists = fs.existsSync(absPath);
  if (exists) return absPath;
  // 如果不存在，依次拼接.js,.json,.node进行尝试
  let keys = Object.keys(Module._extensions);
  for (let i = 0; i < keys.length; i++) {
    let currentPath = absPath + keys[i];
    if (fs.existsSync(currentPath)) return currentPath;
  }
};

Module.prototype.load = function (realPath) {
  // 获取文件扩展名，交由相对应的方法进行处理
  let extname = path.extname(realPath);
  Module._extensions[extname](this);
};
