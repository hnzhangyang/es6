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