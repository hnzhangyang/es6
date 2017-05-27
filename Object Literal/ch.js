// demo 1
var foo = 'bar'
var baz = { foo }
console.log(baz)
// { foo : 'bar' }

// demo 2
function methodShow () {
  // some code
}

function methodHide (key, value) {
  // some code
}


module.exports = {
  methodShow,
  methodShow
}

// demo 3
function methodShow () {
  // some code
}

function methodHide (key, value) {
  // some code
}

module.exports = {
  methodShow: methodShow,
  methodHide: methodHide
}

// demo 4
var foo = 'var'
var baz = {}
baz[foo] = 'hi'
console.log(baz)
// { bar : 'hi' }

// demo 5
var foo = 'bar'
var bar = 'hi'
var baz = { [foo] }
// SyntaxError

// demo 6
var sayHi = function(){
    console.log('hi')
}

var foo = {
    sayHi
}

foo.sayHi()
// hi

// demo 7
var hi = 'hi'
var foo = { hi }
console.log(foo.hi)
// hi

// demo 8
var foo = {}
var val = foo.say
Object.defineProperty(foo, 'say', {
    set: function(name){
        val = 'hi ' + name 
    },
    get: function(){
        return val
    }
})

foo.say = 'zhang'
console.log(foo.say)
// hi zhang

// demo 9
if(Object.defineProperty){
    //Object.defineProperty()
}else{
    //setInterval()
}