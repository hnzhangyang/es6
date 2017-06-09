// demo 1
var promise = new Promise(function(resolve, reject){

    // some code
    if(/*异步操作成功*/){
        resolve()
    }else{
        reject()
    }
})

// demo 2
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

// demo 3
var promise = new Promise(function(reslove, reject){
    reject('error')
})

promise.catch(function(error){
    console.log(error)
})
// error

// demo 4
new Promise(function(reslove, reject){
    console.log('hi');
})

// hi

// demo 5
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

// demo 6
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

// demo 7
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

// demo 8
var promise = new Promise(function)(resolve, reject){
    resolve('success')
}

// demo 9
var promise = Promise.resolve('succcess')

promise.then(function(message){
    console.log(message)
})
// success

// demo 10
var foo = {
    then: function(){
        console.log('foo')
    }
}

Promise.resolve(foo)
// foo

// demo 11
var promise = Promise.reject('error')

promise.catch(function(error){
    console.log(error)
})
// error

// demo 12
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

// demo 13
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

// demo 14
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

// demo 15
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

// demo 16
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