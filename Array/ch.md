# Array
## 目录
- [Array.from](#Array.from)
- [Array.of](#Array.of)
- [Array.prototype.copyWithin](#Array.prototype.copyWithin)
- [Array.prototype.fill](#Array.prototype.fill)
- [Array.prototype.find](#Array.prototype.find)
- [Array.prototype.findIndex](#Array.prototype.findIndex)
- [Array.prototype.keys](#Array.prototype.keys)
- [Array.prototype.values](#Array.prototype.values)
- [Array.prototype.entries](#Array.prototype.entries)
- [Array.prototype.[Symbol.interator]](#Array.prototype.[Symbol.interator])
- [Array.prototype.includes](#Array.prototype.includes)
- [Array.observe](#Array.observe)
- [Array.unobserve](#Array.unobserve)
## Array.from
Array.from 将一个类数组对象(arraylike)，或者一个 [interator对象](https://github.com/hnzhangyang/es6/blob/master/Iterators/ch.md) 转化成真正的数组。

在 ES6 之前，一般情况下我们将类数组对象转化为数组对象，通常是这样写的。

``` javaScript
function cast ()
  return Array.prototype.slice.call(arguments)
}
cast('a', 'b')
// ['a', 'b']
```

或者可以这样写。
``` javaScript
function cast ()
  return [].slice.call(arguments)
}
```

在之前的文章中，我们还可以通过 [扩展运算符](https://github.com/hnzhangyang/es6/blob/master/Spread%20Operator%20and%20Rest%20Parameters/ch.md) 来将具有 [interator接口](https://github.com/hnzhangyang/es6/blob/master/Iterators/ch.md)的任意对象，转化为数组对象。
``` javaScript
function cast ()
  return [...arguments]
}
```
庆幸 ES6 为 arguments 对象添加了 **interator接口**，我们可以使用 **扩展运算符** 来使其变成数组对象，同样的， ES6 还为 NodeList 布置了 **interator接口** ，所以我们也可以这样写。
``` javaScript
[...$('div')]
TypeError: $(...)[Symbol.iterator] is not a function
```
但是需要注意的是，JQuery 对象，并不具有 **interator接口**，所以当我们用 **扩展运算符** 遍历 JQuery 对象时，会报错。
``` javaScript
[...$('div')]
TypeError: $(...)[Symbol.iterator] is not a function
```
总结来说，在上面的方法中。
- Array.prototype.slice.call() 方法将类数组对象，转化为数组对象
- **扩展运算符** 将具有 **interator接口** 的任意对象，转化为数组对象

而今天所说的 **Array.from** 方法，集合了上述两个方法的优点，所以在 JQuery 对象中，我们可以这样写。
``` javaScript
Array.from($('div'))
// [<div>, <div>, <div>, ...]
```
需要注意的是 **Array.from** 方法并不支持局部遍历，也就是说如果你想遍历除第一个 div 之外的所有 div，你可以使用 Array.prototype.slice.call() 方法。
``` javaScript
[].slice.call(document.querySelectorAll('div'), 1)
```
**Array.from** 接受三个参数。
- input：你想要遍历的对象
- map：mapping 函数
- context：mapping 函数执行时的上下文

比如说下面的栗子。
``` javaScript
function typesOf () {
  return Array.from(arguments, value => typeof value)
}
typesOf(null, [], NaN)
// ['object', 'object', 'number']
```

## Array.of