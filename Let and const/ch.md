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
