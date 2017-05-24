function sum (multiplier, base, ...numbers) {
  var sum = numbers.reduce((accumulator, num) => accumulator + num, base)
  return multiplier * sum
}
var total = sum(2, 6, 10, 8, 9)
console.log(total);

