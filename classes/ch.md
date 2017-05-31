# classes
## 原型链
想象我们声明了一个空对象。
``` javaScript
var foo = {}

```
foo 是一个**不具有任何属性与方法**的空对象。

却可以调用 toString 方法。
``` javaScript
console.log(foo.toString())
// "[object Object]"
```
实际上 toString 定义在 foo 的 **构造函数** Object 的原型 prototype 上。
``` javaScript
foo.toString === Object.prototype.toString
// true
```
当我们调用 foo.toString 的时候，内部机制检测到了 foo 是一个空对象，并没有 toString 方法，于是沿着 \_\_proto\_\_ 查找到了 Object.prototype 对象，调用了其中的 toString 方法

**原型链的本质就是对象沿着 \_\_proto\_\_ 逐级向上查找的过程**
 
每个对象都拥有 \_\_proto\_\_ 属性 ，指向该对象构造函数的原型。

在 ES5 中我们通过原型链来实现继承。
``` javaScript
function Animal(){
    this.num = 0
}
Animal.prototype.count = function(){
    console.log(this.num)
}

var instance = new Animal()
instance.count();
// 0
```
在上面的例子中 instance 继承了 Animal 的方法 count ，每个对象都有个 \_\_proto\_\_ 的内部指针指向该对象**构造函数**的原型。
``` javaScript
instance.__proto__ === Animal.prototype
// true
```
我们把 Animal 叫做**构造函数**,每个**构造函数**的实例都具有 constructor 属性，指向实例的**构造函数**。
``` javaScript
instance.constructor === Animal
// true
```
这是因为，在 javaScript 继承的内部机制中，**构造函数**的原型链有一个 constructor 属性，指向**构造函数**本身。
``` javaScript
Animal.prototype.constructor === Animal
// true
```
实际上，每个对象的 \_\_proto\_\_  属性就是我们说的原型链，当我们使用 instance.constructor 时， instance 本身并不具有 constructor 属性，于是 instance 沿着 \_\_proto\_\_ 找到了 Animal.prototype ，在其中又找到了 constructor 属性，于是输出了 Animal 本身。

如果查找的是 instance.toString 方法，那么 Animal.prototype 也是没有的，于是又沿着 Animal.prototype.\_\_proto\_\_ 找到了 Object.prototype ，从中找到了 toString 方法。

