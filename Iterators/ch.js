var foo = {
    [Symbol.iterator]: () => ({
        items:0,
        next:function (){
          return {
            done: false,
            value: ++this.items
          }
        } 
    })
}


for(var item of foo){
    if(item > 3){
        break
    }
    console.log(item)
    console.log(1);
}
// 1
// 2
// 3