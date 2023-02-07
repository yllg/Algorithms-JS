// es6 module 中基本类型也按引用传递
export let a = 1;

export function count() {
  a++;
}

// export default 是无法 a 的动态绑定 这一点跟 CommonJs 有点相似 都是值的拷贝
// let a = 1;
// export default a;
// 可以用另一种方式实现 default 的动态绑定
// let a = 1;
// export { a as default }
// export function count(){
//   a++
// }
// 注意要这样引入：
// import a, { count } from './foo.js';