// Asynchronous Javascript And XML
function ajax(options) {
  // 选项
  var method = options.method || "GET",
    params = options.params,
    data = options.data,
    url =
      options.url +
      (params
        ? "?" +
          Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&")
        : ""),
    async = options.async === false ? false : true,
    success = options.success,
    headers = options.headers;

  var request;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
  }

  request.onreadystatechange = function () {
    /**
      readyState:
        0: 请求未初始化
        1: 服务器连接已建立
        2: 请求已接收
        3: 请求处理中
        4: 请求已完成，且响应已就绪
  
      status: HTTP 状态码
      **/
    if (request.readyState === 4 && request.status === 200) {
      success && success(request.responseText);
    }
  };

  request.open(method, url, async);
  if (headers) {
    Object.keys(headers).forEach((key) =>
      request.setRequestHeader(key, headers[key])
    );
  }
  method === "GET" ? request.send() : request.send(data);
}

// test
ajax({
  method: "GET",
  url: "...",
  success: function (res) {
    console.log("success", res);
  },
  async: true,
  params: {
    p: "test",
    t: 666,
  },
  headers: {
    "Content-Type": "application/json",
  },
});
