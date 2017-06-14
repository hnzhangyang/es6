// demo 1
var map = new Map()
var foo = ['bar']

map.set(foo,'Im foo')
console.log(map.get(foo))
// Im foo

// demo 2
// var obj = new Object()
var foo = ['foo']

obj[foo] = 'im foo'
console.log(obj);
// Object {foo: "im foo"}
console.log(foo.toString())
// foo

// demo 3
var arr = [
    [ 'foo', 'foo' ],
    [ 'bar', 'bar' ]
]

var map = new Map(arr)

console.log(map.get('foo'))
// foo
console.log(map.get('bar'))
// bar

// demo 4
var map = new Map()

// demo 5
var map = new Map([['foo','foo']])
var arr = ['foo']

console.log(map.size)
// 1
console.log(arr.length)
// 1

map.size = 0
console.log(map.has('foo'))
// true

arr.length = 0
console.log(arr)
// []

// demo 6
var map = new Map()

map.set('foo','foo')
map.set('foo','bar')

console.log(map.get('foo'))
// bar

// demo 7
var bar = ['value']
var foo = ['value']

var map = new Map()

map.set(bar,'value')

console.log(map.has(foo))
// false

// demo 8
var map = new Map()

map.set(NaN,'foo')
map.set(NaN,'bar')

console.log(map.get(NaN))
// bar

// demo 9
var map = new Map()

console.log(null == undefined)
// true

map.set(null,'null')
map.set(undefined,'undefined')

console.log(map.get(null))
// null
console.log(map.get(undefined))
// undefined

// demo 10
var map = new Map()

map.set(Symbol(),'Symbol')

console.log(map.has(Symbol())
// false

// demo 11
var map = new Map()

map.set(1,'Symbol')

console.log(map.has('1')
// false

// demo 12
var map = new Map()

map.set('foo','foo')
map.set('bar','bar')

map.forEach(function(key, value){
    console.log(key,value)
})
// foo foo
// bar bar

// demo 13
var map = new Map([
    ['foo', 'foo'], ['bar', 'bar']
])

console.log(...map.entries())
// ["foo", "foo"] ["bar", "bar"]

// demo 14
var map = new Map([['foo','foo']])

console.log(map.size)
// 1

map.clear()
console.log(map.size)
// 0

// demo 15
var map = new Map([
    ['foo', 'foo'], ['bar', 'bar']
])

console.log(...map.keys())
// foo bar
console.log(...map.values())
// foo bar

// demo 16
var map = new WeakMap()

map.set(1,'value')
//  Invalid value used as weak map key
map.set('1','value')
//  Invalid value used as weak map key
map.set(true,'value')
//  Invalid value used as weak map key
map.set(undefined,'value')
//  Invalid value used as weak map key
map.set(null,'value')
//  Invalid value used as weak map key
map.set(Symbol(),'value')
// Invalid value used as weak map key

// demo 17
var foo = {}
var bar = {}

var weakMap = new WeakMap([
    [foo, 'foo'], [bar, 'bar']
])

console.log(weakMap.has(foo))
// true

weakMap.delete(foo)
console.log(weakMap.has(foo))
// false

weakMap.set(foo, 'value')
console.log(weakMap.get(foo))
// value