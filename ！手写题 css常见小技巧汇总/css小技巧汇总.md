1、文字超出部分显示省略号

```
单行文本的溢出显示省略号（一定要有宽度）
p{
    width:200rpx;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
 }
多行文本溢出显示省略号
p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
 }
```

2、中英文自动换行

word-break:break-all;只对英文起作用，以字母作为换行依据 word-wrap:break-word; 只对英文起作用，以单词作为换行依据 white-space:pre-wrap; 只对中文起作用，强制换行 white-space:nowrap; 强制不换行，都起作用

```
p{
word-wrap: break-word;
white-space: normal;
word-break: break-all;
}
```

```
//不换行
.wrap {
white-space:nowrap;
}
//自动换行
.wrap {
word-wrap: break-word;
word-break: normal;
}
//强制换行
.wrap {
word-break:break-all;
}

```

3、文字阴影

text-shadow 为网页字体添加阴影，通过对 text-shadow 属性设置相关的属性值。属性与值的说明如下：text-shadow: [X-offset,Y-offset,Blur,Color];

```

X-offset:指阴影居于字体水平偏移的位置。
Y-offset:指阴影居于字体垂直偏移的位置。
Blur:指阴影的模糊值。
color:指阴影的颜色；

h1{
    text-shadow: 5px 5px 5px #FF0000;
}
```

4、设置 placeholder 的字体样式

```
input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: red;
}
input::-moz-placeholder { /* Firefox 19+ */
  color: red;
}
input:-ms-input-placeholder { /* IE 10+ */
  color: red;
}
input:-moz-placeholder { /* Firefox 18- */
  color: red;
}
```

5、不固定高宽 div 垂直居中的方法

方法一：伪元素和 inline-block / vertical-align（兼容 IE8）

```

.box-wrap:before {
      content: '';
      display: inline-block;
      height: 100%;
      vertical-align: middle;
      margin-right: -0.25em; //微调整空格
}
.box {
     display: inline-block;
     vertical-align: middle;
}
```

方法二：flex(不兼容 ie8 以下)

```
.box-wrap {
     height: 300px;
     justify-content:center;
     align-items:center;
     display:flex;
     background-color:#666;
 }
```

方法三：transform(不兼容 ie8 以下)

```

 .box-wrap {
     width:100%;
     height:300px;
     background:rgba(0,0,0,0.7);
     position:relative;
}
.box{
    position:absolute;
    left:50%;
    top:50%;
    transform:translateX(-50%) translateY(-50%);
    -webkit-transform:translateX(-50%) translateY(-50%);
}
```

方法四：设置 margin:auto（该方法得严格意义上的非固定宽高，而是 50%的父级的宽高。）

```
.box-wrap {
    position: relative;
    width:100%;
    height:300px;
    background-color:#f00;
}
.box-content{
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    width:50%;
    height:50%;
    margin:auto;
    background-color:#ff0;
}
```

6、解决 IOS 页面滑动卡顿

```
body,html{
-webkit-overflow-scrolling: touch;
}
```

7、设置滚动条样式

```
.test::-webkit-scrollbar{
    /_滚动条整体样式_/
    width : 10px; /_高宽分别对应横竖滚动条的尺寸_/
    height: 1px;
}
.test::-webkit-scrollbar-thumb {
    /_滚动条里面小方块_/
    border-radius : 10px;
    background-color: skyblue;
    background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
    );
}
.test::-webkit-scrollbar-track {
    /_滚动条里面轨道_/
    box-shadow : inset 0 0 5px rgba(0, 0, 0, 0.2);
    background : #ededed;
    border-radius: 10px;
}
```

8、实现隐藏滚动条同时又可以滚动

```
.demo::-webkit-scrollbar {
    display: none; /_ Chrome Safari _/
}

.demo {
    scrollbar-width: none; /_ firefox _/
    -ms-overflow-style: none; /_ IE 10+ _/
    overflow-x: hidden;
    overflow-y: auto;
}
```

9、css 绘制三角形

```
div {
width: 0;
height: 0;
border-width: 0 40px 40px;
border-style: solid;
border-color: transparent transparent red;
}
```

实现带边框的三角形：

