const box = document.querySelector('.box');
const container = box.querySelector('.item-box');

let listArray = new Array(100).fill('').map((_, index) => index);

const renderFunction = (firstIndex, listSize) => {
  let list = ``;
  for (let i = firstIndex; i < firstIndex + listSize; i++) {
    list += `<li>${i}</li>`;
  }
  container.innerHTML = list;
};

const listSize = 20;
const itemHeight = 150;

/**
 * 参考文章：https://juejin.cn/post/6844904185830473736
 * 这个长列表优化渲染方案优先是基于 intersectionObserver + padding进行异步加载数据
 * 以及润滑剂基于scroll + padding进行同步加载数据来完成的
 * 具体步骤除了一开始获取首项item的方式不同，其它的步骤一致，均为取消监听 旧的首末项， 绑定监听新的首末项，然后对容器添加padding。
 * 在实现正常的滑动的基础上，让用户的一些大幅度的操作也能满足要求
*/ 

const listScroll = new ListScroll({
  firstItemClass: 'item-first',
  lastItemClass: 'item-last',
  box, //  盒子
  container, // 列表容器
  listSize, // 一次渲染的列表项
  itemHeight, // 一个 item  对应的高度
  renderFunction, // 渲染回调函数
  listLen: listArray.length, // 列表项总数
});
listScroll.startObserver();
