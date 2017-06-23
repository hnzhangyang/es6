# Proxies
## 目录
- [Proxy](#Proxy)
- [Proxy.revocable](#Proxy.revocable)
- [handler](#handler)
    - [has](#has)
    - [deleteProperty](#deleteProperty)
    - [defineProperty](#defineProperty)
    - [enumerate](#enumerate)
    - [ownkeys](#ownkeys)
    - [apply](#apply)
- [进阶](#进阶)
    - [construct](#construct)
    - [getPrototypeOf](#getPrototypeOf)
    - [setPrototypeOf](#setPrototypeOf)
    - [isExtensible](#isExtensible)
    - [preventExtensions](#preventExtensions)
    - [getOwnPropertyDescriptor](#getOwnPropertyDescriptor)
## Proxy
Proxy 译为代理，它可以代理对象属性被访问时的行为。
``` javaScript
var target = {}
var handler = {} 

var proxy = new Proxy(target, handler)
```
我们通过构造函数 Proxy 生成一个对象的代理，Proxy 接受两个参数，第一个参数是 **被代理的对象**。第二个参数是 **被代理的行为**。

上面的代码我们的 handler 只是设置了一个空对象，这时 proxy 只是简单的返回操作结果。
``` javaScript
var target = {}
var handler = {} 

var proxy = new Proxy(target, handler)

proxy.foo = 1
console.log(target.foo)
// 1

console.log(proxy.bar)
// undefined
```
一般来说，我们可以代理对象的 **set** 和 **get**。
``` javaScript
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
```
代理 **set** 的时候，**return true** 表示设置成功。 **return false** 表示设置失败，此时在严格模式中，会抛出错误，正常模式中则是默认设置失败，不会抛出错误。

值得注意的是，被代理的行为只能是通过 **代理对象** 访问才有效，直接在 target 对象上读取属性代理行为是无效的，所以有时候我们需要隐藏 target 对象。
``` javaScript
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
```
上述代码通过一个函数生成 proxy 成功隐藏了 target 对象。
## Proxy.revocable
Proxy.revocable 与 Proxy 很相似，它返回两个对象 **proxy** 与 **revoke**。

其中 **proxy** 就是上述的代理实例，**revoke** 是一个方法，它可以撤销所有的代理。
``` javaScript
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
```
## handler
除了 **set** 和 **get**，handler 还有很多有意思的方法。
- has
- deleteProperty
- defineProperty
- enumerate
- ownkeys
- apply

### has
**has** 用于 **in** 操作符，可以控制显示隐藏目标对象在 **in** 操作符时的属性。

**return true** 表示存在这个属性，**return false** 表示不存在这个属性，不管属性是否真实存在。
``` javaScript
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
```
上面的代码中通过 handler 的 **has** 方法，控制了在 in 操作符的检测中，私有属性被隐藏。

### deleteProperty
**deleteProperty** 用于 **delete** 操作符，控制特性属性是否能被删除。

**return true** 表示删除，**return false** 表示阻止删除。
``` javaScript
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
``` 
上面代码通过设置 **deleteProperty** 阻止了对象私有属性的删除。

### defineProperty
**defineProperty** 用于 **Object.defineProperty** 方法，控制设置对象属性是否成功。

**return true** 表示成功，**return false** 表示失败。
``` javaScript
var handler = {
    defineProperty: function(target, key, descriptor){
        return false
    }
}

var target = {}

var proxy = new Proxy(target, handler)

proxy.foo = 'foo'
// 'defineProperty' on proxy: trap returned falsish for property 'foo'
```
### enumerate
**enumerate** 用于 **for...in** 循环，可以通过事先返回一个 **iterator**，屏蔽掉某些属性。
``` javaScript
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
```
还记的 **[Symbol.iterator]()** 吗？ 它是数组的 **iterator** 方法，返回一个 **iterator** 对象。

上述代码我们通过 **enumerate** 防止了私有属性被 **for...in** 循环遍历到。

### ownkeys
**ownkeys** 用于以下操作符
- Object.getOwnPropertyNames()
- Object.getOwnPorpertySymbols()
- Object.keys()
- Reflect.ownKeys()

通过事先返回一个数组，防止某些属性或键，被上述方法访问到。
``` javaScript
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
```

### apply
**apply** 用于拦截方法的调用。**apply** 接受三个参数。
- target 被调用的方法本身
- ctx 作用域
- args 方法被调用时的参数

下面的代码通过 **apply** 拦截，给每个结果乘以2。
```javaScript
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
```
## 进阶
这里还有一些关于 **Proxy** 的内容需要掌握。
- construct
- getPrototypeOf
- setPrototypeOf
- isExtensible
- preventExtensions
- getOwnPropertyDescriptor

### construct
**construct** 用来定义 **new proxy** 时的行为。
``` javaScript
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
```
### getPrototypeOf
定义 **handler.getPrototypeOf** 方法可以拦截下面的属性或方法。
- **Object.prototype__proto__** 属性
- **Object.prototype.isPrototypeOf()** 方法
- **Object.getPrototypeOf()** 方法
- **Reflect.getPrototypeOf()** 方法
- **instanceof** 操作符

例如你可以用 **handler.getPrototypeOf** 让对象假扮成是一个数组的实例。
``` javaScript
var handler = {
    getPrototypeOf() {
        return Array.prototype
    }
}

var foo = {}

var proxy = new Proxy(foo, handler)

console.log(proxy instanceof Array)
// true
```

### setPrototypeOf
**setPrototypeOf** 用来追踪 **Object.setPrototypeOf**。
``` javaScript
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
```
### isExtensible
**handler.isExtensible** 用来追踪 ***Object.isExtensible*。
``` javaScript
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
```

### preventExtensions
**hander.preventExtensions** 用来追踪 **Object.preventExtensions**。
``` javaScript
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
```
### getOwnPropertyDescriptor
**handler.getOwnPropertyDescriptor** 用来追踪 **Object.getOwnPropertyDescriptor**。
``` javaScript
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
```