# Object
## 目录
- [assign](#assign)
- [is](#is)
- [getOwnPropertySymbols](#getOwnPropertySymbols)
- [setPrototypeof](#setPrototypeOf)
- [对象基本属性](#对象基本属性)
## assign
ES6 对于对象并没有像数组那样新增了很多方法，而只是为对象添加了四个静态属性。

Object.assign 用于快速给一个对象定义属性。

``` javaScript
Object.assign({}, { a: 1 })
// { a: 1 }
```

可见，Object.assign 第一个参数表示需要赋值的对象 target，第二个参数表示将会被 target 复制属性的对象。

``` javaScript
Object.assign({ a: 1 }, { a: 2 })
// { a: 2 }
```

Object.assign 也可以传入两个以上的参数。

``` javaScript
Object.assign({ a: 1, b: 2 }, { a: 3 }, { c: 4 })
// { a: 3, b: 2, c: 4 }
```

它可以这样理解。

``` javaScript
Object.assign(Object.assign({ a: 1, b: 2 }, { a: 3 }), { c: 4 })
// { a: 3, b: 2, c: 4 }
```

需要注意的是，Object.assign 只能用来赋值 **可枚举属性** 以及 **非原型链属性**。

``` javaScript
var a = { b: 'c' }
Object.defineProperty(a, 'invisible', { enumerable: false, value: 'boo! ahhh!' })
Object.assign({}, a)
// { b: 'c' }
```

对于对象，Object.assign 也同样适用。

``` javaScript
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
```

Symbol 属性同样也有效。

``` javaScript
Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
// { a: 'b', Symbol(c): 'd' }
```

这里有一个问题，你不能控制赋值的深度，比如说下面你只想复制 target.a.d 属性，但是 Object.assign 却将整个 target.a 赋值给了 source.a。

``` javaScript
var target = { a: { b: 'c', d: 'e' } }
var source = { a: { b: 'ahh!' } }
Object.assign(target, source)
// { a: { b: 'ahh!' } }
```
## is
Object.is 的作用跟 === 很类似，传入两个值给 Object.is，它判断这两个值是不是 **相同的引用** 或者是 **相同的基本值**。

``` javaScript
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false
```

有两点需要注意，一是， -0 和 +0 ，在 === 中，是全等的，但是在 Object.is 却不是。

``` javaScript
-0 === +0
// true
Object.is(-0, +0)
// false
```

二是 NaN 与 NaN。

``` javaScript
NaN === NaN
// false
Object.is(NaN, NaN)
// true
```

## getOwnPropertySymbols
Object.getOwnPropertySymbols 返回一个对象的 symbol 属性名。

``` javaScript
var a = {
  [Symbol('b')]: 'c',
  [Symbol('d')]: 'e',
  'f': 'g',
  'h': 'i'
}
Object.getOwnPropertySymbols(a)
// [Symbol(b), Symbol(d)]
```

## setPrototypeOf
Object.setPrototypeOf 用来定义一个对象原型链上的属性。等同于。

``` javaScript
Object.prototype.foo = 'foo'
```

## 对象基本属性
在 javaScript 中，一切引用类型都是对象，所以一切引用类型都继承了对象原型链上的属性，常见的有下面几个。
- Object.prototype.toString
- Object.prototype.values
- Object.prototype.\_\_proto\_\_
- Object.prototype.constructor
- Object.prototype.toString