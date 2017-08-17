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

而今天所说的 Array.from 方法，集合了上述两个方法的优点，所以在 JQuery 对象中，我们可以这样写。
``` javaScript
Array.from($('div'))
// [<div>, <div>, <div>, ...]
```
需要注意的是 Array.from 方法并不支持局部遍历，也就是说如果你想遍历除第一个 div 之外的所有 div，你可以使用 Array.prototype.slice.call() 方法。
``` javaScript
[].slice.call(document.querySelectorAll('div'), 1)
```
Array.from 接受三个参数。
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
Array.of 可以看成是类似于 new Array 的创建数组的方法。

new Array
``` javaScript
new Array()
// []
new Array(undefined)
// [undefined]
new Array(1)
// [undefined x 1]
new Array(3)
// [undefined x 3]
new Array(1, 2)
// [1, 2]
new Array(-1)
// RangeError: Invalid array length
```
Array.of
``` javaScript
Array.of()
// []
Array.of(undefined)
// [undefined]
Array.of(1)
// [1]
Array.of(3)
// [3]
Array.of(1, 2)
// [1, 2]
Array.of(-1)
// [-1]
```
Array.of 可以简单的类似为。
``` javaScript
Array.of = function of () {
  return Array.prototype.slice.call(arguments)
}
Array.prototype.slice.call([1, 2, 3])
// [1, 2, 3]
Array.of(1, 2, 3)
// [1, 2, 3]
```
但需要注意的是 Array.of 的参数不需要用 [] 包起来。

## Array.prototype.copyWithin
Array.prototype.copyWithin 复制替换数组的项。
``` javaScript
Array.prototype.copyWithin(target, start, end)
```
其中 target 是必传参数,代表复制的起点。start 默认值是 0，end 默认值是 this.length。
``` javaScript
var items = [1, 2, 3, ,,,,,,,]
// [1, 2, 3, undefined x 7]

items.copyWithin(6, 1, 3)
// [1, 2, 3, undefined × 3, 2, 3, undefined × 2]
```

## Array.prototype.fill
Array.prototype.fill 用于填充数组。
``` javaScript
['a', 'b', 'c'].fill(0)
// [0, 0, 0]
new Array(3).fill(0)
// [0, 0, 0]
```
或者你也可以指定填充位置。
``` javaScript
['a', 'b', 'c',,,].fill(0, 2)
// ['a', 'b', 0, 0, 0]
new Array(5).fill(0, 0, 3)
// [0, 0, 0, undefined x 2]
```
填充的值可以是任意值。
``` javaScript
new Array(3).fill({})
// [{}, {}, {}]
```
需要注意的是，Array.prototype.fill 不能使用回调函数。
``` javaScript
new Array(3).fill(function foo () {})
// [function foo () {}, function foo () {}, function foo () {}]
```

## Array.prototype.find
Array.prototype.find 用于返回第一个匹配的值。
``` javaScript
[1, 2, 3, 4, 5].find(item => item > 2)
// 3
[1, 2, 3, 4, 5].find((item, i) => i === 3)
// 4
[1, 2, 3, 4, 5].find(item => item === Infinity)
// undefined
```

## Array.prototype.findIndex
Array.prototype.findIndex 查找指定项的位置。
``` javaScript
[1, 2, 3, 4, 5].find(item => item > 2)
// 2
[1, 2, 3, 4, 5].find((item, i) => i === 3)
// 3
[1, 2, 3, 4, 5].find(item => item === Infinity)
// -1
```

## Array.prototype.keys
Array.prototype.keys 返回一个具有 **iterator** 接口的由数组各项 key 组成的数组，这意味着你可以使用任何支持 **iterator** 接口的方法。
``` javaScript
for (let key of [1, 2, 3].keys()) {
  console.log(key)
  // 0
  // 1
  // 2
}

[...new Array(3).keys()]
// [0, 1, 2]
Object.keys(new Array(3))
// []
```
## Array.prototype.values
Array.prototype.values 跟 Array.prototype.keys 很相似，不过它返回的 **iterator** 化的数组是由 values 组成，而不是 keys。
``` javaScript
[...[1, 2, 3].values()]
// [1, 2, 3]
```

## Array.prototype.entries
Array.prototype.entries 是上面两个方法的集合，它返回同时包含 keys 和 values 的 **iterator** 对象。
``` javaScript
[...['a', 'b', 'c'].entries()]
// [[0, 'a'], [1, 'b'], [2, 'c']]
```
## array.prototype[Symbol.iterator]
array.prototype[Symbol.iterator] 跟 Array.prototype.values 方法很像。
``` javaScript
[...['a', 'b', 'c'][Symbol.iterator]()]
// ['a', 'b', 'c']
```