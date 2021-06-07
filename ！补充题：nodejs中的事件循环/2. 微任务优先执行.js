const fs = require('fs');
console.log('script start');
/// 将会在 poll 阶段执行
fs.readFile('./testReadFile.js', { encoding: 'utf-8' }, (err, data) => {
  if (err) throw err;
  console.log('read file success');
});
setImmediate(() => {
  console.log('setImmediate');
});
setTimeout(() => {
  console.log('setTimeout');
  fs.readFile('./testReadFile.js', { encoding: 'utf-8' }, (err, data) => {
    if (err) throw err;
    console.log('read file success 2');
  });
}, 0);
/// 该部分将会在首次事件循环中执行
Promise.resolve()
  .then(() => {
    console.log('promise1');
  })
  .then(() => {
    console.log('promise2');
  })
  .then(() => {
    console.log('promise3');
  });
Promise.resolve()
  .then(() => {
    console.log('promise4');
  })
  .then(() => {
    console.log('promise5');
  })
  .then(() => {
    console.log('promise6');
  });

process.nextTick(() => {
  console.log('nextTick callback');
});
// 首次事件循环执行
console.log('script end');

// 结果：
// script start
// script end
// nextTick callback
// promise1
// promise4
// promise2
// promise5
// promise3
// promise6
// setTimeout
// setImmediate
// read file success
// read file success 2
