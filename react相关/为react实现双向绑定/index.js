/**
 * 双向绑定
 * 1.一个单向数据流传入，input的 'value' 属性实现 Model => View 的数据流
 * 2.一个事件响应，比如input的 'onChange' handler实现 View => Model 的数据流
 */

// 方法1：父组件props传入一个特定数组，是给到子组件的value和onChange
class App extends Component {
  state = {
    value: "xxx",
  };
  render() {
    return (
      <Input $value={[this.state.value, (value) => this.setState({ value })]} />
    );
  }
}

// 子组件接受，设置 value 和 onChange
class Input extends Component {
  static props = {
    $value: [String, Function],
  };
  render() {
    const { $value } = this.props;
    const [value, reflect] = $value;
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => reflect(e.target.value)}
      />
    );
  }
}

// 方法2：使用类似vue的写法 model={this.state.name} ，自己编写 babel插件 编译成 value 和 onChange;参考这篇文章：https://juejin.im/post/59f2e9b16fb9a04529360146
