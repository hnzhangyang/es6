
var promise = new Promise(function(resolve, reject){
    reject()
})

promise.catch(function(){
    console.log('error!')
})
