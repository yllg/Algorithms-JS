const Koa = require('koa');
const log = require('./log.js');
const app = new Koa();
let config = {
    format: text => text,
}
app.use(log(config));
// 浏览器访问 localhost:3000/test 可以看到控制台输出的路径 /test
app.listen(3000);