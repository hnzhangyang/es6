# Promises
## 目录
- [Promise](#promise)
- [Promise树](#Promise树)
- [Promise.resolve](#Promise.resolve)
- [Promise.reject](#Promise.reject)
- [Promise.all](#Promise.all)
- [Promise.race](#Promise.race)
- [关于javaScript的单线程](#关于javaScript的单线程)
    - [一个简单的例子](#一个简单的例子)
    - [event](#event)
    - [总结](#总结)

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
## Promise树
上面一节说到。
- 一个 promise 对象可以绑定任意个 **then** 和 **catch** 方法。
- **then** 和 **catch** 方法总是返回另一个 Promise 对象

这意味着我们可以甚至可以生成一个树状结构的 Promise 链式调用。
``` javaScript
var p1 = new Promise(function (reslove, reject) {
    resolve()
})

p2 = p1.then(function () {
    throw 'error'
})

p3 = p2.catch(function (error) {
    console.log(error)
})

p4 = p3.catch(function (error) {
    console.log(error + 'again')
})

// error
```
为什么 “error agamin” 没有输出？
- 1、p1 是 Promise 构造函数返回的 Promise 对象
- 2、p2 是 p1 **then** 方法返回的新 Promise
- 3、p3 是 p2 **catch** 方法返回的新 Promise
- 4、p4 是 p3 **catch** 方法返回的新 Promise
- 5、当 p1 被设定之后，**p1.then** 执行
- 6、当 **p1.then** 执行后 **p2.catch** 执行
- 7、**p2.catch** 并没有抛出错误，所以 **p3.catch** 不会执行

实际上你可以任意的引用 Promise 树上的任意一个节点绑定人任意个回调事件。
## Promise.resolve
有时候你想要创建一个 Promise 对象，但是你又不想麻烦。
``` javaScript
var promise = new Promise(function)(resolve, reject){
    resolve('success')
}
```
可以写成。
``` javaScript
var promise = Promise.resolve('succcess')
```
用 **Promise.resolve** 返回的 Promise 对象，内部状态为 **fulfilled**，在其绑定的 **then** 方法会立即执行。
``` javaScript
var promise = Promise.resolve('succcess')

promise.then(function(message){
    console.log(message)
})
// success
```  
如果传递给 **Promise.resolve** 方法的参数是一个带有 **then** 方法的对象，会立即执行这个 **then** 方法。
``` javaScript
var foo = {
    then: function(){
        console.log('foo')
    }
}

Promise.resolve(foo)
// foo
```
## Promise.reject
同样的，**Promise.reject** 也会返回一个新的 Promise 对象，该对象的状态标记为 **rejected**。
``` javaScript
var promise = Promise.reject('error')

promise.catch(function(error){
    console.log(error)
})
// error
```
## Promise.all
**Promise.all** 接受一个成员是 Promise 对象的数组，返回一个 Promise 对象，**Promise.all** 的状态有数组里面所有的 Promise 共同决定。
- 当所有的 Promise 状态为 **resolve** 时 **Promise.all** 状态为 **resolve**，返回所有 Promise 的返回值组成的数组。
- 只要有一个 Promise 的状态为 **reject**，**Promise.all**状态为 **reject**，并返回第一个状态标记为 **reject** 的对象的返回值。
``` javaScript
var p1 = new Promise(function(resolve, reject){
    resolve('p1')
})

var p2 = new Promise(function(resolve, reject){
    resolve('p2')
})

var p3 = new Promise(function(resolve, reject){
    resolve('p3')
})

var p4 = new Promise(function(resolve, reject){
    reject('p4')
})

var promise1 = Promise.all([p1, p2, p3])

var promise2 = Promise.all([p1, p2, p3, p4])

promise.then(function(arr){
    console.log(arr)
})
// ["p1", "p2", "p3"]

promise2.catch(function(error){
    console.log(error)
})
// p4
```
当 **Promise.all** 接受的数组成员有一个不是 Promise 对象时，会调用上面的 **Promise.resolve** 方法。
``` javaScript
var p1 = new Promise(function(resolve, reject){
    resolve('p1')
})

var p2 = new Promise(function(resolve, reject){
    resolve('p2')
})

var p3 = new Promise(function(resolve, reject){
    resolve('p3')
})

var promise = Promise.all([p1, p2, p3, 'p4'])

promise.then(function(arr){
    console.log(arr);
})
// ["p1", "p2", "p3", "p4"]
```
## Promise.race
同 **Promise.all**，**Promise.race** 也接受一个由 Promise 对象组成的数组作为参数，返回一个 Promise 对象。

不同的是，只要数组中一个 Promise 对象的状态变为 **resolve**，Promise.race 的状态就变为 **resolve**，并返回第一个改变状态的 promise 对象的返回值。
``` javaScript
var p1 = new Promise(function(resolve, reject){
    resolve('p1')
})

var p2 = new Promise(function(resolve, reject){
    resolve('p2')
})

var p3 = new Promise(function(resolve, reject){
    reject('p3')
})

var promise = Promise.race([p1, p2, p3])

promise.then(function(arr){
    console.log(arr)
})
// p1
``` 
当所有 Promise 对象的状态都为 **reject** 时，**Promise.race** 的状态变为 **reject**。返回第一个状态变为 **reject** 的 Promise 对象的返回值。
``` javaScript
var p1 = new Promise(function(resolve, reject){
    reject('p1')
})

var p2 = new Promise(function(resolve, reject){
    reject('p2')
})

var p3 = new Promise(function(resolve, reject){
    reject('p3')
})

var promise = Promise.race([p1, p2, p3])

promise.catch(function(arr){
    console.log(arr)
})
// p1
```
同样的，当有参数不是 Promise 对象时，会调用上文提到的 **Promise.resolve** 方法，使其变成 Promise 对象，状态为 **fulfilled**。
## 关于javaScript的单线程

### 一个简单的例子

思考下面的输出。
``` javaScript
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');
```
答案，呃... 不一定，现在主流的浏览器输出是下面的结果。
``` javaScrpt
// script start
// script end
// promise1
// promise2
// setTimeout
```
有争议的地方是 **promise1 promse2** 与 **setTimeout** 的先后顺序。

在相对于比较老版本的浏览器中 **setTimeout** 输出在 **promise1 promse2** 之前，不过这并不影响我们理解 javaScript 的线程机制。

### 过程分析

大家都知道 javaScript 是单线程，这个不多说，但是具体执行的时候是什么情况？
``` HTML
<script>
    console.log('script start');

    setTimeout(function() {
        console.log('setTimeout');
    }, 0);

    Promise.resolve().then(function() {
        console.log('promise1');
    }).then(function() {
        console.log('promise2');
    });

    console.log('script end');
</script>
```
还是上面的代码，它是一个比较典型的例子，在上面代码块中一共有三种任务。
- 执行 \<script\> 代码块
- setTimeout
- promise

其中 **setTimeout** 和 **promise** 是包含在js 代码块整体内。

ok，javaScript 是单线程，想象有一条 **event loop** 线。

当程序执行到 \<script\> 标签的时候，**event loop** 上被安排了一个任务 --- 执行 \<script\> 代码。
``` html
<script></script>
```
继续往下走，找到了
``` javaScript
console.log('script start');
```
浏览器输出 ”script start“，继续往下
``` javaScript
setTimeout(function() {
    console.log('setTimeout');
}, 0);
```
setTimeout 添加了一个异步任务（不要在乎他的延迟只有0，不管延迟多少，它就是一个异步任务）。

我们把这个异步任务成为一个 **task**。**task** 被添加到我们的主线程 **event loop** 下，现在 **event loop** 下有两个任务。
- 执行 \<script\> 代码块
- setTimeout task

第一个任务 执行 \<script\> 代码块 还没完成，**task** 任务得延迟处理。继续往下
``` javaScript
Promise.resolve().then(function() {
    console.log('promise1');
}).then(function() {
    console.log('promise2');
});
```
好，我们发现了 Promise，把 Promise 标记为 **microTask**，丢在 **event loop** 最尾端，现在的 **event loop** 是
- 执行 \<script\> 代码块
- setTimeout task
- promise microTask

继续执行第一个任务
``` javaScript
console.log('script end');
```
浏览器输出 ”script end“，好了，现在第一个任务执行完了，**event loop** 剩下
- setTimeout task
- promise microTask

还记的我们的输出结果吗？
``` javaScript
// script start
// script end
// promise1
// promise2
// setTimeout
```
比较下 **event loop** 和输出结果，发现明明 setTimeout task 在上面，却 promise microTask 先执行，这里就是有争议的地方，具体执行顺序，得看浏览器爸爸，他说哪个先执行，哪个就先执行。

到现在2017/6/9，新版本的Firefox，Chrome，Ie 都是先执行 promise microTask 任务。一些比较老的版本可能会按顺序执行任务。

### event 

好了，现在对浏览器执行 javaScript 任务的时候应该有初步了解了。接下来我们更进一步。

不要忘了我们还有一个最常用的异步任务没有讨论--绑定事件。

绑定事件是与 javaScript 与 dom 交互中最常用的功能，看下面代码。
``` html
<style>
    #outer {
        border:1px solid black;width:200px;height:200px"
    }
    #inner {
        border:1px solid black;width:100px;height:100px
    }
</style>

<div id="outer">outer
    <div id="inner">inner</div>
</div>
```
``` javaScript
var outer = document.getElementById('outer');
var inner = document.getElementById('inner');

function clk(){
    console.log('click')
    setTimeout(function(){
        console.log('timeout');
    },0)
    Promise.resolve().then(function(){
        console.log('promise')
    })
}

inner.addEventListener('click', clk);
outer.addEventListener('click', clk);
```
我们分别为两个嵌套的 div 绑定了点击事件，点击里面那个，思考输出结果。
``` javaScript
// click
// promise
// click
// promise
// timeout
// timeout
```
可怜 timeout 还是在最尾端...

这里的 **event loop** 的执行过程不详解了，跟第一个例子很大程度上是相同的，这里的 event loop 的执行顺序为
- \<script\> 
- microTask
- event
- task

有一点需要注意的是，当我们不手动触发，而是选择自动触发 click 事件时，结果会不会相同呢？
``` javaScript
inner.click()
```
``` javaScript
// click
// click
// promise
// promise
// timeout
// timeout
```
event 的执行顺序被提升了!

这是因为当我们 手动触发 inner.click() 的时候，导致两个 event 事件同步执行，既然是同步的，当然要比异步的先执行了。

### 总结

经过这两个简单的例子，大家应该对 **event loop** 有一个比较直观的认识了，它遵守几条规律。
- 1、event loop 只有一条执行线，每次只能执行一个任务。
- 2、先执行同步任务，再执行异步任务。
- 3、异步任务有三种
    - Promise 产生的 microTask
    - 事件绑定的 event 
    - setTimeout，setInterval 产生的 task
- 4、异步任务按照以下顺序执行
    - microTask
    - event
    - task

我们现在讨论的仅仅是异步任务在 **相同时刻** 添加进 **event loop** 中的情况。这种情况下 **event loop** 会按照以上顺序执行异步任务。如果时间不同，会简单的以时间为主执行。