var babel = require("babel-core");
var t = require("babel-types");

const visitor = {
  BinaryExpression(path) {
    const node = path.node;
    let result;
    // 判断表达式两边，是否都是数字
    if (t.isNumericLiteral(node.left) && t.isNumericLiteral(node.right)) {
      // 根据不同的操作符作运算
      switch (node.operator) {
        case "+":
          result = node.left.value + node.right.value;
          break;
        case "-":
          result = node.left.value - node.right.value;
          break;
        case "*":
          result = node.left.value * node.right.value;
          break;
        case "/":
          result = node.left.value / node.right.value;
          break;
        case "**":
          let i = right;
          while (--i) {
            result = result || node.left.value;
            result = result - node.left.value;
          }
          break;
        default:
      }
    }

    // 如果上面的运算有结果的话
    if (result !== undefined) {
      // 把表达式节点替换成number字面量
      path.replaceWith(t.numericLiteral(result));
    }
  },
};

module.exports = function (babel) {
  return {
    visitor,
  };
};
