const HelloWorldPlugin = require("./index");

module.exports = {
  // ...其他配置...
  plugins: [
    new HelloWorldPlugin({
      options: true,
    }),
  ],
};
