var twice = {
    apply (target, ctx, args) {
      console.log(target(...arguments))
        return target.apply(window,...arguments) * 2
    }
}
function sum (left, right) {
    return left + right
}
var proxy = new Proxy(sum, twice)

console.log(proxy(1, 2))
//  6
console.log(proxy(...[3, 4]))
//  14
console.log(proxy.call(null, 5, 6))
//  22
console.log(proxy.apply(null, [7, 8]))
//  30