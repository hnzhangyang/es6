# Maps
## 目录
- [Map](#Map)
- [Map实例](#Map实例)
- [WeakMap](#WeakMap)
- [总结](#总结)
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
Map 实例具有以下方法或属性
- set
- get
- delete
- has
- size
- forEach
- clear
- keys
- values
- entries

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
Map 实例的 **键** 的判断标准是，该 **键** 是否是同一个引用地址，有些情况下可能会导致混淆，误认为两个 **键** 是同一个 **键**。
``` javaScript
var bar = ['value']
var foo = ['value']

var map = new Map()

map.set(bar,'value')

console.log(map.has(foo))
// false
```
以上的 foo 与 bar 虽然引用的结构一样，但是却是两个不同的引用地址，所以在 Map 中被当作是两个 **键**。 

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
同样的，数字 1 与字符串 '1',也属于不同的 **键**。
``` javaScript
var map = new Map()

map.set(1,'Symbol')

console.log(map.has('1')
// false
```
Map 实例的 **forEach** 方法，它可以遍历 Map 实例中所有的 **键值对**。
``` javaScript
var map = new Map()

map.set('foo','foo')
map.set('bar','bar')

map.forEach(function(key, value){
    console.log(key,value)
})
// foo foo
// bar bar
```

**entries** 方法用于输出 Map 实例中所有的 **键值对**。
``` javaScript
var map = new Map([
    ['foo', 'foo'], ['bar', 'bar']
])

console.log(...map.entries())
// ["foo", "foo"] ["bar", "bar"]
```
**clear** 方法清除 Map 实例中所有的 **键值对**。
``` javaScript
var map = new Map([['foo','foo']])

console.log(map.size)
// 1

map.clear()
console.log(map.size)
// 0
```
**keys** 和 **values** 方法用于返回 Map 实例中所有的 **键** ， **值**。
``` javaScript
var map = new Map([
    ['foo', 'foo'], ['bar', 'bar']
])

console.log(...map.keys())
// foo bar
console.log(...map.values())
// foo bar
```
## WeakMap
WeakMap 可以看作是 Map 的严格子集，它的 **键** 只能是引用类型，这意味着 6 种基本类型的 **键** 都是不允许的。
``` javaScript
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
```
同时，WeakMap 也不遵守 **iterable** 协议，这意味着相比 Map ， WeakMap 不能使用 **entries** ， **clear** ， **keys** ， **values** ，**forEach** , **size** 方法。WeakMap 能使用发方法有
- set
- get
- has
- delete
同时也支持构造函数快速设置 **键值对**。
```
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
```
这么多限制，WeakMap 要它有什么用？值得注意的是 WeakMap 只能保存 **引用类型** 的 **键**，所以一般我们利用这一特性让 WeakMap 成为目标对象不被浏览器垃圾回收机制回收的最后把关。

## 总结
Map 是 ES6 新提出的宽泛的 **键值对** 集合，Map 的 **键** 允许使用所有的类型，不单单是字符串与数字。Map 具有以下方法或属性。
- set
- get
- delete
- has
- size
- forEach
- clear
- keys
- values
- entries
WeakMap 可以看作是 Map 的严格子集，它的 **键** 只能是引用类型，并且 WeakMap 也不遵守 **iterable** 协议，它具有以下方法。
- set
- get
- has
- delete