// demo 1
var name = 'ming'
var text = 'hi ' + name + ' ,how are you'
console.log(text);
// hi ming , how are you

// demo 2
var name = "ming"
var text = '<h1>' + 
            'hi ' + name + ' ,how are you' + 
            '</h1>'
console.log(text);
// <h1>hi ming ,how are you</h1>

// demo 3
var name = "ming"
var text = 
'<h1>\
hi ' + name + ' ,how are you\
</h1>'
console.log(text);
// <h1>hi ming ,how are you</h1>

// demo 4
var name = 'hua'
var text = `hi ${name} ,how are you`
console.log(text);
// hi hua , how are you

// demo 5
var name = 'hua'
var text = `hi ${name.toUpperCase()} ,how are you`
console.log(text);
// hi HUA ,how are you

text = `hi ${name == 'hua' ? 'Hua':'Ming'} ,how are you`
// hi Hua ,how are you 

// demo 6
var name = "hua"
var text = `<h1> 
            hi ${name} ,how are you
            </h1>`
console.log(text);
// <h1>    hi ming ,how are you    </h1>

// demo 7
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

// demo 8
function upperExpr (template, ...expressions) {
  return template.reduce((accumulator, part, i) => {
    return accumulator + expressions[i - 1].toUpperCase() + part
  })
}
var name = 'nico'
var outfit = 'leather jacket'
var text = upperExpr`hello ${name}, you look lovely today in that ${outfit}`
console.log(text)

// demo 9
// 这里用了 ES6 的 rest parameters syntax 语法，将函数除 template 之外的所有参数收集进一个 expressions 数组
function upperExpr (template, ...expressions) {
    // some code
}

// demo 10
// 由此可见 template 参数是一个数组
function upperExpr (template, ...expressions) {
  return template.reduce((accumulator, part, i) => {
    return accumulator + expressions[i - 1].toUpperCase() + part
  })
}

// demo 11
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