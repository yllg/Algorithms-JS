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
