function Timer () {
  this.seconds = 0
  setInterval(function(){
      this.seconds++
  }.bind(this), 1000)
}
var timer = new Timer()
setTimeout(function(){
    console.log(timer.seconds);
}, 3100)
// <- 3