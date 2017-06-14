// demo 1
[1, 2, 3].map(num => num * 2)
// <- [2, 4, 6]

// demo 2
[1, 2, 3].map(function (num) { return num * 2 })
// <- [2, 4, 6]

// demo 3
[1, 2, 3, 4].map((num, index) => num * 2 + index)
// <- [2, 5, 8, 11]

// demo 4
[1, 2, 3, 4].map( function(num, index) { return num * 2 + index })
// <- [2, 5, 8, 11]

// demo 5
[1, 2, 3, 4].map(num => {
  var multiplier = 2 + num
  return num * multiplier
})
// <- [3, 8, 15, 24]

// demo 6
setTimeout(() => ({ foo: 'bar' }), 0);

// demo 7
function foo(){
    var that = this;
    setTimeout(() => {
        console.log(this === that)
    },0)
}
foo()
// true

// demo 8
var a = 0
function show(){
    console.log(a)
}
function foo(){
    var a = 1
    show()
}
foo()
// 0

// demo 9
var a = 0
function show(){
    console.log(a)
}
function foo(){
    var a = 1
    show()
}
foo()
// 在 dynamic scope 下
// 1

// demo 10
function Timer () {
  this.seconds = 0
  setInterval(() => this.seconds++, 1000)
}
var timer = new Timer()
setTimeout(() => console.log(timer.seconds), 3100)
// <- 3

// demo 11
function Timer () {
  this.seconds = 0
  setInterval(function(){
      this.seconds++
  }.bind(this), 1000)
}
var timer = new Timer()
setTimeout(function(){
    console.log(timer.seconds);
}, 3100)
// <- 3

// demo 12
function Timer () {
  var that = this;
  this.seconds = 0
  setInterval(function(){
      that.seconds++
  }, 1000)
}
var timer = new Timer()
setTimeout(function(){
    console.log(timer.seconds);
}, 3100)
// <- 3

// demo 13
function show(){
    console.log(this)
}

show()
// window 
// undefined

// demo 14
var foo = {
    show:function(){
        console.log(this)
    }
}

foo.show()
// foo

//demo 15
var that, obj

function Foo(){
    that = this
}

obj = new Foo()
console.log(obj === that)
// true

// demo 16
var a = {}
function Foo(){
    console.log(this == a)
}

Foo.call(a)
// true
Foo.apply(a)
// true
