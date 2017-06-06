function* generator(){
    console.log('0-1')
    yield 1
    console.log('1-1')
    yield 2
    console.log('2-1')
    yield 3
    console.log('3-3')
}

var g = generator()

console.log(g.next())

console.log(g.next())

console.log(g.next())

console.log(g.next())