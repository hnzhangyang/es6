var obj = new Object()
var foo = ['foo']

obj[foo] = 'im foo'
console.log(obj);
// Object {foo: "im foo"}
console.log(foo.toString())