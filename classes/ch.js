class Foo {
    constructor (){}
    showFoo (){
        console.log('Foo')
    }
}

class Bar extends Foo {
    constructor (){
        super()
    }
    showBoth (){
        super.showFoo()
        console.log('Bar')
    }
}

var instance = new Bar()
instance.showBoth()