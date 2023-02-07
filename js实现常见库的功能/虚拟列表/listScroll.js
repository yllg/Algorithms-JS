class ListScroll {
  constructor(options) {
    // 校验一下参数是否正确
    this.optionsCheck(options);
  }

  optionsCheck(options) {
    if (!options || typeof options !== 'object') {
      throw new Error('options are illegal');
    }

    const {
      firstItemClass,
      lastItemClass,
      box,
      container,
      listSize,
      itemHeight,
      renderFunction,
      listLen,
    } = options;

    if (!firstItemClass) {
      throw new Error('firstItemClass can not be null');
    }
    if (!lastItemClass) {
      throw new Error('lastItemClass can not be null');
    }
    if (!itemHeight || typeof itemHeight !== 'number') {
      throw new Error('itemHeight is illegal');
    }
    if (!renderFunction || typeof renderFunction !== 'function') {
      throw new Error('renderFunction needs Function');
    }
    if (!listSize || typeof listSize !== 'number') {
      throw new Error('listSize needs a propriate number');
    }
    if (!listLen || typeof listLen !== 'number') {
      throw new Error('listLen needs a propriate number');
    }
    if (!container || !container.nodeType) {
      throw new Error('container needs Node');
    }
    if (!box || !box.nodeType) {
      throw new Error('box needs Node');
    }

    const boxHeight = box.offsetHeight;
    const num = Math.floor(boxHeight / itemHeight);
    const halfListSize = Math.floor(listSize / 2);
    // 进行 listSize、itemHeight 与 boxHeight关系判定
    if (halfListSize <= num + 2) {
      throw new Error(
        '在可视容器里会同时出现首尾都展示的情况！可以考虑让你的listSize再大一点'
      );
    }

    // 将信息存储起来
    // 不会变化的数据
    this.staticData = {
      firstItemClass,
      lastItemClass,
      box,
      boxHeight, // 加入盒子高度，用于滚动兼容
      container,
      listSize,
      halfListSize, // 加入半数容量
      itemHeight,
      renderFunction,
      listLen,
    };
    // 将要动态变化的数据
    this.dataCache = {
      currentIndex: 0, // 初始化首项为0
      lastScrollTop: 0, // 这里的lastScrollTop作润滑剂用，用于对比用户一次滑动是否处于大幅度状态
      firstItem: null,
      lastItem: null,
    };
  }
  getContainerFirstIndex(isScrollDown) {
    // 获取缓存的currentIndex
    const { currentIndex } = this.dataCache;
    const { halfListSize } = this.staticData;
    // 一次进行半数列表项的递增
    return isScrollDown
      ? currentIndex + halfListSize
      : currentIndex - halfListSize < 0
      ? 0
      : currentIndex - halfListSize;
  }
  getContainerLastIndex() {
    /**
     * 针对总容量为 81 - 99 ， 页容量为 20 来举的例子
     *
     * 当页面渲染的部分处于 10  - 29 之间时，firstIndex = 10
     * 当页面渲染的部分处于 20  - 39 之间时，firstIndex = 20
     * 当页面渲染的部分处于 30  - 49 之间时，firstIndex = 30
     * 当页面渲染的部分处于 40  - 59 之间时，firstIndex = 40
     * 当页面渲染的部分处于 50  - 69 之间时，firstIndex = 50
     * 当页面渲染的部分处于 60  - 79 之间时，firstIndex = 60
     * 当页面渲染的部分处于 70  - 89 之间时，firstIndex = 70  如果总容量处于 80-89 的区间，则需要拿到这个firstIndex = 70作为最后渲染的首项firstIndex，并且只需要渲染剩下的数据，而不需要渲染更多不存在的数据
     * 当页面渲染的部分处于 80  - 99 之间时，firstIndex = 80  如果总容量处于 90-99 的区间，则需要拿到这个firstIndex = 80作为最后渲染的首项firstIndex，并且只需要渲染剩下的数据，而不需要渲染更多不存在的数据
     *  */
    // 如果 listLen 刚好是 listSize 的倍数，则不用那么麻烦，直接拿 listLen - listSize 作为最后的lastIndex
    // 因此!!!需要判断剩余的容量处于什么区间，这里将剩余页容量与页容量的一半(10)作对比可以获取lastIndex
    const { listLen, listSize, halfListSize } = this.staticData;
    // 获取最后需要渲染的部分
    const restListSize = listLen % listSize;
    /**
     * eg: listLen = 100
     *     listSize = 20
     *     halfListSize = 10
     *
     *  则 restListSize = 0 => lastIndex = listLen - listSize = 80  这里用的listSize  非restListSize
     *
     * eg: listLen = 95
     *     listSize = 20
     *     halfListSize = 10
     *
     *  则 restListSize = 15 => lastIndex = listLen - restLiseSize = 80
     *
     * eg: listLen = 85
     *     listSize = 20
     *     halfListSize = 10
     *
     *  则 restListSize = 5 => lastIndex = listLen - restLiseSize - halfListSize = 70
     *
     * eg: listLen = 5
     *     listSize = 20
     *     halfListSize = 10
     *
     *  则 restListSize = 5 => lastIndex = listLen - restLiseSize - halfListSize = -10
     */
    let lastIndex;
    if (restListSize === 0) {
      lastIndex = listLen - listSize;
    } else {
      lastIndex =
        restListSize >= halfListSize
          ? listLen - restListSize
          : listLen - restListSize - halfListSize;
    }
    // 加一层判断 -- 防止数组的长度listLen一开始就低于listSize导致渲染错误
    return lastIndex <= 0 ? 0 : lastIndex;
  }
  updateDataCache(params) {
    Object.assign(this.dataCache, params);
  }
  adjustPaddings(firstIndex) {
    const {
      halfListSize,
      itemHeight,
      listLen,
      listSize,
      container,
    } = this.staticData;
    // 获取渲染listSize一半对应的高度
    const halfListSizeHeight = halfListSize * itemHeight;
    // 将 listLen - listSize 的高度作为总padding
    const totalPadding =
      ((listLen - listSize) / halfListSize) * halfListSizeHeight;
    // 将超出当前firstIndex以上的部分作为paddingTop
    const newCurrentPaddingTop =
      firstIndex <= 0 ? 0 : (firstIndex / halfListSize) * halfListSizeHeight;
    // paddingBottom则等于 totalPadding - paddingTop
    const newCurrentPaddingBottom =
      totalPadding - newCurrentPaddingTop < 0
        ? 0
        : totalPadding - newCurrentPaddingTop;
    // 修改container的padding
    container.style.paddingTop = `${newCurrentPaddingTop}px`;
    container.style.paddingBottom = `${newCurrentPaddingBottom}px`;

    console.log(
      'firstIndex, paddingTop, paddingBottom',
      firstIndex,
      newCurrentPaddingTop,
      newCurrentPaddingBottom
    );
  }
  bindNewItems() {
    const { firstItemClass, lastItemClass, container } = this.staticData;
    const { firstItem, lastItem } = this.dataCache;
    // 解绑旧的
    firstItem && this.intersectionObserver.unobserve(firstItem);
    lastItem && this.intersectionObserver.unobserve(lastItem);
    // 绑定新的
    container.children[0].classList.add(firstItemClass);
    container.children[container.children.length - 1].classList.add(
      lastItemClass
    );
    const newFirstItem = container.querySelector('.' + firstItemClass);
    const newLastItem = container.querySelector('.' + lastItemClass);
    this.intersectionObserver.observe(newFirstItem);
    this.intersectionObserver.observe(newLastItem);
    this.updateDataCache({
      firstItem: newFirstItem,
      lastItem: newLastItem,
    });
  }
  scrollCallback(firstIndex, isScrollDown) {
    const { listLen, listSize, renderFunction } = this.staticData;
    // 获取最后需要渲染列表的首项 -- 注意！ 不是要渲染的最后一项
    const lastIndex = this.getContainerLastIndex();

    if (isScrollDown) {
      // 超出最后需要渲染的部分时就不用继续渲染了
      if (firstIndex > lastIndex) return;
    } else {
      // 必须要有一个上次渲染过的firstIndex，用于防止初始化时一直重复进行调用 也用于当列表从下方滚动至最上方时防止重复渲染 firstIndex = 0 的部分
      if (this.lastRenderIndex === firstIndex) return;
    }
    this.lastRenderIndex = firstIndex;
    // 如果滚动到了底部，则只需要渲染底部剩余的列表项
    if (firstIndex === lastIndex) {
      const lastListSize = listLen - lastIndex;
      renderFunction(lastIndex, lastListSize);
    } else {
      renderFunction(firstIndex, listSize);
    }
    // 绑定首末项
    this.bindNewItems();
    // 缓存起来当前的firstIndex
    this.updateDataCache({
      currentIndex: firstIndex,
    });
    // 调整padding
    this.adjustPaddings(firstIndex);
  }
  handleScrollUp(isScrollDown) {
    // 获取需要渲染列表的首项
    const firstIndex = this.getContainerFirstIndex(isScrollDown);
    this.scrollCallback(firstIndex, isScrollDown);
  }
  handleScrollDown(isScrollDown) {
    // 获取需要渲染列表的首项
    const firstIndex = this.getContainerFirstIndex(isScrollDown);
    this.scrollCallback(firstIndex, isScrollDown);
  }
  initFirstItems() {
    const { renderFunction, listSize } = this.staticData;
    // 渲染
    renderFunction(0, listSize);
    // 绑定
    this.bindNewItems();
  }
  initListScroll() {
    const { firstItemClass, lastItemClass } = this.staticData;
    // 创建 intersectionObserver 对象
    this.intersectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        // 如果为true，则证明是进入的状态，如果为false，则是完全进入的状态，取刚进入的状态即可
        if (!entry.isIntersecting) return;
        if (entry.target.classList.contains(firstItemClass)) {
          console.log('向上滑动');
          this.handleScrollUp(false);
        } else if (entry.target.classList.contains(lastItemClass)) {
          console.log('向下滑动');
          this.handleScrollDown(true);
        }
      }
    });
    this.initFirstItems();
  }
  polyScroll() {
    const { itemHeight, halfListSize, boxHeight, box } = this.staticData;
    // 获取往下滑动时，必要的阈值 相对于  叶容量 20 以及 itemHeight 为 150， 容器盒子为500 来说就是 850
    /**
     * eg: listSize: 20, itemHeight: 150, boxHeight: 500
     * firstIndex   bottom   top    scrollTop   firstBaseHeight
     *    0          12000   0
     *    10         10500   1500      2350         1500  -  150  -  500  =  850  =  2350 - 1500
     *    20         9000    3000      3850         1500  -  150  -  500  =  850  =  3850 - 3000
     *    30         7500    4500 ...
     */
    const baseHeight = itemHeight * halfListSize - itemHeight - boxHeight;
    box.onscroll = (e) => {
      const { lastScrollTop } = this.dataCache;
      const currentScrollTop = e.target.scrollTop;
      // 处理大幅向下滚动
      if (currentScrollTop - lastScrollTop >= itemHeight) {
        // 获取当前的firstIndex
        let firstIndex =
          Math.floor(
            Math.abs(currentScrollTop - baseHeight) /
              (itemHeight * halfListSize)
          ) * halfListSize;
        // 获取最后需要渲染列表的首项
        const lastIndex = this.getContainerLastIndex();
        firstIndex = firstIndex > lastIndex ? lastIndex : firstIndex;
        this.scrollCallback(firstIndex, true);
      } else if (currentScrollTop - lastScrollTop <= -itemHeight) {
        let firstIndex =
          Math.floor(
            (currentScrollTop - itemHeight) / (itemHeight * halfListSize)
          ) * halfListSize;
        firstIndex = firstIndex <= 0 ? 0 : firstIndex;
        this.scrollCallback(firstIndex, false);
      }
      this.updateDataCache({
        lastScrollTop: currentScrollTop,
      });
    };
  }
  startObserver() {
    // 正常初始化List
    this.initListScroll();
    // 用到用户大幅度滚动时则使用scroll兼容方案
    this.polyScroll();
  }
}
