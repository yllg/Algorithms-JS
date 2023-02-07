// 1.创建ajax对象
const xhr = new XMLHttpRequest();
// 2.open
xhr.open("GET", url);
// 3.设置请求头和响应类型
xhr.setRequestHeader("Accept", "application/json");
xhr.responseType = "json";
// 4.接收返回值的回调
xhr.onreadystatechange = () => {
  /**
    readyState:
    0: 请求未初始化
    1: 服务器连接已建立
    2: 请求已接收
    3: 请求处理中
    4: 请求已完成，且响应已就绪

    status: HTTP 状态码
  **/
  if (xhr.readyState === 4 || xhr.status === 200) {
    console.log("结果", xhr.responseText);
  }
};
// 5.发送请求
xhr.send();

// 现在主要使用fetch、第三方的请求库，比如axios
