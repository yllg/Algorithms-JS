# React Hooks 解决了什么问题，如何用Hooks的方法去模拟Class Components 的功能

# 一. 要解决的问题
官方文档提了三个点

## 1. 在组件之间复用状态逻辑困难

复杂组件的render props，JSX，高阶组件，容易造成“嵌套地狱”

## 2. 复杂组件变得难以理解

比如各种各样的生命周期把业务逻辑拆分的七零八碎；

## 3. 难以理解的class组件；this问题；

# 二.hooks模拟类组件的生命周期
## 1.constructor
类组件

``` js
class Example extends Component {
    constructor() {
        super();
        this.state = {
            count: 0
        }
    }
    render() {
        return null;
    }
}
```

函数组件
不需要构造函数, 可以通过调用 useState 来初始化 state

``` js
function Example() {
    const [count, setCount] = useState(0);
    return null;
}
```

## 2.componentDidMount
类组件

``` js
class Example extends React.Component {
    componentDidMount() {
        console.log('I am mounted!');
    }
    render() {
        return null;
    }
}
```

函数组件
useEffect第二个参数是一个空列表时，回调只会被触发一次，类似于 componentDidMount。

``` js
function Example() {
    useEffect(() => console.log('mounted'), []);
    return null;
}
```

## 3.shouldComponentUpdate
类组件

``` js
shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate')
    // return true 更新组件
    // return false 则不更新组件
}
```

函数组件
React.memo 包裹一个组件来对它的 props 进行浅比较, 
但这不是一个 hooks, 其实 React.memo 等效于 PureComponent，但它只比较 props。

``` js
const MyComponent = React.memo(
    _MyComponent,
    (prevProps, nextProps) => nextProps.count !== prevProps.count
)
```

## 4.componentDidUpdate
类组件

``` js
componentDidMount() {
    console.log('mounted or updated');
}
componentDidUpdate() {
    console.log('mounted or updated');
}
```

函数组件

``` js
useEffect(() => console.log('mounted or updated'));
```

上面的回调函数会在每次渲染后调用，因此不仅可以访问 componentDidUpdate，还可以访问componentDidMount，
如果只想模拟 componentDidUpdate，我们可以这样来实现

``` js
const mounted = useRef();
useEffect(() => {
    if (!mounted.current) {
        mounted.current = true;
    } else {
        console.log('I am didUpdate')
    }
});
```

## 5.componentWillUnmount
类组件

``` js
componentWillUnmount() {
    console.log('will unmount');
}
```

函数组件
当在 useEffect 的回调函数中返回一个函数时，这个函数会在组件卸载前被调用。
可以在这里面清除定时器或事件监听器。

``` js
useEffect(() => {
    return () => {
        console.log('will unmount');
    }
}, []);
```
