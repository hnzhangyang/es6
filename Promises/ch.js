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