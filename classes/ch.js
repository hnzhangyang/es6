function Animal(){
    this.num = 0
}
Animal.prototype = {
    constructor:123,
    a:1
}


var instance = new Animal()

console.log(instance.toString())