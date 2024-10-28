function doubleMe(x) {
  return x * 2
}

console.log(doubleMe(3))

let d2 = doubleMe

console.log(d2(4))

let d3 = function (x) {
  return x * 2
}

let p = {
  name: 'Jim',
  age: 22,
  introduce: function () {
    console.log('Hello, I am ' + this.name)
  }
}

p.introduce()

for (let property in p) {
  console.log(p[property])
}