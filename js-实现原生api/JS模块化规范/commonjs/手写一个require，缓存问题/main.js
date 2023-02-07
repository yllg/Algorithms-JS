// 使用原生的 require
// let a = require('./index').a;
// console.log('直接require的结果', a);

// setTimeout(() => {
//     // require内部会有缓存，所以两次的值是一样的
//     let b = require('./index').a;
//     console.log('延迟导入后的结果', b);
// }, 100);

// 使用自己手写的 require
let myRequire = require('./手写一个require加载器.js').myRequire;
let a = myRequire('./index').a;
console.log('直接require的结果', a);

setTimeout(() => {
    // 会从缓存取上一次的值
    let b = myRequire('./index').a;
    console.log('延迟导入后的结果', b);
}, 100);