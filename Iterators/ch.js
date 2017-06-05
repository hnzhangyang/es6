var foo = 'hi'

var iterator = foo[Symbol.iterator]()


console.log(iterator.next())

console.log(iterator.next())

console.log(iterator.next())
