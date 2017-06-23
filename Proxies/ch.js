var handler = {
  setPrototypeOf (target, proto) {
    Object.setPrototypeOf(target, proto)
  }
}
var proto = {}
var target = function () {}
var proxy = new Proxy(target, handler)
proxy.setPrototypeOf(proxy, proto)
console.log(proxy.prototype === proto)
// <- true