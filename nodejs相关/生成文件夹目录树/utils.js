// 读取路径下的文件、文件夹
function readDir(dir) {
  return fs.readdirSync(dir, (err, files) => {
    if (err) throw err;
    // console.log(`${dir}, files: `.green, files);
    // if (!files.length) console.log(`${dir}: 文件夹为空`.redBG);
    return files;
  });
}

// 判断制定路径是否是文件
function isFile(dir) {
  return fs.statSync(dir).isFile();
}

// 获取目录名
function getDirName(dir) {
  let tempdir = dir.substr(dir.lastIndexOf("\\") + 1, dir.length);
  return tempdir;
}

// const components_out = readFile(path.resolve(__dirname, './components-dir-tree.json'));
// console.log('components-dir-tree: ', components_out);

// 读取指定目录的文件
function readFile(dir) {
  let result = fs.readFileSync(dir, "utf-8");
  return result
    ? {
        dir: dir,
        result: result,
      }
    : null;
}

module.exports = {
  getDirTree,
  readDir,
  isFile,
  readFile,
};
