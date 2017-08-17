// demo 1
function cast ()
  return Array.prototype.slice.call(arguments)
}
cast('a', 'b')
// ['a', 'b']

// demo 2
function cast ()
  return [].slice.call(arguments)
}

// demo 3
function cast ()
  return [...arguments]
}

// demo 4
[...$('div')]
TypeError: $(...)[Symbol.iterator] is not a function

// demo 5
[...$('div')]
TypeError: $(...)[Symbol.iterator] is not a function

// demo 6
Array.from($('div'))
// [<div>, <div>, <div>, ...]

// demo 7
[].slice.call(document.querySelectorAll('div'), 1)

// demo 8
function typesOf () {
  return Array.from(arguments, value => typeof value)
}
typesOf(null, [], NaN)
// ['object', 'object', 'number']

// demo 9
new Array()
// []
new Array(undefined)
// [undefined]
new Array(1)
// [undefined x 1]
new Array(3)
// [undefined x 3]
new Array(1, 2)
// [1, 2]
new Array(-1)
// RangeError: Invalid array length

// demo 10
Array.of()
// []
Array.of(undefined)
// [undefined]
Array.of(1)
// [1]
Array.of(3)
// [3]
Array.of(1, 2)
// [1, 2]
Array.of(-1)
// [-1]

// demo 11
Array.of = function of () {
  return Array.prototype.slice.call(arguments)
}
Array.prototype.slice.call([1, 2, 3])
// [1, 2, 3]
Array.of(1, 2, 3)
// [1, 2, 3]

// demo 12
Array.prototype.copyWithin(target, start, end)

// demo 13
var items = [1, 2, 3, ,,,,,,,]
// [1, 2, 3, undefined x 7]

items.copyWithin(6, 1, 3)
// [1, 2, 3, undefined × 3, 2, 3, undefined × 2]

// demo 14
['a', 'b', 'c'].fill(0)
// [0, 0, 0]
new Array(3).fill(0)
// [0, 0, 0]

// demo 15
['a', 'b', 'c',,,].fill(0, 2)
// ['a', 'b', 0, 0, 0]
new Array(5).fill(0, 0, 3)
// [0, 0, 0, undefined x 2]

// demo 16
new Array(3).fill({})
// [{}, {}, {}]

// demo 17
new Array(3).fill(function foo () {})
// [function foo () {}, function foo () {}, function foo () {}]

// demo 18
[1, 2, 3, 4, 5].find(item => item > 2)
// 3
[1, 2, 3, 4, 5].find((item, i) => i === 3)
// 4
[1, 2, 3, 4, 5].find(item => item === Infinity)
// undefined

// demo 19
[1, 2, 3, 4, 5].find(item => item > 2)
// 2
[1, 2, 3, 4, 5].find((item, i) => i === 3)
// 3
[1, 2, 3, 4, 5].find(item => item === Infinity)
// -1

// demo 20
for (let key of [1, 2, 3].keys()) {
  console.log(key)
  // 0
  // 1
  // 2
}

[...new Array(3).keys()]
// [0, 1, 2]
Object.keys(new Array(3))
// []

// demo 21
[...[1, 2, 3].values()]
// [1, 2, 3]

// demo 22
[...['a', 'b', 'c'].entries()]
// [[0, 'a'], [1, 'b'], [2, 'c']]

// demo 23
[...['a', 'b', 'c'][Symbol.iterator]()]
// ['a', 'b', 'c']
