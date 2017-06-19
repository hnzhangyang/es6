function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`)
  }
}

var handler = {
  get (target, key) {
    invariant(key, 'get')
    return target[key]
  },
  set (target, key, value) {
    invariant(key, 'set')
    return true
  },
  has (target, key) {
    if (key[0] === '_') {
      return false
    }
    return key in target
  }
}


var target = { _prop: 'foo', pony: 'foo' }
var proxy = new Proxy(target, handler)
console.log('pony' in proxy)
// <- true
console.log('_prop' in proxy)
// <- false
console.log('_prop' in target)
// <- true