# Reflection
## 目录
- [介绍](#介绍)
- [方法](#方法)

## 介绍
同 Proxy 一样，reflect 也是用来作为对象的代理， reflect 会代理一些内部方法，比如 Object.defineProperty ，reflect 代理后的方法会变得更友好，比如说：

``` javaScript
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```
原生 Object.defineProperty 没有返回值，我们只能依靠 try...catch 语句判断代码是否执行成功，而 Reflect.defineProperty 方法通过返回 Boolean 值，表示承购或失败，这样就好很多。

## 方法
Reflect 是一个静态类型的对象，它的方法都是静态方法。Reflect 的推进还在进行中，目前支持的方法有 proxy 的全部方法:
- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.srtPrototypeOf(target, prototype)

具体 proxy 使用说明可以[到此](#https://github.com/hnzhangyang/es6/blob/master/Proxies/ch.md)查看

以后将会将更多的内部方法移入 Reflect ，比如 Object.keys。