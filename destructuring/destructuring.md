# 解构赋值
## 目录
- 前言
- 对象的解构赋值
- 数组的解构赋值
- 设置默认值

## 前言
解构赋值以非常快速便利的方式从对象或数组中取出特殊属性，赋值给变量。

``` javaScript
var foo = { bar : 'pony', baz: 3};
var {bar: bar, baz: baz} = foo;
console.log(bar);
// 'pony'
console.log(baz);
// 3
```

等同于ES5

``` javaScript
var foo = { bar : 'pony', baz: 3};
var bar = foo.bar;
var baz = foo.baz;
console.log(bar);
// 'pony'
console.log(baz);
// 3
```
所以当解构未定义的属性时，并不会报错，而是给变量赋值为 undefined ，例如。

ES6
``` javaScript
var foo = { bar : 'pony', baz: 3};
var {bar: bar, _baz : _baz} = foo;
console.log(bar);
// 'pony'
console.log(_baz);
// undefined
```
ES5
``` javaScript
var foo = { bar : 'pony', baz: 3};
var bar = foo.bar;
var _baz = foo._baz;
console.log(bar);
// 'pony'
console.log(_baz);
// undefined
```