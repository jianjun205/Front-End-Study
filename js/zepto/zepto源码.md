## 本课程内容

如果你常用zepto，却没有试着深入zepto源码去看看它是如何实现的，你不好奇吗？跟随我，打开zepto的源码来分析一下，看看zepto是用何种方式做成了流行全世界的js库。

本课程内容主要有两个：

- 分析zepto的设计思想，并思考如何才能实现这种设计；
- 打开zepto源码，看它是如何实现的；

扩展内容：

- 作者标注的 zepto core模块的源码注视；

> 至于为何要解读源码和设计？我想既然来看该教程的朋友，应该都知道它的意义，这里不再唠叨。总之，**拜读经典框架的源码、学习设计思想，就等于站在巨人的肩膀上**。

## 面向的用户

- 用过zepto，熟悉zepto的常用API（默认你有js基础）
- 有基础并且想深入学习的『新兵』

## 关于时间

现说一下，该教程讲义准备的时间是2016年7月份。您看到该教程的时间可能会比这个时间晚很多，但是没关系，该教程讲解的内容应该会一直有效。原因有二：

- zepto至今早就稳定了，代码不会有很大的变化；
- 只要ES6没有完全流行开（尚需babel转义），js的语法是不会变的；

**因此，那些抱怨前端变化快的同学，您该转变一下观念了** ——我一直觉得前端快的只是一小部分，当然这是题外话。

## 关于文档形式

请不要被大学老师的讲课方式所影响，仔细考虑以下问题：

> 视频教程该用文档还是用ppt？

- 产品化（文档 - 产品；ppt - 事件）
- 持续化（文档更易事后查阅）
- 结构化（使知识更加体系，不零散）

## 最后

本教程中，讲解设计的部分大约占一半时间，分析源码占另一半时间。因为我觉得，分析和学习设计，比看源码要更加重要。

而另一半时间看源码肯定是看不完的，但是我们也没有必要看完，大家都挺忙的，咱们就好钢用在刀刃上。了解了关键的代码，剩下的完全可以自己来轻松看完——只要你想看。

我正式读过源码的经典框架有4个，我自己的感觉就是——**解读源码之后，真正留在自己脑子里面的，是这个框架的设计思想**。当跟我看完zepto-core的源码之后，你应该会有这种体会。

## 诡异的数组

那么接下来，先通过最简单的一个例子看一眼zepto的设计。先来一个很简单的html页面，``中的代码如下：

```
    <p id="p1">测试</p>
    <div>
        <span>test</span>
        <span>test</span>
        <span>test</span>
    </div>

    <script type="text/javascript" src="js/zepto-1.1.6.js"></script>
```

运行页面，然后在chrome的控制台中输入代码做测试。

```
var $p = $('p');  // $p 是数组
var $span = $('span');  // $span 是数组
```

以上代码中，`$p`和`$span`看起来都是数组，这没有问题。但是我们通过API知道，`$p.addClass`是一个函数，而一般的数组没有`addClass`这个函数。

如果都是一样的数组，那么`$p.addClass`是哪里来的呢？显然`$p`不是一个常规的数组。其实我们还有其他方法可以证明

```
var arr = [1,2,3];
var $p = $('p');

// 对比1
arr.__proto__.constructor === Array;  // true
$p.__proto__.constructor === Array;  // false

// 对比2
arr instanceof Array;  // true
$p instanceof Array;  // false
```

种种迹象表明，`$p`是一个看似数组，而非数组的东西。像《聊斋》里的画皮，是否很诡异。。。

## 先扒一层皮

如果你对js语法不是很熟练，估计刚才就被这位『画皮』吓蒙了。不过别着急，如果它是画皮，我就是一个称职的老道士。现在先拿一张道符把它点破，然后下一节再教你一招桌妖大法，让你彻底把它打败。

```
var arr = [1,2,3];
console.log(arr.__proto__);  // 输入一个对象
```

如上代码，`arr.__proto__`输出了一个对象，对象里面包含了我们常用的操作数组的函数，例如`concat`,`push`,`map`等，**先不要管这个__proto__是什么意思**。就是因为这个`__proto__`有了这些函数，`arr`才能使用。

