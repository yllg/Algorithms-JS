//main.js
var a = require('./a');
console.log(a);

// 解析：
// 1.执行 node main.js -> 第一行 require(a.js)，（node 执行也可以理解为调用了require方法，我们省略require(main.js)内容）
// 2.进入 require(a)方法： 判断缓存（无） -> 初始化一个 module -> 将 module 加入缓存 -> 执行模块 a.js 内容，（需要注意 是先加入缓存， 后执行模块内容）
// 3.a.js： 第一行导出 a = 1 -> 第二行 require(b.js)（a 只执行了第一行）
// 4.进入 require(b) 内 同 1 -> 执行模块 b.js 内容
// 5.b.js： 第一行 b = 11 -> 第二行 require(a.js)
// 6.require(a) 此时 a.js 是第二次调用 require -> 判断缓存（有）-> cachedModule.exports -> 回到 b.js（因为js对象引用问题 此时的 cachedModule.exports = { a: 1 }）
// 7.b.js：第三行 输出 { a: 1 } -> 第四行 修改 b = 22 -> 执行完毕回到 a.js
// 8.a.js：第二行 require 完毕 获取到 b -> 第三行 输出 { b: 22 } -> 第四行 导出 a = 2 -> 执行完毕回到 main.js
// 9.main.js：获取 a -> 第二行 输出 { a: 2 } -> 执行完毕
