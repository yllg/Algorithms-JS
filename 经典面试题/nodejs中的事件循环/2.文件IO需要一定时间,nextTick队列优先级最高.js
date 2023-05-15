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

/**
 * 分析思路
 * （1）主代码块输出script start、 script end
 * （2）微任务： promise和nextTick 全都放到poll中，一次性全部执行完，nextTick优先级高，所以先打印
 * （3）setTimeout 1ms执行完加到 poll队列，去执行；里面的fs.readfile 2放到下一轮；
 * （4）poll队列为空，去执行 setImmediate
 * （5）文件读取完成 加入poll队列，输出 read file success 和 read file success 2
 * 
 * 
 * 分析过程
    第一轮：
    宏任务  script start， script end       
    微任务：nextTick callback、promise1、4、2、5、3、6

    第二轮：
    宏任务   setTimeout ; timer阶段执行   
    微：

    第三轮：
    宏任务  setImmediate ; check阶段执行  
    微：

    第四轮：
    宏任务 read file success ; 文件读取完成，进入 poll阶段
    微：

    第五轮：
    宏任务   read file success 2 ;      
    微：
 */

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