```
<div id="blue"><div>

#blue {
position:relative;
width: 0;
height: 0;
border-width: 0 40px 40px;
border-style: solid;
border-color: transparent transparent blue;
}
#blue:after {
content: "";
position: absolute;
top: 1px;
left: -38px;
border-width: 0 38px 38px;
border-style: solid;
border-color: transparent transparent yellow;
}
```

注: 如果想绘制右直角三角，则将左 border 设置为 0；如果想绘制左直角三角，将右 border 设置为 0 即可（其它情况同理）。

10、Table 表格边框合并

```
table,tr,td{
border: 1px solid #666;
}
table{
border-collapse: collapse;
}
```

11、css 选取第 n 个标签元素

```
first-child first-child 表示选择列表中的第一个标签。
last-child last-child 表示选择列表中的最后一个标签
nth-child(3) 表示选择列表中的第 3 个标签
nth-child(2n) 这个表示选择列表中的偶数标签
nth-child(2n-1) 这个表示选择列表中的奇数标签
nth-child(n+3) 这个表示选择列表中的标签从第 3 个开始到最后。
nth-child(-n+3) 这个表示选择列表中的标签从 0 到 3，即小于 3 的标签。
nth-last-child(3) 这个表示选择列表中的倒数第 3 个标签。

使用方法：

li:first-child{}
```

12、移动端软键盘变为搜索方式

默认情况下软键盘上该键位为前往或者确认等文字，要使其变为搜索文字，需要在 input 上加上 type 声明：

```
<form action="#">
    <input type="search" placeholder="请输入..." name="search" />
</form>
```

需要一个 form 标签套起来,并且设置 action 属性,这样写完之后输入法的右下角就会自动变成搜索,同时，使用了 search 类型后，搜索框上会默认自带删除按钮。

13、onerror 处理图片异常

使用 onerror 异常处理时，若 onerror 的图片也出现问题，则图片显示会陷入死循环，所以要在赋值异常图片之后，将地址置空

```
<img onerror="this.src='url;this.onerror=null'" />
```

14、背景图片的大小

```
.bg-img{
    background:url(../img/find_pw_on_2.png)  no-repeat center center !important;
    background-size: 27px auto !important;
    /*background-size: 100% 100%;*/
    /*background-size: 50px 100px*/
}
```

15、文字之间的间距
单词 text-indent 抬头距离，letter-spacing 字与字间距

```
p{
  text-indent：10px；//单词抬头距离
  letter-spacing：10px；//间距
}
```

16、元素占满整个屏幕

heigth 如果使用 100%，会根据父级的高度来决定，所以使用 100vh 单位。

```
.dom{
  width:100%;
  height:100vh;
}
```

17、CSS 实现文本两端对齐

```
.wrap {
    text-align: justify;
    text-justify: distribute-all-lines;  //ie6-8
    text-align-last: justify;  //一个块或行的最后一行对齐方式
    -moz-text-align-last: justify;
    -webkit-text-align-last: justify;
}
```

18、实现文字竖向排版

```
// 单列展示时
.wrap {
    width: 25px;
    line-height: 18px;
    height: auto;
    font-size: 12px;
    padding: 8px 5px;
    word-wrap: break-word;/*英文的时候需要加上这句，自动换行*/
}
// 多列展示时
.wrap {
    height: 210px;
    line-height: 30px;
    text-align: justify;
    writing-mode: vertical-lr;  //从左向右
    writing-mode: tb-lr;        //IE从左向右
    //writing-mode: vertical-rl;  -- 从右向左
    //writing-mode: tb-rl;        -- 从右向左
}
```

19、使元素鼠标事件失效

```
.wrap {
  // 如果按tab能选中该元素，如button，然后按回车还是能执行对应的事件，如click。
 pointer-events: none;
 cursor: default;
}
```

20、禁止用户选择

