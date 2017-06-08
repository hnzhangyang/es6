# Promises
## 目录
- [Promise](#promise)
- [Promise树](#Promise树)
- [Promise.resolve](#Promise.resolve)
- [Promise.reject](#Promise.reject)
- [Promise.all](#Promise.all)
- [Promise.race](#Promise.race)
- [关于javaScript的单线程](#关于javaScript的单线程)

## Promise
Promise 是一种异步编程的解决方案，声明一个 Promise 很简单
``` javaScript
new Promise(function(resolve, reject){
    // some code
})
```
构造函数 Promise 接受一个回调方法，这个方法接受两个参数，resolve 和 reject。方法内我们用这两个参数来设置 promise 的状态。
``` javaScript
var promise = new Promise(function(resolve, reject){
    resolve()
})

promise.then(function(){
    console.log('success!')
})
// success!
``` 
执行 resolve() 方法标记函数执行成功，触发 promise对象的 then（）方法。
``` javaScript
var promise = new Promise(function(resolve, reject){
    reject()
})

promise.catch(function(){
    console.log('error!')
})
// error!
执行 reject() 方法标记函数执行失败，触发promise对象的 catch（）方法。