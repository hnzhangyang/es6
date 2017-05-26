# Template Literals

## usage
在 ES6 之前，拼接字符串我们需要这样
```javaScript
var name = 'ming'
var text = 'hi ' + name + ' ,how are you'
console.log(text);
// hi ming , how are you
```
有时候我们需要在拼接字符串的时候换行，使代码可读性更强
```javaScript
var name = "ming"
var text = '<h1>' + 
            'hi ' + name + ' ,how are you' + 
            '</h1>'
console.log(text);
// <h1>hi ming ,how are you</h1>
```
或者
```javaScript
var name = "ming"
var text = 
'<h1>\
hi ' + name + ' ,how are you\
</h1>'
console.log(text);
// <h1>hi ming ,how are you</h1>
```
ES6 提供了新的字面量模板语法 `` ，我们可以以更整洁的方式拼接字符串
```javaScript
var name = 'hua'
var text = `hi ${name} ,how are you`
console.log(text);
// hi hua , how are you
``` 
其中 ${express} 可以让我们在模板中插入值，或者表达式
```javaScript
var name = 'hua'
var text = `hi ${name.toUpperCase()} ,how are you`
console.log(text);
// hi HUA ,how are you

text = `hi ${name == 'hua' ? 'Hua':'Ming'} ,how are you`
// hi Hua ,how are you 
```
字面量模板可以很简单的直接换行,但是每行间的空格不会省略，这点需要注意。
```javaScript
var name = "hua"
var text = `<h1> 
            hi ${name} ,how are you
            </h1>`
console.log(text);
// <h1>hi ming ,how are you</h1>
```