```
.wrap {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

21、使用硬件加速

在浏览器中用 css 开启硬件加速，使 GPU (Graphics Processing Unit) 发挥功能，从而提升性能。硬件加速在移动端尤其有用，因为它可以有效的减少资源的利用。

目前主流浏览器会检测到页面中某个 DOM 元素应用了某些 CSS 规则时就会开启，最显著的特征的元素的 3D 变换。如果不使用 3D 变形，我们可以通过下面方式来开启：

```
.wrap {
    transform: translateZ(0);
}
```

22、页面动画出现闪烁问题

在 Chrome and Safari 中，当我们使用 CSS transforms 或者 animations 时可能会有页面闪烁的效果，下面的代码可以修复此情况：

```
.cube {
   -webkit-backface-visibility: hidden;
   backface-visibility: hidden;

   -webkit-perspective: 1000;
   perspective: 1000;
   /* Other transform properties here */
}
```

在 webkit 内核的浏览器中，另一个行之有效的方法是

```
.cube {
   -webkit-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
  /* Other transform properties here */
}
```

23、字母大小写转换

```
p {text-transform: uppercase}  // 将所有字母变成大写字母
p {text-transform: lowercase}  // 将所有字母变成小写字母
p {text-transform: capitalize} // 首字母大写
p {font-variant: small-caps}   // 将字体变成小型的大写字母
```

24、将一个容器设为透明

```
.wrap {
  filter:alpha(opacity=50);
  -moz-opacity:0.5;
  -khtml-opacity: 0.5;
  opacity: 0.5;
}
```

25、消除 transition 闪屏

```
.wrap {
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
}
```

26、识别字符串里的 '\n' 并换行

一般在富文本中返回换行符不是<br>的标签，而且\n。不使用正则转换的情况下，可通过下面样式实现换行。

```
body {
   white-space: pre-line;
}
```

27、移除 a 标签被点链接的边框

```
a {
  outline: none；//或者outline: 0
  text-decoration:none; //取消默认下划线
}
```

28、CSS 显示链接之后的 URL

```
<a href="//www.webqdkf.com">有课前端网</a>
<style>
a:after {content: " (" attr(href) ")";}
</style>
```

29、select 内容居中显示、下拉内容右对齐

```
select{
    text-align: center;
    text-align-last: center;
}
select option {
    direction: rtl;
}
```

30、修改 input 输入框中光标的颜色不改变字体的颜色

```
input{
    color:  #fff;
    caret-color: red;
}
```

31、子元素固定宽度 父元素宽度被撑开

```
// 父元素下的子元素是行内元素
.wrap {
  white-space: nowrap;
}
// 若父元素下的子元素是块级元素
.wrap {
  white-space: nowrap;  // 子元素不被换行
  display: inline-block;
}
```

32、让 div 里的图片和文字同时上下居中
这里不使用 flex 布局的情况。通过 vertival-align

```
.wrap {
  height: 100,
  line-height: 100
}
img {
  vertival-align：middle
}
// vertical-align css的属性vertical-align用来指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式。只对行内元素、表格单元格元素生效，不能用它垂直对齐块级元素
// vertical-align：baseline/top/middle/bottom/sub/text-top;
```

33、实现宽高等比例自适应矩形

```
.scale {
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  position: relative;
}
.item {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: 499e56;
}
<div class="scale">
     <div class="item">
         这里是所有子元素的容器
     </div>
 </div>
