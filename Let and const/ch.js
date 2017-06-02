// demo 1
function foo (flag){
    if(flag){
        var bar = 'hi'
    }
    console.log(bar)
}

foo(true)
// hi
foo(false)
// undefined

// demo 2
function foo (flag){
    var bar
    if(flag){
        bar = 'hi'
    }
    console.log(bar)
}

foo(true)
// hi
foo(false)
// undefined

// demo 3
{{{{var bar = 'hi'}}}}

console.log(bar)
// hi

// demo 4
function foo(){
    var bar = 'hi'
    console.log(bar)
}

foo()
// hi
console.log(bar)
// Uncaught ReferenceError: bar is not defined

// demo 5
var foo = function (){}

function bar (){}

// demo 6
console.log(typeof foo)
// undefined

var foo = function (){}

// demo 7
console.log(typeof bar)
// function

function bar (){}

// demo 8
function bar (){
    function foo (){
        text = 'hi'
    }
    
    foo()
}

bar()
console.log(window.text)
// hi

// demo 9
{
    let foo = 'hi'
}
console.log(foo)
// Uncaught ReferenceError: foo is not defined

// demo 10
for(var i = 0; i < 3; i++) {}
console.log(i)
// 3

for(let j = 0; j < 3; j++) {}
console.log(j)
// j is not defined
// 这样在 for 循环的时候就不会污染变量了

// demo 11
{
    const bar = 'hi'
}

console.log(bar)
// Uncaught ReferenceError: bar is not defined

// demo 12
const bar = 'hi'
bar = 'hello'
// "bar" is read-only

// demo 13
var foo = 'hi'
var bar = foo

console.log(foo)
// hi
console.log(bar)
// hi

bar = 'hello'
console.log(foo)
// hi
console.log(bar)
// hello

// demo 14
var foo = {
    text: 'hi'
}
var bar = foo

console.log(foo.text)
// hi
console.log(var.text)
// hi

bar.text = 'hello'
console.log(foo.text)
// hello
console.log(var.text)
// hello

// demo 15
const foo = {
    text: 'hi'
}

console.log(foo.text)
// hi

foo.text = 'hello'
console.log(foo.text)
// hello

// demo 16
bar = 'hi'
// error
let bar