# 1.数组乱序

在使用需要某种程度的随机化的算法时，你会经常发现洗牌数组是一个相当必要的技能。下面的片段以O(n log n)的复杂度对一个数组进行就地洗牌。

```
const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5) 。
// 测试
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(shuffleArray(arr))。
```

# 复制到剪贴板
在Web应用程序中，复制到剪贴板因其对用户的便利性而迅速流行起来。
```
const copyToClipboard = (text) =>
  navigator.clipboard?.writeText && navigator.clipboard.writeText（text）。
// 测试
copyToClipboard("Hello World!")。
```
注意：根据caniuse，该方法对93.08%的全球用户有效。所以必须检查用户的浏览器是否支持该API。为了支持所有用户，你可以使用一个输入并复制其内容。

# 数组去重
每种语言都有自己的哈希列表的实现，在JavaScript中，它被称为Set。你可以使用Set数据结构轻松地从一个数组中获得唯一元素。
```
const getUnique = (arr) => [...new Set(arr)]。
// 测试
const arr = [1, 1, 2, 3, 3, 4, 4, 5, 5];
console.log(getUnique(arr))。
```

# 检测黑暗模式
随着黑暗模式的普及，如果用户在他们的设备中启用了黑暗模式，那么将你的应用程序切换到黑暗模式是非常理想的。幸运的是，可以利用媒体查询来使这项任务变得简单。

```
const isDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches。
// 测试
console.log(isDarkMode())。
```
根据caniuse的数据，matchMedia的支持率为97.19%。


# 滚动到顶部
初学者经常发现自己在正确滚动元素的过程中遇到困难。最简单的滚动元素的方法是使用scrollIntoView方法。添加行为。"smooth "来实现平滑的滚动动画。
```
const scrollToTop = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "start" })。
```

# 滚动到底部
就像scrollToTop方法一样，scrollToBottom方法也可以用scrollIntoView方法轻松实现，只需将块值切换为结束即可
```
const scrollToBottom = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "end" })。
```

# 生成随机颜色
你的应用程序是否依赖随机颜色的生成？不用再看了，下面的代码段可以满足你的要求
```
const generateRandomHexColor = () =>
  `#${Math.floor(Math.random() * 0xffffff) .toString(16)}`;
```