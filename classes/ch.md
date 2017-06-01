# classes
## 目录
- [原型链](#原型链)
- [继承](#继承)
- [构造函数](#构造函数)
- [class](#class)
- [static](#static)
- [extends](#extends)
- [总结](#总结)
## 原型链
想象我们声明了一个**不具有任何属性与方法**空对象。
``` javaScript
var foo = {}

```
但是为什么可以调用 toString 方法？
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

每个对象都拥有 \_\_proto\_\_ 属性 ，指向该对象 **构造函数** 的原型。
## 继承
上面我们说到 **原型链的本质就是对象沿着 \_\_proto\_\_ 逐级向上查找的过程** ，而继承就是 **改变对象 \_\_proto\_\_ 指向的过程**。

回到第一个例子， foo 对象的构造函数是 Object 。
``` javaScript
var foo = {}
foo.constructor === Object
// true
```
此时 foo 的原型链 \_\_proto\_\_ 只有两级。
- 1、foo 对象本身
- 2、Object.prototype 对象

 如果在Object.prototype 也没有的属性，那么 foo 中也调用不到了。
``` javaScript
typeof Object.prototype.a
// "undefined"
typeof foo.a
// "undefined"
```
当我们使用自定义的 **构造函数** 时，原型链有三级
``` javaScript
function Animal(){
    this.num = 0
}
Animal.prototype.count = function(){
    console.log(this.num)
}

var instance = new Animal()
instance.count()
// 0
console.log(instance.toString())
// [object Object]
```
当我们调用 instance.count 方法时，instance本身并没有 count 方法，于是原型链沿着  instance.\_\_proto\_\_ 找到了 Animal.prototype ，在其中找到了 count 方法。

当我们调用 instance.toString 方法时，同样的 instance 本身并不具有 toString 方法，并且 Animal.prototype 也不具有 toString 方法。但是有意思的是在 javaScript 中，一切皆对象。Animal.prototype 也不例外，在 Animal.prototype 找不到的方法，会沿着 Animal.prototype.\_\_proto\_\_ 再次向上查找，找到了 Object.prototype ,并在其中找到了 toString。

此时 instance 的原型链如下
- 1、instance 对象本身
- 2、Animal.prototype 对象
- 3、Object.prototype 对象

其实改变原型链并不一定需要 **构造函数**，我们可以手动指定原型链。
``` javaScript
var foo = {}
var bar = {
    paint(){
        console.log('hi')
    }
}
foo.__proto__ = bar
foo.paint()
// hi
```
此时的 foo 对象，原型链也是三级，实际上可以无限级，不停的改变 \_\_proto\_\_ 指向就可以了，这里不演示了。
- 1、foo 对象本身
- 2、bar 对象
- 3、Object.prototype 对象

可见不管什么情况下对象的原型链，最终都指向兜底儿对象
Object.prototype。而 Object.prototype.\_\_proto\_\_ 为 null
``` javaScript
console.log(Object.prototype.__proto__);
// null
```
你可能想问 Object.prototype.\_\_proto\_\_ 能不能改变指向，实际上是不可以的，有一个循环调用的问题（自己思考）。
``` javaScript
var foo = {}
var bar = {
    paint(){
        console.log('hi')
    }
}
Object.prototype.__proto__ = bar
// Cyclic __proto__ value
```

## 构造函数
一般情况下，我们通过原型链来实现继承，手段是 **构造函数**。
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

我们把 Animal 叫做 **构造函数** 。 Animal 是我们自己定义的 **构造函数** 。实际上 ECMA 也为我们定义了一些常用全局的构造函数。
- String
- Number
- Object
- Function
- Array
- ...

构造函数的用法很简单。
``` javaScript
var instance = new Animal()
```
当我们调用诸如 new Animal() 语法时，程序内部进行了一下五步操作。
- 1、新建一个空对象 
- 2、Animal 函数的 this 值指向该新对象
- 3、执行 Animal 函数
- 4、新对象 \_\_proto\_\_  指向 Animal.prototype
- 5、返回该新对象

知道为什么构造函数是 “函数” 了吧，因为只有函数具有 new 语法，而且自带可继承的 prototype 对象。

因为在 new 的时候，改变了对象的 \_\_proto\_\_ 指向，其实也就是改变了对象可通过原型链查找的方法，这样就做到了复用，一个构造函数可以有多个实例。
``` javaScript
var instance1 = new Animal()
var instance2 = new Animal()
var instance3 = new Animal()
```
构造函数其实也是普通函数，也可以不通过 new 而直接调用。一般情况下以首字母大写来表明与普通函数的区别。
``` javaScript
Animal()
```
上面说到每个函数都具有一个可被继承的 prototype 属性，这个属性自带一个 constructor 指针，指向该函数本身。
``` javaScript
function Bar(){
    // some code    
}
console.log(Bar.prototype.constructor === Bar)
// true
```
这个属性自动被该 **构造函数** 的实例继承。
``` javaScript
function Bar(){
    // some code    
}
var instance = new Bar()
console.log(instance.constructor === Bar)
// true
```
## class
复习了 javaScript 中的原型链和继承之后，现在可以学习下 ES6 关于继承的语法糖 class 了。

在以前，我们一般通过 **构造函数** 实现继承。
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
这种基于原型的写法可能让初学者感到不适，于是 ES6 中有了以下语法糖。
```
class Animal {
    constructor (){
        this.num = 0
    }

    count (){
        console.log(this.num)
    }
}

var instance = new Animal()
instance.count();
// 0
```
- 1、class 后面跟 类名，每个类都必须拥有一个 constructor 方法，如果没有指定，会自动分配一个空函数给 constructor。
- 2、类的内部每个方法不需要用逗号分离，反而使用了的话会报错

这样的写法简单明确，隐藏了基于原型的继承时的晦涩的语法。

实际上 class 简单来说就可以理解是声明一个构造函数，它具有构造函数的很多特性。
``` javaScript
class Animal {
    constructor (){
        this.num = 0
    }

    count (){
        console.log(this.num)
    }
}

console.log(typeof Animal.prototype.count)
// function
console.log(Animal.prototype.constructor === Animal)
// true
```
## static
**构造函数** 除了有可继承的 prototype 方法外，我们还希望它能拥有一些不可继承的静态方法。
``` javaScript
function Animal(){
    this.num = 0
}
Animal.reduce = function(){
    this.num = this.num - 1
}
console.log(typeof Animal.reduce)
// function
``` 
在 classes 中，除了直接给 Animal 添加属性，还可以更直观的用到 class 的 static 方法。
``` javaScript
class Animal {
    constructor (){
        this.num = 0
    }

    count (){
        console.log(this.num)
    }

    static reduce (){
        this.num = this.num - 1
    }
}

console.log(typeof Animal.count)
// undefined
console.log(typeof Animal.reduce)
// function
```
## extends
还记的[继承](#继承)一节中说到过，继承就是 **改变对象 \_\_proto\_\_ 指向的过程**。所以在以前的代码中，我们想要让一个 **构造函数** 继承另一个 **构造函数** 的属性和方法，需要这样写。
``` javaScript
function Foo (){}
Foo.prototype.showFoo = function(){
    console.log('Foo')
}

function Bar (){}
Bar.prototype = new Foo()
Bar.prototype.showBar = function(){
    console.log('Bar')
}

var instance = new Bar()
instance.showFoo()
// Foo
instance.showBar()
// Bar
console.log(instance.__proto__ === Bar.prototype)
// true
console.log(Bar.prototype.__proto__ === Foo.prototype)
// true
```
此时 instance 的原型链有四级。
- 1、instance 对象本身
- 2、Bar.prototype 对象
- 3、Foo.prototype 对象
- 4、Object.prototype 对象

这样的语法初看起来既不易懂，也不美观，在 classes 中用 extends 关键字来继承就显得好用很多。
``` javaScript
class Foo {
    constructor (){}
    showFoo (){
        console.log('Foo')
    }
}

class Bar extends Foo {
    constructor (){
        super()
    }
    showBar (){
        console.log('Bar')
    }
}

var instance = new Bar()
instance.showFoo()
// Foo
instance.showBar()
// Bar
```
classes 中的 extends 语法简单来说就是在 原型链继承的基础上封装来的，同原型链继承一样， Bar.prototype.\_\_proto\_\_  同样指向 Foo.prototype。
``` javaScript
class Foo {
    constructor (){}
    showFoo (){
        console.log('Foo')
    }
}

class Bar extends Foo {
    constructor (){
        super()
    }
    showBar (){
        console.log('Bar')
    }
}

console.log(instance.__proto__ === Bar.prototype)
// true
console.log(Bar.prototype.__proto__ === Foo.prototype)
// true
```
你可能注意到了在 Bar 的 构造函数中有一个 super() 字样。这个 super() 不可缺少，因为子类是没有
this 对象的，需要借助父类的 this 对象。在子类的构造函数中调用 super，其实就是调用父类 constructor 方法。

super 对象还可以引用父类的其他公共方法。
```
class Foo {
    constructor (){}
    showFoo (){
        console.log('Foo')
    }
}

class Bar extends Foo {
    constructor (){
        super()
    }
    showBoth (){
        super.showFoo()
        console.log('Bar')
    }
}

var instance = new Bar()
instance.showBoth()
// Foo
// Bar
```
## 总结
在 classes 这一章中，先阐述了 javaScript 原型链和继承以及构造函数相关的知识。
- 1、原型链的本质就是对象沿着 \_\_proto\_\_ 逐级向上查找的过程
- 2、继承就是改变对象 \_\_proto\_\_ 指向的过程
- 3、构造函数本身也是函数，构造函数通过 new 关键字创造示例，执行 new 关键字的时候有五个步骤
    - 新建一个空对象 
    - 构造函数的 this 值指向该新对象
    - 执行构造函数
    - 新对象 \_\_proto\_\_  指向 构造函数的 prototype
    - 返回该新对象

然后讲述了 ES6 的 class 其实是 javaScript 中基于原型继承的语法糖
- 4、通过 class 创建类
- 5、class 的静态方法 static
- 6、class 通过 extends 关键字继承
- 7、class 通过 extends 继承时，须在子类的构造函数中调用 super(),同时 super 对象中也可以获得父类其他公共方法的引用

