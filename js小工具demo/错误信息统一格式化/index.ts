// 1.chrome 的 Error对象
const fixtureStack = `TypeError: Error raised
  at bar http://192.168.31.8:8000/c.js:2:9
  at foo http://192.168.31.8:8000/b.js:4:15
  at calc http://192.168.31.8:8000/a.js:4:3
  at <anonymous>:1:11
  at http://192.168.31.8:8000/a.js:22:3
`;

// 2.firefox 的 Error对象
const fixtureFirefoxStack = `
  bar@http://192.168.31.8:8000/c.js:2:9
  foo@http://192.168.31.8:8000/b.js:4:15
  calc@http://192.168.31.8:8000/a.js:4:3
  <anonymous>:1:11
  http://192.168.31.8:8000/a.js:22:3
`;

// 输出格式如下
interface ErrorMessage {
  message: string;
  stack: Array<{
    line: number;
    column: number;
    filename: string;
  }>;
}

// 解答:
interface IStackItem {
  line: number;
  column: number;
  filename: string;
}

interface ErrorMessage {
  message: string;
  stack: IStackItem[];
}

const reg = /^.*(https?:\/\/.+):(\d+):(\d+)$/;

const ErrorToMessage = (error: Error): ErrorMessage => {
  const stackMsgArr = (error.stack || "").split(`
      `);
  const stack: IStackItem[] = [];
  stackMsgArr.forEach((msg) => {
    if (!msg.trim()) return;
    const match = msg.trim().match(reg);
    if (!match) return;
    stack.push({
      filename: match[1],
      line: parseInt(match[2]),
      column: parseInt(match[3]),
    });
  });
  return {
    message: error.message,
    stack,
  };
};

export default ErrorToMessage;