![img](http://box.kancloud.cn/2016-07-04_577a764b28657.png)

js语法非常灵活（号称最大的底线就是无底线），对象是可以随便赋值的，那么我就可以将`__proto__`重新赋值，让数组具有其他函数的功能啊，例如加一个`addClass`函数。

```
var arr = [1,2,3];
arr.__proto__ = {
    addClass: function () {
        console.log(123);
    }
};
arr.addClass();   // 123
```

注意，经过这一步，`arr.concat`等其他功能就没有，此时`arr`就只有`addClass`这一个函数相依为命了。

![img](http://box.kancloud.cn/2016-07-04_577a764cbc605.png)

但是无论如何，此时我们再去拿`arr`来做第一次的那几个验证，得到的结果就和之前的`$p`一样了，即`arr`此时也称了一个不是数组的数组。

而zepto也就是这么干的。







## javascript 三座大山

这个标题其实我自己总结的，目前网络上没有相关的说法。意思就是javascript中比较重要难懂的三点知识。熟练掌握了这三点，你的javascript的基本功才算是过关。否则，你去BAT这种公司去面试前端，估计是过不了关。

- **原型和原型链**
- **上下文环境和作用域**
- **单线程和异步**

以上这『三座大山』我希望能找机会跟大家单独分享，此处只讲第一个的一部分，即讲到你能看懂后面zepto的设计，就够了。

## `Array.prototype`

先记住一句话——**每一个函数，都有一个prototype属性**——每一个函数，无论是你自定义的，还是系统内置的。不信可以试试。

```
var fn = function() {}
console.log( fn.prototype );
```

这里打印出来的`fn.prototype`是一个对象，只有一个`constructor`属性，指向该函数自身，即`fn.prototype.constructor === fn`。

![img](http://box.kancloud.cn/2016-07-04_577a764cd4521.png)

以上是自定义的函数，数组构造函数`Array`也是一个函数，只不过是浏览器内置的函数，它也得符合以上那句话。

```
console.log( typeof Array );   // 'function'
console.log( Array.prototype );
```

这里打印出来的`Array.prototype`也是一个对象，也有一个`constructor`属性，指向该函数自身。只不过还内置了其他的属性——废话，内置的对象毛用没有还内置个卵劲啊。

![img](http://box.kancloud.cn/2016-07-04_577a764d259d6.png)

## `[].__proto__`

然后，再记住一句话——**所有通过函数new出来的东西，这个东西都有一个__proto__指向这个函数的prototype**，这里我们给他们分别取一个中文名字：

- `prototype` （显示）原型
- `__proto__` 隐式原型

```
var arr = [];  // 等价于 var arr = new Array()
arr.__proto__ === Array.prototype;  // true 
```

![img](http://box.kancloud.cn/2016-07-04_577a764d3a167.png)

然后，再记住一句话——**当你想要使用一个对象（或者一个数组）的某个功能时：如果该对象本身具有这个功能，则直接使用；如果该对象本身没有这个功能，则去__proto__中找**

```
var obj = {
    fn1: function () {
        console.log('fn1');
    }
};
obj.fn1();  // 'fn1'
obj.toString();  // '[object Object]'  （在 obj.__proto__ 中找到）
```

数组也一样

```
var arr = [];
arr.push(1);   // 在 arr.__proto__ 中找到了 push  方法
```

这就是为何数组会有`concat`、`push`等方法，顺藤摸瓜最终摸到了`Array.prototype`中来了。

因此，下列代码是成立的

```
[].concat === Array.prototype.concat;
[].push === Array.prototype.push;
[].map === Array.prototype.map;
```

## `__proto__`是可修改的

上一节我们说过，`__proto__`就是一个基本的js对象，根据js无底线的语法规则，它是完全可以被修改或者重写的。这里不妨就再多唠叨两句。

![img](http://box.kancloud.cn/2016-07-04_577a764d558af.png)

修改`__proto__`的例子。修改了之后，`arr`不仅有内置的`concat`、`push`等功能，还多了一个`addClass`功能。

```
var arr = [1,2,3];
arr.__proto__.addClass = function () {
    console.log(123);
}
arr.push(4);
arr.addClass();   // 123
```

完全重写 `__proto__` 的例子，上一节讲过。还是注意，重写`__proto__`之后，`arr`可就失去了`concat`、`push`等亲人了，只有一个`addClass`功能了。

```
var arr = [1,2,3];
arr.__proto__ = {
    addClass: function () {
        console.log(123);
    }
};
arr.addClass();   // 123
```

## 总结

第一，上文中有三句话要记住并且理解；
第二，有了这些基础知识，再去扒zepto的皮就轻而易举了；
第三，关于js的原型和原型链的知识，真的还有很多话没有说；





## 回顾zepto对象

经过了上一节的知识补充之后，我们再回到先前zepto的那个例子。

```html
    <p id="p1">测试</p>
    <div>
        <span>test</span>
        <span>test</span>
        <span>test</span>
    </div>

    <script type="text/javascript" src="js/zepto-1.1.6.js"></script>
    <script type="text/javascript">
        var $p1 = $('#p1');
        console.log($p1);

        var $span = $('span');
        console.log($span);
    </script>
```

上面代码中，我们之前就了解到`$p`或者`$span`是一个数组，但是又扩展了其他功能（例如 `$p.addClass`），这里可以肯定的是，`$p.__proto__`肯定是被修改过的，而不仅仅是`Array.prototype`，否则不会有`addClass`功能。

## 如何做到的

源码中如何做的，我们接下来会有详细的描述，不过我们这里可以使用自己的代码简单模拟一下。其实非常简单：

```
var arr = [1,2,3];
arr.__proto__ = {
    addClass: function  () {
        console.log('this is addClass');
    },
    concat: Array.prototype.concat,
    push: Array.prototype.push
};

arr.push(4);
arr.addClass();
```

![img](http://box.kancloud.cn/2016-07-04_577a764d79a55.png)

*PS：其实源码在实现这个设计的时候，并不像上面代码那么简单，只不过原理是一样的。源码具体的实现方式，还得边解读边了解。*

## 验证

以上自己手写了几行代码，就简单模拟了一个zepto的设计结构，那么是不是和zepto一样呢？我们这里简单验证一下。

```
var $p = $('p');

// 使用 constructor 验证
arr.__proto__.constructor === $p.__proto__.constructor; // true

// 使用 instanceof 验证
console.log( $p instanceof Array );  // false
console.log(arr instanceof Array );  // false
```

## 总结

如果你仅仅是想了解一下zepto的原理，以上这些内容基本够用了，至少你在公司拿它做个一小时的技术分享是完全没有问题的。

不过，你如果感觉看到这里就收获颇丰，那么我建议你继续跟着我往下看，你会收获更多更实用价值的东西！





## 源码

将zepto-core的源码下载下来，然后看到最外层的结构是这样的

首先`window.Zepto`和`window.$`都赋值了`Zepto`这个变量，`Zepto`是个自执行的匿名函数，看源代码的最后几行，匿名函数返回了`$`变量

```javascript
  return $
})()

// If `$` is not yet defined, point it to `Zepto`
window.Zepto = Zepto
window.$ === undefined && (window.$ = Zepto)
```

而代码中有如下几行，证明`Zepto`最终是个函数。

```javascript
  $ = function(selector, context){
    return zepto.init(selector, context)
  }
```

可以来测试一下，在运行zepto的页面中来验证

```javascript
console.log( typeof window.$ ); // 'function'
```

总结一下，简单写来，这个结构可以简单模拟成这样：

```javascript
var Zepto = (function(){
    var $

    // ...省略N行代码...

    $ = function(selector, context){
        return zepto.init(selector, context)
    }

    // ...省略N行代码...

    return $
})()

window.Zepto = Zepto
window.$ === undefined && (window.$ = Zepto)
```

而且，在这里我们还可以看到，平常我们`$('p')`使用zepto的时候，最终顺藤摸瓜会执行到`$ = function(selector, context){`这个函数中（其中的内容可不深究），而`p`这个选择器也会传递给`selector`参数。这是我们下一节要讲述的内容。









# zepto.init 函数

## 回顾

上一节，我们了解了zepto代码的最笼统的一个结构，而且模拟了一下代码。其实当时还漏了一点，就是代码里面有一个`zepto`变量不知道哪里定义的。

```javascript
var Zepto = (function(){
    var $,
        zepto = {}

    // ...省略N行代码...

    zepto.init = function(selector, context) {
        // 函数内容
    }


    $ = function(selector, context){
        return zepto.init(selector, context)
    }

    // ...省略N行代码...

    return $
})()

window.Zepto = Zepto
window.$ === undefined && (window.$ = Zepto)
```

即，我们在创建一个zepto对象例如执行`$('p')`时，会进入`zepto.init`这个函数，并将参数也响应传递。接下来就进入`zepto.init`看看这个函数。

## `zepto.init` 函数

`zepto.init`函数大约有几十行代码，把中间的那些`if...else...`操作去掉，剩下的就是：

```javascript
zepto.init = function(selector, context) {
    var dom

    // ...此处省略N行...

    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector)
  }
```

中间省略的代码，都是根据不同条件下对`dom`变量进行赋值。`dom`从名字也可以猜测出来，它将会赋值一个或多个DOM节点。最终，它将通过`selector`一起传递给`zepto.Z`函数并返回值。

至于`zepto.Z`是个什么鬼暂且先不管，先看看中间省略的代码是什么。

- **无参数，即$()**

```javascript
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()
```

上面代码，如果没有参数，将返回一个空的zepto集合，还是交给`zepto.Z`来处理，先不管。

- **selector参数是字符串，例如$('p') $('') $('#content')**

```javascript
    else if (typeof selector == 'string') {
      selector = selector.trim()
      // If it's a html fragment, create nodes from it
      // Note: In both Chrome 21 and Firefox 15, DOM error 12
      // is thrown if the fragment doesn't begin with <
      if (selector[0] == '<' && fragmentRE.test(selector))
        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // If it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
```

上面代码，如果`selector`是字符串，接下来会有三种情况。

情况1，参数为``这种形式，即是一个html标签的，那么`dom`变量会被赋值为用这个标签创建的DOM对象，就像`dom = document.createElement('div')`差不多。其中涉及到了`fragmentRE`和`zepto.fragment`两个我们尚未了解的东东，此处不要深究，知道这段代码的意思即可。

注意，通过测试发现，这里给`dom`赋值的其实不是一个dom节点对象，而是被封装称了数组。

```javascript
      // If it's a html fragment, create nodes from it
      // Note: In both Chrome 21 and Firefox 15, DOM error 12
      // is thrown if the fragment doesn't begin with <
      if (selector[0] == '<' && fragmentRE.test(selector))
        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
```

情况2，如果第二个参数有值，则先根据第二个参数生成zepto对象，然后再调用`.find`来获取，例如`$('.item', '#content')`这种用法。`find`方法是zepto对象的一个函数，API中用法的介绍。

```javascript
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
```

情况3，以上两种情况都不是，则调用`zepto.qsa`来获取数据，后来聊这个方法的具体实现。`qsa`即`querySelectAll`的缩写，看名字能大体明白了吧？

```javascript
      // If it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
```

- **selector参数是函数，例如$(function(){...})**

```javascript
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector)
```

这种用法也比较常见，意思是待dom加载完毕再执行函数。这个`ready`函数的具体实现后面会讲到，这里先知道意思即可。

- **selector本身就是个zepto对象**

这种用法比较少，但是也不能避免，例如

```javascript
var a = $('p');
$(a);  // 这里传入的 a 本身就是个 zepto 对象了。
```

源码中使用`zepto.isZ`来判断，如果是的话，直接就返回自身。`zepto.isZ`的实现很简单，看源码即可。

```javascript
    // If a Zepto collection is given, just return it
    else if (zepto.isZ(selector)) return selector
```

- **其他情况**

当以上情况都不符合的时候，即`selector`参数既不是空、也不是字符串、也不是函数的时候。

```javascript
    else {
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
      // Wrap DOM nodes.
      else if (isObject(selector))
        dom = [selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
```

情况1，`selector`参数是数组，则通过一个`compact`处理一下赋值给`dom`。

```javascript
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
```

情况2，`selector`参数是DOM节点，则将它作为数组赋值给`dom`。

```javascript
      // Wrap DOM nodes.
      else if (isObject(selector))
        dom = [selector], selector = null
```

剩余情况，其实在`selector`是字符串的时候就已经考虑到了，因此感觉这里多余了。不过也可能是我考虑不周到，有疏漏的地方，如果谁发现了还望不吝赐教。

```javascript
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
```

**这里请注意，虽然有些处理函数这一节没有详细看代码实现，但是最终，赋值给dom的形式是一个数组。就像这段代码**

```javascript
      // Wrap DOM nodes.
      else if (isObject(selector))
        dom = [selector], selector = null
```

可以针对不同情况的`selector`，跟踪代码看一下。

## 总结

`zepto.init`函数算是zepto源码中比较复杂的一个函数，一开篇就遇到了个硬骨头。不过我们这里暂且先把那些分叉放在一边，先把大路疏通，然后在慢慢的去一个一个攻破那些分叉。

接下来我们再把`init`函数的结构梳理一下。

```javascript
zepto.init = function(selector, context) {
    var dom

    // 分情况对dom赋值：
    // 1. selector 为空
    // 2. selector 是字符串，其中又分好几种情况
    // 3. selector 是函数
    // 4. 其他情况，例如 selector 是数组、对象等

    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector)
}
```







# zepto.Z 函数

只要还能往前走，就先走着，那些岔道回头再说。只要思路捋顺了，那些零碎的问题，都不是问题。

## `zepto.Z` 函数

上一节了解到`zepto.init`函数中，最终又将数据传递给了`zepto.Z`函数。这个函数其实非常简单，如果你看不懂，可能是忘记之前讲过的原型链的知识了。

```javascript
  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. Note that `__proto__` is not supported on Internet
  // Explorer. This method can be overriden in plugins.
  zepto.Z = function(dom, selector) {
    dom = dom || []
    dom.__proto__ = $.fn
    dom.selector = selector || ''
    return dom
  }
```

以上代码中，`dom`是一个数组，并且把它的隐式原型赋值`$.fn`，而这里的`$.fn`其实就是一个普通的js对象（马上要说），跟我们之前讲述js原型链的时候一模一样。

------

**PS：后来发现，最新的zepto.Z实现上目前不一样，到最后再给大家聊聊这事儿。不过这丝毫不影响其他代码的讲解，请放心**

## `$.fn`是个什么鬼？

我们在之前的章节说过，`$`是一个函数，即

```javascript
  $ = function(selector, context){
    return zepto.init(selector, context)
  }
```

而函数也像对象一样，可以随便定义属性赋值的。之前我们说过，每个函数都会有一个内置的`prototype`属性，这是内置的，我们完全可以自定义一个属性，这个完全可以的。

```
$.fn = {
    a: 100
};
```

而zepto源码中，`$.fn`是这样赋值的，可以去源码中挨个看看其中的属性。

![img](http://box.kancloud.cn/2016-07-03_5778a76cc9f98.png)

我们之前模拟过一个zepto设计的代码，还记得吧。我们代码分析到这里，你可以发现，zepto的源码实现，跟我们之前模拟的一模一样。

*当然，之前的模拟是我故意那么做的，目的是为了将大家更容易的带入进来*





# 回顾

源码分析到这里，我们用一个简单的代码结构对之前的工作做一个总结。并且根据这个结构，把初始化一个zepto对象的过程在捋一捋。

![img](http://box.kancloud.cn/2016-07-04_577a764d9fab9.png)

```javascript
var Zepto = (function(){
    var $,
        zepto = {}

    // ...省略N行代码...

    zepto.Z = function(dom, selector) {
      dom = dom || []
      dom.__proto__ = $.fn
      dom.selector = selector || ''
      return dom
    }

    zepto.init = function(selector, context) {
        var dom

        // 针对参数情况，分别对dom赋值

        // 最终调用 zepto.Z 返回的数据
        return zepto.Z(dom, selector)
    }

    $ = function(selector, context){
        return zepto.init(selector, context)
    }

    $.fn = {
        // 里面有若干个工具函数
    }

    // ...省略N行代码...

    return $
})()

window.Zepto = Zepto
window.$ === undefined && (window.$ = Zepto)



```







# 最新的zepto.Z函数

## 新旧对比

在准备课程的这个时间 [https://github.com/madrobby/zepto/blob/master/src/zepto.js#files](https://github.com/madrobby/zepto/blob/master/src/zepto.js#files) 其中的代码中，`zepto.Z`是这样实现的：

```javascript
  function Z(dom, selector) {
    var i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++) this[i] = dom[i]
    this.length = len
    this.selector = selector || ''
  }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. This method can be overridden in plugins.
  zepto.Z = function(dom, selector) {
    return new Z(dom, selector)
  }

  $.fn = {
    // ...很多属性...
  }

  zepto.Z.prototype = Z.prototype = $.fn
```

再把之前的拿出来对比一下

```javascript
  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. Note that `__proto__` is not supported on Internet
  // Explorer. This method can be overriden in plugins.
  zepto.Z = function(dom, selector) {
    dom = dom || []
    dom.__proto__ = $.fn
    dom.selector = selector || ''
    return dom
  }

  $.fn = {
    // ...很多属性...
  }
```

## 两者的异同

第二种实现方式我们已经讲完了，最终它返回的一个数组，并且强制将`__proto__`修改为`$.fn`这个对象。这个修改发生在对象上，修改的隐式原型。

![img](http://box.kancloud.cn/2016-07-04_577a764d9fab9.png)

而第一种实现方式，是直接将构造函数的原型修改了，即 `Z.prototype = $.fn`，经过这样一改，构造函数再`new`出来的对象的隐式原型`__proto__`自然就指向了`$.fn`。

![img](http://box.kancloud.cn/2016-07-04_577a764dc04f6.png)

另外，第一种方式返回的是一个`对象数组`，而第二种返回的是一个数组。何谓对象数组？——即可以模拟进行数组操作的对象。

```javascript
var objArray = {
    0: 'abc',
    1: 'bcd',
    2: 'cde',
    length: 3
};

console.log( objArray[1] )
console.log( objArray.length )
```

那为何不用数组，而用对象数组？——对象本质上更加灵活、直观，例如

```javascript
objArray.selector = '';
```









# 附：zepto-core-1.1.6 源码注释

## 是否有必要讲解整个源码？

我个人觉得源码还得靠自己来看，但是自己直接看源码会有点晕头转向，因此本教程分析了整个代码的设计思想，这样再读起来就方便了。

不过如果大部分同学觉得有必要把源码再分析一遍，我可能会准备这样一份教程给大家分享。

## 源码注视

以下是我读完了并写了注释了zepto core 模块的源码，如果您想继续阅读其他源码，可参阅。

```javascript
/* Zepto v1.1.6 - zepto event ajax form ie - zeptojs.com/license */

var Zepto = (function() {
  var undefined, key, $, classList, 

      // 获取数组的slice 和 filter（返回数组中的满足回调函数中指定的条件的元素）方法
      emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,

      document = window.document,
      elementDisplay = {}, classCache = {},
      cssNumber = {
        'column-count': 1, 
        'columns': 1, 
        'font-weight': 1, 
        'line-height': 1,
        'opacity': 1, 
        'z-index': 1, 
        'zoom': 1
      },

      // 取出html代码中第一个html标签（或注释），如取出 <p>123</p><h1>345</h1> 中的 <p>
      fragmentRE = /^\s*<(\w+|!)[^>]*>/,
      // 匹配 <img /> <p></p>  不匹配 <img src=""/> <p>123</p>
      singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      // 单标签
      tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
      // body html
      rootNodeRE = /^(?:body|html)$/i,
      // 大写字母
      capitalRE = /([A-Z])/g,

      // special attributes that should be get/set via method calls
      // 应该通过方法调用来设置/获取的特殊属性
      methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

      adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],

      table = document.createElement('table'),
      tableRow = document.createElement('tr'),
      // 指定特殊元素的 容器
      containers = {
        'tr': document.createElement('tbody'),
        'tbody': table, 
        'thead': table, 
        'tfoot': table,
        'td': tableRow, 
        'th': tableRow,
        // 除了上面指定的，其他所有元素的容器都是 div
        '*': document.createElement('div')
      },

      // interactive ？？？
      readyRE = /complete|loaded|interactive/,

      // 匹配一个包括（字母、数组、下划线、-）的字符串
      simpleSelectorRE = /^[\w-]*$/,

      class2type = {},
      toString = class2type.toString,

      zepto = {},
      camelize, uniq,

      tempParent = document.createElement('div'),

      // 属性转换为 camalCase 格式。
      // $.fn.prop 方法用到了
      propMap = {
        'tabindex': 'tabIndex',
        'readonly': 'readOnly',
        'for': 'htmlFor',
        'class': 'className',
        'maxlength': 'maxLength',
        'cellspacing': 'cellSpacing',
        'cellpadding': 'cellPadding',
        'rowspan': 'rowSpan',
        'colspan': 'colSpan',
        'usemap': 'useMap',
        'frameborder': 'frameBorder',
        'contenteditable': 'contentEditable'
      },
      // 判断是否是arr的函数
      isArray = Array.isArray || function(object){ return object instanceof Array }

  // 上文定义 zepto = {}
  // 判断 element 是否符合 selector 的选择要求
  zepto.matches = function(element, selector) {
    // selector有值，element有值，element是普通DOM节点
    if (!selector || !element || element.nodeType !== 1) return false

    // elem.matchesSelector('.item') 
    // 判断当前的 elem 是否符合传入的 selector 的要求 
    var matchesSelector = element.webkitMatchesSelector || 
                          element.mozMatchesSelector ||
                          element.oMatchesSelector || 
                          element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)

    // 浏览器不支持 matchesSelector
    // fall back to performing a selector:
    var match, 
        parent = element.parentNode, 
        temp = !parent

    // 上文定义 tempParent = document.createElement('div'),
    // 如果没有parent，parent赋值为一个div，然后将当前元素加入到这个div中
    if (temp) {
      parent = tempParent;
      tempParent.appendChild(element);
      // (parent = tempParent).appendChild(element); 这种写法不易读
    }

    // 通过 qsa 获取匹配的元素，判断其中有没有 element
    match = ~zepto.qsa(parent, selector).indexOf(element)

    if (temp) {
      // 如果没有parent时，之前执行过  tempParent.appendChild(element);
      // 此时要移除子元素
      tempParent.removeChild(element);
    }
    // temp && tempParent.removeChild(element)  // 这种写法不易读

    // 返回最终的匹配结果，经过 qsa 判断的结果
    return match
  }

  function type(obj) {
    return obj == null ? 
           String(obj) :  // null undefined
           class2type[toString.call(obj)] || "object" 

    // 下文定义：
    // // Populate the class2type map
    // $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    //   class2type[ "[object " + name + "]" ] = name.toLowerCase()
    // })
  }

  function isFunction(value) { return type(value) == "function" }
  // window的特点：window.window === window
  function isWindow(obj)     { return obj != null && obj == obj.window }
  // document.nodeType === 9
  // elem.DOCUMENT_NODE 也等于 9 （这里直接判断是不是9也行？？？）
  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
  function isObject(obj)     { return type(obj) == "object" }
  // 判断是否是最基本的object：Object.getPrototypeOf(obj) == Object.prototype
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
  }
  // 数组或者对象数组
  function likeArray(obj) { return typeof obj.length == 'number' }

  // 筛选数组，踢出 null undefined 元素
  function compact(array) { return filter.call(array, function(item){ return item != null }) }

  // 下文定义：
  // $.fn = {
  //    concat: emptyArray.concat,
  // $.fn.concat.apply([], array) —— 无论 array 是不是数组，都将返回一个数组，
  // 例如 $.fn.concat.call([], 'abc') 返回的是 ['abc']
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }

  // camelize 已在上文定义
  // 用于 css 的 camalCase 转换，例如 background-color 转换为 backgroundColor
  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }

  // 将 lineHeight 转换为 line-height 格式
  function dasherize(str) {
    return str.replace(/::/g, '/')
              .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
              .replace(/([a-z\d])([A-Z])/g, '$1_$2')
              .replace(/_/g, '-')
              .toLowerCase()
  }

  // uniq变量已经在前面定义
  // 用来将 [1,1,2,2,3,3] 替换为 [1,2,3]
  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

  // 上文定义 classCache = {}
  function classRE(name) {
    return name in classCache ?
           classCache[name] : 
           (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))

    // classCache 存储的数据是这样的：
    // {
    //   abc: /(^|\s)abc(\s|$)/,  // 能匹配 'abc' 或 ' abc ' 或 ' abc' 或 'abc '
    //   xyz: /(^|\s)abc(\s|$)/,
    //   ...
    // }
  }

  // 传入一个 css 的 name 和 value，判断这个 value 是否需要增加 'px'
  function maybeAddPx(name, value) {
    // dasherize(name) 将 lineHeight 转换为 line-height 格式
    // !cssNumber[dasherize(name)] 判断转换出来的 css name 是否再这个数组之外
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? 
           // 如果 value 是数字，并且 name 不在 cssNumber 数组之内，就需要加 'px'，否则不需要
           // 例如 'width'、'font-size' 就需要加 'px'， 'font-weight' 就不需要加
           value + "px" : 
           value

    // 前文定义----------------------
    // cssNumber = {
    //   'column-count': 1, 
    //   'columns': 1, 
    //   'font-weight': 1, 
    //   'line-height': 1,
    //   'opacity': 1, 
    //   'z-index': 1, 
    //   'zoom': 1
    // },
    // function dasherize(str) {
    //   return str.replace(/::/g, '/')
    //             .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    //             .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    //             .replace(/_/g, '-')
    //             .toLowerCase()
    // }
  }

  // 获取一个元素的默认 display 样式值，可能的结果是：inline block inline-block table .... （none 转换为 block）
  // $.fn.show 方法中用到了
  function defaultDisplay(nodeName) {
    var element, display

    // 前文定义 elementDisplay = {}
    if (!elementDisplay[nodeName]) {

      // 如果 elementDisplay 对象中，没有存储 nodeName 的信息
      // 则新建一个 nodeName 元素，添加到 body 中
      element = document.createElement(nodeName)
      document.body.appendChild(element)
      // 获取它的默认的 display 样式信息。
      display = getComputedStyle(element, '').getPropertyValue("display")
      // 接着马上移除元素！！！
      element.parentNode.removeChild(element)
      // 'none' 换成 'block'，另外还可能是 'inline' 'inline-block' 'table' 等等...
      display == "none" && (display = "block")
      // 存储下来
      elementDisplay[nodeName] = display

      // 下文定义 
      // var nativeGetComputedStyle = getComputedStyle;
      // window.getComputedStyle = function(element){
      //   try {
      //     return nativeGetComputedStyle(element)
      //   } catch(e) {
      //     return null
      //   }
      // }
      // 解释：
      // 如果浏览器支持 getComputedStyle 则使用，如果不支持，就返回 null
      // getComputedStyle(elem, '伪类，如 :link') 返回一个 CSSStyleDeclaration 对象，里面存储了元素的样式信息，可以通过 getPropertyValue('name') 方法获取
    }

    // 最终返回 display 结果
    return elementDisplay[nodeName]
  }

  // 返回一个元素的子元素，数组形式
  function children(element) {

    // 有些浏览器支持 elem.children 获取子元素，有些不支持
    return 'children' in element ?

           // 上文定义 slice = [].slice
           // slice.call(likeArr) 可以将对象数组转换为真正的数组
           slice.call(element.children) :

           // 浏览器不支持 elem.children 只能通过 elem.childNodes 获取子元素
           // 只去 node.nodeType == 1 的子元素，通过 $.map 拼接成数组
           // $.map 下文定义的， $.map = function (elements, callback) {....}
           // $.map 作用：针对 elements（对象数组或数组），对每个元素都经过 callback 函数的过滤，并将过滤通过的元素，push到一个新数组中，返回新数组
           $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
  }


  // 上文定义 zepto = {}
  // 上文定义 zepto.matches = function(element, selector) { /* 判断elem是否符合selector的要求 */ }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overriden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function(html, name, properties) {
    /*
      参数：
      @html: 待处理的html字符串
      @name: 通过 name 可在 containers 中查找容器节点，如果不传入，取得的容器默认为 div
      @properties: 节点属性对象
    */

    var dom, nodes, container

    // 上文定义：singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,   // 匹配 <img /> <p></p>  不匹配 <img src=""/> <p>123</p>
    // 如果 html 是单标签，则直接用该标签创建元素
    // RegExp.$1 表示正则中的第一个括号匹配的内容，在此即 (\w+) 匹配的内容，
    // A special case optimization for a single tag
    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

    if (!dom) {
      // 说明 html 不是单标签，dom未被赋值

      // 上文定义 tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,   // 单标签
      // 将 <p/>或<p />，替换为 <p></p>，将<p abc/>替换为<p>abc</p>
      // <input/> （在 tagExpanderRE 中定义）的不替换
      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")

      // fragmentRE = /^\s*<(\w+|!)[^>]*>/,   // 取出html代码中第一个html标签（或注释），如取出 <p>123</p><h1>345</h1> 中的 <p>
      // 如果 name 未传入，则赋值为 html 的第一个标签
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1

      // 上文定义
      // // 指定特殊元素的 容器
      // containers = {
      //   'tr': document.createElement('tbody'),
      //   'tbody': table, 
      //   'thead': table, 
      //   'tfoot': table,
      //   'td': tableRow, 
      //   'th': tableRow,
      //   // 除了上面指定的，其他所有元素的容器都是 div
      //   '*': document.createElement('div')
      // },
      if (!(name in containers)) name = '*'

      container = containers[name]
      container.innerHTML = '' + html  // 转变为字符串的快捷方式

      // 遍历 container 的子元素（先转换为数组形式）
      // 返回的同时，将每个子元素移除。
      // $.each 返回的是一个数组，因为第一个参数就是数组 slice.call(container.childNodes)
      dom = $.each(slice.call(container.childNodes), function(){
        container.removeChild(this)
      })
    }

    // 赋值属性
    if (isPlainObject(properties)) {
      // 先将dom转换为 zepto 对象
      nodes = $(dom)

      $.each(properties, function(key, value) {
        // 上文定义：
        // // 应该通过方法调用来设置/获取的特殊属性
        // methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],
        if (methodAttributes.indexOf(key) > -1) nodes[key](value)  // 满足 methodAttributes 的，通过方法赋值
        else nodes.attr(key, value) // 否则，通过属性复制
      })
    }

    // 最终返回的dom可能有两种形式
    // 第一，如果 html 是单标签，则dom被复制为一个zepto对象 dom = $(document.createElement(RegExp.$1))
    // 第二，如果 html 不是单标签，则dom被复制为一个DOM节点的数组
    return dom
  }


  // 上文定义 zepto = {}
  // 上文定义 zepto.matches = function(element, selector) { /* 判断elem是否符合selector的要求 */ }
  // 上文定义 zepto.fragment = function(html, name, properties) { /* 通过html字符串获取文档碎片 */ }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. Note that `__proto__` is not supported on Internet
  // Explorer. This method can be overriden in plugins.
  zepto.Z = function(dom, selector) {
    dom = dom || []
    // 将 dom 隐式原型强制改为 $.fn
    // 下文 zepto.Z.prototype = $.fn   因此，dom.__proto__ = $.fn 即 dom.__proto__ = zepto.Z.prototype  可以不较真的认为 zepto.Z 就是一个构造函数（但感觉这么设计，有些蹩脚）
    dom.__proto__ = $.fn
    dom.selector = selector || ''
    return dom
  }

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overriden in plugins.
  zepto.isZ = function(object) {
    // 上文 dom.__proto__ = $.fn
    // 下文 zepto.Z.prototype = $.fn
    // 可知：dom.__proto__ === $.fn === zepto.Z.prototype

    // 因此，zepto对象都符合 object instanceof zepto.Z
    return object instanceof zepto.Z
  }

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overriden in plugins.
  zepto.init = function(selector, context) {
    var dom
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()

    // Optimize for string selectors
    else if (typeof selector == 'string') {
      // 字符串的情况，一般有两种：
      // 第一，一段 html 代码，旨在通过zepto生成dom对象
      // 第二，一段查询字符串，旨在通过zepto查找dom对象
      // 将查询结果存储到 dom 变量中

      selector = selector.trim()
      // If it's a html fragment, create nodes from it
      // Note: In both Chrome 21 and Firefox 15, DOM error 12
      // is thrown if the fragment doesn't begin with <

      // 上文定义：
      // // 取出html代码中第一个html标签（或注释），如取出 <p>123</p><h1>345</h1> 中的 <p>
      // fragmentRE = /^\s*<(\w+|!)[^>]*>/,
      if (selector[0] == '<' && fragmentRE.test(selector))

        // 第一，RegExp.$1取出来的就是第一个标签名称，即正则中 (\w+|!) 对应的内容
        // 第二，此时的 context 应该传入的是css属性对象（这里会产生歧义，老版的不会传入 context）
        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there

      // 如果 selector 不是html字符串标签，并且 context 有值，则从context中查找
      // find 应该是在 $.fn 中定义的，有待解读？？？
      else if (context !== undefined) return $(context).find(selector)
      // If it's a CSS selector, use it to select nodes.

      // 除了以上情况，就从整个 document 执行 qsa 的查找
      else dom = zepto.qsa(document, selector)
    }

    // If a function is given, call it when the DOM is ready
    // 如果是函数，则dom ready时执行，
    // ready方法应该在 $.fn 中定义，有待解毒
    else if (isFunction(selector)) return $(document).ready(selector)

    // If a Zepto collection is given, just return it
    // 传入的参数本身就已经是 zepto 对象，则直接返回
    else if (zepto.isZ(selector)) return selector
    else {

      // compact函数：踢出数组中 == null 的元素
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)

      // 如果传入的是object，直接强制塞进一个数组
      // Wrap DOM nodes.
      else if (isObject(selector)) dom = [selector], selector = null  // 及时清空 selector 不妨碍下面的判断


      // 从此往下，感觉和上文 selector 是字符串的情况下，重复了
      // ？？？？？？？？


      // fragmentRE.test 即判断字符串是否是 html 标签开头（即是否是html fragement）
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        //此时，context 也是属性集合，不是容器！！！
        //（这里会产生歧义，老版的不会传入 context）
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null // 及时清空 selector 不妨碍下面的判断
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }

    // 最终，还是通过 zepto.Z 创建了对象
    // 这里的 dom，其实就是一个数组
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector)
  }

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function(selector, context){
    return zepto.init(selector, context)
  }
  // $ 最终被这个匿名函数所返回，并复制给了全局的 Zepto 变量
  // 全局的 zepto 变量暴露给了 window，并且可能有一个别名—— $
  // 此 $ 非彼 $ 
  // 对于初学者来说，这里肯定非常绕（还不如把这里的 $ 改改名字）


  function extend(target, source, deep) {
    // key 在上文已经定义，否则就污染全局变量了
    for (key in source)

      // 深度递归，首先必须 deep 参数为 true
      // 其次，source[key] 必须是数组或者对象，才有必要深度递归（否则没必要）
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {

        // source[key] 是对象，而 target[key] 不是对象
        // 则 target[key] = {} 初始化一下，否则递归会出错的
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}

        // source[key] 是数组，而 target[key] 不是数组
        // 则 target[key] = [] 初始化一下，否则递归会出错的
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []

        // 执行递归
        extend(target[key], source[key], deep)
      }

      // 不满足以上条件，说明 source[key] 是一般的值类型，直接赋值给 target 就是了
      else if (source[key] !== undefined) target[key] = source[key]
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function(target){
    // 一般传入的参数会是：
    // (targetObj, srcObj1, srcObj2, srcObj1...)
    // (true, targetObj, srcObj1, srcObj2, srcObj1...)

    // arguments 是对象数组，slice.call 会返回真正的数组（此处返回从第二项开始）
    var deep, args = slice.call(arguments, 1)

    // 第一个参数是boolean，这里会把第二个参数当做 target，其他的作为 source
    if (typeof target == 'boolean') {
      deep = target
      target = args.shift()
    }

    // 将所有的 source 添加到 target 中
    args.forEach(function(arg){ extend(target, arg, deep) })
    return target

    // 感觉这样设计是比较好，很好的将业务和底层进行了分离（虽然比较简单）：
    // 核心方法再 function extend(...){...} 中定义，
    // 而 $.extend 方法中做一些外围的判断和处理，最终调用 extend 函数去执行
  }

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overriden in plugins.
  zepto.qsa = function(element, selector){
    /*
      @element: 容器
      @selector: 选择器
    */

    var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',

        // ID或class形式：返回 selector.slice(1) 即ID或者class的值
        // 否则：返回 selector，如通过 tagName 查询
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked

        // 是否是一个简单的字符串（可能是一个复杂的选择器，如 'div#div1 .item[link] .red'）
        isSimple = simpleSelectorRE.test(nameOnly)

    // 上文定义：
    // // 匹配一个包括（字母、数组、下划线、-）的字符串
    // simpleSelectorRE = /^[\w-]*$/,



    // 以下代码的基本思路是：
    // 1. 优先通过 ID 获取元素；
    // 2. 然后试图通过 className 和 tagName 获取元素
    // 3. 最后通过 querySelectorAll 来获取
    return (isDocument(element) && isSimple && maybeID) ?
           // 这是最简单的形式：容器是document、选择器是一个id
           // 因为 getElementById 只能在 document 上用，所以这里单独拿出来
           ( (found = element.getElementById(nameOnly)) ? 
              [found] : 
              [] 
           ) :

           (element.nodeType !== 1 && element.nodeType !== 9) ? 
              // 容器不是一般元素，也不是document，直接返回 []
              [] :

              // 将获取的所有元素集合，都转换为数组
              slice.call(
                isSimple && !maybeID 

                // isSimple情况下，nameOnly 只可能是 className 或者 tagName
                // getElementsByClassName 和 getElementsByTagName 可以在 elem 上用，而且比 querySelectorAll 速度快
                // 所以，只要elem容器有值，尽量单独拿出来处理
                ? 
                  maybeClass ? 
                  element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
                  element.getElementsByTagName(selector)  // Or a tag

                // 最后其他情况，只能通过 querySelectorAll 来处理
                : 
                element.querySelectorAll(selector) // Or it's not simple, and we need to query all
              )
  }

  // 根据 selector 筛选 nodes 
  // 并将 nodes 封装为 zepto 对象
  // $.fn.filter 下文定义
  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector)
  }

  // 判断 parent 是否包含 node
  $.contains = document.documentElement.contains ?
    // 浏览器支持 contains 方法
    function(parent, node) {
      return parent !== node && parent.contains(node)
    } :
    // 不支持 contains 方法
    function(parent, node) {
      while (node && (node = node.parentNode))
        if (node === parent) return true
      return false
    }

  // 如果 arg 是函数，则改变函数的执行环境和参数
  // 如果不是，直接返回 arg
  // $.fn.html 方法就用到了
  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg
  }

  // 设置属性
  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
  }

  // 设置或获取 node 的 className
  // 考虑 svg ？？？？
  // access className property while respecting SVGAnimatedString
  function className(node, value){
    var klass = node.className || '',
        svg   = klass && klass.baseVal !== undefined

    // 获取
    if (value === undefined) return svg ? klass.baseVal : klass
    // 设置
    svg ? (klass.baseVal = value) : (node.className = value)
  }

  // 将字符串变成响应的对象或者值，例如源代码的注释：
  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    try {
      return value ?

        // value『有值』的情况：
        value == "true" ||  // 如果 value == 'true'，那么这个表达式本身就返回 true ，导致整个函数返回true

          // value !== 'true' 的情况：
          ( 
            value == "false" ? false : // "null"  => null
            value == "null" ? null : // "null"  => null
            +value + "" == value ? +value :  // 数字："42" => 42  "42.5" => 42.5  （ 但是 '08' 却不符合这个条件 ）
            /^[\[\{]/.test(value) ? $.parseJSON(value) : // '[...]' 或者 '{...}'
            value // 其他
          )

        // value『无值』的情况： undefined / '' / flase / 0 / null
        : value 
    } catch(e) {
      return value
    }
  }

  // 将上文定义的函数，暴露给 $ 对象（其实 $ 是一个 function）
  $.type = type
  $.isFunction = isFunction
  $.isWindow = isWindow
  $.isArray = isArray
  $.isPlainObject = isPlainObject

  $.isEmptyObject = function(obj) {
    var name
    for (name in obj) return false
    return true
  }

  $.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
  }

  $.camelCase = camelize
  $.trim = function(str) {
    return str == null ? "" : String.prototype.trim.call(str)
  }

  // plugin compatibility
  $.uuid = 0
  $.support = { }
  $.expr = { }

  // 重新组织 elements 对象（数组、对象或者对象数组），针对每一个元素，都用 callback 进行检验
  // 检验通过后，将元素push进一个新数组，并返回
  $.map = function(elements, callback){
    var value, values = [], i, key

    // 数组，或者对象数组
    if (likeArray(elements))
      for (i = 0; i < elements.length; i++) {
        // 遍历，经过 callback 验证，push到结果中
        value = callback(elements[i], i)
        if (value != null) values.push(value)
      }

    // 对象
    else
      for (key in elements) {
        // 遍历，经过 callback 验证，push到结果中
        value = callback(elements[key], key)
        if (value != null) values.push(value)
      }

    // 返回数组
    // flatten 函数上文定义的，作用：无论 values 是否是数组，都将返回一个正确的数组。例如，传入 'abc' ，返回 ['abc']
    return flatten(values)
  }

  // 遍历 elements 所有元素（数组、对象数组、对象），执行 callback 方法，最终还是返回 elements
  // 注意1：callback.call(elements[i], i, elements[i]) 函数执行的环境和参数
  // 注意2：=== false) return elements 一旦有函数返回 false，即跳出循环，类似 break
  // 注意3：无论哪种情况，最终返回的还是 elements
  $.each = function(elements, callback){
    var i, key
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        if (callback.call(elements[i], i, elements[i]) === false) return elements
    } else {
      for (key in elements)
        if (callback.call(elements[key], key, elements[key]) === false) return elements
    }

    return elements
  }

  // 上文定义：filter = emptyArray.filter
  // 筛选数组
  $.grep = function(elements, callback){
    return filter.call(elements, callback)
  }

  if (window.JSON) $.parseJSON = JSON.parse

  // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase()

    /*
      上文将 class2type 赋值为 {}
      最终将 class2type 赋值为：
      {
        '[object boolean]': 'boolean',
        '[object number]': 'number',
        '[object string]': 'string',
        ...
      }

      存储这个数据是为了方便的获取一些对象的类型，
      例如 Object.prototype.toString.call([]) 返回的是 '[Object Array]'
      那么即可根据这个获取 [] 的类型是 'array'
    */

  })

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {

    // 为何要这么多数组的方法？
    // 因为一个 zepto 对象，本身就是一个数组

    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,  // 方法何用？？？？
    push: emptyArray.push,
    sort: emptyArray.sort,
    indexOf: emptyArray.indexOf,
    concat: emptyArray.concat,

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function(fn){
      // $.map 上文定义的， $.map = function (elements, callback) {....}
      // $.map 作用：针对 elements（对象、对象数组或数组），对每个元素都经过 callback 函数的过滤，并将过滤通过的元素，push到一个新数组中，返回新数组

      // 最后，用 $ 封装返回
      return $(
        // $.map 返回的是一个数组
        $.map(this, 
          // 针对每一个元素，都执行传入的函数，如果函数返回的 !=null 就将插入到新返回的数组
          function(el, i){ return fn.call(el, i, el) }
        )
      )

      /*
        $('div').map(function(key, value){
          return value.id;
          // 或者 return this.id;
        })
        这个结果就是 $(['div1', 'div2' ...])
      */
    },
    slice: function(){
      // 直接数组的slice方法，并将结果用 $ 封装返回
      return $(slice.apply(this, arguments))
    },

    // 在 zepto.init 函数中，当传入的函数是函数时，就用到了 ready 
    // else if (isFunction(selector)) return $(document).ready(selector)
    ready: function(callback){
      // need to check if document.body exists for IE as that browser reports
      // document ready when it hasn't yet created the body element

      // 下文定义：readyRE = /complete|loaded|interactive/,
      if (readyRE.test(document.readyState) && document.body) callback($)
      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)

      // 返回当前对象
      return this
    },
    get: function(idx){
      return idx === undefined ? 
             slice.call(this) : // 未传参数，直接返回一整个数组
             // 有参数，则试图返回单个元素（大于0，小于0 两种情况）
             this[
                idx >= 0 ? 
                idx : 
                idx + this.length
            ]
    },

    // 将zepto集合变为纯数组
    toArray: function(){ return this.get() },

    size: function(){
      return this.length
    },

    // 将元素从这个DOM树中移除
    remove: function(){
      return this.each(function(){
        if (this.parentNode != null)
          this.parentNode.removeChild(this)
      })
    },

    each: function(callback){
      // [].every ES5中Array的新特性。循环数组每个元素，返回是否符合callback函数的要求

      // every 函数返回的是 false 或者 true（不过这里返回什么无所谓，执行就可以了）
      emptyArray.every.call(this, function(el, idx){
        return callback.call(el, idx, el) !== false
      })

      // 最后返回本身对象
      return this
    },
    filter: function(selector){
      // not函数下文定义
      // 如果给not传入的参数是函数，则返回不符合这个函数规则的元素的数组（用 $ 封装）
      if (isFunction(selector)) return this.not(this.not(selector))

      // 上文定义：zepto.matches 判断elements是否符合 selector 的要求
      // zepto.matches = function(element, selector) {...}
      return $(filter.call(this, function(element){
        // 利用 [].filter 方法做筛选，利用 zepto.matches 做判断
        return zepto.matches(element, selector)
      }))
    },

    // $('div') 可能只有三个 div 节点，那么 $('div').add('p') 再三个 div 节点的基础上，增加三个 p 节点
    add: function(selector,context){
      // uniq函数——数组去重，例如：用来将 [1,1,2,2,3,3] 替换为 [1,2,3]
      return $(uniq(this.concat($(selector,context))))
    },
    is: function(selector){
      // 注意：这里只对 this[0] 第一个元素做判断了，其他的元素不管了
      return this.length > 0 && zepto.matches(this[0], selector)
    },

    not: function(selector){
      var nodes=[] // 存储最后返回的结果

      // 如果参数是函数
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function(idx){
          // 遍历对象的所有元素，对每个元素都执行传入的函数
          // 当函数返回 false 时（即不符合函数的规则），则将当前元素push到结果中，等待返回
          if (!selector.call(this,idx)) nodes.push(this)
        })

      // 如果参数不是函数
      else {
        // 为 excludes 赋值
        var excludes = 
          // 如果 selector 是字符串（css选择器），则用filter过滤，将结果存储到 excludes 中
          typeof selector == 'string' ? this.filter(selector) :
          // 如果 selector 不是字符串
          // 如果是数组或者对象数组（并且 selector.item 是函数？？？），则生成数组，赋值给 excludes
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) 
          // 否则直接生成 zepto 对象，赋值给 excludes
            : $(selector)

        // 至此，excludes 中就存储了通过 selector 查找出来的元素

        // [].forEach 是ES5的新特性
        this.forEach(function(el){
          // 取出 excludes 中不包含的元素，push到结果中
          if (excludes.indexOf(el) < 0) nodes.push(el)
        })
      }

      // 返回最后的结果，用 $ 封装
      return $(nodes)
    },

    has: function(selector){
      // 经过 filter 函数处理，返回的是一个处理后的值
      return this.filter(function(){
        return isObject(selector) ?
          // 如果 seletor 是 object（可能是elem节点），则用 $.contains 判断
          $.contains(this, selector) :
          // 否则（selector是css选择字符串）则返回find后的size（如果 size === 0 即相当于返回 false）
          $(this).find(selector).size()

          // $.fn.find 在下文定义
      })
    },
    eq: function(idx){
      // 取出指定index的元素
      // 可支持 -1、0、1、2 ……
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    first: function(){
      var el = this[0]
      // 不是 object 则直接返回
      // 是 object 类型，则用 $ 封装 （因为时刻都要支持链式操作！！！）
      return el && !isObject(el) ? el : $(el)
    },
    last: function(){
      var el = this[this.length - 1]
      return el && !isObject(el) ? el : $(el)
    },
    find: function(selector){
      // result 存储返回结果
      var result, $this = this

      // 如果没有参数，就返回一个空的 zepto 对象
      if (!selector) result = $()

      // 如果selector是对象
      else if (typeof selector == 'object')
        result = $(selector).filter(function(){
          var node = this
          return emptyArray.some.call($this, function(parent){
            return $.contains(parent, node)
          })
        })

      // 如果 selector 不是对象（即是css选择器）：

      // 如果只有一个元素，则使用 qsa 判断，结果经过 $ 封装后赋值给 result
      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))

      // 如果有多个元素，则使用 map 遍历所有元素，使用 qsa 针对每个元素判断，符合条件即返回（map将返回包含符合条件的元素的新数组，并 $ 封装，支持链式操作！！）
      else result = this.map(function(){ return zepto.qsa(this, selector) })

      // 返回最终结果
      return result
    },

    // 从元素本身开始，逐级向上级元素匹配，并返回最先匹配selector的元素
    closest: function(selector, context){
      var node = this[0], collection = false

      // 如果 selector 是对象，则用 $ 封装后，赋值给 collection
      if (typeof selector == 'object') collection = $(selector)

      while (
        // while循环的判断条件：
        // 第一，node有值（node一开始被赋值为对象的第一个元素）
        // 第二，collection有值（传入的selector是对象）则collection包含node；collection无值（传入的selector是字符串，css选择），则node满足selector条件
        // 满足第一个条件，不满足第二条件，则循环继续（node试图赋值为node.parentNode）；否则，循环跳出（说明已经找到了符合条件的父节点）
        node && !(
                    collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)
                )
      )
        // node赋值成 node.parentNode
        // 前提条件是：node != context && node 不是 document，如果是这两个条件之一，那就不继续赋值
        node = node !== context && !isDocument(node) && node.parentNode

      // 返回最终结果
      return $(node)
    },

    // 获取对象集合每个元素所有的祖先元素。 $('h1').parents() => [<div#container>, <body>, <html>]
    parents: function(selector){
      var ancestors = [], nodes = this
      while (nodes.length > 0)
        // 可能需要执行多次 while 循环
        // 每次执行 $.map 函数都会对 nodes 重新赋值，然后再判断是否需要继续循环
        // 因为要获取每个元素的所有祖先元素，所以要多次循环
        nodes = $.map(nodes, function(node){
          // 使用 $.map（返回符合条件的元素的新数组，并用 $ 封装）遍历所有元素
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            // 将符合条件的元素push到结果中
            // 条件：不能是 document，结果中元素不能重复。否则不执行push
            ancestors.push(node)

            // 返回的 node ，将拼接出新数组，重新复制给 nodes，然后试图继续执行 while 循环
            return node
          }
        })

      // 如果css选择器参数给出，过滤出符合条件的元素
      return filtered(ancestors, selector)
    },

    // 获取对象集合中每个元素的直接父元素。如果css选择器参数给出。过滤出符合条件的元素。
    parent: function(selector){
      // pluck 函数在下文定义
      // parent 函数，只获取第一级父节点即可
      return filtered(uniq(this.pluck('parentNode')), selector)
    },

    // 获得每个匹配元素集合元素的直接子元素，可通过 selector 过滤
    children: function(selector){
      return filtered(
        this.map(function(){ return children(this) }),  selector
      )
    },

    // 获得每个匹配元素集合元素的子元素，包括文字和注释节点
    contents: function() {
      return this.map(function() { return slice.call(this.childNodes) })
    },

    // 获取对象集合中所有元素的兄弟节点，可通过 selector 过滤
    siblings: function(selector){
      return filtered(this.map(function(i, el){
        // 获取兄弟节点
        return filter.call(children(el.parentNode), function(child){ return child!==el })
      }), selector)
    },
    empty: function(){
      return this.each(function(){ this.innerHTML = '' })
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function(property){
      // 获取自定义属性，返回值，拼接数组
      return $.map(this, function(el){ return el[property] })
    },
    show: function(){
      // 返回当前对象，保证可链式操作
      return this.each(function(){

        // 第一步，针对内联样式，将 none 改为空字符串，如 <p id="p2" style="display:none;">p2</p>
        this.style.display == "none" && (this.style.display = '')

        // 第二步，针对css样式，如果是 none 则修改为默认的显示样式
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)

        // show 方法是为了显示对象，而对象隐藏的方式有两种：内联样式 或 css样式
        // this.style.display 只能获取内联样式的值（获取属性值）
        // getComputedStyle(this, '').getPropertyValue("display") 可以获取内联、css样式的值（获取 renderTree 的值）
        // 因此，这两步都要做判断，
      })
    },
    replaceWith: function(newContent){
      // 先在前面插入，然后将当前对象移除
      return this.before(newContent).remove()
    },
    wrap: function(structure){
      // 是否是函数
      var func = isFunction(structure)

      if (this[0] && !func)
        var dom   = $(structure).get(0),
            // 何时用 clone ？
            // 第一，dom.parentNode 说明 dom 在文档结构中，不 clone 就会被移动
            // 第二，this.length > 1 说明当前对象有多个元素，每个元素都要添加，所有要clone
            clone = dom.parentNode || this.length > 1

      return this.each(function(index){
        // 借用 wrapAll 方法来做包装
        $(this).wrapAll(
          func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
        )
      })
    },
    // 在所有匹配元素外面包一个单独的结构
    wrapAll: function(structure){
      if (this[0]) {
        // 先将 structure 插入到文档结构
        $(this[0]).before(structure = $(structure))

        var children
        // drill down to the inmost element
        // 通过循环，将 structure 重新赋值为当前 structure 的最深处的一个子元素 
        while ((children = structure.children()).length) structure = children.first()

        // 将所有子元素都包裹进 structure
        $(structure).append(this)
      }

      // 返回当前对象
      return this
    },
    wrapInner: function(structure){
      // 是否是函数
      var func = isFunction(structure)

      // 返回对象自身，保证链式操作
      return this.each(function(index){
        var self = $(this), contents = self.contents(),
            // 是函数，即获取函数执行的返回结果；否则直接用 structure 参数
            dom  = func ? structure.call(this, index) : structure

        // 如果当前元素有内容，则通过内容 wrapAll。无内容，则直接用自身的 append 增加
        contents.length ? contents.wrapAll(dom) : self.append(dom)
      })
    },
    unwrap: function(){
      // 通过 this.parent() 获取每个元素的父节点（集合）
      // 遍历这个父节点的集合
      this.parent().each(function(){
        // 将当前父节点替换为它的子节点
        $(this).replaceWith($(this).children())
      })

      // 返回对象自身，保证链式操作
      return this
    },
    clone: function(){
      // 通过 this.map 循环对象，
      // 针对每个元素都返回它的clone         这个 this 和前面的 this 不一样
      // 返回新数组（用 $ 封装）
      return this.map(function(){ return this.cloneNode(true) })
    },
    hide: function(){
      return this.css("display", "none")
    },
    // 切换显示和隐藏
    toggle: function(setting){
      /*
        @setting
        true : 强制切换为 show
        false : 强制切换为 hide
      */
      return this.each(function(){
        var el = $(this)

        // 条件判断：
        // 如果 setting === undefined 则看 el.css("display") == "none"
        // 如果 setting !== undefined 则看 !!setting
        ;(setting === undefined ? el.css("display") == "none" : setting) ? 
        el.show() : // 如果 true 则显示
        el.hide() // 如果 false 则隐藏
      })
    },
    // 借助 previousElementSibling 属性
    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
    // 借助 nextElementSibling 属性
    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
    html: function(html){
      return 

        // 情况1：有参数，赋值，并返回自身
        0 in arguments ? 
        this.each(function(idx){
          var originHtml = this.innerHTML
          // 传入的 html 参数允许是一个字符串，也允许是一个函数
          // 通过 funcArg 函数：
          //  1.如果 html 是字符串，则返回html
          //  2.如果 html 是函数，则执行执行函数（传入 idx、originHtml），返回函数执行结果
          $(this).empty().append( funcArg(this, html, idx, originHtml) )
        }) :

        /*
          插播：
          function funcArg(context, arg, idx, payload) {
            return isFunction(arg) ? arg.call(context, idx, payload) : arg
          }
        */

        // 情况2：无参数，取值
        (0 in this ? 
          this[0].innerHTML : // 直接取第一个元素的 innerHTML
          null
        )
    },
    text: function(text){
      return 

        // 情况1：有参数，赋值，并返回自身
        0 in arguments ?
        this.each(function(idx){
          // funcArg的应用，和html方法中一样
          var newText = funcArg(this, text, idx, this.textContent)
          this.textContent = newText == null ? '' : ''+newText
        }) :

        // 情况2：无参数，取值
        (0 in this ? this[0].textContent : null)  // 直接借用 textContent 属性
    },
    attr: function(name, value){
      var result

      return 

        // 情况1：无第二个参数，读取值（读取值只能读取第一个元素的值）
        (typeof name == 'string' && !(1 in arguments)) ?
        (!this.length || this[0].nodeType !== 1 ? undefined :
          /*
            注释：
            this[0]是一个DOM节点，有『属性』也有『特性』
              result = this[0].getAttribute(name) 试图获取 DOM节点属性
              name in this[0] 判断是不是js对象的属性
            然后，该返回哪一个就返回哪一个
          */
          (!(result = this[0].getAttribute(name)) && name in this[0]) ? 
          this[0][name] : 
          result
        ) :

        // 情况2：有第二个参数，设置值（针对每个元素设置值）
        this.each(function(idx){
          if (this.nodeType !== 1) return

          // 传入的参数可能是一个对象集合
          // 此时，是不是应该放在『情况1』当中？？？此时，value根本没有用啊？？？
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])

          // 传入的不是对象，即设置一个单一的属性。
          // 但是，这里的 value 参数可以是一个函数
          // funcArg 即处理了 value 是函数和非函数的两种情况
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    },
    removeAttr: function(name){
      return this.each(
        function(){ 
          this.nodeType === 1 && name.split(' ').forEach(
            function(attribute){
              setAttribute(this, attribute)  // 将属性设置为空，setAttribute会移除属性
            }, 
            this // 改参数将成为 forEach 中函数的this
          )
        }
      )
    },

    // 读取、设置属性（js对象的属性）
    prop: function(name, value){
      // propMap 中存储的：key是html中的属性名称，value是js对象中的属性名称
      // 例如，html中的 "class" 在DOM对象中，就需要使用 "className" 这个名字读取，同理于：for  maxlength  cellspacing 等等
      name = propMap[name] || name

      /*
        上文定义：
        propMap = {
          'tabindex': 'tabIndex',
          'readonly': 'readOnly',
          'for': 'htmlFor',
          'class': 'className',
          'maxlength': 'maxLength',
          'cellspacing': 'cellSpacing',
          'cellpadding': 'cellPadding',
          'rowspan': 'rowSpan',
          'colspan': 'colSpan',
          'usemap': 'useMap',
          'frameborder': 'frameBorder',
          'contenteditable': 'contentEditable'
        }
      */

      return 

        // 有第二个参数，设置属性
        (1 in arguments) ?
        this.each(function(idx){
          // 设置属性值，funcArg处理函数或者非函数
          this[name] = funcArg(this, value, idx, this[name])
        }) :

        // 无第二个参数，读取属性（读取第一个元素的）
        (this[0] && this[0][name])
    },

    // 前面加上 'data-' 通过 attr 设置或者读取
    data: function(name, value){
      /*
        上文定义：
        capitalRE = /([A-Z])/g,  //大写字母
      */

      //      前面加上 'data-'               将 'A' 替换为 '-a'
      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

      var data = (1 in arguments) ?
        this.attr(attrName, value) :
        this.attr(attrName)

      return data !== null ? deserializeValue(data) : undefined

      /*
        上文定义的，deserializeValue 函数的作用是：

        // 将字符串变成响应的对象或者值，例如源代码的注释：
        // "true"  => true
        // "false" => false
        // "null"  => null
        // "42"    => 42
        // "42.5"  => 42.5
        // "08"    => "08"
        // JSON    => parse if valid
        // String  => self
      */
    },
    val: function(value){
      return 

        // 有参数，设置值
        0 in arguments ?
        this.each(function(idx){
          // 遍历每个元素，直接对 value 属性赋值
          this.value = funcArg(this, value, idx, this.value)
        }) :

        // 无参数，读取值
        (this[0] && (
           // 如果元素是 <select multiple> 多选列表
           this[0].multiple ?
           // 返回所有选中的option的值的数组
           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :

                   /*
                      上文定义：
                      pluck: function(property){
                        return $.map(this, function(el){ return el[property] })
                      },
                   */

           // 如果不是，直接获取 value
           this[0].value
          )
        )
    },

    // 获取、设置元素的 offset
    offset: function(coordinates){
      // 如果有 coordinates 参数，设置坐标值，并返回当前对象
      if (coordinates) return this.each(function(index){
        var $this = $(this),
            // 支持函数（传入 $this.offset() 做参数）和非函数
            coords = funcArg(this, coordinates, index, $this.offset()),
            // 找到最近的 “relative”, “absolute” or “fixed” 的祖先元素，并获取它的 offset()
            parentOffset = $this.offsetParent().offset(),
            // left 和 top 需要去掉定位的祖先元素的 left、top 值
            props = {
              top:  coords.top  - parentOffset.top,
              left: coords.left - parentOffset.left
            }

        // static时，设置 top、left是无效的
        if ($this.css('position') == 'static') props['position'] = 'relative'

        // 通过 css 赋值
        $this.css(props)
      })

      // 当前对象是空，则返回 null
      if (!this.length) return null

      // 如果没有 coordinates 参数，则返回第一个元素的坐标值
      var obj = this[0].getBoundingClientRect()
      /*
        elem.getBoundingClientRect() 返回一个对象，
        包含元素的 top bottom left right width height 的值
        但是这个 top、bottom、left、right 是相对于浏览器窗口的距离，而不是页面的边界
        （注意，elem.getBoundingClientRect()在IE低版本浏览器有2px的兼容问题）

        window.pageXOffset 和 window.pageYOffset 可获取网页滚动的距离，
        IE低版本需要用 document.body.scrollLeft 和 document.body.scrollTop 兼容
      */
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      }
    },

    // 设置、获取 css
    css: function(property, value){

      // 只有一个参数，获取第一个元素的样式
      if (arguments.length < 2) {
        var computedStyle, element = this[0]
        if(!element) return  // 如果第一个元素无值，直接返回。否则继续

        // 获取元素的计算后的样式
        computedStyle = getComputedStyle(element, '')
        if (typeof property == 'string')
          // 情况1，参数为字符串形式
          // 先从elem内联样式获取（element.style），此时需要 camelize(property) 转换，如将 background-color 变为 backgroundColor
          // 如果未找到，则从css样式获取 computedStyle.getPropertyValue(property) 
          // （重要）注释：elem.style 只能获取元素设置的内联样式、不能获取css样式；而 getComputedStyle 可获取内联、css样式。
          return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
        else if (isArray(property)) {
          // 情况2，参数为数组形式（注意，此时 isObject 情况尚未判断）
          var props = {}
          $.each(property, function(_, prop){
            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
          })
          return props  // 返回一个对象
        }
      }

      // 其他情况：有两个参数、property是对象
      var css = ''
      if (type(property) == 'string') {
        // 情况1，property 是字符串，设置单个样式
        if (!value && value !== 0)
          // 如果value参数是 '' null undefined 则移除这个css样式
          // 注：此计算只适用于内联样式的删除，对 css 样式无效，因为它只通过 this.style.removeProperty 计算，而 this.style 获取不到css样式
          this.each(function(){ this.style.removeProperty(dasherize(property)) })
        else
          // value有正常值，将 css 生成一个字符串（如 'font-size:20px'）等待赋值给内联样式
          // maybeAddPx(property, value) 需要增加 px 的增加上
          css = dasherize(property) + ":" + maybeAddPx(property, value)
      } else {
        // 情况2，property 是对象（此时就不管第二个参数是什么了，不用第二个参数），一次性设置多个样式
        for (key in property)
          if (!property[key] && property[key] !== 0)
            // 如果对象属性值是 '' null undefined 则移除这个css样式，同理，只针对内联样式
            this.each(function(){ this.style.removeProperty(dasherize(key)) })
          else
            // 否则，给 css 赋值一个字符串，多样式属性用 ; 隔开
            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
      }

      // 针对每个元素，设置内联样式（this.style.cssText可获取、设置内联样式）
      // 最后返回自身
      return this.each(function(){ this.style.cssText += ';' + css })

      /*
        上文定义：
        // 将 lineHeight 转换为 line-height 格式
        function dasherize(str) {
          return str.replace(/::/g, '/')
                    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
                    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
                    .replace(/_/g, '-')
                    .toLowerCase()
        }
      */
    },
    // 获取一个元素的索引值（从0开始计数）。当elemen参数没有给出时，返回当前元素在兄弟节点中的位置
    index: function(element){
      /*
        上文定义：
        $.fn.indexOf: emptyArray.indexOf
      */

      // 其实 this 本身就是一个数组，数组本身就有 indexOf ，为何还要上文的这个赋值呢？
      // 因为上文中，this.__proto__ 修改了，不是 Array.prototype 了，也就没有 indexOf 方法了
      // 因此要手动赋值，需要将数组常用的方法在重新赋值给 $.fn.indexOf

      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(name){
      if (!name) return false
      return emptyArray.some.call(this, function(el){
        // this 就是 classRE(name) 的返回值（返回一个正则）
        // function className(node, value){...} 获取或者设置elem的className
        return this.test(className(el))
      }, classRE(name))

      // array.some(callback,[ thisObject]); 只要数组中一项符合callback要求，即返回true

      /*
        // 上文定义 classCache = {}
        function classRE(name) {
          return name in classCache ?
                 classCache[name] : 
                 (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))

          // classCache 存储的数据是这样的：
          // {
          //   abc: /(^|\s)abc(\s|$)/,  // 能匹配 'abc' 或 ' abc ' 或 ' abc' 或 'abc '
          //   xyz: /(^|\s)abc(\s|$)/,
          //   ...
          // }
        }
      */
    },
    addClass: function(name){
      if (!name) return this

      // 针对所有元素都添加className，最终返回本身
      return this.each(function(idx){
        // 说明当前元素不是 DOM node
        if (!('className' in this)) return

        // classList 是一开始就定义的空变量
        classList = []
        // 获取元素的 clasname      // 支持传入函数
        var cls = className(this), newName = funcArg(this, name, idx, cls)
        // 把要赋值的值，按照空白分组，遍历
        newName.split(/\s+/g).forEach(function(klass){
          // 把当前元素不存在的class，push到classlist中
          if (!$(this).hasClass(klass)) classList.push(klass)
        }, this)
        // 如果classlist有数据，则为当前元素赋值最新的class值（现有的classname和新的classname拼接）
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
      })
    },
    removeClass: function(name){
      // 针对所有元素都移除className，最终返回本身
      return this.each(function(idx){
        // 说明当前元素不是 DOM node
        if (!('className' in this)) return

        // 如果参数空，则移除元素的所有class
        if (name === undefined) return className(this, '')

        // 获取现有的classname
        classList = className(this)
        // （可以传入函数）遍历新的classname字符串
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
          // classRE(klass) 返回一个正则，匹配 'classname' 或 ' classname ' 或 ' classname' 或 'classname '
          // 针对传入的classname字符串，对每个符合条件的classname，都替换为 ' '（即删除了）
          classList = classList.replace(classRE(klass), " ")
        })

        // 对整理好的classname，重新赋值给当前元素
        className(this, classList.trim())
      })
    },
    toggleClass: function(name, when){
      // when 参数相当于一个条件：
      // 如果 when === true 则单纯执行 addClass
      // 如果 when === false 则单纯执行 removeClass

      if (!name) return this
      return this.each(function(idx){
        //                   name 可接收函数，可以是空白分割开来的多个classname
        var $this = $(this), names = funcArg(this, name, idx, className(this))
        // 用空白分割开多个class
        names.split(/\s+/g).forEach(function(klass){
          // 如果有 when 参数，则只通过when参数判断，true则只执行addClass，false则只执行removeClass
          // 如果没有 when 参数，则判断元素有没有该class，有则移除，没有则添加
          (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass) : $this.removeClass(klass)
        })
      })
    },
    scrollTop: function(value){
      if (!this.length) return

      // 普通elem有 scrollTop 属性，可以获取或者设置top值
      // window对象没有 scrollTop 属性，通过 pageYOffset 获取，通过 scrollTo() 赋值

      var hasScrollTop = 'scrollTop' in this[0]
      // value 无值，获取 top
      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
      // value 有值，设置 top
      return this.each(hasScrollTop ?
        function(){ this.scrollTop = value } :
        function(){ this.scrollTo(this.scrollX, value) })   // window.scrollX 获取横向滚动值
    },
    scrollLeft: function(value){
      if (!this.length) return
      var hasScrollLeft = 'scrollLeft' in this[0]
      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
      return this.each(hasScrollLeft ?
        function(){ this.scrollLeft = value } :
        function(){ this.scrollTo(value, this.scrollY) })   // window.scrollX 获取纵向滚动值
    },
    position: function() {
      if (!this.length) return

      var elem = this[0],
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),  // 找到第一个定位过的祖先元素 “relative”, “absolute” or “fixed”
        // Get correct offsets
        offset       = this.offset(), // 获取自身的offset
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()  // 获取定位祖先元素的offset（ body、html直接设置 top:0;left:0 ）
      // 上文定义： rootNodeRE = /^(?:body|html)$/i,

      // 去掉当前元素的 margin 宽度
      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

      // 增加父元素的 border 宽度
      // Add offsetParent borders
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

      // Subtract the two offsets
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
    offsetParent: function() {
      // 通过 this.map 遍历当前对象所有元素，进行计算，然后拼接新的数组，并返回。保证链式操作
      return this.map(function(){
        var parent = this.offsetParent || document.body  // elem.offsetParent 可返回最近的改元素最近的已经定位的父元素
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
          // 如果获取的parent不是null、不是body或html、而且position==static
          // 则继续向上查找 offsetParent、大不了找到 body 为止
          parent = parent.offsetParent

        // 最后返回改元素
        return parent
      })
    }
  }

  // for now
  $.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function(dimension){
    // 将 width height 变为  Width Height
    var dimensionProperty =
      dimension.replace(/./, function(m){ return m[0].toUpperCase() })

    $.fn[dimension] = function(value){
      var offset, el = this[0]

      // 情况1，无参数，获取第一个元素的值
      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :  // window.innerHeight
        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :  // document.documentElement.scrollHeight
        (offset = this.offset()) && offset[dimension]  // this.offset().width

      // 情况2，有参数，设置所有元素的值
      else return this.each(function(idx){
        el = $(this)
        // 通过 css() 方法设置，支持传入函数
        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
      })
    }
  })

  // 针对当前元素、遍历子元素，都执行 fun 函数
  function traverseNode(node, fun) {
    fun(node)
    for (var i = 0, len = node.childNodes.length; i < len; i++)
      traverseNode(node.childNodes[i], fun)
  }

  // 上文定义 adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2 //=> prepend, append

    $.fn[operator] = function(){
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var argType, nodes = $.map(arguments, function(arg) {
            argType = type(arg)
            return argType == "object" || argType == "array" || arg == null ?
              arg : zepto.fragment(arg)
          }),
          parent, copyByClone = this.length > 1
      if (nodes.length < 1) return this

      return this.each(function(_, target){
        parent = inside ? target : target.parentNode

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling :
                 operatorIndex == 1 ? target.firstChild :
                 operatorIndex == 2 ? target :
                 null

        var parentInDocument = $.contains(document.documentElement, parent)

        nodes.forEach(function(node){
          if (copyByClone) node = node.cloneNode(true)
          else if (!parent) return $(node).remove()

          parent.insertBefore(node, target)
          if (parentInDocument) traverseNode(node, function(el){
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
               (!el.type || el.type === 'text/javascript') && !el.src)
              window['eval'].call(window, el.innerHTML)
          })
        })
      })
    }

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
      $(html)[operator](this)
      return this
    }
  })

  zepto.Z.prototype = $.fn

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq
  zepto.deserializeValue = deserializeValue
  $.zepto = zepto

  return $
})()

window.Zepto = Zepto
window.$ === undefined && (window.$ = Zepto)
```







