// demo 1
var bar = [1, 2, 3]

for(var item of bar){
    console.log(item)
}
// 1
// 2
// 3

// demo 2
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

// demo 3
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

// demo 4
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

// demo 5
var foo = 'hi'
var iterator = foo[Symbol.iterator]()

console.log(iterator.next())
// Object {value: "h", done: false}

console.log(iterator.next())
// Object {value: "i", done: false}

console.log(iterator.next())
// Object {value: undefined, done: true}

// demo 6
var foo = new String('hi')

console.log(...foo)
// h i

foo[Symbol.iterator] = function* () {
    yield 1
    yield 2
    yield 3
}

console.log(...foo)
// 1 2 3

// demo 7
var foo = new String('hi')

foo[Symbol.iterator] = function* () {
    yield 1
    yield 2
    yield 3
}

console.log(...foo)
// 1 2 3
console.log(foo + '')
// hi

// demo 8
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

// demo 9
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

// demo 10
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