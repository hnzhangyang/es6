# 对象字面量

## 目录
- [属性速记](#属性速记)
- [计算属性](#计算属性)
- [定义方法](#定义方法)
- [关于对象的属性](#关于对象的属性)
  - [数据属性](#数据属性)
  - [访问器属性](#访问器属性)
## 属性速记
当你向一个对象定义属性时，如果属性名与属性值的引用的名相同，可以用下面的方式简写
```javaScript
var foo = 'bar'
var baz = { foo }
console.log(baz)
// { foo : 'bar' }
```
使用模块开发时，这一招特别有用
```javaScript
function methodShow () {
  // some code
}

function methodHide (key, value) {
  // some code
}


module.exports = {
  methodShow,
  methodShow
}
```
ES5
```javaScript
function methodShow () {
  // some code
}

function methodHide (key, value) {
  // some code
}

module.exports = {
  methodShow: methodShow,
  methodHide: methodHide
}
```
## 计算属性
计算属性在业务中经常用到
```javaScript
var foo = 'var'
var baz = {}
baz[foo] = 'hi'
console.log(baz)
// { bar : 'hi' }
```
但是计算属性没有办法用于上述的属性速记 ( Property Value Shorthands ) 中，属性速记可以近似的看成是编译时的语法糖，旨在简单实用
```javaScript
var foo = 'bar'
var bar = 'hi'
var baz = { [foo] }
// SyntaxError
```
## 定义方法
与属性速记相同，在定义对象方法时，如果方法名与所引用的函数名相同，可以使用以下快捷方式定义
```javaScript
var sayHi = function(){
    console.log('hi')
}

var foo = {
    sayHi
}

foo.sayHi()
// hi
```
## 关于对象的属性
javaScript 中，一切引用类型皆对象，对象拥有两种属性
- 数据属性
- 访问器属性

### 数据属性
数据属性是我们最常用的,下面的 foo.hi 就是一个数据属性
```javaScript
var hi = 'hi'
var foo = { hi }
console.log(foo.hi)
// hi
```
数据属性有四个描述参数，用 Object.defineProperty 可定义 
- configurable 是否可重置描述参数
- enumerable 是否可枚举
- value 属性的值
- writable 属性值是否可重写

这四个描述参数可用  定义

### 访问器属性
数据属性直取直读，没有中间操作。在 ES5 中，ECMA 新增了 Object.defineProperty API ，自此，前端工程师有了对对象数据读,取的介入能力，也就是说我们可以设定对象的访问器属性了
```javaScript
var foo = {}
var val = foo.say
Object.defineProperty(foo, 'say', {
    set: function(name){
        val = 'hi ' + name 
    },
    get: function(){
        return val
    }
})

foo.say = 'zhang'
console.log(foo.say)
// hi zhang
```
设置对象访问器属性比较常用的地方就是 MVVM，劫持对象属性的读和取，这样就可以做到在对象属性改变的时候同步更新 DOM 节点。

访问器属性同样也有四个描述参数
- configurable 是否可重置描述参数
- enumerable 是否可枚举
- get 定义 getter
- set 定义 setter

一个对象可以同时拥有两种属性，如果需要对对象属性进行劫持，设定对象访问器属性的 getter setter 可以达到目的，Object.defineProperty 是 ES5 提出的 API ，只兼容到 IE8 如果有对低版本IE兼容有要求，可以利用脏检测 hack。

``` javaScript
if(Object.defineProperty){
    //Object.defineProperty()
}else{
    //setInterval()
}
```
脏检测是利用一个定时器定时检测需要劫持的对象，在劫持对象不是特别庞大的时候，利用脏检测也能达到很好的效果。
