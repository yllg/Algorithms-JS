/**
 * nodejs中setTimeout 和 setImmediate, 调用时机不同
（1）setImmediate 设计在poll阶段完成时执行，即第五个check阶段；
（2）setTimeout 设计在poll阶段为空闲时，且设定时间到达后执行，它在第一个timer阶段执行
 */

// 第一种情况
// setTimeout(function timeout() {
//   console.log('timeout');
// }, 0);
// setImmediate(function immediate() {
//   console.log('immediate');
// });

/**
 * 解析
 * （1）对于以上代码来说，setTimeout 可能执行在前，也可能执行在后。
 * （2）首先 setTimeout(fn, 0) === setTimeout(fn, 1)，这是由源码决定的；
 * （3）然后进入事件循环也是需要成本的，如果准备时间和同步代码的时间花费大于 1ms 的时间，那么在 timer 阶段就会直接执行 setTimeout 回调
 * （4）如果准备时间和同步代码时间花费小于 1ms，timer阶段没有执行内容，到了check阶段 setImmediate 回调先执行了，下一个循环timer阶段再执行setTimeout 回调；
*/


// 第二种情况，把上面的代码放到 fs.readFile 回调中，结果就是固定的；先是 immediate 再是 timeout 
const fs = require('fs');
fs.readFile('./testReadFile.js', { encoding: 'utf-8' }, (err, data) => {
  if (err) throw err;
  console.log('read file success');
  setTimeout(function timeout() {
    console.log('timeout');
  }, 0);
  setImmediate(function immediate() {
    console.log('immediate');
  });
});

/**
 * 解析
 * 因为读完文件就是进入到了poll阶段的I/O，Poll队列为空，有setImmediate，poll 阶段会停止并且进入到 check 阶段，执行immediate回调。
 * 下一个循环timer阶段再执行setTimeout 回调；
 */