// demo 1
var foo = { bar : 'pony', baz: 3 };
var { bar: bar, baz: baz } = foo;
console.log(bar);
// 'pony'
console.log(baz);
// 3

// demo 2
var foo = { bar : 'pony', baz: 3 };
var bar = foo.bar;
var baz = foo.baz;
console.log(bar);
// 'pony'
console.log(baz);
// 3

// demo 3
var foo = { bar : 'pony', baz: 3 };
var {bar: bar, _baz : _baz } = foo;
console.log(bar);
// 'pony'
console.log(_baz);
// undefined

// demo 4
var foo = { bar : 'pony', baz: 3};
var bar = foo.bar;
var _baz = foo._baz;
console.log(bar);
// 'pony'
console.log(_baz);
// undefined

// demo 5
var foo = { bar : 'pony', baz: 3 };
var { bar, baz } = foo;
console.log(bar);
// 'pony'
console.log(baz);
// 3

// demo 6
var foo = { bar : 'pony', baz: 3 };
var { bar: _bar, baz: _baz } = foo;
console.log(_bar);
// 'pony'
console.log(_baz);
// 3

//demo 7
var foo = { bar: { bar: 'pony', baz: 3 }};
var { bar: {bar, baz: _baz } } = foo;
console.log(bar);
// 'pony'
console.log(_baz);
// 3

// demo 8
var foo = { bar: { bar: 'pony', baz: 3 }};
var { barErr: { bar } } = foo;
// error

// demo 9
var foo = { bar: { bar: 'pony', baz: 3 }};
var bar = foo.barErr.bar;
// Uncaught TypeError: Cannot read property 'bar' of undefined

// demo 10
var [a] = [10]
console.log(a);
// 10

// demo 11
var [,,a] = [1,2,3];
console.log(a);
// 3

// demo 12
var [,,,a] = [1,2,3];
console.log(a);
// undefined 

// demo 13
var { foo = 3 } = { foo : 2 };
console.log(foo);
// 2
var { foo = 3 } = { foo : undefined };
console.log(foo);
// 3
var [ b = 10 ] = [ 9 ];
console.log(b);
// 9
var [ b = 10 ] = [ undefined ];
console.log(b)
// 10

// demo 14
var a = 1 , b = 2;
[a, b] = [b, a];
console.log(a);
// 2
console.log(b);
// 1

// demo 15
var a = 1,
    b = 2,
    aux;
aux = a;
a = b;
b = aux;
console.log(a);
// 2
console.log(b);
// 1

// demo 16
function greet ({ age, name:greeting='she' }) {
  console.log(`${greeting} is ${age} years old.`)
}
greet({ name: 'nico', age: 27 })
// <- 'nico is 27 years old'
greet({ age: 24 })
// <- 'she is 24 years old'