// demo 1
Object.assign({}, { a: 1 })
// { a: 1 }

// demo 2
Object.assign({ a: 1 }, { a: 2 })
// { a: 2 }

// demo 3
Object.assign({ a: 1, b: 2 }, { a: 3 }, { c: 4 })
// { a: 3, b: 2, c: 4 }

// demo 4
Object.assign(Object.assign({ a: 1, b: 2 }, { a: 3 }), { c: 4 })
// { a: 3, b: 2, c: 4 }

// demo 5
var a = { b: 'c' }
Object.defineProperty(a, 'invisible', { enumerable: false, value: 'boo! ahhh!' })
Object.assign({}, a)
// { b: 'c' }

// demo 6
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]

// demo 7
Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
// { a: 'b', Symbol(c): 'd' }

// demo 8
var target = { a: { b: 'c', d: 'e' } }
var source = { a: { b: 'ahh!' } }
Object.assign(target, source)
// { a: { b: 'ahh!' } }

// demo 9
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false

// demo 10
-0 === +0
// true
Object.is(-0, +0)
// false

// demo 11
NaN === NaN
// false
Object.is(NaN, NaN)
// true

// demo 12
var a = {
  [Symbol('b')]: 'c',
  [Symbol('d')]: 'e',
  'f': 'g',
  'h': 'i'
}
Object.getOwnPropertySymbols(a)
// [Symbol(b), Symbol(d)]

// demo 13
Object.prototype.foo = 'foo'
