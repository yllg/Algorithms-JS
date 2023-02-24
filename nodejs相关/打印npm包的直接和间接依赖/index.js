/**
 * 题目：
 * 输入参数 为npm包的路径，比如 ./src/react
 * 返回值为数组 ['prop-types', 'scheduler', ...]
 *
 * 思路：
 * 1.第一步 获取指定node包中的package.json文件（只考虑通过npm安装的包，自定义的变动一下路径就行）
 * 2.解析package.json文件 获取dependencies和devDependencies中的依赖文件并获取依赖名
 * 3.用set对数组去重
 */

const fs = require('fs');
const path = require('path');

function getDependenceNames(pathStr, relativePath = "") {
  var filePath = path.join(__dirname + relativePath, 'node_modules/' + pathStr);
  fileDisplay(filePath, function (res) {
    let names = duplicate(res);
    console.log(names);
  });
}

//第一步 获取指定node包中的package.json文件（只考虑通过npm安装的包，自定义的变动一下路径就行）
function fileDisplay(filePath, cb) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err);
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //找到package.json 文件
        if (filename === 'package.json') {
          //获取当前文件的绝对路径
          var filedir = path.join(filePath, filename);
          //根据文件路径获取文件信息
          fs.stat(filedir, function (error, stats) {
            if (error) {
              console.warn('获取文件stats失败');
            } else {
              // 读取文件内容
              var package_json = fs.readFileSync(filedir, 'utf-8');
              let dependenciesName = getDependenciesName(
                JSON.parse(package_json)
              );
              cb(dependenciesName);
            }
          });
        }
      });
    }
  });
}

// 第二步：解析package.json文件 获取dependencies和devDependencies中的依赖文件并获取依赖名
function getDependenciesName(package_json) {
  let dependenciesArr = [];
  if (package_json['dependencies']) {
    for (let i in package_json['dependencies']) {
      dependenciesArr.push(i);
    }
  }
  if (package_json['devDependencies']) {
    for (let i in package_json['devDependencies']) {
      dependenciesArr.push(i);
    }
  }
  return dependenciesArr;
}

// 第三步：数组去重
function duplicate(arr) {
  let result = [...new Set(arr)];
  return result;
}

// test
/** 
 * 1.命令行cd进入该目录  /Algorithms-JS/nodejs相关/打印npm包的直接和间接依赖
 * 2.执行命令 node index.js
 * 
*/ 
getDependenceNames('koa', '../../../');