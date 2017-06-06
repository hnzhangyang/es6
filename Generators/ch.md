# Generator
## 目录
- [Generator](#Generator函数)
    - [Generator对象](#Generator对象)
    - [Generator函数](#Generator函数)
- [Generator中的this值](#Generator中的this值)
## Generator
### Generator对象
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
遵守 **iterator协议** 的对象能被诸如 for...of , ... , Array.from。等方法遍历。还具有 next 方法，每次执行该方法，返回一个对象，表明当前执行的状态（done）和返回的值（value）。
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
    yield 1
    console.log(1)
    yield 2
    console.log(2)
    yield 3
    console.log(3)
}

var g = generator()

g.next()
// 1
g.next()
// 2
g.next()
// 3
```

### Generator函数
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
上文说到 **generator对象** 具有延迟函数体执行的功能，关键就在函数体内的 yield 关键字。yield 关键字把函数切分成几段，每次 **generator对象** 执行 next 方法时，函数开始运行，运行到找到 yield 关键字就停止函数执行。 next 方法得到的返回值是当前 yield 关键字后面的值。
``` javaScript
function* generator(){
    yield 1
    console.log(1-1)
    yield 2
    console.log(2-1)
    yield 3
    console.log(3-3)
}

var g = generator()

console.log(g.next())

console.log(g.next())

console.log(g.next())
```