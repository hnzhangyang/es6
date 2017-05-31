# classes
## 原型链
想象我们声明了一个**不具有任何属性与方法**空对象。
``` javaScript
var foo = {}

```
但是为什么可以调用 toString 方法。
``` javaScript
console.log(foo.toString())
// "[object Object]"
```
的确 foo 对象本身并不具有 toString 方法， toString 方法定义在 foo 的 **构造函数** Object 的原型 prototype 上。
``` javaScript
foo.toString === Object.prototype.toString
// true
```
实际上，当我们调用 foo.toString 的时候，内部机制检测到了 foo 是一个空对象，并没有 toString 方法，于是沿着 \_\_proto\_\_ 查找到了 Object.prototype 对象，调用了其中的 toString 方法。

**原型链的本质就是对象沿着 \_\_proto\_\_ 逐级向上查找的过程**
 
每个对象都拥有 \_\_proto\_\_ 属性 ，指向该对象构造函数的原型。
## 继承
我们通过原型链来实现继承。
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

我们把 Animal 叫做 **构造函数** ,每个 **构造函数** 的实例都具有 constructor 属性，指向实例的 **构造函数**。




