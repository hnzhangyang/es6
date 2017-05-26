# Template Literals
## 目录
- [usage](#usage)
- [Tagged Templates](#TaggedTemplates)
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
// <h1>    hi ming ,how are you    </h1>
```
结合解构赋值，可以很方便的运用字面量模板
```javaScript
var article = {
  title: 'Hello Template Literals',
  teaser: 'String interpolation is awesome. Here are some features',
  body: 'Lots and lots of sanitized HTML',
  tags: ['es6', 'template-literals', 'es6-in-depth']
}
var {title,teaser,body,tags} = article
var html = `<article>
  <header>
    <h1>${title}</h1>
  </header>
  <section>
    <div>${teaser}</div>
    <div>${body}</div>
  </section>
  <footer>
    <ul>
      ${tags.map(tag => `<li>${tag}</li>`).join('\n      ')}
    </ul>
  </footer>
</article>`
```
## Tagged Templates
我们可以借助一些工具函数来使字面量模板使用起来更方便
```javaScript
function upperExpr (template, ...expressions) {
  return template.reduce((accumulator, part, i) => {
    return accumulator + expressions[i - 1].toUpperCase() + part
  })
}
var name = 'nico'
var outfit = 'leather jacket'
var text = upperExpr`hello ${name}, you look lovely today in that ${outfit}`
console.log(text)
```
对于上面的代码初看起来可能会有点困惑，让我们一步一步把它分解
首先我们定义了一个工具函数 upperExpr
```javaScript
// 这里用了 ES6 的 rest parameters syntax 语法，将函数除 template 之外的所有参数收集进一个 expressions 数组
function upperExpr (template, ...expressions) {
    // some code
}
```
在工具函数 upperExpr 中我们使用了数组的 reduce  方法
```javaScript
// 由此可见 template 参数是一个数组
function upperExpr (template, ...expressions) {
  return template.reduce((accumulator, part, i) => {
    return accumulator + expressions[i - 1].toUpperCase() + part
  })
}
```
声明了两个变量
```javaScript
var name = 'nico'
var outfit = 'leather jacket'
```
4、声明了字面量模板，有所不同的是在字面量模板语法标签 `` 前我们添加了之前声明了的工具函数  upperExpr
```javaScript
var text = upperExpr`hello ${name}, you look lovely today in that ${outfit}`
```
最终字面量模板被解析为
```javaScript
upperExpr(['hello ',', you look lovely today in that '], 'nico', 'leather jacket')
```
这样就很清楚 Tagged Templates 的运行机制了

也许 Tagged Templates 初看起来有点不太好用，其实再特定场合下还是可以发挥出很大的优势的
```javaScript
import insane from 'insane'
function sanitize (template, ...expressions) {
  return template.reduce((accumulator, part, i) => {
    return accumulator + insane(expressions[i - 1]) + part
  })
}
var comment = 'haha xss is so easy <iframe src="http://evil.corp"></iframe>'
var html = sanitize`<div>${comment}</div>`
console.log(html)
// <- '<div>haha xss is so easy </div>'
```