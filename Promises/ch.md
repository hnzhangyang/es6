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
- pending 
- fulfilled 
- rejected 

Promise 的默认状态是 pending ，在函数执行的过程中状态有可能被 resolve() 改变为 fulfilled（成功，也有可能被 reject() 改变为 rejected（失败）。Promise 状态一旦改变，无法再次更改。
