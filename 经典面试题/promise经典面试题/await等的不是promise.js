async function async1() {
  console.log('async1 start');
  await async2(); 
  console.log('async1 end');
}

async function async2() {
  console.log('async2'); // 宏任务； return返回的是微任务，见下一题
}

console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);

async1();

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
  console.log('promise2');
}).then(function () {
  console.log('promise3');
});

console.log('script end');

// 注意 第三行await等的 不是promise，先把await后面的代码（async1 end）放到微任务，再执行async外面的同步代码，再把 promise3 放到微任务队列

// 宏任务
// script start
// async1 start
// async2
// promise1
// promise2
// script end

// 微任务
// async1 end
// promise3

// 下一轮 
// setTimeout
