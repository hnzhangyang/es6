var target = {}

var handler = {
    set (target, key, value) {
        console.log('I try to set property', key)
        return true
    },
    get (target, key) {
        console.log('I got', key)
        return target[key]
    }
}

var proxy = new Proxy(target, handler)

proxy.a = 1
console.log(proxy.a)
console.log(target.a)