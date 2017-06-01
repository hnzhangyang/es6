# Let and const
## 目录
- [ES5中的变量声明](#ES5中的变量声明)
    - [变量提升](#变量提升)
    - [函数作用域](#函数作用域)
    - [var,functon的区别](#var,functon的区别)
- [let](#let)
- [const](#const)
- [暂时性死区](#暂时性死区)

## ES5中的变量声明
### 变量提升
var 是常用的声明变量的语法，用 var 声明的变量会存在 **变量提升** 的问题。
``` javaScript
function foo (flag){
    if(flag){
        var bar = 'hi'
    }
    console.log(bar)
}

foo(true)
// hi
foo(false)
// undefined
```
**变量提升** 的意思就是说 **不管变量在哪里定义，这个变量总会放到当前作用域的顶层**。
``` javaScript
function foo (flag){
    var bar
    if(flag){
        bar = 'hi'
    }
    console.log(bar)
}

foo(true)
// hi
foo(false)
// undefined
```
### 函数作用域
在 ES6 以前，javaScript 没有块级作用域，只有函数作用域。
``` javaScript
{{{{var bar = 'hi'}}}}

console.log(bar)
// hi
```
``` javaScript
function foo(){
    var bar = 'hi'
    console.log(bar)
}

foo()
// hi
console.log(bar)
// Uncaught ReferenceError: bar is not defined
```
### var,functon的区别
我们定义函数的时候有两种定义方式。
``` javaScript
var foo = function (){}

function bar (){}
```
这两种方式都存在[变量提升](#变量提升)。

不同的是用 var 定义的函数，提升的只是 foo 这个变量名
``` javaScript
console.log(typeof foo)
// undefined

var foo = function (){}
```
而用 function 定义的函数，会把整个函数体提升到当前作用域的顶部。
``` javaScript
console.log(typeof bar)
// function

function bar (){}
```
值得一提的是，如果不是在严格模式下，声明变量的时候不用 var 关键字，是默认给全局变量 window 添加属性，不管当前嵌套了多少层函数作用域。
``` javaScript
function bar (){
    function foo (){
        text = 'hi'
    }
    
    foo()
}

bar()
console.log(window.text)
// hi
```
## let
let 与 var 都是声明变量的方法，与 var 不同的是 let 声明的变量具有块级作用域。
```
{
    let foo = 'hi'
}
console.log(foo)
// Uncaught ReferenceError: foo is not defined
```
在一些情况下，拥有块级作用域会变得很方便。
``` javaScript
for(var i = 0; i < 3; i++) {}
console.log(i)
// 3

for(let j = 0; j < 3; j++) {}
console.log(j)
// j is not defined
// 这样在 for 循环的时候就不会污染变量了
```
## const
const 与 let 一样，也具有块级作用域。
``` javaScript
{
    const bar = 'hi'
}

console.log(bar)
// Uncaught ReferenceError: bar is not defined
```
与 let 不同的是，const 声明的变量不能改变其引用地址。
```
const bar = 'hi'
bar = 'hello'
// "bar" is read-only
```
在 javaScript 中有两种类型的值， **基本类型** 和 **引用类型**。

**基本类型** 的值包括以下六种。
- string
- number
- boolean
- undefined
- null
- symbol（ES6 新加）

**引用类型** 的值本质上都是 object
- object

当你声明一个 **基本类型** 的值时，系统会给该值单独分配一段内存空间，各个 **基本类型** 的值空间不共享,不会相互影响。
``` javaScript
var foo = 'hi'
var bar = foo

console.log(foo)
// hi
console.log(bar)
// hi

bar = 'hello'
console.log(foo)
// hi
console.log(bar)
// hello
```
所以用 const 声明一个基本类型的值时，该值指向新开辟的空间，该值不可改变，即常量。
``` javaScript
const bar = 'hi'
bar = 'hello'
// 因为重新赋值的话相当于改变了 bar 的引用地址
// 在 const 声明的变量中是不允许的
// 所以报错
//  "bar" is read-only
```