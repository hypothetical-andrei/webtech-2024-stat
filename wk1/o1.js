class Animal {
    constructor (name) {
        this.name = name
    }
    walk () {
        console.log(`${this.name} is walking`)
    }
}

const a = new Animal('generic animal')
a.walk()

class Cat extends Animal {
    constructor (name, fluffinessLevel) {
        super(name)
        this.fluffinessLevel = fluffinessLevel
    }
    meow () {
        console.log(`${this.name} is meowing`)
    }
}

const c = new Cat('Tim', 'High')
c.meow()
c.walk()

Cat.prototype.fly = function () {
    console.log(`Super${this.name} is flying`)
}

c.fly()

String.prototype.alternateCapitalization = function () {
    let result = ''
    for (let i = 0; i < this.length; i++) {
        if (i % 2 === 0) {
            result += this[i].toUpperCase()
        } else {
            result += this[i]
        }
    }
    return result
}

console.log('This is a test'.alternateCapitalization())