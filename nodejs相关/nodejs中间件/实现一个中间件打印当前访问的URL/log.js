// log.js文件
module.exports = (options) => {
  if (!options.format) {
    console.log('需要传递format参数');
  }
  return async (ctx, next) => {
    console.log('当前访问路径', options.format(ctx.url));
    await next();
  };
};
