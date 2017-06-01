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
console.log(typeof Animal.reduce)
// function
console.log(typeof Animal.count)