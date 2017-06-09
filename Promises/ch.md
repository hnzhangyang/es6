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
Promise 是一种异步编程的解决方案，我们用构造函数 Promise 来声明一个 promise。
``` javaScript
var promise = new Promise(function(resolve, reject){

    // some code
    if(/*异步操作成功*/){
        resolve()
    }else{
        reject()
    }
})
```
Promise 可以看成是一个黑箱，里面的具体逻辑使用时我们可以不用关心，它有三种状态。
- **pending** 
- **fulfilled** 
- **rejected** 

Promise 的默认状态是 **pending** ，在函数执行的过程中状态有可能被 resolve() 改变为 **fulfilled**（成功），也有可能被 reject() 改变为 **rejected**（失败）。Promise 状态一旦改变，无法再次更改。

构造函数 Promise 返回一个 promise 对象。promise 对象有一个 **then** 方法，**then** 方法接受两个参数，第一个参数是 Promise 函数状态变为 **fulfilled** 的回调函数，第二个参数是 Promise 状态变为 **rejected** 的回调函数。
``` javaScript
var promise1 = new Promise(function(resolve, reject){
    resolve('success')
})

var promise2 = new Promise(function(resolve, reject){
    reject('error')
})

promise1.then(function(message){
    console.log(message)
})
// success

promise2.then(null,function(error){
    console.log(error)
})
// error
```
Promise 对象还有一个 **catch** 方法，是 .then(null, func) 的别名。
``` javaScript
var promise = new Promise(function(reslove, reject){
    reject('error')
})

promise.catch(function(error){
    console.log(error)
})
// error
```
注意到上面在 Promise 函数体内调用 **resolve** 和 **reject** 时，都带了参数，这个参数会传到 Promise 对象绑定的回调函数上供其使用。

Promise 一旦产生，立即执行，不管 Promise 实例上有没有绑定 **then** 方法。
``` javaScript
new Promise(function(reslove, reject){
    console.log('hi');
})

// hi
```
Promise 的状态一旦改变，不可以再次更改，在 Promise 对象上绑定的方法，会立即根据状态执行。
``` javaScript
var promise = new Promise(function(reslove, reject){
    reslove('success')
})

promise.then(function(message){
    console.log(message)
})
// success

setTimeout(function(){
    promise.then(function(message){
        console.log(message)
    })
    // success
},1000)
```
注意到上面我在同一个 Promise 对象上绑定了两个 **then** 方法，这是可行的实际上可以绑定任意个方法。

**then** 和 **catch** 方法总是返回另一个 Promise 对象，这意味着我们可以进行链式调用。
``` javaScript
var promise = new Promise(function (reslove, reject) {
    reslove('success')
})

promise.then(function (message) {
    console.log(message)
    return 'success again'
}).then(function (message) {
    console.log(message)
    throw 'error'
}).catch(function (error) {
    console.log(error)
})
// success
// success again
// error
```