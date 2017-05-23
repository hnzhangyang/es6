var foo = { bar : 'pony', baz: 3};
var {bar: bar, _baz : _baz} = foo;
console.log(bar);
// 'pony'
console.log(_baz);
// undefined