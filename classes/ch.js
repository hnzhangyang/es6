class Animal {
    constructor (){
        this.num = 0
    }

    count (){
        console.log(this.num)
    }
}

console.log(typeof Animal.prototype.count)
// Function
console.log(Animal.prototype.constructor === Animal)
// true