const fs = require("fs");
const { getDirTree, readDir, isFile, readFile } = require("./utils");

/**
 * 获取目录下的文件树
 * @param {读取的路径} dir
 * @returns 返回 dir 目录下的文件树
 */
function getDirTree(dir) {
  let obj = {
    dir: dir, // 文件夹路径
    childFiles: [], // 子文件
    childDir: {}, // 子目录
  };
  let objStr = JSON.stringify(obj);
  if (isFile(dir)) return console.log(`${dir}: 不是文件夹`.redBG);

  // 读取目录
  let files = readDir(dir);
  if (!files.length) console.log(`${dir}: 文件夹为空`.redBG);

  // 遍历文件
  files.forEach((file) => {
    let tempdir = `${dir}\\${file}`;
    if (isFile(tempdir)) {
      obj.childFiles.push({
        short: file, // 文件名
        full: tempdir, // 完整路径
      });
    } else {
      // console.log('tempdir: ',tempdir);
      let dirname = getDirName(tempdir);
      // 在当前文件夹的对象下 childDir 属性(1)，以文件夹名作为key(2)，
      // (2)的值是该目录下 路径dir、childFiles子文件、childDir子文件夹组成的对象或null
      obj.childDir[dirname] = getDirTree(tempdir);
    }
  });
  return JSON.stringify(obj) === objStr ? null : obj;
}