```

34、transfrom 的 rotate 属性在 span 标签下失效
```
span {
display: inline-block
}
```

35、CSS 加载动画
主要是通过 css 旋转动画的实现：
```
.dom{
-webkit-animation:circle 1s infinite linear;
}
@keyframes circle{
0%{ transform: rotate(0deg); }
100%{ transform: rotate(360deg); }
}
```

实现如下效果：

<div class="loader"></div>
<style>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 80px;
  height: 80px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
0% { -webkit-transform: rotate(0deg); }
100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
}
</style>

36、文字渐变效果实现

<div class="text_signature " >fly63前端网，一个免费学习前端知识的网站</div>
<style>
.text_signature {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(to right, #ec2239, #40a4e2,#ea96f5);
    width: 320px;
}
</style>

37、好看的边框阴影
```
<div class="text_shadow"></div>
<style> 
.text_shadow{
  width:500px;
  height:100px;
  box-shadow: 0px 0px 13px 1px rgba(51, 51, 51, 0.1);
}
</style>
```

38、好看的背景渐变
<div class="text_gradient"></div>
<style> 
.text_gradient{
  width:500px;
  height:100px;
  background: linear-gradient(25deg, rgb(79, 107, 208), rgb(98, 141, 185), rgb(102, 175, 161), rgb(92, 210, 133)) rgb(182, 228, 253);
}
</style>

39、实现立体字的效果
<div class="text_solid">悬笔e绝</div>
<style> 
.text_solid{
    font-size: 32px;
    text-align: center;
    font-weight: bold;
    line-height:100px;
    text-transform:uppercase;
    position: relative;
  background-color: #333;
    color:#fff;
    text-shadow:
    0px 1px 0px #c0c0c0,
    0px 2px 0px #b0b0b0,
    0px 3px 0px #a0a0a0,
    0px 4px 0px #909090,
    0px 5px 10px rgba(0, 0, 0, 0.6);
}
</style>
40、全屏背景图片的实现

```
.swper{
  background-image: url(./img/bg.jpg);
  width:100%;
  height:100%;//父级高不为100%请使用100vh
  zoom: 1;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
```

41、实现文字描边的2种方法
```
方式一：
.stroke {
      -webkit-text-stroke: 1px greenyellow;
     text-stroke: 1px greenyellow;
}
```
```
方式二：
.stroke {
  text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
  -webkit-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
  -moz-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
  *filter: Glow(color=#000, strength=1);
}
```

42、元素透明度的实现
```
.dom{
  opacity:0.4;
  filter:alpha(opacity=40); /* IE8 及其更早版本 */
}
```
使用rgba()设置颜色透明度。
说明：RGBA 是代表Red（红色） Green（绿色） Blue（蓝色）和 Alpha（不透明度）三个单词的缩写。
```
.demo{
  background:rgba(255,0,0,1);
}
```

43、解决1px边框变粗问题

```
.dom{
  height: 1px;
  background: #dbdbdb;
  transform:scaleY(0.5);
}
Ps：出现1px变粗的原因，比如在2倍屏时1px的像素实际对应2个物理像素。
```

44、CSS不同单位的运算

css自己也能够进行简单的运算，主要是用到了calc这个函数。实现不同单位的加减运算：

```
.div{ 
   width: calc(100% - 50px); 
}
```

45、CSS实现文字模糊效果

```
.vague_text{
  color: transparent; 
  text-shadow: #111 0 0 5px;
}
```

46、通过滤镜让图标变灰
一张彩色的图片就能实现鼠标移入变彩色，移出变灰的效果。

```
<a href='' class='icon'><img src='01.jpg' /></a>
<style>
.icon{
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);   
  filter: grayscale(100%);
  filter: gray;
}
.icon:hover{
  filter: none;
  -webkit-filter: grayscale(0%);
}
</style>

```

47、图片自适应object-fit

当图片比例不固定时，想要让图片自适应，一般都会用background-size:cover/contain，但是这个只适用于背景图。

css3中可使用object-fit属性来解决图片被拉伸或是被缩放的问题。使用的提前条件：图片的父级容器要有宽高。

```
img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```
fill: 默认值。内容拉伸填满整个content box, 不保证保持原有的比例。contain: 保持原有尺寸比例。长度和高度中长的那条边跟容器大小一致，短的那条等比缩放，可能会有留白。cover: 保持原有尺寸比例。宽度和高度中短的那条边跟容器大小一致，长的那条等比缩放。可能会有部分区域不可见。（常用）none: 保持原有尺寸比例。同时保持替换内容原始尺寸大小。scale-down:保持原有尺寸比例,如果容器尺寸大于图片内容尺寸，保持图片的原有尺寸，不会放大失真；容器尺寸小于图片内容尺寸，用法跟contain一样。


48、行内标签元素出现间隙问题

```
方式一：父级font-size设置为0
.father{
 font-size:0;
}
```
```

方式二：父元素上设置word-spacing的值为合适的负值
.father{
   word-spacing:-2px
}
```

其它方案：1将行内元素写为1行(影响阅读)；2使用浮动样式（会影响布局）。

49、解决vertical-align属性不生效

在使用vertical-align:middle实现垂直居中的时候，经常会发现不生效的情况。这里需要注意它生效需要满足的条件：

作用环境：父元素设置line-height。需要和height一致。或者将display属性设置为table-cell，将块元素转化为单元格。

作用对象：子元素中的inline-block和inline元素。
```
<div class="box">
  <img src=".\test.jpg"/>
  <span>内部文字</span>
</div>
<style>
.box{
  width:300px; 
  line-height: 300px;
  font-size: 16px; 
}
.box img{
  width: 30px; 
  height:30px; 
  vertical-align:middle
}
.box span{
  vertical-align:middle
}
</style>
```

PS：vertical-align不可继承，必须对子元素单独设置。同时需要注意的是line-height的高度基于font-size（即字体的高度），如果文字要转行会出现异常哦。本文完~