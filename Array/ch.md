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