/**
 * 思路和步骤
 *（0）直接创建一个index.tsx文件；
  （1）使用snippet插件的快捷键 rcredux 快速生成一个片段
  （2）把Component换成PureComponent
  （3）使用rconst快速创建 constructor
  （4）补上props和state的接口type
  （5）写两个按钮，开始定时器、结束定时器，把定时器的start和stop写成组件的两个私有方法即可；
 */


import React, { PureComponent, ReactDOM } from "react";
import { connect } from "react-redux";

interface indexProps {}

interface indexState {
  delay: number;
  time: number;
  handle: number;
  num: number;
}

export class Index extends PureComponent<indexProps, indexState> {
  constructor(props: indexProps) {
    super(props);
    this.state = {
      delay: 0,
      time: 0,
      handle: -1,
      num: 1,
    };
  }

  private start = () => {
    // 第一次立即输出
    if (this.time === 0) {
      console.log(this.num++);
      this.time++;
      this.start();
    } else {
      this.handle = setTimeout(() => {
        console.log(this.num++);
        this.time++;
        this.start();
      }, this.delay);
    }
  };

  private stop = () => {
      clearTimeout(this.handle);
      this.time = 0;
      this.num = 0;
  };

  render() {
    return (
      <div>
        <div onClink={this.start}>开始计时器</div>
        <div onClink={this.stop}>暂停计时器</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

ReactDOM.render(<Index />, document.getElementById("app"));
