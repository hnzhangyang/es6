// demo 1
console.log(null == undefined)
// true

console.log(null === undefined)
// false

// demo 2
var str = 'hi'
var num = '123'
var bl = true

// demo 3
var num = new Number('123')
num.a = 'hi'

console.log(num.a)
// hi

// demo 4
var num = 123
num.a = 'hi'

console.log(num.a)
// undefined

// demo 5
var str = 'hi'
var num = 123
var bl = true
var symbol = Symbol('symbol')

console.log(typeof str)
// string
console.log(typeof num)
// number
console.log(typeof bl)
// boolean
console.log(typeof null)
// object
console.log(typeof undefined)
// undefined
console.log(typeof symbol)
// symbol

// demo 6
var foo = Symbol('foo')
// right

var bar = new Symbol('bar')
// error

// demo 7 
console.log(Symbol('foo') == Symbol('foo'))
// false

// demo 8
var foo1 = Symbol.for('foo')
var foo2 = Symbol.for('foo')

console.log(foo1 === foo2)
// true

// demo 9
var foo = Symbol('foo')
console.log(foo == Symbol.for('foo'))
// false

// demo 10
var frame = document.createElement('iframe')
document.body.appendChild(frame)
console.log(Symbol.for('foo') === frame.contentWindow.Symbol.for('foo'))
// true

// demo 11
var foo = Symbol('foo')
console.log(Symbol.keyFor(foo))
// undefined

var bar = Symbol.for('bar')
console.log(Symbol.keyFor(bar))
// bar

// demo 12
var foo = {
  [Symbol()]: 'foo',
  [Symbol('foo')]: 'bar',
  [Symbol.for('bar')]: 'baz',
  what: 'ever'
}

console.log([...foo])
// []

console.log(Object.keys(foo))
// ['what']

console.log(JSON.stringify(foo))
// {"what":"ever"}

for (let key in foo) {
  console.log(key)
  // 'what'
}

console.log(Object.getOwnPropertyNames(foo))
// ['what']

console.log(Object.getOwnPropertySymbols(foo))
// [Symbol(), Symbol('foo'), Symbol.for('bar')]