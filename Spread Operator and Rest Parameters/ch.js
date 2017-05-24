// demo 1
function concat () {
  return Array.prototype.slice.call(arguments).join(' ')
}
var result = concat('this', 'was', 'no', 'fun')
console.log(result)

// demo 2
// arguments 原型链指向对象原型，而非数组原型
function fn(){
    console.log(arguments.__proto__ == Object.prototype)
}

fn()
// true

// demo 3
function concat (...words) {
  return words.join(' ')
}
var result = concat('this', 'is', 'okay')
console.log(result)
// <- 'this is okay'

// demo 4
function sum (multiplier, base, ...numbers) {
  var sum = numbers.reduce((accumulator, num) => accumulator + num, base)
  return multiplier * sum
}
var total = sum(2, 6, 10, 8, 9)
console.log(total)

// demo 5
console.log(...[1, 2, 3])
// <- '1 2 3'

// demo 6
[...document.querySelectorAll('div')]
// <- [<div>, <div>, <div>]
