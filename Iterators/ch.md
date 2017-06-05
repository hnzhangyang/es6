# Iterators
## 目录
- [对象iterable化](#对象iterable化)
- [iterator](#iterator)
## 对象iterable化
ES6 新增了遍历语法 for...of 。
``` javaScript
var bar = [1, 2, 3]

for(var item of bar){
    console.log(item)
}
// 1
// 2
// 3
```
原生支持 for...of 遍历的有以下几个。
- String
- Array
- TypedArray
- Map
- Set

值得注意的是原生 Object 类型不支持 for...of 遍历。因为原生 Object 对象不支持 **@@iterator** 接口。

所以 ES6 给我们提供了两个协议来使 Object 支持 for...of 遍历。
- interable 协议用来规范定义对象被迭代时的行为
- interator 协议用来规范定义每次迭代时返回的值


``` javaScript
var foo = {
    [Symbol.iterator]: () => ({
        items:['h', 'i'],
        next:function (){
          return {
            done: this.items.length == 0,
            value: this.items.shift()
          }
        } 
    })
}

for(var item of foo){
    console.log(item)
}
// h
// i
```
给对象定义 [Symbol.iterator] 属性就是在定义其 **@@iterator** 接口。被定义 **@@iterator** 接口的对象称为 **iterable化**。

**iterator协议** 定义一个对象被诸如 for...of 迭代时的行为，它需要满足以下条件。
- 具有 next 方法
- next 方法返回一个对象，该对象包含两个属性
    - done Boolean 值，表示是否是最后一个迭代
    - vaue 表示当前迭代返回的结果

例如以下
``` javaScript
var foo = {
    [Symbol.iterator]: () => ({
        items:['h', 'i'],
        next:function (){
          return {
            done: this.items.length == 0,
            value: this.items.shift()
          }
        } 
    })
}
```
实际上只要是对象满足 **iterator协议**，不管是自定义还是原生，都可以使对象 **iterable化**。

例如 Generator 函数就返回一个满足 **iterator协议** 的对象。
``` javaScript
var foo = {
    [Symbol.iterator]: function* (){
        yield 1
        yield 2
        yield 3
    }
}

for(var item of foo){
    console.log(item)
}
// 1
// 2
// 3
```

## iterator
具有 **@@iterator** 接口的对象能被以下包含 for...of 的方式迭代。
- for...of
- 扩展运算符 ...
- Array.from
``` javaScript
var foo = [1, 2, 3]

for(var item of foo){
    console.log(item)
}
// 1
// 2
// 3

console.log(...foo)
// 1 2 3

console.log(Array.from(foo))
// [1, 2, 3]
```
值得注意的是 **iterable化** 的对象可能被无限迭代，此时需要注意性能问题。
``` javaScript
var foo = {
    [Symbol.iterator]: () => ({
        items:0,
        next:function (){
          return {
            done: true,
            value: this.items++
          }
        } 
    })
}

for(var item of foo){
    console.log(item)
}
// error
```
对于这种情况，最好做下条件判断。
``` javaScript
var foo = {
    [Symbol.iterator]: () => ({
        items:0,
        next:function (){
          return {
            done: false,
            value: ++this.items
          }
        } 
    })
}

for(var item of foo){
    if(item > 3){
        break
    }
    console.log(item)
}
// 1
// 2
// 3
```
我们也可以把 iterator 对象单独拿出来使用，它是一个具有 next 方法的对象。
``` javaScript
var foo = 'hi'
var iterator = foo[Symbol.iterator]()


console.log(iterator.next())
// Object {value: "h", done: false}

console.log(iterator.next())
// Object {value: "i", done: false}

console.log(iterator.next())
// Object {value: undefined, done: true}
```