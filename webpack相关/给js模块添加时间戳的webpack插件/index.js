class SetScriptTimestampPlugin {
  apply(compiler) {
    // hook选择 compilation 编译创建后文件生成之前; tap同步
    compiler.hooks.compilation.tap(
      "SetScriptTimestampPlugin",
      (compilation, callback) => {
        compilation.plugin(
          "html-webpack-plugin-before-html-processing",
          function (htmlPluginData, callback) {
            // 读取并修改 script 上 src 列表
            let jsSrc = htmlPluginData.assets.js[0];
            htmlPluginData.assets.js = [];
            let result = `
                    <script>
                        let scriptDOM = document.createElement("script");
                        let jsScr = "./${jsSrc}";
                        scriptDOM.src = jsScr + "?" + new Data().getTime();
                        document.body.appendChild(scriptDOM);
                    </script>
                    `;
            let resultHTML = htmlPluginData.html.replace(
              "<!--SetScriptTimestampPlugin inset script-->",
              result
            );
            // 返回修改后的结果
            htmlPluginData.html = resultHTML;
          }
        );
      }
    );
  }
}
module.exports = SetScriptTimestampPlugin;
