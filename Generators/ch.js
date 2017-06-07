function* generator(){
    yield 1
    yield 2
    yield 3
    return
    yield 4
    yield 5
}

var g = generator()

console.log(...g)
// 1 2 3