// 一.useAxios
// 1.封装 useAxios
import { useState, useEffect } from 'react';
import axios from 'axios';
// 封装axios ，发送自定义的网络请求hook
function useAxios(url) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    // 利用axios请求
    setLoading(true);
    axios
      .get(url)
      .then((res) => setData(res))
      .catch((error) => setError(error))
      .finally(() => {
        setLoading(false);
      });
  }, [url]); // 注意这里要传入参数url，代表url改变的时候才触发哦
  return [loading, data, error]; // 直接返回变量
}
export default useAxios;

// 2.使用 useAxios
import React, { useState, useEffect } from 'react';
import useAxios from './UseAxios'; // 引入

export default () => {
  const url = 'http://localhost:3000/';
  // 数组解构,传入初始值
  const [loading, data, error] = useAxios(url);
  if (loading) {
    return <div>loading...</div>;
  }
  return error ? (
    <div>{JSON.stringify(error)}</div>
  ) : (
    <div>{JSON.stringify(data)}</div>
  );
};

// 二.useTitle
// 1.封装 useTitle
import { useState, useEffect } from 'react';

function useTitle(title) {
  useEffect(() => {
    document.title = title;
  }, []);
  return;
}
export default useTitle;

// 2.使用 useTitle
import React, { useState, useEffect } from 'react';
import useTitle from './UseTitle';

export default () => {
  useTitle('useTitle设置的标题33');
  return <div>333</div>;
};
