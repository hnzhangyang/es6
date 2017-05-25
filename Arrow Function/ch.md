# Arrow Function
## 目录
- [箭头函数](#箭头函数)
- [this 值问题](#this值问题)
## 箭头函数
ES6正式将箭头函数纳入标准（在大部分其他主流语言中早已被支持），用以在特定情况下代替匿名函数。
箭头函数的语法是这样的
``` javaScript
[1, 2, 3].map(num => num * 2)
// <- [2, 4, 6]
```
在ES5中是这样写
``` javaScript
[1, 2, 3].map(function (num) { return num * 2 })
// <- [2, 4, 6]
```
如果需要声明多个参数或者没有参数，需要用 () 包围参数部分
``` javaScript
[1, 2, 3, 4].map((num, index) => num * 2 + index)
// <- [2, 5, 8, 11]
```
在ES5中是这样的
``` javaScript
[1, 2, 3, 4].map( function(num, index) { return num * 2 + index })
// <- [2, 5, 8, 11]
```
可见 => 后半部分是直接 return 语法（ return num * 2 + index ）。
如果箭头函数不仅仅是返回值，还有其他逻辑要处理，需要用 {} 把后半部分包围。
``` javaScript
[1, 2, 3, 4].map(num => {
  var multiplier = 2 + num
  return num * multiplier
})
// <- [3, 8, 15, 24]
```
有一点例外，当你仅仅想返回一个对象时，需要用 () 把对象包围，因为对象的 {} 会与 代码块的 {} 冲突
``` javaScript
setTimeout(() => ({ foo: 'bar' }), 0);

```
## this 值问题
### 箭头函数的 this 值
箭头函数绑定父级的词法作用域 ( lexical scope )
``` javaScript
function foo(){
    var that = this;
    setTimeout(() => {
        console.log(this === that)
    },0)
}
foo()
// true
```
在编程语言中有词法作用域 ( lexical scope ) 和动态作用域 ( dynamic scope ),思考下面的输出
``` javaScript
var a = 0
function show(){
    console.log(a)
}
function foo(){
    var a = 1
    show()
}
foo()
// 0
```
因为javaScript 使用的是词法作用域 ( lexical scope ) , 即取值在函数声明时决定，在声明 show 函数的时候，有全局变量 a = 0。在 show 函数内部取的是全局作用域 a 的值。

相反的，在动态作用域（ dynamic scope ）中，输出的值是 1 。因为动态作用域的取值是函数执行时决定，show 函数内部取的是 foo 内部 a 的值。
``` javaScript
var a = 0
function show(){
    console.log(a)
}
function foo(){
    var a = 1
    show()
}
foo()
// 在 dynamic scope 下
// 1
```

回到箭头函数，箭头函数绑定父级的词法作用域，这样在某些情况下会变得非常方便了。
``` javaScript
function Timer () {
  this.seconds = 0
  setInterval(() => this.seconds++, 1000)
}
var timer = new Timer()
setTimeout(() => console.log(timer.seconds), 3100)
// <- 3
```
在 ES6 之前，需要用匿名函数代替箭头函数，因为匿名函数的 this 取值为 window (在严格模式下取值为 undefined )，想要获得父级函数的 this 值，只能通过 bind 方法，或者  var that = this
``` javaScript
function Timer () {
  this.seconds = 0
  setInterval(function(){
      this.seconds++
  }.bind(this), 1000)
}
var timer = new Timer()
setTimeout(function(){
    console.log(timer.seconds);
}, 3100)
// <- 3
```
或者
``` javaScript
function Timer () {
  var that = this;
  this.seconds = 0
  setInterval(function(){
      that.seconds++
  }, 1000)
}
var timer = new Timer()
setTimeout(function(){
    console.log(timer.seconds);
}, 3100)
// <- 3
```
### 普通函数的四种 this 值
在 javaScript 中，函数可以看做是一段内存的引用，函数执行时的 this 值根据函数的调用方式略有不同。

1、直接调用时，this 只向 window 或 undefined （ 严格模式 ）。
``` javaScript
function show(){
    console.log(this)
}

show()
// window 
// undefined
```
2、函数作为对象的属性调用时，this 值指向该对象
``` javaScript
var foo = {
    show:function(){
        console.log(this)
    }
}

foo.show()
// foo
```
3、函数作为构造函数使用是，this 指向由构造函数返回的对象
``` javaScript
var that, obj

function Foo(){
    that = this
}

obj = new Foo()
console.log(obj === that)
// true
```
4、借助函数的 apply , call 方法动态指定函数的 this 值
``` javaScript
var a = {}
function Foo(){
    console.log(this == a)
}

Foo.call(a)
// true
Foo.apply(a)
// true

```
加上ES6的箭头函数，现 javaScript 中，函数调用时 this 值变成了可能有五种情况，各情况看函数的调用方式就能分辨出来。
