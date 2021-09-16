const http = require('http');

/**
 * 
 * 创建 http 服务，简单返回
 */

const server = http.createServer((req, res) => {
  res.write(`hello world, start with cluster ${process.pid}`);

  res.end();
});

/**
 * 
 * 启动服务
 */

server.listen(3000, () => {
  console.log('server start http://127.0.0.1:3000');
});

console.log(`Worker ${process.pid} started`);
