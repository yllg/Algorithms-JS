// 下面两种情况，node环境和H5环境一致

// await 要等的东西有两种，是promise或者不是promise
// 1.await等的 是promise，先执行async外面的同步代码，再把await后面的代码放到微任务；
async function test1() {
  console.log('start test1');
  console.log(await test2());
  console.log('end test1');
}
async function test2() {
  console.log('test2');
  return await 'return test2 value';
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
// console.log('end script');

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

// 2.await等的 不是promise，先把await后面的代码放到微任务，再执行async外面的同步代码；
// 把上面代码中 test2中第二句注释掉
// async function test1() {
//   console.log('start test1');
//   console.log(await test2());
//   console.log('end test1');
// }
// async function test2() {
//   console.log('test2');
//   // return await 'return test2 value';  注释掉这一行
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

// 结果
// start test1
// test2
// start script
// promise1
// end script
// undefined
// end test1
// Promise2
// setTimeout
