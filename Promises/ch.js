var p1 = new Promise(function(resolve, reject){
    reject('p1')
})

var p2 = new Promise(function(resolve, reject){
    reject('p2')
})

var p3 = new Promise(function(resolve, reject){
    reject('p3')
})

var promise = Promise.race([p2,p1,  p3])

promise.catch(function(arr){
    console.log(arr)
})