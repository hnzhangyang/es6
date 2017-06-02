# Symbol
## 目录
- [基本类型](#基本类型)
- [symbol](#symbol)
    - [介绍](#介绍)
    - [Symbol.for(key)](#Symbol.for(key))
    - [Symbol.key(symbol)](#Symbol.key(symbol))
- [interator](#interator)
## 基本类型
ES6 之前，javaScript 有五种基本类型的值，它们分别是：
- string
- number
- boolean
- null
- undefined

其中 null 代表空指针， undefined 代表对空指针的引用，所以在不严格比较中，null 与 undefined 相等。严格比较中， null 与 undefined 不全等。
``` javaScript
console.log(null == undefined)
// true

console.log(null === undefined)
// false
```
前三种基本类型的值有其构造函数，也叫做基本包装类型。
- String
- Number
- Boolean

但是我们使用基本类型的时候，一般不通过构造函数。
``` javaScript
var str = 'hi'
var num = '123'
var bl = true
```
使用构造函数与不使用构造函数的一个明显区别是，使用构造函数产生的基本类型值，可以看作是一个对象（构造函数总是返回对象），可以为其添加方法与属性，反之不行。
``` javaScript
var num = new Number('123')
num.a = 'hi'

console.log(num.a)
// hi
```
在非严格模式下，如果不通过构造函数产生的基本类型的值，为其添加方法属性，程序本身并不会报错，只是添加无效。
``` javaScript
var num = 123
num.a = 'hi'

console.log(num.a)
// undefined
```
## symbol
### 介绍
symbol 是 ES6 新添加的一种基本类型，所以现在我们有六种基本类型的值。
- string
- number
- boolean
- null
- undefined
- symbol

``` javaScript
var str = 'hi'
var num = 123
var bl = true
var symbol = Symbol('symbol')

console.log(typeof str)
// string
console.log(typeof num)
// number
console.log(typeof bl)
// boolean
console.log(typeof null)
// object
console.log(typeof undefined)
// undefined
console.log(typeof symbol)
// symbol
```

symbol 也有构造函数 Symbol(descript) ，使用的时候不能带 new ，否则会报错。descript 用来描述 symbol ，方便 debug 时使用。
``` javaScript
var foo = Symbol('foo')
// right

var bar = new Symbol('bar')
// error
```

symbol 代表一种独一无二的值，就算描述相同的两个 symbol 也不相等。
``` javaScript
console.log(Symbol('foo') == Symbol('foo'))
// false
```
## Symbol.for(key)
Symbol.for() 方法用来在 全局symbol仓库 根据 symbol 创建时的 key 值来查找 symbol ，如果找到则返回。如果没有找到，在 全局symbol仓库 新建一个再返回。
``` javaScript
var foo1 = Symbol.for('foo')
var foo2 = Symbol.for('foo')

console.log(foo1 === foo2)
// true
```
foo1 是新建的 symbol ，foo2 是在仓库中找到的foo1 再返回的同样的 symbol。所以二者相等。

需要注意的是，Symbol() 和 Symbol.for() 都可以创建 symbol，但是二者并不相等，Symbol.for() 会在 symbol 仓库中备份，而 Symbol() 不会。也就是说 Symbol() 创建的 symbol ，Symbol.for()搜索同样的 key 是找不到的。
``` javaScript
var foo = Symbol('foo')
console.log(foo == Symbol.for('foo'))
// false
```
值得注意的是 Symbol.for() 备份所用的仓库，是可跨域使用的。
``` javaScript
var frame = document.createElement('iframe')
document.body.appendChild(frame)
console.log(Symbol.for('foo') === frame.contentWindow.Symbol.for('foo'))
// true
```