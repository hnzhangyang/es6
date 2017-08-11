# Number
## 目录
- [Binary-And-Octal-Literals](#Binary-And-Octal-Literals)
- [Number.isNaN](#Number.isNaN)
- [Number.isFinite](#Number.isFinite)
- [Number.parseInt](#Number.parseInt)
- [Number.parseFloat](#Number.parseFloat)
- [Number.isInteger](#Number.isInteger)
- [Number.EPSILON](#Number.EPSILON)
- [Number.MAX_SAFE_INTEGER](#Number.MAX_SAFE_INTEGER)
- [Number.MIN_SAFE_INTEGER](#Number.MIN_SAFE_INTEGER)
- [Number.isSafeInteger](#Number.isSafeInteger)

## Binary-And-Octal-Literals
在 ES5 乃至 ES3 中都有数字类型的二进制或八进制表示方法，在 ES5 中，你可以这样写：
``` javaScript
parseInt('101',2)
// 转化为二进制 5

parseInt('100', '8')
// 转化为八进制 64
```
在 ES6 中，只要加上特殊前缀，不使用 parseInt 方法也可以表示二进制、八进制。
``` javaScript
console.log(0b001)
// 二进制 1

console.log(0o010)
// 八进制 8
```

**0b** 代表二进制前缀，**0o** 代表八进制前缀，当然 **0B**、**0O** 也是可行的，不过推荐用小写字母。

## Number.isNaN

在 ES5 中有一个 global.isNaN 方法，与 Number.isNaN 方法很相似，它们都接受一个值与 null 比较，返回比较结果。

不同的是，global.isNaN 方法是用的是 value == NaN Number.isNaN 使用的是  value === NaN 比较。换言之，使用 global.isNaN 方法时，若 value 值不是 Number 类型，会先将其转换为 Number 类型，再进行比较，而 Number.isNaN 方法，则不会转换。
``` javaScript
isNaN('ponyfoo')
// 返回 true 因为 Number('ponyfoo') 为 NaN
isNaN(new Date())
// true
```

``` javaScript
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
```
结合 Number.isNaN ，以后我们想判断一个值是不是数字，可以这样写一个功能函数
``` javaScript
function isNumber (value) {
  return typeof value === 'number' && !Number.isNaN(value)
}
```
``` javaScript
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
```
## Number.isFinite
global.isFinite 在 ES3 就已经登陆了，它会将给定值与 Infinity, -Infinity 以及 NaN 进行比较，返回比较结果。
``` javaScript
isFinite(NaN)
// false
isFinite(Infinity)
// false
isFinite(-Infinity)
// false
```
与 global.isNaN 一样，global.isFinite 会将给定值先进行 Number() 转化，例如。
``` javaScript
isFinite(null)
// true, because Number(null) is 0
isFinite('10')
// true, because Number('10') is 10
```
而 Number.isFinite 则不会。
``` javaScript
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
```
## Number.parseInt
Number.parseInt 跟 global.parseInt 是一样的。
``` javaScript
Number.parseInt === global.parseInt
// true
```
对于 parseInt，有一点需要注意的是，它可以转化 二进制，八进制，十进制，十六进制的数。
```javaScript
parseInt('11',2)
// 3
parseInt('17',8)
// 15
parseInt('10',10)
// 10
parseInt('f',16)
// 15
```
并且对于十六进制的转化，可以使用特殊前缀，此时不需要填写基数。
``` javaScript
parseInt('0xf')
// 15
```
此时需要注意，只有十六进制能使用前缀，其他的都不行。
``` javaScript
parseInt('0b011')
// 0
parseInt('0b011', 2)
// 0
parseInt('0o800')
// 0
parseInt('0o800', 8)
// 0
```
## Number.parseFloat
跟 Number.parseInt 一样，Number.parseFloat 与 global.parseFloat 相同。
``` javaScript
Number.parseFloat === global.parseFloat
// true
```
## Number.isInteger
Number.isInteger 是ES6 提供的新 API，它判断给定值是否是**有限整数**。
``` javaScript
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
```
## Number.EPSILON
Number.EPSILON 表示 javaScript 里面数的最小值。
``` javaScript
Number.EPSILON
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// '0.00000000000000022204'
```
## Number.MAX_SAFE_INTEGER
Number.MAX_SAFE_INTEGER 表示 javaScript 中的最大整数值。
``` javaScript
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true
```
## Number.MIN_SAFE_INTEGER
Number.MIN_SAFE_INTEGER 表示 javaScript 中的最小整数值(负数)。
``` javaScript
Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true
```
## Number.isSafeInteger 
Number.isSafeInteger 表示给定值是不是一个安全的整数。
``` javaScript
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
```
