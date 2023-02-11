import { useEffect, useState } from "react";
import "./styles.css";

/**
 * 使用 setTimeout 实现时，当页面处于不可见 (document.hidden = false) 状态时，将会停止计时
 * 建议使用 setInterval 实现
*/ 

function CounterWithTimeout() {
  const [count, setCount] = useState(0);
  useEffect(() =>
    setTimeout(() => {
      setCount(count + 1);
    }, 1000)
  );
  return <h1>{count}</h1>;
}

function CounterWithInterval() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <h1>{count}</h1>;
}

export default function App() {
  return (
    <section>
      <CounterWithTimeout />
      <CounterWithInterval />
    </section>
  );
}
