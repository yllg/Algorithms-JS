class HelloWorldPlugin {
    apply(compiler) {
        // hook选择done 编译完成，tap同步
        compiler.hooks.done.tap("Hello World Plugin", (stats) => {
            console.log("Hello World");
        });
    }
}
module.exports = HelloWorldPlugin;