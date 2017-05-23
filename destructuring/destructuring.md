# 解构赋值
## 目录
- [前言]
- 对象的解构赋值
- 数组的解构赋值
- 设置默认值
- 应用

## 前言
解构赋值能够以非常快速便利的方式从对象或数组中取出特殊属性，赋值给变量。

``` javaScript
var foo = { bar : 'pony', baz: 3 };
var { bar: bar, baz: baz } = foo;
console.log(bar);
// 'pony'
console.log(baz);
// 3
```

等同于ES5

``` javaScript
var foo = { bar : 'pony', baz: 3 };
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
var foo = { bar : 'pony', baz: 3 };
var {bar: bar, _baz : _baz } = foo;
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
## 对象的解构赋值
前言中介绍了对象的解构复制的简单应用。
``` javaScript
var foo = { bar : 'pony', baz: 3 };
var { bar: bar, baz: baz } = foo;
console.log(bar);
// 'pony'
console.log(baz);
// 3
```
当需要赋值的变量名与被解构变量的属性名一致时（就是上面这种情况），可以简写为
``` javaScript
var foo = { bar : 'pony', baz: 3 };
var { bar, baz } = foo;
console.log(bar);
// 'pony'
console.log(baz);
// 3
```
当然，变量名与属性名也可以不一样
``` javaScript
var foo = { bar : 'pony', baz: 3 };
var { bar: _bar, baz: _baz } = foo;
console.log(_bar);
// 'pony'
console.log(_baz);
// 3
```
同样的，可以解构深嵌套的对象属性
``` javaScript
var foo = { bar: { bar: 'pony', baz: 3 }};
var { bar: {bar, baz: _baz } } = foo;
console.log(bar);
// 'pony'
console.log(_baz);
// 3
```
当解构深嵌套的对象属性，有可能出错
ES6
``` javaScript
var foo = { bar: { bar: 'pony', baz: 3 }};
var { barErr: { bar } } = foo;
// error
```
ES5
``` javaScript
var foo = { bar: { bar: 'pony', baz: 3 }};
var bar = foo.barErr.bar;
// Uncaught TypeError: Cannot read property 'bar' of undefined
```
## 数组的解构赋值
数组的结构赋值比对象简单,注意数组的解构赋值用方括号。
``` javaScript
var [a] = [10]
console.log(a);
// 10
```
数组解构赋值可以很方便的用 "," 选择位置
``` javaScript
var [,,a] = [1,2,3];
console.log(a);
// 3
```
当位置超过数组坐标范围时，变量被赋值为 undefined 
``` javaScript
var [,,,a] = [1,2,3];
console.log(a);
// undefined 
```
## 设置默认值
解构赋值时可以设置默认值，当指定对象(或数组)属性为 undefined 时，启用默认值。
``` javaScript
var { foo = 3 } = { foo : 2 };
console.log(foo);
// 2
var { foo = 3 } = { foo : undefined };
console.log(foo);
// 3
var [ b = 10 ] = [ 9 ];
console.log(b);
// 9
var [ b = 10 ] = [ undefined ];
console.log(b)
// 10
```
## 应用
解构赋值在某些方面特别好用。例如可以不借助中间变量，交换两个变量的值。

ES6
``` javaScript
var a = 1 , b = 2;
[a, b] = [b, a];
console.log(a);
// 2
console.log(b);
// 1
```
ES5
``` javaScript
var a = 1,
    b = 2,
    aux;
aux = a;
a = b;
b = aux;
console.log(a);
// 2
console.log(b);
// 1
```
还可以给函数参数传入默认值
``` javaScript
function greet ({ age, name:greeting='she' }) {
  console.log(`${greeting} is ${age} years old.`)
}
greet({ name: 'nico', age: 27 })
// <- 'nico is 27 years old'
greet({ age: 24 })
// <- 'she is 24 years old'
```
