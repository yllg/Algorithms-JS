const fs = require('fs');

setTimeout(() => {
  // 新的事件循环的起点
  console.log('1');
  sleep(3000);
  console.log('sleep 3s');
}, 0); // 换成 50ms 结果不一样

/// 将会在 poll 阶段执行
fs.readFile('./testReadFile.js', { encoding: 'utf-8' }, (err, data) => {
  if (err) throw err;
  console.log('read file success');
});

console.log('2');

/// 函数实现，参数 n 单位 毫秒 ；
function sleep(n) {
  var start = new Date().getTime();
  while (true) {
    if (new Date().getTime() - start > n) {
      // 使用  break  实现；
      break;
    }
  }
}

// 结果
// 2
// 1
// sleep 3s
// read file success

// setTimeout 50ms 的结果
// 2
// read file success
// 1
// sleep 3s