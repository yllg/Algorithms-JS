var a = 1;
setTimeout(() => {
  a = 2;
}, 2);

// 导出 变量的几种写法
// module.exports.a = a;
// exports.a = a;
module.exports = { a };
// !注意，整体导出不能用exports，必须要用 module.exports, 因为源码这么写的
// exports = { a };
