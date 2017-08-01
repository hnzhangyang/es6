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
