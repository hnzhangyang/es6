var foo = {}
var bar = {
    paint(){
        console.log('hi')
    }
}
Object.prototype.__proto__ = bar
foo.paint()