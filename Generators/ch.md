# Generator
## 目录
- [Generator函数](#Generator函数)
- [Generator对象](#Generator对象)  
    - [next](#next)
    - [return](#return)
    - [throw](#throw)
- [总结](#总结)
## Generator函数
function 右边带一个 “*” 表示该函数是 Generator 函数。
``` javaScript
function* generator(){
    yield 1
    yield 2
    yield 3
}
```
注意到声明 generator 的时候并没有根据常规首字母大写，说明 generator 并不是一个普通的构造函数（虽然它也返回一个对象）。实际上调用 generator 的时候，不用 new 关键字。
``` javaScript
function* generator(){
    yield 1
    yield 2
    yield 3
}

var g = generator()
```
Generator 函数既遵守 iterator 协议 又遵守 iterable 协议。
``` javaScript
function* generator(){
    yield 1
    yield 2
    yield 3
}

var g = generator()

typeof g[Symbol.iterator] === 'function'
// iterable 协议
typeof g.next === 'function'
// iterator 协议
g[Symbol.iterator]() === g
// iterator 协议
console.log([...g])
// ['1', '2', '3']
console.log(Array.from(g))
// ['1', '2', '3']
```
Generator 函数内部关键词 yield 表示分割执行，每次 Generator 对象调用 next 方法时，函数会执行到下一个 yield 关键字就暂停执行（在 [Generator对象](#Generator对象) 中详解）。

yield 关键字后面也可以带一个 Generator 对象。
``` javaScript
function* generator1(){
    yield 2
    yield 3
}

var g1 = generator1()

function* generator2(){
    yield 1
    yield* g1
    yield 4
}

var g2 = generator2()

console.log(g2.next());
// Object {value: 1, done: false}
console.log(g2.next());
// Object {value: 2, done: false}
console.log(g2.next());
// Object {value: 3, done: false}
console.log(g2.next());
// Object {value: 4, done: false}
console.log(g2.next());
// Object {value: undefined, done: true}
```
## Generator对象
还记的在 <a href="https://github.com/hnzhangyang/es6/blob/master/Iterators/ch.md#iterator%E5%AF%B9%E8%B1%A1">Iterators</a> 一章中提到过 Generator 函数产生一个遵守 **iterator协议** 的对象。
``` javaScript
function* generator(){
    yield 1
    yield 2
    yield 3
}

var foo = {
    [Symbol.iterator]: generator
}

for(var item of foo){
    console.log(item)
}
// 1
// 2
// 3
```
遵守 **iterator协议** 的对象能被诸如 for...of , ... , Array.from。等方法遍历。还具有 next 方法，每次执行该方法，返回一个 **IteratorResult** 对象，表明当前执行的状态（done）和返回的值（value）。
``` javaScript
function* generator(){
    yield 1
    yield 2
    yield 3
}

var foo = {
    [Symbol.iterator]: generator
}

for(var item of foo){
    console.log(item)
}
// 1
// 2
// 3

foo.next()
// Object {value: 1, done: false}
foo.next()
// Object {value: 2, done: false}
foo.next()
// Object {value: 3, done: false}
foo.next()
// Object {value: undefined, done: true}
```

类似的数组也支持 **iterator协议** ，但是与 Generator 产生的对象（下文称 **Generator对象**）不同的是，**Generator对象** 具有延迟执行函数体的功能。
``` javaScript
function* generator(){
    console.log(1)
    yield 1
    console.log(2)
    yield 2
    console.log(3)
    yield 3
    console.log(4)
}

var g = generator()

g.next()
// 1
g.next()
// 2
g.next()
// 3
g.next()
// 4
```
### next
上面的 **Generator对象**，每执行一次 next 方法，函数体就执行到下一个 yield 关键字，执行完毕后保留状态，暂停执行。值得注意的是最后一个 console.log(4) 也执行了，但是它下面并没有 yield 关键字。这是因为 next 方法并不知道函数内部的状态，它总是期望找到下一个 yield 关键字，如果没有，就一直执行到函数末尾，并标记 done: true。
``` javaScript
function* generator(){
    console.log('done')
}

var g = generator()
console.log(g.next())
// done
// Object {value: undefined, done: true}
```
每次执行 next 方法总会返回一个 **IteratorResult** 对象。  
``` javaScript
 { value: undefined, done: true }
```
其中 done 表示当前执行的状态，value 表示返回的值。这个 value 值就是 yield 关键字后面跟着的表达式的值。
``` javaScript
function* generator(){
    yield 1
    yield 2
}

var g = generator()

console.log(g.next())
// Object {value: 1, done: false}
console.log(g.next())
// Object {value: 2, done: false}
console.log(g.next())
// Object {value: undefined, done: true}
```
我们也可以在 next 方法中给 Generator 函数传递值，它会在函数体内作为 yield 关键字的返回值被接收。
``` javaScript
function* generator(){
    var a = 0
    a = yield
    console.log(a)
}

var g = generator()

g.next()
g.next(2)
// 2
```
除了找到 yield 和执行到函数末尾，还有一种情况就是函数体内有 return 关键字。当函数运行到 return 关键字时，会标记函数体执行完毕，返回 done: true 。
``` javaScript
function* generator(){
    yield 1
    return
    yield 2
    yield 3
}

var g = generator()

console.log(g.next())
// Object {value: 1, done: false}
console.log(g.next())
// Object {value: undefined, done: true}
console.log(g.next())
// Object {value: undefined, done: true}
console.log(g.next())
// Object {value: undefined, done: true}
``` 
### return
**Generator对象** 实际上具有三个方法。
- next 
- return
- throw

return 方法作为结束 Generator 函数执行的标记。它会立即结束 Generator 函数的执行，并且标记 done: true 。
``` javaScript
function* generator(){
    yield 1
    yield 2
    yield 3
    yield 4
}

var g = generator()
console.log(g.next())
// Object {value: 1, done: false}
console.log(g.return())
// Object {value: undefined, done: true}
console.log(g.next())
// Object {value: undefined, done: true}
console.log(g.next())
// Object {value: undefined, done: true}
```
其中 return 方法也可以带一个参数，它会作为当前  **IteratorResult** 对象的 value 值返回。
``` javaScript
function* generator(){
    yield 1
    yield 2
    yield 3
    yield 4
}

var g = generator()
console.log(g.next())
// Object {value: 1, done: false}
console.log(g.return("hi"))
// Object {value: "hi", done: true}
console.log(g.next())
// Object {value: undefined, done: true}
console.log(g.next())
// Object {value: undefined, done: true}
```
有一点需要注意的是，如果 Generator 函数体内包含 try...finally 语句，当 return 遇到 finally 时，会先执行完 finally 内的语句再标记函数结束。
``` javaScript
function* numbers () {
    yield 1
    try {
        yield 2
    } finally {
        yield 3
        yield 4
    }
    yield 5
}

var g = numbers()

console.log(g.next())
//  { done: false, value: 1 }
console.log(g.next())
//  { done: false, value: 2 }
console.log(g.return(6))
//  { done: false, value: 3 }
console.log(g.next())
//  { done: false, value: 4 }
console.log(g.next())
//  { done: true, value: 6 }
```
在用诸如 for...of 的迭代方法，迭代 Generator对象时，如果提前用了 return 会导致函数体被标记执行完毕（done: true），此时后面的值是迭代不到的。
``` javaScript
function* generator(){
    yield 1
    yield 2
    yield 3
    return
    yield 4
    yield 5
}

var g = generator()

console.log(...g)
// 1 2 3
```
### throw
throw 方法用于在 Generator 函数中抛出一个错误，这个错误能被 Generator 函数体捕获。
``` javaScript
function* generator(){
    try{
        yield
    } catch(err) {
        console.log(err)
    }
}

var g = generator()
g.next()
g.throw('error')
// error
```
执行 throw 方法时 error 在函数体内被捕获。同时会执行到下一个 yield 关键字。throw 方法并不会终止 Generator 函数体的执行。
``` javaScript
function* generator(){
    try{
        yield
    } catch(err) {
        console.log(err)
    }
    yield 2
    console.log('hi')
    yield 3
    yield 4
}

var g = generator()
g.next()
g.throw('error')
// error
// hi
console.log(g.next())
// Object {value: 3, done: false}
console.log(g.next())
// Object {value: 4, done: false}
console.log(g.next())
// Object {value: undefined, done: true}
```
如果 throw 没有在 Generator 函数体内被捕获的话，会抛出全局错误，此时函数体才会中止执行。
``` javaScript
function* generator(){
    yield 1
    yield 2
    yield 3
    yield 4
}

var g = generator()
g.throw()
// Uncaught error
```
此时的错误作为全局错误，可在外部被捕获。
``` javaScript
function* generator(){
    yield 1
    yield 2
    yield 3
    yield 4
}

var g = generator()
try{
    g.throw()
} catch(){
    console.log('error')
    // error
}

console.log(g.next())
// Object {value: undefined, done: true}
```
## 总结
Generator 函数
- Generator 函数可暂停执行，每次执行时遇到一下逻辑暂停执行，或者终止执行。
    - 遇到 yield 关键字
    - 遇到 return 关键字
    - Generator对象抛出 throw 
    - 运行到函数体结尾
- Generator 函数同时遵守 **iterable协议** 与 **iterator协议**
- Generator 函数内部 yield 关键字后面可以带另一个遵守 **iterator协议** 的对象

Generator 对象这一节首先介绍了遵守 **iterator协议** 的 iterator 对象可被诸如一下迭代方式迭代。
- for...of
- ...
- Array.from

并且具有 next 方法，每次执行 next 方法，总是返回一个 **iteratorResult**对象。
``` javaScrpit
{value: undefined, done: false}
```
然后讲到了通过 Generator 函数生成的 Generator 对象与普通的 Generator 对象有所不同，它具有三个方法。
- next 执行下一段函数体逻辑
- return 提前终止函数体逻辑
- throw 抛出可被函数体接收的错误

