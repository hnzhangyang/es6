// demo 1
var foo = {}

// demo 2
console.log(foo.toString())
// "[object Object]"

// demo 3
foo.toString === Object.prototype.toString
// true

// demo 4
var foo = {}
foo.constructor === Object
// true

// demo 5
typeof Object.prototype.a
// "undefined"
typeof foo.a
// "undefined"

// demo 6
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

// demo 7
var foo = {}
var bar = {
    paint(){
        console.log('hi')
    }
}
foo.__proto__ = bar
foo.paint()
// hi

// demo 8
console.log(Object.prototype.__proto__);
// null

// demo 9
var foo = {}
var bar = {
    paint(){
        console.log('hi')
    }
}
Object.prototype.__proto__ = bar
// Cyclic __proto__ value

// demo 10
function Animal(){
    this.num = 0
}
Animal.prototype.count = function(){
    console.log(this.num)
}

var instance = new Animal()
instance.count();
// 0

// demo 11
var instance = new Animal()

// demo 12
var instance1 = new Animal()
var instance2 = new Animal()
var instance3 = new Animal()

// demo 13
function Bar(){
    // some code    
}
console.log(Bar.prototype.constructor === Bar)
// true

// demo 14
function Bar(){
    // some code    
}
var instance = new Bar()
console.log(instance.constructor === Bar)
// true

// demo 15
function Animal(){
    this.num = 0
}
Animal.prototype.count = function(){
    console.log(this.num)
}

var instance = new Animal()
instance.count();
// 0

// demo 16
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

// demo 17
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

// demo 18
function Animal(){
    this.num = 0
}
Animal.reduce = function(){
    this.num = this.num - 1
}
console.log(typeof Animal.reduce)
// function

// demo 19
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

// demo 20
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

// demo 21
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

// demo 22
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

// demo 23
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