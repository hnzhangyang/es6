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