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
