// demo 1
parseInt('101',2)
// 转化为二进制 5

parseInt('100', '8')
// 转化为八进制 64

// demo 2
console.log(0b001)
// 二进制 1

console.log(0o010)
// 八进制 8

// demo 3
isNaN('ponyfoo')
// 返回 true 因为 Number('ponyfoo') 为 NaN
isNaN(new Date())
// true

// demo 4
Number.isNaN(123)
// false
Number.isNaN(Infinity)
// false
Number.isNaN('ponyfoo')
// false
Number.isNaN(NaN)
// true
Number.isNaN('pony'/'foo')
// true, 因为 'pony'/'foo' 为 NaN

// demo 5
function isNumber (value) {
  return typeof value === 'number' && !Number.isNaN(value)
}

// demo 6
isNumber(1)
//  true
isNumber(Infinity)
//  true
isNumber(NaN)
// false
isNumber('ponyfoo')
// false
isNumber(new Date())
// false

// demo 7
isFinite(NaN)
// false
isFinite(Infinity)
// false
isFinite(-Infinity)
// false

// demo 8
isFinite(null)
// true, because Number(null) is 0
isFinite('10')
// true, because Number('10') is 10

// demo 9
Number.isFinite(NaN)
// false
Number.isFinite(Infinity)
// false
Number.isFinite(-Infinity)
// false
Number.isFinite(null)
// false
Number.isFinite(0)
// true

// demo 10
Number.parseInt === global.parseInt
// true

// demo 11
parseInt('11',2)
// 3
parseInt('17',8)
// 15
parseInt('10',10)
// 10
parseInt('f',16)
// 15

// demo 12
parseInt('0xf')
// 15

// demo 13
parseInt('0b011')
// 0
parseInt('0b011', 2)
// 0
parseInt('0o800')
// 0
parseInt('0o800', 8)
// 0

// demo 14
Number.parseFloat === global.parseFloat
// true

// demo 15
console.log(Number.isInteger(Infinity))
// false
console.log(Number.isInteger(-Infinity))
// false
console.log(Number.isInteger(NaN))
// false
console.log(Number.isInteger(null))
// false
console.log(Number.isInteger(0))
// true
console.log(Number.isInteger(-10))
// true
console.log(Number.isInteger(10.3))
// false

// demo 16
Number.EPSILON
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// '0.00000000000000022204'

// demo 17
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true

// demo 18
Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true

// demo 19
Number.isSafeInteger('a')
// false
Number.isSafeInteger(null)
// false
Number.isSafeInteger(NaN)
// false
Number.isSafeInteger(Infinity)
// false
Number.isSafeInteger(-Infinity)
// false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1)
// false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER)
// true
Number.isSafeInteger(1)
// true
Number.isSafeInteger(1.2)
// false
Number.isSafeInteger(Number.MAX_SAFE_INTEGER)
// true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)
// false