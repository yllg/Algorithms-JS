const myMiddleware = (store) => (next) => (action) => {
  // 在这里你可以拿到　store.getState 和　store.dispatch
  // 注意如果你调用 store.dispatch,中间件又从新从最外层开始　如果不加限制条件将陷入死循环
  // do something
  next(action); // 进入下一个中间件,最后一个中间件的 next 参数为 redux 原生 dispatch
  // 返回继续执行这个中间件剩余部分
};

// 比如，写一个打印state的中间件，printStateMiddleware
// 使用解构直接拿到getState
const printStateMiddleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    console.log("beforeState ->", getState());
    let returnValue = next(action);
    console.log("afterState ->", getState());
    return returnValue;
  };
