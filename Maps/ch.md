# Maps
## 目录
- [Map](#Map)
- [Map实例](#Map实例)
## Map
对象是键值对的集合，**键** 只能是字符串，**值** 可以是任意值，ES6 Map扩展了这一方面，Map 的 **键和值** 都可以是任意值。
``` javaScript
var map = new Map()
var foo = ['bar']

map.set(foo,'Im foo')
console.log(map.get(foo))
// Im foo
```
上面我们通过 Map 构造函数生成了一个 Map 实例，并且在实例上通过 set 方法设置了一个变量作为 map 的 **键**。并通过实例的 get 方法获取到了这个 **键** 的 **值**。

在普通对象中，如果给对象的 **键** 赋值一个变量，会调用该变量的 **toString** 方法，使其变成字符串。
``` javaScript
var obj = new Object()
var foo = ['foo']

obj[foo] = 'im foo'
console.log(obj);
// Object {foo: "im foo"}
console.log(foo.toString())
// foo
```
实际上通过 Map 构造函数传入一个支持  [iterator](https://github.com/hnzhangyang/es6/blob/master/Iterators/ch.md)  协议的对象，可以快速定义 Map 的内容。（还记的 [iterator](https://github.com/hnzhangyang/es6/blob/master/Iterators/ch.md) 协议吧？这里用数组表示）。
``` javaScript
var arr = [
    [ 'foo', 'foo' ],
    [ 'bar', 'bar' ]
]

var map = new Map(arr)

console.log(map.get('foo'))
// foo
console.log(map.get('bar'))
// bar
```
## Map实例
通过 Map 构造函数创建 Map 实例。
``` javaScript 
var map = new Map()
```
Map 实例具有以下方法
- set
- get
- delete
- has
- size

其中 **size** 是只读属性。并不像数组的 **length** 属性一样可以改变其长度。
``` javaScript
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
```
在 **set** 方法中，给同一个 **键** 赋值会覆盖上一个值。
``` javaScript
var map = new Map()

map.set('foo','foo')
map.set('foo','bar')

console.log(map.get('foo'))
// bar
```

在 javaScript 中，**NaN** 与 **NaN** 既不相等，也不全等。但是在 Map 中，**NaN** 总是指向同一个 **键**。
``` javaScript
var map = new Map()

map.set(NaN,'foo')
map.set(NaN,'bar')

console.log(map.get(NaN))
// bar
```
而， javaScript 中，**null** 是一个空指针，**undefined** 是一个空指针的引用，这两者非严格相等，但是在 Map 中是作为两个不等的 **键** 。
``` javaScript
var map = new Map()

console.log(null == undefined)
// true

map.set(null,'null')
map.set(undefined,'undefined')

console.log(map.get(null))
// null
console.log(map.get(undefined))
// undefined
```  
Symbol 总是不相等，总是作为不相等的 **键**。
``` javaScript
var map = new Map()

map.set(Symbol(),'Symbol')

console.log(map.has(Symbol())
// false
```