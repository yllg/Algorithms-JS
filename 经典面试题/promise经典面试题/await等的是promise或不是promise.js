// 下面两种情况，node环境和H5环境一致

// await 要等的东西有两种，是promise或者不是promise

/**
 * 一.第一种情况
 * 1.await等的 是promise, 即 test2返回值是一个promise，await包了一个字符串
 * 2.先执行外面的同步代码。跳过 await 'return test2 value'，end test1，开始执行同步的 start script
 * 3.再把await后面的代码放到微任务
 * 外层碰到了promise2，他先放到了微任务队列，再把第二步跳过的放入微任务。
 */
async function test1() {
  console.log('start test1');
  console.log(await test2());
  console.log('end test1');
}
async function test2() {
  console.log('test2'); // 宏任务
  return await 'return test2 value'; // return是微任务，加不加await会影响优先级
}
test1();
console.log('start script');
setTimeout(() => {
  console.log('setTimeout');
}, 0);
new Promise((resolve, reject) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('Promise2');
});
console.log('end script');

/**
 * 分析过程
 * - 第一轮：宏任务  start test1，test2，start script，promise1, end script   微任务：Promise2, return test2 value，end test1
 * - 第二轮：宏任务   setTimeout      微：
 * - 第三轮：宏任务         微：
 * - 第四轮：
 */

// 结果
// start test1
// test2
// start script
// promise1
// end script
// Promise2
// return test2 value
// end test1
// setTimeout

/**
 * 二.第二种情况
 * 1.await等的 不是promise，test2中第二句 返回值的 await去掉，返回值不是promise
 * 2.先把await后面的代码放到微任务，return test2 value，end test1
 * 3.再执行外面的同步代码；start script
 */

// async function test1() {
//   console.log('start test1');
//   console.log(await test2());
//   console.log('end test1');
// }
// async function test2() {
//   console.log('test2');
//   return 'return test2 value'; // 去掉await
// }
// test1();
// console.log('start script');
// setTimeout(() => {
//   console.log('setTimeout');
// }, 0);
// new Promise((resolve, reject) => {
//   console.log('promise1');
//   resolve();
// }).then(() => {
//   console.log('Promise2');
// });
// console.log('end script');

/**
 * 分析过程
 * - 第一轮：宏任务  start test1，test2，start script，promise1, end script   微任务：return test2 value， end test1， Promise2,
 * - 第二轮：宏任务   setTimeout      微：
 * - 第三轮：宏任务         微：
 * - 第四轮：
 */

// 结果
// start test1
// test2
// start script
// promise1
// end script
// return test2 value
// end test1
// Promise2
// setTimeout
