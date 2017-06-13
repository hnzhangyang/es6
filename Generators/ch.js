// demo 1
function* generator(){
    yield 1
    yield 2
    yield 3
}

// demo 2
function* generator(){
    yield 1
    yield 2
    yield 3
}

var g = generator()

// demo 3
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

// demo 4
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

// demo 5
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

// demo 6
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

// demo 7
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

// demo 8
function* generator(){
    console.log('done')
}

var g = generator()
console.log(g.next())
// done
// Object {value: undefined, done: true}

// demo 9
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

// demo 10
function* generator(){
    var a = 0
    a = yield
    console.log(a)
}

var g = generator()

g.next()
g.next(2)
// 2

// demo 11
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

// demo 12
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

// demo 13
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

// demo 14
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

// demo 15
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

// demo 16
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

// demo 17
function* generator(){
    yield 1
    yield 2
    yield 3
    yield 4
}

var g = generator()
g.throw()
// Uncaught error

// demo 18
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