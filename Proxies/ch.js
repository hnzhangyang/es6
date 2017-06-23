// demo 1
var target = {}
var handler = {} 

var proxy = new Proxy(target, handler)

// demo 2
var target = {}
var handler = {} 

var proxy = new Proxy(target, handler)

proxy.foo = 1
console.log(target.foo)
// 1

console.log(proxy.bar)
// undefined

// demo 3
var target = {}

var handler = {
    set(target, key, value) {
        console.log('I try to set property', key)
        return true
    },
    get(target, key) {
        console.log('I got', key)
    }
}

var proxy = new Proxy(target, handler)

proxy.a = 1
// I try to set property a
console.log(proxy.a)
// I got a
// 1

// demo 4
function getProxy (){
    var target = {}
    var handler = {
        set (target, key, value){
            console.log('set')
            return true
        },
        get (target, key){
            console.log('get')
            return target[key]
        }
    }
    return new Proxy(target, handler)
}

var proxy = getProxy()

// demo 5
var target = {}
var handler = {}
var {proxy, revoke} = Proxy.revocable(target, handler)

proxy.a = 'b'
console.log(proxy.a)
//  'b'

revoke()
revoke()
revoke()
console.log(proxy.a)
//  TypeError: illegal operation attempted on a revoked proxy

// demo 6
var handler = {
    has: function(target, key){
        if (key[0] === '_') {
            return false
        }
        return key in target
    }
}

var target = {
    foo: 'foo',
    _bar: 'bar'
}

var proxy = new Proxy(target,handler)

console.log('foo' in proxy)
// true
console.log('_bar' in proxy)
// false
console.log('_bar' in target)
// true

// demo 7
var handler = {
    deleteProperty: function(target, key){
        if(key[0] === '_'){
            return false
        }
        return true
    }
}

var target = {
    foo: 'foo',
    _bar: '_bar'
}

var proxy = new Proxy(target, handler)

delete proxy.foo
console.log('foo' in target)
// false

delete proxy._bar
console.log('_bar' in target)
// 'deleteProperty' on proxy: trap returned falsish for property '_bar'

// demo 8
var handler = {
    defineProperty: function(target, key, descriptor){
        return false
    }
}

var target = {}

var proxy = new Proxy(target, handler)

proxy.foo = 'foo'
// 'defineProperty' on proxy: trap returned falsish for property 'foo'

// demo 9
var handler = {
    enumerate: function(target){
        return Object.keys(target).filter(key => key[0] !== '_')[Symbol.iterator]()
    }
}

var target = {
    foo: 'foo',
    _bar: '_bar'
}

var proxy = new Proxy(target, handler)

for(var key in proxy){
    console.log(key)
}
// foo

// demo 10
var handler = {
    ownKeys (target) {
        return Reflect.ownKeys(target).filter(key => key[0] !== '_')
    }
}

var target = {
    _bar: 'foo',
    _prop: 'bar',
    [Symbol('secret')]: 'baz',
    pony: 'ponyfoo'
}
var proxy = new Proxy(target, handler)
for (let key of Object.keys(proxy)) {
    console.log(key)
    // 'pony'
}

// demo 11
var twice = {
    apply (target, ctx, args) {
        return Reflect.apply(...arguments) * 2
    }
}
function sum (left, right) {
    return left + right
}
var proxy = new Proxy(sum, twice)

console.log(proxy(1, 2))
//  6
console.log(proxy(...[3, 4]))
//  14
console.log(proxy.call(null, 5, 6))
//  22
console.log(proxy.apply(null, [7, 8]))
//  30

// demo 12
var handler = {
  construct (target, args) {
    return new target(...args)
  }
}

function target (a, b, c) {
  this.a = a
  this.b = b
  this.c = c
}
var proxy = new Proxy(target, handler)
console.log(new proxy(1,2,3))
//  { a: 1, b: 2, c: 3 }

// demo 13
var handler = {
    getPrototypeOf() {
        return Array.prototype
    }
}

var foo = {}

var proxy = new Proxy(foo, handler)

console.log(proxy instanceof Array)
// true

// demo 14
var handler = {
    setPrototypeOf(target, proto) {
        Object.setPrototypeOf(target, proto)
    }
}

var foo = function () { }
var bar = {}

var proxy = new Proxy(foo, handler)

proxy.setPrototypeOf(proxy, bar)

console.log(proxy.prototype === bar)
// true

// demo 15
var handler = {
  isExtensible (target) {
    if (Math.random() > 0.1) {
      throw new Error('gotta love sporadic obscure errors!')
    }
    return Object.isExtensible(target)
  }
}
var target = {}
var proxy = new Proxy(target, handler)
console.log(Object.isExtensible(proxy))
//  true
console.log(Object.isExtensible(proxy))
//  true
console.log(Object.isExtensible(proxy))
//  true
console.log(Object.isExtensible(proxy))
//  Error: gotta love sporadic obscure errors!

// demo 16
var mustExtend = new WeakSet()
var handler = {
  preventExtensions (target) {
    if (!mustExtend.has(target)) {
      Object.preventExtensions(target)
    }
    return !Object.isExtensible(target)
  }
}
var target = {}
var proxy = new Proxy(target, handler)
mustExtend.add(target)
Object.preventExtensions(proxy)
//  TypeError: proxy preventExtensions handler returned false

// demo 17
var handler = {
  getOwnPropertyDescriptor (target, key) {
    invariant(key, 'get property descriptor for')
    return Object.getOwnPropertyDescriptor(target, key)
  }
}
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`)
  }
}
var target = {}
var proxy = new Proxy(target, handler)
Object.getOwnPropertyDescriptor(proxy, '_foo')
//  Error: Invalid attempt to get property descriptor for private "_foo" property