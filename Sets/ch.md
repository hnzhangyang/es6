# Sets
## 目录
- [Set](#set)
- [WeakSet](#WeakSet)

## Set
Set 跟 [Map](#https://github.com/hnzhangyang/es6/blob/master/Maps/ch.md) 很像。
- Set 实例与构造函数也遵守 **iterable** 协议
- Set 也拥有 **size** 属性
- Set 也能储存任意值
- Set 的值必须唯一
- 在 Set 中 NaN 与 NaN 也相等

有所不同的是
- Set 不是 **键值对**，它只能储存 **值**，更像是数组。
- Set 没有 **set** 方法，取而代之的是 **add**（这个很好理解）。
- set[Symbol.iterator !== set.entries]
- set[Symbol.iterator] === set.values
- set.keys === set.values
- set.entries() 返回一个遵守 **iterator** 协议的列表序列，像 [value, value]

Set 具有以下方法或属性
- keys
- values
- entries
- forEach
- add
- has
- delete
- clear

为什么在 Map 中是 **set** 方法，而到了 Set 中却使用 **add** 方法？你肯定也不想使用这样的表达式吧， **set.set** 。
``` javaScript
var set = new Set([1,2,3,4])

console.log(set.size)
// 4
console.log(...set)
// 1 2 3 4
console.log(set.has(1))
// true

set.add(5)
console.log(set.values())
// SetIterator {1, 2, 3, 4, 5}
console.log(set.keys())
// SetIterator {1, 2, 3, 4, 5}
console.log(set.entries())
// SetIterator {[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]}
set.delete(5)
console.log(set.has(5))
// false

set.forEach(function(key, value){
    console.log(key, value)
})
// 1 1
// 2 2
// 3 3
// 4 4

set.clear()
console.log(set.size)
//0
```
需要注意的是，set 实例中储存的值是唯一的，这意味着它会忽视重复的值。
``` javaScript
var obj = {}
var set = new Set([1, 1, 1, obj, obj, obj])

console.log(set.size)
// 2
```
## WeakSet
就像 **WeakMap** 与 **Map** 的关系，WeakSet 也是 Set 的严格类型的子集，它不遵守 iterable 协议，并且 **值** 值能使 引用类型。

它只具有以下方法。
- add
- has
- delete
``` javaScript
var foo = {}
var weakSet = new WeakSet([[], {}, document.body])

weakSet.add(foo)
console.log(weakSet.has(foo))
// true

weakSet.delete(document.body)
console.log(weakSet.has(document.body))
// false
```
WeakSet 的 **值** 也会忽略重复，并且只能为引用类型。
``` javaScript
var weakSet = new WeakSet()

weakSet.add(1)
// TypeError: Invalid value used in weak set
```