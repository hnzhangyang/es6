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
- pending 正在执行
- fulfilled 执行成功
- rejected 执行失败

通过 new Promise() 返回一个 Promise对象 ，我们可以在这个 Promise对象 中设置