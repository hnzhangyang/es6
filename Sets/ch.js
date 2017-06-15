// demo 1
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

// demo 2
var obj = {}
var set = new Set([1, 1, 1, obj, obj, obj])

console.log(set.size)
// 2

// demo 3
var foo = {}
var weakSet = new WeakSet([[], {}, document.body])

weakSet.add(foo)
console.log(weakSet.has(foo))
// true

weakSet.delete(document.body)
console.log(weakSet.has(document.body))
// false

// demo 4
var weakSet = new WeakSet()

weakSet.add(1)
// TypeError: Invalid value used in weak set
