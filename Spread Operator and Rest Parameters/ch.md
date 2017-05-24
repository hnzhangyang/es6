# Spread Operator and Rest Parameters
## 目录
- [Rest parameters](#RestParameters)
- [Spread Operator](#SpreadOperator)
## Rest Parameters
... 操作符可以把函数参数集合成一个数组共我们使用。

ES5
``` javaScript
function concat () {
  return Array.prototype.slice.call(arguments).join(' ')
}
var result = concat('this', 'was', 'no', 'fun')
console.log(result)
// <- 'this was no fun'
```
ES6
``` javaScript
function concat (...words) {
  return words.join(' ')
}
var result = concat('this', 'is', 'okay')
console.log(result)
// <- 'this is okay'
```
在 ES6 之前，我们使用 arguments 变量来引用函数传入的参数。

但因为 arguments 只是一个类数组对象，并不具有数组的特定方法。

``` javaScript
// arguments 原型链指向对象原型，而非数组原型
function fn(){
    console.log(arguments.__proto__ == Object.prototype)
}

fn()
// true
```

有时候为了在 arguments 对象上使用这些数组方法，我们不得不借助 apply 方法（或者 call 方法）。使用 ... 操作符就简单很多。

当然也可以在局部中使用 ... 操作符
``` javaScript
function sum (multiplier, base, ...numbers) {
  var sum = numbers.reduce((accumulator, num) => accumulator + num, base)
  return multiplier * sum
}
var total = sum(2, 6, 10, 8, 9)
console.log(total)
```
## Operator
在函数中使用 ... 扩展运算符可以将参数集合成一个数组，相反的，在数组前使用 ... 扩展运算符可以将数组拆分。
``` javaScript
console.log(...[1, 2, 3])
// <- '1 2 3'
``` 
实际上，只要是具有 iterable 接口的对象，都可以使用  ... 扩展运算符
``` javaScript
[...document.querySelectorAll('div')]
// <- [<div>, <div>, <div>]
```

关于 iterable 的信息将会在后面的章节讲到。 