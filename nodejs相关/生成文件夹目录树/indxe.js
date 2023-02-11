/**
 * 目录结构
 * |-- components
    -- index.js
    -- file.js
    -- components-dir-tree.json  // 生成的文件树对象的输出文件，方便查看
    -- no
    -- test
       -- aa
        -- cc
 */

/**
 * init
 */
require("console-color-mr"); // 命令行样式
const fs = require("fs");
const path = require("path");
const { getDirTree, getDirName } = require("./file.js");

const componentDir = path.resolve(__dirname, "./");
// console.log('componentDir: ', componentDir);

const ComponentInit = (function init() {
  console.log("______ init ______".blueBG, "\n");
  let treeObj = getDirTree(componentDir);
  // console.log('treeObj: ',treeObj);
  if (treeObj) {
    let outdir = `${__dirname}\\${getDirName(componentDir)}-dir-tree.json`;
    // 写入文件
    fs.writeFile(outdir, JSON.stringify(treeObj, "", "\t"), "utf8", (err) => {
      if (err) throw err;
      console.log(`目录树已输出为文件保存: ${outdir}`.greenBG);
    });
  }
  return init;
})();

module.exports = ComponentInit;
