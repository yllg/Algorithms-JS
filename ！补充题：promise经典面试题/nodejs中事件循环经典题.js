async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
  // async1中await不是promise，先把await后面的代码（async1 end）放到微任务，再执行async外面的同步代码,会把promise3放到微任务中
}

console.log('script start');

setTimeout(function () {
  console.log('setTimeout0');
}, 0);

setTimeout(function () {
  console.log('setTimeout2');
}, 300);

setImmediate(() => console.log('setImmediate'));

process.nextTick(() => console.log('nextTick1'));

async1();

process.nextTick(() => console.log('nextTick2'));

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
  console.log('promise2');
}).then(function () {
  console.log('promise3');
});

console.log('script end');

// 结果：
// script start；
// async1 start；
// async2；
// promise1；
// promise2；
// script end；
// nextTick1；
// nextTick2；
// async1 end；
// promise3
// settimeout0；
// setImmediate；
// settimeout2；

// 解析：
// 第一轮
//     宏：script start； async1 start；async2；promise1；promise2；script end；
//     微：
//          nextTick队列：nextTick1；nextTick2；
//          其他队列：async1 end；promise3
// 第二轮
//     timer阶段 宏 settimeout0；
//     check阶段 宏 setImmediate；
// 第三轮，300ms后timer阶段 宏 settimeout2；
