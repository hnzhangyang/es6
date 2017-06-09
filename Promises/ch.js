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
inner.click();