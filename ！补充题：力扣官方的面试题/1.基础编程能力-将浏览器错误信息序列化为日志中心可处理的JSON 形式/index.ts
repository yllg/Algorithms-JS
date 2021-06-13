interface IStackItem {
  line: number;
  column: number;
  filename: string;
}

interface ErrorMessage {
  message: string;
  stack: IStackItem[];
}

const reg_mes = /^.*TypeError:\s*(.*)$/;
const reg_stack = /^.*(https?:\/\/.+):(\d+):(\d+)$/;

const ErrorToMessage = (error: String): ErrorMessage => {
  const stackMsgArr = (error || '').split(`
    `);
  const stack: IStackItem[] = [];
  let message: string = '';
  stackMsgArr.forEach((msg) => {
    if (!msg.trim()) return;
    let match_mes = msg.trim().match(reg_mes);
    if (match_mes) {
      message = match_mes[1];
      return;
    }
    const match_stack = msg.trim().match(reg_stack);
    if (!match_stack) return;
    stack.push({
      filename: match_stack[1],
      line: parseInt(match_stack[2]),
      column: parseInt(match_stack[3]),
    });
  });
  return {
    message: message,
    stack,
  };
};

export default ErrorToMessage;
