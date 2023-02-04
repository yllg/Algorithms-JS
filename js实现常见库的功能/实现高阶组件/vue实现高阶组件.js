// 高阶组件(HOC)接收到的 props 应该透传给被包装组件即直接将原组件prop传给包装组件
// 高阶组件完全可以添加、删除、修改 props
export default function Console(BaseComponent) {
  return {
    props: BaseComponent.props,
    mounted() {
      console.log('高阶组件');
    },
    render(h) {
      console.log(this);
      // 将 this.$slots 格式化为数组，因为 h 函数第三个参数是子节点，是一个数组
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(this.$slots[key]), [])
        .map((vnode) => {
          vnode.context = this._self; // 绑定到高阶组件上，vm：解决具名插槽被作为默认插槽进行渲染
          return vnode;
        });

      // 透传props、透传事件、透传slots
      return h(
        BaseComponent,
        {
          on: this.$listeners,
          attrs: this.$attrs, // attrs 指的是那些没有被声明为 props 的属性
          props: this.$props,
        },
        slots
      );
    },
  };
}
