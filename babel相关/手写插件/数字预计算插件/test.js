const babel = require("babel-core");

const result = babel.transform("const result = 1 + 2 + 3 +4 +5;", {
  plugins: [require("./index")],
});

console.log(result.code); // const result = 15;

// 注意：小数计算会有误差的问题，可用1KB都不到的number-precision库，或5.9KB的big.js库来修正；
